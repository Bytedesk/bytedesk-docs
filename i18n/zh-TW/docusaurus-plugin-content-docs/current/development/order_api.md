---
sidebar_label: 管理端訂單資訊對接
sidebar_position: 36
---

# 管理端訂單資訊對接

:::tip 提示
社群版不支援，請升級到企業版或平台版。請替換 [licenseKey](../development/license.md)
:::

請同時參考 [訂單資訊](./order_info.md)。

## 概述

訂單管理介面由 `OrderRestController` 提供，基礎路徑為：

- `/api/v1/order`

目前支援：

- 管理端分頁查詢
- 管理端依 uid 查詢詳情
- 管理端建立、更新、刪除
- 依訪客查詢訂單
- Excel 匯出
- Excel 匯入
- 示範資料初始化

## 鑑權說明

先呼叫登入介面取得 accessToken：

- `POST /auth/v1/login`
- `Content-Type: application/json`

```json
{
 "username": "admin@email.com",
 "password": "your_password",
 "channel": "FLUTTER",
 "platform": "BYTEDESK"
}
```

## 請求模型

訂單請求物件繼承 `BaseRequest`。常用欄位包括：

- `uid`
- `orgUid`
- `userUid`
- `pageNumber`
- `pageSize`
- `sortBy`
- `sortDirection`
- `searchText`
- `startAt`
- `endAt`
- `title`
- `description`
- `time`
- `status`
- `statusText`
- `orderUid`
- `orderTitle`
- `orderImage`
- `orderDescription`
- `orderPrice`
- `orderUrl`
- `orderTagList`
- `orderQuantity`
- `totalAmount`
- `shippingName`
- `shippingPhone`
- `shippingAddress`
- `paymentMethod`
- `visitorUid`
- `shopUid`

## 管理端介面

### 1. 依組織分頁查詢訂單

- `GET /api/v1/order/query/org`

### 2. 依目前使用者分頁查詢訂單

- `GET /api/v1/order/query`

### 3. 依 uid 查詢訂單詳情

- `GET /api/v1/order/query/uid`

### 4. 建立訂單

- `POST /api/v1/order/create`

### 5. 更新訂單

- `POST /api/v1/order/update`

### 6. 刪除訂單

- `POST /api/v1/order/delete`

### 7. 依訪客查詢訂單

- `GET /api/v1/order/query/visitorUid`

### 8. 匯出訂單 Excel

- `GET /api/v1/order/export`

### 9. 匯入訂單 Excel

- `POST /api/v1/order/import?orgUid={orgUid}`

### 10. 初始化示範訂單資料

- `POST /api/v1/order/init/demo?orgUid={orgUid}`

## 對接建議

- `visitorUid` 應使用第三方業務系統中的使用者主鍵，不要誤傳系統內部 `uid`。
- `time` 目前為字串欄位，建議使用 `yyyy-MM-dd HH:mm:ss`。
- 若商品資訊完整，建議一併傳 `orderImage`、`orderDescription`、`orderUrl` 與 `orderTagList`。
