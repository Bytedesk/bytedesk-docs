---
sidebar_label: 管理端店铺信息对接
sidebar_position: 55
---

# 管理端店铺接口对接

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换 [licenseKey](../development/license.md)
:::

## 概述

店铺管理接口由 `ShopRestController` 提供，基础路径为：

- `/api/v1/shop`

当前支持的能力：

- 按组织分页查询店铺
- 按用户分页查询店铺
- 按 uid 查询店铺详情
- 创建、更新、删除店铺
- 导出店铺 Excel
- 初始化演示店铺数据

说明：

- 当前控制器未提供 Excel 导入接口。
- 若前端或外部系统需要批量建店，请使用业务侧脚本调用创建接口，或扩展后端批量导入能力。

## 鉴权说明

先登录获取 accessToken：

- `POST /auth/v1/login`
- `Content-Type: application/json`

```json
{
 "username": "admin@email.com",
 "password": "your_password",
 "channel": "FLUTTER",
 "platform": "BYTEDESK"
}
```

成功后从响应体中取 `data.accessToken`，后续请求头携带：

```http
Authorization: Bearer {accessToken}
```

`ShopRestController` 已显式添加权限控制，调用方需要具备对应权限：

- 查询：`SHOP_READ`
- 创建：`SHOP_CREATE`
- 更新：`SHOP_UPDATE`
- 删除：`SHOP_DELETE`
- 导出：`SHOP_EXPORT`
- 初始化演示数据：`SHOP_UPDATE`

## 通用请求约定

店铺请求对象继承 `BaseRequest`，常用公共字段如下：

- `uid`：系统记录 uid
- `orgUid`：组织 uid
- `userUid`：用户 uid
- `pageNumber`：页码，从 `0` 开始
- `pageSize`：分页大小，默认 `10`
- `sortBy`：排序字段
- `sortDirection`：`asc` 或 `desc`
- `searchText`：搜索关键字
- `startAt`：起始时间，ISO-8601
- `endAt`：结束时间，ISO-8601

店铺特有字段如下：

- `name`：店铺名称
- `shopUid`：业务店铺 uid
- `description`：描述
- `industry`：行业
- `phone`：联系电话
- `address`：地址
- `logo`：logo URL
- `businessHours`：营业时间文本
- `businessStartTime`：营业开始时间
- `businessEndTime`：营业结束时间
- `status`：店铺状态
- `billingType`：计费类型
- `expireAt`：到期时间，`ZonedDateTime`
- `renewalType`：续费方式
- `renewalAt`：续费时间，`ZonedDateTime`
- `enabled`：是否启用
- `detail`：详情
- `maxAgents`：最大客服数
- `agentUids`：绑定客服 uid 列表
- `workgroupUids`：绑定工作组 uid 列表

## 返回结构

接口统一返回 `JsonResult`：

```json
{
 "message": "success",
 "code": 200,
 "data": {}
}
```

失败时通常返回：

```json
{
 "message": "具体错误信息",
 "code": 500,
 "data": false
}
```

## 管理端接口

### 1. 按组织分页查询店铺

- `GET /api/v1/shop/query/org`
- 权限：`SHOP_READ`

常用查询参数：

- `orgUid`：必填
- `pageNumber`：可选，默认 `0`
- `pageSize`：可选，默认 `10`
- `searchText`：可选
- `status`：可选
- `enabled`：可选
- `industry`：可选

示例：

```http
GET /api/v1/shop/query/org?orgUid=org_xxx&pageNumber=0&pageSize=20&enabled=true
Authorization: Bearer {accessToken}
```

### 2. 按当前用户分页查询店铺

- `GET /api/v1/shop/query`
- 权限：`SHOP_READ`

常用查询参数：

- `orgUid`
- `userUid`
- `pageNumber`
- `pageSize`
- `searchText`

### 3. 按 uid 查询店铺详情

- `GET /api/v1/shop/query/uid`
- 权限：`SHOP_READ`

查询参数：

- `uid`：必填
- `orgUid`：建议传入

### 4. 创建店铺

- `POST /api/v1/shop/create`
- 权限：`SHOP_CREATE`
- `Content-Type: application/json`

请求体示例：

```json
{
 "orgUid": "org_xxx",
 "name": "华东旗舰店",
 "shopUid": "shop_huadong_001",
 "description": "华东区域旗舰店",
 "industry": "retail",
 "phone": "021-12345678",
 "address": "上海市浦东新区世纪大道 100 号",
 "logo": "https://example.com/logo.png",
 "businessHours": "周一至周日 09:00-21:00",
 "businessStartTime": "09:00",
 "businessEndTime": "21:00",
 "status": "ACTIVE",
 "billingType": "STANDARD",
 "enabled": true,
 "detail": "支持在线客服与工单",
 "maxAgents": 50,
 "agentUids": ["agent_001", "agent_002"],
 "workgroupUids": ["wg_001"]
}
```

### 5. 更新店铺

- `POST /api/v1/shop/update`
- 权限：`SHOP_UPDATE`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "shop_record_uid",
 "orgUid": "org_xxx",
 "name": "华东旗舰店升级版",
 "phone": "021-87654321",
 "enabled": true,
 "maxAgents": 80
}
```

### 6. 删除店铺

- `POST /api/v1/shop/delete`
- 权限：`SHOP_DELETE`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "shop_record_uid",
 "orgUid": "org_xxx"
}
```

### 7. 导出店铺 Excel

- `GET /api/v1/shop/export`
- 权限：`SHOP_EXPORT`

常用查询参数：

- `orgUid`：必填
- `exportAll`：可选
- 其他筛选参数与查询接口一致

返回说明：

- 成功时返回 Excel 文件流
- 文件名格式类似 `shop-20260313123000.xlsx`

当前导出列包括：

- 店铺名称
- 店铺UID
- 店铺类型
- 描述
- 行业
- 联系电话
- 地址
- Logo
- 营业时间
- 营业开始
- 营业结束
- 状态
- 计费类型
- 到期时间
- 续费方式
- 续费时间
- 是否启用
- 详情
- 最大客服数
- 创建时间
- 更新时间

### 8. 初始化演示店铺数据

- `POST /api/v1/shop/init/demo?orgUid={orgUid}`
- 权限：`SHOP_UPDATE`

说明：

- 用于重新生成组织下的演示店铺数据。
- 建议仅在开发、测试、演示环境使用。

## 接入建议

- 如果外部系统已经有店铺主数据，建议将其业务主键映射到 `shopUid`，不要只依赖系统生成的 `uid`。
- `expireAt` 和 `renewalAt` 为时区时间字段，建议统一传 ISO-8601，例如 `2026-03-13T10:20:00+08:00`。
- 如果需要实现批量导入，优先确认是否允许通过创建接口批量写入，再考虑扩展专门的导入控制器。
