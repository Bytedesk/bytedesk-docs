---
sidebar_label: Organization
sidebar_position: 48
---

# Organization

In Bytedesk, an **Organization** represents an isolated workspace for a company/team. It defines the organization’s profile, availability status, membership quotas, and login-related policies (such as subscription expiry checks).

In the client apps, each signed-in user has a **current organization** (`userInfo.currentOrganization`). After user info is loaded, the frontend can decide whether the user is allowed to stay signed in based on the organization settings.

## Organization profile

Common fields used for display and search:

- `name`: organization name (should be unique)
- `logo`: organization logo/avatar
- `code`: organization code (human-readable, for search)
- `description`: organization description

## Status: enabled / disabled

Organization availability is controlled by `enabled`:

- `enabled = true`: organization is active
- `enabled = false`: organization is disabled

When an organization is disabled:

- members can still sign in, but the UI should show a prompt like “Organization disabled”
- after confirmation, the frontend should **sign out automatically**

This check should happen after the frontend loads `userInfo.currentOrganization`.

## Subscription expiry: block login after expiry (optional)

Organizations can have a subscription/validity period:

- `vip`: whether the organization is a paid member
- `vipExpireDate`: subscription expiry date / organization validity

And a dedicated switch for whether expiry should block login:

- `vipExpireLoginCheckEnabled`: whether to enforce login blocking after `vipExpireDate` is expired

Rules (simplified):

1. If `vipExpireLoginCheckEnabled = false`: even if `vipExpireDate` is expired, do **not** force sign-out.
2. If `vipExpireLoginCheckEnabled = true` and `vipExpireDate` is expired: show an “Organization expired” prompt and **sign out** after confirmation.

## Default organization exception (df_org_uid)

The system has a default organization:

- UID: `BytedeskConsts.DEFAULT_ORGANIZATION_UID` (currently `df_org_uid`)

This default organization is a built-in special case:

- expiry checks are skipped
- it must not be set to “expired” or “disabled” (both backend and frontend should prevent setting `vipExpireDate`, `vipExpireLoginCheckEnabled`, `enabled` in a way that blocks usage)

## Quotas: members / agents / workgroups

Organizations can limit the scale of resources:

- `maxMembers`: maximum members allowed (default: 20)
- `maxAgents`: maximum agents allowed (default: 20)
- `maxWorkgroups`: maximum workgroups allowed (default: 20)

### Login-time member limit (maxMembers)

The system should persist user login records and validate, after login:

- whether the number of **unique logged-in users** in the current organization exceeds `maxMembers`

If it exceeds:

- show a prompt like “Maximum online members exceeded”
- after confirmation, the frontend should **sign out automatically**

Multi-device rule:

- the same user signed in on multiple devices counts as **1** member

## Frontend integration (admin / desktop)

After user info is loaded and `userInfo.currentOrganization` is available:

1. If current organization is the default organization (`df_org_uid`): skip expiry/disabled checks.
2. If `enabled = false`: prompt and sign out.
3. If `vipExpireLoginCheckEnabled = true` and `vipExpireDate` is expired: prompt and sign out.
4. If unique online members > `maxMembers`: prompt and sign out.
