<img width="1576" height="922" alt="image" src="https://github.com/user-attachments/assets/5678f15b-7cf9-43e7-9b14-8a9f9b8b4efc" />

# System Architecture & Infrastructure Documentation

This document provides a comprehensive overview of the system architecture, infrastructure stacks, and CI/CD pipelines powering the personal portfolio application. The entire cloud ecosystem is managed as infrastructure-as-code (IaC) using the AWS Cloud Development Kit (CDK), ensuring repeatable, secure, and modular deployments.

---

## Technical Overview
The platform leverages a hybrid **Jamstack & Serverless Microservices** architecture:
- **Frontend Architecture:** Built using **Next.js**, delivering an optimized, high-performance static UI shell backed by hydration logic for dynamic features.
- **Backend Architecture:** Powered by **Webiny CMS** and custom serverless endpoints, orchestrating headless content management, telemetry capturing, and visitor tracking natively on AWS.
- **Infrastructure Delivery:** Managed as an isolated, globally accelerated edge configuration utilizing Amazon CloudFront and Route 53, entirely provisioned via programmatic AWS CDK stacks.

---

## Comprehensive Architecture Diagram

The Mermaid diagram below visualizes the physical and logical segregation of resources mapped to their respective AWS CDK stacks, detailing how data flows from source control deployment down to edge caching and telemetry storage.

```mermaid
graph TB
%% External Nodes
User([Global Web Visitor])
GitHubPlatform[GitHub Repository / Main Branch]

%% CI/CD Boundary
subgraph Stack_GHA [joono-prd-github-actions-role]
  OIDC[AWS IAM OIDC Provider]
  GH_Role[GitHubActionsRole IAM Role]
end

%% DNS Boundary
subgraph Stack_DNS [joono-prd-hostedzone]
  R53[Route 53 Public Hosted Zone]
  ApexRecord[A/AAAA Records: joono.work + www.joono.work]
end

%% Certificate Boundary
subgraph Stack_Cert [joono-prd-global-certificate]
  ACM[AWS Certificate Manager — us-east-1]
end

%% Container Registry
subgraph Stack_ECR [joono-prd-ecr]
  ECR_Repo[ECR Repository: joono-prd-portfolio\nTag Immutability: ENABLED\nLifecycle: max 10 images / untagged > 7d]
end

%% Frontend + Routing Boundary
subgraph Stack_Website [joono-prd-website]
  CF[Amazon CloudFront Global CDN Distribution]
  OAC[CloudFront Origin Access Control\nfor Lambda Function URL]
end

%% Backend Boundary
subgraph Stack_Portfolio [joono-prd-portfolio]
  Lambda_FN[Container Lambda: joono-prd-portfolio-fn\nDockerImageCode from ECR\n512 MB / 30s timeout]
  FN_URL[Lambda Function URL\nAuth: AWS_IAM]
end

%% Notifications Boundary
subgraph Stack_Notifications [joono-prd-notifications]
  APIGW[HTTP API Gateway: portfolio-notification-api]
  SQS[SQS FIFO Queue: PageViewQueue.fifo]
  Lambda_Ingest[Ingest Lambda: IngestPageViewLambda]
  Lambda_Processor[Processor Lambda: ProcessPageViewLambda]
  SES[AWS SES: Email Notification]
end

%% ── CI/CD Pipeline Flow ──────────────────────────────────────────────────────
GitHubPlatform -->|"1. push to main triggers workflow"| OIDC
OIDC -->|"2. OIDC token exchange"| GH_Role
GH_Role -->|"3. docker build + tag :SHA"| ECR_Repo
GH_Role -->|"4. docker push :SHA + :latest"| ECR_Repo
GH_Role -->|"5. lambda update-function-code --image-uri :SHA"| Lambda_FN
GH_Role -->|"6. cloudfront create-invalidation /*"| CF

%% ── End-User Request Lifecycle ───────────────────────────────────────────────
User -->|"A. DNS lookup joono.work"| R53
R53 -.->|"Returns CloudFront CNAME"| User
User -->|"B. HTTPS request"| CF
ACM -->|"TLS certificate binding"| CF

%% CloudFront → Lambda
CF -->|"C. All requests (default behaviour)"| OAC
OAC -->|"Signed request to Function URL"| FN_URL
FN_URL -->|"Invokes container"| Lambda_FN
Lambda_FN -->|"Next.js SSR / static response"| CF

%% Notification side-path
CF -->|"D. POST /pageview"| APIGW
APIGW --> Lambda_Ingest
Lambda_Ingest --> SQS
SQS --> Lambda_Processor
Lambda_Processor --> SES
```
