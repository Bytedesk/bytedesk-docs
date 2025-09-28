---
sidebar_label: 单点登录SSO
sidebar_position: 27
---

# 单点登录 Single Sign-On (SSO)

Single Sign-On (SSO) 是一种认证方法，允许用户使用单一的登录凭据（如用户名和密码）访问多个应用程序或系统，而无需为每个应用程序单独登录。通过 SSO，用户只需登录一次，就可以无缝地访问所有关联的服务，提高了用户体验和安全性。

微语系统支持多种第三方平台的单点登录，包括：

**社交平台**：微信、GitHub、Facebook、Google、钉钉、抖音、飞书

**企业级认证**：LDAP、CAS、OIDC、OpenID

本文档将详细介绍如何配置这些单点登录功能，满足从个人开发者到大型企业的不同认证需求。

## 配置概述

微语的单点登录配置分为两个部分：

1. **前端显示控制**：控制前端是否显示相应平台的登录按钮
2. **OAuth 参数配置**：配置各平台的客户端ID、密钥等认证参数

## 前端登录按钮控制

通过 `custom` 参数可以控制前端是否显示相应的登录按钮：

### Properties 配置

```properties
# 启用微信登录按钮
bytedesk.custom.login-wechat-enable=false

# 启用 GitHub 登录按钮
bytedesk.custom.login-github-enable=true

# 启用 Facebook 登录按钮
bytedesk.custom.login-facebook-enable=false

# 启用 Google 登录按钮
bytedesk.custom.login-google-enable=false

# 启用钉钉登录按钮
bytedesk.custom.login-dingtalk-enable=false

# 启用抖音登录按钮
bytedesk.custom.login-douyin-enable=false

# 启用飞书登录按钮
bytedesk.custom.login-feishu-enable=false

# 启用 LDAP 登录按钮
bytedesk.custom.login-ldap-enable=false

# 启用 CAS 登录按钮
bytedesk.custom.login-cas-enable=false

# 启用 OIDC 登录按钮
bytedesk.custom.login-oidc-enable=false

# 启用 OpenID 登录按钮
bytedesk.custom.login-openid-enable=false
```

### Docker Compose 配置

```yaml
services:
  bytedesk:
    image: bytedesk/server:latest
    environment:
      # 启用微信登录按钮
      BYTEDESK_CUSTOM_LOGIN_WECHAT_ENABLE: "false"
      # 启用 GitHub 登录按钮
      BYTEDESK_CUSTOM_LOGIN_GITHUB_ENABLE: "true"
      # 启用 Facebook 登录按钮
      BYTEDESK_CUSTOM_LOGIN_FACEBOOK_ENABLE: "false"
      # 启用 Google 登录按钮
      BYTEDESK_CUSTOM_LOGIN_GOOGLE_ENABLE: "false"
      # 启用钉钉登录按钮
      BYTEDESK_CUSTOM_LOGIN_DINGTALK_ENABLE: "false"
      # 启用抖音登录按钮
      BYTEDESK_CUSTOM_LOGIN_DOUYIN_ENABLE: "false"
      # 启用飞书登录按钮
      BYTEDESK_CUSTOM_LOGIN_FEISHU_ENABLE: "false"
      # 启用 LDAP 登录按钮
      BYTEDESK_CUSTOM_LOGIN_LDAP_ENABLE: "false"
      # 启用 CAS 登录按钮
      BYTEDESK_CUSTOM_LOGIN_CAS_ENABLE: "false"
      # 启用 OIDC 登录按钮
      BYTEDESK_CUSTOM_LOGIN_OIDC_ENABLE: "false"
      # 启用 OpenID 登录按钮
      BYTEDESK_CUSTOM_LOGIN_OPENID_ENABLE: "false"
```

## OAuth 参数配置

### GitHub 配置

在使用 GitHub 登录前，需要先在 GitHub 创建 OAuth 应用：

