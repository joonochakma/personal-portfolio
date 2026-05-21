import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export interface PortfolioCdkStackProps extends cdk.StackProps {
  readonly ecrRepoArn: string;
  readonly imageTag?: string;
}

export class PortfolioCdkStack extends cdk.Stack {
  public readonly functionUrl: lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: PortfolioCdkStackProps) {
    super(scope, id, props);

    const { ecrRepoArn, imageTag = 'latest' } = props;

    // Import by ARN to avoid cross-stack resource policies that trigger EarlyValidation hooks
    const ecrRepo = ecr.Repository.fromRepositoryArn(this, 'EcrRepo', ecrRepoArn);

    const portfolioFunction = new lambda.DockerImageFunction(this, 'PortfolioLambda', {
      functionName: 'joono-prd-portfolio-fn',
      code: lambda.DockerImageCode.fromEcr(ecrRepo, { tagOrDigest: imageTag }),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
        AWS_LWA_PORT: '3000',
        AWS_LWA_READINESS_CHECK_PATH: '/',
        NEXT_PUBLIC_WEBINY_API: 'https://d1xtgyv1x7fnza.cloudfront.net/cms/read/en-US',
        WEBINY_API_TOKEN: cdk.aws_ssm.StringParameter.valueFromLookup(this, '/joono-prd/webiny-api-token'),
        NEXT_PUBLIC_API_ENDPOINT: 'https://elvm04q665.execute-api.ap-southeast-2.amazonaws.com/',
      },
    });

    this.functionUrl = portfolioFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
