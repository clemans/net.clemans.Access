import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export interface ICdkGroup {
  groupName: string;
  path?:  string;
  managedPolicies?: string[];
}

export interface ICdkRole {
  roleName: string;
  path: string;
  allowedGroups: string[];
  attachPolicyNames: string[];
}

export interface ICdkPolicy {
  statements?: PolicyStatement[];
  path?: string;
  groups: string[];
  managedPolicyName: string; 
  roles?: string[];
}

export interface ICdkUser {
  userName: string;
  groups: string[];
  path: string;
}

export const CdkGroups: ICdkGroup[] = [
  {
    groupName: 'CompanyIo_Emailers',
    path: '/company-io/groups/',
    managedPolicies: ['CompanyIo_EmailSenderPolicy']
  },
  {
    groupName: 'CompanyIo_Administrators',
    path: '/company-io/groups/',
    managedPolicies: ['AdministratorAccess']
  }
];

export const CdkRoles: ICdkRole[] = [
  {
    roleName: 'CompanyIo_EmailSenderRole',
    path: '/company-io/roles/',
    allowedGroups: ['CompanyIo_Emailers'],
    attachPolicyNames: ['CompanyIo_EmailSenderPolicy']
  },
  {
    roleName: 'CompanyIo_AdministratorRole',
    path: '/company-io/roles/',
    allowedGroups: ['CompanyIo_Administrators'],
    attachPolicyNames: ['AdministratorAccess']
  }
];

export const CdkUsers: ICdkUser[] = [
  { userName: 'jon.doe', groups: ['CompanyIo_Administrators'], path: '/company-io/users/' },
  { userName: 'ses.abc', groups: ['CompanyIo_Emailers'], path: '/company-io/services/' },
  { userName: 'ses.def', groups: ['CompanyIo_Emailers'], path:  '/company-io/services/' },
  { userName: 'ses.ghi', groups: ['CompanyIo_Emailers'], path:  '/company-io/services/' },
  { userName: 'ses.jkl', groups: ['CompanyIo_Emailers'], path:  '/company-io/services/' }
];

export const Tags: { [key: string]: string } =  {
  environment: 'production',
  owner: 'jon.doe@example.io',
  version: '0.0.1'
};

export const CdkPolicies: ICdkPolicy[] = [
  {
    managedPolicyName: 'CompanyIo_EmailSenderPolicy',
    groups: ['CompanyIo_Emailers'],
    roles: ['CompanyIo_EmailSenderRole'],
    path: '/company-io/policies/',
    statements: [
      new PolicyStatement({
        actions: ['ses:SendEmail', 'ses:SendRawEmail'], 
        effect: Effect.ALLOW, 
        resources: ['*']
      })
    ]
  },
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
];