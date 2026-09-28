# 声音克隆/声音设计 — 规划文档

> 日期：2026-07-29
> 状态：**已实现（待编译验证）**
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)

---

## 实现状态总览

> 最后更新：2026-07-29

### Phase 1: 数据模型层 ✅ 已完成

| 步骤 | 文件 | 状态 |
| ---- | ---- | ---- |
| 1.1 | `VoiceCloneTypeEnum.java` | ✅ CLONE / DESIGN |
| 1.2 | `VoiceCloneStatusEnum.java` | ✅ PENDING / DEPLOYING / OK / UNDEPLOYED / FAILED |
| 1.3 | `VoiceCloneEntity.java` | ✅ 全部 13 个新字段 |
| 1.4 | `VoiceCloneRequest.java` | ✅ 对应字段 + `pageIndex` |
| 1.5 | `VoiceCloneResponse.java` | ✅ 对应字段 |
| 1.6 | `VoiceCloneRestService.java` | ✅ `saveSystemEntity` / `deleteSystemByUid` / `saveInternalEntity`，乐观锁合并字段，`VoiceCloneSpecification` 扩展筛选 |

### Phase 2: 阿里云 API 客户端 + 服务层 ✅ 已完成

| 步骤 | 文件 | 状态 |
| ---- | ---- | ---- |
| 2.1 | `AliyunVoiceCloneClient.java` | ✅ `createVoiceByUrl` / `createVoiceByDesign` / `listVoices` / `queryVoice` / `updateVoice` / `deleteVoice`，模型族路由（Qwen-TTS / Qwen-Audio-TTS / CosyVoice），404视为成功，`parseResponse` 归一化 |
| 2.1b | `VoiceCloneApiResponse.java` | ✅ 含 `previewAudioData` / `previewAudioFormat` / `data` / `rawResponse` |
| 2.2 | `VoiceCloneService.java` | ✅ `clone` / `design` / `listRemoteVoices` / `queryRemoteVoice` / `updateRemoteVoice` / `deleteRemoteVoice`，`ModelFamily` 内部枚举，base64 data URI 转换，音频格式校验，公网 URL 校验，预览音频落盘，远端删除先远端后本地 |
| 2.3 | `VoiceCloneController.java` | ✅ 6 个执行型端点 + `@PreAuthorize`，使用 `JsonResult.success()` 包装 |

### Phase 3: 前端 ✅ 已完成

| 步骤 | 文件 | 状态 |
| ---- | ---- | ---- |
| 3.1 | `voiceClone.d.ts` | ✅ 类型定义（`VoiceCloneRequest` / `VoiceCloneResponse` / `RemoteVoiceResult` / `HttpPageResult`） |
| 3.2 | `voiceClone.ts` | ✅ 8 个 API 函数（`queryVoiceClonesByOrg` / `cloneVoice` / `designVoice` / `queryRemoteVoices` / `queryRemoteVoiceDetail` / `updateRemoteVoice` / `deleteRemoteVoice` / `deleteVoiceCloneRecord`） |
| 3.3 | `authorities.ts` | ✅ `VOICE_CLONE: 'VOICE_CLONE'` |
| 3.4 | `voice_clone/index.tsx` | ✅ ProTable（name / cloneType / targetModel / voiceId / status / createdAt / 操作列），工具栏含声音复刻和声音设计按钮 |
| 3.5 | `VoiceCloneCloneModal.tsx` | ✅ 表单（name / targetModel / audioUrl / prefix），Upload 上传 + 手动输入 + 朗读录音三种音频来源 |
| 3.6 | `VoiceCloneDesignModal.tsx` | ✅ 表单（name / targetModel / voicePrompt / previewText / prefix） |
| 3.7 | `VoiceCloneRecordModal.tsx` | ✅ 朗读录音弹窗（中/日文提示文本、音量可视化、MediaRecorder 录音、上传回填、能力探测降级、WebM 格式警告） |
| 3.8 | `VoiceCloneDrawer.tsx` | ✅ 详情抽屉（Descriptions + audio 播放 + 远端查询/更新/删除，Qwen-TTS 限制提示） |
| 3.9 | `agent/index.tsx` | ✅ voiceClone tab 注册（`canAnyVoiceClone && isEnterpriseOrPlatformEdition()`） |
| 3.10 | `ai.ts` / `robot.ts` (zh-CN + ja-JP) | ✅ 中/日文完整文案 |

### Phase 4: 数据库 ✅ 已完成

| 步骤 | 文件 | 状态 |
| ---- | ---- | ---- |
| 4.1 | `260729_add_voice_clone_fields.xml` | ✅ 幂等迁移：建表兜底 + 13 个加列兜底 + 3 个索引（org_deleted / org_clone_type / org_status） |
| 4.2 | `master.xml` | ✅ include |

### ⚠️ 待完成

| 项目 | 说明 |
| ---- | ---- |
| Maven compile 验证 | `enterprise/ai` 模块尚未通过 Maven 编译，仅通过了编辑器静态检查（无错误） |
| 前端构建验证 | admin 前端尚未通过 `pnpm build` 或 TypeScript 类型检查 |
| TTS 音色集成路径 | 按计划首版不实现，后续需要将自定义 voiceId 接入 TTS 合成 |
| `VoiceCloneVoiceList.tsx` | 按计划标记为"可选"，首版未实现 |
| 集成测试 | 需要实际配置 API Key 和 WorkspaceId 后验证阿里云 API 调用 |

---

## 1. 概述

基于阿里云百炼平台的声音复刻与声音设计能力，在 `enterprise/ai` 中实现声音克隆功能，并完善前端 `VoiceClone` 组件，提供完整的音色创建、管理、查询体验。

### 两类能力，三种创建路径

| 路径 | 归属能力 | 说明 | 输入 | 阿里云 model 参数 |
| ---- | -------- | ---- | ---- | ----------------- |
| **声音复刻（上传）** | Voice Cloning | 上传现成音频样本，AI 复制音色 | 音频文件 URL | `voice-enrollment` / `qwen-voice-enrollment` |
| **声音复刻（朗读录音）** | Voice Cloning | 提供提示文本，用户现场录音后再复刻音色 | 浏览器录音文件 → 上传后得到 URL | `voice-enrollment` / `qwen-voice-enrollment` |
| **声音设计** (Voice Design) | Voice Design | 用自然语言描述声音特质，AI 生成音色 | 文字描述 | `qwen-voice-design` |

### 支持的模型系列

| 模型系列 | 声音复刻 | 声音设计 | 支持地域 |
| -------- | -------- | -------- | -------- |
| Qwen-Audio-TTS | ✅ | ❌ | 北京、新加坡 |
| CosyVoice | ✅ | ✅ | 北京（v3.5/v3）、新加坡（v3） |
| Qwen-TTS | ✅ | ✅ | 北京、新加坡 |
| Qwen-Audio-Realtime | ✅ | ❌ | 仅北京 |
| MiniMax | ✅ | ❌ | 仅北京 |

> **首版范围**：聚焦 Qwen-Audio-TTS / CosyVoice / Qwen-TTS 三个模型系列的声音复刻 + CosyVoice / Qwen-TTS 的声音设计。MiniMax 和 Qwen-Audio-Realtime 暂不纳入首版。

---

## 2. 核心需求拆解

### 2.1 用户故事

1. **声音复刻**：管理员上传一段 10~20 秒的音频样本 → 系统调用阿里云 API 创建音色 → 返回 voice_id → 可在 TTS 合成中使用该音色。
2. **朗读录音复刻**（新增）：管理员看到一段推荐文本 → 点击录音开始朗读 → 录音结束后自动上传 → 系统用该录音调用阿里云 API 创建音色 → 返回 voice_id。
3. **声音设计**：管理员用文字描述期望的声音（如"沉稳的中年男性播音员，音色低沉浑厚"）→ 系统调用阿里云 API 生成音色 → 返回预览音频 + voice_id。
4. **音色管理**：查看已创建的音色列表、详情；删除不再需要的音色；更新音色（重新上传音频）。
5. **记录保存**：每次声音复刻/设计操作保存为一条记录，便于追溯。

### 2.2 功能矩阵

