---
slug: bytedesk-4x-upgrade-notes
title: "微語 4.x 版本升級說明：Spring Boot 4.1 / Spring AI 2.0 / Flowable 8 / springdoc 3"
authors: jackning
tags: [bytedesk, SpringBoot, SpringAI, Flowable, springdoc, Elasticsearch, 版本升級]
---

微語 4.x 是一次全面的技術棧大版本升級，核心依賴從 Spring Boot 3.x / Spring AI 1.x 全面躍遷至 Spring Boot 4.1 / Spring AI 2.0，同步完成了 Flowable 8、springdoc-openapi 3、Elasticsearch 9.x 的配套升級。

本文匯總了本次升級涉及的關鍵變更、已完成事項以及遷移注意事項，幫助使用者平滑過渡到微語 4.x。

<!-- truncate -->

## 版本概覽

| 組件 | 升級前 | 升級後 | 狀態 |
| ------ | ------ | ------ | ------ |
| Spring Boot | 3.5.16 | 4.1.0 | ✅ 已完成 |
| Spring AI | 1.1.2 | 2.0.0 | ✅ 已完成（編譯層） |
| Flowable | 7.2.0 | 8.0.0 | ✅ 已完成（編譯層） |
| springdoc-openapi | 2.8.8 | 3.0.3 | ✅ 已完成 |
| Elasticsearch 映像 | 8.x | 9.4.2 | ✅ 已完成 |
| Druid Starter | druid-spring-boot-3-starter | druid-spring-boot-4-starter | ✅ 已完成 |

---

## 一、Spring Boot 4.1 升級

### 核心變更

- **Spring Framework 7 + Jakarta EE 11 + Servlet 6.1 基線**：所有 Spring Bean、自動配置、配置屬性綁定均已適配新基線。
- **Netty 依賴細化**：`netty-all` 已替換為 Netty 子模組顯式依賴（`modules/core`、`modules/call`）。
- **健康檢查套件遷移**：健康檢查實現已遷至 `org.springframework.boot.health.contributor` 套件路徑。
- **JSpecify nullability**：`package-info.java` 的 nullability 註解已從舊 Spring 廢棄註解遷移至 JSpecify/`@NullMarked`。
- **配置屬性遷移**：已透過 `spring-boot-properties-migrator` 診斷並修復全部 9 個廢棄/更名配置鍵（包括 `logging.file.*` → `logging.logback.*`、`server.servlet.encoding.*` → `spring.servlet.encoding.*` 等），migrator 已從 `starter/pom.xml` 移除。

### 相容性修復

- `KbaseInitializer` 的 `@AllArgsConstructor` 在 Spring 7 下導致 `boolean` 原始型別注入失敗，已改為 `@RequiredArgsConstructor`。
- `GenericJackson2JsonRedisSerializer`（Jackson 2 相容）棄用警告已透過 `@SuppressWarnings("deprecation")` 抑制，待後續 Jackson 3 升級時整體遷移。

### 已確認無需處理的項目

- 專案中 54 處 `javax.*` import 均為 JDK 標準庫套件（`javax.sql`、`javax.crypto` 等），非 Jakarta EE 舊套件，無需遷移。
- 專案僅使用 Tomcat + Jetty，Undertow 移除不影響微語。

---

## 二、Spring AI 2.0 升級

### 破壞性變更與適配

Spring AI 2.0 引入了多項破壞性變更，微語已完成以下適配：

- **Artifact 坐標變更**：`spring-ai-advisors-vector-store` → `spring-ai-vector-store-advisor`。
- **ChatModel 介面適配**：`BytedeskDashScopeChatModel`、`BytedeskDashScopeEmbeddingModel` 已按 Spring AI 2.0 的 `ChatModel` / `EmbeddingModel` 介面重新編譯驗證。
- **Tool Calling 重構**：`MoonshotChatModel`（~550 行）已完成工具呼叫鏈路重寫，移除了 `internalToolExecutionEnabled`、`ToolExecutionEligibilityPredicate` 等已廢棄 API，改為使用 `ToolCallingManager` 手動驅動。
- **ChatMemory 優先級調整**：`DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER` 從 +1000 調整為 +200，`BookingAssistantService` 已同步複查。
- **Elasticsearch 向量儲存遷移**：`modules/ai` 與 `modules/kbase` 中 ES 向量儲存呼叫已從舊 `RestClient` 適配至 `Rest5Client`。
- **Deprecation 清理**：已清理 `getDefaultOptions()`、Spring Framework 7 廢棄 nullability 註解、Redis 4.1 廢棄 `expire` 重載等編譯期警告。

### AI Provider 適配

已完成 OpenAI-compatible provider 改造，DeepSeek / Ollama / ZhipuAI 配置簽名修復，Moonshot 自維護 provider 相容修復，DashScope 自定義 `ChatModel` / `ChatOptions` 契約對齊。

### Spring AI 2.0 已知局限

- `modules/ai` 中 minimax 與 zhipuai 目前透過模組內版本覆蓋暫鎖在 `1.0.0`，屬於過渡相容方案，後續需統一提升至 Spring AI 2.0 正式可用版本。
- Spring AI 2.0 執行期 AI 鏈路（provider 呼叫鏈、SSE、知識庫向量鏈路、工具呼叫）尚未做完整回歸驗證。

