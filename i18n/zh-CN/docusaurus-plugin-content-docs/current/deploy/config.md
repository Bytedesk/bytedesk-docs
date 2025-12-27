---
sidebar_label: 服务器配置参数说明
sidebar_position: 7
---

# 微语服务器配置参数说明

本文档详细说明微语服务器（基于Spring Boot 3.x开发）的配置参数及其用法。

> 若需了解如何为配置项加密、解密或注入密钥，请参阅 [Jasypt 加密说明](./depend/jasypt)。

## 基础配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `server.port` | 服务器端口 | `9003` | `SERVER_PORT: 9003` |
| `bytedesk.debug` | 是否开启调试模式 | `true` | `BYTEDESK_DEBUG: true` |
| `bytedesk.version` | 产品版本号 | `0.7.8` | `BYTEDESK_VERSION: 0.7.8` |
| `bytedesk.appkey` | 授权密钥 | `ZjoyMDI...` | `BYTEDESK_APPKEY: ZjoyMDI...` |

## 自定义配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.custom.enabled` | 是否启用自定义配置（名称、logo、说明等） | `true` | `BYTEDESK_CUSTOM_ENABLED: true` |
| `bytedesk.custom.name` | 自定义产品名称，默认为空则使用默认名称 | - | `BYTEDESK_CUSTOM_NAME:` |
| `bytedesk.custom.logo` | 自定义产品logo，默认为空则使用默认logo | - | `BYTEDESK_CUSTOM_LOGO:` |
| `bytedesk.custom.description` | 自定义产品描述，默认为空则使用"Chat As A Service" | - | `BYTEDESK_CUSTOM_DESCRIPTION:` |
| `bytedesk.custom.show-right-corner-chat` | 是否显示右下角对话窗口 | `false` | `BYTEDESK_CUSTOM_SHOW_RIGHT_CORNER_CHAT: false` |
| `bytedesk.custom.right-corner-chat-placement` | 浮窗位置：`bottom-right`/`bottom-left` | `bottom-right` | `BYTEDESK_CUSTOM_RIGHT_CORNER_CHAT_PLACEMENT: bottom-right` |
| `bytedesk.custom.show-demo` | 是否显示默认演示 | `true` | `BYTEDESK_CUSTOM_SHOW_DEMO: true` |
| `bytedesk.custom.privacy-policy-url` | 隐私政策URL地址 | `` | `BYTEDESK_CUSTOM_PRIVACY_POLICY_URL: ` |
| `bytedesk.custom.terms-of-service-url` | 服务条款URL地址 | `` | `BYTEDESK_CUSTOM_TERMS_OF_SERVICE_URL: ` |
| `bytedesk.custom.login-username-enable` | 是否启用用户名登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE: true` |
| `bytedesk.custom.login-2fa-enable` | 是否启用双重验证（用户名密码 + 手机号验证码） | `false` | `BYTEDESK_CUSTOM_LOGIN_2FA_ENABLE: false` |
| `bytedesk.custom.login-max-retry-count` | 密码错误最大重试次数，`0` 表示不限制 | `3` | `BYTEDESK_CUSTOM_LOGIN_MAX_RETRY_COUNT: 3` |
| `bytedesk.custom.login-max-retry-lock-time` | 超过次数后的锁定时长（分钟），`0` 表示不锁定 | `10` | `BYTEDESK_CUSTOM_LOGIN_MAX_RETRY_LOCK_TIME: 10` |
| `bytedesk.custom.login-mobile-enable` | 是否启用手机号登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE: true` |
| `bytedesk.custom.login-scan-enable` | 是否启用扫码登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE: true` |
| `bytedesk.custom.login-wechat-enable` | 是否启用微信登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_WECHAT_ENABLE: false` |
| `bytedesk.custom.login-github-enable` | 是否启用GitHub登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_GITHUB_ENABLE: true` |
| `bytedesk.custom.login-facebook-enable` | 是否启用Facebook登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_FACEBOOK_ENABLE: false` |
| `bytedesk.custom.login-google-enable` | 是否启用Google登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_GOOGLE_ENABLE: false` |
| `bytedesk.custom.login-dingtalk-enable` | 是否启用钉钉登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_DINGTALK_ENABLE: false` |
| `bytedesk.custom.login-douyin-enable` | 是否启用抖音登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_DOUYIN_ENABLE: false` |
| `bytedesk.custom.login-feishu-enable` | 是否启用飞书登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_FEISHU_ENABLE: false` |
| `bytedesk.custom.login-ldap-enable` | 是否启用LDAP登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_LDAP_ENABLE: false` |
| `bytedesk.custom.login-cas-enable` | 是否启用CAS登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_CAS_ENABLE: false` |
| `bytedesk.custom.login-oidc-enable` | 是否启用OIDC登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_OIDC_ENABLE: false` |
| `bytedesk.custom.login-openid-enable` | 是否启用OpenID登录 | `false` | `BYTEDESK_CUSTOM_LOGIN_OPENID_ENABLE: false` |
| `bytedesk.custom.doc-url-show` | 是否显示文档链接 | `true` | `BYTEDESK_CUSTOM_DOC_URL_SHOW: true` |
| `bytedesk.custom.doc-url` | 文档URL地址 | `` | `BYTEDESK_CUSTOM_DOC_URL: ` |
| `bytedesk.custom.lang` | 登录页语言，`zh-CN`/`en-US`/`zh-TW` | `zh-CN` | `BYTEDESK_CUSTOM_LANG: zh-CN` |
| `bytedesk.custom.allow-register` | 是否允许自助注册 | `true` | `BYTEDESK_CUSTOM_ALLOW_REGISTER: true` |
| `bytedesk.custom.force-validate-mobile` | 是否强制验证手机号 | `true` | `BYTEDESK_CUSTOM_FORCE_VALIDATE_MOBILE: true` |
| `bytedesk.custom.force-validate-email` | 是否强制验证邮箱 | `true` | `BYTEDESK_CUSTOM_FORCE_VALIDATE_EMAIL: true` |
| `bytedesk.custom.force-visitor-auth` | 是否强制访客身份认证 | `false` | `BYTEDESK_CUSTOM_FORCE_VISITOR_AUTH: false` |

## OAuth 与第三方登录配置

> 启用第三方登录时，需要同时打开对应的 `bytedesk.custom.login-xxx-enable` 开关，确保前端展示入口。

### GitHub 登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.github.enabled` | 是否启用GitHub登录 | `true` | `BYTEDESK_OAUTH_GITHUB_ENABLED: true` |
| `bytedesk.oauth.github.client-id` | GitHub OAuth应用的Client ID | `Ov23lilbd9l79m8dQdUG` | `BYTEDESK_OAUTH_GITHUB_CLIENT_ID: Ov23lilbd9l79m8dQdUG` |
| `bytedesk.oauth.github.client-secret` | GitHub OAuth应用的Client Secret | `your-github-client-secret` | `BYTEDESK_OAUTH_GITHUB_CLIENT_SECRET: your-github-client-secret` |
| `bytedesk.oauth.github.redirect-uri` | GitHub授权完成后的回调地址 | `http://127.0.0.1:9004/admin/auth/login` | `BYTEDESK_OAUTH_GITHUB_REDIRECT_URI: http://127.0.0.1:9004/admin/auth/login` |

