---
sidebar_label: MCP
sidebar_position: 10
---

# MCP

微语已经具备与 MCP（Model Context Protocol，模型上下文协议）相关的技术基础。MCP 的价值在于，让 AI agent 与外部工具、资源和服务之间通过统一协议进行互通，而不是依赖大量一次性的定制集成。

## 一、微语当前的 MCP 基础

从当前仓库可以确认，项目已经包含：

- enterprise AI 模块中的 MCP client/server 依赖
- Spring AI MCP client/server 配置项
- Swagger 中的 MCP Server 管理接口分组
- 后续对外开放微语 MCP 能力的规划

这说明 MCP 在微语中已经具备代码与配置基础，不只是未来设想。

## 二、MCP 适合解决什么问题

MCP 适用于以下方向：

- 将微语业务能力开放给外部 AI agent 调用
- 让微语内部 AI 工作流接入外部 MCP Server
- 用统一协议交换 tools、prompts 和 resources
- 降低微语与 agent 生态之间的定制集成成本

## 三、当前配置方向

项目中已经存在 Spring AI MCP 相关配置，例如：

- `spring.ai.mcp.client.enabled`
- `spring.ai.mcp.server.enable`
- `spring.ai.mcp.server.type`
- `spring.ai.mcp.server.stdio`

这意味着微语已经朝着“既能作为 MCP Client，也能作为 MCP Server”的架构方向在布局。

## 四、与其它能力页的关系

- [工具](./tools) 关注 AI 工作流内部可调用的执行能力。
- [技能](./skills) 关注可复用的工作流知识与能力包。
- MCP 则更偏向微语与外部 agent 生态之间的协议互通层。

## 五、总结

微语已经拥有较明确的 MCP 技术基础。随着这部分能力继续完善，MCP 会成为微语对外开放 AI 能力、接入外部 agent 生态和构建标准化智能工作流的重要路径。
