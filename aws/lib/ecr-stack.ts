import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class EcrStack extends cdk.Stack {
  public readonly repository: ecr.Repository;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.repository = new ecr.Repository(this, 'PortfolioRepository', {
      repositoryName: 'joono-prd-portfolio',
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.repository.addLifecycleRule({
      rulePriority: 1,
      description: 'Remove untagged images older than 7 days',
      tagStatus: ecr.TagStatus.UNTAGGED,
      maxImageAge: cdk.Duration.days(7),
    });

    this.repository.addLifecycleRule({
      rulePriority: 2,
      description: 'Keep only the 10 most recent images',
      tagStatus: ecr.TagStatus.ANY,
      maxImageCount: 10,
    });
  }
}
