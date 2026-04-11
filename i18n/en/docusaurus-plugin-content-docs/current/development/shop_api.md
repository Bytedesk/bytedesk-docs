---
sidebar_label: Admin Shop API
sidebar_position: 55
---

# Admin Shop API

:::tip Note
This feature is not available in the community edition. Please upgrade to Enterprise or Platform edition and replace the [licenseKey](../development/license.md).
:::

## Overview

Shop management APIs are provided by `ShopRestController`. The base path is:

- `/api/v1/shop`

Currently supported capabilities:

- Query shops by organization
- Query shops by current user
- Query shop detail by uid
- Create, update, delete shop
- Export shop Excel
- Reinitialize demo shop data

Notes:

- The current controller does not provide an Excel import API.
- If external systems need batch shop creation, use the create API from a controlled business-side process or extend the backend with a dedicated import endpoint.

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

`ShopRestController` explicitly applies permission control. Required permissions are:

- Query: `SHOP_READ`
- Create: `SHOP_CREATE`
- Update: `SHOP_UPDATE`
- Delete: `SHOP_DELETE`
- Export: `SHOP_EXPORT`
- Demo data reinitialization: `SHOP_UPDATE`

## Request Model

The shop request object extends `BaseRequest`. Common fields include:

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

Shop-specific fields include:

- `name`: shop name
- `shopUid`: business shop uid
- `description`: description
- `industry`: industry
- `phone`: phone
- `address`: address
- `logo`: logo URL
- `businessHours`: business hours text
- `businessStartTime`: business opening time
- `businessEndTime`: business closing time
- `status`: status
- `billingType`: billing type
- `expireAt`: expiration time as `ZonedDateTime`
- `renewalType`: renewal type
- `renewalAt`: renewal time as `ZonedDateTime`
- `enabled`: enabled flag
- `detail`: detail content
- `maxAgents`: max agent count
- `agentUids`: bound agent uid list
- `workgroupUids`: bound workgroup uid list

## Response Format

All APIs return `JsonResult`:

```json
{
	"message": "success",
	"code": 200,
	"data": {}
}
```

## Admin APIs

### 1. Query Shops By Organization

- `GET /api/v1/shop/query/org`
- Permission: `SHOP_READ`

### 2. Query Shops By Current User

- `GET /api/v1/shop/query`
- Permission: `SHOP_READ`

### 3. Query Shop Detail By Uid

- `GET /api/v1/shop/query/uid`
- Permission: `SHOP_READ`

### 4. Create Shop

- `POST /api/v1/shop/create`
- Permission: `SHOP_CREATE`
- `Content-Type: application/json`

```json
{
	"orgUid": "org_xxx",
	"name": "East China Flagship Store",
	"shopUid": "shop_huadong_001",
	"description": "East China regional flagship store",
	"industry": "retail",
	"phone": "021-12345678",
	"address": "100 Century Avenue, Pudong, Shanghai",
	"logo": "https://example.com/logo.png",
	"businessHours": "Mon-Sun 09:00-21:00",
	"businessStartTime": "09:00",
	"businessEndTime": "21:00",
	"status": "ACTIVE",
	"billingType": "STANDARD",
	"enabled": true,
	"detail": "Supports online service and ticketing",
	"maxAgents": 50,
	"agentUids": ["agent_001", "agent_002"],
	"workgroupUids": ["wg_001"]
}
```

### 5. Update Shop

- `POST /api/v1/shop/update`
- Permission: `SHOP_UPDATE`

### 6. Delete Shop

- `POST /api/v1/shop/delete`
- Permission: `SHOP_DELETE`

### 7. Export Shop Excel

- `GET /api/v1/shop/export`
- Permission: `SHOP_EXPORT`

Current export columns include:

- Shop name
- Shop UID
- Shop type
- Description
- Industry
- Phone
- Address
- Logo
- Business hours
- Business start
- Business end
- Status
- Billing type
- Expire time
- Renewal type
- Renewal time
- Enabled
- Detail
- Max agent count
- Created time
- Updated time

### 8. Reinitialize Demo Shop Data

- `POST /api/v1/shop/init/demo?orgUid={orgUid}`
- Permission: `SHOP_UPDATE`

## Integration Notes

- If the external system already has a shop master record, map its business primary key to `shopUid`.
- `expireAt` and `renewalAt` should use ISO-8601, for example `2026-03-13T10:20:00+08:00`.
- If batch import is needed later, first confirm whether bulk calls to the create API are sufficient before adding a dedicated import controller.
