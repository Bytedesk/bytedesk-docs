---
sidebar_label: 电商系统对接指南-简版
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

## 接口列表

鉴权说明：

- 以下接口均需携带 Authorization: Bearer accessToken
- 获取 Token 参考：[Token信息](../development/token_info.md)

### 1) 通过手机号+店铺信息对接 {#shop-open-onboard}

- Method: POST
- Path: /api/v1/shop/open/onboard
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/onboard
http://example.com/api/v1/shop/open/onboard
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "mobile": "13800138005",
 "shopUid": "shop_demo_005",
 "shopName": "演示店铺",
 "shopLogo": "https://example.com/logo.png"
}
```

行为说明：

- country 可选；不传时后端默认按 86 处理
- 若手机号未注册：自动注册用户、创建组织、创建店铺
- 首次创建店铺时，服务端会自动创建 1 个基础 AgentSeatEntity，并自动关联到当前 shop
- 若店铺已存在（同 `shopUid`）：复用该店铺已绑定的组织，并更新店铺名称/logo
- 若 `shopUid` 不存在：为该店铺创建新的组织，并将用户当前组织切换到该店铺所属组织

返回重点字段：

- shopList
- shopList[].agentSeats：当前店铺已关联的席位列表；新建店铺后默认会包含 1 个基础席位

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "mobile": "13800138005",
  "country": "86",
  "shopList": [
   {
    "uid": "shop_xxx",
    "userUid": null,
    "orgUid": "org_xxx",
    "level": null,
    "platform": null,
    "createdAt": "2026-04-02 10:00:00",
    "updatedAt": "2026-04-02 10:00:00",
    "name": "演示店铺",
    "shopUid": "shop_demo_005",
    "description": null,
    "logo": "https://example.com/logo.png",
    "type": "FLAGSHIP",
    "status": null,
    "expireAt": null,
    "enabled": true,
    "vipLevel": 0,
    "agents": [
     {
      "uid": "agent_xxx",
      "nickname": "13800138005",
      "avatar": null,
      "status": null,
      "enabled": true,
      "seatExpireAt": null
     }
    ],
    "agentSeats": [
     {
      "uid": "seat_xxx",
      "userUid": null,
      "orgUid": "org_xxx",
      "level": null,
      "platform": null,
      "createdAt": "2026-04-02 10:00:00",
      "updatedAt": "2026-04-02 10:00:00",
      "seatNo": "shop_demo_005-base-1",
      "source": "BASE",
      "status": "AVAILABLE",
      "baseSeat": true,
      "expireAt": null,
      "assignedAgentUid": null,
      "assignedMemberUid": null,
      "assignedAt": null,
      "releasedAt": null,
      "type": "CUSTOMER"
     }
    ],
    "workgroups": [
     {
      "uid": "wg_xxx",
      "nickname": "演示店铺",
      "avatar": null,
      "type": null,
      "status": null,
      "enabled": true
     }
    ]
   }
  ]
 }
}
```

### 2) 通过店铺 uid 查询绑定信息

- Method: GET
- Path: /api/v1/shop/open/binding
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/binding
http://example.com/api/v1/shop/open/binding
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

- Query:

```text
shopUid=shop_demo_005
```

返回内容：

- 店铺业务 uid shopUid
- 店铺信息 shop

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "shopUid": "shop_demo_005",
  "shop": {
   "uid": "shop_xxx",
   "userUid": null,
   "orgUid": "org_xxx",
   "level": null,
   "platform": null,
   "createdAt": "2026-04-02 10:00:00",
   "updatedAt": "2026-04-02 10:05:00",
   "name": "演示店铺",
   "shopUid": "shop_demo_005",
   "description": null,
   "logo": "https://example.com/logo.png",
   "type": "FLAGSHIP",
   "status": null,
   "expireAt": null,
   "enabled": true,
   "vipLevel": 0,
   "agents": [
    {
     "uid": "agent_xxx",
     "nickname": "13800138005",
     "avatar": null,
     "status": null,
     "enabled": true,
     "seatExpireAt": null
    }
   ],
   "agentSeats": [
    {
     "uid": "seat_xxx",
     "userUid": null,
     "orgUid": "org_xxx",
     "level": null,
     "platform": null,
     "createdAt": "2026-04-02 10:00:00",
     "updatedAt": "2026-04-02 10:00:00",
     "seatNo": "shop_demo_005-base-1",
     "source": "BASE",
     "status": "AVAILABLE",
     "baseSeat": true,
     "expireAt": null,
     "assignedAgentUid": null,
     "assignedMemberUid": null,
     "assignedAt": null,
     "releasedAt": null,
     "type": "CUSTOMER"
    }
   ],
   "workgroups": [
    {
     "uid": "wg_xxx",
     "nickname": "演示店铺",
     "avatar": null,
     "type": null,
     "status": null,
     "enabled": true
    }
   ]
  }
 }
}
```

### 3) 通过店铺 uid 更新店铺名称/logo

- Method: POST
- Path: /api/v1/shop/open/update
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/update
http://example.com/api/v1/shop/open/update
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "shopName": "新店铺名称",
 "shopLogo": "https://example.com/new-logo.png"
}
```

