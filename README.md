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
    subgraph Stack_GHA [GitHubActionsRole Infrastructure]
        OIDC[AWS IAM OIDC Provider]
        GH_Role[GitHubActionsRole]
    end

    %% DNS Boundary
    subgraph Stack_DNS [joono-prd-hostedzone]
        R53[Route 53 Public Hosted Zone]
        ApexRecord[A/AAAA Record: portfolio.domain]
    end

    %% Certificate Boundary
    subgraph Stack_Cert [joono-prd-global-certificate]
        ACM[AWS Certificate Manager Certificate]
    end

    %% Frontend Hosting Boundary
    subgraph Stack_Website [joono-prd-website]
        CF[Amazon CloudFront Global CDN Distribution]
        S3_Website[Amazon S3 Bucket: Static Next.js Assets]
        OAC[CloudFront Origin Access Control]
    end

    %% Backend Serverless Boundary
    subgraph Stack_Backend [PortfolioCdkStack]
        APIGW[Amazon API Gateway REST API]
        
        %% Computes
        subgraph Compute_Layer [AWS Lambda Runtime Environment]
            Lambda_Tracker[Page View Tracker Lambda]
            Webiny_GraphQL[Webiny GraphQL API Lambda]
            Webiny_Admin[Webiny Admin Console Lambda]
        end

        %% Database/Storage
        subgraph Storage_Layer [Persistence & State Tier]
            DDB_Telemetry[(Amazon DynamoDB: Analytics/State)]
            S3_Assets[Amazon S3 Bucket: Webiny Media Assets]
        end
    end

    %% Pipeline Paths
    GitHubPlatform -->|1. Triggers Push Workflow| OIDC
    OIDC -->|2. Assumes Session Privileges| GH_Role
    GH_Role -->|3a. Deploys Static HTML/JS Build| S3_Website
    GH_Role -->|3b. Updates Infrastructure Assets| Stack_Backend
    GH_Role -->|3c. Invalidates Global Edge Caches| CF

    %% End User Request Lifecycle Paths
    User -->|4. Resolves Domain Name Lookup| R53
    R53 -.->|Returns CloudFront CNAME Pointer| User
    
    User -->|5. Initiates Safe HTTPS Connection| CF
    ACM -->|Provides Verified TLS Session Binding| CF

    %% CloudFront Routing Optimization Logic
    CF -->|6a. Fallback Static Requests| OAC
    OAC -->|Authorizes Content Access| S3_Website
    
    CF -->|6b. Proxies Application API Routes /api/*| APIGW

    %% API Gateway Backing Orchestration
    APIGW -->|7a. Directs Analytics Paths| Lambda_Tracker
    APIGW -->|7b. Resolves CMS Reads/Writes| Webiny_GraphQL
    APIGW -->|7c. Renders UI Controls| Webiny_Admin

    %% Storage Hydration & Mutation Mapping
    Lambda_Tracker -->|Updates Atomic Metrics| DDB_Telemetry
    Webiny_GraphQL -->|Fetches Layout/Content Schemas| DDB_Telemetry
    Webiny_GraphQL -->|Saves Uploaded Asset Streams| S3_Assets

    %% Styling Class Definitions
    classDef iam fill:#f4e3f7,stroke:#9b5de5,stroke-width:1.5px;
    classDef dns fill:#e2f0d9,stroke:#70ad47,stroke-width:1.5px;
    classDef cert fill:#fff2cc,stroke:#ffc000,stroke-width:1.5px;
    classDef website fill:#deeaf6,stroke:#4472c4,stroke-width:1.5px;
    classDef backend fill:#fce4d6,stroke:#ed7d31,stroke-width:1.5px;

    class OIDC,GH_Role iam;
    class R53,ApexRecord dns;
    class ACM cert;
    class CF,S3_Website,OAC website;
    class APIGW,Lambda_Tracker,Webiny_GraphQL,Webiny_Admin,DDB_Telemetry,S3_Assets backend;
