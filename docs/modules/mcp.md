---
title: MCP服务
description: 通过 Model Context Protocol 向第三方智能体开放微语能力
sidebar_position: 6
---

## 概述

MCP服务用于将微语服务器能力开放给第三方智能体和MCP客户端。启用后，外部工具可以通过标准MCP协议连接微语服务器，发现可用工具，并在权限允许范围内查询客服、知识库、工单、订单、呼叫中心等业务数据。

当前实现已可用于第一期对外接入：已接入Spring AI MCP Server，支持注册现有Spring AI `@Tool`，默认只开放只读查询类工具，同时通过写工具白名单额外放行 `bytedeskTicketCreate`，并通过Bearer Token保护MCP入口。

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

bytedesk.ai.mcp.tools.enabled=true
bytedesk.ai.mcp.tools.read-only=true
bytedesk.ai.mcp.tools.write-allow-names=bytedeskTicketCreate
```

## 当前开放工具

第一期对外稳定开放两个工具：

- `bytedeskKnowledgeSearch`：查询知识库，返回适合智能体消费的结构化检索结果
- `bytedeskTicketCreate`：创建工单，适合在客服、售后、值班场景中挂单

知识库查询输入示例：

```json
{
 "query": "退款流程",
 "orgUid": "org_xxx",
 "kbUid": "kb_xxx",
 "topK": 5,
 "searchType": "MIXED",
 "sourceType": "FAQ"
}
```

工单创建输入示例：

```json
{
 "orgUid": "org_xxx",
 "reporterUid": "user_xxx",
 "reporterNickname": "张三",
 "title": "支付回调失败",
 "description": "生产环境回调接口返回500",
 "priority": "HIGH",
 "type": "BUG"
}
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
bytedesk.ai.mcp.tools.write-allow-names=bytedeskTicketCreate
```

`allow-names`为空时表示允许所有通过包名、只读规则和排除规则筛选后的工具；填写后只暴露名单中的工具。`deny-names`用于紧急屏蔽指定工具。

`write-allow-names`用于在`read-only=true`时额外开放明确允许的写工具。当前第一期建议只保留：

```properties
bytedesk.ai.mcp.tools.write-allow-names=bytedeskTicketCreate
```

如果只想开放AI模块，可以将`include-packages`收窄为：

```properties
bytedesk.ai.mcp.tools.include-packages=com.bytedesk.ai
```

## Claude Code 接入示例

以下示例基于支持 `mcpServers` 与 SSE 传输的客户端版本，核心信息是：

- 地址：`http://127.0.0.1:9003/sse`
- 请求头：`Authorization: Bearer <token>`

```json
{
 "mcpServers": {
  "bytedesk": {
   "transport": {
    "type": "sse",
    "url": "http://127.0.0.1:9003/sse",
    "headers": {
     "Authorization": "Bearer ${BYTEDESK_MCP_BEARER_TOKEN}"
    }
   }
  }
 }
}
```

连接成功后，Claude Code 应能发现：

- `bytedeskKnowledgeSearch`
- `bytedeskTicketCreate`

## Codex 接入示例

如果Codex环境也使用 `mcpServers` 配置结构，可以直接复用同一份配置：

```json
{
 "mcpServers": {
  "bytedesk": {
   "transport": {
    "type": "sse",
    "url": "http://127.0.0.1:9003/sse",
    "headers": {
     "Authorization": "Bearer ${BYTEDESK_MCP_BEARER_TOKEN}"
    }
   }
  }
 }
}
```

如果你的Codex运行器要求单独填写连接参数，可按下面映射：

- transport: `sse`
- url: `http://127.0.0.1:9003/sse`
- header `Authorization`: `Bearer <token>`

## CLI 调用示例

CLI 第一版不直接调用 MCP，而是继续通过 HTTP API 调用同一套后端能力。

登录并切换组织：

```bash
java -jar starter/target/bytedesk-starter.jar cli auth login \
 --server http://127.0.0.1:9003 \
 --username admin@email.com \
 --password your-password

java -jar starter/target/bytedesk-starter.jar cli org switch --org your-org-uid
```

查询知识库：

```bash
java -jar starter/target/bytedesk-starter.jar cli knowledge search \
 --query "退款流程" \
 --kb your-kb-uid \
 --search-type MIXED \
 --source-type FAQ \
 --topk 5
```

创建工单：

```bash
java -jar starter/target/bytedesk-starter.jar cli ticket create \
 --title "支付回调失败" \
 --description "生产环境回调接口返回500" \
 --priority HIGH \
 --type BUG
```

脚本场景可使用 JSON 输出：

```bash
java -jar starter/target/bytedesk-starter.jar cli --format=json knowledge search \
 --query "退款流程" \
 --kb your-kb-uid
```

## curl 测试样例

`curl` 更适合做连通性、鉴权和 HTTP API 对照验证；真正的 MCP 工具发现与调用，仍建议使用支持 MCP 的客户端。

1. 验证未带 Token 会被拒绝：

```bash
curl -i -N http://127.0.0.1:9003/sse
```

期望结果：返回 `401` 或鉴权失败响应。

1. 验证带 Token 后可以建立 SSE 连接：

```bash
curl -i -N \
 -H "Accept: text/event-stream" \
 -H "Authorization: Bearer $BYTEDESK_MCP_BEARER_TOKEN" \
 http://127.0.0.1:9003/sse
```

期望结果：HTTP 状态为 `200`，并持续保持 SSE 连接。

1. 使用管理端 Access Token 直接调用知识搜索 HTTP 入口：

```bash
curl -X POST http://127.0.0.1:9003/api/v1/ai/kbase/search \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
 -d '{
   "query": "退款流程",
   "orgUid": "org_xxx",
   "kbUid": "kb_xxx",
   "topK": 5,
   "searchType": "MIXED",
   "sourceType": "FAQ"
 }'
```

1. 使用管理端 Access Token 直接创建工单：

```bash
curl -X POST http://127.0.0.1:9003/api/v1/ticket/create \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
 -d '{
   "orgUid": "org_xxx",
   "title": "支付回调失败",
   "description": "生产环境回调接口返回500",
   "priority": "HIGH",
   "type": "BUG",
   "reporter": {
     "uid": "user_xxx",
     "nickname": "张三",
     "type": "USER"
   }
 }'
```

如果只想检查 CLI 路径是否等价，可以先用 `auth login` 拿到 Access Token，再对比：

- CLI：`bytedesk knowledge search`
- HTTP：`POST /api/v1/ai/kbase/search`
- CLI：`bytedesk ticket create`
- HTTP：`POST /api/v1/ticket/create`

## 安全建议

- 默认保持MCP关闭。
- 保持`read-only=true`，只通过`write-allow-names`显式开放必要写工具。
- Bearer Token必须通过环境变量或外部配置注入，不要提交到代码仓库。
- 写操作必须先接入权限控制和审计；当前工单创建已进入白名单，但不建议继续扩大写工具范围。
- 工具响应中不要返回密码、Token、License、内部配置等敏感字段。

## 常见问题

- 连接不到工具：先确认 `spring.ai.mcp.server.enabled=true`
- 401 或未授权：确认 Bearer Token 与 `bytedesk.ai.mcp.auth.bearer-token` 一致
- 发现不到 `bytedeskTicketCreate`：确认 `bytedesk.ai.mcp.tools.write-allow-names=bytedeskTicketCreate`
- 知识库无结果：确认 `orgUid` 与 `kbUid` 正确，并检查知识库是否已有FAQ或向量索引
- CLI 创建工单失败：先执行 `auth login` 或 `auth whoami`，确保本地已缓存当前用户身份和当前组织