1. 访问 [GitHub Developer Settings](https://github.com/settings/applications/new)
2. 创建新的 OAuth App
3. 获取 `Client ID` 和 `Client Secret`

#### GitHub Properties 配置

```properties
# GitHub OAuth 配置
bytedesk.oauth.github.enabled=true
bytedesk.oauth.github.client-id=你的GitHub客户端ID
bytedesk.oauth.github.client-secret=你的GitHub客户端密钥
# GitHub 完成授权后跳转到前端回调页的地址（可选，若未配置则需要在请求中传入 redirectUri）
bytedesk.oauth.github.redirect-uri=https://your-domain.com/auth/github/callback
```

#### GitHub Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # GitHub OAuth 配置
      BYTEDESK_OAUTH_GITHUB_ENABLED: "true"
      BYTEDESK_OAUTH_GITHUB_CLIENT_ID: "你的GitHub客户端ID"
      BYTEDESK_OAUTH_GITHUB_CLIENT_SECRET: "你的GitHub客户端密钥"
      # GitHub 完成授权后跳转到前端回调页的地址
      BYTEDESK_OAUTH_GITHUB_REDIRECT_URI: "https://your-domain.com/auth/github/callback"
```

### Google 配置

在 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 2.0 客户端：

#### Google Properties 配置

```properties
# Google OAuth 配置
bytedesk.oauth.google.enabled=true
bytedesk.oauth.google.client-id=你的Google客户端ID
bytedesk.oauth.google.client-secret=你的Google客户端密钥
bytedesk.oauth.google.redirect-uri=https://your-domain.com/auth/google/callback
```

#### Google Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # Google OAuth 配置
      BYTEDESK_OAUTH_GOOGLE_ENABLED: "true"
      BYTEDESK_OAUTH_GOOGLE_CLIENT_ID: "你的Google客户端ID"
      BYTEDESK_OAUTH_GOOGLE_CLIENT_SECRET: "你的Google客户端密钥"
      BYTEDESK_OAUTH_GOOGLE_REDIRECT_URI: "https://your-domain.com/auth/google/callback"
```

### 微信配置

支持微信开放平台和公众号网页授权：

#### 微信 Properties 配置

```properties
# WeChat OAuth 配置（开放平台/公众号网页授权）
bytedesk.oauth.wechat.enabled=true
bytedesk.oauth.wechat.app-id=你的微信AppID
bytedesk.oauth.wechat.app-secret=你的微信AppSecret
bytedesk.oauth.wechat.redirect-uri=https://your-domain.com/auth/wechat/callback
```

#### 微信 Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # WeChat OAuth 配置（开放平台/公众号网页授权）
      BYTEDESK_OAUTH_WECHAT_ENABLED: "true"
      BYTEDESK_OAUTH_WECHAT_APP_ID: "你的微信AppID"
      BYTEDESK_OAUTH_WECHAT_APP_SECRET: "你的微信AppSecret"
      BYTEDESK_OAUTH_WECHAT_REDIRECT_URI: "https://your-domain.com/auth/wechat/callback"
```

### Facebook 配置

在 [Facebook for Developers](https://developers.facebook.com/) 创建应用：

#### Facebook Properties 配置

```properties
# Facebook OAuth 配置
bytedesk.oauth.facebook.enabled=true
bytedesk.oauth.facebook.client-id=你的Facebook应用ID
bytedesk.oauth.facebook.client-secret=你的Facebook应用密钥
bytedesk.oauth.facebook.redirect-uri=https://your-domain.com/auth/facebook/callback
```

#### Facebook Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # Facebook OAuth 配置
      BYTEDESK_OAUTH_FACEBOOK_ENABLED: "true"
      BYTEDESK_OAUTH_FACEBOOK_CLIENT_ID: "你的Facebook应用ID"
      BYTEDESK_OAUTH_FACEBOOK_CLIENT_SECRET: "你的Facebook应用密钥"
      BYTEDESK_OAUTH_FACEBOOK_REDIRECT_URI: "https://your-domain.com/auth/facebook/callback"
```

### 钉钉配置

在钉钉开放平台创建应用：

#### 钉钉 Properties 配置

```properties
# DingTalk OAuth 配置
bytedesk.oauth.dingtalk.enabled=true
bytedesk.oauth.dingtalk.app-id=你的钉钉AppID
bytedesk.oauth.dingtalk.app-secret=你的钉钉AppSecret
bytedesk.oauth.dingtalk.redirect-uri=https://your-domain.com/auth/dingtalk/callback
```

#### 钉钉 Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # DingTalk OAuth 配置
      BYTEDESK_OAUTH_DINGTALK_ENABLED: "true"
      BYTEDESK_OAUTH_DINGTALK_APP_ID: "你的钉钉AppID"
      BYTEDESK_OAUTH_DINGTALK_APP_SECRET: "你的钉钉AppSecret"
      BYTEDESK_OAUTH_DINGTALK_REDIRECT_URI: "https://your-domain.com/auth/dingtalk/callback"
```

### 抖音配置

在抖音开放平台创建应用：

#### 抖音 Properties 配置

```properties
# DouYin OAuth 配置
bytedesk.oauth.douyin.enabled=true
bytedesk.oauth.douyin.client-key=你的抖音ClientKey
bytedesk.oauth.douyin.client-secret=你的抖音ClientSecret
bytedesk.oauth.douyin.redirect-uri=https://your-domain.com/auth/douyin/callback
```

#### 抖音 Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # DouYin OAuth 配置
      BYTEDESK_OAUTH_DOUYIN_ENABLED: "true"
      BYTEDESK_OAUTH_DOUYIN_CLIENT_KEY: "你的抖音ClientKey"
      BYTEDESK_OAUTH_DOUYIN_CLIENT_SECRET: "你的抖音ClientSecret"
      BYTEDESK_OAUTH_DOUYIN_REDIRECT_URI: "https://your-domain.com/auth/douyin/callback"
```

### 飞书配置

在飞书开放平台创建应用：

#### 飞书 Properties 配置

```properties
# Feishu OAuth 配置
bytedesk.oauth.feishu.enabled=true
bytedesk.oauth.feishu.app-id=你的飞书AppID
bytedesk.oauth.feishu.app-secret=你的飞书AppSecret
bytedesk.oauth.feishu.redirect-uri=https://your-domain.com/auth/feishu/callback
```

#### 飞书 Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # Feishu OAuth 配置
      BYTEDESK_OAUTH_FEISHU_ENABLED: "true"
      BYTEDESK_OAUTH_FEISHU_APP_ID: "你的飞书AppID"
      BYTEDESK_OAUTH_FEISHU_APP_SECRET: "你的飞书AppSecret"
      BYTEDESK_OAUTH_FEISHU_REDIRECT_URI: "https://your-domain.com/auth/feishu/callback"
```

### LDAP 配置

LDAP（轻量级目录访问协议）主要用于企业内部认证：

#### LDAP Properties 配置

```properties
# LDAP 登录配置（Bytedesk 自有 LDAP 登录，与 Spring LDAP 基础配置配合使用）
bytedesk.oauth.ldap.enabled=false
# 登录时若无邮箱可按此域名拼接（例如: username@yourdomain.com）
bytedesk.oauth.ldap.default-email-domain=yourdomain.com
```

#### LDAP Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # LDAP 登录配置
      BYTEDESK_OAUTH_LDAP_ENABLED: "true"
      # 登录时若无邮箱可按此域名拼接
      BYTEDESK_OAUTH_LDAP_DEFAULT_EMAIL_DOMAIN: "yourdomain.com"
```

### CAS 配置

CAS（Central Authentication Service）是一个单点登录协议：

#### CAS Properties 配置

```properties
# CAS 单点登录配置
bytedesk.oauth.cas.enabled=false
# CAS 服务器地址，例如：https://cas.example.com
bytedesk.oauth.cas.server-url=https://cas.example.com
# 登录路径，默认 /login
bytedesk.oauth.cas.login-path=/login
# 校验路径，建议使用 p3 接口，默认 /p3/serviceValidate
bytedesk.oauth.cas.validate-path=/p3/serviceValidate
# 当前系统在 CAS 注册的回调地址（service），用于校验 ticket
bytedesk.oauth.cas.service-redirect-uri=https://your-domain.com/auth/cas/callback
# 默认邮箱域（当 CAS 返回无邮箱时用于拼接）
bytedesk.oauth.cas.default-email-domain=yourdomain.com
```

#### CAS Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # CAS 单点登录配置
      BYTEDESK_OAUTH_CAS_ENABLED: "true"
      # CAS 服务器地址
      BYTEDESK_OAUTH_CAS_SERVER_URL: "https://cas.example.com"
      # 登录路径
      BYTEDESK_OAUTH_CAS_LOGIN_PATH: "/login"
      # 校验路径
      BYTEDESK_OAUTH_CAS_VALIDATE_PATH: "/p3/serviceValidate"
      # 回调地址
      BYTEDESK_OAUTH_CAS_SERVICE_REDIRECT_URI: "https://your-domain.com/auth/cas/callback"
      # 默认邮箱域
      BYTEDESK_OAUTH_CAS_DEFAULT_EMAIL_DOMAIN: "yourdomain.com"
```

### OIDC 配置

OIDC（OpenID Connect）是基于OAuth 2.0的身份认证协议：

#### OIDC Properties 配置

```properties
# OIDC 标准登录配置（基于发现文档）
bytedesk.oauth.oidc.enabled=false
# Issuer 地址，例如：https://login.microsoftonline.com/{tenant}/v2.0
bytedesk.oauth.oidc.issuer=https://login.microsoftonline.com/your-tenant/v2.0
bytedesk.oauth.oidc.client-id=你的OIDC客户端ID
bytedesk.oauth.oidc.client-secret=你的OIDC客户端密钥
bytedesk.oauth.oidc.redirect-uri=https://your-domain.com/auth/oidc/callback
```

#### OIDC Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # OIDC 标准登录配置
      BYTEDESK_OAUTH_OIDC_ENABLED: "true"
      # Issuer 地址
      BYTEDESK_OAUTH_OIDC_ISSUER: "https://login.microsoftonline.com/your-tenant/v2.0"
      # 客户端ID
      BYTEDESK_OAUTH_OIDC_CLIENT_ID: "你的OIDC客户端ID"
      # 客户端密钥
      BYTEDESK_OAUTH_OIDC_CLIENT_SECRET: "你的OIDC客户端密钥"
      # 回调地址
      BYTEDESK_OAUTH_OIDC_REDIRECT_URI: "https://your-domain.com/auth/oidc/callback"
```

### OpenID 配置

通用 OAuth/OpenID 风格配置，支持自定义端点：

#### OpenID Properties 配置

```properties
# OpenID（通用 OAuth/OpenID 风格，自配置端点）
bytedesk.oauth.openid.enabled=false
bytedesk.oauth.openid.authorization-endpoint=https://your-provider.com/oauth/authorize
bytedesk.oauth.openid.token-endpoint=https://your-provider.com/oauth/token
bytedesk.oauth.openid.user-info-endpoint=https://your-provider.com/oauth/userinfo
bytedesk.oauth.openid.client-id=你的OpenID客户端ID
bytedesk.oauth.openid.client-secret=你的OpenID客户端密钥
bytedesk.oauth.openid.redirect-uri=https://your-domain.com/auth/openid/callback
# 用户名字段，默认 email，可配置为 sub/username 等
bytedesk.oauth.openid.username-field=email
```

#### OpenID Docker Compose 配置

```yaml
services:
  bytedesk:
    environment:
      # OpenID 通用配置
      BYTEDESK_OAUTH_OPENID_ENABLED: "true"
      # 授权端点
      BYTEDESK_OAUTH_OPENID_AUTHORIZATION_ENDPOINT: "https://your-provider.com/oauth/authorize"
      # 令牌端点
      BYTEDESK_OAUTH_OPENID_TOKEN_ENDPOINT: "https://your-provider.com/oauth/token"
      # 用户信息端点
      BYTEDESK_OAUTH_OPENID_USER_INFO_ENDPOINT: "https://your-provider.com/oauth/userinfo"
      # 客户端ID
      BYTEDESK_OAUTH_OPENID_CLIENT_ID: "你的OpenID客户端ID"
      # 客户端密钥
      BYTEDESK_OAUTH_OPENID_CLIENT_SECRET: "你的OpenID客户端密钥"
      # 回调地址
      BYTEDESK_OAUTH_OPENID_REDIRECT_URI: "https://your-domain.com/auth/openid/callback"
      # 用户名字段
      BYTEDESK_OAUTH_OPENID_USERNAME_FIELD: "email"
```

## 快速配置步骤

### 1. 选择要启用的平台

根据您的需求，在配置文件中设置相应平台的登录按钮显示：

```properties
# 例如：只启用 GitHub 和微信登录
bytedesk.custom.login-github-enable=true
bytedesk.custom.login-wechat-enable=true
# 其他平台设置为 false
bytedesk.custom.login-facebook-enable=false
bytedesk.custom.login-google-enable=false
# ... 其他平台
```

### 2. 配置 OAuth 参数

为启用的平台配置相应的 OAuth 参数。确保：

- `enabled` 设置为 `true`
- 正确填写 `client-id`、`client-secret` 等参数
- 配置正确的回调地址 `redirect-uri`

### 3. 重启服务

配置完成后重启微语服务使配置生效。

## 企业级 SSO 特殊说明

### LDAP 配置注意事项

- LDAP 需要配合 Spring Boot 的 LDAP 基础配置使用
- 需要在 `application.properties` 中配置 LDAP 服务器连接信息
- 支持 Active Directory 和其他 LDAP 兼容目录服务

### CAS 配置注意事项

- 确保 CAS 服务器版本兼容（建议 3.x 或更高版本）
- `service-redirect-uri` 必须在 CAS 服务器中注册为有效的服务
- 支持 CAS 1.0、2.0 和 3.0 协议

### OIDC 配置注意事项

- 支持标准的 OpenID Connect Discovery 机制
- 自动从 `{issuer}/.well-known/openid_configuration` 获取端点信息
- 兼容 Azure AD、Google、Auth0 等主流 OIDC 提供商

### OpenID 配置注意事项

- 适用于不完全遵循 OIDC 标准的自定义 OAuth 提供商
- 需要手动配置所有必要的端点地址
- `username-field` 用于指定从用户信息中提取用户名的字段

## 注意事项

1. **回调地址**：`redirect-uri` 必须与在第三方平台注册时填写的回调地址完全一致
2. **HTTPS**：生产环境建议使用 HTTPS 协议
3. **域名白名单**：某些平台需要在其管理后台配置域名白名单
4. **权限范围**：根据需要在第三方平台配置适当的权限范围
5. **企业防火墙**：确保企业内部网络能够访问第三方认证服务器
6. **用户映射**：企业级 SSO 需要考虑用户身份映射和权限同步

## 测试配置

配置完成后，您可以通过以下方式测试：

1. 访问微语系统登录页面
2. 检查是否显示了启用的第三方登录按钮
3. 点击相应按钮测试登录流程
4. 确认能够成功跳转并完成认证

如果遇到问题，请检查：

- 配置参数是否正确
- 第三方平台的应用状态是否正常
- 网络连接和防火墙设置

## 完整的 Docker Compose 配置示例

以下是一个包含所有SSO配置的完整 `docker-compose.yml` 示例：

```yaml
version: '3.8'

services:
  bytedesk:
    image: bytedesk/server:latest
    ports:
      - "9003:9003"
    environment:
      # 前端登录按钮控制
      BYTEDESK_CUSTOM_LOGIN_WECHAT_ENABLE: "true"
      BYTEDESK_CUSTOM_LOGIN_GITHUB_ENABLE: "true"
      BYTEDESK_CUSTOM_LOGIN_FACEBOOK_ENABLE: "false"
      BYTEDESK_CUSTOM_LOGIN_GOOGLE_ENABLE: "true"
      BYTEDESK_CUSTOM_LOGIN_DINGTALK_ENABLE: "false"
      BYTEDESK_CUSTOM_LOGIN_DOUYIN_ENABLE: "false"
      BYTEDESK_CUSTOM_LOGIN_FEISHU_ENABLE: "false"
      # 启用 LDAP 登录按钮
      BYTEDESK_CUSTOM_LOGIN_LDAP_ENABLE: "false"
      # 启用 CAS 登录按钮
      BYTEDESK_CUSTOM_LOGIN_CAS_ENABLE: "false"
      # 启用 OIDC 登录按钮
      BYTEDESK_CUSTOM_LOGIN_OIDC_ENABLE: "false"
      # 启用 OpenID 登录按钮
      BYTEDESK_CUSTOM_LOGIN_OPENID_ENABLE: "false"
      
      # GitHub OAuth 配置
      BYTEDESK_OAUTH_GITHUB_ENABLED: "true"
      BYTEDESK_OAUTH_GITHUB_CLIENT_ID: "your_github_client_id"
      BYTEDESK_OAUTH_GITHUB_CLIENT_SECRET: "your_github_client_secret"
      BYTEDESK_OAUTH_GITHUB_REDIRECT_URI: "https://your-domain.com/auth/github/callback"
      
      # Google OAuth 配置
      BYTEDESK_OAUTH_GOOGLE_ENABLED: "true"
      BYTEDESK_OAUTH_GOOGLE_CLIENT_ID: "your_google_client_id"
      BYTEDESK_OAUTH_GOOGLE_CLIENT_SECRET: "your_google_client_secret"
      BYTEDESK_OAUTH_GOOGLE_REDIRECT_URI: "https://your-domain.com/auth/google/callback"
      
      # WeChat OAuth 配置
      BYTEDESK_OAUTH_WECHAT_ENABLED: "true"
      BYTEDESK_OAUTH_WECHAT_APP_ID: "your_wechat_app_id"
      BYTEDESK_OAUTH_WECHAT_APP_SECRET: "your_wechat_app_secret"
      BYTEDESK_OAUTH_WECHAT_REDIRECT_URI: "https://your-domain.com/auth/wechat/callback"
      
      # Facebook OAuth 配置（可选）
      BYTEDESK_OAUTH_FACEBOOK_ENABLED: "false"
      BYTEDESK_OAUTH_FACEBOOK_CLIENT_ID: ""
      BYTEDESK_OAUTH_FACEBOOK_CLIENT_SECRET: ""
      BYTEDESK_OAUTH_FACEBOOK_REDIRECT_URI: ""
      
      # DingTalk OAuth 配置（可选）
      BYTEDESK_OAUTH_DINGTALK_ENABLED: "false"
      BYTEDESK_OAUTH_DINGTALK_APP_ID: ""
      BYTEDESK_OAUTH_DINGTALK_APP_SECRET: ""
      BYTEDESK_OAUTH_DINGTALK_REDIRECT_URI: ""
      
      # DouYin OAuth 配置（可选）
      BYTEDESK_OAUTH_DOUYIN_ENABLED: "false"
      BYTEDESK_OAUTH_DOUYIN_CLIENT_KEY: ""
      BYTEDESK_OAUTH_DOUYIN_CLIENT_SECRET: ""
      BYTEDESK_OAUTH_DOUYIN_REDIRECT_URI: ""
      
      # Feishu OAuth 配置（可选）
      BYTEDESK_OAUTH_FEISHU_ENABLED: "false"
      BYTEDESK_OAUTH_FEISHU_APP_ID: ""
      BYTEDESK_OAUTH_FEISHU_APP_SECRET: ""
      BYTEDESK_OAUTH_FEISHU_REDIRECT_URI: ""
      
      # LDAP 配置（可选）
      BYTEDESK_OAUTH_LDAP_ENABLED: "false"
      BYTEDESK_OAUTH_LDAP_DEFAULT_EMAIL_DOMAIN: ""
      
      # CAS 配置（可选）
      BYTEDESK_OAUTH_CAS_ENABLED: "false"
      BYTEDESK_OAUTH_CAS_SERVER_URL: ""
      BYTEDESK_OAUTH_CAS_LOGIN_PATH: "/login"
      BYTEDESK_OAUTH_CAS_VALIDATE_PATH: "/p3/serviceValidate"
      BYTEDESK_OAUTH_CAS_SERVICE_REDIRECT_URI: ""
      BYTEDESK_OAUTH_CAS_DEFAULT_EMAIL_DOMAIN: ""
      
      # OIDC 配置（可选）
      BYTEDESK_OAUTH_OIDC_ENABLED: "false"
      BYTEDESK_OAUTH_OIDC_ISSUER: ""
      BYTEDESK_OAUTH_OIDC_CLIENT_ID: ""
      BYTEDESK_OAUTH_OIDC_CLIENT_SECRET: ""
      BYTEDESK_OAUTH_OIDC_REDIRECT_URI: ""
      
      # OpenID 配置（可选）
      BYTEDESK_OAUTH_OPENID_ENABLED: "false"
      BYTEDESK_OAUTH_OPENID_AUTHORIZATION_ENDPOINT: ""
      BYTEDESK_OAUTH_OPENID_TOKEN_ENDPOINT: ""
      BYTEDESK_OAUTH_OPENID_USER_INFO_ENDPOINT: ""
      BYTEDESK_OAUTH_OPENID_CLIENT_ID: ""
      BYTEDESK_OAUTH_OPENID_CLIENT_SECRET: ""
      BYTEDESK_OAUTH_OPENID_REDIRECT_URI: ""
      BYTEDESK_OAUTH_OPENID_USERNAME_FIELD: "email"
    volumes:
      - bytedesk_data:/data
    restart: unless-stopped
    networks:
      - bytedesk_network

volumes:
  bytedesk_data:

networks:
  bytedesk_network:
    driver: bridge
```

### 配置说明

1. **替换占位符**：将示例中的 `your_*` 占位符替换为实际的配置值
2. **启用/禁用平台**：将不需要的平台的 `ENABLED` 设置为 `"false"`
3. **环境变量规则**：
   - Properties 中的 `.` 替换为 `_`
   - 所有字母转换为大写
   - 添加 `BYTEDESK_` 前缀
   - 值必须用双引号包围

### 环境变量映射规则

| Properties 格式 | Docker 环境变量格式 |
|----------------|-------------------|
| `bytedesk.custom.login-github-enable` | `BYTEDESK_CUSTOM_LOGIN_GITHUB_ENABLE` |
| `bytedesk.oauth.github.client-id` | `BYTEDESK_OAUTH_GITHUB_CLIENT_ID` |
| `bytedesk.oauth.wechat.app-secret` | `BYTEDESK_OAUTH_WECHAT_APP_SECRET` |
| `bytedesk.oauth.cas.server-url` | `BYTEDESK_OAUTH_CAS_SERVER_URL` |
| `bytedesk.oauth.oidc.client-secret` | `BYTEDESK_OAUTH_OIDC_CLIENT_SECRET` |
| `bytedesk.oauth.openid.username-field` | `BYTEDESK_OAUTH_OPENID_USERNAME_FIELD` |
