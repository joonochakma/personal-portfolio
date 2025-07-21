import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CloudFrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const portfolioFunction = lambda.Function.fromFunctionArn(this, "function", "arn:aws:lambda:ap-southeast-2:730335304134:function:PortfolioCdkStack-PortfolioLambda015C4EC4-AOEaL4zP4d1S");
    const portfolioFunctionUrl = portfolioFunction.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });


    new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin:
          origins.FunctionUrlOrigin.withOriginAccessControl(
            portfolioFunctionUrl
          ),
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}
