import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import {
  ICdkGroup,
  ICdkRole,
  ICdkManagedPolicy,
  ICdkUser,
} from '../src/interfaces';

export const CdkGroups: ICdkGroup[] = [
  {
    groupName: 'CompanyIo_Administrators',
    path: '/company-io/groups/',
    roles: ['CompanyIo_AdministratorRole'],
  },
  {
    groupName: 'CompanyIo_Users',
    path: '/company-io/groups/',
  },
];

export const CdkRoles: ICdkRole[] = [
  {
    roleName: 'CompanyIo_AdministratorRole',
    policies: ['CompanyIo_AdministratorPolicy'],
    path: '/company-io/roles/',
    principalType: 'accountRoot',
  },
];

export const CdkManagedPolicies: ICdkManagedPolicy[] = [
  {
    managedPolicyName: 'CompanyIo_AdministratorPolicy',
    groups: ['CompanyIo_Administrators'],
    path: '/company-io/policies/',
    statements: [
      new PolicyStatement({
        actions: ['*'],
        effect: Effect.ALLOW,
        resources: ['*'],
      }),
    ],
  },
  {
    managedPolicyName: 'CompanyIo_UserPolicy',
    groups: ['CompanyIo_Users'],
    path: '/company-io/policies/',
    statements: [
      new PolicyStatement({
        actions: [
          'iam:ChangePassword',
          'iam:GetUser',
          'iam:ListMFADevices',
          'iam:ListVirtualMFADevices',
          'iam:EnableMFADevice',
          'iam:ResyncMFADevice',
        ],
        effect: Effect.ALLOW,
        resources: ['arn:aws:iam::*:user/company-io/users/${aws:username}'],
      }),
      new PolicyStatement({
        actions: ['iam:CreateVirtualMFADevice', 'iam:DeleteVirtualMFADevice'],
        effect: Effect.ALLOW,
        resources: ['arn:aws:iam::*:mfa/${aws:username}'],
      }),
    ],
  },
];

export const CdkUsers: ICdkUser[] = [
  {
    userName: 'jon.doe',
    groups: ['CompanyIo_Administrators'],
    roles: ['CompanyIo_AdministratorRole'],
    path: '/company-io/users/',
  },
  { userName: 'ses.svc1', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.svc2', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.svc3', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.svc4', path: '/company-io/services/', isSmtp: true },
];

export const Tags: { [key: string]: string } = {
  environment: 'production',
  owner: 'jon.doe@company.io',
  version: '2.1.0',
};
