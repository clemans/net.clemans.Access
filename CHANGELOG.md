# Changelog

All notable changes to this project will be documented in this file.

## 🏷️ [3.0.0][3.0.0] • 2024-05-24

- Adds support for adding identity provider for GitHub Actions
- Restructured Typescript interfaces
- Renamed IAM policy method names for readability
- General code clean-up and documentation updates

## 🏷️ [2.1.0][2.1.0] • 2024-03-01

- Adds support for adding groups to their assigned roles
- Adds support for adding policies to their assigned groups
- Adds support for adding roles to their assigned policies
- Adds support for adding users to their assigned roles
- General code clean-up and documentation updates

## 🏷️ [2.0.1][2.0.1] • 2024-02-29

- Updates project dependencies
- Updates roadmap documentation

## 🏷️ [2.0.0][2.0.0] • 2024-02-28

### 💥 Breaking Change(s)

- Removing Ses Smtp credential IAM users which will at the very least tear down
    IAM users and could possibly require a full stack teardown.

- Replaces `@pepperize/cdk-ses-smtp-credentials` with `ses-smtp-credentials-cdk`
  - SSM parameters replace AWS Secret Manager secrets for the sake of saving
        ~$20 annually (4 secrets @ .40¢ each for 12 months).

## 🏷️ [1.0.3][1.0.3] • 2024-02-28

- Removes unnecessary roles due to a misunderstanding of principal relationships
    as it pertains to groups and roles.

## 🏷️ [1.0.2][1.0.2] • 2024-02-26

- Corrects private method name `GetGroup` to `GetUser` in IamUser class

## 🏷️ [1.0.1][1.0.1] • 2024-02-26

- Issue with user accounts unable to perform self-account maintenance actions
- Issue with SMTP user credentials not working.
  - See [Obtaining Amazon SES SMTP credentials by converting existing AWS credentials][1.0.1-1]

## 🏷️ [1.0.0][1.0.0] • 2024-02-25

- \[**Feature**\] Support for IAM: Users, Groups, Roles, Policies (and their relationships)

<!-- Tags -->
[3.0.0]: https://github.com/clemans/net.clemans.Access/releases/tag/v3.0.0
[2.1.0]: https://github.com/clemans/net.clemans.Access/releases/tag/v2.1.0
[2.0.1]: https://github.com/clemans/net.clemans.Access/releases/tag/v2.0.1
[2.0.0]: https://github.com/clemans/net.clemans.Access/releases/tag/v2.0.0
[1.0.3]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.3
[1.0.2]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.2
[1.0.1]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.1
[1.0.0]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.0

<!-- References -->
[1.0.1-1]: https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html#smtp-credentials-convert