说明：

- shopName 与 shopLogo 至少传一个

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "uid": "shop_xxx",
  "userUid": null,
  "orgUid": "org_xxx",
  "level": null,
  "platform": null,
  "createdAt": "2026-04-02 10:00:00",
  "updatedAt": "2026-04-02 10:10:00",
  "name": "新店铺名称",
  "shopUid": "shop_demo_005",
  "description": null,
  "logo": "https://example.com/new-logo.png",
  "type": "FLAGSHIP",
  "status": null,
  "expireAt": null,
  "enabled": true,
  "vipLevel": 0,
  "agents": [],
  "agentSeats": [],
  "workgroups": []
 }
}
```

### 4) 仅更新店铺版本

- Method: POST
- Path: /api/v1/shop/open/shop/vip-level
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/shop/vip-level
http://example.com/api/v1/shop/open/shop/vip-level
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "vipLevel": 1
}
```

说明：

- `shopUid` 必填
- `vipLevel` 必填，仅支持 `0`、`1`, `vipLevel=0` 基础版，`vipLevel=1` 高级版
- 已购买的额外坐席数量与现有到期时间保持不变

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "uid": "shop_xxx",
  "userUid": null,
  "orgUid": "org_xxx",
  "level": null,
  "platform": null,
  "createdAt": "2026-04-02 10:00:00",
  "updatedAt": "2026-04-02 10:20:00",
  "name": "演示店铺",
  "shopUid": "shop_demo_005",
  "description": null,
  "logo": "https://example.com/logo.png",
  "type": "FLAGSHIP",
  "status": null,
  "expireAt": null,
  "enabled": true,
  "vipLevel": 1,
  "agents": [],
  "agentSeats": [
   {
    "uid": "seat_xxx",
    "userUid": null,
    "orgUid": "org_xxx",
    "level": null,
    "platform": null,
    "createdAt": "2026-04-02 10:00:00",
    "updatedAt": "2026-04-02 10:20:00",
    "seatNo": "shop_demo_005-base-1",
    "source": "BASE",
    "status": "AVAILABLE",
    "baseSeat": true,
    "expireAt": null,
    "assignedAgentUid": null,
    "assignedMemberUid": null,
    "assignedAt": null,
    "releasedAt": null,
    "type": "CUSTOMER"
   }
  ],
  "workgroups": []
 }
}
```

### 5) 坐席席位 增删改查

说明：

- 对外开放的席位管理统一使用 `shopUid` 驱动

#### 5.1 分页查询坐席席位

- Method: POST
- Path: /api/v1/shop/open/agent-seat/query
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/agent-seat/query
http://example.com/api/v1/shop/open/agent-seat/query
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "pageNumber": 0,
 "pageSize": 20
}
```

说明：

