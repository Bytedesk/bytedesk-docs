---
sidebar_label: E-commerce Integration Guide
sidebar_position: 2
---

# E-commerce Integration Guide

This guide is written for technical integrators and explains how a third-party e-commerce system can integrate with Bytedesk for core data, business objects, and customer service entry points.

Applicable scenarios:

- Integrate online customer service into storefront H5, PC web, or app
- Show shop, goods, and order context to agents
- Map your e-commerce member system into visitor identity for chat sessions
- Sync orders and goods from your business system into the customer service workspace

## Core Identity Distinction

In Bytedesk, two identities must be clearly separated:

### 1. Registered User

Registered users correspond to backend `UserEntity` and are formal system accounts.

Typical characteristics:

- must log in
- can be assigned organizations, roles, and permissions
- can act as admins, agents, supervisors, or operators
- participate in RBAC permission control

### 2. Visitor

Visitors correspond to backend `VisitorEntity` and are lightweight session-side identities.

Typical characteristics:

- no login required by default
- do not participate in backend permission control
- are not assigned admin, agent, or supervisor roles
- mainly carry chat identity, source channel, and extension fields

### 3. Relationship Between Them

Please keep these facts clear:

- Logged-in members in your business system are usually still mapped to `VisitorEntity` when entering chat
- Passing `visitorUid` from the frontend only identifies the session visitor, and does not create a backend `UserEntity`
- Passing `nickname`, `avatar`, `mobile`, or `email` only enriches visitor profile data, and does not grant backend permissions
- Only explicitly created `UserEntity` accounts with assigned roles can become admins, agents, or supervisors

In short:

- `UserEntity` is for login and permissions
- `VisitorEntity` is for session identity

## Recommended Integration Order

1. Get an access token for API authentication
2. Clarify the boundary between registered users and visitors
3. Integrate visitor identity so session identity is recognizable
4. Integrate organization data for tenant ownership
5. Integrate shop data for business context
6. Integrate goods data so agents can identify consulted products
7. Integrate order data so agents can identify consulted orders
8. Integrate agents, workgroups, and routing strategy
9. Integrate chat history and after-sales extensions

## Minimum Viable Integration

If you want to launch a working customer service entry quickly, the minimum setup is:

1. Get `accessToken`
2. Pass `org`, `sid`, and `t` when initializing the frontend chat component
3. Pass `visitorUid`, `nickname`, and `avatar`
4. Pass `goodsInfo` on goods detail pages
5. Pass `orderInfo` on order detail pages

This gives you:

- visitors entering chat from storefront pages
- recognizable visitor identity on the agent side
- current goods or order context displayed to agents

## Preconditions

Before you start, prepare the following:

- Bytedesk server address, for example `http://127.0.0.1:9003`
- target `orgUid`
- workgroup uid, agent uid, or bot uid
- business-side user, shop, goods, and order primary keys
- whether you need admin-side synchronization for goods/orders/shops
- whether the frontend uses direct H5 chat links or SDK integration

## Primary Key Mapping Advice

To avoid confusion later, separate Bytedesk internal ids from business ids from the start:

- `uid`: internal Bytedesk record id
- `visitorUid`: external business user id
- `shopUid`: external business shop id
- `goodsUid`: external business goods id
- `orderUid`: goods id carried by the order context, not the order record id itself

Recommendation:

- do not persist Bytedesk internal `uid` as your long-term business primary key
- your external system should keep its own primary keys and map them to `visitorUid`, `shopUid`, and `goodsUid`
- use Bytedesk record `uid` only when calling detail, update, or delete APIs

## Data Ownership Rules

In e-commerce integrations, data is usually scoped by organization and shop:

- `orgUid`: organization-level isolation, required by most admin APIs
- `shopUid`: identifies a concrete shop in multi-shop scenarios
- `visitorUid`: binds chat sessions to business users

## Token Integration

- [Token Information](../development/token_info.md)
- [Token API](../development/token_api.md)

Used for:

- calling admin APIs
- syncing goods, orders, and shops from backend services
- server-to-server integration

## Registered User Integration

- [User Information](../development/user_info.md)
- [User API](../development/user_api.md)

Focus on:

- registered users are backend accounts mapped to `UserEntity`
- registered users can receive roles and permissions such as admin or agent
- registered users must log in before accessing admin features and admin APIs
- a storefront member entering chat does not automatically become a backend registered user

## Visitor Integration

- [Visitor Information](../development/visitor_info.md)
- [Visitor API](../development/visitor_api.md)

Focus on:

- visitors correspond to `VisitorEntity`
- visitors do not require login by default
- visitors do not participate in backend role/permission systems
- `visitorUid`, `nickname`, and `avatar` passed by the frontend describe visitor identity

## Organization Integration

- [Organization Information](../development/organization_info.md)
- [Organization API](../development/organization_api.md)

## Permission Integration

- [Role & Permission Information](../development/role_info.md)
- [Role API](../development/role_api.md)

## Shop Integration

- [Shop Information](../development/shop_info.md)
- [Shop API](../development/shop_api.md)

## Goods Integration

- [Goods Demo](https://www.weiyuai.cn/reactdemo/)
- [Goods Information](../development/goods_info.md)
- [Goods API](../development/goods_api.md)

## Order Integration

- [Order Demo](https://www.weiyuai.cn/reactdemo/)
- [Order Information](../development/order_info.md)
- [Order API](../development/order_api.md)

## Agent Integration

- [Agent Information](../development/agent_info.md)
- [Agent API](../development/agent_api.md)

## Workgroup Integration

- [Workgroup Information](../development/workgroup_info.md)
- [Workgroup API](../development/workgroup_api.md)

## Visitor Historical Conversations

- [Conversation History](../development/thread_history.md)

## Recommended Flows

### Flow 1: Goods Detail Page Consultation

1. The frontend gets the current logged-in member
2. Map that member to visitor identity with `visitorUid`, `nickname`, and `avatar`
3. Build current `goodsInfo`
4. Open the chat component or redirect to an H5 chat page
5. The agent sees the goods card and continues the conversation

### Flow 2: Order Detail Page Consultation

1. The frontend gets the current logged-in member and current order data
2. Map that member to visitor identity with `visitorUid`
3. Build `orderInfo`
4. Open the chat component
5. The agent sees order status, goods, and shipping information

## Key Reminders

- Do not confuse storefront members with backend registered users
- Do not confuse `visitorUid` with backend `UserEntity.uid`
- If your goal is chat-session identity, use the visitor model first
- If your goal is backend accounts and permissions, use the registered user model

## 1-to-1 integration

## Visitor historical conversations
