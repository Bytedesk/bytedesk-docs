---
slug: bytedesk-4x-upgrade-notes
title: "Bytedesk 4.x Upgrade Notes: Spring Boot 4.1 / Spring AI 2.0 / Flowable 8 / springdoc 3"
authors: jackning
tags: [bytedesk, SpringBoot, SpringAI, Flowable, springdoc, Elasticsearch, Upgrade]
---

Bytedesk 4.x is a comprehensive major-version upgrade of the entire technology stack. Core dependencies have made the leap from Spring Boot 3.x / Spring AI 1.x to Spring Boot 4.1 / Spring AI 2.0, with coordinated upgrades for Flowable 8, springdoc-openapi 3, and Elasticsearch 9.x.

This article summarizes the key changes, completed items, and migration notes to help users transition smoothly to Bytedesk 4.x.

<!-- truncate -->

## Version Overview

| Component | Before | After | Status |
| ------ | ------ | ------ | ------ |
| Spring Boot | 3.5.16 | 4.1.0 | ✅ Completed |
| Spring AI | 1.1.2 | 2.0.0 | ✅ Completed (compile layer) |
| Flowable | 7.2.0 | 8.0.0 | ✅ Completed (compile layer) |
| springdoc-openapi | 2.8.8 | 3.0.3 | ✅ Completed |
| Elasticsearch Image | 8.x | 9.4.2 | ✅ Completed |
| Druid Starter | druid-spring-boot-3-starter | druid-spring-boot-4-starter | ✅ Completed |

---

## 1. Spring Boot 4.1 Upgrade

### Core Changes

- **Spring Framework 7 + Jakarta EE 11 + Servlet 6.1 Baseline**: All Spring Beans, auto-configurations, and configuration property bindings have been adapted to the new baseline.
- **Netty Dependency Refinement**: `netty-all` has been replaced with explicit Netty sub-module dependencies (`modules/core`, `modules/call`).
- **Health Check Package Migration**: Health check implementations have been migrated to the `org.springframework.boot.health.contributor` package path.
- **JSpecify Nullability**: `package-info.java` nullability annotations have been migrated from deprecated Spring annotations to JSpecify/`@NullMarked`.
- **Configuration Property Migration**: All 9 deprecated/renamed configuration keys have been diagnosed and fixed using `spring-boot-properties-migrator` (including `logging.file.*` → `logging.logback.*`, `server.servlet.encoding.*` → `spring.servlet.encoding.*`, etc.). The migrator has been removed from `starter/pom.xml`.

### Compatibility Fixes

- `KbaseInitializer`'s `@AllArgsConstructor` caused `boolean` primitive injection failure under Spring 7 — changed to `@RequiredArgsConstructor`.
- `GenericJackson2JsonRedisSerializer` (Jackson 2 compatibility) deprecation warning has been suppressed with `@SuppressWarnings("deprecation")`, pending migration to Jackson 3.

### Confirmed No-Action Items

- All 54 `javax.*` imports in the project are JDK standard library packages (`javax.sql`, `javax.crypto`, etc.), not legacy Jakarta EE packages — no migration needed.
- The project only uses Tomcat + Jetty; Undertow removal does not affect Bytedesk.

---

## 2. Spring AI 2.0 Upgrade

### Breaking Changes and Adaptations

Spring AI 2.0 introduces several breaking changes, all of which have been addressed:

- **Artifact Coordinate Changes**: `spring-ai-advisors-vector-store` → `spring-ai-vector-store-advisor`.
- **ChatModel Interface Adaptation**: `BytedeskDashScopeChatModel` and `BytedeskDashScopeEmbeddingModel` have been recompiled against Spring AI 2.0's `ChatModel` / `EmbeddingModel` interfaces.
- **Tool Calling Refactoring**: `MoonshotChatModel` (~550 lines) has been rewritten — removed deprecated APIs like `internalToolExecutionEnabled` and `ToolExecutionEligibilityPredicate`, switched to `ToolCallingManager`-driven manual loops.
- **ChatMemory Priority Adjustment**: `DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER` changed from +1000 to +200; `BookingAssistantService` has been reviewed.
- **Elasticsearch Vector Store Migration**: ES vector store calls in `modules/ai` and `modules/kbase` have been migrated from the old `RestClient` to `Rest5Client`.
- **Deprecation Cleanup**: Compile-time warnings from `getDefaultOptions()`, Spring Framework 7 deprecated nullability annotations, and Redis 4.1 deprecated `expire` overloads have been cleaned up.

### AI Provider Adaptation

OpenAI-compatible provider refactoring completed; DeepSeek / Ollama / ZhipuAI configuration signature fixes; Moonshot self-maintained provider compatibility fixes; DashScope custom `ChatModel` / `ChatOptions` contract alignment.

### Spring AI 2.0 Known Limitations

- minimax and zhipuai in `modules/ai` are currently pinned to `1.0.0` via module-level version overrides as a transitional compatibility measure; a unified upgrade to official Spring AI 2.0 versions is pending.
- Runtime AI pipeline regression (provider call chain, SSE, knowledge base vector pipeline, tool calling) has not yet been fully verified.

