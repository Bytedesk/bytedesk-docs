---
title: MiniMax 对接
sidebar_label: MiniMax
sidebar_position: 9
description: 微语对接 MiniMax 大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请 MiniMax 大模型 API Key（[MiniMax 官网](https://www.minimaxi.com/)）
:::

## 配置步骤

### 1. 获取 API Key

1. 访问 [MiniMax 官网](https://www.minimax.chat/)
2. 注册并登录 MiniMax 账号
3. 在控制台创建 API Key
4. 保存生成的 API Key

### 2. 管理后台配置

1. 登录微语管理后台

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 模型配置选择

1. 进入 AI 模型配置页面
2. 选择 MiniMax 作为默认模型
3. 保存配置

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 获取聊天代码

1. 在管理后台找到"获取聊天代码"选项
2. 复制生成的代码
3. 将代码集成到你的网站中

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

配置完成后，你可以在网站中看到如下效果：

import ProviderChat from '/img/deploy/provider/provider-chat.png';

<img src={ProviderChat} alt="聊天效果展示" width="360" />

## 配置说明（可选）

### Docker 部署配置参数

```bash
# MiniMax API 配置
SPRING_AI_MINIMAX_BASE_URL: https://api.minimax.chat/v1
SPRING_AI_MINIMAX_API_KEY: 'sk-xxx'                   # 替换为你的 MiniMax API Key
SPRING_AI_MINIMAX_CHAT_ENABLED: true                  # 启用 MiniMax 对话功能

# 模型配置
SPRING_AI_MINIMAX_CHAT_OPTIONS_MODEL: abab5.5-chat    # 模型名称，按需选择
SPRING_AI_MINIMAX_CHAT_OPTIONS_TEMPERATURE: 0.7       # 温度参数，控制输出的随机性，范围 0-1

# 功能开关配置
SPRING_AI_MINIMAX_AUDIO_TRANSCRIPTION_ENABLED: false  # 语音转文字功能
SPRING_AI_MINIMAX_IMAGE_ENABLED: false                # 图像处理功能
SPRING_AI_MINIMAX_EMBEDDING_ENABLED: true             # 文本嵌入功能
SPRING_AI_MINIMAX_AUDIO_SYNTHESIS_ENABLED: false      # 语音合成功能
SPRING_AI_NACOS_PROMPT_TEMPLATE_ENABLED: false        # Nacos 提示词模板功能
```

### 源码部署配置参数

```bash
# MiniMax API 配置
spring.ai.minimax.base-url=https://api.minimax.chat/v1
spring.ai.minimax.api-key=sk-xxx                      # 替换为你的 MiniMax API Key
spring.ai.minimax.chat.enabled=true                   # 启用 MiniMax 对话功能

# 模型配置
spring.ai.minimax.chat.options.model=abab5.5-chat     # 模型名称，按需选择
spring.ai.minimax.chat.options.temperature=0.7        # 温度参数，控制输出的随机性，范围 0-1
spring.ai.minimax.chat.options.topP=3                 # 采样参数

# 功能开关配置
spring.ai.minimax.audio.transcription.enabled=false   # 语音转文字功能
spring.ai.minimax.image.enabled=false                 # 图像处理功能
spring.ai.minimax.embedding.enabled=true              # 文本嵌入功能
spring.ai.minimax.audio.synthesis.enabled=false       # 语音合成功能
spring.ai.nacos.prompt.template.enabled=false         # Nacos 提示词模板功能
```

:::tip 配置说明

- 将配置文件中的 `sk-xxx` 替换为你获取的 API Key
- 根据实际需求调整 temperature 和 topP 参数
- 根据需求开启或关闭相关功能（语音转文字、图像处理等）
:::

## 常见问题

1. **API Key 无效**
   - 检查 API Key 是否正确复制
   - 确认 API Key 是否已激活
   - 验证 API Key 的权限设置

2. **对话响应慢**
   - 检查网络连接
   - 确认服务器配置是否满足要求
   - 可以适当调整 temperature 和 topP 参数

3. **功能异常**
   - 检查相应功能的开关是否已启用
   - 确认 API Key 是否支持该功能
   - 查看服务器日志排查具体原因

## 相关资源

- [MiniMax 官网](https://www.minimax.chat/)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/api/chat/)
- [微语文档中心](/docs/intro)
