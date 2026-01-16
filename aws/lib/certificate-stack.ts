import { Construct } from "constructs";
import {
  aws_certificatemanager as certificatemanager,
  aws_route53 as route53,
  Stack,
  StackProps,
} from "aws-cdk-lib";

export interface CertificateProps extends StackProps {
  readonly domain: string;
}

export class CertificateStack extends Stack {
  public readonly certificate: certificatemanager.ICertificate;

  constructor(scope: Construct, id: string, props: CertificateProps) {
    super(scope, id, props);

    this.certificate = new certificatemanager.Certificate(this, "Certificate", {
      domainName: props.domain,
      subjectAlternativeNames: [`*.${props.domain}`],
      validation: certificatemanager.CertificateValidation.fromDns(),
    });
  }
}
