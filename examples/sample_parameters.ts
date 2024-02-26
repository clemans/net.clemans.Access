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

export const CdkRoles: ICdkRole[] = [
  {
    roleName: 'CompanyIo_AdministratorRole',
    path: '/company-io/roles/',
    allowedGroups: ['CompanyIo_Administrators'],
  },
  {
    roleName: 'CompanyIo_UserRole',
    path: '/company-io/roles/',
    allowedGroups: ['CompanyIo_Users'],
  }
];

export const CdkPolicies: ICdkPolicy[] = [
  {
    managedPolicyName: 'CompanyIo_AdministratorPolicy',
    groups: ['CompanyIo_Administrators'],
    roles: ['CompanyIo_AdministratorRole'],
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
  { userName: 'jon.doe', groups: ['CompanyIo_Users', 'CompanyIo_Administrators'], path: '/company-io/users/' },
  { userName: 'ses.git', path: '/company-io/services/', isSmtp: true },
  { userName: 'ses.nas', path:  '/company-io/services/', isSmtp: true },
  { userName: 'ses.ups', path:  '/company-io/services/', isSmtp: true },
  { userName: 'ses.torrent', path:  '/company-io/services/', isSmtp: true },
];

export const Tags: { [key: string]: string } =  {
  environment: 'development',
  owner: 'jon.doe@company.io',
  version: '0.0.1'
};