---
sidebar_label: Shop Info
sidebar_position: 55
---

# 电商店铺信息

本文說明 `ShopEntity`（`bytedesk_core_shop`）目前核心欄位定義、含義與建議值。

## 適用範圍

- 管理後台店鋪新增/編輯介面
- 店鋪詳情介面回傳結構
- 第三方電商系統店鋪資訊對接

## 欄位說明

| 欄位 | 類型 | 說明 | 範例 |
| --- | --- | --- | --- |
| `uid` | `string` | 店鋪唯一識別（系統生成） | `shop_xxx` |
| `shopUid` | `string` | 第三方業務店鋪ID | `mall_shop_1001` |
| `name` | `string` | 店鋪名稱 | `仰望汽車官方旗艦店` |
| `description` | `string` | 店鋪介紹（簡述） | `主營新能源車型諮詢` |
| `industry` | `string` | 行業 | `汽車` |
| `phone` | `string` | 聯絡電話 | `400-800-0000` |
| `address` | `string` | 聯絡地址 | `深圳市南山區...` |
| `logo` | `string` | 店鋪頭像URL | `https://.../logo.png` |
| `businessHours` | `string` | 營業時間描述 | `週一至週日 09:00-18:00` |
| `businessStartTime` | `string` | 營業開始時間 | `09:00` |
| `businessEndTime` | `string` | 營業結束時間 | `18:00` |
| `type` | `string` | 店鋪類型 | `CUSTOMER` |
| `status` | `string` | 店鋪狀態 | `ACTIVE` |
| `billingType` | `string` | 付費類型 | `FREE` |
| `expireAt` | `datetime` | 到期時間 | `2026-12-31T23:59:59Z` |
| `renewalType` | `string` | 續費類型 | `MANUAL` |
| `renewalAt` | `datetime` | 續費時間 | `2026-12-25T00:00:00Z` |
| `enabled` | `boolean` | 是否啟用 | `true` |
| `detail` | `string(text/json)` | 店鋪詳情（可存富文本或JSON） | `{}` |
| `maxAgents` | `number` | 店鋪可綁定最大客服數 | `20` |

## 關聯欄位

| 欄位 | 類型 | 說明 |
| --- | --- | --- |
| `agentUids` | `string[]` | 綁定的客服UID列表 |
| `workgroupUids` | `string[]` | 綁定的工作組UID列表 |
| `agents` | `object[]` | 店鋪詳情回傳的客服摘要列表 |
| `workgroups` | `object[]` | 店鋪詳情回傳的工作組摘要列表 |
| `agentCount` | `number` | 目前已綁定客服數 |
| `workgroupCount` | `number` | 目前已綁定工作組數 |

## 枚舉建議值

- `status`: `ACTIVE`、`INACTIVE`、`SUSPENDED`
- `billingType`: `FREE`、`TRIAL`、`SUBSCRIPTION`
- `renewalType`: `AUTO`、`MANUAL`

## 時間欄位格式建議

- `expireAt`、`renewalAt` 建議使用 ISO-8601：`2026-03-10T08:00:00Z`
- 管理後台表單建議使用日期時間選擇器，避免手動輸入格式錯誤
