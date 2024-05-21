import { Construct } from 'constructs';
import { IOpenIdConnectProvider, OpenIdConnectProvider } from 'aws-cdk-lib/aws-iam';
import { ICdkIdP } from '../src/interfaces';

export class IamIdP {
  private readonly scope: Construct;

  constructor(scope: Construct) {
    this.scope = scope;
  }

  private GetOIDCProvider(oidcProviderName: string): IOpenIdConnectProvider {
    return this.scope.node.tryFindChild(oidcProviderName) as OpenIdConnectProvider;
  }

  public GetOIDCProviderArn(oidcProviderName: string) {
    const oidc = this.GetOIDCProvider(oidcProviderName);
    return oidc.openIdConnectProviderArn;
  }

  public Set(params: ICdkIdP): IOpenIdConnectProvider {
    const { oidcProviderName, url, clientIds } = params;
    return new OpenIdConnectProvider(this.scope, oidcProviderName, {
      url,
      clientIds
    }); 
  }
}