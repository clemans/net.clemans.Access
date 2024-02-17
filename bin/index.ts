import { App, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IamStack } from '../lib/Stack';
import { Properties } from '../config/properties';

const app: Construct = new App();
new IamStack(app, Properties.stackName as string, Properties as StackProps);