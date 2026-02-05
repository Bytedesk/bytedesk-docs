---
sidebar_label: SaaS
sidebar_position: 8
---

# SaaS Multi-Tenant Mode

:::tip Prerequisites

- This feature is only supported in Platform Edition. If needed, please [scan QR code to contact WeChat](/img/wechat.png)
- Need a trial license? Please refer to: [Question 13: How to apply for licenseKey](../faq#question-13-how-to-apply-for-licensekey)
:::

The Weiyu system supports SaaS multi-tenant mode, allowing multiple organizations to operate independently within the same system. This document introduces how to configure and use SaaS mode.

## What is SaaS Multi-Tenant?

SaaS (Software as a Service) multi-tenant mode allows a single application instance to serve multiple customers (tenants), with each tenant having their own independent data and configuration while sharing the underlying infrastructure. The Weiyu system's SaaS functionality implements:

- **Multi-Organization Management**: Supports creating and managing multiple independent organizations
- **Independent Data Isolation**: Ensures secure data isolation between tenants
- **Flexible Login Registration**: Supports multiple login methods and registration processes

## Local Development Environment Configuration

In the development environment, you can use the following configuration to simulate and test SaaS functionality without configuring real SMS interfaces:

### Configuration Parameter Description

```bash
# Test mobile number whitelist (comma-separated)
bytedesk.admin.mobile-whitelist=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# Test email whitelist (comma-separated)
bytedesk.admin.email-whitelist=100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com,106@email.com

# Default verification code for whitelisted mobile numbers and emails
bytedesk.admin.validate-code=123456

# Whether to allow new account registration
bytedesk.admin.allow-register=true

# Whether to force mobile number verification
bytedesk.admin.force-validate-mobile=true

# Whether to force email verification
bytedesk.admin.force-validate-email=true
```

### Docker Environment Variable Configuration

If you use Docker deployment, you can use the following environment variables:

```bash
# Test mobile number whitelist
BYTEDESK_ADMIN_MOBILE_WHITELIST=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# Test email whitelist
BYTEDESK_ADMIN_EMAIL_WHITELIST=100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com

# Default test verification code
BYTEDESK_ADMIN_VALIDATE_CODE=123456

# Whether to allow registration
BYTEDESK_ADMIN_ALLOW_REGISTER=true

# Whether to force mobile number verification
BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE=true

# Whether to force email verification
BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL=true
```

![Login Interface](/img/develop/saas/saas_login.png)

## Production Environment Configuration

In the production environment, it's recommended to use real SMS and email services to ensure users can receive verification codes:

### SMS and Email Service Configuration

1. **SMS Service Configuration**: The Weiyu system supports Alibaba Cloud SMS service for sending mobile verification codes
   - Configuration reference: [Alibaba Cloud SMS Service Configuration](../deploy/config#alibaba-cloud-sms-service-configuration---mobile-login-verification-code)

2. **Email Service Configuration**: Supports sending email verification codes through SMTP or Alibaba Cloud email service
   - Can be configured as Java Mail or Alibaba Cloud email: `bytedesk.features.email-type=javamail` or `bytedesk.features.email-type=aliyun`

### Multi-Tenant Management Features

Weiyu SaaS mode provides the following management features:

- **Tenant Management**: Create, edit, delete tenant organizations
- **Member Management**: Assign independent members and roles for each tenant
- **Data Isolation**: Ensures secure data isolation between tenants
- **Custom Configuration**: Each tenant can customize feature configurations

### Login Registration Process

Weiyu SaaS mode supports multiple login methods:

1. **Mobile Login**: Login via mobile number + verification code
2. **Email Login**: Login via email + verification code
3. **Username Login**: Login via username + password
4. **QR Code Login**: Quick login by scanning QR code

Each login method can be enabled or disabled in the configuration:

```bash
# Whether to enable username login
bytedesk.custom.login-username-enable=true
# Whether to enable mobile login
bytedesk.custom.login-mobile-enable=true
# Whether to enable QR code login
bytedesk.custom.login-scan-enable=true
```

Corresponding Docker environment variables:

```bash
BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE=true
BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE=true
BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE=true
```

## Best Practices

1. **Development Phase**: Use test whitelist and fixed verification codes to simplify development process
2. **Testing Phase**: Configure real SMS/email services but limit sending scope
3. **Production Phase**: Enable complete SMS/email services, ensure security and performance
4. **Multi-Tenant Data Backup**: Regularly perform independent backups for each tenant's data

For more detailed configuration, please refer to [Weiyu Server Configuration Parameter Description](../deploy/config).
