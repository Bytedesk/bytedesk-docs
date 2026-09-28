---
sidebar_label: Admin Order API
sidebar_position: 36
---

# Admin Order API

:::tip Note
This feature is not available in the community edition. Please upgrade to Enterprise or Platform edition and replace the [licenseKey](../development/license.md).
:::

Please also refer to [Order Info](../integration/order_info.md).

## Overview

Order management APIs are provided by `OrderRestController`. The base path is:

- `/api/v1/order`

Currently supported capabilities:

- Admin paginated query
- Admin detail query by uid
- Admin create, update, delete
- Query orders by visitor
- Excel export
- Excel import
- Demo data reinitialization

## Authentication

First call the login API to get an accessToken:

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

Use `data.accessToken` from the response and send it in the request header:

```http
Authorization: Bearer {accessToken}
```

Notes:

- `OrderRestController` does not currently declare `@PreAuthorize` explicitly.
- Actual access control still depends on the overall security configuration.

## Request Model

The order request object extends `BaseRequest`. Common fields include:

- `uid`: system record uid
- `orgUid`: organization uid
- `userUid`: user uid
- `pageNumber`: page index, starts from `0`
- `pageSize`: page size, default `10`
- `sortBy`: sort field
- `sortDirection`: `asc` or `desc`
- `searchText`: search keyword
- `startAt`: start time in ISO-8601
- `endAt`: end time in ISO-8601

Order-specific fields include:

- `title`: order title
- `description`: order description
- `price`: price field
- `state`: internal state field
- `time`: order time in string format
- `status`: order status
- `statusText`: status label
- `orderUid`: goods uid
- `orderTitle`: goods title
- `orderImage`: goods image
- `orderDescription`: goods description
- `orderPrice`: goods price
- `orderUrl`: goods URL
- `orderTagList`: goods tag list
- `orderExtra`: goods extension info
- `orderQuantity`: goods quantity
- `totalAmount`: total amount
- `shippingName`: receiver name
- `shippingPhone`: receiver phone
- `shippingAddress`: receiver address
- `paymentMethod`: payment method
- `extra`: extra order data
- `visitorUid`: external visitor uid
- `visitorDbUid`: visitor database uid
- `shopUid`: shop uid
- `shopDbUid`: shop database uid

## Response Format

All APIs return `JsonResult`:

```json
{
 "message": "success",
 "code": 200,
 "data": {}
}
```

Typical error format:

```json
{
 "message": "specific error message",
 "code": 500,
 "data": false
}
```

For paginated queries, `data` is a Spring Data `Page` object.

## visitorUid vs uid

- `VisitorEntity.uid`: internally generated system uid
- `VisitorEntity.visitorUid`: external business user uid

When integrating with a third-party order system, always pass the external business user id into `visitorUid`.

## Admin APIs

### 1. Query Orders By Organization

- `GET /api/v1/order/query/org`

Common query parameters:

- `orgUid`: required
- `pageNumber`: optional, default `0`
- `pageSize`: optional, default `10`
- `searchText`: optional
- `visitorUid`: optional
- `shopUid`: optional
- `status`: optional

### 2. Query Orders By Current User

- `GET /api/v1/order/query`

### 3. Query Order Detail By Uid

- `GET /api/v1/order/query/uid`

Query parameters:

- `uid`: required
- `orgUid`: recommended

### 4. Create Order

- `POST /api/v1/order/create`
- `Content-Type: application/json`

```json
{
 "orgUid": "org_xxx",
 "shopUid": "shop_xxx",
 "title": "Order: iPhone 16 Pro",
 "description": "Synced from third-party system",
 "time": "2026-02-05 10:20:00",
 "status": "paid",
 "statusText": "Paid",
 "totalAmount": 8999,
 "paymentMethod": "WeChat Pay",
 "orderUid": "sku_001",
 "orderTitle": "iPhone 16 Pro",
 "orderImage": "https://example.com/iphone.png",
 "orderDescription": "512G Black",
 "orderPrice": 8999,
 "orderUrl": "https://example.com/p/sku_001",
 "orderTagList": ["phone", "apple"],
 "orderQuantity": 1,
 "visitorUid": "external_user_1001",
 "shippingName": "John Doe",
 "shippingPhone": "13800000000",
 "shippingAddress": "88 Example Road, Pudong, Shanghai"
}
```

### 5. Update Order

- `POST /api/v1/order/update`
- `Content-Type: application/json`

### 6. Delete Order

- `POST /api/v1/order/delete`
- `Content-Type: application/json`

### 7. Query Orders By Visitor

- `GET /api/v1/order/query/visitorUid`

Query parameters:

- `orgUid`: required
- `visitorUid`: required
- `shopUid`: optional
- `pageNumber`: optional, default `0`
- `pageSize`: optional, default `20`

### 8. Export Order Excel

- `GET /api/v1/order/export`

Current Excel columns include:

- Order title
- Order description
- Order time
- Order status
- Status label
- Total amount
- Payment method
- Goods UID
- Goods title
- Goods price
- Visitor UID
- Created time

### 9. Import Order Excel

- `POST /api/v1/order/import?orgUid={orgUid}`
- `Content-Type: multipart/form-data`

### 10. Reinitialize Demo Order Data

- `POST /api/v1/order/init/demo?orgUid={orgUid}`

## Integration Notes

- The `time` field is currently a string in the request object. Prefer `yyyy-MM-dd HH:mm:ss`.
- If your business system has complete goods metadata, also pass `orderImage`, `orderDescription`, `orderUrl`, and `orderTagList` to improve agent-side display.
- `visitorUid` should always be the third-party business user id, not the internal system `uid`.
