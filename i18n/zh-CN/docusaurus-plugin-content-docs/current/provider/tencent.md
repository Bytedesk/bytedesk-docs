---
title: 腾讯混元大模型对接
sidebar_label: Tencent
sidebar_position: 7
description: 微语对接腾讯混元大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请腾讯混元 API Key（申请地址：[https://console.cloud.tencent.com/hunyuan/start](https://console.cloud.tencent.com/hunyuan/start)）
:::

## 配置说明

### Docker部署配置参数

```bash
# 腾讯混元 API 配置
SPRING_AI_TENCENT_BASE_URL: https://api.hunyuan.cloud.tencent.com  # 腾讯混元 API 基础地址
SPRING_AI_TENCENT_API_KEY: 'sk-xxx'                                # 替换为你的腾讯混元 API Key
SPRING_AI_TENCENT_CHAT_ENABLED: true                               # 启用腾讯混元对话功能

# 模型配置
SPRING_AI_TENCENT_CHAT_OPTIONS_MODEL: hunyuan-t1-latest            # 当前支持的模型：hunyuan-t1-latest
SPRING_AI_TENCENT_CHAT_OPTIONS_TEMPERATURE: 0.7                    # 温度参数，控制输出的随机性，范围 0-1
```

### 源码部署配置参数

```bash
# 腾讯混元 API 配置
spring.ai.tencent.base-url=https://api.hunyuan.cloud.tencent.com   # 腾讯混元 API 基础地址
spring.ai.tencent.api-key=sk-xxx                                   # 替换为你的腾讯混元 API Key
spring.ai.tencent.chat.enabled=true                                # 启用腾讯混元对话功能

# 模型配置
spring.ai.tencent.chat.options.model=hunyuan-t1-latest             # 当前支持的模型：hunyuan-t1-latest
spring.ai.tencent.chat.options.temperature=0.7                     # 温度参数，控制输出的随机性，范围 0-1
```

## 配置步骤

### 1. 获取 API Key

1. 登录腾讯云控制台：[https://console.cloud.tencent.com](https://console.cloud.tencent.com)
2. 进入混元大模型服务：[https://console.cloud.tencent.com/hunyuan/start](https://console.cloud.tencent.com/hunyuan/start)
3. 开通混元大模型服务
4. 创建并获取 API Key

### 2. 修改配置文件

:::tip 配置说明

- 将配置文件中的 `sk-xxx` 替换为你获取的 API Key
- 根据实际需求调整 temperature 参数
:::

### 3. 管理后台配置

1. 登录微语管理后台
2. 进入 AI 模型配置页面
3. 选择腾讯混元作为默认模型
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
   - 验证是否已开通腾讯混元大模型服务

2. **对话响应慢**
   - 检查网络连接
   - 确认服务器配置是否满足要求
   - 可以适当调整 temperature 参数

3. **模型调用失败**
   - 检查账户是否有足够的调用额度
   - 确认所选模型是否可用

## 相关资源

- [腾讯混元 API 文档](https://cloud.tencent.com/document/product/1729/111007)
- [腾讯混元服务控制台](https://console.cloud.tencent.com/hunyuan/start)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/)
- [微语文档中心](/docs/intro)
