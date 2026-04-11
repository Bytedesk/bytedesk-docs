---
sidebar_label: 客服坐席
sidebar_position: 66
---

# 客服坐席

微语客服系统支持通过客服坐席来约束租户可用的客服账号数量，并将坐席有效期与 客服工作台 登录拦截联动起来。开启后，系统会把客服账号与具体坐席绑定，坐席过期时自动禁止继续使用。

## 功能概览

- 客服账号创建时自动尝试绑定一个可用坐席
- 坐席支持设置过期时间，过期后自动失效
- 登录 客服工作台 时会校验当前客服绑定坐席是否已过期
- 坐席过期时弹出提示框，确认后自动退出登录
- 组织可同时通过 maxMembers 和 maxAgents 控制成员数、客服数上限
- 组织购买多少坐席，就最多只能分配多少正在生效的客服坐席

## Starter 开关

在 starter 配置中新增了以下开关：

```properties
bytedesk.service.agent-seat-enabled=false
```

当该配置为 false 时：

- 系统沿用原有的组织客服数量限制逻辑
- 创建客服时不会强制要求分配坐席
- 客服工作台 不会启用基于坐席的登录过期拦截

当该配置为 true 时：

- 创建客服时必须存在可分配的有效坐席
- 客服会与 AgentSeatEntity 建立绑定关系
- 客服工作台 登录后会校验当前 agentseat 的 expireAt，已过期则阻止继续使用

## Docker Compose 配置

如果通过 Docker Compose 部署，可以在 bytedesk 服务的 environment 中添加如下配置：

```yaml
services:
 bytedesk:
  environment:
   BYTEDESK_SERVICE_AGENT_SEAT_ENABLED: "false"
```

说明：

- `"false"` 表示默认关闭客服坐席约束，系统仍按组织的 `maxAgents` 等基础容量规则运行
- 改为 `"true"` 后，才会启用坐席绑定、坐席数量限制以及登录时的坐席有效期校验
- 在仓库示例配置 [deploy/docker/compose-app-bytedesk.yaml](https://github.com/Bytedesk/bytedesk/blob/bytedesk-1.x/deploy/docker/compose-app-bytedesk.yaml) 中，该项默认值也是 `"false"`

## 业务规则

### 1. 坐席与客服绑定

创建 AgentEntity 时，系统会优先检查组织的客服上限和坐席可用数量。只有存在未分配且未过期的坐席时，才允许新建客服，并自动写入：

- assignedAgentUid
- assignedMemberUid
- assignedAt

删除客服或释放坐席时，会自动解除绑定。

### 2. 坐席过期处理

当坐席 expireAt 早于当前时间时，系统会将坐席状态刷新为 EXPIRED，并联动执行：

- 禁用对应客服账号
- 标记客服强制下线
- 从组织成员关系中移除已占用成员
- 客服工作台 登录初始化时拦截该客服继续使用

### 3. 组织容量控制

OrganizationEntity 中已经提供以下容量字段：

- maxMembers：限制 MemberEntity 数量
- maxAgents：限制 AgentEntity 数量
- maxWorkgroups：限制工作组数量

其中：

- MemberEntity 的创建数量由 maxMembers 控制
- AgentEntity 的创建数量由 maxAgents 控制
- 当启用坐席功能时，客服数量还会额外受“有效坐席数量”约束

## 客服工作台 登录行为

客服工作台 客服端在登录并完成组织初始化后，会主动查询当前客服绑定的 agentseat：

- 如果 agentseat 的 expireAt 已过期，弹出“客服坐席已过期”提示框
- 用户点击确定后，自动执行退出登录
- 如果是其他强制下线场景，则继续沿用原有的强制下线弹窗

这样可以保证客服即使在坐席过期后的首次登录阶段，也不会绕过坐席有效期校验。

## 适用场景

- SaaS 租户按坐席数购买客服能力
- 企业客户按到期时间续费客服坐席
- 多租户环境下按组织精确限制成员数与客服数
- 需要把后台授权、客服坐席 生命周期、客服工作台 登录控制打通的客服系统
