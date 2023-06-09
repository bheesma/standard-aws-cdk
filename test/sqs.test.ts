import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as App from '../lib/index';
import { StandardSQS, StandardSQSProps } from '../lib/index';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/index.ts
describe('StandardSQS', () => {
    let stack: Stack;

    beforeEach(() => {
        const app = new cdk.App();
        stack = new Stack(app, "TestStack");
    });

    test('should create a standard SQS queue with a dead letter queue', () => {
        // GIVEN
        const props: StandardSQSProps = {
            queueName: 'MyQueue'
        };

        // WHEN
        new StandardSQS(stack, 'MyQueue', props);

        const template = Template.fromStack(stack);

        // ASSERT

        //DLQ exists and encrypted
        template.hasResourceProperties("AWS::SQS::Queue", {
            QueueName: "MyQueue-dlq",
            SqsManagedSseEnabled: true
        });

        //DLQ does not have another DLQ associated with it
        template.hasResourceProperties("AWS::SQS::Queue", {
            QueueName: "MyQueue-dlq",
            RedrivePolicy: Match.absent()
        });

        //Main queue exists, encrypted and has dead letter queue associated
        template.hasResourceProperties("AWS::SQS::Queue", {
            QueueName: "MyQueue",
            SqsManagedSseEnabled: true,
            RedrivePolicy: {
                "deadLetterTargetArn": {
                  "Fn::GetAtt": [
                    "MyQueueMyQueuedlqD7DA31C4",
                    "Arn",
                  ],
                }
            }
        });

    });

    test('match snapshot', () => {
        // GIVEN
        const props: StandardSQSProps = {
            queueName: 'MyQueue'
        };

        // WHEN
        new StandardSQS(stack, 'MyQueue', props);

        const template = Template.fromStack(stack);

        // ASSERT
        expect(template.toJSON()).toMatchSnapshot();

    });
});