# 微语 MCP 服务与 CLI 对接落地清单

更新时间：2026-07-02

## 1. 目标

对外提供微语 MCP 服务，支持第三方智能体通过标准 MCP 协议调用微语能力；第一期聚焦两个高价值能力：

1. 查询知识库
2. 创建工单

同时补齐 CLI 调用能力，满足以下三类接入方式：

1. Claude Code 通过 MCP 连接微语
2. Codex 通过 MCP 连接微语
3. 命令行用户通过 CLI 直接调用微语 HTTP API

本期目标不是开放“尽可能多”的全部接口，而是先以最小可用、权限可控、可审计的方式交付一个稳定 MVP。

## 2. 本期范围

### 2.1 包含范围

1. 新增对外 MCP 工具：知识库查询
2. 新增对外 MCP 工具：工单创建
3. 保持 MCP Bearer Token 鉴权机制
4. 增加 MCP 工具白名单放行策略
5. 增加 MCP 调用审计日志
6. 增加 CLI 知识库查询命令
7. 复用并完善 CLI 工单创建命令
8. 补充 Claude Code / Codex 接入示例
9. 补充使用文档、测试样例、验收清单

### 2.2 不包含范围

1. 不开放全量 Create/Update/Delete 工具
2. 不做 stdio 模式 MCP server 包装层
3. 不做后台界面上的 MCP 工具启停管理
4. 不做复杂审批流、二次确认流
5. 不做多知识源导入同步
6. 不在本期扩展更多业务工具，如客户查询、订单查询、呼叫中心查询

## 3. 现状判断

当前仓库已有以下基础能力，可直接复用：

1. MCP 服务注册框架已存在
路径：modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolConfiguration.java

2. MCP 默认只读策略已存在
路径：modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolProperties.java

3. MCP 文档已说明当前仅开放只读工具
路径：docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/modules/mcp.md

4. 知识库检索聚合能力已存在
路径：modules/ai/src/main/java/com/bytedesk/ai/service/KnowledgeBaseSearchHelper.java

5. 工单 HTTP 创建能力已存在
路径：modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRestController.java

6. CLI 主入口已存在
路径：starter/src/main/java/com/bytedesk/starter/StarterApplication.java

7. CLI HTTP 客户端与认证配置已存在
路径：modules/cli/src/main/java/com/bytedesk/cli/core/HttpApiClient.java

8. CLI 工单命令已部分实现
路径：modules/cli/src/main/java/com/bytedesk/cli/command/TicketCommand.java

9. CLI 知识库命令仍是占位实现
路径：modules/cli/src/main/java/com/bytedesk/cli/core/BytedeskCli.java

## 4. 关键架构决策

### 4.1 MCP 不直接开放全量通用 Create 工具

原因：

1. 当前仓库里很多 BaseTools 风格的 Create/Update/Delete 方法理论上都能暴露给 MCP
2. 如果直接放开 readOnly 限制，暴露面会过大
3. 本期只需要“知识库查询”和“工单创建”，不需要放出其它写能力

结论：

在 modules/ai 中新增一个“对外专用 MCP Tool Bean”，只注册明确允许的工具方法，不修改通用 CRUD 开放边界。

### 4.2 CLI 与 MCP 分层

CLI 第一版不直接调用 MCP，而是继续调用现有 HTTP API。

原因：

1. CLI 已有 HttpApiClient，可直接复用
2. 运维、脚本、批处理场景更适合稳定的 HTTP API
3. 避免为 CLI 再补一层 MCP client 适配，降低第一期复杂度

结论：

1. Claude Code / Codex：通过 MCP 接入
2. CLI：通过 HTTP API 接入

### 4.3 知识库第一版优先暴露“可直接消费的检索结果”

知识库有两条实现路线：

1. 文章列表搜索
2. 语义检索 / 混合检索 / 带来源结果

建议：

优先复用 KnowledgeBaseSearchHelper，返回更适合 Agent 使用的结构化结果，而不是单纯文章分页列表。

### 4.4 工单创建仅开放最小字段集

建议第一版对外只开放以下字段：

1. title
2. description
3. priority
4. type
5. workgroupUid
6. categoryUid
7. orgUid
8. contactName
9. phone
10. email

不开放复杂工作流字段，例如：

1. process variables
2. delegateUid
3. rollbackToActivityId
4. addSignUids
5. ccUids
6. taskId

## 5. 目标交付结构

### 5.1 MCP 对外工具

建议命名：

1. bytedeskKnowledgeSearch
2. bytedeskTicketCreate

命名原则：

1. 前缀统一，避免和现有自动扫描工具重名
2. 名称直观，便于 Claude Code、Codex 自动理解
3. 不依赖底层实体名，避免暴露内部领域结构

### 5.2 CLI 命令

建议提供以下命令：

