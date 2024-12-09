import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3object from 'aws-cdk-lib/aws-s3-deployment'
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'mybucketuniqueid', {
      versioned: true
    });
    new s3object.BucketDeployment(this, 'deployfile' ,{
      sources: [s3object.Source.asset('./s3')],
      destinationBucket: bucket
    })
    const lambdaFn=new lambda.Function(this,'Mylambdafunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code:lambda.Code.fromAsset('lambda')
    
    })
  }
}