| 功能 | 前端入口 | 后端 API |
| ---- | -------- | -------- |
| 声音复刻（上传音频） | Modal（上传音频文件或填写音频 URL + 选择目标模型） | `POST /api/v1/voice_clone/clone` |
| 声音复刻（浏览器录音） | Modal（展示朗读文本 → 录音 → 自动上传 → 回填 audioUrl） | 同上传音频路径：先通过现有上传接口上传录音文件，再调用 `POST /api/v1/voice_clone/clone` |
| 声音设计（文字描述） | Modal（表单输入描述 + 选择目标模型） | `POST /api/v1/voice_clone/design` |
| 操作记录列表查询 | Table（ProTable） | 已有 REST：`GET /api/v1/voice_clone/query/org` |
| 远端音色列表查询 | Drawer / 扩展区（可选） | `POST /api/v1/voice_clone/voices` |
| 音色详情查询 | Drawer | `POST /api/v1/voice_clone/voice/detail` |
| 删除音色 | Table 操作列 | `POST /api/v1/voice_clone/voice/delete` |
| 更新音色 | Drawer | `POST /api/v1/voice_clone/voice/update` |
| 操作记录 CRUD | Table（已有框架） | 已有 REST 接口 |

---

## 3. 数据模型设计

### 3.1 Entity 改造：`VoiceCloneEntity`

现有 Entity 仅含 `name`、`description`、`type` 三个业务字段，需扩展以支持声音复刻/设计场景。保持不变的是 `extends BaseEntity`（已提供 id、uid、orgUid、level、platform、deleted、createdAt、updatedAt）。

**新增字段**：

| 字段 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| `provider` | String | `dashscope` | 服务提供商 |
| `cloneType` | String | `CLONE` | 克隆类型：`CLONE`（声音复刻）/ `DESIGN`（声音设计） |
| `targetModel` | String | — | 目标语音合成模型（如 `qwen-audio-3.0-tts-flash`） |
| `audioUrl` | String | — | 音频样本 URL（声音复刻用） |
| `voicePrompt` | String (2048) | — | 声音描述文本（声音设计用；CosyVoice 限 500，Qwen-TTS 限 2048） |
| `previewText` | String (1024) | — | 试听/预览文本（声音设计用，便于追溯生成预览音频时使用的文本） |
| `prefix` | String | — | 音色名称前缀 |
| `voiceId` | String | — | 阿里云返回的 voice_id |
| `voiceName` | String | — | 阿里云返回的完整音色名称 |
| `previewAudioUrl` | String | — | 预览音频 URL（声音设计返回） |
| `status` | String | `PENDING` | 音色状态：`PENDING` / `DEPLOYING` / `OK` / `UNDEPLOYED` / `FAILED` |
| `requestId` | String | — | 阿里云 API request_id（用于排查） |
| `errorMessage` | String (1024) | — | 错误信息 |

> 声音设计接口返回的预览音频可能是 base64 数据而不是 URL。后端应将预览音频写入现有上传目录/静态资源路径，再把可访问地址保存到 `previewAudioUrl`，前端只消费 URL。

**保留字段**：`name`（用户自定义名称）、`description`、`type`（`VoiceCloneTypeEnum`）。

### 3.2 枚举扩展

#### 新增：VoiceCloneTypeEnum

```java
public enum VoiceCloneTypeEnum {
    CLONE,   // 声音复刻（基于音频样本）
    DESIGN   // 声音设计（基于文字描述）
}
```

#### 新增：VoiceCloneStatusEnum

```java
public enum VoiceCloneStatusEnum {
    PENDING,     // 待处理
    DEPLOYING,   // 审核中
    OK,          // 可用
    UNDEPLOYED,  // 审核未通过
    FAILED       // 调用失败
}
```

### 3.3 DTO 扩展

**VoiceCloneRequest 新增字段**：`provider`、`cloneType`、`targetModel`、`audioUrl`、`voicePrompt`、`prefix`、`previewText`、`voiceId`。

**VoiceCloneResponse 新增字段**：上述所有 Entity 字段。

---

## 4. 后端实现设计

### 4.1 新增文件清单

```text
enterprise/ai/src/main/java/com/bytedesk/ai/voice_clone/
├── VoiceCloneTypeEnum.java          # 新增：克隆类型枚举
├── VoiceCloneStatusEnum.java             # 新增：音色状态枚举
├── VoiceCloneController.java             # 新增：执行入口（clone/design/remote voice ops）
├── VoiceCloneService.java                # 新增：核心业务逻辑（调用阿里云 API）
├── aliyun/
│   ├── AliyunVoiceCloneClient.java       # 新增：阿里云声音复刻 HTTP API 客户端
│   └── VoiceCloneApiResponse.java        # 新增：阿里云 API 响应 DTO（内部使用）
```

### 4.2 修改文件清单

| 文件 | 修改内容 |
| ---- | -------- |
| `VoiceCloneEntity.java` | 新增 provider、cloneType、targetModel、audioUrl、voicePrompt、previewText、prefix、voiceId、voiceName、previewAudioUrl、status、requestId、errorMessage 字段 |
| `VoiceCloneRequest.java` | 新增对应请求字段 |
| `VoiceCloneResponse.java` | 新增对应响应字段 |
| `VoiceCloneRestController.java` | 保持 CRUD/export 语义不变，不承载执行型接口 |
| `VoiceCloneRestService.java` | 扩展字段映射与本地记录回写逻辑 |

### 4.3 API 端点设计

> **控制器分层约束**：参考 TTS/ASR/OCR 现有模式，执行型接口不直接塞进当前 `VoiceCloneRestController`。首版应新增 `VoiceCloneController` 负责 `/clone`、`/design` 和远端音色管理；`VoiceCloneRestController` 继续只做本地 CRUD 与导出。

#### 4.3.1 声音复刻

```text
POST /api/v1/voice_clone/clone
```

请求体：

```json
{
    "name": "我的客服音色",
    "targetModel": "qwen-audio-3.0-tts-flash",
    "audioUrl": "https://example.com/audio/sample.wav",
    "prefix": "myvoice",
    "orgUid": "xxx"
}
```

响应：

```json
{
    "code": 200,
    "data": {
        "uid": "xxx",
        "voiceId": "qwen-audio-3.0-tts-flash-myvoice-xxxxxx",
        "voiceName": "qwen-audio-3.0-tts-flash-myvoice-xxxxxx",
        "status": "DEPLOYING",
        "requestId": "xxxx-xxxx-xxxx"
    }
}
```

#### 4.3.2 声音设计

```text
POST /api/v1/voice_clone/design
```

请求体：

```json
{
    "name": "沉稳男播音",
    "targetModel": "cosyvoice-v3.5-plus",
    "voicePrompt": "沉稳的中年男性播音员，音色低沉浑厚，富有磁性，语速平稳，吐字清晰",
    "prefix": "announcer",
    "previewText": "各位听众朋友，大家好",
    "orgUid": "xxx"
}
```

#### 4.3.3 音色列表查询

```text
POST /api/v1/voice_clone/voices
```

请求体：

```json
{
    "targetModel": "qwen-audio-3.0-tts-flash",
    "prefix": "myvoice",
    "pageIndex": 0,
    "pageSize": 10,
    "orgUid": "xxx"
}
```

调用阿里云 `list_voice` / `list` API，返回阿里云侧的已创建音色列表（用于同步/查看云端状态）。

#### 4.3.4 音色详情

```text
POST /api/v1/voice_clone/voice/detail
```

请求体：

```json
{
    "voiceId": "qwen-audio-3.0-tts-flash-myvoice-xxxxxx",
    "targetModel": "qwen-audio-3.0-tts-flash"
}
```

#### 4.3.5 删除音色

```text
POST /api/v1/voice_clone/voice/delete
```

请求体：

```json
{
    "voiceId": "qwen-audio-3.0-tts-flash-myvoice-xxxxxx",
    "targetModel": "qwen-audio-3.0-tts-flash"
}
```

#### 4.3.6 更新音色（重新上传音频）

```text
POST /api/v1/voice_clone/voice/update
```

请求体：