- `shopUid` 必填；
- 支持分页参数 `pageNumber`、`pageSize`
- 当前接口仅需传 `shopUid`、`pageNumber`、`pageSize`

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "content": [
   {
    "uid": "seat_xxx",
    "userUid": null,
    "orgUid": "org_xxx",
    "level": null,
    "platform": null,
    "createdAt": "2026-04-02 10:00:00",
    "updatedAt": "2026-04-02 10:00:00",
    "seatNo": "shop_demo_005-base-1",
    "source": "BASE",
    "status": "AVAILABLE",
    "baseSeat": true,
    "expireAt": null,
    "assignedAgentUid": null,
    "assignedMemberUid": null,
    "assignedAt": null,
    "releasedAt": null,
    "type": "CUSTOMER"
   }
  ],
  "pageable": {
   "pageNumber": 0,
   "pageSize": 20,
   "offset": 0,
   "paged": true,
   "unpaged": false,
   "sort": {
    "empty": true,
    "sorted": false,
    "unsorted": true
   }
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 1,
  "size": 20,
  "number": 0,
  "sort": {
   "empty": true,
   "sorted": false,
   "unsorted": true
  },
  "first": true,
  "numberOfElements": 1,
  "empty": false
 }
}
```

#### 5.2 按 shopUid + seatNo 查询单个坐席席位

- Method: GET
- Path: /api/v1/shop/open/agent-seat/detail
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/agent-seat/detail
http://example.com/api/v1/shop/open/agent-seat/detail
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

Query：

```text
shopUid=shop_demo_005&seatNo=shop_demo_005-extra-1
```

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "uid": "seat_xxx",
  "userUid": null,
  "orgUid": "org_xxx",
  "level": null,
  "platform": null,
  "createdAt": "2026-04-02 10:00:00",
  "updatedAt": "2026-04-02 10:00:00",
  "seatNo": "shop_demo_005-extra-1",
  "source": "EXTRA",
  "status": "AVAILABLE",
  "baseSeat": false,
  "expireAt": "2027-09-10T23:59:59+08:00",
  "assignedAgentUid": null,
  "assignedMemberUid": null,
  "assignedAt": null,
  "releasedAt": null,
  "type": "CUSTOMER"
 }
}
```

#### 5.3 创建坐席席位

- Method: POST
- Path: /api/v1/shop/open/agent-seat/create
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/agent-seat/create
http://example.com/api/v1/shop/open/agent-seat/create
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "seatNoList": ["shop_demo_005-extra-1", "shop_demo_005-extra-2"],
 "expireAt": "2027-09-10T23:59:59+08:00"
}
```

字段说明：

- `shopUid`：店铺业务 uid，必填
- `seatNoList`：席位编号列表，建议传业务可读且组织内唯一的编号；兼容保留单个 `seatNo`
- `expireAt`：到期时间，必填

创建规则：

- 当前接口需要传 `shopUid`、`seatNoList`、`expireAt`

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": [
  {
   "uid": "seat_xxx1",
   "userUid": null,
   "orgUid": "org_xxx",
   "level": null,
   "platform": null,
   "createdAt": "2026-04-02 10:30:00",
   "updatedAt": "2026-04-02 10:30:00",
   "seatNo": "shop_demo_005-extra-1",
   "source": "EXTRA",
   "status": "AVAILABLE",
   "baseSeat": false,
   "expireAt": "2027-09-10T23:59:59+08:00",
   "assignedAgentUid": null,
   "assignedMemberUid": null,
   "assignedAt": null,
   "releasedAt": null,
   "type": "CUSTOMER"
  },
  {
   "uid": "seat_xxx2",
   "userUid": null,
   "orgUid": "org_xxx",
   "level": null,
   "platform": null,
   "createdAt": "2026-04-02 10:30:00",
   "updatedAt": "2026-04-02 10:30:00",
   "seatNo": "shop_demo_005-extra-2",
   "source": "EXTRA",
   "status": "AVAILABLE",
   "baseSeat": false,
   "expireAt": "2027-09-10T23:59:59+08:00",
   "assignedAgentUid": null,
   "assignedMemberUid": null,
   "assignedAt": null,
   "releasedAt": null,
   "type": "CUSTOMER"
  }
 ]
}
```

#### 5.4 更新坐席席位

- Method: POST
- Path: /api/v1/shop/open/agent-seat/update
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/agent-seat/update
http://example.com/api/v1/shop/open/agent-seat/update
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "seatNoList": ["shop_demo_005-extra-1", "shop_demo_005-extra-2"],
 "expireAt": "2028-09-10T23:59:59+08:00"
}
```

说明：

- 当前接口需要传 `shopUid`、`seatNoList`、`expireAt`
- 服务端使用 `shopUid` + `seatNoList` 定位已有席位，并批量更新其 `expireAt`

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": [
  {
   "uid": "seat_xxx1",
   "userUid": null,
   "orgUid": "org_xxx",
   "level": null,
   "platform": null,
   "createdAt": "2026-04-02 10:30:00",
   "updatedAt": "2026-04-02 11:00:00",
   "seatNo": "shop_demo_005-extra-1",
   "source": "EXTRA",
   "status": "AVAILABLE",
   "baseSeat": false,
   "expireAt": "2028-09-10T23:59:59+08:00",
   "assignedAgentUid": null,
   "assignedMemberUid": null,
   "assignedAt": null,
   "releasedAt": null,
   "type": "CUSTOMER"
  },
  {
   "uid": "seat_xxx2",
   "userUid": null,
   "orgUid": "org_xxx",
   "level": null,
   "platform": null,
   "createdAt": "2026-04-02 10:30:00",
   "updatedAt": "2026-04-02 11:00:00",
   "seatNo": "shop_demo_005-extra-2",
   "source": "EXTRA",
   "status": "AVAILABLE",
   "baseSeat": false,
   "expireAt": "2028-09-10T23:59:59+08:00",
   "assignedAgentUid": null,
   "assignedMemberUid": null,
   "assignedAt": null,
   "releasedAt": null,
   "type": "CUSTOMER"
  }
 ]
}
```

