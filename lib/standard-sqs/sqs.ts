import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface StandardSQSProps {
  queueName: string;
}

export class StandardSQS extends Construct {

  constructor(scope: Construct, id: string, props: StandardSQSProps) {
    super(scope, id);

    // dead letter queue
    const dlq = new sqs.Queue(this, props.queueName + '-dlq', {
      queueName: props.queueName + '-dlq',
      encryption: sqs.QueueEncryption.SQS_MANAGED
    });

    // main queue
    const mainQueue = new sqs.Queue(this, props.queueName, {
      queueName: props.queueName,
      visibilityTimeout: cdk.Duration.seconds(300),
      encryption: sqs.QueueEncryption.SQS_MANAGED,
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: dlq
      }
    });

  }
}
