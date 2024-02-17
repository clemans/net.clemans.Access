import { Construct } from 'constructs';
import { IGroup, Group, IUser } from 'aws-cdk-lib/aws-iam';
import { ICdkGroup, CdkUsers } from '../config/parameters';

export class IamGroup {
  public static Get(scope: Construct, params: ICdkGroup): IGroup {
    const { groupName } = params;
    try {
      return Group.fromGroupName(scope, groupName, groupName) as Group;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return this.Set(scope, params) as Group;
      }
      throw error;
    }
  }

  public static Set(scope: Construct, params: ICdkGroup): Group {
    const { groupName, path } = params;
    return new Group(scope, groupName, {
      path,
      groupName,
    });
  }

  public static AddGroupToUsers(scope: Construct, group: Group, users: IUser[]): void {
    CdkUsers.forEach(configUser => {
      const { userName, groups } = configUser;

      // Check if the user's groups array includes the group's name
      if (groups.includes(group.groupName)) {
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

  public static GetGroup(scope: Construct, groupName: string): IGroup {
    return scope.node.tryFindChild(groupName) as Group ;
  }
}
