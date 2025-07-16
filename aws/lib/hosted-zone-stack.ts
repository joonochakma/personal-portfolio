import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_route53 as route53} from "aws-cdk-lib";

export class HostedZoneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domain = new route53.HostedZone(this, "joono.work", {
      zoneName: "joono.work",
    });
  }
}
