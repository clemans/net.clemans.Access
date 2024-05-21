import { Stack, StackProps } from 'aws-cdk-lib';
import { IUser, ManagedPolicy, Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CdkIdPs, CdkGroups, CdkManagedPolicies, CdkRoles, CdkUsers } from '../config/parameters';
import { IamIdP } from './IamIdP';
import { IamGroup } from './IamGroup';
import { IamUser } from './IamUser';
import { IamRole } from './IamRole';
import { IamPolicy } from './IamPolicy';

export class IamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // IAM Instances
    const [CdkIdP, CdkGroup, CdkPolicy, CdkRole, CdkUser] = [
      new IamIdP(this), new IamGroup(this), new IamPolicy(this), new IamRole(this), new IamUser(this),
    ];

    // Create IdPs
    CdkIdPs.map(idp => CdkIdP.Set(idp));

    // Create Groups 
    CdkGroups.map(group => CdkGroup.Set(group));

    // Create Policies
    const AwsPolicies: ManagedPolicy[] = CdkManagedPolicies.map(policy => CdkPolicy.Set(policy));
    
    // Create Roles
    const AwsRoles: Role[] = CdkRoles.map(role => CdkRole.Set(role));

    // Create Users
    const AwsUsers: IUser[] = CdkUsers.map(user => CdkUser.Set(user));

    // Add Users to Groups
    AwsUsers.forEach(AwsUser => CdkUser.AddUserToAssignedGroups(AwsUser));

    // Add Policies to Groups
    AwsPolicies.forEach(AwsPolicy => CdkPolicy.AddPolicyToAssignedGroups(AwsPolicy));

    // Add Roles to Policies
    AwsRoles.forEach(AwsRole => CdkRole.AddRoleToAssignedPolicies(AwsRole));

    // Add Roles to Users
    AwsRoles.forEach(AwsRole => CdkRole.AddRoleToAssignedUsers(AwsRole));
  }
}