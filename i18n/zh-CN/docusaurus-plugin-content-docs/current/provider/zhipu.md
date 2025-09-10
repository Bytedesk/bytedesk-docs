---
title: 智谱 AI 大模型对接
sidebar_label: Zhipu
sidebar_position: 3
description: 微语对接智谱 AI 大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请智谱 AI API Key（申请地址：[https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)）
:::

## 配置步骤

### 1. 获取 API Key

1. 访问智谱 AI 开发者平台：[https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
2. 注册并登录账号
3. 在控制台创建 API Key
4. 保存生成的 API Key

### 2. 管理后台配置

1. 登录微语管理后台

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 模型配置选择

1. 进入 AI 模型配置页面
2. 选择智谱 AI 作为默认模型
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
# 智谱 AI API 配置
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'                      # 替换为你的智谱 AI API Key
SPRING_AI_ZHIPUAI_CHAT_ENABLED: true                     # 启用智谱 AI 对话功能

# 模型配置
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash       # 模型名称，如 glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7         # 温度参数，控制输出的随机性，范围 0-1

# 文本嵌入配置
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: true               # 启用文本嵌入功能
```

### 源码部署配置参数

```bash
# 智谱 AI API 配置
spring.ai.zhipuai.api-key='sk-xxx'                       # 替换为你的智谱 AI API Key
spring.ai.zhipuai.chat.enabled=true                      # 启用智谱 AI 对话功能

# 模型配置
spring.ai.zhipuai.chat.options.model=glm-4-flash        # 模型名称，如 glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7          # 温度参数，控制输出的随机性，范围 0-1

# 文本嵌入配置
spring.ai.zhipuai.embedding.enabled=true                 # 启用文本嵌入功能
```

:::tip 配置说明

- 将配置文件中的 `sk-xxx` 替换为你获取的 API Key
- 根据实际需求调整 temperature 参数
- 如果不需要文本嵌入功能，可以将 `SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED` 设置为 false
:::

## 常见问题

1. **API Key 无效**
   - 检查 API Key 是否正确复制
   - 确认 API Key 是否已激活
   - 验证 API Key 的权限设置

2. **对话响应慢**
   - 检查网络连接
   - 确认服务器配置是否满足要求
   - 可以适当调整 temperature 参数

3. **文本嵌入功能异常**
   - 确认 `SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED` 设置为 true
   - 检查 API Key 是否支持文本嵌入功能

## 相关资源

- [智谱 AI API 文档](https://open.bigmodel.cn/overview)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/api/chat/zhipuai-chat.html)
- [微语文档中心](/docs/intro)
