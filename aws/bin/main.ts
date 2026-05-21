#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import "dotenv/config";
import { PortfolioCdkStack } from '../lib/portfoliostack';
import { EcrStack } from '../lib/ecr-stack';
import { HostedZoneStack } from '../lib/hosted-zone-stack';
import { CertificateStack } from '../lib/certificate-stack';
import { WebsiteStack } from '../lib/website-stack';
import { PortfolioNotificationStack } from "../lib/notification-system";

import { GitHubActionsRole } from '../lib/github-actions-role';

const domain = 'joono.work';

const app = new cdk.App();

// Email notification system for contact forms
new PortfolioNotificationStack(app, "joono-prd-notifications", {
  stackName: 'joono-prd-notifications',
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

// ECR repository for container images
const ecrStack = new EcrStack(app, "joono-prd-ecr", {
  stackName: 'joono-prd-ecr',
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

// Main Next.js application deployed as container Lambda function
// ecrRepo is imported by ARN inside PortfolioCdkStack to avoid cross-stack resource policies
new PortfolioCdkStack(app, "joono-prd-portfolio", {
  stackName: 'joono-prd-portfolio',
  ecrRepoArn: `arn:aws:ecr:${process.env.CDK_DEFAULT_REGION}:${process.env.CDK_DEFAULT_ACCOUNT}:repository/joono-prd-portfolio`,
  // imageTag defaults to 'latest'; the pipeline overrides this with the commit SHA at deploy time

  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

// Route53 hosted zone for joono.work domain
const hostedzone = new HostedZoneStack(app, "joono-prd-hostedzone", {
  domain,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// SSL certificate for HTTPS (must be in us-east-1 for CloudFront)
const certificateStack = new CertificateStack(app, "joono-prd-global-certificate", {
  domain,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
});

// CloudFront distribution + Route53 records for website
new WebsiteStack(app, "joono-prd-website", {
  domain,
  hostedZoneId: "Z05005423H95J6MBZYWXE",
  certificateArn:
    // "arn:aws:acm:us-east-1:730335304134:certificate/5371e355-baa9-4fa5-a6c9-cb7d5632ad68", OLD
    "arn:aws:acm:us-east-1:730335304134:certificate/6d220967-b2ba-4dcb-8356-b688f2a6bf58",

  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// GitHub Actions OIDC Role for CI/CD
new GitHubActionsRole(app, 'joono-prd-github-actions-role', {
  stackName: 'joono-prd-github-actions-role',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
