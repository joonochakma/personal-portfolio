import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_route53 as route53} from "aws-cdk-lib";

export interface HostedZoneProps extends cdk.StackProps{
  readonly domain: string;
} 
export class HostedZoneStack extends cdk.Stack {
  readonly hostedZoneId: string;
  hostedzone: route53.IHostedZone
  constructor(scope: Construct, id: string, props: HostedZoneProps) {
    super(scope, id, props);

    const hostedzone = new route53.HostedZone(this, "HostedZone", {
      zoneName: props.domain,
    });

    this.hostedZoneId = hostedzone.hostedZoneId
  }
}
