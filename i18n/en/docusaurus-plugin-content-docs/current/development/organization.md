---
sidebar_label: Organization
sidebar_position: 48
---

# Organization

In Bytedesk, an “Organization” is an independent workspace for a company/team. An organization is used to manage:

- Whether the organization is available (enabled/disabled)
- Whether the subscription is still valid (and whether expiry should block login)
- Quotas (e.g., maximum online members, maximum agents, maximum workgroups)

After a user signs in, the system checks the status of the user’s current organization to decide whether the user can continue using the product.

## Organization basics

Basic information used for display and search:

- Organization name
- Organization logo/avatar
- Organization code (for search)
- Organization description

## Availability: enabled / disabled

An organization can be enabled or disabled.

If an organization is disabled, after sign-in the user will:

- See a prompt like: “Organization disabled”
- Be signed out after confirmation (to prevent continued use)

## Subscription validity: whether to block login after expiry

An organization can have a subscription expiry date (validity period). You can also choose whether the system should block login after it expires.

Rules:

1. If “block login after expiry” is off: even if expired, do not force sign-out.
2. If it is on and already expired: show “Organization expired / out of validity” and sign out after confirmation.

## Default organization exceptions

The system includes a built-in “default organization” for internal/compatibility use.

Special rules:

- Skip expiry-based login blocking
- Do not allow configuring the default organization into an unusable state (e.g., disabled or expiry-blocked)

## Quotas: members / agents / workgroups

Organizations can limit quotas:

- Member limit (default: 20)
- Agent limit (default: 20)
- Workgroup limit (default: 20)

### Member limit check on login

After sign-in, the system checks whether the number of members currently signed in exceeds the member limit.

If exceeded:

- Show a prompt like: “Maximum online members exceeded”
- Sign out after confirmation

Multi-device rule:

- The same user signed in on multiple devices counts as 1 member.

## Checks after login

After the current organization is loaded, check in this order:

1. If it is the default organization: skip “disabled” and “expiry blocking” checks (still allowed to display organization info).
2. If the organization is disabled: show “Organization disabled”, then sign out.
3. If “block login after expiry” is on and the organization is expired: show “Organization expired / out of validity”, then sign out.
4. If online members exceed the member limit: show “Maximum online members exceeded”, then sign out.

:::info Developer notes

- Current organization: `userInfo.currentOrganization`
- Default organization UID: `df_org_uid` (`BytedeskConsts.DEFAULT_ORGANIZATION_UID`)
- Status field: `enabled`
- Validity fields: `vipExpireDate`, `vip`
- Expiry-blocking switch: `vipExpireLoginCheckEnabled`
- Member quota field: `maxMembers` (multi-device counts as 1)

:::

## FAQ

### 1) If an organization is disabled, can members continue using it?

No. After sign-in they will be prompted and signed out.

### 2) Does expiry always block login?

Not necessarily. It depends on whether “block login after expiry” is enabled.

### 3) Why does one user on multiple devices count as one member?

The member quota limits unique members, not devices.
