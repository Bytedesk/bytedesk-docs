# ASR 语音识别定制热词 — 规划文档

> 日期：2026-07-29
> 状态：**已实现，待完整验证**
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)
> 参考文档：[阿里云 ASR 定制热词 Java SDK](https://help.aliyun.com/zh/model-studio/vocabulary-java-sdk) | [HTTP API](https://help.aliyun.com/zh/model-studio/vocabulary-http-api)
> 实现进度说明：后端数据模型、Liquibase、阿里云热词客户端、同步编排、执行型接口，以及 admin 端 table、drawer、权限接入和中日文文案已落地。当前剩余工作主要是完整编译/构建验证，以及少量和规划相比的交互增强项收尾。

---

## 1. 概述

基于阿里云百炼平台的 ASR 语音识别定制热词（Vocabulary）能力，完善后端 `AsrHotwordEntity` 模板类和前端 `AsrHotword` 组件，提供完整的热词列表管理（CRUD）与阿里云 API 同步能力，并将 `AsrHotword` 作为 tab 添加到 `RobotAgentPage` 中。

### 阿里云热词 API 核心概念

| 概念 | 说明 |
| ---- | ---- |
| **热词列表 (Vocabulary)** | 一个热词列表包含一组热词项，可用于提升特定词语的 ASR 识别准确率 |
| **prefix** | 热词列表自定义前缀，仅允许数字和小写字母，长度 ≤ 10 字符。用于列表筛选和标识 |
| **targetModel** | 使用热词列表的语音识别模型（如 `fun-asr`、`paraformer-v2`），必须与后续 ASR 调用一致 |
| **vocabularyId** | 阿里云返回的热词列表唯一标识（如 `vocab-testpfx-xxxx`） |
| **热词项** | `text`（热词文本）+ `weight`（权重 1-5）+ `lang`（可选语种） |

### API 操作

| 操作 | action | 说明 |
| ---- | ------ | ---- |
| 创建热词列表 | `create_vocabulary` | 传入 targetModel + prefix + vocabulary[]，返回 vocabularyId |
| 批量查询 | `list_vocabulary` | 按 prefix 查询，支持分页 pageIndex/pageSize |
| 详情查询 | `query_vocabulary` | 按 vocabularyId 查询，返回完整热词内容 |
| 更新热词列表 | `update_vocabulary` | 按 vocabularyId 全量替换热词内容 |
| 删除热词列表 | `delete_vocabulary` | 按 vocabularyId 删除 |

### 已知限制

- 阿里云文档提示：新加坡地域的子业务空间暂不支持热词功能。实现时需要在服务层保留清晰错误提示，避免用户误以为是本地配置失败。
- 热词列表必须和后续 ASR 使用的 `targetModel` 一致；本轮只做热词管理，不改动现有 ASR 执行链路，因此不会自动让已有识别任务使用热词。
- `update_vocabulary` 是全量替换语义，前端编辑器必须把完整热词数组提交给后端。

---

## 2. 后端改造

### 2.1 Entity 字段扩展 — `AsrHotwordEntity.java`

在现有字段（name, description, type）基础上增加阿里云热词管理相关字段：

| 字段 | 类型 | 说明 | 默认值 |
| ---- | ---- | ---- | ------ |
| `targetModel` | String | 目标语音识别模型（如 `fun-asr`、`paraformer-v2`） | `"fun-asr"` |
| `prefix` | String | 热词列表前缀（数字+小写字母，≤10） | — |
| `vocabularyId` | String | 阿里云返回的热词列表 ID | — |
| `status` | String | 热词列表状态（PENDING / OK / UNDEPLOYED / FAILED / DELETED） | `"PENDING"` |
| `vocabulary` | String (@Lob / @Column(columnDefinition="TEXT")) | 热词项 JSON 数组（存储 text/weight/lang） | `"[]"` |
| `provider` | String | 热词服务提供商，首版固定 `dashscope`，为后续其他 ASR 服务预留 | `"dashscope"` |
| `requestId` | String | 阿里云接口返回的 request_id，便于排查问题 | — |
| `errorMessage` | String (@Column(columnDefinition="TEXT")) | 最近一次远端调用失败原因 | — |
| `rawResponse` | String (@Column(columnDefinition="TEXT")) | 最近一次阿里云原始响应，便于调试和兼容返回格式变化 | — |
| `remoteGmtCreate` | String | 阿里云热词列表创建时间（原样保存 gmt_create） | — |
| `remoteGmtModified` | String | 阿里云热词列表更新时间（原样保存 gmt_modified） | — |

> **说明**：由于 `BaseEntity` 已提供 `uid`、`orgUid`、`level`、`createdAt`、`updatedAt`、`deleted` 等通用字段，Entity 只需增加上述业务字段。
>
> **表名注意**：本模块必须以 `AsrHotwordEntity` 上的 `@Table(name = "bytedesk_ai_asr_hotword")` 为准；不要直接照抄 voice clone 迁移中的历史模板表名。

### 2.2 Request/Response 同步更新

- `AsrHotwordRequest.java`：增加 `targetModel`、`prefix`、`vocabularyId`、`status`、`vocabulary`、`provider` 字段；执行型接口可额外接收 `pageIndex`、`pageSize`
- `AsrHotwordResponse.java`：增加对应字段，并额外返回 `requestId`、`errorMessage`、`rawResponse`、`remoteGmtCreate`、`remoteGmtModified`
- `AsrHotwordExcel.java`：同步增加核心导出字段（至少 name / targetModel / prefix / vocabularyId / status / errorMessage）

> **注意**：当前 `AsrHotwordExcel` 中有一个 `color` 字段，但 `AsrHotwordEntity` 中并不存在 `color` 字段，导出时会抛异常。实现时必须移除该字段并用新增的业务字段替换。

### 2.3 新增阿里云热词客户端 — `AliyunAsrHotwordClient.java`

仿照 `AliyunVoiceCloneClient.java` 模式，新建 HTTP 客户端调用阿里云热词 API：

- 端点：`POST https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/api/v1/services/audio/asr/customization`
- 统一请求体结构：`{ "model": "speech-biasing", "input": { "action": "...", ... } }`
- API Key 复用 ASR transcription 配置：`spring.ai.dashscope.audio.transcription.api-key:${spring.ai.dashscope.api-key:${DASHSCOPE_API_KEY:}}`
- endpoint 解析优先级：
  1. `bytedesk.ai.dashscope.asr-hotword.endpoint`
  2. `bytedesk.ai.dashscope.workspace-id` + `bytedesk.ai.dashscope.region`
  3. 公共 endpoint fallback：北京 `https://dashscope.aliyuncs.com/api/v1/services/audio/asr/customization`，新加坡 `https://dashscope-intl.aliyuncs.com/api/v1/services/audio/asr/customization`
- 响应封装建议新增 `AliyunAsrHotwordApiResponse`，字段包含：`success`、`vocabularyId`、`status`、`targetModel`、`vocabulary`、`requestId`、`errorMessage`、`rawResponse`、`data`
- 方法：
  - `createVocabulary(targetModel, prefix, vocabulary)` → `vocabularyId`
  - `listVocabularies(prefix, pageIndex, pageSize)` → `Vocabulary[]`
  - `queryVocabulary(vocabularyId)` → `Vocabulary`
  - `updateVocabulary(vocabularyId, vocabulary)` → void
  - `deleteVocabulary(vocabularyId)` → void

### 2.4 新增业务服务 — `AsrHotwordSyncService.java`

在 `AsrHotwordRestService` 之外新增一个编排层，负责：

- 创建热词时：先调用阿里云 API 创建 → 获取 `vocabularyId` → 落库本地 `AsrHotwordEntity`
- 更新热词时：先调用阿里云 API 更新 → 更新本地记录
- 删除热词时：先调用阿里云 API 删除 → 软删除本地记录
- 同步查询：优先按 `vocabularyId` 调用 `query_vocabulary` 更新单条详情；如果没有 `vocabularyId` 但有 `prefix`，再调用 `list_vocabulary` 做批量状态同步
- 失败处理：远端调用失败时写回 `status=FAILED`、`errorMessage`、`rawResponse`，不要吞掉阿里云错误信息
- 删除容错：远端删除如果返回“资源不存在/404”类结果，可视为远端已删除成功，再软删除本地记录

或者，将阿里云 API 调用直接集成到 `AsrHotwordRestService` 的 `create`/`update`/`delete` 方法中（当前 `AsrHotwordRestController` 已显式暴露 `/create`、`/update`、`/delete` 端点），减少文件数量。

> **当前实现**：采用独立 `AsrHotwordSyncService`（与现有 `AsrHotwordRestService` 分开），保持本地 CRUD 和远端同步编排解耦；`AsrHotwordRestController` 继续保留现有标准 CRUD 路由，内部由 `AsrHotwordRestService` 调用 `AsrHotwordSyncService` 完成远端同步。

### 2.5 新增 Controller 端点 — `AsrHotwordController.java`

参照 voice clone 的模式，在现有 `AsrHotwordRestController` 之外新增执行型 controller，仅承载远端查询/同步类动作端点：

| 端点 | 方法 | 说明 |
| ---- | ---- | ---- |
| `/api/v1/asr_hotword/sync` | POST | 从阿里云同步热词列表状态；优先按 vocabularyId 同步单条，必要时按 prefix 批量同步 |
| `/api/v1/asr_hotword/remote/list` | POST | 查询阿里云远端热词列表（不落库） |
| `/api/v1/asr_hotword/remote/detail` | POST | 查询阿里云远端热词详情 |

> 标准 CRUD 路由目前已经在 `AsrHotwordRestController` 中显式实现，不需要新增第二套 CRUD 路由；后续只在其背后补齐阿里云同步逻辑即可。

### 2.6 枚举 — `AsrHotwordStatusEnum.java`

```java
public enum AsrHotwordStatusEnum {
    PENDING,    // 本地创建，待同步
    OK,         // 阿里云同步成功，可调用
    UNDEPLOYED, // 阿里云返回不可调用
    FAILED,     // 同步失败
    DELETED     // 远端已删除，本地保留审计状态时使用（软删除前可短暂出现）
}
```

### 2.6b 输入校验与唯一性

后端必须兜底校验，不能只依赖前端表单：

- `prefix`：必填；仅允许 `[a-z0-9]`；长度不超过 10。
- `targetModel`：必填；首版允许 `fun-asr`、`paraformer-v2`，后续按阿里云模型支持范围扩展。
- `vocabulary`：必须是 JSON 数组；创建和更新时至少 1 条热词。
- 热词项 `text`：必填；含非 ASCII 字符时不超过 15 个字符；纯 ASCII 时按空格分隔片段不超过 7 个。
- 热词项 `weight`：必填，范围 1-5；前端默认 4。
- 热词项 `lang`：可选；首版候选值 `zh`、`en`、`ja`、`yue`、`ko`、`de`、`fr`、`ru`。
- 本地唯一性：`vocabularyId` 全局唯一（非空时）；同一 `orgUid + prefix + targetModel + deleted=false` 建议唯一，避免同一组织内管理混乱。

> 当前 `AsrHotwordRestService.create` 已对 `name + orgUid + type` 做了去重，新增字段后建议再加一条 `prefix + orgUid + targetModel + deleted=false` 的去重校验。

### 2.7 数据库迁移

在 `starter/src/main/resources/db/changelog/migration/` 下新建 `260729_add_asr_hotword_vocabulary_fields.xml`，并同步加入 [starter/src/main/resources/db/changelog/master.xml](starter/src/main/resources/db/changelog/master.xml)：

- 如果表 `bytedesk_ai_asr_hotword` 不存在则创建（兜底）
- 添加列（幂等判断）：
  - `target_model VARCHAR(100)`
  - `prefix VARCHAR(20)`
  - `vocabulary_id VARCHAR(100)`
  - `status VARCHAR(20) DEFAULT 'PENDING'`
  - `vocabulary TEXT`
  - `provider VARCHAR(64) DEFAULT 'dashscope'`
  - `request_id VARCHAR(128)`
  - `error_message TEXT`
  - `raw_response TEXT`
  - `remote_gmt_create VARCHAR(64)`
  - `remote_gmt_modified VARCHAR(64)`
- 索引：`idx_asr_hotword_org_deleted`、`idx_asr_hotword_org_status`、`idx_asr_hotword_vocabulary_id`、`idx_asr_hotword_org_prefix_model`
- 迁移必须使用 `preConditions` 判断表/列/索引是否存在，保持幂等；基础表创建时要使用 `BaseEntity` 实际列名：`uuid`、`is_deleted`、`level_type`、`platform_type`。

### 2.8 权限 — 确认无需新增

`AsrHotwordPermissions.java` 已定义完整权限：`ASR_HOTWORD_READ/CREATE/UPDATE/DELETE/EXPORT`，新增的 action 端点复用现有 READ/WRITE 权限即可。

---

## 3. 前端改造

### 3.1 TypeScript 类型定义

按 admin 当前约定，在 [frontend/apps/admin/src/@types/ai](frontend/apps/admin/src/@types/ai) 下新增 `asrHotword.d.ts`，采用全局 namespace 方式声明，而不是将类型放到页面目录中：

```typescript
// ASR_HOTWORD.AsrHotwordRequest
// ASR_HOTWORD.AsrHotwordResponse
// ASR_HOTWORD.HotwordItem { text: string; weight: number; lang?: string }
// ASR_HOTWORD.RemoteVocabularyItem { vocabularyId, gmtCreate, gmtModified, status, targetModel, vocabulary[] }
```

### 3.2 API 函数 — `frontend/apps/admin/src/apis/ai/asrHotword.ts`

```typescript
queryAsrHotwordsByOrg(params)  // GET  /api/v1/asr_hotword/query/org
createAsrHotword(params)       // POST /api/v1/asr_hotword/create
updateAsrHotword(params)       // POST /api/v1/asr_hotword/update
deleteAsrHotword(params)       // POST /api/v1/asr_hotword/delete
syncAsrHotwordStatus(params)   // POST /api/v1/asr_hotword/sync
queryRemoteVocabularies(params)// POST /api/v1/asr_hotword/remote/list (可选)
queryRemoteVocabularyDetail(params)// POST /api/v1/asr_hotword/remote/detail (可选)
```

### 3.3 权限常量 — `authorities.ts`

在 `PERMISSION_MODULE` 中添加：

```typescript
ASR_HOTWORD: 'ASR_HOTWORD',
```

### 3.4 Table 组件 — `AsrHotwordTable.tsx`

仿照 `AsrTable.tsx` / `VoiceCloneTable` 的 ProTable 模式，放在 [frontend/apps/admin/src/pages/Dashboard/Ai/Robot/agent/asr_hotword](frontend/apps/admin/src/pages/Dashboard/Ai/Robot/agent/asr_hotword)：

- **列定义**：
  - name（热词列表名称）
  - targetModel（目标模型）
  - prefix（前缀标识）
  - vocabularyId（阿里云 ID，可复制）
  - status（状态标签：PENDING/OK/UNDEPLOYED/FAILED/DELETED）
  - errorMessage（失败原因，失败时展示）
  - type（热词类型）
  - createdAt（创建时间）
  - 操作列：编辑、删除、同步状态
- **工具栏**：新建热词列表按钮
- **行操作**：点击行打开 Drawer 查看详情

### 3.5 Drawer 组件 — `AsrHotwordDrawer.tsx`

创建/编辑表单：

- name（必填，热词列表名称）
- targetModel（下拉选择：`fun-asr` / `paraformer-v2`）
- prefix（必填，数字+小写字母，≤10 字符）
- description（可选）
- type（下拉选择热词类型）
- **热词编辑器**（核心功能）：
  - 动态列表，每行：text（热词文本）+ weight（权重 1-5，默认 4）+ lang（语种下拉，可选）
  - 支持添加/删除行
  - 支持批量导入（粘贴多行文本）
  - 存储为 JSON 数组到 `vocabulary` 字段
- status（只读，显示同步状态）
- requestId / errorMessage / rawResponse（详情模式展示，rawResponse 默认折叠）

表单交互约束：

- 新建时 `prefix` 可编辑；一旦创建成功并获得 `vocabularyId`，编辑时默认不允许修改 `prefix` 和 `targetModel`，避免本地记录与远端资源错位。
- 编辑已同步记录时，只允许更新热词内容、名称、描述和备注类字段。
- 点击“同步状态”后刷新当前行，并在失败时显示 `errorMessage`。
- 批量粘贴导入格式：每行一个热词；默认 `weight=4`、`lang` 留空；高级格式可支持 `text,weight,lang`。

### 3.6 注册到 RobotAgentPage

在 `agent/index.tsx` 中：

```tsx
import AsrHotwordTable from "./asr_hotword";

// 权限检查
const canAnyAsrHotword = access?.hasAnyModulePermission?.(PERMISSION_MODULE.ASR_HOTWORD) ?? false;

// 添加 tab
if (canAnyAsrHotword && isEnterpriseOrPlatformEdition()) {
  items.push({
    key: "asrHotword",
    label: intl.formatMessage({ id: "robot.agent.tab.asrHotword", defaultMessage: "热词" }),
    children: <AsrHotwordTable />,
  });
}
```

### 3.7 国际化文案

按 admin 当前约定拆分：

- tab 文案写入 `robot.ts`
- 字段、状态、按钮、提示文案写入 `ai.ts`

因此需要至少修改：

- `frontend/apps/admin/src/locales/zh-CN/robot.ts`
- `frontend/apps/admin/src/locales/ja-JP/robot.ts`
- `frontend/apps/admin/src/locales/zh-CN/ai.ts`
- `frontend/apps/admin/src/locales/ja-JP/ai.ts`

其中新增：

- `asrHotword.field.name` — 热词列表名称
- `asrHotword.field.targetModel` — 目标模型
- `asrHotword.field.prefix` — 前缀
- `asrHotword.field.vocabularyId` — 热词列表 ID
- `asrHotword.field.status` — 状态
- `asrHotword.field.errorMessage` — 失败原因
- `asrHotword.field.requestId` — 请求 ID
- `asrHotword.field.rawResponse` — 原始响应
- `asrHotword.field.vocabulary` — 热词内容
- `asrHotword.field.hotwordText` — 热词文本
- `asrHotword.field.hotwordWeight` — 权重
- `asrHotword.field.hotwordLang` — 语种
- `asrHotword.action.sync` — 同步状态
- `asrHotword.action.addHotword` — 添加热词
- `asrHotword.action.importHotword` — 批量导入
- `asrHotword.status.pending` → 待同步
- `asrHotword.status.ok` → 已就绪
- `asrHotword.status.undeployed` → 未部署
- `asrHotword.status.failed` → 同步失败
- `asrHotword.status.deleted` → 已删除
- `robot.agent.tab.asrHotword` — 热词

> 说明：如果实现时发现 en-US 及其他语种必须同步补齐，按仓库现有 i18n 约定可先补 `zh-CN`、`ja-JP`，其余语种回退 `defaultMessage`。

---

## 4. 实施步骤

### Phase 1: 后端数据模型

| 步骤 | 文件 | 内容 |
| ---- | ---- | ---- |
| 1.1 | `AsrHotwordEntity.java` | 已完成：增加 targetModel / prefix / vocabularyId / status / vocabularyJson / provider / requestId / errorMessage / rawResponse / remoteGmt* 字段 |
| 1.2 | `AsrHotwordRequest.java` | 已完成：增加对应字段及 pageIndex |
| 1.3 | `AsrHotwordResponse.java` | 已完成：增加对应字段 |
| 1.4 | `AsrHotwordStatusEnum.java` | 已完成：已包含 PENDING / PROCESSING / OK / UNDEPLOYED / FAILED / DELETED |
| 1.5 | `AsrHotwordSpecification.java` | 已完成：增加 targetModel / prefix / vocabularyId / status 查询过滤 |
| 1.6 | `260729_add_asr_hotword_vocabulary_fields.xml` | 已完成：migration 已创建并加入 master |
| 1.7 | `AsrHotwordRepository.java` | 已完成：增加按 vocabularyId、orgUid+prefix+targetModel+deleted 查询 |
| 1.8 | `AsrHotwordExcel.java` | 已完成：移除历史 color 残留并同步导出字段 |

### Phase 2: 后端阿里云客户端 + 服务

| 步骤 | 文件 | 内容 |
| ---- | ---- | ---- |
| 2.1 | `aliyun/AliyunAsrHotwordClient.java` | 已完成：封装 create / update / query / list / delete |
| 2.2 | `aliyun/AliyunAsrHotwordApiResponse.java` | 已完成：远端响应封装已落地 |
| 2.3 | `AsrHotwordSyncService.java` | 已完成：实际实现使用 `AsrHotwordSyncService` 作为编排层，而非文档初版命名的 `AsrHotwordService` |
| 2.4 | `AsrHotwordController.java` | 已完成：`sync`、`remote/list`、`remote/detail` 已实现 |
| 2.5 | `AsrHotwordRestService.java` | 已完成：create / update / delete / sync 已接入远端同步逻辑和本地状态写回 |

### Phase 3: 前端

| 步骤 | 文件 | 内容 |
| ---- | ---- | ---- |
| 3.1 | `src/@types/ai/asrHotword.d.ts` | 已完成：包含 request / response / hotword item / remote result 类型 |
| 3.2 | `apis/ai/asrHotword.ts` | 已完成：query / create / update / delete / sync / remote list / remote detail |
| 3.3 | `authorities.ts` | 已完成：已添加 ASR_HOTWORD |
| 3.4 | `asr_hotword/AsrHotwordTable.tsx` | 已完成：列表、同步、远端详情、远端列表预览、删除操作已接入 |
| 3.5 | `asr_hotword/AsrHotwordDrawer.tsx` | 已完成：支持结构化热词项 text / weight / lang 编辑 |
| 3.6 | `asr_hotword/index.tsx` | 已完成：占位组件已替换 |
| 3.7 | `agent/index.tsx` | 已完成：已注册 asrHotword tab |
| 3.8 | `locales/zh-CN/robot.ts` + `locales/zh-CN/ai.ts` | 已完成：中文文案已补齐到当前交互所需范围 |
| 3.9 | `locales/ja-JP/robot.ts` + `locales/ja-JP/ai.ts` | 已完成：日文文案已补齐到当前交互所需范围 |

### Phase 4: 验证

| 步骤 | 命令/方式 | 目标 |
| ---- | --------- | ---- |
| 4.1 | `env JAVA_HOME=/Users/ningjinpeng/.jdk/jdk-21.0.8/jdk-21.0.8+9/Contents/Home ./starter/mvnw -f pom.xml -pl enterprise/ai -am -DskipTests compile` | 部分完成：此前有过一次 enterprise/ai compile 成功；本轮改动后的完整 compile 仍待执行确认 |
| 4.2 | `cd frontend && pnpm lint`（或 `pnpm turbo build --filter=admin`；IDE 内 TS 类型检查无新增报错也可接受） | 部分完成：新增前端文件 IDE 诊断通过，完整 lint/build 仍待执行 |
| 4.3 | 配置 DashScope API Key + WorkspaceId 后手工创建热词 | 待执行 |
| 4.4 | 修改热词内容并保存 | 待执行 |
| 4.5 | 点击同步状态 | 待执行 |
| 4.6 | 删除热词 | 待执行 |

---

## 5. 设计决策（当前实现口径）

1. **阿里云 API 调用时机**：创建/更新/删除时**同步调用**阿里云 API 还是**仅本地存储** + 手动触发同步？建议：
   - 创建时：先调阿里云创建 → 获取 vocabularyId → 落库（status=OK）
   - 更新时：先调阿里云更新 → 更新本地记录
   - 删除时：先调阿里云删除 → 软删除本地记录
   - 同时提供"同步状态"按钮手动刷新

2. **prefix 生成策略**：是否需要自动生成 prefix（如基于 uid 前 N 位），还是由用户手动输入？结合阿里云限制“仅数字和小写字母、长度不超过 10”，建议以前端手动输入为主，后端兜底规范化和长度校验。

3. **热词编辑器**：首版是否支持从 CSV/Excel 批量导入热词？建议首版只做“逐条编辑 + 多行粘贴导入”，暂不引入 Excel 上传，避免把工作范围扩展到文件解析和模板维护。

4. **与 ASR 调用的关联**：在现有 ASR 识别请求（`AsrRequest`）中是否需要增加 `vocabularyId` 参数，以在识别时使用热词？建议把这一项明确拆成后续阶段，当前规划先只完成“热词管理 + 远端同步”，不改动已有 ASR 执行链路。

5. **远端查询接口范围**：当前实现已包含 `remote/list` 和 `remote/detail`，因此这一项不再属于待确认，而是作为已实现增强能力保留。

6. **同步失败时是否保留本地记录**：建议保留。创建远端失败时本地记录状态为 `FAILED`，保留用户输入的热词内容和失败原因，方便用户修正配置后重试；如果用户取消则再手动删除。

7. **是否展示 rawResponse**：建议在 Drawer 详情里折叠展示，不放入列表列中；生产排障时非常有用，但不应干扰常规管理界面。

---

## 6. 文件清单

### 后端（修改/新建）

```text
enterprise/ai/src/main/java/com/bytedesk/ai/asr_hotword/
├── AsrHotwordEntity.java          (修改)
├── AsrHotwordRequest.java         (修改)
├── AsrHotwordResponse.java        (修改)
├── AsrHotwordExcel.java           (修改)
├── AsrHotwordTypeEnum.java        (已有)
├── AsrHotwordStatusEnum.java      (新建)
├── AsrHotwordRestService.java     (修改)
├── AsrHotwordSyncService.java     (新建)
├── AsrHotwordController.java      (新建，sync 必做；remote/* 可选增强)
├── AsrHotwordRestController.java  (复用现有 CRUD 路由)
├── AsrHotwordRepository.java      (修改)
├── AsrHotwordSpecification.java   (修改)
├── aliyun/AliyunAsrHotwordClient.java    (新建，建议放子包)
├── aliyun/AliyunAsrHotwordApiResponse.java (新建)
└── (其他已有文件保持不变)

starter/src/main/resources/db/changelog/migration/
└── 260729_add_asr_hotword_vocabulary_fields.xml  (新建)
```

### 前端（修改/新建）

```text
frontend/apps/admin/src/
├── @types/ai/asrHotword.d.ts                          (新建)
├── apis/ai/asrHotword.ts                              (新建)
├── pages/Dashboard/Ai/Robot/agent/
│   ├── index.tsx                                       (修改)
│   └── asr_hotword/
│       ├── index.tsx                                   (修改)
│       ├── AsrHotwordTable.tsx                         (新建)
│       └── AsrHotwordDrawer.tsx                        (新建)
├── utils/authorities.ts                                (修改)
└── locales/
  ├── zh-CN/robot.ts                                  (修改)
  ├── zh-CN/ai.ts                                     (修改)
  ├── ja-JP/robot.ts                                  (修改)
  └── ja-JP/ai.ts                                     (修改)
```

---

## 7. 当前实现范围

根据当前代码，已实际落地的范围为：

1. 本地热词数据模型补齐：Entity / Request / Response / Liquibase。
2. 现有 `AsrHotwordRestController` CRUD 流程接入阿里云 create/update/delete。
3. 增加 `sync`、`remote/list`、`remote/detail` 动作端点，用于刷新远端状态和查看远端数据。
4. 前端完成 table + drawer + 结构化热词项编辑器 + RobotAgentPage tab。
5. 仍未改动现有 ASR 执行链路，本轮未把热词直接接入识别请求。
6. 当前剩余重点不是功能缺口，而是完整编译、构建和手工联调验证。

当前代码已经基本达到“管理端可配置、可同步、可查看状态”的闭环，后续如需继续扩展，重点应转向 ASR 执行链路集成和更细的批量导入体验。

## 8. 首版验收标准

- 后端 `enterprise/ai` 编译通过；前端 admin 类型检查/lint 不出现新增错误。
- 管理后台 `RobotAgentPage` 在企业版/平台版且具备 `ASR_HOTWORD` 权限时显示"热词"tab。
- 用户可以创建热词列表，至少包含 name / targetModel / prefix / vocabulary[]，创建成功后可看到 `vocabularyId` 和 `OK` 状态。
- 用户可以编辑已创建热词列表的热词内容，更新后本地与阿里云远端内容一致。
- 用户可以同步状态，失败时能在列表或详情抽屉看到可读的失败原因。
- 用户可以删除热词列表，本地记录按现有删除规范软删除，远端不存在时不阻断删除流程。

## 9. 不需要改动的文件（确认清单）

以下文件本次**无需修改**，避免过度改动：

| 文件 | 原因 |
| ---- | ---- |
| `AsrHotwordTools.java` | 已通过 BaseTools 泛型参数绑定 AsrHotwordRequest/AsrHotwordResponse，新增字段自动透传 |
| `AsrHotwordEventListener.java` | 只监听组织创建事件触发 initAsrHotwords，不依赖具体字段 |
| `event/AsrHotwordCreateEvent.java` 等 | 只携带 Entity 引用，无需修改 |
| `AsrHotwordInitializer.java` | 只做权限初始化和触发 initAsrHotwords |
| `AsrHotwordInitData.java` | 已全部注释，无实际作用 |
| `AsrHotwordEntityListener.java` | 已在 Entity 上注释掉，保持现状 |
| `I18Consts.java` | 已有 `I18N_ASR_HOTWORD` 常量 |
| `AsrHotwordPermissions.java` | 权限定义已完整 |
| `AsrHotwordTypeEnum.java` | 现有 THREAD/VISITOR/CUSTOMER/TICKET 可作为热词适用场景标记 |
| `ModelMapper` Bean 配置 | 默认按同名字段映射，新增字段自动映射到 Entity ↔ Response |

请审核上述规划，确认后我将按这个收敛版范围实现代码。
