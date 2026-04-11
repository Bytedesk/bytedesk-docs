---
sidebar_label: GoodsSelect
sidebar_position: 8
---

# GoodsSelect

## Overview

Goods data can be imported into the customer service system in two ways:

- Excel import (admin UI or API)
- Direct API create/update

After import, desktop `GoodsInfo` loads goods by `orgUid + visitorUid` and supports one-click send to current thread.

## Visitor UID Notes

`VisitorEntity` has two identifiers:

- `uid`: internal system-generated uid
- `visitorUid`: external business uid

When integrating third-party business systems, pass **external** user ID as `visitorUid`.

## Get Access Token

### Login API

- URL: `/auth/v1/login`
- Method: `POST`
- Content-Type: `application/json`

```json
{
	"username": "admin@email.com",
	"password": "your_password",
	"channel": "FLUTTER",
	"platform": "BYTEDESK"
}
```

Use `data.accessToken` from response as Bearer token.

## Import via Excel

### 1) Download template

- `GET /api/v1/goods/export?orgUid={orgUid}&accessToken={accessToken}`

### 2) Fill key columns

- `商品编码(name)`
- `商品标题(title)`
- `商品图片(image)`
- `商品描述(description)`
- `商品价格(price)`
- `商品链接(url)`
- `商品标签(tagList, comma separated)`
- `扩展信息(extra)`
- `数量(quantity)`
- `类型(type)`
- `访客UID(visitorUid)`
- `会话UID(threadUid, optional)`

### 3) Upload Excel

- URL: `POST /api/v1/goods/import?orgUid={orgUid}`
- FormData: `file=<xlsx>`
- Header: `Authorization: Bearer {accessToken}`

## Import via API

### Create goods

- URL: `POST /api/v1/goods/create`
- Header: `Authorization: Bearer {accessToken}`

```json
{
	"orgUid": "org_xxx",
	"name": "sku_001",
	"title": "iPhone 16 Pro",
	"image": "https://example.com/iphone.png",
	"description": "512G, Black",
	"price": 8999,
	"url": "https://example.com/p/sku_001",
	"tagList": ["phone", "apple"],
	"quantity": 1,
	"visitorUid": "external_user_1001",
	"threadUid": "thread_xxx"
}
```

## Query by Visitor

- `GET /api/v1/goods/query/visitorUid?orgUid={orgUid}&visitorUid={visitorUid}&pageNumber=0&pageSize=20`

This API is used by desktop right panel to load the latest goods card for the current conversation visitor.
