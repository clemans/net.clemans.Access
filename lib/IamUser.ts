import { Construct } from 'constructs';
import { Stack} from 'aws-cdk-lib';
import { IUser, User } from 'aws-cdk-lib/aws-iam';
import { ICdkUser, CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';
import { SesSmtpCredentials } from 'ses-smtp-credentials-cdk';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export class IamUser {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  public Set(params: ICdkUser): IUser {
    const { path, userName, isSmtp } = params;
    if (isSmtp) {
      const user = new SesSmtpCredentials(
        this.scope,
        `${userName}SmtpCredentials`,
        { region: Stack.of(this.scope).region }
      );
      new StringParameter(this.scope, `${userName}CredentialParameter`, {
        parameterName: `${userName}Credentials`,
        stringValue: JSON.stringify({
          username: user.username(),
          password: user.password(),
        }),
      });
      return this.GetUser(user.node.id);
    }
    else {
      return new User(this.scope, userName, {
        userName,
        path,
      }) as User;
    }
  }

  public AddUserToAssignedGroups(User: IUser): void {
    const cdkUser = CdkUsers.find((user) => user.userName === User.node.id);
    return cdkUser?.groups?.forEach((group) =>
      User.addToGroup(new IamGroup(this.scope).GetGroup(group))
    );
  }

  private GetUser(userName: string): IUser {
    return this.scope.node.tryFindChild(userName) as User;
  }
}