### Google 登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.google.enabled` | 是否启用Google登录 | `true` | `BYTEDESK_OAUTH_GOOGLE_ENABLED: true` |
| `bytedesk.oauth.google.client-id` | Google OAuth客户端ID | `your-google-client-id` | `BYTEDESK_OAUTH_GOOGLE_CLIENT_ID: your-google-client-id` |
| `bytedesk.oauth.google.client-secret` | Google OAuth客户端密钥 | `your-google-client-secret` | `BYTEDESK_OAUTH_GOOGLE_CLIENT_SECRET: your-google-client-secret` |
| `bytedesk.oauth.google.redirect-uri` | Google授权回调地址 | `https://example.com/oauth/google/callback` | `BYTEDESK_OAUTH_GOOGLE_REDIRECT_URI: https://example.com/oauth/google/callback` |

### 微信登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.wechat.enabled` | 是否启用微信登录（开放平台/公众号网页授权） | `true` | `BYTEDESK_OAUTH_WECHAT_ENABLED: true` |
| `bytedesk.oauth.wechat.app-id` | 微信开放平台应用AppID | `your-wechat-app-id` | `BYTEDESK_OAUTH_WECHAT_APP_ID: your-wechat-app-id` |
| `bytedesk.oauth.wechat.app-secret` | 微信开放平台应用Secret | `your-wechat-app-secret` | `BYTEDESK_OAUTH_WECHAT_APP_SECRET: your-wechat-app-secret` |
| `bytedesk.oauth.wechat.redirect-uri` | 微信授权回调地址 | `https://example.com/oauth/wechat/callback` | `BYTEDESK_OAUTH_WECHAT_REDIRECT_URI: https://example.com/oauth/wechat/callback` |

### Facebook 登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.facebook.enabled` | 是否启用Facebook登录 | `true` | `BYTEDESK_OAUTH_FACEBOOK_ENABLED: true` |
| `bytedesk.oauth.facebook.client-id` | Facebook应用ID | `your-facebook-client-id` | `BYTEDESK_OAUTH_FACEBOOK_CLIENT_ID: your-facebook-client-id` |
| `bytedesk.oauth.facebook.client-secret` | Facebook应用密钥 | `your-facebook-client-secret` | `BYTEDESK_OAUTH_FACEBOOK_CLIENT_SECRET: your-facebook-client-secret` |
| `bytedesk.oauth.facebook.redirect-uri` | Facebook授权回调地址 | `https://example.com/oauth/facebook/callback` | `BYTEDESK_OAUTH_FACEBOOK_REDIRECT_URI: https://example.com/oauth/facebook/callback` |

### 钉钉登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.dingtalk.enabled` | 是否启用钉钉登录 | `true` | `BYTEDESK_OAUTH_DINGTALK_ENABLED: true` |
| `bytedesk.oauth.dingtalk.app-id` | 钉钉应用AppKey/AppID | `your-dingtalk-app-id` | `BYTEDESK_OAUTH_DINGTALK_APP_ID: your-dingtalk-app-id` |
| `bytedesk.oauth.dingtalk.app-secret` | 钉钉应用AppSecret | `your-dingtalk-app-secret` | `BYTEDESK_OAUTH_DINGTALK_APP_SECRET: your-dingtalk-app-secret` |
| `bytedesk.oauth.dingtalk.redirect-uri` | 钉钉授权回调地址 | `https://example.com/oauth/dingtalk/callback` | `BYTEDESK_OAUTH_DINGTALK_REDIRECT_URI: https://example.com/oauth/dingtalk/callback` |

### 抖音登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.douyin.enabled` | 是否启用抖音登录 | `true` | `BYTEDESK_OAUTH_DOUYIN_ENABLED: true` |
| `bytedesk.oauth.douyin.client-key` | 抖音开放平台Client Key | `your-douyin-client-key` | `BYTEDESK_OAUTH_DOUYIN_CLIENT_KEY: your-douyin-client-key` |
| `bytedesk.oauth.douyin.client-secret` | 抖音开放平台Client Secret | `your-douyin-client-secret` | `BYTEDESK_OAUTH_DOUYIN_CLIENT_SECRET: your-douyin-client-secret` |
| `bytedesk.oauth.douyin.redirect-uri` | 抖音授权回调地址 | `https://example.com/oauth/douyin/callback` | `BYTEDESK_OAUTH_DOUYIN_REDIRECT_URI: https://example.com/oauth/douyin/callback` |

### 飞书登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.feishu.enabled` | 是否启用飞书登录 | `true` | `BYTEDESK_OAUTH_FEISHU_ENABLED: true` |
| `bytedesk.oauth.feishu.app-id` | 飞书应用AppID | `your-feishu-app-id` | `BYTEDESK_OAUTH_FEISHU_APP_ID: your-feishu-app-id` |
| `bytedesk.oauth.feishu.app-secret` | 飞书应用AppSecret | `your-feishu-app-secret` | `BYTEDESK_OAUTH_FEISHU_APP_SECRET: your-feishu-app-secret` |
| `bytedesk.oauth.feishu.redirect-uri` | 飞书授权回调地址 | `https://example.com/oauth/feishu/callback` | `BYTEDESK_OAUTH_FEISHU_REDIRECT_URI: https://example.com/oauth/feishu/callback` |

### LDAP 模式

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.ldap.enabled` | 是否启用内置LDAP登录适配 | `false` | `BYTEDESK_OAUTH_LDAP_ENABLED: false` |
| `bytedesk.oauth.ldap.default-email-domain` | 登录时若无邮箱按该域名拼接 | `yourdomain.com` | `BYTEDESK_OAUTH_LDAP_DEFAULT_EMAIL_DOMAIN: yourdomain.com` |

### CAS 单点登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.cas.enabled` | 是否启用CAS | `false` | `BYTEDESK_OAUTH_CAS_ENABLED: false` |
| `bytedesk.oauth.cas.server-url` | CAS服务器地址 | `https://cas.example.com` | `BYTEDESK_OAUTH_CAS_SERVER_URL: https://cas.example.com` |
| `bytedesk.oauth.cas.login-path` | CAS登录路径 | `/login` | `BYTEDESK_OAUTH_CAS_LOGIN_PATH: /login` |
| `bytedesk.oauth.cas.validate-path` | CAS校验路径，建议使用p3接口 | `/p3/serviceValidate` | `BYTEDESK_OAUTH_CAS_VALIDATE_PATH: /p3/serviceValidate` |
| `bytedesk.oauth.cas.service-redirect-uri` | 当前系统在CAS注册的回调地址 | `https://example.com/oauth/cas/callback` | `BYTEDESK_OAUTH_CAS_SERVICE_REDIRECT_URI: https://example.com/oauth/cas/callback` |
| `bytedesk.oauth.cas.default-email-domain` | 当CAS响应中无邮箱时用于拼接的域名 | `example.com` | `BYTEDESK_OAUTH_CAS_DEFAULT_EMAIL_DOMAIN: example.com` |

