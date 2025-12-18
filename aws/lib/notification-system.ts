import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as ses from 'aws-cdk-lib/aws-ses';

export class PortfolioNotificationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* SQS */
    const pageViewQueue = new sqs.Queue(this, 'PageViewQueue', {
      visibilityTimeout: cdk.Duration.seconds(60),
      retentionPeriod: cdk.Duration.days(4)
    });

    /* Lambda: Ingest */
    const ingestLambda = new lambda.Function(this, 'IngestPageViewLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
        const sqs = new SQSClient({});
        export const handler = async (event) => {
          const body = JSON.parse(event.body || '{}');
          const msg = {
            path: body.path,
            referrer: body.referrer,
            userAgent: body.userAgent,
            ip: event.requestContext.http.sourceIp,
            ts: new Date().toISOString()
          };
          await sqs.send(new SendMessageCommand({
            QueueUrl: process.env.QUEUE_URL,
            MessageBody: JSON.stringify(msg)
          }));
          return { statusCode: 200 };
        };
      `),
      environment: {
        QUEUE_URL: pageViewQueue.queueUrl
      }
    });

    pageViewQueue.grantSendMessages(ingestLambda);

    /* API Gateway (HTTP) */
    const httpApi = new apigwv2.HttpApi(this, 'PortfolioHttpApi', {
      apiName: 'portfolio-notification-api'
    });

    httpApi.addRoutes({
      path: '/pageview',
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        'PageViewIntegration',
        ingestLambda
      )
    });

    /* SES Identity*/
    const emailIdentity = new ses.EmailIdentity(
      this,
      "PortfolioEmailIdentity",
      {
        identity: ses.Identity.email(
          "joonosphotographyschool+mockSendCDK@gmail.com"
        ),
      }
    );

    /*  Lambda: */
    const processorLambda = new lambda.Function(this, "ProcessPageViewLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
    const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
    const ses = new SESClient({});

    exports.handler = async (event) => {
      for (const record of event.Records) {
        const view = JSON.parse(record.body);
        await ses.send(new SendEmailCommand({
          Source: process.env.SOURCE_EMAIL,
          Destination: { ToAddresses: [process.env.DEST_EMAIL] },
          Message: {
            Subject: { Data: 'New Portfolio View' },
            Body: {
              Text: {
                Data:
                  'New visitor on joono.work\\n' +
                  'Page: ' + view.path + '\\n' +
                  'IP: ' + view.ip + '\\n' +
                  'Time: ' + view.ts
              }
            }
          }
        }));
      }
    };
  `),
      environment: {
        SOURCE_EMAIL: process.env.SOURCE_EMAIL!,
        DEST_EMAIL: process.env.DEST_EMAIL!,
      },
    });


    processorLambda.addEventSource(
      new lambdaEventSources.SqsEventSource(pageViewQueue, {
        batchSize: 5
      })
    );

    processorLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ses:SendEmail', 'ses:SendRawEmail'],
        resources: ['*']
      })
    );

    /* Outputs */
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: httpApi.url ?? 'undefined'
    });
  }
}
