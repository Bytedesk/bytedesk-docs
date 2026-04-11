---
sidebar_label: Shop Info
sidebar_position: 55
---

# 电商店铺信息

本文说明 `ShopEntity`（`bytedesk_core_shop`）当前核心字段定义、含义与建议值。

## 适用范围

- 管理后台店铺新增/编辑接口
- 店铺详情接口返回结构
- 第三方电商系统店铺信息对接

## 字段说明

| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| `uid` | `string` | 店铺唯一标识（系统生成） | `shop_xxx` |
| `shopUid` | `string` | 第三方业务店铺ID | `mall_shop_1001` |
| `name` | `string` | 店铺名称 | `仰望汽车官方旗舰店` |
| `description` | `string` | 店铺介绍（简述） | `主营新能源车型咨询` |
| `industry` | `string` | 行业 | `汽车` |
| `phone` | `string` | 联系电话 | `400-800-0000` |
| `address` | `string` | 联系地址 | `深圳市南山区...` |
| `logo` | `string` | 店铺头像URL | `https://.../logo.png` |
| `businessHours` | `string` | 营业时间描述 | `周一至周日 09:00-18:00` |
| `businessStartTime` | `string` | 营业开始时间 | `09:00` |
| `businessEndTime` | `string` | 营业结束时间 | `18:00` |
| `type` | `string` | 店铺类型 | `FLAGSHIP` |
| `status` | `string` | 店铺状态 | `ACTIVE` |
| `billingType` | `string` | 付费类型 | `FREE` |
| `expireAt` | `datetime` | 到期时间 | `2026-12-31T23:59:59Z` |
| `renewalType` | `string` | 续费类型 | `MANUAL` |
| `renewalAt` | `datetime` | 续费时间 | `2026-12-25T00:00:00Z` |
| `enabled` | `boolean` | 是否启用 | `true` |
| `detail` | `string(text/json)` | 店铺详情（可存富文本或JSON） | `{}` |
| `maxAgents` | `number` | 店铺可绑定最大坐席数 | `20` |

## 关联字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `agentUids` | `string[]` | 绑定的客服UID列表 |
| `workgroupUids` | `string[]` | 绑定的工作组UID列表 |
| `agents` | `object[]` | 店铺详情返回的客服摘要列表 |
| `workgroups` | `object[]` | 店铺详情返回的工作组摘要列表 |
| `agentCount` | `number` | 当前已绑定客服数 |
| `workgroupCount` | `number` | 当前已绑定工作组数 |

## 枚举建议值

- `type`: `FLAGSHIP`（旗舰店）、`EXCLUSIVE`（专卖店）、`MULTI_BRAND`（专营店）、`ENTERPRISE`（企业店/企业普通店）、`SOLE_PROPRIETOR`（个体工商户店）、`PERSONAL`（个人店）、`SELF_OPERATED`（平台自营店）
- `status`: `ACTIVE`、`INACTIVE`、`SUSPENDED`
- `billingType`: `FREE`、`TRIAL`、`SUBSCRIPTION`
- `renewalType`: `AUTO`、`MANUAL`

## 时间字段格式建议

- `expireAt`、`renewalAt` 推荐 ISO-8601：`2026-03-10T08:00:00Z`
- 管理后台表单使用日期时间选择器，避免手工输入格式错误
