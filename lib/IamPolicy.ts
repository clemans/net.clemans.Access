import { Construct } from 'constructs';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { ICdkPolicy, CdkPolicies } from '../config/parameters';
import { IamRole } from './IamRole';
import { IamGroup } from './IamGroup';

export class IamPolicy {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  public Set(Policy: ICdkPolicy): ManagedPolicy {
    const { managedPolicyName, path, statements } = Policy;
    return new ManagedPolicy(this.scope, managedPolicyName, {
      managedPolicyName,
      statements,
      path,
    });
  }

  public AddPolicyToAssignedRolesAndGroups(Policy: ManagedPolicy): void {
    const cdkPolicy = CdkPolicies.find(
      (policy) => policy.managedPolicyName === Policy.node.id
    );
    cdkPolicy?.roles?.forEach((role) => {
      Policy.attachToRole(new IamRole(this.scope).GetRole(role));
    });
    cdkPolicy?.groups?.forEach((group) =>
      Policy.attachToGroup(new IamGroup(this.scope).GetGroup(group))
    );
  }
}