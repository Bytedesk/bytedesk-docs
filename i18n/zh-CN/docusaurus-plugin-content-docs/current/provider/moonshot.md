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

- `kimi-k2.6`：当前仓库默认使用的 Kimi 模型

> 截图后续补充。

### 4. 获取聊天代码

1. 在管理后台找到“获取聊天代码”选项
2. 复制生成的代码
3. 将代码集成到你的网站中

> 截图后续补充。

## 效果展示

配置完成后，即可在访客侧聊天窗口或机器人对话中使用 Moonshot Kimi 模型。

> 聊天效果截图后续补充。

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

- 将配置文件中的 `sk-xxx` 替换为你获取的 API Key
- 推荐优先使用 `kimi-k2.6`，并遵循其固定采样参数约束
- 如果通过后台为机器人单独配置 Moonshot，系统会自动处理部分模型兼容参数
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

## 相关资源

- [Moonshot 开放平台](https://platform.moonshot.cn/)
- [Kimi API 文档](https://platform.moonshot.cn/docs)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/api/chat/)
- [微语文档中心](/docs/intro)
