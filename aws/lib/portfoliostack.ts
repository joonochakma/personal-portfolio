import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export interface PortfolioCdkStackProps extends cdk.StackProps {
  readonly ecrRepo: ecr.IRepository;
  readonly imageTag?: string;
}

export class PortfolioCdkStack extends cdk.Stack {
  public readonly functionUrl: lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: PortfolioCdkStackProps) {
    super(scope, id, props);

    const { ecrRepo, imageTag = 'latest' } = props;

    const portfolioFunction = new lambda.DockerImageFunction(this, 'PortfolioLambda', {
      functionName: 'joono-prd-portfolio-fn',
      code: lambda.DockerImageCode.fromEcr(ecrRepo, { tagOrDigest: imageTag }),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
      },
    });

    this.functionUrl = portfolioFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });
  }
}
