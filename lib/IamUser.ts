import { Construct } from 'constructs';
import { IUser, User } from 'aws-cdk-lib/aws-iam';
import { ICdkUser, CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';
import { SesSmtpCredentials } from '@pepperize/cdk-ses-smtp-credentials';

export class IamUser {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  public Set(params: ICdkUser): IUser {
    const { path, userName, isSmtp } = params;
    return isSmtp
      ? this.GetGroup(
        new SesSmtpCredentials(this.scope, `${userName}SmtpCredentials`, {
          userName,
        }).node.id
      )
      : (new User(this.scope, userName, {
        userName,
        path,
      }) as User);
  }

  public AddUserToAssignedGroups(User: IUser): void {
    const cdkUser = CdkUsers.find((user) => user.userName === User.node.id);
    return cdkUser?.groups?.forEach((group) =>
      User.addToGroup(new IamGroup(this.scope).GetGroup(group))
    );
  }
  
  private GetGroup(userName: string): IUser {
    return this.scope.node.tryFindChild(userName) as User;
  }
}