---
sidebar_label: SaaS
sidebar_position: 8
---

# SaaS多租戶模式

:::tip 前置條件

- 僅平台版支援此功能，如需要，請[掃碼聯絡微信](/img/wechat.png)
- 需要試用版License？請參考：[問題13：如何申請licenseKey](/docs/faq#問題13如何申請licensekey)
:::

微語系統支援SaaS多租戶模式，允許多個組織在同一系統內獨立營運。本文件介紹如何配置和使用SaaS模式。

## 什麼是SaaS多租戶？

SaaS（Software as a Service，軟體即服務）多租戶模式允許單一應用實例服務多個客戶（租戶），每個租戶擁有自己獨立的資料和配置，而共享底層基礎設施。微語系統的SaaS功能實現了：

- **多組織管理**：支援建立和管理多個獨立組織
- **獨立資料隔離**：確保各租戶資料安全隔離
- **靈活的登入註冊**：支援多種登入方式和註冊流程

## 本地開發環境配置

在開發環境中，您可以使用以下配置來模擬和測試SaaS功能，無需配置真實簡訊介面：

### 配置參數說明

```bash
# 測試手機號白名單（逗號分隔）
bytedesk.admin.mobile-whitelist=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# 測試郵箱白名單（逗號分隔）
bytedesk.admin.email-whitelist=100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com,106@email.com

# 白名單手機號和郵箱的預設驗證碼
bytedesk.admin.validate-code=123456

# 是否允許註冊新帳戶
bytedesk.admin.allow-register=true

# 是否強制驗證手機號
bytedesk.admin.force-validate-mobile=true

# 是否強制驗證郵箱
bytedesk.admin.force-validate-email=true
```

### Docker環境變數配置

如果您使用Docker部署，可使用以下環境變數：

```bash
# 測試手機號白名單
BYTEDESK_ADMIN_MOBILE_WHITELIST=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# 測試郵箱白名單
BYTEDESK_ADMIN_EMAIL_WHITELIST=100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com

# 預設測試驗證碼
BYTEDESK_ADMIN_VALIDATE_CODE=123456

# 是否允許註冊
BYTEDESK_ADMIN_ALLOW_REGISTER=true

# 是否強制驗證手機號
BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE=true

# 是否強制驗證郵箱
BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL=true
```

![登入介面](/img/develop/saas/saas_login.png)

## 線上生產環境配置

在生產環境中，建議使用真實簡訊和郵件服務，確保使用者能收到驗證碼：

### 簡訊和郵件服務配置

1. **簡訊服務配置**：微語系統支援阿里雲簡訊服務，用於發送手機驗證碼
   - 配置參考：[阿里雲簡訊服務配置](../deploy/config#阿里雲簡訊服務配置---手機登入驗證碼)

2. **郵件服務配置**：支援透過SMTP或阿里雲郵件服務發送郵箱驗證碼
   - 可配置為Java Mail或阿里雲郵件方式：`bytedesk.features.email-type=javamail` 或 `bytedesk.features.email-type=aliyun`

### 多租戶管理功能

微語SaaS模式提供以下管理功能：

- **租戶管理**：建立、編輯、刪除租戶組織
- **成員管理**：為每個租戶分配獨立的成員和角色
- **資料隔離**：確保租戶之間的資料安全隔離
- **自訂配置**：每個租戶可自訂功能配置

### 登入註冊流程

微語SaaS模式支援多種登入方式：

1. **手機號登入**：透過手機號+驗證碼登入
2. **郵箱登入**：透過郵箱+驗證碼登入
3. **使用者名稱登入**：透過使用者名稱+密碼登入
4. **掃碼登入**：透過掃描二維碼快速登入

每種登入方式可以在配置中啟用或停用：

```bash
# 是否啟用使用者名稱登入
bytedesk.custom.login-username-enable=true
# 是否啟用手機號登入
bytedesk.custom.login-mobile-enable=true
# 是否啟用掃碼登入
bytedesk.custom.login-scan-enable=true
```

對應的Docker環境變數：

```bash
BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE=true
BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE=true
BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE=true
```

## 最佳實踐

1. **開發階段**：使用測試白名單和固定驗證碼簡化開發流程
2. **測試階段**：配置真實簡訊/郵件服務，但限制發送範圍
3. **生產階段**：啟用完整的簡訊/郵件服務，確保安全和效能
4. **多租戶資料備份**：定期為每個租戶資料進行獨立備份

更多詳細配置請參考[微語伺服器配置參數說明](../deploy/config)。
