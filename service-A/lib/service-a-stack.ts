import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ServiceAStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function resource

    const myFunction = new NodejsFunction(this, "helloworld-lambda", {
      // ✅ Define the Node.js runtime explicitly
      runtime: lambda.Runtime.NODEJS_20_X,

      // ✅ Use an absolute path to avoid issues in different environments
      entry: path.resolve(__dirname, "../lib/handlers/hello-lambda.ts"),

      // ✅ Optimize bundling for performance and AWS Lambda best practices
      bundling: {
        format: OutputFormat.CJS, // CommonJS for better AWS Lambda compatibility
        minify: true, // Reduces package size and improves cold start time
        externalModules: ["aws-sdk"], // Exclude AWS SDK (already included in Lambda runtime)
        target: "node20", // Ensure compatibility with Node.js 20
        sourceMap: true, // Enable source maps for debugging
      },

      // ✅ Define memory and timeout to optimize Lambda execution
      memorySize: 256, // Adjust based on function complexity (lower means cheaper, higher means faster)
      timeout: cdk.Duration.seconds(300), // Avoid long-running executions

      // ✅ Define security best practices
      logRetention: cdk.aws_logs.RetentionDays.ONE_WEEK, // Retain logs for debugging but avoid long storage costs
      environment: {
        NODE_OPTIONS: "--enable-source-maps", // Enable source maps for better error tracing
      },

      // ✅ Enable function insights (monitoring)
      tracing: lambda.Tracing.ACTIVE, // Enable AWS X-Ray tracing for performance monitoring

      // ✅ Grant Lambda permissions to use other AWS resources
      initialPolicy: [
        new cdk.aws_iam.PolicyStatement({
          actions: ["dynamodb:Query", "dynamodb:Scan"], // Example: Add specific permissions
          resources: ["arn:aws:dynamodb:us-east-1:123456789012:table/MyTable"],
        }),
      ],
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
