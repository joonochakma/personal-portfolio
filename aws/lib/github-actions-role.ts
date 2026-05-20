import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class GitHubActionsRole extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const account = this.account;
    const region = this.region;

    // OIDC Provider for GitHub Actions
    const provider = new iam.OpenIdConnectProvider(this, 'GitHubProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
      thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1'],
    });

    // IAM Role for GitHub Actions
    const role = new iam.Role(this, 'GitHubActionsRole', {
      assumedBy: new iam.WebIdentityPrincipal(
        provider.openIdConnectProviderArn,
        {
          StringEquals: {
            'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          },
          StringLike: {
            'token.actions.githubusercontent.com:sub': 'repo:joonochakma/personal-portfolio:*',
          },
        }
      ),
      managedPolicies: [
        // Retained until scoped permissions below are validated in production (Requirement 6.4)
        iam.ManagedPolicy.fromAwsManagedPolicyName('PowerUserAccess'),
      ],
    });

    // Scoped inline policy — least-privilege permissions for the CI/CD pipeline
    role.addToPolicy(new iam.PolicyStatement({
      sid: 'ECRAuthToken',
      effect: iam.Effect.ALLOW,
      actions: ['ecr:GetAuthorizationToken'],
      resources: ['*'], // GetAuthorizationToken is a global action; cannot be scoped to a repo ARN
    }));

    role.addToPolicy(new iam.PolicyStatement({
      sid: 'ECRImagePush',
      effect: iam.Effect.ALLOW,
      actions: [
        'ecr:BatchCheckLayerAvailability',
        'ecr:PutImage',
        'ecr:InitiateLayerUpload',
        'ecr:UploadLayerPart',
        'ecr:CompleteLayerUpload',
      ],
      // Scoped to the joono-prd-portfolio ECR repository (Requirement 6.1)
      resources: [
        `arn:aws:ecr:${region}:${account}:repository/joono-prd-portfolio`,
      ],
    }));

    role.addToPolicy(new iam.PolicyStatement({
      sid: 'LambdaUpdateFunctionCode',
      effect: iam.Effect.ALLOW,
      actions: ['lambda:UpdateFunctionCode'],
      // Scoped to the joono-prd-portfolio-fn Lambda function (Requirement 6.2)
      resources: [
        `arn:aws:lambda:${region}:${account}:function:joono-prd-portfolio-fn`,
      ],
    }));

    role.addToPolicy(new iam.PolicyStatement({
      sid: 'CloudFrontInvalidation',
      effect: iam.Effect.ALLOW,
      actions: ['cloudfront:CreateInvalidation'],
      // Scoped to all CloudFront distributions in the account (Requirement 6.3)
      // CloudFront is a global service; distribution ARNs use us-east-1 as the region
      resources: [
        `arn:aws:cloudfront::${account}:distribution/*`,
      ],
    }));

    new cdk.CfnOutput(this, 'RoleArn', {
      value: role.roleArn,
      description: 'Add this ARN to GitHub Secrets as AWS_ROLE_ARN',
    });
  }
}