#### 5.5 删除坐席席位

- Method: POST
- Path: /api/v1/shop/open/agent-seat/delete
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/agent-seat/delete
http://example.com/api/v1/shop/open/agent-seat/delete
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "shopUid": "shop_demo_005",
 "seatNoList": ["shop_demo_005-extra-1", "shop_demo_005-extra-2"]
}
```

说明：

- 为软删除
- 兼容保留单个 `seatNo` 字段，但推荐统一使用 `seatNoList`

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": true
}
```

### 6) Token 增删改查与刷新

#### 6.1 创建令牌

- Method: POST
- Path: /api/v1/shop/open/token/create
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/create
http://example.com/api/v1/shop/open/token/create
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "name": "shop-open-token",
 "description": "for shop open integration",
 "userUid": "user_xxx",
 "shopUid": "shop_demo_005",
 "channel": "WEB",
 "device": "shop-system"
}
```

说明：

- 推荐传 `shopUid`，服务端会自动解析对应的 `orgUid`
- 若未传 `refreshToken`，服务端会自动生成，便于后续刷新 `accessToken`

返回示例：

```json
{
    "message": "success",
    "code": 200,
    "data": {
        "uid": "token_uid_xxx",
        "userUid": "user_xxx",
        "orgUid": "org_xxx",
        "level": null,
        "platform": null,
        "createdAt": "2026-04-02 11:10:00",
        "updatedAt": "2026-04-02 11:10:00",
        "name": "shop-open-token",
        "description": "for shop open integration",
        "accessToken": "access_token_xxx",
        "refreshToken": "refresh_token_xxx",
        "type": null,
        "scope": [],
        "expiresAt": "2026-04-03T11:10:00+08:00",
        "permanent": false,
        "revoked": false,
        "revokeReason": null,
        "channel": "WEB",
        "device": "shop-system"
    }
}
```

#### 6.2 分页查询组织令牌

- Method: POST
- Path: /api/v1/shop/open/token/query/org
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/query/org
http://example.com/api/v1/shop/open/token/query/org
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "pageNumber": 0,
 "pageSize": 20
}
```

说明：

- `shopUid` 通过 query 参数传递，例如：`/api/v1/shop/open/token/query/org?shopUid=shop_demo_005`

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "content": [
   {
    "uid": "token_uid_xxx",
    "userUid": "user_xxx",
    "orgUid": "org_xxx",
    "level": null,
    "platform": null,
    "createdAt": "2026-04-02 11:10:00",
    "updatedAt": "2026-04-02 11:10:00",
    "name": "shop-open-token",
    "description": "for shop open integration",
    "accessToken": "access_token_xxx",
    "refreshToken": "refresh_token_xxx",
    "type": null,
    "scope": [],
    "expiresAt": "2026-04-03T11:10:00+08:00",
    "permanent": false,
    "revoked": false,
    "revokeReason": null,
    "channel": "WEB",
    "device": "shop-system"
   }
  ],
  "pageable": {
   "pageNumber": 0,
   "pageSize": 20,
   "offset": 0,
   "paged": true,
   "unpaged": false,
   "sort": {
    "empty": true,
    "sorted": false,
    "unsorted": true
   }
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 1,
  "size": 20,
  "number": 0,
  "sort": {
   "empty": true,
   "sorted": false,
   "unsorted": true
  },
  "first": true,
  "numberOfElements": 1,
  "empty": false
 }
}
```

#### 6.3 分页查询用户令牌

- Method: POST
- Path: /api/v1/shop/open/token/query/user
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/query/user
http://example.com/api/v1/shop/open/token/query/user
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "userUid": "user_xxx",
 "pageNumber": 0,
 "pageSize": 20
}
```

说明：

