---
slug: bytedesk-4x-upgrade-notes
title: 微语 4.x 版本升级说明：Spring Boot 4.1 / Spring AI 2.0 / Flowable 8 / springdoc 3
authors: jackning
tags: [bytedesk, SpringBoot, SpringAI, Flowable, springdoc, Elasticsearch, 版本升级]
---

微语 4.x 是一次全面的技术栈大版本升级，核心依赖从 Spring Boot 3.x / Spring AI 1.x 全面跃迁至 Spring Boot 4.1 / Spring AI 2.0，同步完成了 Flowable 8、springdoc-openapi 3、Elasticsearch 9.x 的配套升级。

本文汇总了本次升级涉及的关键变更、已完成事项以及迁移注意事项，帮助使用者平滑过渡到微语 4.x。

<!-- truncate -->

## 版本概览

| 组件 | 升级前 | 升级后 | 状态 |
| ------ | ------ | ------ | ------ |
| Spring Boot | 3.5.16 | 4.1.0 | ✅ 已完成 |
| Spring AI | 1.1.2 | 2.0.0 | ✅ 已完成（编译层） |
| Flowable | 7.2.0 | 8.0.0 | ✅ 已完成（编译层） |
| springdoc-openapi | 2.8.8 | 3.0.3 | ✅ 已完成 |
| Elasticsearch 镜像 | 8.x | 9.4.2 | ✅ 已完成 |
| Druid Starter | druid-spring-boot-3-starter | druid-spring-boot-4-starter | ✅ 已完成 |

---

## 一、Spring Boot 4.1 升级

### 核心变更

- **Spring Framework 7 + Jakarta EE 11 + Servlet 6.1 基线**：所有 Spring Bean、自动配置、配置属性绑定均已适配新基线。
- **Netty 依赖细化**：`netty-all` 已替换为 Netty 子模块显式依赖（`modules/core`、`modules/call`）。
- **健康检查包迁移**：健康检查实现已迁至 `org.springframework.boot.health.contributor` 包路径。
- **JSpecify nullability**：`package-info.java` 的 nullability 注解已从旧 Spring 废弃注解迁移至 JSpecify/`@NullMarked`。
- **配置属性迁移**：已通过 `spring-boot-properties-migrator` 诊断并修复全部 9 个废弃/更名配置键（包括 `logging.file.*` → `logging.logback.*`、`server.servlet.encoding.*` → `spring.servlet.encoding.*` 等），migrator 已从 `starter/pom.xml` 移除。

### 兼容性修复

- `KbaseInitializer` 的 `@AllArgsConstructor` 在 Spring 7 下导致 `boolean` 原语注入失败，已改为 `@RequiredArgsConstructor`。
- `GenericJackson2JsonRedisSerializer`（Jackson 2 兼容）弃用警告已通过 `@SuppressWarnings("deprecation")` 抑制，待后续 Jackson 3 升级时整体迁移。

### 已确认无需处理的项

- 项目中 54 处 `javax.*` import 均为 JDK 标准库包（`javax.sql`、`javax.crypto` 等），非 Jakarta EE 旧包，无需迁移。
- 项目仅使用 Tomcat + Jetty，Undertow 移除不影响微语。

---

## 二、Spring AI 2.0 升级

### 破坏性变更与适配

Spring AI 2.0 引入了多项破坏性变更，微语已完成以下适配：

- **Artifact 坐标变更**：`spring-ai-advisors-vector-store` → `spring-ai-vector-store-advisor`。
- **ChatModel 接口适配**：`BytedeskDashScopeChatModel`、`BytedeskDashScopeEmbeddingModel` 已按 Spring AI 2.0 的 `ChatModel` / `EmbeddingModel` 接口重新编译验证。
- **Tool Calling 重构**：`MoonshotChatModel`（~550 行）已完成工具调用链路重写，移除了 `internalToolExecutionEnabled`、`ToolExecutionEligibilityPredicate` 等已废弃 API，改为使用 `ToolCallingManager` 手动驱动。
- **ChatMemory 优先级调整**：`DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER` 从 +1000 调整为 +200，`BookingAssistantService` 已同步复查。
- **Elasticsearch 向量存储迁移**：`modules/ai` 与 `modules/kbase` 中 ES 向量存储调用已从旧 `RestClient` 适配至 `Rest5Client`。
- **Deprecation 清理**：已清理 `getDefaultOptions()`、Spring Framework 7 废弃 nullability 注解、Redis 4.1 废弃 `expire` 重载等编译期警告。

### AI Provider 适配

已完成 OpenAI-compatible provider 改造，DeepSeek / Ollama / ZhipuAI 配置签名修复，Moonshot 自维护 provider 兼容修复，DashScope 自定义 `ChatModel` / `ChatOptions` 契约对齐。

### Spring AI 2.0 已知局限

