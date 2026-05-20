# Portfolio Infrastructure - AWS CDK

This project contains the AWS CDK infrastructure code for the personal portfolio website.

## CDK Stacks

All stacks follow the `joono-prd-<service>` naming convention.

| Stack Name | Description | Status |
|---|---|---|
| `joono-prd-ecr` | ECR repository for Docker images of the Next.js app | New |
| `joono-prd-portfolio` | Container Lambda, Lambda Function URL, DynamoDB | Renamed from `PortfolioCdkStack` |
| `joono-prd-notifications` | SNS/SQS notifications, API Gateway, Ingest/Processor Lambdas | Renamed from `PortfolioNotificationStack` |
| `joono-prd-github-actions-role` | IAM OIDC provider and GitHubActionsRole for CI/CD | Renamed from `GitHubActionsRole` |
| `joono-prd-hostedzone` | Route 53 hosted zone for DNS management | Unchanged |
| `joono-prd-global-certificate` | ACM certificate for HTTPS/SSL (us-east-1) | Unchanged |
| `joono-prd-website` | CloudFront distribution and S3 bucket for the website | Unchanged |

### joono-prd-ecr

New stack. Defines the ECR repository that stores versioned Docker images of the Next.js app.

- **Repository name:** `joono-prd-portfolio`
- **Tag immutability:** ENABLED — once a tag is pushed it cannot be overwritten
- **Lifecycle policy:** Retains a maximum of 10 tagged images; untagged images are removed after 7 days

### joono-prd-portfolio

Core infrastructure stack. The Lambda function runs the Next.js app as a container image pulled from ECR.

- **Lambda function:** `joono-prd-portfolio-fn` — 512 MB memory, 30 s timeout, `PackageType: Image`
- **Image source:** `DockerImageCode.fromEcr()` pointed at the `joono-prd-portfolio` ECR repository
- **Function URL:** Auth type `AWS_IAM`, used as the CloudFront origin via Origin Access Control

### joono-prd-notifications

Manages the page view notification pipeline.

- HTTP API Gateway (`/pageview` POST endpoint)
- SQS FIFO Queue (`PageViewQueue.fifo`) — deduplicates messages by visitor IP within a 5-minute window
- Ingest Lambda — receives events from API Gateway and enqueues to the FIFO queue
- Processor Lambda — reads from the FIFO queue and sends email via SES

### joono-prd-github-actions-role

IAM role with the permissions required for GitHub Actions to deploy infrastructure and application updates via OIDC (no long-lived credentials stored as secrets).

### joono-prd-hostedzone

Route 53 hosted zone for DNS management of the production domain (`joono.work`).

### joono-prd-global-certificate

ACM (AWS Certificate Manager) certificate for HTTPS/SSL, deployed in `us-east-1` (required for CloudFront).

### joono-prd-website

CloudFront distribution, S3 bucket, and related resources for hosting and serving the Next.js website.

---

## ECR Image Tags

Every push to `main` produces exactly two tags for the same image digest:

| Tag | Format | Example | Purpose |
|---|---|---|---|
| Commit SHA | `[0-9a-f]{40}` | `a3f8c1d2e4b6...` | Immutable, traceable to the exact commit |
| Latest | `latest` | `latest` | Convenience pointer for manual pulls |

The Lambda function is always updated to the **commit-SHA tag** (never `latest`) so the deployed version is unambiguous and rollback is straightforward.

---

## CI/CD Pipeline

The GitHub Actions workflow triggers automatically on every push to `main` and can also be triggered manually via `workflow_dispatch`.

### Pipeline Sequence

```
push to main
  └─ 1.  Checkout code
  └─ 2.  Configure AWS credentials (OIDC → GitHubActionsRole)
  └─ 3.  Log in to ECR
  └─ 4.  docker build -t joono-prd-portfolio:$SHA ./nextjs-app
  └─ 5.  docker push joono-prd-portfolio:$SHA
  └─ 6.  docker tag joono-prd-portfolio:$SHA joono-prd-portfolio:latest
  └─ 7.  docker push joono-prd-portfolio:latest
  └─ 8.  aws lambda update-function-code --image-uri <ecr-uri>:$SHA
  └─ 9.  Resolve CloudFront distribution ID by alias joono.work
  └─ 10. aws cloudfront create-invalidation --paths "/*"
  └─ 11. Write job summary (SHA, image tag, timestamp)
```

