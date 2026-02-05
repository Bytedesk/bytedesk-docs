---
sidebar_label: SaaS
sidebar_position: 8
---

# SaaS多租户模式

:::tip 前置条件

- 仅平台版支持此功能，如需要，请[扫码联系微信](/img/wechat.png)
- 需要试用版License？请参考：[问题13：如何申请licenseKey](../faq#问题13如何申请licensekey)
:::

微语系统支持SaaS多租户模式，允许多个组织在同一系统内独立运营。本文档介绍如何配置和使用SaaS模式。

## 什么是SaaS多租户？

SaaS（Software as a Service，软件即服务）多租户模式允许单一应用实例服务多个客户（租户），每个租户拥有自己独立的数据和配置，而共享底层基础设施。微语系统的SaaS功能实现了：

- **多组织管理**：支持创建和管理多个独立组织
- **独立数据隔离**：确保各租户数据安全隔离
- **灵活的登录注册**：支持多种登录方式和注册流程

## 本地开发环境配置

在开发环境中，您可以使用以下配置来模拟和测试SaaS功能，无需配置真实短信接口：

### 配置参数说明

```bash
# 测试手机号白名单（逗号分隔）
bytedesk.admin.mobile-whitelist=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# 测试邮箱白名单（逗号分隔）
bytedesk.admin.email-whitelist=100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com,106@email.com

# 白名单手机号和邮箱的默认验证码
bytedesk.admin.validate-code=123456

# 是否允许注册新账户
bytedesk.admin.allow-register=true

# 是否强制验证手机号
bytedesk.admin.force-validate-mobile=true

# 是否强制验证邮箱
bytedesk.admin.force-validate-email=true
```

### Docker环境变量配置

如果您使用Docker部署，可使用以下环境变量：

```bash
# 测试手机号白名单
BYTEDESK_ADMIN_MOBILE_WHITELIST=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# 测试邮箱白名单
BYTEDESK_ADMIN_EMAIL_WHITELIST=100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com

# 默认测试验证码
BYTEDESK_ADMIN_VALIDATE_CODE=123456

# 是否允许注册
BYTEDESK_ADMIN_ALLOW_REGISTER=true

# 是否强制验证手机号
BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE=true

# 是否强制验证邮箱
BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL=true
```

<!-- ![登录界面](/img/develop/saas/saas_login.png) -->

## 线上生产环境配置

在生产环境中，建议使用真实短信和邮件服务，确保用户能收到验证码：

### 短信和邮件服务配置

1. **短信服务配置**：微语系统支持阿里云短信服务，用于发送手机验证码
   - 配置参考：[阿里云短信服务配置](../deploy/config#阿里云短信服务配置---手机登录验证码)

2. **邮件服务配置**：支持通过SMTP或阿里云邮件服务发送邮箱验证码
   - 可配置为Java Mail或阿里云邮件方式：`bytedesk.features.email-type=javamail` 或 `bytedesk.features.email-type=aliyun`

### 多租户管理功能

微语SaaS模式提供以下管理功能：

- **租户管理**：创建、编辑、删除租户组织
- **成员管理**：为每个租户分配独立的成员和角色
- **数据隔离**：确保租户之间的数据安全隔离
- **自定义配置**：每个租户可自定义功能配置

### 登录注册流程

微语SaaS模式支持多种登录方式：

1. **手机号登录**：通过手机号+验证码登录
2. **邮箱登录**：通过邮箱+验证码登录
3. **用户名登录**：通过用户名+密码登录
4. **扫码登录**：通过扫描二维码快速登录

每种登录方式可以在配置中启用或禁用：

```bash
# 是否启用用户名登录
bytedesk.custom.login-username-enable=true
# 是否启用手机号登录
bytedesk.custom.login-mobile-enable=true
# 是否启用扫码登录
bytedesk.custom.login-scan-enable=true
```

对应的Docker环境变量：

```bash
BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE=true
BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE=true
BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE=true
```

## 最佳实践

1. **开发阶段**：使用测试白名单和固定验证码简化开发流程
2. **测试阶段**：配置真实短信/邮件服务，但限制发送范围
3. **生产阶段**：启用完整的短信/邮件服务，确保安全和性能
4. **多租户数据备份**：定期为每个租户数据进行独立备份

更多详细配置请参考[微语服务器配置参数说明](../deploy/config)。
