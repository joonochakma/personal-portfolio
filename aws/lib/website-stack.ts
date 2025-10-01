import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";

export interface WebsiteProps extends cdk.StackProps {
  readonly domain: string;
  readonly hostedZoneId: string;
  readonly certificateArn: string;
}
export class WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id, props);

    const portfolioFunction = lambda.Function.fromFunctionArn(
      this,
      "function",
      "arn:aws:lambda:ap-southeast-2:730335304134:function:PortfolioCdkStack-PortfolioLambda015C4EC4-AOEaL4zP4d1S"
    );
    const portfolioFunctionUrl = portfolioFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      domainNames: [props.domain, `www.${props.domain}`],
      certificate: certificatemanager.Certificate.fromCertificateArn(
        this,
        "certificate",
        props.certificateArn
      ),
      defaultBehavior: {
        origin:
          origins.FunctionUrlOrigin.withOriginAccessControl(
            portfolioFunctionUrl
          ),
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy:
          cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
    const myZone = route53.PublicHostedZone.fromHostedZoneAttributes(
      this,
      "HostedZone",
      {
        hostedZoneId: props.hostedZoneId,
        zoneName: props.domain,
      }
    );
    
    new route53.ARecord(this, "A-Alias", {
      zone: myZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });


    new route53.AaaaRecord(this, "AAAA-Alias", {
      zone: myZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    new route53.AaaaRecord(this, "AAAA-www-Alias", {
      zone: myZone,
      recordName: `www.${props.domain}`,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    new route53.ARecord(this, "A-www-Alias", {
      zone: myZone,
      recordName: `www.${props.domain}`,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });
  }
}
