import { Construct } from 'constructs';
import { IManagedPolicy, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { ICdkPolicy, CdkPolicies } from '../config/parameters';
import { IamGroup } from './IamGroup';

export class IamPolicy {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  public AddPolicyToAssignedGroups(Policy: ManagedPolicy): void {
    const cdkPolicy = this.GetCdkPolicy(Policy);
    cdkPolicy?.groups?.forEach((group) =>
      Policy.attachToGroup(new IamGroup(this.scope).GetIamGroup(group))
    );
  }

  private GetCdkPolicy(Policy: ManagedPolicy): ICdkPolicy {
    return CdkPolicies.find(
      (policy) => policy.managedPolicyName === Policy.node.id
    ) as ICdkPolicy;
  }
  
  public GetIamPolicy(policyName: string): IManagedPolicy {
    return this.scope.node.tryFindChild(policyName) as ManagedPolicy;
  }

  public Set(Policy: ICdkPolicy): ManagedPolicy {
    const { managedPolicyName, path, statements } = Policy;
    return new ManagedPolicy(this.scope, managedPolicyName, {
      managedPolicyName,
      statements,
      path,
    });
  }
}