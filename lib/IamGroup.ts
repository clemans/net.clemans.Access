import { Construct } from 'constructs';
import { IGroup, Group, IUser } from 'aws-cdk-lib/aws-iam';
import { ICdkGroup, CdkUsers } from '../config/parameters';

export class IamGroup {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope; 
  }
  
  public Get(params: ICdkGroup): IGroup {
    const { groupName } = params;
    try {
      return Group.fromGroupName(this.scope, groupName, groupName) as Group;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return this.Set(params) as Group;
      }
      throw error;
    }
  }

  public Set(params: ICdkGroup): Group {
    const { groupName, path } = params;
    return new Group(this.scope, groupName, {
      path,
      groupName,
    });
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

  public GetGroup(groupName: string): IGroup {
    return this.scope.node.tryFindChild(groupName) as Group ;
  }
}
