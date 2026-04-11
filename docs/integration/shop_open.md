---
sidebar_label: Shop Simple
sidebar_position: 1
---

# 电商系统对接指南-简版

## 目标

提供一组最小接口，支持通过手机号+店铺信息快速完成以下能力：

- 自动创建用户（可配置关闭登录自动注册）
- 自动创建组织
- 创建并维护店铺列表
- 通过店铺业务 uid 查询组织/工作组/客服绑定信息
- 通过店铺业务 uid 更新店铺名称、店铺 logo

## 配置项

在配置文件中新增开关：

```properties
bytedesk.custom.auto-register-on-login=true
```

- 默认值：true（开启）
- 说明：手机号/邮箱验证码登录时，若用户不存在，是否允许自动注册
- 关闭后：未注册用户登录会被拒绝，只能先调用对接接口创建用户

## 接口列表

鉴权说明：

- 以下接口均需携带 `Authorization: Bearer <accessToken>`
- 获取 Token 参考：[Token信息](../development/token_info.md)

### 1) 手机号+店铺信息对接

- Method: POST
- Path: /api/v1/shop/open/onboard

请求示例：

```json
{
 "mobile": "13800138000",
 "country": "86",
 "platform": "BYTEDESK",
 "shopUid": "shop_demo_001",
 "shopName": "演示店铺",
 "shopLogo": "https://example.com/logo.png",
 "orgName": "演示组织"
}
```

行为说明：

- 若手机号未注册：自动注册用户、创建组织、创建店铺
- 若手机号已注册且已有组织：在该组织下创建或更新店铺
- 若店铺已存在（同 orgUid + shopUid）：更新店铺名称/logo

返回重点字段：

- organization
- shopList

### 2) 通过店铺 uid 查询绑定信息

- Method: GET
- Path: /api/v1/shop/open/binding
- Query:

```text
shopUid=shop_demo_001
```

返回内容：

- 店铺业务 uid shopUid
- 店铺信息 shop

### 3) 通过店铺 uid 更新店铺名称/logo

- Method: POST
- Path: /api/v1/shop/open/update

请求示例：

```json
{
 "shopUid": "shop_demo_001",
 "orgUid": "org_xxx",
 "shopName": "新店铺名称",
 "shopLogo": "https://example.com/new-logo.png"
}
```

说明：

- shopName 与 shopLogo 至少传一个
- orgUid 可选；未传时按 shopUid 命中的第一条记录更新

### 4) 坐席资源说明

- `AgentSeatEntity` 归属组织通过基类中的 `orgUid` 标记，`shopUid` 不再作为席位实体字段
- 坐席资源已从 `AgentEntity` 中独立出来，单个坐席的核心字段为：`seatNo`、`source`、`status`、`baseSeat`、`expireAt`
- `name` 与 `description` 已移除，不再作为坐席接口参数
- 管理后台中的“客服席位”页签，使用分页列表查询 + 单条创建/更新/删除接口完成列表化管理

### 4.1) 坐席 CRUD 接口

#### 分页查询坐席

- Method: GET
- Path: /api/v1/agent/seat/query/org

请求示例：

```text
/api/v1/agent/seat/query/org?pageNumber=0&pageSize=20&seatNo=org_demo_001-extra-1&source=EXTRA&status=AVAILABLE
```

#### 按 shopUid + seatNo 查询单个坐席

- Method: GET
- Path: /api/v1/shop/open/agent-seat/detail

请求示例：

```text
/api/v1/shop/open/agent-seat/detail?shopUid=shop_demo_005&seatNo=shop_demo_005-extra-1
```

#### 创建坐席

- Method: POST
- Path: /api/v1/shop/open/agent-seat/create

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "seatNoList": ["shop_demo_005-extra-1", "shop_demo_005-extra-2"],
 "expireAt": "2027-09-10T23:59:59+08:00"
}
```

说明：

- `seatNoList` 为批量席位编号列表，兼容保留单个 `seatNo`

#### 更新坐席

- Method: POST
- Path: /api/v1/shop/open/agent-seat/update

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "seatNoList": ["shop_demo_005-extra-1", "shop_demo_005-extra-2"],
 "expireAt": "2028-09-10T23:59:59+08:00"
}
```

#### 删除坐席

- Method: POST
- Path: /api/v1/shop/open/agent-seat/delete

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "seatNoList": ["shop_demo_005-extra-1", "shop_demo_005-extra-2"]
}
```

说明：

- `seatNoList` 为批量席位编号列表，兼容保留单个 `seatNo`

## 数据模型补充

### AgentEntity

新增字段：

- seatExpireAt：坐席到期时间，null 表示永久有效

### ShopEntity

新增字段：

- edition：版本（BASIC/ADVANCED）
- baseAgentSeats：版本基础席位（BASIC=1，ADVANCED=3）
- extraAgentSeats：额外购买席位
- agentSeatExpireAt：席位到期时间（null=永久）
- editionExpireAt：版本到期时间（null=永久）

容量约束：

- maxAgents 不能超过 baseAgentSeats + extraAgentSeats

### 5) Token 增删改查与刷新

- Method: POST
- Path: /api/v1/shop/open/token/create

请求示例：

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

说明：

- 若未传 `refreshToken`，服务端会自动生成，便于后续刷新 `accessToken`

---

- Method: POST
- Path: /api/v1/shop/open/token/query/org

请求示例：

```json
{
 "orgUid": "org_xxx",
 "pageNumber": 0,
 "pageSize": 20
}
```

---

- Method: POST
- Path: /api/v1/shop/open/token/query/user

请求示例：

```json
{
 "userUid": "user_xxx",
 "pageNumber": 0,
 "pageSize": 20
}
```

---

- Method: GET
- Path: /api/v1/shop/open/token/detail
- Query:

```text
uid=token_uid_xxx
```

---

- Method: POST
- Path: /api/v1/shop/open/token/update

请求示例：

```json
{
 "uid": "token_uid_xxx",
 "name": "updated-token-name",
 "description": "updated description"
}
```

---

- Method: POST
- Path: /api/v1/shop/open/token/delete
- Query:

```text
uid=token_uid_xxx
```

---

- Method: POST
- Path: /api/v1/shop/open/token/refresh

请求示例：

```json
{
 "refreshToken": "refresh_token_xxx",
 "channel": "WEB"
}
```

说明：

- `refreshToken` 必填
- 刷新成功后返回最新 `accessToken` 与新的 `expiresAt`

---

- Method: POST
- Path: /api/v1/shop/open/token/revoke

请求示例（按 uid 撤销）：

```json
{
 "uid": "token_uid_xxx",
 "revokeReason": "manual revoke"
}
```

请求示例（按 accessToken 撤销）：

```json
{
 "accessToken": "access_token_xxx",
 "revokeReason": "security reason"
}
```
