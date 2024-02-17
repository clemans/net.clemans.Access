import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { IPrincipal, Role, AccountPrincipal } from 'aws-cdk-lib/aws-iam';
import { CdkRoles, ICdkRole } from '../config/parameters';
import { IamGroup } from './IamGroup';

export class IamRole {
  private readonly scope: Construct;
  
  constructor(scope: Construct) {
    this.scope = scope;
  }

  public Set(params: ICdkRole): Role {
    const { path, roleName } = params;
    const assumedBy: IPrincipal = new AccountPrincipal(Stack.of(this.scope).account);
    return this.GetRole(roleName) ??
      new Role(this.scope, roleName, {
        roleName,
        path,
        assumedBy,
      });
  }

  public AddRoleToAssignedGroups(Role: Role): void {
    const cdkRole = CdkRoles.find((role) => role.roleName === Role.node.id);
    return cdkRole?.allowedGroups.forEach((group) => {
      const awsGroup = new IamGroup(this.scope).GetGroup(group);
      Role.grantAssumeRole(awsGroup);
    });
  }

  public GetRole(roleName: string): Role {
    try {
      return this.scope.node.tryFindChild(roleName) as Role;
    } catch {
      return Role.fromRoleName(this.scope, roleName, roleName) as Role;
    }
  }
}