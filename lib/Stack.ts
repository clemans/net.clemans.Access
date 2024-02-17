import { Stack, StackProps } from 'aws-cdk-lib';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Group, IRole, IUser } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CdkGroups, CdkUsers } from '../config/parameters';
import { IamGroup } from './IamGroup';
import { IamUser } from './IamUser';
// import { IamRole } from './IamRole';

export class IamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const AwsUsers: IUser[] = CdkUsers.map(user => IamUser.Set(this, user));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const AwsGroups: Group[] = CdkGroups.map(group => IamGroup.Set(this, group));
    // const AwsRoles: IRole[] = CdkGroups.map(role => IamRole.Set(this, role));

    AwsUsers.forEach(AwsUser => IamUser.AddGroupsToUser(this, AwsUser));
    // AwsRoles.forEach(AwsRole => IamRole.AddRoleToGroups(this, AwsRole, CdkGroups));
  }
}
