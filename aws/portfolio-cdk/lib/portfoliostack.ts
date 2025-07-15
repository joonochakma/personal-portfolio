import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class PortfolioCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Deploy the standalone Next.js output from `.next/standalone/app.zip`
    const portfolioFunction = new lambda.Function(this, 'PortfolioLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'run.sh',
      code: lambda.Code.fromAsset('../../nextjs-app/.next/standalone/app.zip'),
      memorySize: 256,
      environment: {
        PORT: '8000',
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/bootstrap',
      },
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          'LambdaAdapterLayer',
          `arn:aws:lambda:ap-southeast-2:753240598075:layer:LambdaAdapterLayerX86:25`
        ),
      ],
    });

    const portfolioFunctionUrl = portfolioFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