```json
{
    "voiceId": "qwen-audio-3.0-tts-flash-myvoice-xxxxxx",
    "audioUrl": "https://example.com/audio/new-sample.wav",
    "targetModel": "qwen-audio-3.0-tts-flash"
}
```

### 4.4 阿里云 API 调用设计

#### 服务端点

| 模型系列 | 端点 |
| -------- | ---- |
| Qwen-Audio-TTS / CosyVoice / Qwen-TTS | 优先 `POST https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/api/v1/services/audio/tts/customization`，兼容 `https://dashscope.aliyuncs.com/api/v1/services/audio/tts/customization` |

> 阿里云文档建议北京/新加坡使用业务空间专属域名；现有公共域名仍可用。首版配置优先级建议为：显式 `bytedesk.ai.dashscope.voice-clone.endpoint` > `workspaceId + region` 拼接专属域名 > 公共 DashScope endpoint。

#### 关键请求参数映射

| 操作 | model | action | 核心参数 |
| ---- | ----- | ------ | -------- |
| 声音复刻 (Qwen-Audio-TTS/CosyVoice) | `voice-enrollment` | `create_voice` | `target_model`, `url`, `prefix` |
| 声音复刻 (Qwen-TTS) | `qwen-voice-enrollment` | `create` | `target_model`, `audio.data` (base64 data URI), `preferred_name` |
| 声音设计 (CosyVoice) | `voice-enrollment` | `create_voice` | `target_model`, `voice_prompt`, `preview_text`, `prefix` |
| 声音设计 (Qwen-TTS) | `qwen-voice-design` | `create` | `target_model`, `voice_prompt`, `preview_text`, `preferred_name` |
| 查询列表 (Qwen-Audio-TTS/CosyVoice) | `voice-enrollment` | `list_voice` | `prefix`, `page_index`, `page_size` |
| 查询列表 (Qwen-TTS) | `qwen-voice-enrollment` | `list` | — |
| 查询详情 | `voice-enrollment` | `query_voice` | `voice_id` |
| 更新音色 | `voice-enrollment` | `update_voice` | `voice_id`, `url` |
| 删除 (Qwen-Audio-TTS/CosyVoice) | `voice-enrollment` | `delete_voice` | `voice_id` |
| 删除 (Qwen-TTS) | `qwen-voice-enrollment` | `delete` | `voice` |

#### 模型族路由

后端应根据 `targetModel` 判断模型族并生成不同请求体，而不是让前端传 `model/action`：

| 判断规则 | 模型族 | 创建请求 |
| -------- | ------ | -------- |
| `targetModel` 以 `qwen-audio-` 开头 | Qwen-Audio-TTS | `voice-enrollment/create_voice` + URL |
| `targetModel` 以 `cosyvoice-` 开头 | CosyVoice | `voice-enrollment/create_voice` + URL 或 voice_prompt |
| `targetModel` 以 `qwen3-tts-vc-` 开头 | Qwen-TTS voice clone | `qwen-voice-enrollment/create` + base64 data URI |
| `targetModel` 以 `qwen3-tts-vd-` 开头 | Qwen-TTS voice design | `qwen-voice-design/create` + voice_prompt |

这样 `VoiceCloneRequest` 对前端保持稳定，只暴露 `cloneType`、`targetModel`、`audioUrl`、`voicePrompt` 等业务字段。

> 首版建议**不新增** `audioSource` 到数据库或 DTO。无论来源是手动 URL、文件上传还是浏览器录音，最终都统一落到 `audioUrl`。如果后续需要审计“音频来源”，再单独追加 `audioSource`（`MANUAL_URL` / `UPLOAD` / `RECORD`）枚举字段。

#### 音频输入处理

前端上传成功后通常拿到 `response.data.fileUrl`。后端需要按模型族区分处理：

1. Qwen-Audio-TTS / CosyVoice：阿里云接口读取 `url`，因此 `audioUrl` 必须能被阿里云公网访问。如果现有上传链路返回内网/localhost URL，需要前端提示或后端校验并返回明确错误。
2. Qwen-TTS：阿里云接口读取 `audio.data`，后端可根据 `audioUrl` 下载/读取音频字节，组装 `data:{mime};base64,{payload}`，不要求前端传 base64。
3. 对本地上传文件，后端应基于 URL 后缀或响应头推断 `audio/mpeg`、`audio/wav`、`audio/mp4` 等 MIME 类型；推断失败时默认 `audio/mpeg`。
4. 对浏览器录音文件，后端不能假设 WebM 一定被阿里云接受。若录音上传后的 MIME/扩展名不是 WAV、MP3、M4A/MP4，首版应优先返回明确错误并提示用户改用文件上传；如后续引入服务端转码，再将 WebM 转成 MP3/M4A 后调用阿里云。

#### API Key 方式

沿用现有 TTS 的 API key 注入方式：

```java
@Value("${spring.ai.dashscope.audio.synthesis.api-key:${spring.ai.dashscope.api-key:${DASHSCOPE_API_KEY:}}}")
private String dashscopeApiKey;
```

`WorkspaceId` 通过新配置项注入：

```java
@Value("${bytedesk.ai.dashscope.workspace-id:}")
private String workspaceId;
```

建议补充区域和 endpoint 配置：

```java
@Value("${bytedesk.ai.dashscope.region:cn-beijing}")
private String dashscopeRegion;

@Value("${bytedesk.ai.dashscope.voice-clone.endpoint:}")
private String voiceCloneEndpoint;
```

API Key 使用前应复用 `TtsApiKeyHelper.normalize()`，避免 Bearer 前缀、引号或未解密的 `ENC(...)` 直接进入请求头。

#### 客户端类设计：`AliyunVoiceCloneClient`

采用 `RestTemplate` 或 Spring `RestClient` 直接发送 HTTP POST 请求。规划上优先走纯 HTTP 封装，不要求依赖 DashScope SDK 的声音复刻封装。

```java
@Service
public class AliyunVoiceCloneClient {
    
    // 通用 endpoint（Qwen-TTS 用）
    private static final String DASHSCOPE_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/audio/tts/customization";
    
    // 专属 endpoint 模板（Qwen-Audio-TTS / CosyVoice 用）
    private static final String WORKSPACE_ENDPOINT_TEMPLATE = "https://%s.cn-beijing.maas.aliyuncs.com/api/v1/services/audio/tts/customization";
    
    public VoiceCloneApiResponse createVoice(String apiKey, String workspaceId, String targetModel, String audioUrl, String prefix);
    public VoiceCloneApiResponse createVoiceByDesign(String apiKey, String workspaceId, String targetModel, String voicePrompt, String previewText, String prefix);
    public VoiceCloneApiResponse listVoices(String apiKey, String workspaceId, String targetModel, String prefix, int pageIndex, int pageSize);
    public VoiceCloneApiResponse queryVoice(String apiKey, String workspaceId, String voiceId);
    public VoiceCloneApiResponse updateVoice(String apiKey, String workspaceId, String voiceId, String audioUrl);
    public VoiceCloneApiResponse deleteVoice(String apiKey, String workspaceId, String voiceId);
}

/**
 * 阿里云声音复刻 API 统一响应 DTO（内部使用，不对外暴露）。
 */
@Data
public class VoiceCloneApiResponse {
    private boolean success;
    private String voiceId;
    private String voiceName;
    private String status;
    private String previewAudioUrl;
    private String requestId;
    private String errorMessage;
    private String rawResponse;
```

实际实现时建议在 `AliyunVoiceCloneClient` 内使用统一私有方法 `postCustomization(payload, endpoint, contentType)`，公开方法只负责构造 payload；Qwen-TTS 的 base64 转换由 `VoiceCloneService` 先完成，避免 HTTP client 读取业务文件。

### 4.5 服务层设计：`VoiceCloneService`

```java
@Service
public class VoiceCloneService {
    
    // 声音复刻
    public VoiceCloneResponse clone(VoiceCloneRequest request);
    
    // 声音设计
    public VoiceCloneResponse design(VoiceCloneRequest request);
    
    // 查询远端音色列表
    public JsonResult listRemoteVoices(VoiceCloneRequest request);
    
    // 查询远端音色详情
    public JsonResult queryRemoteVoice(VoiceCloneRequest request);
    
    // 更新音色
    public JsonResult updateRemoteVoice(VoiceCloneRequest request);
    
    // 删除音色（同时删除本地记录和远端音色）
    public JsonResult deleteRemoteVoice(VoiceCloneRequest request);
}
```

