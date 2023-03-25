import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
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

        // Assert it creates the function with the correct properties...
        template.hasResourceProperties("AWS::SQS::Queue", {
            QueueName: "MyQueue-dlq"
        });

        template.hasResourceProperties("AWS::SQS::Queue", {
            QueueName: "MyQueue"
        });

    });
});