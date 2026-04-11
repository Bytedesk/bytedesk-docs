---
sidebar_label: Admin Goods API
sidebar_position: 8
---

# Admin Goods API

:::tip Note
This feature is not available in the community edition. Please upgrade to Enterprise or Platform edition and replace the [licenseKey](../development/license.md).
:::

## Overview

Goods management APIs are provided by `GoodsRestController`. The admin base path is:

- `/api/v1/goods`

Currently supported capabilities:

- Admin paginated query
- Admin detail query by uid
- Admin create, update, delete
- Excel export
- Excel import
- Demo data reinitialization
- Visitor-side anonymous query by organization

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

Use `data.accessToken` from the response and send it in the request header for admin APIs:

```http
Authorization: Bearer {accessToken}
```

Notes:

- `GoodsRestController` does not currently declare `@PreAuthorize` explicitly.
- Actual accessibility still depends on the global security configuration and gateway policy.
- The visitor-side anonymous query endpoint is under `/visitor/api/v1/goods` and normally does not use the admin Bearer token.

## Request Model

The goods request object extends `BaseRequest`. Common fields include:

- `uid`: system record uid
- `orgUid`: organization uid
- `userUid`: user uid
- `type`: business type
- `pageNumber`: page index, starts from `0`
- `pageSize`: page size, default `10`
- `sortBy`: sort field
- `sortDirection`: `asc` or `desc`
- `searchText`: search keyword
- `startAt`: start time in ISO-8601
- `endAt`: end time in ISO-8601

Goods-specific fields include:

- `goodsUid`: business goods uid
- `shopUid`: shop uid
- `shopDbUid`: shop database uid
- `title`: goods title
- `image`: goods image URL
- `description`: goods description
- `price`: price
- `url`: product detail URL
- `tagList`: tag array
- `extra`: extension JSON or plain text
- `quantity`: quantity

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

For paginated queries, `data` is a Spring Data `Page` object and usually contains:

- `content`
- `totalElements`
- `totalPages`
- `size`
- `number`

## Admin APIs

### 1. Query Goods By Organization

- `GET /api/v1/goods/query/org`

Common query parameters:

- `orgUid`: required
- `pageNumber`: optional, default `0`
- `pageSize`: optional, default `10`
- `searchText`: optional
- `sortBy`: optional
- `sortDirection`: optional
- `shopUid`: optional

Example:

```http
GET /api/v1/goods/query/org?orgUid=org_xxx&pageNumber=0&pageSize=20&shopUid=shop_xxx
Authorization: Bearer {accessToken}
```

### 2. Query Goods By Current User

- `GET /api/v1/goods/query`

Common query parameters:

- `orgUid`: recommended
- `userUid`: optional as needed
- `pageNumber`
- `pageSize`
- `searchText`

### 3. Query Goods Detail By Uid

- `GET /api/v1/goods/query/uid`

Query parameters:

- `uid`: recommended system record uid
- `orgUid`: recommended for organization isolation

### 4. Create Goods

- `POST /api/v1/goods/create`
- `Content-Type: application/json`

Request example:

```json
{
 "orgUid": "org_xxx",
 "shopUid": "shop_xxx",
 "goodsUid": "sku_001",
 "title": "iPhone 16 Pro",
 "image": "https://example.com/iphone.png",
 "description": "512G Black",
 "price": 8999,
 "url": "https://example.com/p/sku_001",
 "tagList": ["phone", "apple"],
 "extra": "{\"source\":\"erp\"}",
 "quantity": 1
}
```

Notes:

- The controller accepts `GoodsRequest`.
- The current admin create API does not include `visitorUid` in its request model.

### 5. Update Goods

- `POST /api/v1/goods/update`
- `Content-Type: application/json`

```json
{
 "uid": "good_xxx",
 "orgUid": "org_xxx",
 "title": "iPhone 16 Pro 1TB",
 "price": 9999,
 "quantity": 2,
 "tagList": ["phone", "apple", "flagship"]
}
```

### 6. Delete Goods

- `POST /api/v1/goods/delete`
- `Content-Type: application/json`

```json
{
 "uid": "good_xxx",
 "orgUid": "org_xxx"
}
```

### 7. Export Goods Excel

- `GET /api/v1/goods/export`

Common query parameters:

- `orgUid`: required
- `exportAll`: optional
- Other filters are aligned with the query API

Returns:

- Excel file stream on success
- File name similar to `goods-20260313123000.xlsx`

Current Excel columns include:

- Goods title
- Goods image
- Goods description
- Goods price
- Goods URL
- Goods tags (comma-separated)
- Extra info
- Quantity
- Created time

### 8. Import Goods Excel

- `POST /api/v1/goods/import?orgUid={orgUid}`
- `Content-Type: multipart/form-data`

Form fields:

- `file`: Excel file, required
- `orgUid`: organization uid passed as query parameter

Example:

```bash
curl -X POST "{host}/api/v1/goods/import?orgUid=org_xxx" \
 -H "Authorization: Bearer {accessToken}" \
 -F "file=@goods.xlsx"
```

### 9. Reinitialize Demo Goods Data

- `POST /api/v1/goods/init/demo?orgUid={orgUid}`

## Visitor API

### Anonymous Query By Organization

- `GET /visitor/api/v1/goods/query/org`

Query parameters:

- `orgUid`: required
- `pageNumber`: optional
- `pageSize`: optional

Notes:

- This endpoint is provided by `GoodsVisitorRestController`.
- It validates `orgUid`; if missing, it returns `orgUid required`.

## Integration Notes

- The old admin path `GET /api/v1/goods/query/visitorUid` is not exposed by the current controller implementation.
- If you need visitor-dimension goods display, verify whether the frontend uses the visitor endpoint or another aggregation service.
- `tagList` is an array in JSON requests, but a comma-separated string in Excel import/export.
- For common time fields, prefer ISO-8601 such as `2026-03-13T10:20:00Z`.