### OIDC 标准登录

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.oidc.enabled` | 是否启用OIDC登录 | `false` | `BYTEDESK_OAUTH_OIDC_ENABLED: false` |
| `bytedesk.oauth.oidc.issuer` | Issuer地址 | `https://login.microsoftonline.com/{tenant}/v2.0` | `BYTEDESK_OAUTH_OIDC_ISSUER: https://login.microsoftonline.com/{tenant}/v2.0` |
| `bytedesk.oauth.oidc.client-id` | OIDC客户端ID | `your-oidc-client-id` | `BYTEDESK_OAUTH_OIDC_CLIENT_ID: your-oidc-client-id` |
| `bytedesk.oauth.oidc.client-secret` | OIDC客户端密钥 | `your-oidc-client-secret` | `BYTEDESK_OAUTH_OIDC_CLIENT_SECRET: your-oidc-client-secret` |
| `bytedesk.oauth.oidc.redirect-uri` | OIDC授权回调地址 | `https://example.com/oauth/oidc/callback` | `BYTEDESK_OAUTH_OIDC_REDIRECT_URI: https://example.com/oauth/oidc/callback` |

### OpenID 自定义模式

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.oauth.openid.enabled` | 是否启用OpenID通用模式 | `false` | `BYTEDESK_OAUTH_OPENID_ENABLED: false` |
| `bytedesk.oauth.openid.authorization-endpoint` | 授权端点 | `https://example.com/oauth2/authorize` | `BYTEDESK_OAUTH_OPENID_AUTHORIZATION_ENDPOINT: https://example.com/oauth2/authorize` |
| `bytedesk.oauth.openid.token-endpoint` | Token端点 | `https://example.com/oauth2/token` | `BYTEDESK_OAUTH_OPENID_TOKEN_ENDPOINT: https://example.com/oauth2/token` |
| `bytedesk.oauth.openid.user-info-endpoint` | 用户信息端点 | `https://example.com/oauth2/userinfo` | `BYTEDESK_OAUTH_OPENID_USER_INFO_ENDPOINT: https://example.com/oauth2/userinfo` |
| `bytedesk.oauth.openid.client-id` | OpenID客户端ID | `your-openid-client-id` | `BYTEDESK_OAUTH_OPENID_CLIENT_ID: your-openid-client-id` |
| `bytedesk.oauth.openid.client-secret` | OpenID客户端密钥 | `your-openid-client-secret` | `BYTEDESK_OAUTH_OPENID_CLIENT_SECRET: your-openid-client-secret` |
| `bytedesk.oauth.openid.redirect-uri` | OpenID授权回调地址 | `https://example.com/oauth/openid/callback` | `BYTEDESK_OAUTH_OPENID_REDIRECT_URI: https://example.com/oauth/openid/callback` |
| `bytedesk.oauth.openid.username-field` | 作为用户名的字段，默认`email` | `email` | `BYTEDESK_OAUTH_OPENID_USERNAME_FIELD: email` |

## 管理员配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.admin.email` | 管理员邮箱 | `admin@email.com` | `BYTEDESK_ADMIN_EMAIL: admin@email.com` |
| `bytedesk.admin.password` | 管理员默认密码 | `admin` | `BYTEDESK_ADMIN_PASSWORD: admin` |
| `bytedesk.admin.password-default` | 创建/导入成员的默认密码 | `123456` | `BYTEDESK_ADMIN_PASSWORD_DEFAULT: 123456` |
| `bytedesk.admin.nickname` | 管理员昵称 | `SuperAdmin` | `BYTEDESK_ADMIN_NICKNAME: SuperAdmin` |
| `bytedesk.admin.mobile` | 管理员手机号 | `13345678000` | `BYTEDESK_ADMIN_MOBILE: 13345678000` |
| `bytedesk.admin.mobile-whitelist` | 手机号白名单，使用逗号分隔 | `18888888000,18888888001,...` | `BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001...` |
| `bytedesk.admin.email-whitelist` | 邮箱白名单，使用逗号分隔 | `100@email.com,101@email.com,...` | `BYTEDESK_ADMIN_EMAIL_WHITELIST: 100@email.com,101@email.com...` |
| `bytedesk.admin.validate-code` | 白名单手机号和邮箱的验证码，否则生成随机6位数字 | `123456` | `BYTEDESK_ADMIN_VALIDATE_CODE: 123456` |
| `bytedesk.admin.allow-register` | 是否允许注册新账户 | `true` | `BYTEDESK_FEATURES_ENABLE_REGISTRATION: false` |
| `bytedesk.admin.force-validate-mobile` | 是否强制验证手机号 | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE: true` |
| `bytedesk.admin.force-validate-email` | 是否强制验证邮箱 | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL: true` |

## 成员配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.member.password` | 创建/导入成员的默认密码 | `123456` | `BYTEDESK_MEMBER_PASSWORD: 123456` |

## 性能测试配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.testing.enabled` | 是否启用性能测试模式 | `false` | `BYTEDESK_TESTING_ENABLED: false` |
| `bytedesk.testing.account-count` | 测试账号数量 | `300` | `BYTEDESK_TESTING_ACCOUNT_COUNT: 300` |
| `bytedesk.testing.account-username` | 测试账号用户名前缀 | `test` | `BYTEDESK_TESTING_ACCOUNT_USERNAME: test` |
| `bytedesk.testing.account-password` | 测试账号密码 | `password` | `BYTEDESK_TESTING_ACCOUNT_PASSWORD: password` |
| `bytedesk.testing.disable-captcha` | 是否禁用验证码 | `true` | `BYTEDESK_TESTING_DISABLE_CAPTCHA: true` |
| `bytedesk.testing.disable-ip-filter` | 是否禁用IP过滤 | `true` | `BYTEDESK_TESTING_DISABLE_IP_FILTER: true` |

## 组织配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.organization.name` | 组织名称 | `MyCompany` | `BYTEDESK_ORGANIZATION_NAME: MyCompany` |
| `bytedesk.organization.code` | 组织代码 | `bytedesk` | `BYTEDESK_ORGANIZATION_CODE: bytedesk` |

