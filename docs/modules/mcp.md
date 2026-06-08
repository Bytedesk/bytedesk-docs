---
title: MCP服务
description: 通过 Model Context Protocol 向第三方智能体开放微语能力
sidebar_position: 6
---

## 概述

MCP服务用于将微语服务器能力开放给第三方智能体和MCP客户端。启用后，外部工具可以通过标准MCP协议连接微语服务器，发现可用工具，并在权限允许范围内查询客服、知识库、工单、订单、呼叫中心等业务数据。

当前实现处于第一期：已接入Spring AI MCP Server，支持注册现有Spring AI `@Tool`，默认只开放只读查询类工具，并通过Bearer Token保护MCP入口。

## 启用方式

MCP默认关闭。需要外部智能体接入时，在独立MCP配置文件中开启：

```properties
spring.ai.mcp.server.enabled=true
bytedesk.ai.mcp.auth.bearer-token=${BYTEDESK_MCP_BEARER_TOKEN}
```

本地默认端口为`9003`，MCP客户端连接地址：

```text
http://127.0.0.1:9003/sse
```

请求需要携带：

```http
Authorization: Bearer <token>
```

如果开启MCP但未配置`bytedesk.ai.mcp.auth.bearer-token`，服务会拒绝MCP请求，避免误暴露接口。

## 配置文件

MCP配置已从AI批处理配置中拆分到独立文件：

- `starter/src/main/resources/properties/local/75-mcp.properties`
- `starter/src/main/resources/properties/noai/75-mcp.properties`
- `starter/src/main/resources/properties/open/75-mcp.properties`
- `starter/src/main/resources/properties/prod/75-mcp.properties`

核心配置：

```properties
spring.ai.mcp.server.enabled=false
spring.ai.mcp.server.name=bytedesk-mcp-server
spring.ai.mcp.server.type=SYNC
spring.ai.mcp.server.stdio=false
spring.ai.mcp.server.sse-message-endpoint=/mcp/message

bytedesk.ai.mcp.auth.enabled=true
bytedesk.ai.mcp.auth.bearer-token=
bytedesk.ai.mcp.auth.sse-endpoint=/sse
bytedesk.ai.mcp.auth.message-endpoint=/mcp/message
```

## 工具开放策略

默认扫描`com.bytedesk`包下已有的`@Tool`，但只开放查询类工具：

```properties
bytedesk.ai.mcp.tools.enabled=true
bytedesk.ai.mcp.tools.read-only=true
bytedesk.ai.mcp.tools.include-packages=com.bytedesk
bytedesk.ai.mcp.tools.allow-names=
bytedesk.ai.mcp.tools.deny-names=
bytedesk.ai.mcp.tools.read-only-include-pattern=.*(Query|Search|Find|Get|List|Count).*
bytedesk.ai.mcp.tools.exclude-pattern=.*(Create|Update|Delete|Remove|Cancel|Change|Optimize|Reset|Score|Set|Send).*
```

`allow-names`为空时表示允许所有通过包名、只读规则和排除规则筛选后的工具；填写后只暴露名单中的工具。`deny-names`用于紧急屏蔽指定工具。

如果只想开放AI模块，可以将`include-packages`收窄为：

```properties
bytedesk.ai.mcp.tools.include-packages=com.bytedesk.ai
```

## 安全建议

- 默认保持MCP关闭。
- 初期保持`read-only=true`。
- Bearer Token必须通过环境变量或外部配置注入，不要提交到代码仓库。
- 写操作必须先接入权限控制、审批和审计。
- 工具响应中不要返回密码、Token、License、内部配置等敏感字段。

## 后续规划

第二期会补充工具白名单、权限控制、审批、审计和后台管理能力，让管理员可以查看、启停和审计MCP工具。

第三期会补充语义型业务工具，例如查询客户档案、检索知识库、查询工单、查询订单、创建会话摘要、查询通话记录等，让第三方智能体可以更自然地调用微语完成业务操作。
