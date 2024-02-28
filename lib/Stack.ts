import { Stack, StackProps } from 'aws-cdk-lib';
import { Group, ManagedPolicy, IUser } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CdkGroups, CdkPolicies, CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';
import { IamUser } from './IamUser';
// import { IamRole } from './IamRole';
import { IamPolicy } from './IamPolicy';

export class IamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // IAM Instances
    const CdkUser = new IamUser(this);
    const CdkGroup = new IamGroup(this);
    const CdkPolicy = new IamPolicy(this);
    // const CdkRole = new IamRole(this);

    // Create Policies
    const AwsPolicies: ManagedPolicy[] = CdkPolicies.map(policy => CdkPolicy.Set(policy));
    
    // Create Roles
    // const AwsRoles: Role[] = CdkRoles.map(role => CdkRole.Set(role));

    // Create Users
    const AwsUsers: IUser[] = CdkUsers.map(user => CdkUser.Set(user));

    // Create Groups
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const AwsGroups: Group[] = CdkGroups.map(group => CdkGroup.Set(group));

    // Add Roles to Groups
    // AwsRoles.forEach(AwsRole => CdkRole.AddRoleToAssignedGroups(AwsRole));

    // Add Users to Groups
    AwsUsers.forEach(AwsUser => CdkUser.AddUserToAssignedGroups(AwsUser));

    // Add Policies to Roles & Groups
    AwsPolicies.forEach(AwsPolicy => CdkPolicy.AddPolicyToAssignedRolesAndGroups(AwsPolicy));
  }
}