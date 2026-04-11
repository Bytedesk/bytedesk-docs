---
sidebar_label: Shop Simple
sidebar_position: 1
---

# 电商系统对接指南-简版

## 目標

提供一組最小接口，支援透過手機號+店鋪資訊快速完成以下能力：

- 自動建立使用者（可配置關閉登入自動註冊）
- 自動建立組織
- 建立並維護店鋪清單
- 透過店鋪業務 uid 查詢組織/工作組/客服綁定資訊
- 透過店鋪業務 uid 更新店鋪名稱、店鋪 logo

## 配置項

在配置檔中新增開關：

```properties
bytedesk.custom.auto-register-on-login=true
```

- 預設值：true（開啟）
- 說明：手機號/郵箱驗證碼登入時，若使用者不存在，是否允許自動註冊
- 關閉後：未註冊使用者登入會被拒絕，只能先呼叫對接接口建立使用者

## 接口列表

### 1) 手機號+店鋪資訊對接

- Method: POST
- Path: /api/v1/shop/open/onboard

### 2) 透過店鋪 uid 查詢綁定資訊

- Method: GET
- Path: /api/v1/shop/open/binding

### 3) 透過店鋪 uid 更新店鋪名稱/logo

- Method: POST
- Path: /api/v1/shop/open/update

### 4) Token 增刪改查與刷新

#### 4.1 建立令牌

- Method: POST
- Path: /api/v1/shop/open/token/create
請求示例：

```json
{
 "name": "shop-open-token",
 "description": "for shop open integration",
 "userUid": "user_xxx",
 "orgUid": "org_xxx",
 "channel": "WEB",
 "device": "shop-system"
}
```

說明：若未傳 `refreshToken`，服務端會自動產生。

#### 4.2 分頁查詢組織令牌

- Method: POST
- Path: /api/v1/shop/open/token/query/org

#### 4.3 分頁查詢使用者令牌

- Method: POST
- Path: /api/v1/shop/open/token/query/user

#### 4.4 依 uid 查詢令牌

- Method: GET
- Path: /api/v1/shop/open/token/detail
- Query: `uid=token_uid_xxx`

#### 4.5 更新令牌

- Method: POST
- Path: /api/v1/shop/open/token/update

#### 4.6 刪除令牌

- Method: POST
- Path: /api/v1/shop/open/token/delete
- Query: `uid=token_uid_xxx`

#### 4.7 刷新 AccessToken

- Method: POST
- Path: /api/v1/shop/open/token/refresh

請求示例：

```json
{
 "refreshToken": "refresh_token_xxx",
 "channel": "WEB"
}
```

#### 4.8 撤銷令牌

- Method: POST
- Path: /api/v1/shop/open/token/revoke

支援透過 `uid` 或 `accessToken` 進行撤銷。
