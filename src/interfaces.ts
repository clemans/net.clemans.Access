import { PolicyStatement, } from 'aws-cdk-lib/aws-iam';

export interface ICdkGroup {
  groupName: string;
  roles?: string[];
  path:  string;
}

export interface ICdkIdP {
  oidcProviderName: string;
  url: string;
  clientIds: string[];
  assumedRole: string;
}

export interface ICdkInlinePolicy {
  statements: PolicyStatement[];
}

export interface ICdkManagedPolicy {
  statements?: PolicyStatement[];
  path?: string;
  groups: string[];
  managedPolicyName: string; 
  roles?: string[];
}

export interface ICdkPrincipal {
  type?: string;
  idpArn?: string;
  conditions?: { 
    [key: string]: { [key: string]: []}
  } 

}

export interface ICdkRole {
  roleName: string;
  policies?: string[];
  path: string;
  oidcName?: string;
  conditions?: { 
    [key: string]: { 
      [key: string]: string | string[];
    }
  }
}

export interface ICdkUser {
  isSmtp?: boolean;
  userName: string;
  groups?: string[];
  roles?: string[];
  path: string;
}