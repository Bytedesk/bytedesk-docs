---
sidebar_label: Registered User API
sidebar_position: 5
---

# Registered User API

:::tip Note
This page describes backend registered user APIs for `UserEntity`, not frontend visitor session APIs.
:::

## Overview

User management APIs are provided by `UserRestController`. Base path:

- `/api/v1/user`

Here, “user” means backend accounts such as:

- super admins
- admins
- agents
- supervisors
- operators

These accounts:

- must log in
- can join organizations
- can be assigned roles and permissions
- can access admin console and management APIs

## Authentication

Get an access token first via:

- `POST /auth/v1/login`

Then send:

```http
Authorization: Bearer {accessToken}
```

## Permission Model

`UserRestController` uses both roles and permissions:

- Roles: `ROLE_SUPER`, `ROLE_ADMIN`
- Permissions: `USER_READ`, `USER_CREATE`, `USER_UPDATE`, `USER_DELETE`, `USER_EXPORT`

Main restrictions:

- query by organization: `ROLE_SUPER`
- create: `ROLE_SUPER`
- update: `USER_UPDATE` or `ROLE_SUPER`
- delete: `ROLE_SUPER`
- export: `ROLE_SUPER`
- profile/organizations/switch organization: `USER_READ` or `ROLE_SUPER`
- admin change password: `ROLE_ADMIN`

## Core APIs

- `GET /api/v1/user/query/org`
- `GET /api/v1/user/query`
- `GET /api/v1/user/query/uid`
- `POST /api/v1/user/create`
- `POST /api/v1/user/update`
- `POST /api/v1/user/delete`
- `GET /api/v1/user/export`
- `GET /api/v1/user/profile`
- `GET /api/v1/user/organizations`
- `POST /api/v1/user/switch/organization`
- `POST /api/v1/user/change/password`
- `POST /api/v1/user/admin/change/password`
- `POST /api/v1/user/change/email`
- `POST /api/v1/user/change/mobile`
- `POST /api/v1/user/logout`

## Key Distinction

- Use User API when you need backend accounts, login, roles, and permissions
- Do not use User API just because a business member is logged in on your storefront
- Business members entering chat are usually mapped to `VisitorEntity`, not `UserEntity`