### 4.6 本地记录与远端音色的职责边界

为贴合当前仓库已存在的 `VoiceCloneRestService`，首版建议明确拆分两类职责：

1. `VoiceCloneRestService`
    负责本地表 `bytedesk_core_voice_clone` 的 CRUD、分页查询、导出。
2. `VoiceCloneService`
    负责调用阿里云 HTTP API，并在成功后回写/更新本地 `VoiceCloneEntity`。

这样前端主表直接复用现有 `/query/org` 分页接口展示“本地操作记录”，无需把阿里云远端列表直接当成系统主列表。

#### 远端删除语义

删除操作涉及本地记录与远端音色两处，需明确顺序与兜底：

1. **先删远端，后删本地**：先调阿里云 `delete_voice`/`delete`，成功后再通过 `VoiceCloneRestService.deleteByUid()` 删除本地记录。
2. **远端删除失败时不删本地**：保留本地记录并在 `errorMessage` 中追加失败原因（如"远端音色删除失败: xxx"），避免出现"记录没了但音色还在云端"的脏状态。
3. **远端已不存在（404）**：视为删除成功，正常删本地记录。
4. **本地记录可能为 null**：若传入的 uid 在本地不存在，仅执行远端删除即可。

#### VoiceCloneApiResponse（内部 DTO）

`AliyunVoiceCloneClient` 对外返回统一响应对象，不直接向 Controller 暴露 HTTP 细节：

```java
@Data
public class VoiceCloneApiResponse {
    private boolean success;
    private String voiceId;          // output.voice_id / output.voice
    private String voiceName;        // 远端返回的音色名称
    private String status;           // DEPLOYING / OK / UNDEPLOYED / null
    private String previewAudioUrl;  // 声音设计的预览音频 URL（已落盘）
    private String requestId;
    private String errorMessage;
    private String rawResponse;      // 可选的原始 JSON，用于问题排查
}
```

### 4.7 响应解析规则

阿里云不同模型系列返回字段不完全一致，保存本地记录时需要统一归一化：

| 模型系列 | 音色字段 | 状态字段 | 预览音频 |
| -------- | -------- | -------- | -------- |
| Qwen-Audio-TTS / CosyVoice | `output.voice_id` | `output.status`（查询/列表时更完整） | 可能无 |
| Qwen-TTS 声音复刻 | `output.voice` | 通常无 `status` | 可能无 |
| Qwen-TTS 声音设计 | `output.voice` | 通常无 `status` | `output.preview_audio.data` |

归一化建议：

1. `voiceId` 保存可直接用于 TTS 合成的值：优先 `output.voice_id`，其次 `output.voice`。
2. `voiceName` 默认与 `voiceId` 相同，若远端返回更具体名称再覆盖。
3. 若创建接口未返回状态，则成功调用后本地状态记为 `OK`；若返回 `DEPLOYING` / `UNDEPLOYED`，按远端状态保存。
4. 保留 `requestId`，失败时保存 `errorMessage`，便于排查阿里云侧调用。

#### TTS 音色集成路径

声音复刻/设计的最终目标是让 `voiceId` 进入 TTS 合成流程：

1. 本地 `VoiceCloneEntity.voiceId` 是可用于 TTS 合成的值（归一化后）。
2. 现有 TTS 语音目录（`tts/catalog`）管理预置音色列表。首版不需要把自定义音色写入 `bytedesk_ai_tts_catalog` 表；现有 `TtsVoiceCatalogService` 的 `query()` 方法可通过追加 `"custom"` 分组返回自定义音色，或另开一个轻量接口直接从 `VoiceCloneEntity`（`status = OK` + 当前 org）拉取。
3. 前端 TTS Modal 的 voice 下拉框可以在预置音色后面追加"自定义音色"分组，调用新增的 `GET /api/v1/voice_clone/query/org?status=OK`（已有 REST 接口）获取可用列表。
4. TTS 合成时，将自定义 `voiceId` 作为 `voice` 参数传入即可，不需要额外适配。

> 首版不建议直接修改 `TtsVoiceCatalogService` 和 `bytedesk_ai_tts_catalog` 表结构，避免波及现有 TTS 合成路径的稳定性。

### 4.8 Controller 层约束

`VoiceCloneController` 建议遵循以下规范：

```java
@RestController
@RequestMapping("/api/v1/voice_clone")
@RequiredArgsConstructor
@Slf4j
public class VoiceCloneController {

    private final VoiceCloneService voiceCloneService;

    @PostMapping("/clone")
    @PreAuthorize(VoiceClonePermissions.HAS_VOICE_CLONE_CREATE)
    public ResponseEntity<?> clone(@Valid @RequestBody VoiceCloneRequest request) {
        return ResponseEntity.ok(voiceCloneService.clone(request));
    }

    @PostMapping("/design")
    @PreAuthorize(VoiceClonePermissions.HAS_VOICE_CLONE_CREATE)
    public ResponseEntity<?> design(@Valid @RequestBody VoiceCloneRequest request) {
        return ResponseEntity.ok(voiceCloneService.design(request));
    }

    @PostMapping("/voices")
    @PreAuthorize(VoiceClonePermissions.HAS_VOICE_CLONE_READ)
    public ResponseEntity<?> listRemoteVoices(@Valid @RequestBody VoiceCloneRequest request) {
        return ResponseEntity.ok(voiceCloneService.listRemoteVoices(request));
    }

    @PostMapping("/voice/detail")
    @PreAuthorize(VoiceClonePermissions.HAS_VOICE_CLONE_READ)
    public ResponseEntity<?> queryRemoteVoice(@Valid @RequestBody VoiceCloneRequest request) {
        return ResponseEntity.ok(voiceCloneService.queryRemoteVoice(request));
    }

    @PostMapping("/voice/update")
    @PreAuthorize(VoiceClonePermissions.HAS_VOICE_CLONE_UPDATE)
    public ResponseEntity<?> updateRemoteVoice(@Valid @RequestBody VoiceCloneRequest request) {
        return ResponseEntity.ok(voiceCloneService.updateRemoteVoice(request));
    }

    @PostMapping("/voice/delete")
    @PreAuthorize(VoiceClonePermissions.HAS_VOICE_CLONE_DELETE)
    public ResponseEntity<?> deleteRemoteVoice(@Valid @RequestBody VoiceCloneRequest request) {
        return ResponseEntity.ok(voiceCloneService.deleteRemoteVoice(request));
    }
}
```

> 注意：`VoiceCloneController` 的 `@RequestMapping` 基路径与 `VoiceCloneRestController` 相同（`/api/v1/voice_clone`），但端点路径不冲突（后者是 `/query/org`、`/create`、`/update`、`/delete`、`/export`）。Spring MVC 按具体路径匹配，两者可以共存。

#### VoiceCloneService 内部流程

```java
public VoiceCloneResponse clone(VoiceCloneRequest request) {
    // 1. 参数校验：name、targetModel 必填；audioUrl 必填
    // 2. 本地预创建 VoiceCloneEntity（status = PENDING）
    // 3. 调 AliyunVoiceCloneClient.createVoice() 或 createVoiceByDesign()
    // 4. 根据响应更新 Entity：voiceId、voiceName、status、requestId、errorMessage
    // 5. 若 cloneType = DESIGN 且返回 preview_audio，落盘并写 previewAudioUrl
    // 6. 调用 voiceCloneRestService.update() 持久化
    // 7. 返回 convertToResponse(entity)
}
```

> 声音复刻是同步 HTTP 调用，阿里云可能在数十秒内返回。首版不做异步轮询；若接口超时，前端收到错误后可在列表中看到 `status = PENDING` 的记录，后续通过 `queryRemoteVoice` 手动查询状态。

---

## 5. 前端实现设计

### 5.1 新增/修改文件清单

