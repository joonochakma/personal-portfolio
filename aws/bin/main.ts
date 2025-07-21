#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PortfolioCdkStack } from '../lib/portfoliostack';
import { HostedZoneStack } from '../lib/hosted-zone-stack';
import { CertificateStack } from '../lib/certificate-stack';
import { CloudFrontStack } from '../lib/cloudfront-stack';

const domain = 'joono.work';

const app = new cdk.App();
new PortfolioCdkStack(app, "PortfolioCdkStack", {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: "730335304134", region: "ap-southeast-4" },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

new HostedZoneStack(app, "joono-prd-hostedzone", {
  domain,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new CertificateStack(app, "joono-prd-global-certificate", {
  domain: `*.${domain}`,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
});

new CloudFrontStack(app, "joono-prd-cloudfront", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