---

## 3. Flowable 8.0 Upgrade

### Flowable 8 Upgrade Scope

- `flowable.version` upgraded to `8.0.0`; `modules/ticket` and `starter` aggregate build passes.
- Affected dependencies: `flowable-spring-boot-starter`, `flowable-engine`, `flowable-dmn-*`, `flowable-cmmn-*` — the entire dependency group has been upgraded.

### Code Adaptation

- `FlowableConfig.java`'s `EngineConfigurationConfigurer<SpringProcessEngineConfiguration>` pattern verified compatible.
- `TicketCaseService`'s `CmmnTaskService` calls verified compile-compatible.

### Flowable 8 Known Limitations

- Flowable 8 runtime ticket workflow (create → claim → transfer → complete) has not yet been fully regression tested.

---

## 4. springdoc-openapi 3.0 Upgrade

### springdoc 3 Upgrade Scope

`springdoc.version` upgraded to `3.0.3`, with starter artifact synchronization across 7 aggregate POMs:

- `modules/`
- `starter/`
- `channels/`
- `control/`
- `enterprise/`
- `plugins/`
- `projects/`

### Verification Results

- Swagger UI `/swagger-ui.html` returns 200 ✅
- `/v3/api-docs` returns 200 ✅

---

## 5. Elasticsearch 9.x & Docker Infrastructure Upgrade

### Docker Compose Image Unification

All 6 Docker compose files have had ES/IK/Logstash/Kibana images unified to `9.4.2`:

| File | Upgraded Components |
| ------ | ------ |
| `deploy/docker/compose-base.yaml` | ES, IK, Logstash, Kibana |
| `deploy/docker/one/docker-compose.yaml` | ES, IK |
| `deploy/docker/one/docker-compose-all.yaml` | ES, IK |
| `deploy/docker/one/docker-compose-noai.yaml` | ES, IK |
| `deploy/docker/one/docker-compose-ollama.yaml` | ES, IK |
| `deploy/docker/one/docker-compose-rabbitmq.yaml` | ES, IK |

### Index Upgrade Strategy

- Added `bytedesk.kbase.elasticsearch.startup-index-upgrade-enabled` toggle; local profile disables automatic startup index upgrade by default.
- 3-language Elasticsearch version documentation (en / zh-CN / zh-TW) updated.

### ES 9.x Known Limitations

- ES 9.x Docker container real startup verification (IK plugin loading, Logstash→ES writes, Kibana→ES connectivity, knowledge base index create/rebuild/search) has not yet been performed.

---

## 6. Verified Results

### Compile Verification

- `starter` aggregate reactor 41/41 modules compile ✅
- `modules/ai` narrow compile under Java 21 passes ✅
- `modules/kbase` compile passes ✅
- `modules/ticket` compile passes ✅

### Runtime Verification

- Starter local startup (Jetty 12.1.10, port 9003) ✅
- `/actuator/health`: Core (MySQL) ✅, AI (DashScope) ✅
- Swagger UI `/swagger-ui.html` 200 ✅
- `/v3/api-docs` 200 ✅
- DataSource connection normal (`jdbc:mysql://127.0.0.1:13306/bytedesk_test4`) ✅

---

## 7. Migration Notes

### Configuration Property Changes

The following properties are deprecated or renamed in Spring Boot 4. Update your configuration files if you still reference the old keys:

| Old Property | New Property |
| ------ | ------ |
| `logging.file.*` | `logging.logback.*` |
| `server.servlet.encoding.*` | `spring.servlet.encoding.*` |
| `spring.ai.ollama.chat.options.*` | Use `spring.ai.ollama.chat.*` directly (`.options.` layer removed) |

### Non-local Profiles

Non-local profiles (`noai/`, `open/`, `prod/`, `kingbase`) may still contain old Ollama `.options.` configuration keys — batch fix is recommended before switching.

### ES Index Upgrade

Take an index snapshot or equivalent backup before upgrading from ES 8.x to 9.x. Set `bytedesk.kbase.elasticsearch.startup-index-upgrade-enabled=true` to enable automatic startup index upgrade; test in a staging environment first.

### Java Version

Bytedesk 4.x requires Java 21+.

---

## 8. Roadmap

Compile-layer adaptation and infrastructure upgrades are complete. The following runtime validations will continue in subsequent iterations:

1. Spring AI 2.0 end-to-end AI pipeline regression (provider call chain, SSE, KB vector pipeline, tool calling).
2. Flowable 8 ticket workflow runtime regression.
3. ES 9.x Docker container real startup verification.
4. Unified upgrade of minimax / zhipuai providers to official Spring AI 2.0 versions.
5. Batch fix of old Ollama configuration keys in non-local profiles.

---

> Bytedesk 4.x is a future-oriented technology foundation rebuild. We use a phased, rollback-safe strategy to ensure every step has clear verification gates. If you encounter any issues during the upgrade, please report them via [GitHub Issues](https://github.com/Bytedesk/bytedesk/issues).
