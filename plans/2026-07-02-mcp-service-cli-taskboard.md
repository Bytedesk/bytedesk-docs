# 微语 MCP 服务与 CLI 执行看板

更新时间：2026-07-02
关联详版方案：mcp-service-cli-implementation-plan-20260702.md

## 0. 决策确认

- [x] 知识库第一版使用语义检索 / 混合检索输出，不做纯文章分页搜索
- [ ] 工单创建第一版只开放最小字段集
- [x] CLI 第一版继续走 HTTP API，不改成 MCP client
- [x] 对外工具名采用 bytedeskKnowledgeSearch / bytedeskTicketCreate

## 1. MVP 范围

### 1.1 MCP

- [x] 暴露知识库查询工具
- [x] 暴露工单创建工具
- [ ] Bearer Token 鉴权生效
- [x] 写工具仅白名单放行
- [x] 增加 MCP 调用审计日志

### 1.2 CLI

- [x] 实现 knowledge search 命令
- [ ] 复核 ticket create / get / list 命令
- [ ] 支持 text/json 两种输出

### 1.3 文档

- [x] Claude Code 接入示例
- [x] Codex 接入示例
- [x] CLI 使用说明
- [x] MCP 工具输入输出示例

## 2. 后端任务拆解

### 2.1 MCP DTO 与工具层

- [x] 新增外部 MCP 专用工具类
路径建议：modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskExternalMcpTools.java

- [x] 新增知识库查询请求 DTO
- [x] 新增知识库查询响应 DTO
- [x] 新增知识库结果项 DTO
- [x] 新增工单创建请求 DTO
- [x] 新增工单创建响应 DTO

验收：

- [ ] 工具返回结构化对象，不直接暴露内部 Entity
- [ ] 工具名稳定、描述清晰、便于 Agent 理解

### 2.2 知识库工具实现

- [x] 复用 KnowledgeBaseSearchHelper
- [x] 支持 query / orgUid / kbUid / topK / searchType / sourceType
- [x] 默认 topK=5
- [x] 限制最大 topK
- [x] 对 content 做长度截断
- [x] 对空结果返回统一结构
- [x] 对非法参数返回明确错误

验收：

- [x] 可返回知识条目和来源信息
- [x] sourceType 过滤生效
- [x] topK 生效

### 2.3 工单工具实现

- [x] 复用 TicketRestService / TicketRequest
- [x] 只映射允许字段
- [x] 校验 orgUid / title / description
- [ ] 校验 email / phone / priority / type 的合法性
- [x] 返回 uid / ticketNumber / status / createdAt 等关键字段

验收：

- [ ] 可成功创建工单
- [ ] 不暴露复杂工作流字段
- [ ] 错误输入有明确提示

## 3. MCP 安全与开放策略

### 3.1 工具暴露控制

- [x] 在现有默认只读策略基础上增加写工具白名单
- [ ] 保持 deny-names 优先级最高
- [x] 确保只有 bytedeskTicketCreate 被额外放行

建议修改：

- [ ] modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolConfiguration.java
- [ ] modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolProperties.java

验收：

- [x] bytedeskTicketCreate 可见
- [ ] 其它 Create 工具默认不可见

### 3.2 鉴权控制

- [ ] Bearer Token 未配置时拒绝访问
- [ ] Bearer Token 错误时拒绝访问
- [ ] 日志中不打印明文 token

建议检查：

- [ ] modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpBearerTokenFilter.java
- [ ] starter/src/main/resources/properties/local/75-mcp.properties
- [ ] starter/src/main/resources/properties/open/75-mcp.properties
- [ ] starter/src/main/resources/properties/prod/75-mcp.properties
- [ ] starter/src/main/resources/properties/noai/75-mcp.properties

### 3.3 审计日志

- [ ] 记录 toolName
- [ ] 记录 orgUid
- [ ] 记录 requestId
- [ ] 记录 success/failure
- [ ] 记录耗时
- [ ] 记录错误摘要

验收：

- [ ] 每次 MCP 调用都可追踪

## 4. CLI 任务拆解

### 4.1 knowledge 命令落地

- [x] 新增 KnowledgeCommand
路径建议：modules/cli/src/main/java/com/bytedesk/cli/command/KnowledgeCommand.java