1. bytedesk knowledge search --query "xxx" --org <orgUid>
2. bytedesk ticket create --title "xxx" --description "xxx"
3. bytedesk ticket get --uid <uid>
4. bytedesk ticket list --status OPEN

### 5.3 文档产出

至少包含：

1. MCP 服务启用说明
2. Bearer Token 配置说明
3. Claude Code 配置示例
4. Codex 配置示例
5. CLI 使用说明
6. 工具输入输出示例
7. 常见报错说明

## 6. 详细实施任务

### 阶段 A：能力契约冻结

#### A1. 定义知识库查询工具输入输出

输出物：

1. 工具入参字段清单
2. 工具返回结构清单
3. 错误码或错误消息约定

建议入参：

1. query：用户问题或搜索词，必填
2. orgUid：组织 uid，必填
3. kbUid：知识库 uid，可选
4. topK：返回条数，可选
5. searchType：FULLTEXT / VECTOR / MIXED，可选
6. sourceType：ALL / FAQ / TEXT / CHUNK / WEBPAGE，可选

建议出参：

1. query
2. orgUid
3. kbUid
4. searchType
5. total
6. items[]
7. items[].title
8. items[].content
9. items[].summary
10. items[].sourceType
11. items[].sourceUid
12. items[].score
13. items[].url

验收标准：

1. 返回结构不直接暴露内部 Entity
2. 字段名面向外部接入者清晰可读
3. 对空结果、缺参、非法参数有明确响应

#### A2. 定义工单创建工具输入输出

输出物：

1. 工单创建最小字段契约
2. 字段校验规则
3. 返回工单结构

建议入参：

1. orgUid：必填
2. title：必填
3. description：必填
4. priority：可选
5. type：可选
6. workgroupUid：可选
7. categoryUid：可选
8. contactName：可选
9. phone：可选
10. email：可选

建议出参：

1. uid
2. ticketNumber
3. title
4. status
5. priority
6. type
7. orgUid
8. createdAt
9. reporter
10. workgroup

验收标准：

1. 缺少 title/description/orgUid 时返回明确错误
2. 返回中包含最小业务识别信息
3. 不回传敏感内部流程字段

### 阶段 B：MCP Tool 实现

#### B1. 新增对外 MCP Tool Bean

建议新增文件：

1. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskExternalMcpTools.java

职责：

1. 提供对外知识库查询工具
2. 提供对外工单创建工具
3. 做入参校验和结果整形
4. 不直接返回内部复杂对象

建议方法：

1. bytedeskKnowledgeSearch
2. bytedeskTicketCreate

实施点：

1. 使用 Spring AI @Tool 标注
2. 复用现有 service，不重复造业务逻辑
3. 工具描述写清楚用途、输入、返回结构

验收标准：

1. MCP Server 启动后能发现这两个工具
2. 工具名稳定、说明清晰
3. 工具输出为结构化对象，不是字符串拼接

#### B2. 复用知识库检索逻辑

优先复用：

1. modules/ai/src/main/java/com/bytedesk/ai/service/KnowledgeBaseSearchHelper.java

实施点：

1. 新增一个面向 MCP 的组装层
2. 将内部检索结果转换成外部 items 数组
3. 控制 topK 上限，防止一次返回过多内容
4. 控制 content 长度，避免单次返回超大文本

建议限制：

1. topK 默认 5
2. topK 最大 10 或 20
3. 单条 content 做长度截断，例如 1000 到 2000 字符

验收标准：

1. 相同 query 在常规数据下有稳定返回
2. sourceType 过滤生效
3. topK 生效

#### B3. 复用工单创建逻辑

优先复用：

1. modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRestService.java
2. modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRequest.java

实施点：

1. 在 MCP Tool 层构建 TicketRequest
2. 只映射允许字段
3. 对 priority、type、email、phone 做基础校验
4. 返回 MCP 友好的 Ticket DTO

验收标准：

1. 可成功创建工单
2. 返回 uid 和状态等关键字段
3. 不依赖前端上下文才能成功创建

### 阶段 C：MCP 暴露策略与安全控制

#### C1. 增加工具白名单策略

相关文件：

1. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolConfiguration.java
2. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolProperties.java

目标：

在保持默认 readOnly=true 的前提下，允许明确配置的工具名越过只读限制。

建议新增配置：

1. bytedesk.ai.mcp.tools.write-allow-names

实施点：

1. readOnly 模式下默认仍只放行查询工具
2. 若工具名在 write-allow-names，则允许暴露
3. deny-names 仍然最高优先级

验收标准：

1. bytedeskTicketCreate 可以被 MCP 发现
2. 其它 Create 工具默认仍不可见

#### C2. Bearer Token 维持强制校验

相关文件：

1. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpBearerTokenFilter.java
2. starter/src/main/resources/properties/local/75-mcp.properties
3. starter/src/main/resources/properties/open/75-mcp.properties
4. starter/src/main/resources/properties/prod/75-mcp.properties
5. starter/src/main/resources/properties/noai/75-mcp.properties

实施点：

1. 未配置 token 时拒绝 MCP 请求
2. token 错误时返回明确 401/403
3. 日志中不打印原始 token

验收标准：

1. 无 token 无法调用
2. 错误 token 无法调用
3. 正确 token 正常调用

#### C3. 增加审计日志

建议新增内容：

1. toolName
2. caller 标识
3. orgUid
4. requestId
5. success/failure
6. duration
7. error message 摘要

建议实现方式：

1. 先用结构化日志落盘
2. 第二期再考虑持久化到数据库

验收标准：

1. 每次 MCP 工具调用有日志
2. 故障时可定位到具体工具与组织

### 阶段 D：CLI 完善

#### D1. 将 knowledge 命令从占位改为真实实现

当前现状：

1. modules/cli/src/main/java/com/bytedesk/cli/core/BytedeskCli.java 中 knowledge 还是 DomainPlaceholderCommand

建议新增文件：

1. modules/cli/src/main/java/com/bytedesk/cli/command/KnowledgeCommand.java

命令设计：

1. bytedesk knowledge search --query "xxx" --org <orgUid>

可选参数：

1. --kb <kbUid>
2. --topk <n>
3. --search-type MIXED
4. --source-type FAQ
5. --format json

实施点：

1. 直接走 HTTP API 或新增一个 MCP 对应开放 HTTP 接口
2. 输出 text/json 两种格式
3. 无 org 参数时可回退读取当前配置中的 current-org-uid

验收标准：

1. 命令可稳定返回搜索结果
2. 文本输出适合人看
3. JSON 输出适合脚本处理

#### D2. 复核 TicketCommand 与后端接口契合度

相关文件：

1. modules/cli/src/main/java/com/bytedesk/cli/command/TicketCommand.java

实施点：

1. 验证 /api/v1/ticket/create 当前入参是否与 CLI 构造一致
2. 检查 priority/type/workgroup/category 的映射是否真实生效
3. 完善错误提示
4. 为 create 命令补充 orgUid 来源说明

验收标准：

1. 已登录后可直接创建工单
2. 未配置 orgUid 时提示明确
3. JSON 输出能被脚本消费

#### D3. 补充 CLI 帮助与示例

实施点：

1. help 输出增加 knowledge 命令说明
2. 补充 ticket create 示例
3. 补充 auth login / config set 示例

验收标准：

1. 新用户能按 help 完成一次完整调用

### 阶段 E：Claude Code / Codex 接入文档

#### E1. 提供 Claude Code MCP 配置示例

参考输出内容：

1. 服务地址
2. Bearer Token 放置方式
3. mcpServers 示例 JSON
4. 连通性验证方式

验收标准：

1. 用户复制配置后可成功发现工具

#### E2. 提供 Codex MCP 配置示例

参考输出内容：

1. HTTP MCP 地址
2. Header 配置示例
3. 常见报错说明

验收标准：

1. 用户复制配置后可成功发现工具

#### E3. 增加仓库内示例配置文件

可选位置：

1. docs/docs/modules/mcp.md
2. docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/modules/mcp.md
3. 新增 docs/docs/integration/mcp-clients.md

## 7. 推荐代码改动清单

### 7.1 后端 MCP

预计新增文件：

1. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskExternalMcpTools.java
2. modules/ai/src/main/java/com/bytedesk/ai/mcp/dto/McpKnowledgeSearchRequest.java
3. modules/ai/src/main/java/com/bytedesk/ai/mcp/dto/McpKnowledgeSearchResponse.java
4. modules/ai/src/main/java/com/bytedesk/ai/mcp/dto/McpTicketCreateRequest.java
5. modules/ai/src/main/java/com/bytedesk/ai/mcp/dto/McpTicketCreateResponse.java
6. modules/ai/src/main/java/com/bytedesk/ai/mcp/dto/McpKnowledgeItem.java

预计修改文件：

1. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolConfiguration.java
2. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpToolProperties.java
3. modules/ai/src/main/java/com/bytedesk/ai/mcp/BytedeskMcpBearerTokenFilter.java
4. starter/src/main/resources/properties/local/75-mcp.properties
5. starter/src/main/resources/properties/open/75-mcp.properties
6. starter/src/main/resources/properties/prod/75-mcp.properties
7. starter/src/main/resources/properties/noai/75-mcp.properties

### 7.2 CLI

预计新增文件：

1. modules/cli/src/main/java/com/bytedesk/cli/command/KnowledgeCommand.java

预计修改文件：

