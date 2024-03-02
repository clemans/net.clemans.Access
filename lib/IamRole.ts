import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { IPrincipal, IRole, AccountPrincipal, ManagedPolicy, Role } from 'aws-cdk-lib/aws-iam';
import { CdkRoles, CdkUsers, ICdkRole, ICdkUser } from '../config/parameters';
import { IamPolicy } from './IamPolicy';
import { IamUser } from './IamUser';

export class IamRole {
  private readonly scope: Construct;
  
  constructor(scope: Construct) {
    this.scope = scope;
  }

  public AddRoleToAssignedPolicies(Role: IRole): void {
    const cdkRole = this.GetCdkRole(Role);
    return cdkRole?.policies?.forEach((policy) => {
      const awsPolicy = new IamPolicy(this.scope).GetIamPolicy(policy) as ManagedPolicy;
      awsPolicy.attachToRole(Role);
    });
  }

  public AddRoleToAssignedUsers(Role: IRole): void {
    const cdkUsers: ICdkUser[] = CdkUsers.filter(user => user.roles?.includes(Role.node.id as string));
    return cdkUsers.forEach(user => Role.grantAssumeRole(new IamUser(this.scope).GetIamUser(user.userName)));
  }

  private GetCdkRole(Role: IRole): ICdkRole {
    return CdkRoles.find((role) => role.roleName === Role.node.id) as ICdkRole;
  }

  public GetIamRole(roleName: string): Role {
    try {
      return this.scope.node.tryFindChild(roleName) as Role;
    } catch {
      return Role.fromRoleName(this.scope, roleName, roleName) as Role;
    }
  }
  
  public Set(params: ICdkRole): Role {
    const { path, roleName } = params;
    const assumedBy: IPrincipal = new AccountPrincipal(Stack.of(this.scope).account);
    return this.GetIamRole(roleName) ??
      new Role(this.scope, roleName, {
        roleName,
        path,
        assumedBy,
      });
  }
}