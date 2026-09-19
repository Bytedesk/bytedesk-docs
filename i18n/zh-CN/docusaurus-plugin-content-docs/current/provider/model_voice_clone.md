---
sidebar_label: TTS声音克隆
sidebar_position: 29
---

# TTS 声音克隆

微语客服系统支持声音克隆（Voice Clone）能力，包含**声音复刻**与**声音设计**两种方式。管理员可上传音频样本复制现有音色，也可通过文字描述生成全新音色，用于客服播报、AI 语音交互、电话客服等场景。

## 一、声音克隆可以解决什么问题

- **个性化品牌音色**：企业可使用真人录音复刻专属品牌声音，统一对外服务形象
- **AI 语音交互**：为 AI 客服、语音机器人、电话座席提供自定义音色输出
- **无障碍与多场景覆盖**：适配不同语言、不同风格需求，提升用户体验
- **音色管理与溯源**：每次复刻/设计操作均保存本地记录，便于管理和排查

## 二、两种创建方式

| 方式 | 说明 | 输入 | 适用场景 |
| ---- | ---- | ---- | -------- |
| **声音复刻** | 上传现成音频样本，AI 复制音色 | 音频文件 / 音频 URL / 浏览器录音 | 已有真人录音，需要复刻特定音色 |
| **声音设计** | 用自然语言描述声音特质，AI 生成音色 | 文字描述 + 预览文本 | 无现成音频，需要快速生成特定风格音色 |

### 声音复刻的三种音频来源

1. **上传音频文件**：在管理后台直接上传 WAV、MP3、M4A 等格式的音频文件
2. **手动填写 URL**：填写公网可访问的音频文件链接
3. **朗读录音**：系统提供提示文本，管理员在浏览器中实时录音，录音完成后自动上传并回填到表单

## 三、支持的目标模型

### 声音复刻模型

| 模型 ID | 系列 | 说明 |
| ------- | ---- | ---- |
| `qwen-audio-3.0-tts-plus` | Qwen-Audio-TTS | 高质量音频复刻 |
| `qwen-audio-3.0-tts-flash` | Qwen-Audio-TTS | 低延迟音频复刻 |
| `cosyvoice-v3.5-plus` | CosyVoice | 最新高质量复刻 |
| `cosyvoice-v3.5-flash` | CosyVoice | 快速复刻 |
| `cosyvoice-v3-plus` | CosyVoice | 高质量复刻 |
| `cosyvoice-v3-flash` | CosyVoice | 快速复刻 |
| `cosyvoice-v2` | CosyVoice | 兼容旧版 |
| `cosyvoice-v1` | CosyVoice | 兼容旧版 |
| `qwen3-tts-vc-2026-01-22` | Qwen-TTS | Qwen 系列声音复刻 |

### 声音设计模型

| 模型 ID | 系列 | 说明 |
| ------- | ---- | ---- |
| `cosyvoice-v3.5-plus` | CosyVoice | 最新高质量声音设计 |
| `cosyvoice-v3.5-flash` | CosyVoice | 快速声音设计 |
| `cosyvoice-v3-plus` | CosyVoice | 高质量声音设计 |
| `cosyvoice-v3-flash` | CosyVoice | 快速声音设计 |
| `qwen3-tts-vd-2026-01-26` | Qwen-TTS | Qwen 系列声音设计 |

## 四、管理后台功能介绍

### 1. 声音克隆列表

在 智能助手 → 智能体页面中，切换到"声音克隆"页签，可查看当前组织下所有声音复刻/设计操作记录。列表以 ProTable 形式展示，包含以下字段：

- **音色名称**：用户自定义的名称
- **创建方式**：声音复刻 或 声音设计
- **目标模型**：选择的目标合成模型
- **音色 ID**：阿里云返回的远端音色标识
- **状态**：PENDING（待处理）/ DEPLOYING（审核中）/ OK（可用）/ UNDEPLOYED（审核未通过）/ FAILED（失败）

支持的操作：

