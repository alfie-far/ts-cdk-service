import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ServiceAStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Define the Lambda function resource
    
    const myFunction = new NodejsFunction(this, "helloworld-lambda", {
      // we want to use the LTS version of NodeJS
      // to get best performance and features
      runtime: Runtime.NODEJS_20_X,
      // your lambda function path
      entry: path.join(__dirname, "../lib/handlers/hello-lambda.ts"),
      // additional config for esbuild
      bundling: {
        // we want to use ESM instead of CJS
        format: OutputFormat.ESM,
      },
    });
    
    // const myFunction = new lambda.NodejsFunction(this, "APIGatewayHelloWorldGET", {
    //   runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
    //   handler: "index.handler",
    //   code: lambda.Code.fromInline(`
    //     exports.handler = async function(event) {
    //       return {
    //         statusCode: 200,
    //         body: JSON.stringify('Hello World!'),
    //       };
    //     };
    //   `),
    // });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ServiceAQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