```text
frontend/apps/admin/src/
├── apis/ai/
│   └── voiceClone.ts                     # 新增：API 客户端
├── @types/ai/
│   └── voiceClone.d.ts                   # 新增：类型定义
├── pages/Dashboard/Ai/Robot/agent/
│   ├── index.tsx                          # 修改：新增 voiceClone tab
│   └── voice_clone/
│       ├── index.tsx                      # 重写：VoiceCloneTable（ProTable）
│       ├── VoiceCloneCloneModal.tsx        # 新增：声音复刻 Modal
│       ├── VoiceCloneRecordModal.tsx       # 新增：朗读录音 Modal
│       ├── VoiceCloneDesignModal.tsx       # 新增：声音设计 Modal
│       ├── VoiceCloneDrawer.tsx            # 新增：音色详情 Drawer
│       └── VoiceCloneVoiceList.tsx         # 新增：远端音色列表组件（可选）
├── locales/
│   ├── zh-CN/
│   │   ├── ai.ts                          # 修改：voiceClone 业务文案
│   │   └── robot.ts                       # 修改：新增 tab 文案
│   └── ja-JP/
│       ├── ai.ts                          # 修改：voiceClone 业务文案
│       └── robot.ts                       # 修改：新增 tab 文案
└── utils/
    └── authorities.ts                     # 修改：新增 VOICE_CLONE 权限模块
```

### 5.2 组件架构

```text
VoiceClonePage (index.tsx)
├── ProTable (声音克隆记录列表)
│   ├── 列：name, cloneType, targetModel, voiceId, status, audioUrl, voicePrompt, createdAt
│   ├── 操作列：查看详情(Drawer)、删除
│   └── 工具栏：声音复刻按钮、朗读录音按钮、声音设计按钮、批量删除
├── VoiceCloneCloneModal
│   ├── 表单：name、targetModel（Select）、audioUrl（Input）/ 上传按钮 / "朗读录音"按钮 → 打开 VoiceCloneRecordModal
│   ├── 录音回传：VoiceCloneRecordModal 录音上传成功后通过回调将 fileUrl 回填到 audioUrl
│   └── 提交：调用 POST /api/v1/voice_clone/clone
├── VoiceCloneRecordModal
│   ├── 朗读文本展示区（从预设文本池中随机选取）
│   ├── 录音控制：开始录音 / 停止录音按钮
│   ├── 录音状态：计时、音量电平指示
│   ├── 时长限制：推荐 10~20 秒，最长 60 秒自动停止
│   ├── 录音完成后：播放预览 + 重新录制 + 确认上传
│   └── 上传成功后：通过 onSuccess(url) 回调将 fileUrl 传递给 VoiceCloneCloneModal
├── VoiceCloneDesignModal
│   ├── 表单：name、targetModel（Select）、voicePrompt（TextArea）、previewText、prefix
│   └── 提交：调用 POST /api/v1/voice_clone/design
├── VoiceCloneDrawer
│   ├── 显示详情：voiceId, voiceName, targetModel, status, audioUrl/voicePrompt, previewAudioUrl
│   ├── 查询远端详情按钮
│   └── 更新音色（重新上传音频）
└── VoiceCloneVoiceList（可选展开）
    └── 远端音色列表（调用 POST /api/v1/voice_clone/voices）
```

### 5.3 RobotAgentPage Tab 注册

在 `index.tsx` 的 `items` 数组中新增：

```tsx
if (canAnyVoiceClone && isEnterpriseOrPlatformEdition()) {
    items.push({
        key: "voiceClone",
        label: intl.formatMessage({ id: "robot.agent.tab.voiceClone", defaultMessage: "声音克隆" }),
        children: <VoiceCloneTable />,
    });
}
```

需要在 `authorities.ts` 中新增 `VOICE_CLONE: 'VOICE_CLONE'`。`useAccess` 当前通过模块名动态计算 `READ/CREATE/UPDATE/DELETE/EXPORT`，通常不需要额外注册专门函数。

### 5.4 类型定义 (`voiceClone.d.ts`)

```typescript
declare namespace VOICE_CLONE {
  type VoiceCloneRequest = {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: 'descend' | 'ascend';
    uid?: string;
    name?: string;
    description?: string;
    type?: string;
    provider?: string;
    cloneType?: 'CLONE' | 'DESIGN';
    targetModel?: string;
    audioUrl?: string;
    voicePrompt?: string;
    prefix?: string;
    previewText?: string;
    voiceId?: string;
    status?: string;
    errorMessage?: string;
    orgUid?: string;
    superUser?: boolean;
    level?: string;
    platform?: string;
    channel?: string;
  };

  type VoiceCloneResponse = {
    uid: string;
    name: string;
    description?: string;
    type: string;
    provider: string;
    cloneType: string;
    targetModel: string;
    audioUrl?: string;
    voicePrompt?: string;
    prefix?: string;
    voiceId?: string;
    voiceName?: string;
    previewAudioUrl?: string;
    status: string;
    requestId?: string;
    errorMessage?: string;
    createdAt: string;
    updatedAt: string;
  };

  type HttpPageResult = {
    code?: number;
    data: {
      content?: VoiceCloneResponse[];
      totalElements?: number;
      totalPages?: number;
      size?: number;
      number?: number;
    };
    message?: string;
  };

  type HttpResult = {
    code?: number;
    data: VoiceCloneResponse;
    message?: string;
  };
}
```

### 5.5 前端上传交互约束

`VoiceCloneCloneModal` 应复用 ASR/OCR 现有上传方式：`Upload` + `getUploadUrl()` + `ACCESS_TOKEN`，上传参数沿用 `kbType: UPLOAD_TYPE_CHAT`、`channel: HTTP_CHANNEL`，成功后从 `response.data.fileUrl` 回填 `audioUrl`。

交互规则：

1. `name`、`targetModel` 必填。
2. `audioUrl` 可以手动输入，也可以由上传自动回填；两者至少提供一个。
3. 当选择 Qwen-Audio-TTS / CosyVoice 且 `audioUrl` 看起来是 `localhost`、`127.0.0.1` 或当前内网域名时，前端给出“阿里云需访问公网 URL”的提示；后端仍需做最终校验。
4. 当选择 Qwen-TTS 声音复刻模型时，前端无需感知 base64，仍只传 `audioUrl`，由后端读取并转换。

### 5.6 朗读录音设计 (`VoiceCloneRecordModal`)

#### 交互流程

```text
用户点击"朗读录音"按钮
    ↓
打开 VoiceCloneRecordModal
    ↓ 展示朗读文本 + "开始录音"按钮
用户点击"开始录音"
    ↓ 请求麦克风权限 (getUserMedia)
录音中：
  - 实时显示计时（MM:SS）
  - 实时显示音量电平（AnalyserNode RMS）
    ↓ 用户点击"停止录音" 或 达到 60 秒自动停止
录音完成：
  - 展示录音时长
  - 提供"试听"按钮播放刚录制的音频
  - 提供"重新录制"按钮
    ↓ 用户点击"确认使用"
自动上传录音文件（复用 getUploadUrl() + ACCESS_TOKEN）
    ↓ 上传成功
回调 onSuccess(fileUrl)：
  - 关闭 RecordModal
  - 将 fileUrl 回填到 CloneModal 的 audioUrl 字段
  - 用户继续填写 name、targetModel 后提交复刻
```

#### 录音文本提示

声音复刻对内容有要求（至少 5 秒连续清晰朗读），建议提供预设文本引导用户朗读。文本应满足：

- 长度适中（朗读耗时约 10~20 秒）
- 覆盖多种语音特征（不同声母、韵母、声调）
- 内容自然、易读

预设文本池建议（zh-CN）：

```typescript
const RECORDING_PROMPTS_ZH = [
  "欢迎使用 Bytedesk 智能客服系统。本系统支持多渠道接入、AI 自动回复、工单管理等功能，帮助企业提升客户服务效率。",
  "今天天气真好，阳光明媚，微风拂面。在这个美好的日子里，我们应该出去走走，感受大自然的美好。",
  "你好，我是声音复刻功能的测试文本。系统将根据这段录音学习你的声音特征，生成与你相似的合成音色。",
  "请用自然流畅的语速朗读这段文字，不要刻意放慢或加快。保持正常的说话节奏和音量即可。",
];
```

