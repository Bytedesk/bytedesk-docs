---
sidebar_label: 注册用户接口
sidebar_position: 5
---

# 注册用户接口

:::tip 提示
本页描述的是后台注册用户 `UserEntity` 的管理接口，不是前端访客会话接口。
:::

## 概述

用户管理接口由 `UserRestController` 提供，基础路径为：

- `/api/v1/user`

这里的“用户”指系统后台账号，对应 `UserEntity`。

典型角色包括：

- 超级管理员
- 管理员
- 客服
- 主管
- 运营人员

这些用户：

- 需要登录
- 可以加入组织
- 可以分配角色和权限
- 可以访问后台工作台和管理端 API

如果您的目标是前端会话中的访客身份，请改看 [visitor_info.md](../development/visitor_info.md) 和 [visitor_api.md](../development/visitor_api.md)。

## 鉴权说明

先调用登录接口获取 accessToken：

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

成功后从响应体中取 `data.accessToken`，后续接口在请求头中携带：

```http
Authorization: Bearer {accessToken}
```

## 权限模型

`UserRestController` 同时使用角色控制和权限控制：

- 角色判断：`ROLE_SUPER`、`ROLE_ADMIN`
- 权限判断：`USER_READ`、`USER_CREATE`、`USER_UPDATE`、`USER_DELETE`、`USER_EXPORT`

当前主要限制如下：

- 按组织查询：`ROLE_SUPER`
- 创建用户：`ROLE_SUPER`
- 更新用户：`USER_UPDATE` 或 `ROLE_SUPER`
- 删除用户：`ROLE_SUPER`
- 导出用户：`ROLE_SUPER`
- 获取个人资料：`USER_READ` 或 `ROLE_SUPER`
- 获取组织列表：`USER_READ` 或 `ROLE_SUPER`
- 切换当前组织：`USER_READ` 或 `ROLE_SUPER`
- 管理员修改子成员密码：`ROLE_ADMIN`

说明：

- 某些未显式标注 `@PreAuthorize` 的接口，仍可能受全局认证配置约束。
- 实际访问能力以系统当前安全配置为准。

## 请求模型

用户请求对象为 `UserRequest`，继承 `BaseRequest`。

常用公共字段：

- `uid`：系统记录 uid
- `orgUid`：组织 uid
- `userUid`：用户 uid
- `pageNumber`：页码，从 `0` 开始
- `pageSize`：分页大小，默认 `10`
- `sortBy`：排序字段
- `sortDirection`：`asc` 或 `desc`
- `searchText`：搜索关键字

用户特有字段：

- `num`：用户编号
- `username`：登录用户名
- `nickname`：昵称
- `password`：密码
- `oldPassword`：旧密码
- `newPassword`：新密码
- `email`：邮箱
- `country`：国家码
- `mobile`：手机号
- `code`：验证码
- `avatar`：头像
- `description`：描述
- `sex`：性别
- `enabled`：是否启用
- `emailVerified`：邮箱是否已验证
- `mobileVerified`：手机是否已验证
- `registerSource`：注册来源
- `captchaUid`：验证码 uid
- `captchaCode`：验证码内容
- `currentOrganization`：当前组织名称搜索字段
- `roleUids`：角色 uid 列表

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

## 核心接口

### 1. 按组织分页查询注册用户

- `GET /api/v1/user/query/org`
- 权限：`ROLE_SUPER`

常用查询参数：

- `orgUid`：建议传入
- `pageNumber`
- `pageSize`
- `searchText`

### 2. 按当前用户维度查询用户列表

- `GET /api/v1/user/query`

说明：

- 该接口由控制器开放，但未在方法上显式声明 `@PreAuthorize`。
- 是否可调用仍取决于系统认证配置。

### 3. 按 uid 查询用户详情

- `GET /api/v1/user/query/uid`

查询参数：

- `uid`：必填
- `orgUid`：建议传入

### 4. 创建注册用户

- `POST /api/v1/user/create`
- 权限：`ROLE_SUPER`
- `Content-Type: application/json`

请求体示例：

```json
{
 "orgUid": "org_xxx",
 "username": "agent_zhangsan",
 "nickname": "张三",
 "password": "StrongPassword123",
 "email": "zhangsan@example.com",
 "mobile": "13800000000",
 "enabled": true,
 "registerSource": "ADMIN",
 "roleUids": ["role_agent_uid"]
}
```

说明：

- 这是创建后台账号，不是创建访客。
- 创建后是否具备管理员、客服等能力，还取决于分配的角色。

### 5. 更新注册用户

- `POST /api/v1/user/update`
- 权限：`USER_UPDATE` 或 `ROLE_SUPER`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "user_xxx",
 "orgUid": "org_xxx",
 "nickname": "张三-客服",
 "email": "zhangsan@example.com",
 "mobile": "13800000000",
 "enabled": true,
 "roleUids": ["role_agent_uid", "role_admin_uid"]
}
```

### 6. 删除注册用户

- `POST /api/v1/user/delete`
- 权限：`ROLE_SUPER`
- `Content-Type: application/json`

```json
{
 "uid": "user_xxx",
 "orgUid": "org_xxx"
}
```

### 7. 导出用户 Excel

- `GET /api/v1/user/export`
- 权限：`ROLE_SUPER`

当前导出字段包括：

- 用户名
- 昵称
- 邮箱
- 手机
- 描述

### 8. 获取当前登录用户资料

- `GET /api/v1/user/profile`
- 权限：`USER_READ` 或 `ROLE_SUPER`

用途：

- 获取当前登录账号自己的基础资料
- 前端初始化后台个人中心

### 9. 获取当前用户所属组织列表

- `GET /api/v1/user/organizations`
- 权限：`USER_READ` 或 `ROLE_SUPER`

用途：

- 前端组织切换下拉框
- 多组织账号切换当前工作组织

### 10. 切换当前组织

- `POST /api/v1/user/switch/organization`
- 权限：`USER_READ` 或 `ROLE_SUPER`
- `Content-Type: application/json`

请求体示例：

```json
{
 "orgUid": "org_target_xxx"
}
```

说明：

- 切换后会同步当前组织及当前角色集合。

### 11. 用户自己修改密码

- `POST /api/v1/user/change/password`
- `Content-Type: application/json`

请求体示例：

```json
{
 "oldPassword": "OldPassword123",
 "newPassword": "NewPassword456"
}
```

### 12. 管理员修改子成员密码

- `POST /api/v1/user/admin/change/password`
- 权限：`ROLE_ADMIN`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "user_xxx",
 "newPassword": "ResetPassword456"
}
```

### 13. 修改邮箱

- `POST /api/v1/user/change/email`
- `Content-Type: application/json`

请求体示例：

```json
{
 "email": "newmail@example.com",
 "code": "123456"
}
```

说明：

- 控制器会先校验邮箱验证码。

### 14. 修改手机号

- `POST /api/v1/user/change/mobile`
- `Content-Type: application/json`

请求体示例：

```json
{
 "mobile": "13900000000",
 "code": "123456"
}
```

说明：

- 控制器会先校验手机验证码。

### 15. 登出

- `POST /api/v1/user/logout`

说明：

- 从请求头中解析 accessToken
- 若 accessToken 为空，会返回错误

## 对接建议

- User API 用于后台账号管理，不适合前端匿名访客直接调用。
- 业务系统中的登录会员，如果只是进入客服会话，优先映射为 `VisitorEntity`，不要误用 User API。
- 只有需要登录后台、分配角色、参与权限控制时，才应使用 User API 创建或维护账号。
