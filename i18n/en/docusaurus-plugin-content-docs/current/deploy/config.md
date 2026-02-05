---
sidebar_label: Server Configuration Parameters
sidebar_position: 7
---

# Weiyu Server Configuration Parameters

This document provides detailed explanation of Weiyu server configuration parameters (based on Spring Boot 3.x development) and their usage.

> Need to encrypt configuration secrets? See the [Jasypt encryption guide](./depend/jasypt) for CLI steps and property usage.

## Basic Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `server.port` | Server port | `9003` | `SERVER_PORT: 9003` |
| `bytedesk.debug` | Whether to enable debug mode | `true` | `BYTEDESK_DEBUG: true` |
| `bytedesk.version` | Product version number | `1.2.0` | `BYTEDESK_VERSION: 1.2.0` |
| `bytedesk.appkey` | Authorization key | `ZjoyMDI...` | `BYTEDESK_APPKEY: ZjoyMDI...` |

## Custom Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.custom.enabled` | Whether to enable custom configuration (name, logo, description, etc.) | `true` | `BYTEDESK_CUSTOM_ENABLED: false` |
| `bytedesk.custom.name` | Custom product name, empty by default uses default name | - | `BYTEDESK_CUSTOM_NAME:` |
| `bytedesk.custom.logo` | Custom product logo, empty by default uses default logo | - | `BYTEDESK_CUSTOM_LOGO:` |
| `bytedesk.custom.description` | Custom product description, empty by default uses "Chat As A Service" | - | `BYTEDESK_CUSTOM_DESCRIPTION:` |
| `bytedesk.custom.show-right-corner-chat` | Whether to show bottom-right corner chat window | `false` | `BYTEDESK_CUSTOM_SHOW_RIGHT_CORNER_CHAT: true` |
| `bytedesk.custom.show-demo` | Whether to show default demo | `true` | `BYTEDESK_CUSTOM_SHOW_DEMO: true` |
| `bytedesk.custom.privacy-policy-url` | Privacy policy URL address | - | `BYTEDESK_CUSTOM_PRIVACY_POLICY_URL:` |
| `bytedesk.custom.terms-of-service-url` | Terms of service URL address | - | `BYTEDESK_CUSTOM_TERMS_OF_SERVICE_URL:` |
| `bytedesk.custom.login-username-enable` | Whether to enable username login | `true` | `BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE: true` |
| `bytedesk.custom.login-mobile-enable` | Whether to enable mobile number login | `true` | `BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE: true` |
| `bytedesk.custom.login-scan-enable` | Whether to enable QR code login | `true` | `BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE: true` |
| `bytedesk.custom.doc-url-show` | Whether to show documentation link | `true` | `BYTEDESK_CUSTOM_DOC_URL_SHOW: true` |
| `bytedesk.custom.doc-url` | Documentation URL address | `https://...` | `BYTEDESK_CUSTOM_DOC_URL: https://www.....` |

## Administrator Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.admin.email` | Administrator email | `admin@email.com` | `BYTEDESK_ADMIN_EMAIL: admin@email.com` |
| `bytedesk.admin.password` | Administrator default password | `admin` | `BYTEDESK_ADMIN_PASSWORD: admin` |
| `bytedesk.admin.password-default` | Default password for creating/importing members | `123456` | `BYTEDESK_ADMIN_PASSWORD_DEFAULT: 123456` |
| `bytedesk.admin.nickname` | Administrator nickname | `SuperAdmin` | `BYTEDESK_ADMIN_NICKNAME: SuperAdmin` |
| `bytedesk.admin.mobile` | Administrator mobile number | `13345678000` | `BYTEDESK_ADMIN_MOBILE: 13345678000` |
| `bytedesk.admin.mobile-whitelist` | Mobile number whitelist, separated by commas | `18888888000,18888888001,...` | `BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001...` |
| `bytedesk.admin.email-whitelist` | Email whitelist, separated by commas | `100@email.com,101@email.com,...` | `BYTEDESK_ADMIN_EMAIL_WHITELIST: 100@email.com,101@email.com...` |
| `bytedesk.admin.validate-code` | Verification code for whitelisted mobile numbers and emails, otherwise generates random 6-digit number | `123456` | `BYTEDESK_ADMIN_VALIDATE_CODE: 123456` |
| `bytedesk.admin.allow-register` | Whether to allow registration of new accounts | `true` | `BYTEDESK_FEATURES_ENABLE_REGISTRATION: false` |
| `bytedesk.admin.force-validate-mobile` | Whether to force mobile number validation | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE: true` |
| `bytedesk.admin.force-validate-email` | Whether to force email validation | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL: true` |

## Member Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.member.password` | Default password for creating/importing members | `123456` | `BYTEDESK_MEMBER_PASSWORD: 123456` |

