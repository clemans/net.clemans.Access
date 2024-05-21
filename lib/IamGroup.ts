import { Construct } from 'constructs';
import { IGroup, Group, IUser } from 'aws-cdk-lib/aws-iam';
import { ICdkGroup } from '../src/interfaces';
import { CdkUsers, CdkGroups } from '../config/parameters';
import { IamRole } from './IamRole';

export class IamGroup {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope; 
  }

  public static AddGroupToUsers(group: Group, users: IUser[]): void {
    CdkUsers.forEach(configUser => {
      const { userName, groups } = configUser;

      // Check if the user's groups array includes the group's name
      if (groups?.includes(group.groupName)) {
        // Find the corresponding AWS user resource
        const awsUser = users.find(user => user.userName === userName);

        if (awsUser) {
          // Add the AWS user to the group
          group.addUser(awsUser);
        } else {
          console.error(`AWS user not found for ConfigUser with userName '${userName}'.`);
        }
      }
    });
  }

  public AddGroupToAssignedRoles(Group: Group): void {
    const cdkGroup = CdkGroups.find((group) => group.groupName === Group.node.id);
    return cdkGroup?.roles?.forEach((role) => {
      const awsRole = new IamRole(this.scope).GetIamRole(role);
      awsRole.grantAssumeRole(Group);
    });
  }

  public GetIamGroup(groupName: string): IGroup {
    return this.scope.node.tryFindChild(groupName) as Group ;
  }

  public Set(params: ICdkGroup): Group {
    const { groupName, path } = params;
    return new Group(this.scope, groupName, {
      path,
      groupName,
    });
  }
}
