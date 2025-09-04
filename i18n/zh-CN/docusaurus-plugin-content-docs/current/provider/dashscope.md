---
title: 通义千问 DashScope 对接
sidebar_label: DashScope
sidebar_position: 4
description: 微语对接阿里云通义千问 DashScope 大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请阿里云百炼大模型 API Key（申请地址：[https://bailian.console.aliyun.com/?apiKey=1#/api-key](https://bailian.console.aliyun.com/?apiKey=1#/api-key)）
:::

## 配置步骤

### 1. 获取 API Key

1. 访问阿里云百炼大模型控制台：[https://bailian.console.aliyun.com/?apiKey=1#/api-key](https://bailian.console.aliyun.com/?apiKey=1#/api-key)
2. 注册并登录阿里云账号
3. 在控制台创建 API Key
4. 保存生成的 API Key

### 2. 管理后台配置

1. 登录微语管理后台

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 模型配置选择

1. 进入 AI 模型配置页面
2. 选择通义千问作为默认模型
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

### Docker部署配置参数

```bash
# 通义千问 API 配置
SPRING_AI_DASHSCOPE_BASE_URL: https://dashscope.aliyuncs.com/compatible-mode
SPRING_AI_DASHSCOPE_API_KEY: 'sk-xxx'                   # 替换为你的通义千问 API Key
SPRING_AI_DASHSCOPE_CHAT_ENABLED: true                  # 启用通义千问对话功能

# 模型配置
SPRING_AI_DASHSCOPE_CHAT_OPTIONS_MODEL: deepseek-r1     # 模型名称
SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TEMPERATURE: 0.7       # 温度参数，控制输出的随机性，范围 0-1

# 功能开关配置
SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED: false  # 语音转文字功能
SPRING_AI_DASHSCOPE_IMAGE_ENABLED: false                # 图像处理功能
SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED: true            # 文本嵌入功能
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED: false     # 语音合成功能
SPRING_AI_NACOS_PROMPT_TEMPLATE_ENABLED: false         # Nacos 提示词模板功能
```

### 源码部署配置参数

```bash
# 通义千问 API 配置
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com/compatible-mode
spring.ai.dashscope.api-key=sk-xxx                      # 替换为你的通义千问 API Key
spring.ai.dashscope.chat.enabled=true                   # 启用通义千问对话功能

# 模型配置
spring.ai.dashscope.chat.options.model=deepseek-r1      # 模型名称
spring.ai.dashscope.chat.options.temperature=0.7        # 温度参数，控制输出的随机性，范围 0-1
spring.ai.dashscope.chat.options.topP=3                 # 采样参数

# 功能开关配置
spring.ai.dashscope.audio.transcription.enabled=false   # 语音转文字功能
spring.ai.dashscope.image.enabled=false                 # 图像处理功能
spring.ai.dashscope.embedding.enabled=true              # 文本嵌入功能
spring.ai.dashscope.audio.synthesis.enabled=false       # 语音合成功能
spring.ai.nacos.prompt.template.enabled=false           # Nacos 提示词模板功能
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

- [阿里云百炼大模型文档](https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.11c67980m5X2VR#/model-market)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/api/chat/dashscope-chat.html)
- [微语文档中心](/docs/intro)