Steps 1–8 are required: any failure halts the workflow and leaves the previous Lambda image active. Steps 9–10 (CloudFront lookup and invalidation) use `continue-on-error: true` so a cache invalidation failure never blocks a successful deployment.

### IAM Permissions

The `GitHubActionsRole` is granted the following scoped permissions:

- **ECR:** `ecr:GetAuthorizationToken`, `ecr:BatchCheckLayerAvailability`, `ecr:PutImage`, `ecr:InitiateLayerUpload`, `ecr:UploadLayerPart`, `ecr:CompleteLayerUpload` on the `joono-prd-portfolio` repository
- **Lambda:** `lambda:UpdateFunctionCode` on `joono-prd-portfolio-fn`
- **CloudFront:** `cloudfront:CreateInvalidation` on the `joono.work` distribution

The role retains `PowerUserAccess` until the scoped permissions above are validated in production, after which `PowerUserAccess` will be removed.

---

## Useful Commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
* `cdk list`        list all stacks in the app

---

## CloudFront Cache Invalidation

```bash
# List all distributions
aws cloudfront list-distributions \
  --query "DistributionList.Items[*].[Id,DomainName]" \
  --output table

# Invalidate all files
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/*"

# Invalidate specific paths
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/index.html" "/projects/*"
```

---

## Migration Notes

> **Required reading before renaming stateful stacks.**

Renaming a CloudFormation stack causes CloudFormation to treat the rename as a delete-and-recreate operation. For stacks that hold stateful resources (DynamoDB tables, SQS queues, S3 buckets), this would destroy live data. The following manual steps **must** be completed before applying any stack rename.

### Renaming `PortfolioCdkStack` → `joono-prd-portfolio`

This stack contains a DynamoDB table (page view tracking). Before renaming:

1. **Export the DynamoDB table** — use `aws dynamodb create-backup` or enable point-in-time recovery to preserve data.
2. **Remove the table from the old stack** — update the CDK code to remove the `DynamoDB.Table` construct from `PortfolioCdkStack` and deploy. This detaches the table from CloudFormation without deleting it (set `removalPolicy: RETAIN`).
3. **Import the table into the new stack** — after deploying the renamed `joono-prd-portfolio` stack, use `cdk import` to bring the existing table under the new stack's management.
4. **Verify** — run `cdk diff` to confirm no destructive changes are planned before deploying.

### Renaming `PortfolioNotificationStack` → `joono-prd-notifications`

This stack contains an SQS FIFO queue. Before renaming:

1. **Drain the queue** — ensure no in-flight messages are present (`ApproximateNumberOfMessages` and `ApproximateNumberOfMessagesNotVisible` are both 0).
2. **Set `removalPolicy: RETAIN`** on the SQS queue construct and deploy to detach it from the old stack without deletion.
3. **Deploy the renamed stack** — the new `joono-prd-notifications` stack will create a fresh queue. Use `cdk import` if you need to bring the existing queue under the new stack.
4. **Verify** — confirm the Ingest Lambda's `QUEUE_URL` environment variable points to the correct queue ARN after the rename.

### Renaming `GitHubActionsRole` → `joono-prd-github-actions-role`

This stack contains only IAM resources (stateless from a data perspective). The rename is lower risk, but:

1. **Pause CI/CD pipelines** — ensure no GitHub Actions workflows are running while the role is being recreated.
2. **Deploy the renamed stack** — CloudFormation will delete the old role and create a new one with the same trust policy and permissions.
3. **Verify OIDC** — trigger a test workflow run to confirm the new role is assumed successfully before re-enabling automated deployments.

### General Checklist

- [ ] Run `cdk diff` before every rename deployment and review for `[-]` (delete) actions on stateful resources
- [ ] Set `removalPolicy: RETAIN` on any resource you do not want CloudFormation to delete
- [ ] Use `cdk import` to bring retained resources under the new stack without recreation
- [ ] Coordinate renames during a low-traffic maintenance window
