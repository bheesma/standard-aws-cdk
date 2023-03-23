// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface AppProps {
  // Define construct properties here
}

export class App extends Construct {

  constructor(scope: Construct, id: string, props: AppProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
