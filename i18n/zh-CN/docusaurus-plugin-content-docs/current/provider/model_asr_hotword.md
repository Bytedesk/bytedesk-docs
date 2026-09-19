---
sidebar_label: ASR语音识别定制热词
sidebar_position: 27
---

# ASR 语音识别定制热词

微语客服系统支持 ASR 语音识别定制热词（Vocabulary）能力，可创建热词列表并同步至阿里云百炼平台，用于提升特定词语的 ASR 语音识别准确率。管理员可在后台管理热词列表，实时查看同步状态，并一键从阿里云拉取最新状态。

## 一、ASR 热词可以解决什么问题

- **提升专有名词识别率**：将产品名称、品牌名、专业术语等添加为热词，显著提升 ASR 对这些词语的识别准确率
- **行业术语优化**：针对医疗、法律、金融等行业，将高频行业用语添加为热词，让语音识别更贴合业务场景
- **多语种支持**：支持为不同语种（中/英/日/粤/韩/德/法/俄）配置热词权重，满足国际化需求
- **集中管理**：所有热词列表统一在后台管理，支持增删改查与同步状态追踪

## 二、核心概念

| 概念 | 说明 |
| ---- | ---- |
| **热词列表（Vocabulary）** | 一组热词项集合，创建并同步至阿里云后，可在 ASR 识别时引用以提升特定词语识别率 |
| **热词项** | 每条热词包含 `text`（热词文本）、`weight`（权重 1-5，默认 4）、`lang`（可选语种） |
| **prefix** | 热词列表自定义前缀，仅允许数字和小写字母，长度 ≤ 10 字符，用于列表标识和筛选 |
| **targetModel** | 目标语音识别模型（如 `fun-asr`、`paraformer-v2`），热词列表必须与后续 ASR 调用使用的模型一致 |
| **vocabularyId** | 阿里云返回的热词列表唯一标识（如 `vocab-testpfx-xxxx`） |

### 热词项约束

| 字段 | 约束 |
| ---- | ---- |
| `text` | 必填；含非 ASCII 字符时不超过 15 个字符；纯 ASCII 时按空格分隔片段不超过 7 个 |
| `weight` | 必填，范围 1-5，默认 4 |
| `lang` | 可选，支持 `zh` / `en` / `ja` / `yue` / `ko` / `de` / `fr` / `ru` |

## 三、支持的目标模型

| 模型 ID | 说明 |
| ------- | ---- |
| `fun-asr` | Fun-ASR 语音识别模型 |
| `paraformer-v2` | Paraformer V2 语音识别模型 |

> 首版支持的模型范围以阿里云百炼平台当前支持为准，后续可按平台更新扩展。

## 四、管理后台功能介绍

### 1. 热词列表

在 智能助手 → 智能体页面中，切换到"热词"页签，可查看当前组织下所有热词列表。列表以 ProTable 形式展示，包含以下字段：

- **热词列表名称**：用户自定义名称
- **目标模型**：选择的目标 ASR 识别模型
- **前缀**：热词列表前缀标识
- **热词列表 ID**：阿里云返回的 vocabularyId，可复制
- **状态**：PENDING（待同步）/ OK（已就绪）/ UNDEPLOYED（不可调用）/ FAILED（同步失败）/ DELETED（已删除）

支持的操作：

- 按名称、目标模型、前缀、状态筛选
- 新建热词列表
- 编辑热词内容
- 同步状态（从阿里云拉取最新状态）
- 删除（同时删除远端阿里云热词列表）

### 2. 新建/编辑热词 Drawer

点击"新建热词列表"或行操作"编辑"，打开侧边抽屉填写以下信息：

| 字段 | 说明 | 必填 |
| ---- | ---- | ---- |
| 热词列表名称 | 自定义名称，如"产品词库" | ✅ |
| 目标模型 | 从下拉列表中选择 `fun-asr` 或 `paraformer-v2` | ✅ |
| 前缀 | 数字 + 小写字母，≤ 10 字符，如 `prod`、`sku` | ✅ |
| 描述 | 可选说明 | ❌ |
| 类型 | 热词适用场景（THREAD/VISITOR/CUSTOMER/TICKET） | ❌ |

#### 热词编辑器

在 Drawer 中可逐条编辑热词内容：

- 每行包含：热词文本 + 权重（1-5）+ 语种（下拉可选）
- 支持添加/删除行
- 支持多行文本批量粘贴导入（每行一个热词，默认 weight=4，lang 留空）
- 存储为 JSON 数组提交到 `vocabulary` 字段

> **注意**：新建成功后获得 `vocabularyId`，再次编辑时不允许修改 `prefix` 和 `targetModel`，避免与远端资源错位。编辑已同步的热词列表时，仅允许更新热词内容、名称和描述。

### 3. 同步状态

点击列表操作列的"同步状态"按钮：

- 从阿里云拉取最新状态，更新本地记录的 `status`、`errorMessage`、`rawResponse` 等字段
- 同步失败时在列表错误信息列显示可读的失败原因

### 4. 远端查询（可选增强）

- **远端列表**：查询阿里云远端热词列表（不落库）
- **远端详情**：按 `vocabularyId` 查询阿里云远端热词完整内容

## 五、权限控制

ASR 热词功能的权限模块为 `ASR_HOTWORD`，包含以下子权限：

