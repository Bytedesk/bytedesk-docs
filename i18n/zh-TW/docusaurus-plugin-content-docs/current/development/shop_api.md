---
sidebar_label: 管理端店鋪資訊對接
sidebar_position: 55
---

# 管理端店鋪資訊對接

:::tip 提示
社群版不支援，請升級到企業版或平台版。請替換 [licenseKey](../development/license.md)
:::

## 概述

店鋪管理介面由 `ShopRestController` 提供，基礎路徑為：

- `/api/v1/shop`

目前支援：

- 依組織分頁查詢店鋪
- 依使用者分頁查詢店鋪
- 依 uid 查詢店鋪詳情
- 建立、更新、刪除店鋪
- 匯出店鋪 Excel
- 初始化示範店鋪資料

說明：

- 目前控制器沒有提供 Excel 匯入介面。

## 鑑權說明

`ShopRestController` 已顯式加入權限控制，呼叫方需要具備：

- `SHOP_READ`
- `SHOP_CREATE`
- `SHOP_UPDATE`
- `SHOP_DELETE`
- `SHOP_EXPORT`

## 請求模型

店鋪請求物件繼承 `BaseRequest`。常用欄位包括：

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
- `name`
- `shopUid`
- `description`
- `industry`
- `phone`
- `address`
- `logo`
- `businessHours`
- `businessStartTime`
- `businessEndTime`
- `status`
- `billingType`
- `expireAt`
- `renewalType`
- `renewalAt`
- `enabled`
- `detail`
- `maxAgents`
- `agentUids`
- `workgroupUids`

## 管理端介面

### 1. 依組織分頁查詢店鋪

- `GET /api/v1/shop/query/org`

### 2. 依目前使用者分頁查詢店鋪

- `GET /api/v1/shop/query`

### 3. 依 uid 查詢店鋪詳情

- `GET /api/v1/shop/query/uid`

### 4. 建立店鋪

- `POST /api/v1/shop/create`

### 5. 更新店鋪

- `POST /api/v1/shop/update`

### 6. 刪除店鋪

- `POST /api/v1/shop/delete`

### 7. 匯出店鋪 Excel

- `GET /api/v1/shop/export`

### 8. 初始化示範店鋪資料

- `POST /api/v1/shop/init/demo?orgUid={orgUid}`

## 對接建議

- 若外部系統已有店鋪主資料，建議將其業務主鍵映射到 `shopUid`。
- `expireAt` 與 `renewalAt` 建議使用 ISO-8601，例如 `2026-03-13T10:20:00+08:00`。
- 若後續需要批次匯入，建議先確認是否可由受控服務批次呼叫建立介面。