- 按音色名称、创建方式、状态、模型筛选
- 查看详情（打开 Drawer）
- 删除记录（同时删除远端阿里云音色）

### 2. 声音复刻 Modal

点击列表上方"声音复刻"按钮，填写以下信息：

| 字段 | 说明 | 必填 |
| ---- | ---- | ---- |
| 音色名称 | 自定义名称，如"温柔客服女声" | ✅ |
| 目标模型 | 从下拉列表中选择目标模型 | ✅ |
| 音频来源 | 上传文件 / 手动填写 URL / 朗读录音 | ✅（三选一） |

音频要求：

- 支持格式：WAV（16bit）、MP3、M4A
- 推荐时长：10~20 秒
- 最长时长：60 秒
- 文件大小：≤ 10 MB

### 3. 朗读录音 Modal

在声音复刻中选择"朗读录音"，系统会弹出录音窗口：

- 展示中/日文预设朗读文本，引导用户录制
- 点击"开始录音"请求麦克风权限，实时显示计时和音量电平
- 推荐录制 10~20 秒，最长 60 秒自动停止
- 录制完成后支持试听和重新录制
- 确认后自动上传录音文件，回填到声音复刻表单的音频 URL 字段
- 若浏览器不支持录音，提供"上传音频文件"降级路径

### 4. 声音设计 Modal

点击列表上方"声音设计"按钮，填写以下信息：

| 字段 | 说明 | 必填 |
| ---- | ---- | ---- |
| 音色名称 | 自定义名称，如"沉稳男播音" | ✅ |
| 目标模型 | 从下拉列表中选择目标模型 | ✅ |
| 声音描述 | 用自然语言描述期望的声音特质 | ✅ |
| 预览文本 | 用于生成预览音频的文本 | ❌ |
| 音色前缀 | 阿里云音色名称前缀 | ❌ |

声音描述建议参考模板：

- **客服风格**：温柔自然的女声，带有亲和力，语速适中，适合客服场景
- **播报风格**：沉稳大气的男声，富有磁性，语速平稳，适合新闻播报场景
- **甜美风格**：甜美可爱的女声，略带撒娇语气，适合娱乐互动场景

注意事项：

- CosyVoice 模型声音描述限制 500 字符
- Qwen-TTS 模型声音描述限制 2048 字符

### 5. 音色详情 Drawer

点击列表操作列的"详情"按钮，打开侧边抽屉，可查看：

- 基本信息：音色名称、创建方式、目标模型、状态、创建时间
- 远端信息：voiceId、voiceName
- 音频信息：audioUrl（声音复刻）、voicePrompt（声音设计）
- 预览音频：voicePrompt 生成的预览音频可直接播放
- 远端操作：查询远端状态、更新音色（重新上传音频）、删除远端音色

## 五、权限控制

声音克隆功能的权限模块为 `VOICE_CLONE`，包含以下子权限：

| 权限 | 说明 | 适用接口 |
| ---- | ---- | -------- |
| `VOICE_CLONE_READ` | 查看 | 查询列表、远端音色查询 |
| `VOICE_CLONE_CREATE` | 创建 | 声音复刻、声音设计 |
| `VOICE_CLONE_UPDATE` | 更新 | 更新音色 |
| `VOICE_CLONE_DELETE` | 删除 | 删除记录、删除远端音色 |
| `VOICE_CLONE_EXPORT` | 导出 | Excel 导出 |

仅具备相应权限且在 Enterprise/Platform 版本中，AI 智能体页面才会显示"声音克隆"页签。

## 六、API 端点一览

