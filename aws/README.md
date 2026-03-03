# Portfolio Infrastructure - AWS CDK

This project contains the AWS CDK infrastructure code for the personal portfolio website.

## CDK Stacks

### PortfolioNotificationStack
Manages SNS topics and notifications for monitoring and alerting purposes.

### PortfolioCdkStack
Core infrastructure stack containing Lambda functions, API Gateway, and DynamoDB tables for backend services (e.g., page view tracking).

### joono-prd-hostedzone
Route 53 hosted zone for DNS management of the production domain.

### joono-prd-global-certificate
ACM (AWS Certificate Manager) certificate for HTTPS/SSL, deployed in us-east-1 region (required for CloudFront).

### joono-prd-website
CloudFront distribution, S3 bucket, and related resources for hosting and serving the static Next.js website.

### GitHubActionsRole
IAM role with necessary permissions for GitHub Actions to deploy infrastructure and application updates via CI/CD pipeline.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
* `cdk list`        list all stacks in the app
* `aws cloudfront list-distributions --query "DistributionList.Items[*].[Id,DomainName]" --output table` to invalidate the cache 