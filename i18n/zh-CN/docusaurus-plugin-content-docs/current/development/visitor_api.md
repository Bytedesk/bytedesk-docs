---
sidebar_label: 访客管理接口
sidebar_position: 6
---

# 访客管理接口

:::tip 提示
本页描述的是后台访客资料管理接口，主要用于管理端查询、维护访客数据，不等于前端匿名访客直接发起会话时使用的 SDK 参数说明。
:::

## 概述

访客管理接口由 `VisitorRestController` 提供，基础路径为：

- `/api/v1/visitor`

这里的“访客”对应 `VisitorEntity`，主要用于承载会话侧身份资料。

典型特点：

- 默认无需登录即可在前端会话中出现
- 不参与后台角色与权限体系
- 不会被赋予管理员、客服、主管等角色
- 但在管理端仍然可以被查询、更新、导出

## 鉴权说明

虽然访客本身默认无需登录，但本页接口是后台管理接口，调用方仍需具备后台权限。

先通过登录接口获取 accessToken：

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

后续请求头：

```http
Authorization: Bearer {accessToken}
```

## 权限模型

`VisitorRestController` 使用以下统一权限：

- `VISITOR_READ`
- `VISITOR_CREATE`
- `VISITOR_UPDATE`
- `VISITOR_DELETE`
- `VISITOR_EXPORT`

接口权限对应关系：

- 查询：`VISITOR_READ`
- 按 `visitorUid` 查询：`VISITOR_READ`
- 创建：`VISITOR_CREATE`
- 更新：`VISITOR_UPDATE`
- 更新标签：`VISITOR_UPDATE`
- 删除：`VISITOR_DELETE`
- 导出：`VISITOR_EXPORT`

## 请求模型

访客请求对象为 `VisitorRequest`，继承 `BaseRequest`。

常用公共字段：

- `uid`：系统记录 uid
- `orgUid`：组织 uid
- `userUid`：用户 uid
- `type`：会话类型路由值
- `pageNumber`：页码，从 `0` 开始
- `pageSize`：分页大小，默认 `10`
- `sortBy`：排序字段
- `sortDirection`：`asc` 或 `desc`
- `searchText`：搜索关键字

访客特有字段：

- `visitorUid`：外部业务访客标识
- `nickname`：昵称
- `avatar`：头像
- `lang`：语言
- `browser`：浏览器
- `os`：操作系统
- `device`：设备
- `mobile`：手机号
- `email`：邮箱
- `note`：备注
- `sid`：会话接入标识
- `topic`：会话主题
- `callType`：接入意图，支持文本/音视频/电话
- `forceAgent`：是否强制转人工
- `status`：访客状态
- `tagList`：标签列表
- `customFieldList`：自定义字段列表
- `goodsInfo`：商品信息 JSON
- `orderInfo`：订单信息 JSON
- `extra`：扩展 JSON
- `referrer`：来源页面
- `url`：当前 URL
- `title`：当前页面标题
- `ip`：IP 地址
- `ipLocation`：IP 归属地
- `vipLevel`：会员等级
- `debug`：调试标记
- `draft`：草稿配置预览标记
- `settingsUid`：配置 uid
- `forceNewThread`：是否强制新建会话

## 返回结构

接口统一返回 `JsonResult`：

```json
{
 "message": "success",
 "code": 200,
 "data": {}
}
```

## 核心接口

### 1. 按组织分页查询访客

- `GET /api/v1/visitor/query/org`
- 权限：`VISITOR_READ`

常用查询参数：

- `orgUid`：必填
- `pageNumber`
- `pageSize`
- `searchText`
- `status`
- `visitorUid`

### 2. 按用户维度分页查询访客

- `GET /api/v1/visitor/query`
- 权限：`VISITOR_READ`

### 3. 按 uid 查询访客详情

- `GET /api/v1/visitor/query/uid`
- 权限：`VISITOR_READ`

查询参数：

- `uid`：系统记录 uid
- `orgUid`：建议传入

### 4. 按 visitorUid 查询访客详情

- `GET /api/v1/visitor/query/visitorUid?orgUid={orgUid}&visitorUid={visitorUid}`
- 权限：`VISITOR_READ`

说明：

- 这是按业务侧访客主键查找访客的常用接口。
- 适合电商、会员、设备号等外部 id 反查。

### 5. 创建访客

- `POST /api/v1/visitor/create`
- 权限：`VISITOR_CREATE`
- `Content-Type: application/json`

请求体示例：

```json
{
 "orgUid": "org_xxx",
 "visitorUid": "member_1001",
 "nickname": "访客小明",
 "avatar": "https://example.com/avatar.jpg",
 "mobile": "13800000000",
 "email": "user@example.com",
 "channel": "WEB",
 "vipLevel": 2,
 "extra": "{\"memberLevel\":\"gold\"}"
}
```

说明：

- 这是创建会话侧访客资料，不会创建后台注册用户。

### 6. 更新访客

- `POST /api/v1/visitor/update`
- 权限：`VISITOR_UPDATE`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "visitor_record_uid",
 "orgUid": "org_xxx",
 "nickname": "访客小明-VIP",
 "mobile": "13800000000",
 "email": "user@example.com",
 "vipLevel": 3,
 "note": "高价值客户"
}
```

### 7. 更新访客标签

- `POST /api/v1/visitor/update/tagList`
- 权限：`VISITOR_UPDATE`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "visitor_record_uid",
 "orgUid": "org_xxx",
 "tagList": ["VIP", "售后", "高价值"]
}
```

### 8. 删除访客

- `POST /api/v1/visitor/delete`
- 权限：`VISITOR_DELETE`
- `Content-Type: application/json`

```json
{
 "uid": "visitor_record_uid",
 "orgUid": "org_xxx"
}
```

### 9. 导出访客 Excel

- `GET /api/v1/visitor/export`
- 权限：`VISITOR_EXPORT`

当前导出字段包括：

- 昵称
- 手机号
- 邮箱
- 备注
- 客户端
- IP地址
- IP所在地
- 会员等级
- 创建时间

## 关键说明

- Visitor API 面向后台管理，不是前端匿名访客直接调用的聊天入口接口。
- 前端页面接入客服时，常见做法是直接通过 SDK 或 H5 参数传递 `visitorUid`、`nickname`、`avatar`、`goodsInfo`、`orderInfo`。
- 即使业务用户已经登录商城系统，在微语会话侧通常仍映射为 `VisitorEntity`，而不是 `UserEntity`。

## 对接建议

- 如果您的目标是“让商城会员进入客服会话”，优先用 Visitor 体系。
- 如果您的目标是“创建客服、管理员、运营账号”，请使用 User 体系。
- 不要把 `visitorUid` 误当成后台用户 `uid`。