| 权限 | 说明 | 适用接口 |
| ---- | ---- | -------- |
| `ASR_HOTWORD_READ` | 查看 | 查询列表、远端查询 |
| `ASR_HOTWORD_CREATE` | 创建 | 新建热词列表 |
| `ASR_HOTWORD_UPDATE` | 更新 | 编辑热词、同步状态 |
| `ASR_HOTWORD_DELETE` | 删除 | 删除热词列表 |
| `ASR_HOTWORD_EXPORT` | 导出 | Excel 导出 |

仅具备相应权限且在 Enterprise / Platform 版本中，AI 智能体页面才会显示"热词"页签。

## 六、API 端点一览

| 方法 | 路径 | 权限 | 说明 |
| ---- | ---- | ---- | ---- |
| GET | `/api/v1/asr_hotword/query/org` | READ | 按组织查询热词列表 |
| GET | `/api/v1/asr_hotword/query/user` | READ | 按用户查询热词列表 |
| GET | `/api/v1/asr_hotword/query/uid` | READ | 按 UID 查询单条 |
| POST | `/api/v1/asr_hotword/create` | CREATE | 创建热词列表（含远端同步） |
| POST | `/api/v1/asr_hotword/update` | UPDATE | 更新热词列表（含远端同步） |
| POST | `/api/v1/asr_hotword/delete` | DELETE | 删除热词列表（含远端删除） |
| GET | `/api/v1/asr_hotword/export` | EXPORT | Excel 导出 |
| POST | `/api/v1/asr_hotword/sync` | UPDATE | 从阿里云同步热词状态 |
| POST | `/api/v1/asr_hotword/remote/list` | READ | 查询阿里云远端热词列表 |
| POST | `/api/v1/asr_hotword/remote/detail` | READ | 查询阿里云远端热词详情 |

## 七、同步策略

ASR 热词管理采用"本地编辑 + 实时远端同步"策略：

| 操作 | 同步时机 | 行为 |
| ---- | -------- | ---- |
| 创建 | 保存时同步调用 | 先调阿里云创建 → 获取 `vocabularyId` → 落库（status=OK） |
| 更新 | 保存时同步调用 | 先调阿里云全量更新 → 更新本地记录 |
| 删除 | 删除时同步调用 | 先调阿里云删除 → 软删除本地记录 |
| 同步 | 手动触发 | 按 `vocabularyId` 或 `prefix` 从阿里云拉取最新状态 |

**失败处理**：

- 远端调用失败时，本地记录 `status` 写为 `FAILED`，同时保存 `errorMessage` 和 `rawResponse`
- 远端删除返回"资源不存在"类结果时，视为删除成功，正常软删除本地记录

## 八、配置说明

ASR 热词能力基于阿里云百炼 DashScope 平台提供。使用前需在 `application.properties` 中配置以下参数：

```properties
# DashScope API Key（复用现有 ASR 配置）
spring.ai.dashscope.audio.transcription.api-key=${spring.ai.dashscope.api-key:${DASHSCOPE_API_KEY:}}

# 阿里云百炼 WorkspaceId
bytedesk.ai.dashscope.workspace-id=ws-xxxxxxxxxxxx

# 可选：区域配置（默认 cn-beijing）
bytedesk.ai.dashscope.region=cn-beijing

# 可选：自定义热词端点（优先级最高）
# bytedesk.ai.dashscope.asr-hotword.endpoint=https://custom.endpoint.com
```

> **注意**：阿里云新加坡地域的子业务空间暂不支持热词功能。若使用新加坡地域，调用将返回明确错误提示。

## 九、技术实现

ASR 热词模块位于 `enterprise/ai` 模块，核心类：

| 类 | 职责 |
| --- | --- |
| `AsrHotwordEntity` | JPA 实体，保存本地热词记录与远端同步状态 |
| `AsrHotwordRestController` | CRUD 型 API（query / create / update / delete / export） |
| `AsrHotwordController` | 执行型 API（sync / remote list / remote detail） |
| `AsrHotwordRestService` | 核心业务逻辑，本地 CRUD + 调用同步编排 |
| `AsrHotwordSyncService` | 远端同步编排层，封装阿里云 API 的 create/update/delete/query |
| `AliyunAsrHotwordClient` | 阿里云 DashScope ASR 热词 HTTP API 客户端 |
| `AliyunAsrHotwordApiResponse` | 阿里云 API 响应归一化 DTO |
| `AsrHotwordStatusEnum` | PENDING / OK / UNDEPLOYED / FAILED / DELETED 枚举 |
| `AsrHotwordTypeEnum` | THREAD / VISITOR / CUSTOMER / TICKET 枚举（热词适用场景） |
| `AsrHotwordSpecification` | 查询过滤条件构建 |
| `AsrHotwordPermissions` | 权限常量定义 |

### 端点解析优先级

阿里云热词 API 端点按以下优先级解析：

1. 自定义端点：`bytedesk.ai.dashscope.asr-hotword.endpoint`
2. Workspace 端点：`{WorkspaceId}.{region}.maas.aliyuncs.com`
3. 公共端点 fallback：北京 `dashscope.aliyuncs.com`，新加坡 `dashscope-intl.aliyuncs.com`

## 十、参考链接

- [阿里云 ASR 语音识别定制热词 Java SDK 参考](https://help.aliyun.com/zh/model-studio/vocabulary-java-sdk)
- [阿里云 ASR 语音识别定制热词 HTTP API 参考](https://help.aliyun.com/zh/model-studio/vocabulary-http-api)