| 方法 | 路径 | 权限 | 说明 |
| ---- | ---- | ---- | ---- |
| GET | `/api/v1/voice_clone/query/org` | READ | 按组织查询记录 |
| GET | `/api/v1/voice_clone/query/user` | READ | 按用户查询记录 |
| GET | `/api/v1/voice_clone/query/uid` | READ | 按 UID 查询单条 |
| POST | `/api/v1/voice_clone/create` | CREATE | 手动创建记录 |
| POST | `/api/v1/voice_clone/update` | UPDATE | 手动更新记录 |
| POST | `/api/v1/voice_clone/delete` | DELETE | 手动删除记录 |
| GET | `/api/v1/voice_clone/export` | EXPORT | Excel 导出 |
| POST | `/api/v1/voice_clone/clone` | CREATE | 声音复刻 |
| POST | `/api/v1/voice_clone/design` | CREATE | 声音设计 |
| POST | `/api/v1/voice_clone/voices` | READ | 远端音色列表 |
| POST | `/api/v1/voice_clone/voice/detail` | READ | 远端音色详情 |
| POST | `/api/v1/voice_clone/voice/update` | UPDATE | 远端音色更新 |
| POST | `/api/v1/voice_clone/voice/delete` | DELETE | 远端音色删除 |

## 七、配置说明

声音克隆能力基于阿里云百炼 DashScope 平台提供。使用前需在 `application.properties` 中配置以下参数：

```properties
# DashScope API Key（复用现有 TTS 配置）
spring.ai.dashscope.audio.synthesis.api-key=sk-xxxxxxxxxxxx

# 阿里云百炼 WorkspaceId（用于声音复刻/设计接口）
bytedesk.ai.dashscope.workspace-id=ws-xxxxxxxxxxxx

# 可选：区域配置（默认 cn-beijing）
bytedesk.ai.dashscope.region=cn-beijing

# 可选：自定义声音克隆端点（优先级最高）
# bytedesk.ai.dashscope.voice-clone.endpoint=https://custom.endpoint.com
```

## 八、技术实现

声音克隆模块位于 `enterprise/ai` 模块，核心类：

| 类 | 职责 |
| --- | --- |
| `VoiceCloneEntity` | JPA 实体，保存本地操作记录 |
| `VoiceCloneController` | 执行型 API（clone / design / remote ops） |
| `VoiceCloneRestController` | CRUD 型 API（query / create / update / delete / export） |
| `VoiceCloneService` | 核心业务逻辑，模型族路由与本地回写 |
| `AliyunVoiceCloneClient` | 阿里云 DashScope HTTP API 客户端 |
| `VoiceCloneApiResponse` | 阿里云 API 响应归一化 DTO |
| `VoiceCloneTypeEnum` | CLONE / DESIGN 枚举 |
| `VoiceCloneStatusEnum` | PENDING / DEPLOYING / OK / UNDEPLOYED / FAILED 枚举 |

### 模型族路由

后端根据 `targetModel` 自动判断模型族，无需前端感知：

| 前缀 | 模型族 | 创建请求 |
| ---- | ------ | -------- |
| `qwen-audio-` | Qwen-Audio-TTS | `voice-enrollment/create_voice` + URL |
| `cosyvoice-` | CosyVoice | `voice-enrollment/create_voice` + URL 或 voice_prompt |
| `qwen3-tts-vc-` | Qwen-TTS 声音复刻 | `qwen-voice-enrollment/create` + Base64 data URI |
| `qwen3-tts-vd-` | Qwen-TTS 声音设计 | `qwen-voice-design/create` + voice_prompt |

### 删除语义

删除音色时遵循"先远端后本地"策略：

1. 先调用阿里云删除接口删除远端音色
2. 远端删除成功后再删除本地记录
3. 若远端已不存在（404），视为成功，正常删除本地记录
4. 远端删除失败时保留本地记录并记录错误信息

## 链接

- [阿里云声音复刻](https://help.aliyun.com/zh/model-studio/voice-cloning-user-guide)
- [阿里云声音设计](https://help.aliyun.com/zh/model-studio/voice-design-user-guide)
- [阿里云声音复刻HTTP API参考](https://help.aliyun.com/zh/model-studio/voice-clone-design-http-api)
- [阿里云声音复刻Java SDK参考](https://help.aliyun.com/zh/model-studio/voice-clone-java-sdk)
- [阿里云SSML 与 LaTeX](https://help.aliyun.com/zh/model-studio/ssml-latex-user-guide)
