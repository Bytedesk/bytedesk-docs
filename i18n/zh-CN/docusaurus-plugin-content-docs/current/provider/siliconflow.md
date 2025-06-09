---
title: 硅基流动 SiliconFlow 对接
sidebar_label: SiliconFlow
sidebar_position: 5
description: 微语对接硅基流动 SiliconFlow 大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请硅基流动 SiliconFlow API Key（申请地址：[https://www.siliconflow.cn](https://www.siliconflow.cn)）
:::

## 配置说明

### Docker部署配置参数

```bash
# 硅基流动 API 配置
SPRING_AI_SILICONFLOW_BASE_URL: 'https://api.siliconflow.cn'  # 硅基流动 API 基础地址
SPRING_AI_SILICONFLOW_API_KEY: 'sk-xxxx'                      # 替换为你的硅基流动 API Key
SPRING_AI_SILICONFLOW_CHAT_ENABLED: true                      # 启用硅基流动对话功能

# 模型配置
SPRING_AI_SILICONFLOW_CHAT_OPTIONS_MODEL: Qwen/QwQ-32B        # 模型名称
SPRING_AI_SILICONFLOW_CHAT_OPTIONS_TEMPERATURE: 0.7           # 温度参数，控制输出的随机性，范围 0-1
```

### 源码部署配置参数

```bash
# 硅基流动 API 配置
spring.ai.siliconflow.base-url=https://api.siliconflow.cn   # 硅基流动 API 基础地址
spring.ai.siliconflow.api-key=sk-xxxx                      # 替换为你的硅基流动 API Key
spring.ai.siliconflow.chat.enabled=true                     # 启用硅基流动对话功能

# 模型配置
spring.ai.siliconflow.chat.options.model=Qwen/QwQ-32B      # 模型名称
spring.ai.siliconflow.chat.options.temperature=0.7         # 温度参数，控制输出的随机性，范围 0-1
```

## 配置步骤

### 1. 获取 API Key

1. 访问硅基流动官网：[https://www.siliconflow.cn](https://www.siliconflow.cn)
2. 注册并登录账号
3. 在控制台创建 API Key
4. 保存生成的 API Key

### 2. 修改配置文件

:::tip 配置说明

- 将配置文件中的 `sk-xxxx` 替换为你获取的 API Key
- 根据实际需求调整 temperature 参数
- 根据需求开启或关闭文本嵌入功能
:::

### 3. 管理后台配置

1. 登录微语管理后台
2. 进入 AI 模型配置页面
3. 选择硅基流动作为默认模型
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

3. **功能异常**
   - 检查相应功能的开关是否已启用
   - 确认 API Key 是否支持该功能
   - 查看服务器日志排查具体原因

## 相关资源

- [硅基流动文档中心](https://www.siliconflow.cn/documentation)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/api/chat/siliconflow-chat.html)
- [微语文档中心](/docs/intro)