## 功能特性配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.features.java-ai` | 是否启用Java AI功能 | `true` | `BYTEDESK_FEATURES_JAVA_AI: false` |
| `bytedesk.features.python-ai` | 是否启用Python AI功能 | `false` | `BYTEDESK_FEATURES_PYTHON_AI: true` |
| `bytedesk.features.email-type` | 邮件发送方式，可选：`javamail`/`aliyun` | `javamail` | `BYTEDESK_FEATURES_EMAIL_TYPE: javamail` |
| `bytedesk.features.avatar-base-url` | 头像基础URL | - | `BYTEDESK_FEATURES_AVATAR_BASE_URL:` |

## 跨域配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.cors.allowed-origins` | 允许的跨域来源 | `*` | `BYTEDESK_CORS_ALLOWED_ORIGINS: *` |

## JWT配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.jwt.secret-key` | JWT密钥 | `1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` | `BYTEDESK_JWT_SECRET_KEY: 1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` |
| `bytedesk.jwt.expiration` | JWT过期时间（毫秒），默认30天 | `2592000000` | `BYTEDESK_JWT_EXPIRATION: 2592000000` |
| `bytedesk.jwt.refresh-token-expiration` | 刷新令牌过期时间（毫秒），默认60天 | `5184000000` | `BYTEDESK_JWT_REFRESH_TOKEN_EXPIRATION: 5184000000` |

## 缓存配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.cache.level` | 缓存级别：0(不使用缓存)、1(使用Caffeine缓存)、2(使用Caffeine + Redis缓存) | `2` | `BYTEDESK_CACHE_LEVEL: 2` |
| `bytedesk.cache.prefix` | 缓存前缀 | `bytedeskim` | `BYTEDESK_CACHE_PREFIX: bytedeskim` |
| `bytedesk.cache.redis-stream-key` | Redis流键名 | `bytedeskim:stream` | `BYTEDESK_CACHE_REDIS_STREAM_KEY: bytedeskim:stream` |
| `spring.cache.type` | Spring Cache 类型（建议：`redis`） | `redis` | `SPRING_CACHE_TYPE: redis` |
| `spring.cache.redis.time-to-live` | Spring Cache Redis TTL（毫秒） | `1800000` | `SPRING_CACHE_REDIS_TIME_TO_LIVE: 1800000` |
| `spring.cache.redis.cache-null-values` | 是否缓存 null 值 | `false` | `SPRING_CACHE_REDIS_CACHE_NULL_VALUES: "false"` |
| `spring.cache.redis.use-key-prefix` | 是否启用 key 前缀 | `true` | `SPRING_CACHE_REDIS_USE_KEY_PREFIX: "true"` |
| `spring.cache.redis.key-prefix` | key 前缀 | `bytedeskim:cache:` | `SPRING_CACHE_REDIS_KEY_PREFIX: "bytedeskim:cache:"` |

## 上传配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.upload.type` | 上传类型 | `local` | `BYTEDESK_UPLOAD_TYPE: local` |
| `bytedesk.upload.dir` | 上传目录（请首先在服务器创建文件夹，路径末尾不能添加'/'） | `/var/www/html/weiyuai/file` | `BYTEDESK_UPLOAD_DIR: /var/www/html/weiyuai/file` |
| `bytedesk.upload.url` | 外部访问上传文件URL(需要将域名替换为自己域名) | `https://www.weiyuai.cn` | `BYTEDESK_UPLOAD_URL: https://www.weiyuai.cn` |

### 上传配置URL组成说明

完整的上传文件URL实例：`https://www.weiyuai.cn/file/2025/05/21/20250521112410_pigeon_blue.png`

其中：

- `https://www.weiyuai.cn` 对应 `bytedesk.upload.url` 配置值
- `/file` 对应 `bytedesk.upload.dir` 配置的最后一级目录名
- `/2025/05/21/20250521112410_pigeon_blue.png` 为系统自动生成的文件存储路径和文件名

## 文件上传安全配置

> 默认策略：仅拦截“危险文件后缀黑名单”（例如 `exe/jsp/php/sh` 等）。
> 
> MIME 类型过滤默认不启用（避免浏览器无法准确识别文件 MIME 导致误拦截）。如需更严格校验，可手动开启。

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.upload.security.max-file-size` | 最大文件大小（字节），默认 10MB | `10485760` | `BYTEDESK_UPLOAD_SECURITY_MAX_FILE_SIZE: 10485760` |
| `bytedesk.upload.security.max-file-name-length` | 文件名最大长度 | `255` | `BYTEDESK_UPLOAD_SECURITY_MAX_FILE_NAME_LENGTH: 255` |
| `bytedesk.upload.security.enable-file-name-filter` | 是否启用文件名过滤（清理危险字符） | `true` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_FILE_NAME_FILTER: true` |
| `bytedesk.upload.security.force-rename` | 是否强制重命名（生成安全文件名） | `true` | `BYTEDESK_UPLOAD_SECURITY_FORCE_RENAME: true` |
| `bytedesk.upload.security.enable-image-validation` | 是否启用图片内容验证（避免伪装图片），默认关闭 | `false` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_IMAGE_VALIDATION: false` |
| `bytedesk.upload.security.enable-mime-type-validation` | 是否启用 MIME 类型过滤校验（默认关闭） | `false` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_MIME_TYPE_VALIDATION: false` |
| `bytedesk.upload.security.enable-upload-log` | 是否记录上传安全日志，默认关闭 | `false` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_UPLOAD_LOG: false` |

### 黑名单后缀说明

- `bytedesk.upload.security.dangerous-extensions`：危险文件后缀黑名单。命中即拒绝上传。
- 该黑名单会通过访客接口下发给前端用于提示与禁用发送。

### MIME 白名单说明（可选）

- `bytedesk.upload.security.allowed-mime-types`：允许的 MIME 类型白名单。
- 仅当 `bytedesk.upload.security.enable-mime-type-validation=true` 时生效。

## 知识库配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.kbase.theme` | 知识库主题，可选：`default`/`eduport`/`social`/`kbdoc` | `default` | `BYTEDESK_KBASE_THEME: default` |
| `bytedesk.kbase.html-path` | 请首先在服务器创建文件夹，HTML路径 | `/var/www/html/weiyuai/helpcenter` | `BYTEDESK_KBASE_HTML_PATH: /var/www/html/weiyuai/helpcenter` |
| `bytedesk.kbase.api-url` | 外部访问知识库URL(需要将域名替换为自己域名) | `https://api.weiyuai.cn` | `BYTEDESK_KBASE_API_URL: https://api.weiyuai.cn` |

