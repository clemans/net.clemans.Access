import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export interface ICdkGroup {
  groupName: string;
  path:  string;
}

export interface ICdkRole {
  roleName: string;
  path: string;
  allowedGroups: string[];
}

export interface ICdkPolicy {
  statements?: PolicyStatement[];
  path?: string;
  groups: string[];
  managedPolicyName: string; 
  roles?: string[];
}

export interface ICdkUser {
  isSmtp?: boolean;
  userName: string;
  groups?: string[];
  path: string;
}

export const CdkGroups: ICdkGroup[] = [
  {
    groupName: 'CompanyIo_Administrators',
    path: '/company-io/groups/',
  },
  {
    groupName: 'CompanyIo_Users',
    path: '/company-io/groups/',
  }
];

export const CdkRoles: ICdkRole[] = [];

export const CdkPolicies: ICdkPolicy[] = [
  {
    managedPolicyName: 'CompanyIo_AdministratorPolicy',
    groups: ['CompanyIo_Administrators'],
    path: '/company-io/policies/',
    statements: [
      new PolicyStatement({
        actions: ['*'], 
        effect: Effect.ALLOW, 
        resources: ['*']
      })
    ]
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
        resources: ['arn:aws:iam::*:user/company-io/users/${aws:username}']
      }),
      new PolicyStatement({
        actions: [
          'iam:CreateVirtualMFADevice',
          'iam:DeleteVirtualMFADevice'
        ],
        effect: Effect.ALLOW,
        resources: ['arn:aws:iam::*:mfa/${aws:username}']
      }),
    ]
  },
];

export const CdkUsers: ICdkUser[] = [
  { userName: 'jon.doe', groups: ['CompanyIo_Administrators'], path: '/company-io/users/' },
  { userName: 'ses.svc1', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.svc2', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.svc3', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.svc4', path: '/company-io/services/', isSmtp: true },
];

export const Tags: { [key: string]: string } =  {
  environment: 'production',
  owner: 'jon.doe@company.io',
  version: '2.0.1'
};