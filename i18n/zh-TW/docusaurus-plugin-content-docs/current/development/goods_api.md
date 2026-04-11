---
sidebar_label: 管理端商品資訊對接
sidebar_position: 8
---

# 管理端商品資訊對接

:::tip 提示
社群版不支援，請升級到企業版或平台版。請替換 [licenseKey](../development/license.md)
:::

## 概述

商品管理介面由 `GoodsRestController` 提供，管理端基礎路徑為：

- `/api/v1/goods`

目前支援的能力：

- 管理端分頁查詢
- 管理端依 uid 查詢詳情
- 管理端建立、更新、刪除
- Excel 匯出
- Excel 匯入
- 示範資料初始化
- 訪客端匿名依組織查詢

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

成功後從回應中的 `data.accessToken` 取得 token，後續管理端介面在請求頭帶上：

```http
Authorization: Bearer {accessToken}
```

說明：

- 目前 `GoodsRestController` 沒有顯式宣告 `@PreAuthorize`。
- 實際可否存取仍取決於全域安全設定與閘道策略。
- 訪客端匿名查詢介面位於 `/visitor/api/v1/goods`，通常不使用管理端 Bearer Token。

## 請求模型

商品請求物件繼承 `BaseRequest`，常用共用欄位如下：

- `uid`：系統記錄 uid
- `orgUid`：組織 uid
- `userUid`：使用者 uid
- `type`：業務型別
- `pageNumber`：頁碼，從 `0` 開始
- `pageSize`：每頁筆數，預設 `10`
- `sortBy`：排序欄位
- `sortDirection`：`asc` 或 `desc`
- `searchText`：搜尋關鍵字
- `startAt`：起始時間，ISO-8601
- `endAt`：結束時間，ISO-8601

商品特有欄位如下：

- `goodsUid`：業務商品 uid
- `shopUid`：店鋪 uid
- `shopDbUid`：店鋪資料庫 uid
- `title`：商品標題
- `image`：商品圖片 URL
- `description`：商品描述
- `price`：商品價格
- `url`：商品詳情連結
- `tagList`：標籤陣列
- `extra`：擴充 JSON 或文字
- `quantity`：數量

## 回傳結構

所有介面統一回傳 `JsonResult`：

```json
{
 "message": "success",
 "code": 200,
 "data": {}
}
```

## 管理端介面

### 1. 依組織分頁查詢商品

- `GET /api/v1/goods/query/org`

### 2. 依目前使用者分頁查詢商品

- `GET /api/v1/goods/query`

### 3. 依 uid 查詢商品詳情

- `GET /api/v1/goods/query/uid`

### 4. 建立商品

- `POST /api/v1/goods/create`
- `Content-Type: application/json`

```json
{
 "orgUid": "org_xxx",
 "shopUid": "shop_xxx",
 "goodsUid": "sku_001",
 "title": "iPhone 16 Pro",
 "image": "https://example.com/iphone.png",
 "description": "512G 黑色",
 "price": 8999,
 "url": "https://example.com/p/sku_001",
 "tagList": ["手機", "蘋果"],
 "extra": "{\"source\":\"erp\"}",
 "quantity": 1
}
```

### 5. 更新商品

- `POST /api/v1/goods/update`

### 6. 刪除商品

- `POST /api/v1/goods/delete`

### 7. 匯出商品 Excel

- `GET /api/v1/goods/export`

### 8. 匯入商品 Excel

- `POST /api/v1/goods/import?orgUid={orgUid}`
- `Content-Type: multipart/form-data`

### 9. 初始化示範商品資料

- `POST /api/v1/goods/init/demo?orgUid={orgUid}`

## 訪客端介面

### 依組織匿名查詢商品

- `GET /visitor/api/v1/goods/query/org`

## 對接建議

- 舊版文件中的 `GET /api/v1/goods/query/visitorUid` 並不是目前控制器已開放的路徑。
- `tagList` 在 JSON 請求中是陣列，在 Excel 匯入匯出中則是逗號分隔字串。
- 共用時間欄位建議統一使用 ISO-8601，例如 `2026-03-13T10:20:00Z`。