## Socket模块配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.socket.enabled` | 是否启用Socket | `true` | `BYTEDESK_SOCKET_ENABLED: true` |
| `bytedesk.socket.host` | Socket主机 | `0.0.0.0` | `BYTEDESK_SOCKET_HOST: 0.0.0.0` |
| `bytedesk.socket.websocket-port` | WebSocket端口 | `9885` | `BYTEDESK_SOCKET_WEBSOCKET_PORT: 9885` |
| `bytedesk.socket.leak-detector-level` | 内存泄漏检测级别 | `SIMPLE` | `BYTEDESK_SOCKET_LEAK_DETECTOR_LEVEL: SIMPLE` |
| `bytedesk.socket.parent-event-loop-group-thread-count` | 父事件循环组线程数 | `1` | `BYTEDESK_SOCKET_PARENT_EVENT_LOOP_GROUP_THREAD_COUNT: 1` |
| `bytedesk.socket.child-event-loop-group-thread-count` | 子事件循环组线程数 | `8` | `BYTEDESK_SOCKET_CHILD_EVENT_LOOP_GROUP_THREAD_COUNT: 8` |
| `bytedesk.socket.max-payload-size` | 最大载荷大小（字节） | `10240` | `BYTEDESK_SOCKET_MAX_PAYLOAD_SIZE: 10240` |

## 水印配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.watermark.enabled` | 是否启用水印功能 | `true` | `BYTEDESK_WATERMARK_ENABLED: true` |
| `bytedesk.watermark.text` | 水印文字内容 | `bytedesk.com` | `BYTEDESK_WATERMARK_TEXT: bytedesk.com` |
| `bytedesk.watermark.position` | 水印位置，可选：`TOP_LEFT`/`TOP_RIGHT`/`BOTTOM_LEFT`/`BOTTOM_RIGHT`/`CENTER` | `BOTTOM_RIGHT` | `BYTEDESK_WATERMARK_POSITION: BOTTOM_RIGHT` |
| `bytedesk.watermark.fontSize` | 水印字体大小 | `24` | `BYTEDESK_WATERMARK_FONT_SIZE: 24` |
| `bytedesk.watermark.fontName` | 水印字体名称 | `Arial` | `BYTEDESK_WATERMARK_FONT_NAME: Arial` |
| `bytedesk.watermark.color` | 水印颜色（RGBA格式：R,G,B,A） | `255,255,255,128` | `BYTEDESK_WATERMARK_COLOR: 255,255,255,128` |
| `bytedesk.watermark.opacity` | 水印透明度（0.0-1.0） | `0.5` | `BYTEDESK_WATERMARK_OPACITY: 0.5` |
| `bytedesk.watermark.margin` | 水印边距（像素） | `20` | `BYTEDESK_WATERMARK_MARGIN: 20` |
| `bytedesk.watermark.imageOnly` | 是否只对图片文件添加水印 | `true` | `BYTEDESK_WATERMARK_IMAGE_ONLY: true` |
| `bytedesk.watermark.minImageSize` | 最小图片尺寸（像素），小于此尺寸的图片不添加水印 | `100` | `BYTEDESK_WATERMARK_MIN_IMAGE_SIZE: 100` |
| `bytedesk.watermark.maxImageSize` | 最大图片尺寸（像素），大于此尺寸的图片不添加水印 | `5000` | `BYTEDESK_WATERMARK_MAX_IMAGE_SIZE: 5000` |

### 水印配置说明

- **位置选项**：支持五种水印位置，分别为左上角、右上角、左下角、右下角和居中
- **颜色格式**：使用RGBA格式，格式为：红,绿,蓝,透明度，其中颜色值范围0-255，透明度范围0-255
- **透明度参数**：opacity值范围为0.0（完全透明）到1.0（完全不透明）
- **尺寸控制**：通过最小和最大图片尺寸参数，可以控制哪些图片需要添加水印，避免对过小或过大的图片添加水印

## AI模块配置

### Ollama配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.ollama.base-url` | Ollama基础URL，默认为11434端口，Docker环境建议修改为21434端口 | `http://127.0.0.1:21434` | `SPRING_AI_OLLAMA_BASE_URL: http://127.0.0.1:21434` |
| `spring.ai.ollama.chat.enabled` | 是否启用Ollama聊天功能 | `true` | `SPRING_AI_OLLAMA_CHAT_ENABLED: true` |
| `spring.ai.ollama.chat.options.model` | Ollama聊天模型 | `qwen3:0.6b` | `SPRING_AI_OLLAMA_CHAT_OPTIONS_MODEL: qwen3:0.6b` |
| `spring.ai.ollama.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_OLLAMA_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.ollama.embedding.enabled` | 是否启用Ollama嵌入功能 | `true` | `SPRING_AI_OLLAMA_EMBEDDING_ENABLED: true` |
| `spring.ai.ollama.embedding.options.model` | Ollama嵌入模型 | `bge-m3:latest` | `SPRING_AI_OLLAMA_EMBEDDING_OPTIONS_MODEL: bge-m3:latest` |

### 智谱AI配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.zhipuai.api-key` | 智谱AI API密钥 | `sk-xxx` | `SPRING_AI_ZHIPUAI_API_KEY: sk-xxx` |
| `spring.ai.zhipuai.chat.enabled` | 是否启用智谱AI聊天功能 | `false` | `SPRING_AI_ZHIPUAI_CHAT_ENABLED: false` |
| `spring.ai.zhipuai.chat.options.model` | 智谱AI聊天模型 | `glm-4-flash` | `SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash` |
| `spring.ai.zhipuai.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.zhipuai.embedding.enabled` | 是否启用智谱AI嵌入功能 | `false` | `SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: false` |

### DeepSeek配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.deepseek.base-url` | DeepSeek基础URL | `https://api.deepseek.com` | `SPRING_AI_DEEPSEEK_BASE_URL: https://api.deepseek.com` |
| `spring.ai.deepseek.api-key` | DeepSeek API密钥 | `sk-xxx` | `SPRING_AI_DEEPSEEK_API_KEY: sk-xxx` |
| `spring.ai.deepseek.chat.enabled` | 是否启用DeepSeek聊天功能 | `false` | `SPRING_AI_DEEPSEEK_CHAT_ENABLED: false` |
| `spring.ai.deepseek.chat.options.model` | DeepSeek聊天模型 | `deepseek-chat` | `SPRING_AI_DEEPSEEK_CHAT_OPTIONS_MODEL: deepseek-chat` |
| `spring.ai.deepseek.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_DEEPSEEK_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### OpenAI配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.openai.base-url` | OpenAI基础URL | `https://api.openai.com` | `SPRING_AI_OPENAI_BASE_URL: https://api.openai.com` |
| `spring.ai.openai.api-key` | OpenAI API密钥 | `sk-xxx` | `SPRING_AI_OPENAI_API_KEY: sk-xxx` |
| `spring.ai.openai.chat.enabled` | 是否启用OpenAI聊天功能 | `false` | `SPRING_AI_OPENAI_CHAT_ENABLED: false` |
| `spring.ai.openai.chat.options.model` | OpenAI聊天模型 | `gpt-4o` | `SPRING_AI_OPENAI_CHAT_OPTIONS_MODEL: gpt-4o` |
| `spring.ai.openai.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_OPENAI_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.openai.embedding.enabled` | 是否启用OpenAI嵌入功能 | `false` | `SPRING_AI_OPENAI_EMBEDDING_ENABLED: false` |
| `spring.ai.openai.image.enabled` | 是否启用OpenAI图像功能 | `false` | `SPRING_AI_OPENAI_IMAGE_ENABLED: false` |
| `spring.ai.openai.audio.transcription.enabled` | 是否启用OpenAI音频转录功能 | `false` | `SPRING_AI_OPENAI_AUDIO_TRANSCRIPTION_ENABLED: false` |
| `spring.ai.openai.audio.speech.enabled` | 是否启用OpenAI语音功能 | `false` | `SPRING_AI_OPENAI_AUDIO_SPEECH_ENABLED: false` |
| `spring.ai.openai.moderation.enabled` | 是否启用OpenAI内容审核功能 | `false` | `SPRING_AI_OPENAI_MODERATION_ENABLED: false` |

