import { PolicyDocument, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export interface ICdkGroup {
  groupName: string;
  roles?: string[];
  path: string;
}

export interface ICdkIdP {
  oidcProviderName: string;
  url: string;
  clientIds: string[];
}

export interface ICdkManagedPolicy {
  statements?: PolicyStatement[];
  path?: string;
  groups: string[];
  managedPolicyName: string;
  roles?: string[];
}

export interface ICdkRole {
  roleName: string;
  description?: string;
  assumeRoleAction?: string;
  conditions?: {
    [key: string]: {
      [key: string]: string | string[];
    };
  };
  inlinePolicies?: {
    [key: string]: PolicyDocument;
  };
  oidcName?: string;
  policies?: string[];
  path: string;
  principalType: string;
}

export interface ICdkUser {
  isSmtp?: boolean;
  userName: string;
  groups?: string[];
  roles?: string[];
  path: string;
}
