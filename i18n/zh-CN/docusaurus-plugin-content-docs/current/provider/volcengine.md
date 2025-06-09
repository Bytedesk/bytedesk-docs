---
title: 火山引擎 大模型对接
sidebar_label: VolcEngine
sidebar_position: 8
description: 微语对接 火山引擎 大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请 火山引擎 API Key（申请地址：[https://console.volcengine.com/ark/apiKey](https://console.volcengine.com/ark/apiKey)）
:::

## 配置说明

### Docker部署配置参数

```bash
# 火山引擎 API 配置
SPRING_AI_VOLCENGINE_BASE_URL: https://ark.cn-beijing.volces.com/api/v3  # 火山引擎 API 基础地址
SPRING_AI_VOLCENGINE_API_KEY: 'xxxxxx'                  # 替换为你的 火山引擎 API Key
SPRING_AI_VOLCENGINE_CHAT_ENABLED: true                 # 启用 火山引擎 对话功能

# 模型配置
SPRING_AI_VOLCENGINE_CHAT_OPTIONS_MODEL: doubao-1-5-pro-32k-250115  # 火山引擎豆包大模型
SPRING_AI_VOLCENGINE_CHAT_OPTIONS_TEMPERATURE: 0.7         # 温度参数，控制输出的随机性，范围 0-1
SPRING_AI_VOLCENGINE_EMBEDDING_ENABLED: true               # 启用 火山引擎 文本嵌入功能
```

### 源码部署配置参数

```bash
# 火山引擎 API 配置
spring.ai.volcengine.base-url=https://ark.cn-beijing.volces.com/api/v3  # 火山引擎 API 基础地址
spring.ai.volcengine.api-key=xxxxxx                        # 替换为你的 火山引擎 API Key
spring.ai.volcengine.chat.enabled=true                     # 启用 火山引擎 对话功能

# 模型配置
spring.ai.volcengine.chat.options.model=doubao-1-5-pro-32k-250115   # 火山引擎豆包大模型
spring.ai.volcengine.chat.options.temperature=0.7          # 温度参数，控制输出的随机性，范围 0-1
```

## 配置步骤

### 1. 获取 API Key

1. 访问 火山引擎 开发者平台：[https://console.volcengine.com/ark/apiKey](https://console.volcengine.com/ark/apiKey)
2. 注册并登录账号
3. 在控制台创建 API Key
4. 保存生成的 API Key

### 2. 修改配置文件

:::tip 配置说明

- 将配置文件中的 `xxxxxx` 替换为你获取的 API Key
- 根据实际需求调整 temperature 参数
- 如果不需要文本嵌入功能，可以将 `SPRING_AI_VOLCENGINE_EMBEDDING_ENABLED` 设置为 false
:::

### 3. 管理后台配置

1. 登录微语管理后台
2. 进入 AI 模型配置页面
3. 选择 VolcEngine 作为默认模型
4. 保存配置

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 获取聊天代码

1. 在管理后台找到"获取聊天代码"选项
2. 复制生成的代码
3. 将代码集成到你的网站中

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

配置完成后，你可以在网站中看到如下效果：

![provider-chat](/img/deploy/provider/provider-chat.png)

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
   - 确认 `SPRING_AI_VOLCENGINE_EMBEDDING_ENABLED` 设置为 true
   - 检查 API Key 是否支持文本嵌入功能

## 相关资源

- [火山引擎 API 文档](https://www.volcengine.com/docs/82379/1330626)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/)
- [微语文档中心](/docs/intro)
