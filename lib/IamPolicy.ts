import { Construct } from 'constructs';
import { IManagedPolicy, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { ICdkManagedPolicy } from '../src/interfaces';
import { CdkManagedPolicies } from '../config/parameters';
import { IamGroup } from './IamGroup';

export class IamPolicy {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  public AddPolicyToAssignedGroups(Policy: ManagedPolicy): void {
    const cdkPolicy = this.GetCdkManagedPolicy(Policy);
    cdkPolicy?.groups?.forEach((group) =>
      Policy.attachToGroup(new IamGroup(this.scope).GetIamGroup(group))
    );
  }

  private GetCdkManagedPolicy(Policy: ManagedPolicy): ICdkManagedPolicy {
    return CdkManagedPolicies.find(
      (policy) => policy.managedPolicyName === Policy.node.id
    ) as ICdkManagedPolicy;
  }
  
  public GetIamManagedPolicy(policyName: string): IManagedPolicy {
    return this.scope.node.tryFindChild(policyName) as ManagedPolicy;
  }

  public Set(Policy: ICdkManagedPolicy): ManagedPolicy {
    const { managedPolicyName, path, statements } = Policy;
    return new ManagedPolicy(this.scope, managedPolicyName, {
      managedPolicyName,
      statements,
      path,
    });
  }
}