- `modules/ai` 中 minimax 与 zhipuai 目前通过模块内版本覆盖暂锁在 `1.0.0`，属于过渡兼容方案，后续需统一提升至 Spring AI 2.0 正式可用版本。
- Spring AI 2.0 运行态 AI 链路（provider 调用链、SSE、知识库向量链路、工具调用）尚未做完整回归验证。

---

## 三、Flowable 8.0 升级

### Flowable 8 升级范围

- `flowable.version` 已升至 `8.0.0`，`modules/ticket` 与 `starter` 聚合编译通过。
- 涉及依赖：`flowable-spring-boot-starter`、`flowable-engine`、`flowable-dmn-*`、`flowable-cmmn-*` 等整组依赖均已同步升级。

### 代码适配

- `FlowableConfig.java` 中的 `EngineConfigurationConfigurer<SpringProcessEngineConfiguration>` 配置模式已验证兼容。
- `TicketCaseService` 中的 `CmmnTaskService` 调用已验证编译兼容。

### Flowable 8 已知局限

- Flowable 8 运行态工单流程（创建→签收→转派→完成）尚未做完整回归验证。

---

## 四、springdoc-openapi 3.0 升级

### springdoc 3 升级范围

`springdoc.version` 已升至 `3.0.3`，跨越 7 个聚合 POM 的 starter artifact 同步升级：

- `modules/`
- `starter/`
- `channels/`
- `control/`
- `enterprise/`
- `plugins/`
- `projects/`

### 验证结果

- Swagger UI `/swagger-ui.html` 返回 200 ✅
- `/v3/api-docs` 返回 200 ✅

---

## 五、Elasticsearch 9.x 与 Docker 基础设施升级

### Docker Compose 镜像统一

全部 6 个 Docker compose 文件中 ES/IK/Logstash/Kibana 镜像已统一切换至 `9.4.2`：

| 文件 | 升级组件 |
| ------ | ------ |
| `deploy/docker/compose-base.yaml` | ES、IK、Logstash、Kibana |
| `deploy/docker/one/docker-compose.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-all.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-noai.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-ollama.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-rabbitmq.yaml` | ES、IK |

### 索引升级策略

- 新增 `bytedesk.kbase.elasticsearch.startup-index-upgrade-enabled` 开关，local profile 默认关闭启动期自动索引升级。
- 3 语言 Elasticsearch 版本文档（en / zh-CN / zh-TW）已同步更新。

### ES 9.x 已知局限

- ES 9.x Docker 容器尚未做真实启动验证（IK 插件加载、Logstash→ES 写入、Kibana→ES 连接、知识库索引创建/重建/检索）。

---

## 六、已验证结果

### 编译验证

- `starter` 聚合反应堆 41/41 模块编译通过 ✅
- `modules/ai` Java 21 下窄编译验证通过 ✅
- `modules/kbase` 编译通过 ✅
- `modules/ticket` 编译通过 ✅

### 运行验证

- Starter 本地启动（Jetty 12.1.10，port 9003）✅
- `/actuator/health`：Core（MySQL）✅、AI（DashScope）✅
- Swagger UI `/swagger-ui.html` 200 ✅
- `/v3/api-docs` 200 ✅
- 数据源连接正常（`jdbc:mysql://127.0.0.1:13306/bytedesk_test4`）✅

---

## 七、迁移注意事项

### 配置属性变更

以下配置属性在 Spring Boot 4 中已废弃或重命名，若您的配置文件中仍在使用旧键，请同步更新：

| 旧属性 | 新属性 |
| ------ | ------ |
| `logging.file.*` | `logging.logback.*` |
| `server.servlet.encoding.*` | `spring.servlet.encoding.*` |
| `spring.ai.ollama.chat.options.*` | 直接使用 `spring.ai.ollama.chat.*`（`.options.` 中间层已移除） |

### 非 local profile 配置

非 local profile（`noai/`、`open/`、`prod/`、`kingbase`）中可能仍存在 Ollama `.options.` 旧配置键，建议在切换前批量修复。

### ES 索引升级

ES 8.x → 9.x 升级前建议先做索引快照或等价备份。可通过 `bytedesk.kbase.elasticsearch.startup-index-upgrade-enabled=true` 开启启动期自动索引升级，建议先在测试环境验证。

### Java 版本

微语 4.x 要求 Java 21+。

---

## 八、后续计划

当前已完成编译层全量适配和基础设施升级，以下运行态验证将在后续迭代中持续推进：

1. Spring AI 2.0 端到端 AI 链路回归（provider 调用链、SSE、知识库向量链路、工具调用）。
2. Flowable 8 工单流程运行态回归。
3. ES 9.x Docker 容器真实启动验证。
4. minimax / zhipuai provider 统一提升至 Spring AI 2.0 正式版本。
5. 非 local profile Ollama 旧配置键批量修复。

---

> 微语 4.x 的升级是一次面向未来的技术基座重构。我们采用分阶段、可回滚的策略，确保每一步都有清晰的验证门禁。如果您在升级过程中遇到任何问题，欢迎通过 [GitHub Issues](https://github.com/Bytedesk/bytedesk/issues) 反馈。
