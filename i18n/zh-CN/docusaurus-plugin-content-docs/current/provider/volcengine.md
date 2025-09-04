---
title: 火山引擎 大模型对接
sidebar_label: VolcEngine
sidebar_position: 8
description: 微语对接 火山引擎 大模型的配置说明和步骤指南
---

:::tip 前置条件
已申请 火山引擎 API Key（申请地址：[https://console.volcengine.com/ark/apiKey](https://console.volcengine.com/ark/apiKey)）
:::

## 配置步骤

### 1. 获取 API Key

1. 访问 火山引擎 开发者平台：[https://console.volcengine.com/ark/apiKey](https://console.volcengine.com/ark/apiKey)
2. 注册并登录账号
3. 在控制台创建 API Key

### 2. 管理后台配置

1. 登录微语管理后台

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 模型配置选择

1. 进入 AI 模型配置页面
2. 选择 VolcEngine 作为默认模型
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

## 常见问题

1. **API Key 无效**
   - 检查 API Key 是否正确复制
   - 确认 API Key 是否已激活
   - 验证 API Key 的权限设置

2. **对话响应慢**
   - 检查网络连接
   - 确认服务器配置是否满足要求
   - 可以适当调整 temperature 参数

## 相关资源

- [火山引擎 API 文档](https://www.volcengine.com/docs/82379/1330626)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/)
- [微语文档中心](/docs/intro)
