import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { ManagedPolicy, IPrincipal, IRole, Role, AccountPrincipal } from 'aws-cdk-lib/aws-iam';
import { ICdkGroup } from '../config/parameters';
import { IamGroup } from './IamGroup';

export class IamRole {
  private static Name(params: ICdkGroup) {
    return `${params.groupName}Role`;
  }

  public static Get(scope: Construct, params: ICdkGroup): IRole {
    try {
      return Role.fromRoleName(scope, this.Name(params), this.Name(params));
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return this.Set(scope, params);
      }
      throw error; // Re-throw the error if it's not a "role not found" error
    }
  }

  public static Set(scope: Construct, params: ICdkGroup): IRole {
    const { path } = params;
    const roleName: string = this.Name(params);
    const assumedBy: IPrincipal = new AccountPrincipal(Stack.of(scope).account);
    return new Role(scope, roleName, {
      roleName,
      path,
      assumedBy,
      managedPolicies: params.managedPolicies.map((policy: string) =>
        ManagedPolicy.fromAwsManagedPolicyName(policy)),
    });
  }

  public static AddRoleToGroups(scope: Construct, role: IRole, groups: ICdkGroup[]): void {
    // groups.forEach(group => role.grantAssumeRole(IamGroup.Get(scope, group)));
    groups.forEach(group => role.grantAssumeRole(IamGroup.GetGroup(scope, group.groupName)));
  }
}