### 阿里云百炼配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.dashscope.base-url` | 阿里云百炼基础URL | `https://dashscope.aliyuncs.com/compatible-mode` | `SPRING_AI_DASHSCOPE_BASE_URL: https://dashscope.aliyuncs.com/compatible-mode` |
| `spring.ai.dashscope.api-key` | 阿里云百炼API密钥 | `sk-xxx` | `SPRING_AI_DASHSCOPE_API_KEY: sk-xxx` |
| `spring.ai.dashscope.chat.enabled` | 是否启用阿里云百炼聊天功能 | `false` | `SPRING_AI_DASHSCOPE_CHAT_ENABLED: false` |
| `spring.ai.dashscope.chat.options.model` | 阿里云百炼聊天模型 | `deepseek-r1` | `SPRING_AI_DASHSCOPE_CHAT_OPTIONS_MODEL: deepseek-r1` |
| `spring.ai.dashscope.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.dashscope.chat.options.topP` | topP参数 | `3` | `SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TOP_P: 3` |
| `spring.ai.dashscope.audio.transcription.enabled` | 是否启用阿里云百炼音频转录功能 | `false` | `SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED: false` |
| `spring.ai.dashscope.image.enabled` | 是否启用阿里云百炼图像功能 | `false` | `SPRING_AI_DASHSCOPE_IMAGE_ENABLED: false` |
| `spring.ai.dashscope.embedding.enabled` | 是否启用阿里云百炼嵌入功能 | `false` | `SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED: false` |
| `spring.ai.dashscope.audio.synthesis.enabled` | 是否启用阿里云百炼音频合成功能 | `false` | `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED: false` |
| `spring.ai.nacos.prompt.template.enabled` | 是否启用Nacos提示模板 | `false` | `SPRING_AI_NACOS_PROMPT_TEMPLATE_ENABLED: false` |

### SiliconFlow配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.siliconflow.base-url` | SiliconFlow基础URL | `https://api.siliconflow.cn` | `SPRING_AI_SILICONFLOW_BASE_URL: https://api.siliconflow.cn` |
| `spring.ai.siliconflow.api-key` | SiliconFlow API密钥 | `sk-xxxx` | `SPRING_AI_SILICONFLOW_API_KEY: sk-xxxx` |
| `spring.ai.siliconflow.chat.enabled` | 是否启用SiliconFlow聊天功能 | `false` | `SPRING_AI_SILICONFLOW_CHAT_ENABLED: false` |
| `spring.ai.siliconflow.chat.options.model` | SiliconFlow聊天模型 | `Qwen/QwQ-32B` | `SPRING_AI_SILICONFLOW_CHAT_OPTIONS_MODEL: Qwen/QwQ-32B` |
| `spring.ai.siliconflow.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_SILICONFLOW_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### Gitee配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.gitee.base-url` | Gitee基础URL | `https://ai.gitee.com` | `SPRING_AI_GITEE_BASE_URL: https://ai.gitee.com` |
| `spring.ai.gitee.api-key` | Gitee API密钥 | `xxx` | `SPRING_AI_GITEE_API_KEY: xxx` |
| `spring.ai.gitee.chat.enabled` | 是否启用Gitee聊天功能 | `false` | `SPRING_AI_GITEE_CHAT_ENABLED: false` |
| `spring.ai.gitee.chat.options.model` | Gitee聊天模型 | `Qwen/QwQ-32B` | `SPRING_AI_GITEE_CHAT_OPTIONS_MODEL: Qwen/QwQ-32B` |
| `spring.ai.gitee.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_GITEE_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### 腾讯云配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.tencent.base-url` | 腾讯云基础URL | `https://api.hunyuan.cloud.tencent.com` | `SPRING_AI_TENCENT_BASE_URL: https://api.hunyuan.cloud.tencent.com` |
| `spring.ai.tencent.api-key` | 腾讯云API密钥 | `sk-xxx` | `SPRING_AI_TENCENT_API_KEY: sk-xxx` |
| `spring.ai.tencent.chat.enabled` | 是否启用腾讯云聊天功能 | `false` | `SPRING_AI_TENCENT_CHAT_ENABLED: false` |
| `spring.ai.tencent.chat.options.model` | 腾讯云聊天模型 | `hunyuan-t1-latest` | `SPRING_AI_TENCENT_CHAT_OPTIONS_MODEL: hunyuan-t1-latest` |
| `spring.ai.tencent.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_TENCENT_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### 百度云配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.baidu.base-url` | 百度云基础URL | `https://qianfan.baidubce.com/v2` | `SPRING_AI_BAIDU_BASE_URL: https://qianfan.baidubce.com/v2` |
| `spring.ai.baidu.api-key` | 百度云API密钥 | `bce-v3/xxx` | `SPRING_AI_BAIDU_API_KEY: bce-v3/xxx` |
| `spring.ai.baidu.chat.enabled` | 是否启用百度云聊天功能 | `false` | `SPRING_AI_BAIDU_CHAT_ENABLED: false` |
| `spring.ai.baidu.chat.options.model` | 百度云聊天模型 | `ernie-x1-32k-preview` | `SPRING_AI_BAIDU_CHAT_OPTIONS_MODEL: ernie-x1-32k-preview` |
| `spring.ai.baidu.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_BAIDU_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### 火山引擎配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.volcengine.base-url` | 火山引擎基础URL | `https://ark.cn-beijing.volces.com/api/v3` | `SPRING_AI_VOLCENGINE_BASE_URL: https://ark.cn-beijing.volces.com/api/v3` |
| `spring.ai.volcengine.api-key` | 火山引擎API密钥 | `xxx` | `SPRING_AI_VOLCENGINE_API_KEY: xxx` |
| `spring.ai.volcengine.chat.enabled` | 是否启用火山引擎聊天功能 | `false` | `SPRING_AI_VOLCENGINE_CHAT_ENABLED: false` |
| `spring.ai.volcengine.chat.options.model` | 火山引擎聊天模型 | `doubao-1-5-pro-32k-250115` | `SPRING_AI_VOLCENGINE_CHAT_OPTIONS_MODEL: doubao-1-5-pro-32k-250115` |
| `spring.ai.volcengine.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_VOLCENGINE_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### OpenRouter配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.ai.openrouter.base-url` | OpenRouter基础URL | `https://openrouter.ai` | `SPRING_AI_OPENROUTER_BASE_URL: https://openrouter.ai` |
| `spring.ai.openrouter.api-key` | OpenRouter API密钥 | - | `SPRING_AI_OPENROUTER_API_KEY:` |
| `spring.ai.openrouter.chat.enabled` | 是否启用OpenRouter聊天功能 | `false` | `SPRING_AI_OPENROUTER_CHAT_ENABLED: false` |
| `spring.ai.openrouter.chat.options.model` | OpenRouter聊天模型 | - | `SPRING_AI_OPENROUTER_CHAT_OPTIONS_MODEL:` |
| `spring.ai.openrouter.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_OPENROUTER_CHAT_OPTIONS_TEMPERATURE: 0.7` |