---

## 三、Flowable 8.0 升級

### Flowable 8 升級範圍

- `flowable.version` 已升至 `8.0.0`，`modules/ticket` 與 `starter` 聚合編譯通過。
- 涉及依賴：`flowable-spring-boot-starter`、`flowable-engine`、`flowable-dmn-*`、`flowable-cmmn-*` 等整組依賴均已同步升級。

### 程式碼適配

- `FlowableConfig.java` 中的 `EngineConfigurationConfigurer<SpringProcessEngineConfiguration>` 配置模式已驗證相容。
- `TicketCaseService` 中的 `CmmnTaskService` 呼叫已驗證編譯相容。

### Flowable 8 已知局限

- Flowable 8 執行期工單流程（建立→簽收→轉派→完成）尚未做完整回歸驗證。

---

## 四、springdoc-openapi 3.0 升級

### springdoc 3 升級範圍

`springdoc.version` 已升至 `3.0.3`，跨越 7 個聚合 POM 的 starter artifact 同步升級：

- `modules/`
- `starter/`
- `channels/`
- `control/`
- `enterprise/`
- `plugins/`
- `projects/`

### 驗證結果

- Swagger UI `/swagger-ui.html` 返回 200 ✅
- `/v3/api-docs` 返回 200 ✅

---

## 五、Elasticsearch 9.x 與 Docker 基礎設施升級

### Docker Compose 映像統一

全部 6 個 Docker compose 檔案中 ES/IK/Logstash/Kibana 映像已統一切換至 `9.4.2`：

| 檔案 | 升級組件 |
| ------ | ------ |
| `deploy/docker/compose-base.yaml` | ES、IK、Logstash、Kibana |
| `deploy/docker/one/docker-compose.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-all.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-noai.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-ollama.yaml` | ES、IK |
| `deploy/docker/one/docker-compose-rabbitmq.yaml` | ES、IK |

### 索引升級策略

- 新增 `bytedesk.kbase.elasticsearch.startup-index-upgrade-enabled` 開關，local profile 預設關閉啟動期自動索引升級。
- 3 語言 Elasticsearch 版本文檔（en / zh-CN / zh-TW）已同步更新。

### ES 9.x 已知局限

- ES 9.x Docker 容器尚未做真實啟動驗證（IK 插件載入、Logstash→ES 寫入、Kibana→ES 連接、知識庫索引建立/重建/檢索）。

---

## 六、已驗證結果

### 編譯驗證

- `starter` 聚合反應堆 41/41 模組編譯通過 ✅
- `modules/ai` Java 21 下窄編譯驗證通過 ✅
- `modules/kbase` 編譯通過 ✅
- `modules/ticket` 編譯通過 ✅

### 執行驗證

- Starter 本地啟動（Jetty 12.1.10，port 9003）✅
- `/actuator/health`：Core（MySQL）✅、AI（DashScope）✅
- Swagger UI `/swagger-ui.html` 200 ✅
- `/v3/api-docs` 200 ✅
- 資料來源連接正常（`jdbc:mysql://127.0.0.1:13306/bytedesk_test4`）✅

---

## 七、遷移注意事項

### 配置屬性變更

以下配置屬性在 Spring Boot 4 中已廢棄或重命名，若您的配置檔案中仍在使用舊鍵，請同步更新：

| 舊屬性 | 新屬性 |
| ------ | ------ |
| `logging.file.*` | `logging.logback.*` |
| `server.servlet.encoding.*` | `spring.servlet.encoding.*` |
| `spring.ai.ollama.chat.options.*` | 直接使用 `spring.ai.ollama.chat.*`（`.options.` 中間層已移除） |

### 非 local profile 配置

非 local profile（`noai/`、`open/`、`prod/`、`kingbase`）中可能仍存在 Ollama `.options.` 舊配置鍵，建議在切換前批量修復。

### ES 索引升級

ES 8.x → 9.x 升級前建議先做索引快照或等價備份。可透過 `bytedesk.kbase.elasticsearch.startup-index-upgrade-enabled=true` 開啟啟動期自動索引升級，建議先在測試環境驗證。

### Java 版本

微語 4.x 要求 Java 21+。

---

## 八、後續計劃

當前已完成編譯層全量適配和基礎設施升級，以下執行期驗證將在後續迭代中持續推進：

1. Spring AI 2.0 端到端 AI 鏈路回歸（provider 呼叫鏈、SSE、知識庫向量鏈路、工具呼叫）。
2. Flowable 8 工單流程執行期回歸。
3. ES 9.x Docker 容器真實啟動驗證。
4. minimax / zhipuai provider 統一提升至 Spring AI 2.0 正式版本。
5. 非 local profile Ollama 舊配置鍵批量修復。

---

> 微語 4.x 的升級是一次面向未來的技術基座重構。我們採用分階段、可回滾的策略，確保每一步都有清晰的驗證門禁。如果您在升級過程中遇到任何問題，歡迎透過 [GitHub Issues](https://github.com/Bytedesk/bytedesk/issues) 回饋。