1. modules/cli/src/main/java/com/bytedesk/cli/core/BytedeskCli.java
2. modules/cli/src/main/java/com/bytedesk/cli/command/TicketCommand.java
3. modules/cli/src/main/java/com/bytedesk/cli/core/HttpApiClient.java

### 7.3 文档

预计修改文件：

1. docs/docs/modules/mcp.md
2. docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/modules/mcp.md
3. docs/docs/provider/mcp.md
4. docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/provider/mcp.md

可选新增文件：

1. docs/docs/integration/mcp-client-setup.md
2. docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/integration/mcp-client-setup.md

## 8. 测试与验证清单

### 8.1 后端编译验证

1. 编译 modules/ai
2. 编译 modules/cli
3. 编译 starter

建议命令：

1. ./starter/mvnw -f pom.xml -pl modules/ai -am -DskipTests compile
2. ./starter/mvnw -f pom.xml -pl modules/cli -am -DskipTests compile
3. ./starter/mvnw -f pom.xml -pl starter -am -DskipTests compile

### 8.2 MCP 工具发现验证

验证项：

1. 启动服务后能发现 bytedeskKnowledgeSearch
2. 启动服务后能发现 bytedeskTicketCreate
3. 默认其它 Create 工具不暴露

### 8.3 MCP 调用验证

知识库工具：

1. 正常 query 返回结果
2. 空 query 报错
3. 非法 orgUid 报错或空结果
4. topK 限制生效

工单工具：

1. 正常创建成功
2. 缺 title 报错
3. 缺 description 报错
4. 非法 email 报错
5. 非法 token 调用失败

### 8.4 CLI 验证

1. bytedesk knowledge search 正常返回
2. bytedesk ticket create 正常返回
3. --format=json 可用
4. 未登录时提示 auth token 缺失
5. 未配置 server.base-url 时提示明确

### 8.5 文档验证

1. Claude Code 示例可复现
2. Codex 示例可复现
3. 本地文档构建不报错

## 9. 风险清单

### 风险 1：知识库检索返回体过大

表现：

1. MCP 单次响应过大
2. Agent 消费成本上升
3. 上下文窗口浪费

控制措施：

1. topK 限制
2. content 截断
3. 只返回必要字段

### 风险 2：工单创建暴露过宽

表现：

1. 误开放更多 Create 工具
2. 外部调用越权写入

控制措施：

1. 专用 Tool Bean
2. write-allow-names 白名单
3. deny-names 兜底

### 风险 3：CLI 与 MCP 双线行为不一致

表现：

1. CLI 搜索结果和 MCP 搜索结果结构不同
2. 文档理解成本上升

控制措施：

1. 尽量共用相同 DTO 思路
2. CLI 文本输出只是视图，JSON 输出尽量贴近 MCP 结果模型

### 风险 4：组织上下文不清晰

表现：

1. 未传 orgUid 时调用到错误组织
2. 创建工单归属混乱

控制措施：

1. MCP 工具要求显式 orgUid
2. CLI 可支持从 current-org-uid 回退，但日志中打印实际使用值

## 10. 回滚策略

若上线后发现风险，可按以下顺序回滚：

1. 将 bytedesk.ai.mcp.tools.write-allow-names 清空，立即关闭工单创建暴露
2. 保留知识库查询，只停写能力
3. 必要时将 spring.ai.mcp.server.enabled=false，整体关闭 MCP
4. CLI 命令不回滚，因其基于已有 HTTP API，风险较低

## 11. 建议实施顺序

推荐按以下顺序提交，降低单次改动面：

1. 提交 1：新增 MCP DTO 与专用工具类，只做知识库查询
2. 提交 2：放行工单创建工具，并增加白名单配置
3. 提交 3：增加审计日志和错误处理
4. 提交 4：补 KnowledgeCommand，完善 TicketCommand
5. 提交 5：补文档和接入样例

## 12. 最终验收标准

满足以下条件即可认为本期完成：

1. Claude Code 能通过 MCP 发现并调用知识库查询工具
2. Claude Code 能通过 MCP 创建工单
3. Codex 能通过 MCP 发现并调用同样的两个工具
4. CLI 可以直接查询知识库
5. CLI 可以直接创建工单
6. MCP 写工具未扩散到其它 Create 方法
7. Bearer Token 鉴权有效
8. 审计日志可追踪每次调用
9. 文档可指导新用户独立完成接入

## 13. 实施前需你最终确认的事项

1. 知识库第一版是否按语义检索 / 混合检索输出，而不是文章列表分页
2. 工单创建第一版是否只开放最小字段集
3. CLI 第一版是否保持走 HTTP API，而不是改为 MCP client
4. MCP 对外工具名是否采用 bytedeskKnowledgeSearch / bytedeskTicketCreate

如果以上 4 项确认，就可以按本清单直接开始编码实施。