- [x] 替换 BytedeskCli 中 knowledge 占位命令
- [x] 支持 --query
- [x] 支持 --org
- [x] 支持 --kb
- [x] 支持 --topk
- [x] 支持 --search-type
- [x] 支持 --source-type
- [x] 支持 --format=json

验收：

- [x] 命令可返回知识库结果
- [x] 文本输出适合人工阅读
- [x] JSON 输出适合脚本处理

### 4.2 ticket 命令复核

- [x] 验证 create 入参是否与后端当前接口一致
- [x] 验证 orgUid 来源逻辑
- [x] 完善错误提示
- [ ] 复核 list/get/close 的返回展示

验收：

- [ ] 登录后可以直接创建工单
- [ ] 未配置 orgUid 时提示明确

### 4.3 CLI 帮助与示例

- [ ] 更新 help 输出
- [ ] 增加 knowledge search 示例
- [ ] 增加 ticket create 示例
- [ ] 增加 auth login / config set 示例

## 5. 文档任务拆解

### 5.1 MCP 模块文档

- [x] 更新 MCP 模块说明
- [x] 补充“当前开放工具”章节
- [x] 补充 Bearer Token 配置说明
- [x] 补充写工具白名单说明

### 5.2 接入文档

- [x] 增加 Claude Code 配置示例
- [x] 增加 Codex 配置示例
- [x] 增加 curl 测试样例
- [x] 增加 CLI 命令样例

### 5.3 常见问题

- [ ] token 错误
- [ ] 工具发现不到
- [ ] orgUid 缺失
- [ ] 知识库无结果
- [ ] 工单创建失败

## 6. 测试清单

### 6.1 编译测试

- [x] 编译 modules/ai
- [x] 编译 modules/cli
- [ ] 编译 starter

建议命令：

- [ ] ./starter/mvnw -f pom.xml -pl modules/ai -am -DskipTests compile
- [ ] ./starter/mvnw -f pom.xml -pl modules/cli -am -DskipTests compile
- [ ] ./starter/mvnw -f pom.xml -pl starter -am -DskipTests compile

### 6.2 MCP 功能测试

- [ ] 能发现 bytedeskKnowledgeSearch
- [ ] 能发现 bytedeskTicketCreate
- [ ] 无 token 无法调用
- [ ] 错误 token 无法调用
- [ ] 正确 token 可调用
- [ ] 知识库查询返回正常
- [ ] 工单创建返回正常

### 6.3 CLI 功能测试

- [ ] bytedesk knowledge search 正常
- [ ] bytedesk ticket create 正常
- [ ] --format=json 正常
- [ ] 未登录时报错合理
- [ ] 未配置 server.base-url 时报错合理

### 6.4 文档验证

- [ ] 文档构建不报错
- [ ] Claude Code 示例可复现
- [ ] Codex 示例可复现

## 7. 提交建议

- [ ] 提交 1：MCP DTO + 知识库工具
- [ ] 提交 2：工单创建工具 + 写工具白名单
- [ ] 提交 3：审计日志 + 错误处理
- [ ] 提交 4：KnowledgeCommand + TicketCommand 调整
- [ ] 提交 5：文档与接入样例

## 8. 上线前检查

- [ ] MCP 默认不开启或仅在目标环境开启
- [ ] Bearer Token 使用环境变量注入
- [ ] 写工具白名单仅包含目标工具
- [ ] 审计日志可查
- [ ] 示例配置已脱敏

## 9. 回滚开关

- [ ] 清空写工具白名单即可关闭工单创建能力
- [ ] 必要时关闭 spring.ai.mcp.server.enabled
- [ ] CLI 不需要单独回滚

## 10. 完成定义

满足以下条件即可关闭本任务：

- [ ] Claude Code 可通过 MCP 查询知识库
- [ ] Claude Code 可通过 MCP 创建工单
- [ ] Codex 可通过 MCP 查询知识库
- [ ] Codex 可通过 MCP 创建工单
- [ ] CLI 可查询知识库
- [ ] CLI 可创建工单
- [ ] 未误开放其它写工具
- [ ] 文档可指导第三方独立接入
