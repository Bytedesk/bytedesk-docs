---
title: Moonshot 对接
sidebar_label: Moonshot
sidebar_position: 10
description: 微语对接 Moonshot Kimi 大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请 Moonshot Kimi API Key
- 已确认使用的模型与参数约束，尤其是 kimi-k2.6 的固定采样参数
:::

## 配置步骤

### 1. 获取 API Key

1. 访问 [Moonshot 开放平台](https://platform.moonshot.cn/)
2. 注册并登录 Moonshot 账号
3. 在控制台创建 API Key
4. 保存生成的 API Key，后续用于微语后台或配置文件接入

### 2. 管理后台配置

1. 登录微语管理后台
2. 进入大模型服务商配置页面
3. 新增或编辑 Moonshot 服务商配置
4. 填写以下关键信息：

- `baseUrl`：`https://api.moonshot.cn`
- `apiKey`：你在 Moonshot 平台申请的 Key
- `model`：推荐使用 `kimi-k2.6`

> 截图后续补充。

### 3. 模型配置选择

1. 进入 AI 模型配置页面
2. 选择 Moonshot 作为默认模型或为机器人单独绑定 Moonshot
3. 保存配置

推荐模型：

> 截图后续补充。

### 4. 获取聊天代码

1. 在管理后台找到“获取聊天代码”选项
2. 复制生成的代码
3. 将代码集成到你的网站中

> 截图后续补充。

## 效果展示

配置完成后，即可在访客侧聊天窗口或机器人对话中使用 Moonshot Kimi 模型。

> 聊天效果截图后续补充。

## 推荐模型与多模态支持

Moonshot 当前建议优先使用 `kimi-k2.6`。如果你需要视觉理解、多模态输入或兼容旧版生成模型，也可以根据场景选择其他模型。

### 推荐优先使用

| 模型名称 | 描述 |
| --- | --- |
| `kimi-k2.6` | Kimi 当前主推模型，在 Kimi K2.5 的基础上进一步增强了 agentic coding、长上下文推理、长周期执行和前端设计场景能力，上下文长度 `256k` |
| `kimi-k2.5` | 在 Agent、代码、视觉理解及通用智能任务上表现稳定，同时支持视觉与文本输入、思考与非思考模式、对话与 Agent 任务，上下文长度 `256k` |

:::warning K2 系列下线提醒

`kimi-k2` 系列模型计划于 `2026-05-25` 下线，后续将不再维护和支持。新接入或继续使用 Moonshot 的场景，建议直接切换到 `kimi-k2.6`。
:::

### Kimi K2 系列模型

| 模型名称 | 描述 |
| --- | --- |
| `kimi-k2-0905-preview` | 上下文长度 `256k`，在 0711 版本基础上增强了 Agentic Coding 能力、前端代码美观度与实用性，以及上下文理解能力 |
| `kimi-k2-0711-preview` | 上下文长度 `128k`，MoE 架构基础模型，总参数 `1T`、激活参数 `32B`，具备较强代码与 Agent 能力 |
| `kimi-k2-turbo-preview` | K2 的高速版本，对标 0905，输出速度约每秒 `60-100 tokens`，上下文长度 `256k` |
| `kimi-k2-thinking` | K2 长思考模型，支持 `256k` 上下文与多步工具调用，适合复杂问题求解 |
| `kimi-k2-thinking-turbo` | K2 长思考模型的高速版本，支持 `256k` 上下文，擅长深度推理，输出速度约每秒 `60-100 tokens` |

### Moonshot V1 生成与视觉模型

以下模型主要区别在于最大上下文长度；`vision-preview` 后缀模型支持图片输入，适合 OCR、图片理解、截图问答等多模态场景。

| 模型名称 | 描述 |
| --- | --- |
| `moonshot-v1-8k` | 适用于短文本生成，上下文长度 `8k` |
| `moonshot-v1-32k` | 适用于较长文本生成，上下文长度 `32k` |
| `moonshot-v1-128k` | 适用于超长文本生成，上下文长度 `128k` |
| `moonshot-v1-8k-vision-preview` | Vision 视觉模型，支持图片理解并输出文本，上下文长度 `8k` |
| `moonshot-v1-32k-vision-preview` | Vision 视觉模型，支持图片理解并输出文本，上下文长度 `32k` |
| `moonshot-v1-128k-vision-preview` | Vision 视觉模型，支持图片理解并输出文本，上下文长度 `128k` |

> 说明：Moonshot V1 系列主要差异是上下文容量，模型效果本身无明显区分；如果你需要图片输入，请选择带 `vision-preview` 后缀的模型。

### 已下线或不再推荐的模型

| 模型名称 | 状态说明 |
| --- | --- |
| `kimi-latest` | 已于 `2026-01-28` 停止新用户使用，不再维护，建议升级到 `kimi-k2.6` |
| `kimi-thinking-preview` | 已于 `2025-11-11` 下线，不再维护，建议升级到 `kimi-k2.6` |

### 选型建议


## 配置说明（可选）

### Docker 部署配置参数

```bash
# Moonshot API 配置
SPRING_AI_MOONSHOT_BASE_URL: https://api.moonshot.cn
SPRING_AI_MOONSHOT_API_KEY: 'sk-xxx'                 # 替换为你的 Moonshot API Key
SPRING_AI_MOONSHOT_CHAT_ENABLED: true                # 启用 Moonshot 对话功能

# 模型配置
SPRING_AI_MOONSHOT_CHAT_OPTIONS_MODEL: kimi-k2.6     # 推荐模型
SPRING_AI_MOONSHOT_CHAT_OPTIONS_TEMPERATURE: 1       # kimi-k2.6 建议固定为 1

# 其他说明
# kimi-k2.6 当前由服务端强制规范为：temperature=1、top_p=0.95
# 如通过机器人动态配置 maxTokens，将自动映射为 max_completion_tokens
```

### 源码部署配置参数

```bash
# Moonshot API 配置
spring.ai.moonshot.base-url=https://api.moonshot.cn
spring.ai.moonshot.api-key=sk-xxx                    # 替换为你的 Moonshot API Key
spring.ai.moonshot.chat.enabled=true                 # 启用 Moonshot 对话功能

# 模型配置
spring.ai.moonshot.chat.options.model=kimi-k2.6      # 推荐模型
spring.ai.moonshot.chat.options.temperature=1         # kimi-k2.6 建议固定为 1

# 也可使用环境变量注入 API Key
# export SPRING_AI_MOONSHOT_API_KEY=<INSERT KEY HERE>
```

### 参数约束说明

当前仓库中的 Moonshot 集成已经针对 `kimi-k2.6` 做了兼容处理，主要包括：

- `temperature` 会被强制规范为 `1`
- `top_p` 会被强制规范为 `0.95`
- 机器人动态配置中的 `maxTokens` 会优先转换为 `max_completion_tokens`
- `kimi-k2.*` 模型支持 `thinking` 参数，系统会根据机器人配置自动开启或关闭

:::tip 配置说明

:::

## 常见问题

1. **API Key 无效**
   - 检查 API Key 是否正确复制
   - 确认 API Key 是否已激活
   - 验证 API Key 是否具备对应模型调用权限

2. **返回 400 参数错误**
   - 检查模型是否为 `kimi-k2.6`
   - 如果是 `kimi-k2.6`，确认不要手工传入与平台约束冲突的采样参数
   - 当前已知该模型要求 `temperature=1`、`top_p=0.95`

3. **对话响应慢或失败**
   - 检查网络连接和 Moonshot 平台可用性
   - 查看微语服务端日志，确认是否返回了具体的错误 body
   - 检查后台配置的 `baseUrl`、`apiKey`、模型名称是否一致

4. **后台已配置但接口未生效**
   - 检查 `spring.ai.moonshot.chat.enabled` 是否已开启
   - 检查当前机器人或默认模型是否实际绑定到了 Moonshot
   - 源码部署时，确认本地 profile 中未把 Moonshot 配置注释掉

5. **上传了图片但模型无法识别**
   - 检查当前模型是否支持视觉输入，例如 `kimi-k2.5` 或 `moonshot-v1-*-vision-preview`
   - 确认业务侧请求链路已经把图片内容传递给模型，而不是仅发送文本消息
   - 如果当前绑定的是 `kimi-k2.6`，请先确认该场景是否需要切换到视觉模型

6. **仍在使用旧模型名称**
   - `kimi-latest` 与 `kimi-thinking-preview` 已不再推荐继续使用
   - `kimi-k2` 系列模型计划于 `2026-05-25` 下线
   - 建议尽快统一迁移到 `kimi-k2.6`

## 相关资源

- [Moonshot 开放平台](https://platform.moonshot.cn/)
- [Moonshot Models](https://platform.kimi.com/docs/models)
- [Kimi API 文档](https://platform.moonshot.cn/docs)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/api/chat/)
- [微语文档中心](/docs/intro)