## Telegram配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.telegram.enabled` | 是否启用Telegram功能 | `false` | `BYTEDESK_TELEGRAM_ENABLED: false` |
| `bytedesk.telegram.default-bot-enabled` | 是否启用默认Telegram机器人。必须先启用Telegram功能，此配置才有效 | `false` | `BYTEDESK_TELEGRAM_DEFAULT_BOT_ENABLED: false` |
| `bytedesk.telegram.default-bot-token` | 默认Telegram机器人令牌 | `placeholder` | `BYTEDESK_TELEGRAM_DEFAULT_BOT_TOKEN: placeholder` |

> 注意：使用Telegram功能需要确保服务器能够访问 `https://api.telegram.org`

## 向量数据库配置

### Elasticsearch向量存储配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `spring.elasticsearch.uris` | Elasticsearch URI | `http://127.0.0.1:19200` | `SPRING_ELASTICSEARCH_URIS: http://127.0.0.1:19200` |
| `spring.elasticsearch.username` | Elasticsearch用户名 | `elastic` | `SPRING_ELASTICSEARCH_USERNAME: elastic` |
| `spring.elasticsearch.password` | Elasticsearch密码 | `bytedesk123` | `SPRING_ELASTICSEARCH_PASSWORD: bytedesk123` |
| `spring.ai.vectorstore.elasticsearch.enabled` | 是否启用Elasticsearch向量存储 | `true` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_ENABLED: true` |
| `spring.ai.vectorstore.elasticsearch.initialize-schema` | 是否初始化Elasticsearch向量存储架构 | `true` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_INITIALIZE_SCHEMA: true` |
| `spring.ai.vectorstore.elasticsearch.index-name` | Elasticsearch向量存储索引名称 | `bytedesk_vs_index` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_INDEX_NAME: bytedesk_vs_index` |
| `spring.ai.vectorstore.elasticsearch.dimensions` | Elasticsearch向量维度 | `1024` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_DIMENSIONS: 1024` |
| `spring.ai.vectorstore.elasticsearch.similarity` | Elasticsearch相似度计算方法 | `cosine` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_SIMILARITY: cosine` |

## 阿里云短信服务配置 - 手机登录验证码

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `aliyun.region.id` | 阿里云区域ID查看 | `cn-hangzhou` | `ALIYUN_REGION_ID: cn-hangzhou` |
| `aliyun.access.key.id` | 阿里云访问密钥ID申请 | - | `ALIYUN_ACCESS_KEY_ID:` |
| `aliyun.access.key.secret` | 阿里云访问密钥秘钥申请 | - | `ALIYUN_ACCESS_KEY_SECRET:` |
| `aliyun.sms.signname` | 短信签名申请 | `ALIYUN_SMS_SIGNNAME: 微语` | `ALIYUN_SMS_SIGNNAME: 微语` |
| `aliyun.sms.templatecode` | 短信模板申请 | `SMS_xxxxxxxxx` | `ALIYUN_SMS_TEMPLATECODE: SMS_xxxxxxxxx` |

### 阿里云短信相关资源链接

- [阿里云区域ID查看](https://api.aliyun.com/product/Dysmsapi) - 短信服务区域ID查看文档
- [阿里云AccessKey申请](https://ram.console.aliyun.com/profile/access-keys) - 阿里云AccessKey管理控制台
- [阿里云短信签名申请](https://dysms.console.aliyun.com/domestic/text/sign) - 阿里云短信签名管理控制台
- [阿里云短信模板申请](https://dysms.console.aliyun.com/domestic/text/template) - 阿里云短信服务控制台

### 默认测试手机号和验证码配置

配置默认测试手机号白名单，这些手机号将使用固定验证码进行验证，方便开发和测试：

**配置文件方式：**

```properties
# 配置默认测试手机号白名单
bytedesk.admin.mobile-whitelist=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# 为白名单手机号和邮箱配置固定验证码，否则生成随机6位数字
bytedesk.admin.validate-code=123456
```

**Docker环境变量方式：**

```yaml
# 配置默认测试手机号白名单
BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001,18888888002,18888888003,18888888004,18888888005

# 为白名单手机号和邮箱配置固定验证码，否则生成随机6位数字
BYTEDESK_ADMIN_VALIDATE_CODE: 123456
```

> **注意：** 白名单手机号使用固定验证码，仅用于开发和测试环境。生产环境请谨慎使用，确保安全性。

## 百度翻译配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.translate.baidu.appid` | 百度翻译AppID | `placeholder` | `BYTEDESK_TRANSLATE_BAIDU_APPID: placeholder` |
| `bytedesk.translate.baidu.key` | 百度翻译密钥 | `placeholder` | `BYTEDESK_TRANSLATE_BAIDU_KEY: placeholder` |

### 百度翻译相关资源链接

