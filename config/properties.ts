import { StackProps } from 'aws-cdk-lib';
import { Tags } from './parameters';
import 'dotenv/config';

export const Properties: StackProps = {
  stackName: process.env.AWS_STACK_NAME,
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION,
  },
  description: process.env.AWS_STACK_DESCRIPTION,
  tags: Tags,
  terminationProtection: process.env.AWS_TERMINATION_PROTECTION === 'true',
};
