---
sidebar_label: Shop Simple
sidebar_position: 1
---

# 电商系统对接指南-简版

## Overview

This page introduces a minimal integration flow for mobile + shop onboarding:

- Auto-create user (configurable)
- Auto-create organization
- Create and maintain shop list
- Query org/workgroup/agent bindings by business shop uid
- Update shop name/logo by business shop uid

## Config

```properties
bytedesk.custom.auto-register-on-login=true
```

- Default: true
- Description: Whether mobile/email code login can auto-register an account when user does not exist

## APIs

### 1) Onboard by mobile + shop

- Method: POST
- Path: /api/v1/shop/open/onboard

### 2) Query bindings by shop uid

- Method: GET
- Path: /api/v1/shop/open/binding

### 3) Update shop name/logo by shop uid

- Method: POST
- Path: /api/v1/shop/open/update

### 4) Token CRUD and Refresh

#### 4.1 Create token

- Method: POST
- Path: /api/v1/shop/open/token/create

Example:

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

Note: if `refreshToken` is not provided, server will generate one automatically.

#### 4.2 Query tokens by organization

- Method: POST
- Path: /api/v1/shop/open/token/query/org

#### 4.3 Query tokens by user

- Method: POST
- Path: /api/v1/shop/open/token/query/user

#### 4.4 Query token detail

- Method: GET
- Path: /api/v1/shop/open/token/detail
- Query: `uid=token_uid_xxx`

#### 4.5 Update token

- Method: POST
- Path: /api/v1/shop/open/token/update

#### 4.6 Delete token

- Method: POST
- Path: /api/v1/shop/open/token/delete
- Query: `uid=token_uid_xxx`

#### 4.7 Refresh accessToken

- Method: POST
- Path: /api/v1/shop/open/token/refresh

Example:

```json
{
 "refreshToken": "refresh_token_xxx",
 "channel": "WEB"
}
```

#### 4.8 Revoke token

- Method: POST
- Path: /api/v1/shop/open/token/revoke

Supports revoke by `uid` or by `accessToken`.