- [百度翻译开放平台](https://fanyi-api.baidu.com/doc/21) - 百度翻译API文档

## 文件上传安全配置

文件上传安全配置用于保护系统免受恶意文件上传的攻击，提高上传文件的安全性。

> 说明：扩展名校验采用“黑名单”策略：只要不在 `bytedesk.upload.security.dangerous-extensions` 中，默认允许；
> 若服务端能识别到 `Content-Type`，还会额外按 `bytedesk.upload.security.allowed-mime-types` 进行校验。

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.upload.security.max-file-size` | 最大文件大小（字节），默认10MB=10485760 | `10485760` | `BYTEDESK_UPLOAD_SECURITY_MAX_FILE_SIZE: 10485760` |
| `bytedesk.upload.security.enable-image-validation` | 是否启用图片内容验证（检查图片完整性和格式） | `true` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_IMAGE_VALIDATION: true` |
| `bytedesk.upload.security.enable-file-name-filter` | 是否启用文件名过滤（检查文件名是否包含危险字符） | `true` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_FILE_NAME_FILTER: true` |
| `bytedesk.upload.security.force-rename` | 是否强制重命名文件（使用UUID重命名上传的文件） | `true` | `BYTEDESK_UPLOAD_SECURITY_FORCE_RENAME: true` |
| `bytedesk.upload.security.max-file-name-length` | 文件名最大长度（字符数），默认255 | `255` | `BYTEDESK_UPLOAD_SECURITY_MAX_FILE_NAME_LENGTH: 255` |
| `bytedesk.upload.security.enable-upload-log` | 是否记录上传日志（记录所有上传操作用于审计） | `true` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_UPLOAD_LOG: true` |
| `bytedesk.upload.security.enable-virus-scan` | 是否启用病毒扫描（预留接口，可与第三方扫描引擎集成） | `false` | `BYTEDESK_UPLOAD_SECURITY_ENABLE_VIRUS_SCAN: false` |
| `bytedesk.upload.security.allowed-extensions` | 允许的文件扩展名列表（逗号分隔，可选配置；服务端默认以黑名单为准，未命中黑名单即允许） | `jpg,jpeg,png,gif,pdf` | `BYTEDESK_UPLOAD_SECURITY_ALLOWED_EXTENSIONS: jpg,jpeg,png,gif,pdf` |
| `bytedesk.upload.security.dangerous-extensions` | 危险文件扩展名黑名单（逗号分隔，可选配置） | `exe,bat,cmd,sh` | `BYTEDESK_UPLOAD_SECURITY_DANGEROUS_EXTENSIONS: exe,bat,cmd,sh` |
| `bytedesk.upload.security.allowed-mime-types` | 允许的MIME类型（逗号分隔，可选配置） | `image/jpeg,image/png` | `BYTEDESK_UPLOAD_SECURITY_ALLOWED_MIME_TYPES: image/jpeg,image/png` |

### 文件上传安全配置说明

**配置文件方式：**

```properties
# ===============================
# = 文件上传安全配置
# ===============================
# 最大文件大小 (10MB = 10485760 bytes)
bytedesk.upload.security.max-file-size=10485760
# 是否启用图片内容验证
bytedesk.upload.security.enable-image-validation=true
# 是否启用文件名过滤
bytedesk.upload.security.enable-file-name-filter=true
# 是否强制重命名文件
bytedesk.upload.security.force-rename=true
# 文件名最大长度
bytedesk.upload.security.max-file-name-length=255
# 是否记录上传日志
bytedesk.upload.security.enable-upload-log=true
# 是否启用病毒扫描（预留接口）
bytedesk.upload.security.enable-virus-scan=false

# 允许的文件扩展名列表（可选配置；服务端默认以黑名单为准，未命中黑名单即允许）
# bytedesk.upload.security.allowed-extensions=jpg,jpeg,png,gif,bmp,webp,svg,pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar,7z,tar,gz,mp3,wav,aac,ogg,flac,m4a,mp4,avi,mov,wmv,flv,mkv,webm

# 危险文件扩展名黑名单（可选配置，默认使用代码中的配置）
# bytedesk.upload.security.dangerous-extensions=exe,msi,dmg,app,deb,rpm,jsp,php,asp,aspx,sh,bat,cmd,vbs,ps1,js,html,htm,xml,xhtml,jar,war,class,java,dll,com,cgi,scr,pif,lnk,reg,hta

# 允许的MIME类型（可选配置，默认使用代码中的配置）
# bytedesk.upload.security.allowed-mime-types=image/jpeg,image/png,image/gif,image/bmp,image/webp,image/svg+xml,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,application/zip,application/x-rar-compressed,application/x-7z-compressed,application/x-tar,application/gzip,audio/mpeg,audio/wav,audio/aac,audio/ogg,audio/flac,audio/mp4,video/mp4,video/avi,video/quicktime,video/x-ms-wmv,video/x-flv,video/x-matroska,video/webm
```

**Docker环境变量方式：**

```yaml
# 文件上传安全配置
BYTEDESK_UPLOAD_SECURITY_MAX_FILE_SIZE: 10485760
BYTEDESK_UPLOAD_SECURITY_ENABLE_IMAGE_VALIDATION: "true"
BYTEDESK_UPLOAD_SECURITY_ENABLE_FILE_NAME_FILTER: "true"
BYTEDESK_UPLOAD_SECURITY_FORCE_RENAME: "true"
BYTEDESK_UPLOAD_SECURITY_MAX_FILE_NAME_LENGTH: 255
BYTEDESK_UPLOAD_SECURITY_ENABLE_UPLOAD_LOG: "true"
BYTEDESK_UPLOAD_SECURITY_ENABLE_VIRUS_SCAN: "false"
# 可选配置
# BYTEDESK_UPLOAD_SECURITY_ALLOWED_EXTENSIONS: jpg,jpeg,png,gif,bmp,webp,svg,pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar,7z,tar,gz,mp3,wav,aac,ogg,flac,m4a,mp4,avi,mov,wmv,flv,mkv,webm
# BYTEDESK_UPLOAD_SECURITY_DANGEROUS_EXTENSIONS: exe,msi,dmg,app,deb,rpm,jsp,php,asp,aspx,sh,bat,cmd,vbs,ps1,js,html,htm,xml,xhtml,jar,war,class,java,dll,com,cgi,scr,pif,lnk,reg,hta
# BYTEDESK_UPLOAD_SECURITY_ALLOWED_MIME_TYPES: image/jpeg,image/png,image/gif,image/bmp,image/webp,image/svg+xml,application/pdf,application/msword,...
```

### 配置参数详解

- **max-file-size**: 限制单个上传文件的大小，超过此大小的文件将被拒绝。单位为字节。
- **enable-image-validation**: 启用后会验证上传的图片文件是否完整有效，防止上传破损或伪装的图片。
- **enable-file-name-filter**: 启用后会过滤文件名中的危险字符（如 `../`, `..\\` 等），防止目录遍历攻击。
- **force-rename**: 启用后上传的文件将被强制使用UUID重命名，防止通过文件名执行恶意操作。
- **max-file-name-length**: 限制文件名的最大长度，防止过长文件名导致的问题。
- **enable-upload-log**: 启用后所有上传操作都将被记录，方便进行审计和追踪。
- **enable-virus-scan**: 启用后可与第三方防病毒引擎集成，对上传的文件进行病毒扫描（需要自行实现具体集成逻辑）。
- **allowed-extensions**: 文件扩展名白名单，仅允许上传指定扩展名的文件（如果未配置则使用代码默认值）。
- **dangerous-extensions**: 危险文件扩展名黑名单，拒绝上传指定扩展名的文件（如如果未配置则使用代码默认值）。
- **allowed-mime-types**: 允许的MIME类型，仅允许上传指定MIME类型的文件（如果未配置则使用代码默认值）。

> **建议：** 为了安全起见，推荐在生产环境中启用所有安全配置，特别是 `enable-image-validation`、`enable-file-name-filter` 和 `force-rename`。
