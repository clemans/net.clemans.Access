import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { IUser, User } from 'aws-cdk-lib/aws-iam';
import { ICdkUser } from '../src/interfaces';
import { CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';
import { SesSmtpCredentials } from 'ses-smtp-credentials-cdk';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { IamRole } from './IamRole';

export class IamUser {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  public AddUserToAssignedGroups(User: IUser): void {
    const cdkUser = CdkUsers.find((user) => user.userName === User.node.id);
    return cdkUser?.groups?.forEach((group) =>
      User.addToGroup(new IamGroup(this.scope).GetIamGroup(group)),
    );
  }

  public AddUserToAssignedRoles(User: IUser): void {
    const cdkUser = this.GetCdkUser(User);
    return cdkUser?.roles?.forEach((role) =>
      new IamRole(this.scope).GetIamRole(role).grant(User, 'sts:AssumeRole'),
    );
  }

  private GetCdkUser(User: IUser): ICdkUser {
    return CdkUsers.find((user) => user.userName === User.node.id) as ICdkUser;
  }

  public GetIamUser(userName: string): IUser {
    return this.scope.node.tryFindChild(userName) as User;
  }

  public Set(params: ICdkUser): IUser {
    const { path, userName, isSmtp } = params;
    if (isSmtp) {
      const user = new SesSmtpCredentials(
        this.scope,
        `${userName}SmtpCredentials`,
        { region: Stack.of(this.scope).region },
      );
      new StringParameter(this.scope, `${userName}CredentialParameter`, {
        parameterName: `${userName}Credentials`,
        stringValue: JSON.stringify({
          username: user.username(),
          password: user.password(),
        }),
      });
      return this.GetIamUser(user.node.id);
    } else {
      return new User(this.scope, userName, {
        userName,
        path,
      }) as User;
    }
  }
}