预设文本池建议（ja-JP）：

```typescript
const RECORDING_PROMPTS_JA = [
  "Bytedesk スマートカスタマーサービスシステムへようこそ。本システムはマルチチャネル対応、AI 自動応答、チケット管理などをサポートします。",
  "今日はとてもいい天気ですね。日差しが暖かく、気持ちの良い風が吹いています。こんな日は外に出かけたくなります。",
  "こんにちは、これは音声複刻機能のテストテキストです。システムはこの録音から声の特徴を学習し、あなたに似た合成音声を生成します。",
];
```

> 文本内容通过 `ai.ts` 中的 locale key 维护，支持根据不同语言环境展示对应文本。

#### 录音技术方案

复用 `AsrMicrophoneModal` 的录音链路作为参考，但不走 ASR WebSocket 识别，仅录制并上传：

1. **获取音频流**：`navigator.mediaDevices.getUserMedia({ audio: true })`
2. **音量可视化**：`AudioContext.createAnalyser()` + `requestAnimationFrame` 实时计算 RMS 电平
3. **录制编码**：`MediaRecorder`，优先选择阿里云更可能接受的 `audio/mp4`，再降级到 `audio/webm;codecs=opus` / `audio/webm`；若只得到 WebM，提交前需要提示存在兼容风险或交由后端转码/拦截。
4. **时长控制**：推荐 10~20 秒、超过 60 秒自动停止（`MediaRecorder` 每 200ms 收集 chunk，结束时合并 Blob）
5. **上传**：`FormData` + `fetch(getUploadUrl(), ...)`，参数与 `AsrFileModal` 一致（`kbType: UPLOAD_TYPE_CHAT`、`channel: HTTP_CHANNEL`）
6. **试听**：`URL.createObjectURL(blob)` → `<audio>` 元素播放
7. **能力探测与降级**：在打开录音 Modal 时检测 `navigator.mediaDevices.getUserMedia`、`MediaRecorder` 是否可用；不可用时提示用户改用“上传音频文件”路径，而不是阻塞整个声音复刻流程

#### 类型扩展

`voiceClone.d.ts` 中无需为后端接口新增录音字段，但前端组件可声明本地录音回调类型，便于携带 MIME、大小和时长用于提示：

```typescript
type VoiceCloneRecordedAudio = {
  fileUrl: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
  durationMs?: number;
};

interface VoiceCloneRecordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 当前选择的目标模型，用于提示录音格式兼容性 */
  targetModel?: string;
  /** 录音上传成功后回调，返回 fileUrl 与录音元数据 */
  onSuccess: (audio: VoiceCloneRecordedAudio) => void;
}
```

CloneModal 中 `audioUrl` 字段的来源变为三种，共用一个字段：

| 来源 | 方式 |
| ---- | ---- |
| 手动输入 | 直接在 Input 中填写 URL |
| 文件上传 | Upload 组件选择本地文件 → 上传 → 回填 |
| 浏览器录音 | 打开 VoiceCloneRecordModal → 录音 → 上传 → 回调回填 |

表单校验仅要求 `audioUrl` 非空（三种来源至少提供其一）。

#### 浏览器与运行环境约束

1. 浏览器录音通常要求安全上下文：`https://` 或 `localhost`；若后台部署在纯 `http` 非本地域名下，`getUserMedia` 可能直接失败。
2. Safari / 部分 Electron WebView 对 `MediaRecorder` 支持不如 Chromium 稳定，首版应提供能力检测和上传文件降级。
3. 麦克风权限被拒绝时，Modal 应保留朗读文本与失败提示，并允许用户改走“上传音频文件”或手动填写 `audioUrl`。
4. 录音结束后应立即释放 `MediaStream`、`AudioContext`、`MediaRecorder` 引用，避免麦克风占用残留。

---

## 6. 目标模型配置

### 6.1 声音复刻支持的目标模型

| 模型 ID | 系列 | model 参数 | 创建方式 |
| ------- | ---- | ---------- | -------- |
| `qwen-audio-3.0-tts-plus` | Qwen-Audio-TTS | `voice-enrollment` | URL 上传 |
| `qwen-audio-3.0-tts-flash` | Qwen-Audio-TTS | `voice-enrollment` | URL 上传 |
| `cosyvoice-v3.5-plus` | CosyVoice | `voice-enrollment` | URL 上传 |
| `cosyvoice-v3.5-flash` | CosyVoice | `voice-enrollment` | URL 上传 |
| `cosyvoice-v3-plus` | CosyVoice | `voice-enrollment` | URL 上传 |
| `cosyvoice-v3-flash` | CosyVoice | `voice-enrollment` | URL 上传 |
| `cosyvoice-v2` | CosyVoice | `voice-enrollment` | URL 上传 |
| `cosyvoice-v1` | CosyVoice | `voice-enrollment` | URL 上传 |
| `qwen3-tts-vc-2026-01-22` | Qwen-TTS | `qwen-voice-enrollment` | 后端转换为 Base64 data URI |

### 6.2 声音设计支持的目标模型

| 模型 ID | 系列 | model 参数 | 创建方式 |
| ------- | ---- | ---------- | -------- |
| `cosyvoice-v3.5-plus` | CosyVoice | `voice-enrollment` | voice_prompt |
| `cosyvoice-v3.5-flash` | CosyVoice | `voice-enrollment` | voice_prompt |
| `cosyvoice-v3-plus` | CosyVoice | `voice-enrollment` | voice_prompt |
| `cosyvoice-v3-flash` | CosyVoice | `voice-enrollment` | voice_prompt |
| `qwen3-tts-vd-2026-01-26` | Qwen-TTS | `qwen-voice-design` | voice_prompt |

---

## 7. 权限设计

### 7.1 后端权限

当前 `VoiceClonePermissions` 已有 `VOICE_CLONE_READ`、`VOICE_CLONE_CREATE`、`VOICE_CLONE_UPDATE`、`VOICE_CLONE_DELETE`、`VOICE_CLONE_EXPORT`。

首版建议**不新增 `VOICE_CLONE_EXECUTE`**，避免同步扩散到角色初始化、权限描述、多语言文案和前端权限判断逻辑。建议权限映射如下：

| 接口 | 权限 |
| ---- | ---- |
| `/clone` | `VOICE_CLONE_CREATE` |
| `/design` | `VOICE_CLONE_CREATE` |
| `/voices` | `VOICE_CLONE_READ` |
| `/voice/detail` | `VOICE_CLONE_READ` |
| `/voice/update` | `VOICE_CLONE_UPDATE` |
| `/voice/delete` | `VOICE_CLONE_DELETE` |

若后续确认需要把“执行音色创建”与“本地记录创建”拆成不同权限，再单独引入 `VOICE_CLONE_EXECUTE`。

### 7.2 前端权限

- `authorities.ts`：`PERMISSION_MODULE` 新增 `VOICE_CLONE: 'VOICE_CLONE'`
- `useAccess`：通过 `hasAnyModulePermission(PERMISSION_MODULE.VOICE_CLONE)` 直接判断即可
- `RobotAgentPage` tab 可见性：`canAnyVoiceClone && isEnterpriseOrPlatformEdition()`

---

## 8. 国际化

### 8.1 新增 key

