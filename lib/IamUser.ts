import { Construct } from 'constructs';
import { IUser, User } from 'aws-cdk-lib/aws-iam';
import { ICdkUser, CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';

export class IamUser {
  public static Get(scope: Construct, params: ICdkUser): IUser {
    const { userName } = params;
    try {
      return User.fromUserName(scope, userName, userName) as User;
    } catch {
      return this.Set(scope, params) as User;
    }
  }
  
  public static Set(scope: Construct, params: ICdkUser): IUser {
    const { path, userName } = params; 
    return new User(scope, userName, {
      userName,
      path
    }) as User;
  }

  public static AddGroupsToUser(scope: Construct, user: IUser): void {
    CdkUsers.find(
      (cdkUser) => cdkUser.userName === user.node.id
    )?.groups.forEach((group) =>
      user.addToGroup(IamGroup.GetGroup(scope, group))
    );
  }
}