- 推荐通过 query 参数传 `shopUid`，例如：`/api/v1/shop/open/token/query/user?shopUid=shop_demo_005`

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "content": [
   {
    "uid": "token_uid_xxx",
    "userUid": "user_xxx",
    "orgUid": "org_xxx",
    "level": null,
    "platform": null,
    "createdAt": "2026-04-02 11:10:00",
    "updatedAt": "2026-04-02 11:10:00",
    "name": "shop-open-token",
    "description": "for shop open integration",
    "accessToken": "access_token_xxx",
    "refreshToken": "refresh_token_xxx",
    "type": null,
    "scope": [],
    "expiresAt": "2026-04-03T11:10:00+08:00",
    "permanent": false,
    "revoked": false,
    "revokeReason": null,
    "channel": "WEB",
    "device": "shop-system"
   }
  ],
  "pageable": {
   "pageNumber": 0,
   "pageSize": 20,
   "offset": 0,
   "paged": true,
   "unpaged": false,
   "sort": {
    "empty": true,
    "sorted": false,
    "unsorted": true
   }
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 1,
  "size": 20,
  "number": 0,
  "sort": {
   "empty": true,
   "sorted": false,
   "unsorted": true
  },
  "first": true,
  "numberOfElements": 1,
  "empty": false
 }
}
```

#### 6.4 按 uid 查询令牌

- Method: GET
- Path: /api/v1/shop/open/token/detail
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/detail
http://example.com/api/v1/shop/open/token/detail
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

Query：

```text
uid=token_uid_xxx
```

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "uid": "token_uid_xxx",
  "userUid": "user_xxx",
  "orgUid": "org_xxx",
  "level": null,
  "platform": null,
  "createdAt": "2026-04-02 11:10:00",
  "updatedAt": "2026-04-02 11:10:00",
  "name": "shop-open-token",
  "description": "for shop open integration",
  "accessToken": "access_token_xxx",
  "refreshToken": "refresh_token_xxx",
  "type": null,
  "scope": [],
  "expiresAt": "2026-04-03T11:10:00+08:00",
  "permanent": false,
  "revoked": false,
  "revokeReason": null,
  "channel": "WEB",
  "device": "shop-system"
 }
}
```

#### 6.5 更新令牌

- Method: POST
- Path: /api/v1/shop/open/token/update
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/update
http://example.com/api/v1/shop/open/token/update
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

请求示例：

```json
{
 "uid": "token_uid_xxx",
 "name": "updated-token-name",
 "description": "updated description"
}
```

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "uid": "token_uid_xxx",
  "userUid": "user_xxx",
  "orgUid": "org_xxx",
  "level": null,
  "platform": null,
  "createdAt": "2026-04-02 11:10:00",
  "updatedAt": "2026-04-02 11:20:00",
  "name": "updated-token-name",
  "description": "updated description",
  "accessToken": "access_token_xxx",
  "refreshToken": "refresh_token_xxx",
  "type": null,
  "scope": [],
  "expiresAt": "2026-04-03T11:10:00+08:00",
  "permanent": false,
  "revoked": false,
  "revokeReason": null,
  "channel": "WEB",
  "device": "shop-system"
 }
}
```

#### 6.6 删除令牌

- Method: POST
- Path: /api/v1/shop/open/token/delete
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/delete
http://example.com/api/v1/shop/open/token/delete
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

Query：

```text
uid=token_uid_xxx
```

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": true
}
```

#### 6.7 刷新 AccessToken

- Method: POST
- Path: /api/v1/shop/open/token/refresh
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/refresh
http://example.com/api/v1/shop/open/token/refresh
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

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

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": {
  "uid": "token_uid_xxx",
  "userUid": "user_xxx",
  "orgUid": "org_xxx",
  "level": null,
  "platform": null,
  "createdAt": "2026-04-02 11:10:00",
  "updatedAt": "2026-04-02 11:30:00",
  "name": "shop-open-token",
  "description": "for shop open integration",
  "accessToken": "new_access_token_xxx",
  "refreshToken": "refresh_token_xxx",
  "type": null,
  "scope": [],
  "expiresAt": "2026-04-03T11:30:00+08:00",
  "permanent": false,
  "revoked": false,
  "revokeReason": null,
  "channel": "WEB",
  "device": "shop-system"
 }
}
```

#### 6.8 撤销令牌

- Method: POST
- Path: /api/v1/shop/open/token/revoke
- 地址示例：

```text
http://127.0.0.1:9003/api/v1/shop/open/token/revoke
http://example.com/api/v1/shop/open/token/revoke
```

说明：请将示例中的服务器地址替换为你自己的服务器 IP 或域名。

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

返回示例：

```json
{
 "message": "success",
 "code": 200,
 "data": true
}
```
