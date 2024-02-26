# Changelog

All notable changes to this project will be documented in this file.

## 🏷️ [1.0.2][1.0.2] • 2024-02-26

### Fixes

- Corrects private method name `GetGroup` to `GetUser` in IamUser class

## 🏷️ [1.0.1][1.0.1] • 2024-02-26

### Fixes

- Issue with user accounts unable to perform self-account maintenance actions
- Issue with SMTP user credentials not working. See
[Obtaining Amazon SES SMTP credentials by converting existing AWS credentials][1.0.1-1]

## 🏷️ [1.0.0][1.0.0] • 2024-02-25

### Adds

- \[**Feature**\] Support for IAM: Users, Groups, Roles, Policies (and their relationships)

<!-- Tags -->
[1.0.2]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.2
[1.0.1]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.1
[1.0.0]: https://github.com/clemans/net.clemans.Access/releases/tag/v1.0.0

<!-- References -->
[1.0.1-1]: https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html#smtp-credentials-convert