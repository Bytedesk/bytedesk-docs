---
sidebar_label: Choose Order
sidebar_position: 36
---

# Choose Order

## Overview

Order data can be imported into Bytedesk through:

- Excel import (recommended for batch)
- API create (recommended for real-time sync)

After import, desktop `OrderInfo` loads orders by `orgUid + visitorUid` and supports one-click send to current thread.

## Visitor UID Notes

`VisitorEntity.uid` and `VisitorEntity.visitorUid` are different fields.

- Use `visitorUid` as the third-party business user ID.
- System will still keep internal `uid` for internal relations.

## Get Access Token

- URL: `POST /auth/v1/login`

```json
{
	"username": "admin@email.com",
	"password": "your_password",
	"channel": "FLUTTER",
	"platform": "BYTEDESK"
}
```

Use `data.accessToken` in header:

`Authorization: Bearer {accessToken}`

## Import via Excel

### 1) Export template

- `GET /api/v1/order/export?orgUid={orgUid}&accessToken={accessToken}`

### 2) Fill columns

- `订单标题(title)`
- `订单描述(description)`
- `下单时间(time)`
- `订单状态(status)`
- `状态文案(statusText)`
- `总金额(totalAmount)`
- `支付方式(paymentMethod)`
- `商品UID(orderUid)`
- `商品标题(orderTitle)`
- `商品价格(orderPrice)`
- `访客UID(visitorUid)`
- `会话UID(threadUid, optional)`

### 3) Upload

- `POST /api/v1/order/import?orgUid={orgUid}`
- FormData: `file=<xlsx>`

## Import via API

### Create order

- URL: `POST /api/v1/order/create`

```json
{
	"orgUid": "org_xxx",
	"title": "订单：iPhone 16 Pro",
	"description": "第三方系统同步",
	"time": "2026-02-05 10:20:00",
	"status": "paid",
	"statusText": "已支付",
	"totalAmount": 8999,
	"paymentMethod": "微信支付",
	"orderUid": "sku_001",
	"orderTitle": "iPhone 16 Pro",
	"orderPrice": 8999,
	"visitorUid": "external_user_1001",
	"threadUid": "thread_xxx"
}
```

## Query by Visitor

- `GET /api/v1/order/query/visitorUid?orgUid={orgUid}&visitorUid={visitorUid}&pageNumber=0&pageSize=20`

Desktop right panel uses this API to display latest order for the conversation visitor.
