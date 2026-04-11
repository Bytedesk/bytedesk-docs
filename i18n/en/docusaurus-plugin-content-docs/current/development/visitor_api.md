---
sidebar_label: Visitor API
sidebar_position: 5
---

# Visitor API

:::tip Note
This page describes backend visitor management APIs. It is not the same as frontend SDK parameter passing when anonymous visitors open chat sessions.
:::

## Overview

Visitor management APIs are provided by `VisitorRestController`. Base path:

- `/api/v1/visitor`

Visitors correspond to `VisitorEntity` and are used for session-side identity data.

Typical characteristics:

- no login required by default in frontend chat scenarios
- no backend role or permission assignment
- can still be queried, updated, and exported in admin management

## Authentication

Although visitors are anonymous by default, the APIs on this page are backend management APIs and still require backend authorization.

Use login first, then send:

```http
Authorization: Bearer {accessToken}
```

## Permission Model

`VisitorRestController` uses:

- `VISITOR_READ`
- `VISITOR_CREATE`
- `VISITOR_UPDATE`
- `VISITOR_DELETE`
- `VISITOR_EXPORT`

## Core APIs

- `GET /api/v1/visitor/query/org`
- `GET /api/v1/visitor/query`
- `GET /api/v1/visitor/query/uid`
- `GET /api/v1/visitor/query/visitorUid`
- `POST /api/v1/visitor/create`
- `POST /api/v1/visitor/update`
- `POST /api/v1/visitor/update/tagList`
- `POST /api/v1/visitor/delete`
- `GET /api/v1/visitor/export`

## Key Distinction

- Use Visitor APIs to manage visitor-side identity/profile data
- Use Visitor identity for storefront members entering chat sessions
- Do not confuse `visitorUid` with backend `UserEntity.uid`
- If you need agent/admin/operator accounts, use User APIs instead