## Performance Testing Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.testing.enabled` | Whether to enable performance testing mode | `false` | `BYTEDESK_TESTING_ENABLED: false` |
| `bytedesk.testing.account-count` | Number of test accounts | `300` | `BYTEDESK_TESTING_ACCOUNT_COUNT: 300` |
| `bytedesk.testing.account-username` | Test account username prefix | `test` | `BYTEDESK_TESTING_ACCOUNT_USERNAME: test` |
| `bytedesk.testing.account-password` | Test account password | `password` | `BYTEDESK_TESTING_ACCOUNT_PASSWORD: password` |
| `bytedesk.testing.disable-captcha` | Whether to disable captcha | `true` | `BYTEDESK_TESTING_DISABLE_CAPTCHA: true` |
| `bytedesk.testing.disable-ip-filter` | Whether to disable IP filtering | `true` | `BYTEDESK_TESTING_DISABLE_IP_FILTER: true` |

## Organization Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.organization.name` | Organization name | `MyCompany` | `BYTEDESK_ORGANIZATION_NAME: MyCompany` |
| `bytedesk.organization.code` | Organization code | `bytedesk` | `BYTEDESK_ORGANIZATION_CODE: bytedesk` |

## Feature Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.features.java-ai` | Whether to enable Java AI functionality | `true` | `BYTEDESK_FEATURES_JAVA_AI: false` |
| `bytedesk.features.python-ai` | Whether to enable Python AI functionality | `false` | `BYTEDESK_FEATURES_PYTHON_AI: true` |
| `bytedesk.features.email-type` | Email sending method, options: `javamail`/`aliyun` | `javamail` | `BYTEDESK_FEATURES_EMAIL_TYPE: javamail` |
| `bytedesk.features.avatar-base-url` | Avatar base URL | - | `BYTEDESK_FEATURES_AVATAR_BASE_URL:` |

## CORS Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.cors.allowed-origins` | Allowed CORS origins | `*` | `BYTEDESK_CORS_ALLOWED_ORIGINS: *` |

## JWT Configuration

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.jwt.secret-key` | JWT secret key | `1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` | `BYTEDESK_JWT_SECRET_KEY: 1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` |
| `bytedesk.jwt.expiration` | JWT expiration time (milliseconds), default 30 days | `2592000000` | `BYTEDESK_JWT_EXPIRATION: 2592000000` |
| `bytedesk.jwt.refresh-token-expiration` | Refresh token expiration time (milliseconds), default 60 days | `5184000000` | `BYTEDESK_JWT_REFRESH_TOKEN_EXPIRATION: 5184000000` |

## Alibaba Cloud SMS Service Configuration - Mobile Login Verification Code

| Parameter | Description | Example Value | Docker Environment Variable |
| :------- | :---------------------- | :------- | :------- |
| `aliyun.region.id` | Alibaba Cloud region ID | `cn-hangzhou` | `ALIYUN_REGION_ID: cn-hangzhou` |
| `aliyun.access.key.id` | Alibaba Cloud AccessKey ID | - | `ALIYUN_ACCESS_KEY_ID:` |
| `aliyun.access.key.secret` | Alibaba Cloud AccessKey secret | - | `ALIYUN_ACCESS_KEY_SECRET:` |
| `aliyun.sms.signname` | SMS sign name | `Weiyu` | `ALIYUN_SMS_SIGNNAME: Weiyu` |
| `aliyun.sms.templatecode` | SMS template code | `SMS_xxxxxxxxx` | `ALIYUN_SMS_TEMPLATECODE: SMS_xxxxxxxxx` |

### Related resources

- [Alibaba Cloud Region ID](https://api.aliyun.com/product/Dysmsapi) - Region ID reference for SMS service
- [Alibaba Cloud AccessKey](https://ram.console.aliyun.com/profile/access-keys) - AccessKey management
- [Alibaba Cloud SMS Sign](https://dysms.console.aliyun.com/domestic/text/sign) - SMS sign management
- [Alibaba Cloud SMS Template](https://dysms.console.aliyun.com/domestic/text/template) - SMS template management

### Default test mobile numbers and verification code

Configure a default mobile whitelist so those numbers use a fixed verification code (recommended for dev/test only):

**Configuration file:**

```properties
# Mobile whitelist for testing
bytedesk.admin.mobile-whitelist=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# Fixed verification code for whitelisted mobiles/emails; otherwise a random 6-digit code is generated
bytedesk.admin.validate-code=123456
```

**Docker environment variables:**

```yaml
# Mobile whitelist for testing
BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001,18888888002,18888888003,18888888004,18888888005

# Fixed verification code for whitelisted mobiles/emails
BYTEDESK_ADMIN_VALIDATE_CODE: 123456
```

> Note: Whitelisted numbers use a fixed verification code and should only be used in development/testing.

## Cache Configuration