| key | zh-CN | ja-JP |
| --- | ----- | ----- |
| `robot.agent.tab.voiceClone` | 声音克隆 | 音声クローン |
| `voiceClone.clone.title` | 声音复刻 | 音声複刻 |
| `voiceClone.design.title` | 声音设计 | 音声デザイン |
| `voiceClone.field.name` | 音色名称 | 音色名 |
| `voiceClone.field.targetModel` | 目标模型 | ターゲットモデル |
| `voiceClone.field.audioUrl` | 音频URL | 音声URL |
| `voiceClone.field.voicePrompt` | 声音描述 | 音声の説明 |
| `voiceClone.field.prefix` | 音色前缀 | プレフィックス |
| `voiceClone.field.previewText` | 预览文本 | プレビューテキスト |
| `voiceClone.field.cloneType` | 创建方式 | 作成方法 |
| `voiceClone.field.voiceId` | 音色ID | 音色ID |
| `voiceClone.field.status` | 状态 | ステータス |
| `voiceClone.action.clone` | 声音复刻 | 音声を複刻 |
| `voiceClone.action.design` | 声音设计 | 音声をデザイン |
| `voiceClone.record.title` | 朗读录音 | 音声録音 |
| `voiceClone.record.start` | 开始录音 | 録音開始 |
| `voiceClone.record.stop` | 停止录音 | 録音停止 |
| `voiceClone.record.rerecord` | 重新录制 | 再録音 |
| `voiceClone.record.confirm` | 确认使用 | 確認して使用 |
| `voiceClone.record.preview` | 试听 | 試聴 |
| `voiceClone.record.prompt` | 请朗读以下文本 | 以下のテキストを音読してください |
| `voiceClone.record.duration` | 录音时长 | 録音時間 |
| `voiceClone.record.limitHint` | 推荐录制 10~20 秒，最长 60 秒 | 10〜20秒の録音を推奨、最長60秒 |
| `voiceClone.record.micDenied` | 无法访问麦克风，请检查浏览器权限设置 | マイクにアクセスできません。ブラウザの権限設定を確認してください |
| `voiceClone.record.unsupported` | 当前浏览器不支持录音，请上传音频文件 | 現在のブラウザは録音に対応していません。音声ファイルをアップロードしてください |
| `voiceClone.record.insecureContext` | 当前页面不是安全上下文，请使用 HTTPS 或 localhost 后再录音 | 現在のページは安全なコンテキストではありません。HTTPS または localhost で録音してください |
| `voiceClone.record.formatWarning` | 当前录音格式可能不被目标模型支持，建议上传 WAV、MP3 或 M4A 文件 | 現在の録音形式はターゲットモデルでサポートされない可能性があります。WAV、MP3、M4A ファイルのアップロードを推奨します |
| `voiceClone.record.uploading` | 正在上传录音… | 録音をアップロード中… |
| `voiceClone.cloneType.clone` | 声音复刻 | 音声複刻 |
| `voiceClone.cloneType.design` | 声音设计 | 音声デザイン |
| `voiceClone.status.pending` | 待处理 | 処理待ち |
| `voiceClone.status.deploying` | 审核中 | 審査中 |
| `voiceClone.status.ok` | 可用 | 利用可能 |
| `voiceClone.status.undeployed` | 审核未通过 | 審査不合格 |
| `voiceClone.status.failed` | 失败 | 失敗 |

> 现有 TTS 相关文案主要位于 `locales/*/ai.ts`，tab 文案位于 `locales/*/robot.ts`。首版建议沿用同一放置方式，不额外新建独立 `voiceClone.ts` 语言文件。

---

## 实现细节说明（与规划文档的差异）

### 后端

1. **ModelFamily 内部枚举**：`VoiceCloneService` 内部定义了 `private enum ModelFamily { QWEN_AUDIO_TTS, COSYVOICE, QWEN_TTS_CLONE, QWEN_TTS_DESIGN }`，用于模型族路由，比规划文档中描述的 if-else 字符串前缀判断更结构化。

2. **`deleteSystemByUid` 方法**：在 `VoiceCloneRestService` 中新增，绕过权限检查实现系统级删除，支持远端先删后本地的语义。

3. **`saveSystemEntity` 方法**：绕过权限检查和 name+orgUid+type 去重逻辑，确保每次执行操作都生成新记录（而非复用旧记录）。

4. **`VoiceCloneApiResponse.previewAudioData` 和 `previewAudioFormat`**：实际实现中额外包含了这两个字段，用于声音设计时解析阿里云返回的 base64 预览音频数据。

5. **`JsonResult.success()` 包装**：Controller 使用 `JsonResult.success(voiceCloneService.clone(request))` 包装返回值，与现有 TTS/ASR/OCR 统一。

6. **Qwen-TTS 音频输入**：`AliyunVoiceCloneClient.createVoiceByUrl` 中，对 Qwen-TTS 模型传入 `audio.data` 字段而非 `url`；`VoiceCloneService.clone()` 在调用前通过 `buildAudioDataUri()` 将 `audioUrl` 下载后转为 base64 data URI。

7. **404 视为成功**：`AliyunVoiceCloneClient.deleteVoice` 中的 `treat404AsSuccess=true`，确保远端音色已被手动删除时不会导致本地记录删除失败。

### 前端

1. **ProColumns API 差异**：使用 `search: false` 替代 `hideInSearch: true`（ProComponents 不同版本的 API 差异）。

2. **`useRef` 类型**：`actionRef` 初始化为 `useRef<ActionType | undefined>(undefined)` 以兼容 ProTable 类型约束。

3. **删除逻辑**：ProTable 列表中同时支持"有 voiceId 则先删远端再删本地"和"无 voiceId 则仅删本地记录"两条路径。

4. **录音上传**：`VoiceCloneRecordModal` 通过 `fetch(getUploadUrl(), ...)` 使用 `FormData` 上传录音 Blob，成功后通过 `onSuccess` 回调将 `fileUrl` 回填到 `VoiceCloneCloneModal` 的 `audioUrl` 字段。

5. **Qwen-TTS 模型提示**：CloneModal 中的 `showPublicUrlWarning` 对 Qwen-TTS 模型不做公网 URL 校验提示（因为后端会下载后转 base64）。

6. **Drawer 中的 Qwen-TTS 限制**：Qwen-TTS 模型音色在 Drawer 中显示"仅支持创建与删除"提示，不显示更新表单。

---

## 9. 实现步骤

### Phase 1: 数据模型层（0.75d）

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| 1.1 | `VoiceCloneTypeEnum.java` | 新增枚举 CLONE / DESIGN |
| 1.2 | `VoiceCloneStatusEnum.java` | 新增枚举 PENDING / DEPLOYING / OK / UNDEPLOYED / FAILED |
| 1.3 | `VoiceCloneEntity.java` | 新增 provider、cloneType、targetModel、audioUrl、voicePrompt、previewText、prefix、voiceId、voiceName、previewAudioUrl、status、requestId、errorMessage |
| 1.4 | `VoiceCloneRequest.java` | 新增对应字段，补齐 `previewText` |
| 1.5 | `VoiceCloneResponse.java` | 新增对应字段 |
| 1.6 | `VoiceCloneRestService.java` | 更新本地记录创建/回写逻辑 |

### Phase 2: 阿里云 API 客户端（1d）

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| 2.1 | `AliyunVoiceCloneClient.java` + `VoiceCloneApiResponse.java` | 阿里云 HTTP API 客户端 + 内部响应 DTO |
| 2.2 | `VoiceCloneService.java` | 核心业务逻辑：clone / design / listVoices / queryVoice / updateVoice / deleteVoice，含远端删除语义和本地记录回写 |
| 2.3 | `VoiceCloneController.java` | 新增执行型端点，含 `@PreAuthorize` 权限注解 |

### Phase 3: 前端实现（1.5d）

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| 3.1 | `voiceClone.d.ts` | 类型定义 |
| 3.2 | `voiceClone.ts` (apis) | API 客户端 |
| 3.3 | `authorities.ts` | 新增 VOICE_CLONE 权限模块 |
| 3.4 | `voice_clone/index.tsx` | 重写为 ProTable |
| 3.5 | `VoiceCloneCloneModal.tsx` | 声音复刻弹窗（含上传/录音/手动输入三种音频来源） |
| 3.6 | `VoiceCloneDesignModal.tsx` | 声音设计弹窗 |
| 3.7 | `VoiceCloneRecordModal.tsx` | 朗读录音弹窗，含能力探测、录音预览、格式提示和上传回填 |
| 3.8 | `VoiceCloneDrawer.tsx` | 详情抽屉 |
| 3.9 | `agent/index.tsx` | 注册 voiceClone tab |
| 3.10 | `ai.ts` / `robot.ts` (zh-CN + ja-JP) | 国际化（含录音相关文案） |

