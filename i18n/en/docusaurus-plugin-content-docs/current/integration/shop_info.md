---
sidebar_label: Shop Info
sidebar_position: 55
---

# Shop Information

This page describes the current `ShopEntity` (`bytedesk_core_shop`) field model and recommended values.

## Scope

- Admin console shop create/update APIs
- Shop detail response payload
- Third-party commerce system integration

## Core Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `uid` | `string` | Internal unique ID | `shop_xxx` |
| `shopUid` | `string` | External business shop ID | `mall_shop_1001` |
| `name` | `string` | Shop name | `Demo Flagship Store` |
| `description` | `string` | Shop short description | `New energy vehicle consulting` |
| `industry` | `string` | Industry category | `Automotive` |
| `phone` | `string` | Contact phone | `400-800-0000` |
| `address` | `string` | Contact address | `Nanshan, Shenzhen` |
| `logo` | `string` | Shop logo URL | `https://.../logo.png` |
| `businessHours` | `string` | Human-readable hours | `Mon-Sun 09:00-18:00` |
| `businessStartTime` | `string` | Business start time | `09:00` |
| `businessEndTime` | `string` | Business end time | `18:00` |
| `type` | `string` | Shop type | `CUSTOMER` |
| `status` | `string` | Shop status | `ACTIVE` |
| `billingType` | `string` | Billing type | `FREE` |
| `expireAt` | `datetime` | Subscription expiration | `2026-12-31T23:59:59Z` |
| `renewalType` | `string` | Renewal strategy | `MANUAL` |
| `renewalAt` | `datetime` | Planned renewal time | `2026-12-25T00:00:00Z` |
| `enabled` | `boolean` | Whether the shop is enabled | `true` |
| `detail` | `string(text/json)` | Rich shop detail (text/JSON) | `{}` |
| `maxAgents` | `number` | Max assigned agents | `20` |

## Relation Fields

| Field | Type | Description |
| --- | --- | --- |
| `agentUids` | `string[]` | Assigned agent UID list |
| `workgroupUids` | `string[]` | Assigned workgroup UID list |
| `agents` | `object[]` | Agent summary list in shop detail |
| `workgroups` | `object[]` | Workgroup summary list in shop detail |
| `agentCount` | `number` | Current assigned agent count |
| `workgroupCount` | `number` | Current assigned workgroup count |

## Recommended Enum Values

- `status`: `ACTIVE`, `INACTIVE`, `SUSPENDED`
- `billingType`: `FREE`, `TRIAL`, `SUBSCRIPTION`
- `renewalType`: `AUTO`, `MANUAL`

## Datetime Format Recommendation

- Use ISO-8601 for `expireAt` and `renewalAt`, e.g. `2026-03-10T08:00:00Z`
- In admin forms, use datetime picker controls to avoid manual format issues
