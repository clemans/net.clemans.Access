import { Construct } from 'constructs';
import { IUser, User } from 'aws-cdk-lib/aws-iam';
import { ICdkUser, CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';

export class IamUser {
  private readonly scope: Construct;
  
  constructor(scope: Construct) {
    this.scope = scope;
  }

  public Set(params: ICdkUser): IUser {
    const { path, userName } = params;
    return new User(this.scope, userName, {
      userName,
      path,
    }) as User;
  }

  public AddUserToAssignedGroups(User: IUser): void {
    const cdkUser = CdkUsers.find((user) => user.userName === User.node.id);
    return cdkUser?.groups.forEach((group) =>
      User.addToGroup(new IamGroup(this.scope).GetGroup(group))
    );
  }
}