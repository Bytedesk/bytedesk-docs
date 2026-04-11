---
sidebar_label: Visitor Identity
sidebar_position: 6
---

# Visitor Identity

This page explains the visitor concept in Bytedesk and the difference between visitor identity and backend registered users.

## What Is A Visitor

A visitor corresponds to backend `VisitorEntity` and is mainly used for chat/session-side identity.

Typical characteristics:

- No login is required by default
- Mainly used for web, H5, app, mini-program, and other frontend session scenarios
- Does not participate in backend RBAC permission control
- Cannot be assigned admin, agent, or supervisor roles
- Focuses on identity, source channel, contact fields, and extension data in chat sessions

Common fields include:

- `visitorUid`
- `nickname`
- `avatar`
- `mobile`
- `email`
- `note`
- `channel`
- `status`
- `tagList`
- `customFieldList`
- `extra`
- `ip`
- `ipLocation`
- `vipLevel`

## Registered User vs Visitor

### Registered User

Registered users correspond to backend `UserEntity`.

Characteristics:

- Must log in
- Can join organizations
- Can be assigned roles
- Can have permissions
- Can act as admins, agents, supervisors, or operators

### Visitor

Visitors correspond to backend `VisitorEntity`.

Characteristics:

- No login required by default
- Used only for session identity
- Does not participate in backend permissions
- Has no admin/agent role settings

## A Common Misunderstanding

Many business systems already have their own registered members or logged-in users. When integrating with Bytedesk chat, these business users are usually mapped to visitors, not directly turned into backend registered users.

That means:

- Your member id can be passed as `visitorUid`
- Your member nickname can be passed as `nickname`
- Your member avatar can be passed as `avatar`
- This only maps the member to chat visitor identity
- It does not automatically create a backend `UserEntity`
- It does not automatically grant any backend permission

## Integration Suggestions

- If your goal is to let business users enter chat sessions, use the visitor identity model first
- If your goal is to create agent/admin/operator accounts, use the registered user and permission model
- Do not confuse `visitorUid` with backend `UserEntity.uid`
