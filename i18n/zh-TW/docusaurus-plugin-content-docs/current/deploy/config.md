---
sidebar_label: 伺服器配置參數說明
sidebar_position: 7
---

# 微語伺服器配置參數說明

本文檔詳細說明微語伺服器（基於Spring Boot 3.x開發）的配置參數及其用法。

## 基礎配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `server.port` | 伺服器埠 | `9003` | `SERVER_PORT: 9003` |
| `bytedesk.debug` | 是否開啟除錯模式 | `true` | `BYTEDESK_DEBUG: true` |
| `bytedesk.version` | 產品版本號 | `0.7.8` | `BYTEDESK_VERSION: 0.7.8` |
| `bytedesk.appkey` | 授權金鑰 | `ZjoyMDI...` | `BYTEDESK_APPKEY: ZjoyMDI...` |

## 自訂配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.custom.enabled` | 是否啟用自訂配置（名稱、logo、說明等） | `true` | `BYTEDESK_CUSTOM_ENABLED: false` |
| `bytedesk.custom.name` | 自訂產品名稱，預設為空則使用預設名稱 | - | `BYTEDESK_CUSTOM_NAME:` |
| `bytedesk.custom.logo` | 自訂產品logo，預設為空則使用預設logo | - | `BYTEDESK_CUSTOM_LOGO:` |
| `bytedesk.custom.description` | 自訂產品描述，預設為空則使用"Chat As A Service" | - | `BYTEDESK_CUSTOM_DESCRIPTION:` |
| `bytedesk.custom.show-right-corner-chat` | 是否顯示右下角對話視窗 | `false` | `BYTEDESK_CUSTOM_SHOW_RIGHT_CORNER_CHAT: true` |
| `bytedesk.custom.show-demo` | 是否顯示預設演示 | `true` | `BYTEDESK_CUSTOM_SHOW_DEMO: true` |
| `bytedesk.custom.privacy-policy-url` | 隱私政策URL地址 | - | `BYTEDESK_CUSTOM_PRIVACY_POLICY_URL:` |
| `bytedesk.custom.terms-of-service-url` | 服務條款URL地址 | - | `BYTEDESK_CUSTOM_TERMS_OF_SERVICE_URL:` |
| `bytedesk.custom.login-username-enable` | 是否啟用使用者名稱登入 | `true` | `BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE: true` |
| `bytedesk.custom.login-mobile-enable` | 是否啟用手機號登入 | `true` | `BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE: true` |
| `bytedesk.custom.login-scan-enable` | 是否啟用掃碼登入 | `true` | `BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE: true` |
| `bytedesk.custom.doc-url-show` | 是否顯示文檔連結 | `true` | `BYTEDESK_CUSTOM_DOC_URL_SHOW: true` |
| `bytedesk.custom.doc-url` | 文檔URL地址 | `https://...` | `BYTEDESK_CUSTOM_DOC_URL: https://www.....` |

## 管理員配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.admin.email` | 管理員郵箱 | `admin@email.com` | `BYTEDESK_ADMIN_EMAIL: admin@email.com` |
| `bytedesk.admin.password` | 管理員預設密碼 | `admin` | `BYTEDESK_ADMIN_PASSWORD: admin` |
| `bytedesk.admin.password-default` | 建立/匯入成員的預設密碼 | `123456` | `BYTEDESK_ADMIN_PASSWORD_DEFAULT: 123456` |
| `bytedesk.admin.nickname` | 管理員暱稱 | `SuperAdmin` | `BYTEDESK_ADMIN_NICKNAME: SuperAdmin` |
| `bytedesk.admin.mobile` | 管理員手機號 | `13345678000` | `BYTEDESK_ADMIN_MOBILE: 13345678000` |
| `bytedesk.admin.mobile-whitelist` | 手機號白名單，使用逗號分隔 | `18888888000,18888888001,...` | `BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001...` |
| `bytedesk.admin.email-whitelist` | 郵箱白名單，使用逗號分隔 | `100@email.com,101@email.com,...` | `BYTEDESK_ADMIN_EMAIL_WHITELIST: 100@email.com,101@email.com...` |
| `bytedesk.admin.validate-code` | 白名單手機號和郵箱的驗證碼，否則產生隨機6位數字 | `123456` | `BYTEDESK_ADMIN_VALIDATE_CODE: 123456` |
| `bytedesk.admin.allow-register` | 是否允許註冊新帳戶 | `true` | `BYTEDESK_FEATURES_ENABLE_REGISTRATION: false` |
| `bytedesk.admin.force-validate-mobile` | 是否強制驗證手機號 | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE: true` |
| `bytedesk.admin.force-validate-email` | 是否強制驗證郵箱 | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL: true` |

## 成員配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.member.password` | 建立/匯入成員的預設密碼 | `123456` | `BYTEDESK_MEMBER_PASSWORD: 123456` |

## 效能測試配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.testing.enabled` | 是否啟用效能測試模式 | `false` | `BYTEDESK_TESTING_ENABLED: false` |
| `bytedesk.testing.account-count` | 測試帳號數量 | `300` | `BYTEDESK_TESTING_ACCOUNT_COUNT: 300` |
| `bytedesk.testing.account-username` | 測試帳號使用者名稱前綴 | `test` | `BYTEDESK_TESTING_ACCOUNT_USERNAME: test` |
| `bytedesk.testing.account-password` | 測試帳號密碼 | `password` | `BYTEDESK_TESTING_ACCOUNT_PASSWORD: password` |
| `bytedesk.testing.disable-captcha` | 是否禁用驗證碼 | `true` | `BYTEDESK_TESTING_DISABLE_CAPTCHA: true` |
| `bytedesk.testing.disable-ip-filter` | 是否禁用IP過濾 | `true` | `BYTEDESK_TESTING_DISABLE_IP_FILTER: true` |

## 組織配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.organization.name` | 組織名稱 | `MyCompany` | `BYTEDESK_ORGANIZATION_NAME: MyCompany` |
| `bytedesk.organization.code` | 組織程式碼 | `bytedesk` | `BYTEDESK_ORGANIZATION_CODE: bytedesk` |

## 功能特性配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.features.java-ai` | 是否啟用Java AI功能 | `true` | `BYTEDESK_FEATURES_JAVA_AI: false` |
| `bytedesk.features.python-ai` | 是否啟用Python AI功能 | `false` | `BYTEDESK_FEATURES_PYTHON_AI: true` |
| `bytedesk.features.email-type` | 郵件發送方式，可選：`javamail`/`aliyun` | `javamail` | `BYTEDESK_FEATURES_EMAIL_TYPE: javamail` |
| `bytedesk.features.avatar-base-url` | 頭像基礎URL | - | `BYTEDESK_FEATURES_AVATAR_BASE_URL:` |

## 跨域配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.cors.allowed-origins` | 允許的跨域來源 | `*` | `BYTEDESK_CORS_ALLOWED_ORIGINS: *` |

## JWT配置

| 參數名 | 說明 | 範例值 | Docker環境變數 |
| :------- | :---------------------- | :------- | :------- |
| `bytedesk.jwt.secret-key` | JWT金鑰 | `1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` | `BYTEDESK_JWT_SECRET_KEY: 1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` |
| `bytedesk.jwt.expiration` | JWT過期時間（毫秒），預設30天 | `2592000000` | `BYTEDESK_JWT_EXPIRATION: 2592000000` |
| `bytedesk.jwt.refresh-token-expiration` | 重新整理令牌過期時間（毫秒），預設60天 | `5184000000` | `BYTEDESK_JWT_REFRESH_TOKEN_EXPIRATION: 5184000000` |

## 快取配置