### Phase 4: 数据库（0.25d）

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| 4.1 | `260729_add_voice_clone_fields.xml` | Liquibase changelog：按“表已存在则加列、表不存在则建表”方式写成幂等迁移 |
| 4.2 | `master.xml` | include |

> 注意：当前仓库 migration 中未找到 `bytedesk_core_voice_clone` 的显式建表记录，部分环境可能依赖过往自动建表或旧版本脚本，因此迁移不能假设“表一定已存在”。

### 9.1 Liquibase 迁移细化

迁移文件建议拆成三类 changeSet：

1. **建表兜底**：当 `bytedesk_core_voice_clone` 不存在时创建表。基础字段需与 `BaseEntity` 对齐：`id`、`uuid`、`version`、`created_at`、`updated_at`、`is_deleted`、`org_uid`、`user_uid`、`level_type`、`platform_type`。
2. **加列兜底**：当表存在但缺少字段时逐列添加，所有 changeSet 使用 `tableExists + not columnExists`，`onFail="MARK_RAN" onError="MARK_RAN"`。
3. **索引兜底**：至少确保 `uuid` 唯一索引；可补充 `org_uid + is_deleted`、`org_uid + clone_type`、`org_uid + status` 普通索引，便于列表筛选。

建议字段类型：

| 列名 | 类型 | 说明 |
| ---- | ---- | ---- |
| `provider` | `VARCHAR(64)` | 默认 `dashscope` |
| `clone_type` | `VARCHAR(32)` | `CLONE` / `DESIGN` |
| `target_model` | `VARCHAR(128)` | 目标模型 |
| `audio_url` | `TEXT` | 音频 URL 可能较长 |
| `voice_prompt` | `TEXT` | Qwen-TTS 声音设计支持到 2048 字符 |
| `preview_text` | `VARCHAR(1024)` | 声音设计预览文本 |
| `prefix` | `VARCHAR(128)` | 音色前缀 |
| `voice_id` | `VARCHAR(256)` | 可用于 TTS 合成的音色 ID |
| `voice_name` | `VARCHAR(256)` | 展示名称 |
| `preview_audio_url` | `TEXT` | 预览音频 URL |
| `status` | `VARCHAR(32)` | 本地归一化状态 |
| `request_id` | `VARCHAR(128)` | 阿里云 request_id |
| `error_message` | `TEXT` | 失败原因 |

---

## 10. 音频要求（用户提示）

声音复刻的音频要求参考阿里云文档：

| 项目 | 要求 |
| ---- | ---- |
| 用户上传支持格式 | WAV (16bit)、MP3、M4A |
| 浏览器录音产物 | 优先 MP4/M4A；WebM 仅作为录音产物保存，不直接假设阿里云支持 |
| 音频时长 | 推荐 10~20 秒，最长不超过 60 秒 |
| 文件大小 | ≤ 10 MB |
| 采样率 | ≥ 16 kHz |
| 内容 | 至少 5 秒连续清晰朗读内容，无背景音乐/噪音/其他人声 |

前端声音复刻 Modal 中应展示这些要求作为提示。朗读录音 Modal 应引导用户朗读文本提示以自然满足内容要求。

> 注意：浏览器 `MediaRecorder` 在 Chromium 中常见输出为 WebM/Opus，而阿里云文档侧更明确的是 WAV、MP3、M4A。首版不能把 WebM 当作稳定支持格式；需要在前端提示兼容风险，并由后端校验 MIME/扩展名。没有服务端转码能力时，应提示用户上传 WAV、MP3 或 M4A 文件。

---

## 11. 工作量估算

| 阶段 | 内容 | 预估 |
| ---- | ---- | ---- |
| Phase 1 | 数据模型层（枚举 + Entity + DTO + 本地记录映射） | 0.75d |
| Phase 2 | 阿里云 API 客户端 + Service + Controller | 1d |
| Phase 3 | 前端（Table + CloneModal + DesignModal + RecordModal + Drawer + i18n + tab） | 1.5d |
| Phase 4 | Liquibase changelog | 0.25d |
| **合计** | | **约 3.5d** |

---

## 12. 风险与边界

1. **API Key 与 WorkspaceId 配置**：需要用户预先在阿里云百炼平台获取 API Key 和 WorkspaceId，并配置到 `application.properties` 中。首版使用现有 `DASHSCOPE_API_KEY` 注入方式。
2. **音频文件上传**：前端已存在成熟的上传模式（ASR/OCR 使用 `Upload` + `getUploadUrl()`）。首版应优先复用该链路，将音频先上传到现有文件服务，再把返回 URL 传给声音复刻接口；手动填写 URL 仅作为补充输入方式。
3. **Qwen-TTS 的 Base64 上传**：Qwen-TTS 系列使用 Base64 编码的音频 data URI 而非 URL，需要在后端读取 `audioUrl` 对应音频并转换，不能要求前端直接传 base64。
4. **MiniMax 暂不纳入**：MiniMax 的 API 结构与 DashScope 通用接口差异较大，且仅北京地域可用，首版不实现。
5. **音色同步**：本地 `VoiceCloneEntity` 记录与阿里云侧音色可能存在不一致（如云端音色被自动清理），主表以本地记录为准；远端查询能力作为详情页校验/同步手段，而不是替代主表分页来源。
6. **预览音频存储**：声音设计返回的预览音频可能是 base64，后端需要落盘并转成 URL，否则前端无法长期播放。
7. **浏览器录音兼容性**：`getUserMedia`、`MediaRecorder`、安全上下文（HTTPS/localhost）会直接影响录音功能可用性。首版必须提供能力探测与“上传音频文件”降级路径。
8. **浏览器录音格式兼容性**：WebM/Opus 是常见浏览器录音输出，但不应视为阿里云稳定输入格式。首版必须在后端校验格式；如果没有服务端转码能力，应给出明确错误和上传 WAV/MP3/M4A 的降级建议。
9. **成本**：Qwen-TTS 声音复刻约 0.01 元/个，声音设计约 0.2 元/个；CosyVoice 创建免费。用户需了解计费规则。

---

## 13. 验收清单

1. 声音复刻：上传音频文件或填写音频 URL + 选择目标模型 → 调用阿里云 API → 返回 voice_id → 保存本地记录。
2. 朗读录音复刻：弹出朗读文本 → 浏览器录音 → 录音上传 → audioUrl 自动回填到声音复刻表单 → 提交复刻 → 返回 voice_id → 保存本地记录。
3. 声音设计：输入声音描述 + 选择目标模型 → 调用阿里云 API → 返回 voice_id + 预览音频 → 保存本地记录。
4. 声音复刻记录在 ProTable 中正确显示，且主表数据来自现有本地 `/query/org` 分页接口，支持分页、搜索、删除。
5. 点击"声音复刻"按钮打开 Modal，表单校验（name、targetModel 必填；音频上传、audioUrl 手动输入或录音上传至少提供一种）。
6. 点击"声音设计"按钮打开 Modal，表单校验（name、targetModel、voicePrompt 必填）。
7. Qwen-TTS 声音复刻模型可通过上传文件完成创建，前端只传 `audioUrl`，后端完成 base64 data URI 转换。
8. 声音设计返回预览音频时，后端保存为可播放 URL，前端 Drawer 可播放/打开预览音频。
9. 列表中可查看详情 Drawer、可删除记录（同时删除远端音色）。
10. 朗读录音 Modal：展示预设文本提示中/日文 → 点击录音 → 显示计时 + 音量指示 → 停止后试听 → 确认上传 → 自动回填 audioUrl 到声音复刻表单。
11. 当浏览器不支持 `getUserMedia` / `MediaRecorder`，或页面不处于安全上下文时，录音入口给出明确提示，并允许用户改走上传文件路径。
12. 浏览器录音若产出 WebM/Opus，前端展示兼容提示；后端在无转码能力时拒绝不支持格式，并提示上传 WAV、MP3 或 M4A。
13. RobotAgentPage 中"声音克隆"tab 在 `canAnyVoiceClone` 权限下可见。
14. 中/日文国际化文案完整（含朗读录音相关所有文案）。
15. 音色状态正确映射显示（DEPLOYING → 审核中，OK → 可用）。
16. 调用失败时，记录 errorMessage 并在列表中展示。
