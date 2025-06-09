---
title: 百度千帆大模型对接
sidebar_label: Baidu
sidebar_position: 8
description: 微语对接百度千帆大模型的配置说明和步骤指南
---

:::tip 前置条件

- 已部署微语系统
- 已申请百度千帆 API Key（申请地址：[https://console.bce.baidu.com/iam/#/iam/apikey/list](https://console.bce.baidu.com/iam/#/iam/apikey/list)）
:::

## 配置说明

### Docker部署配置参数

```bash
# 百度千帆 API 配置
SPRING_AI_BAIDU_BASE_URL: https://qianfan.bj.baidubce.com  # 百度千帆 API 基础地址
SPRING_AI_BAIDU_API_KEY: 'bce-v3/xxx'                      # 替换为你的百度千帆 API Key
SPRING_AI_BAIDU_CHAT_ENABLED: true                         # 启用百度千帆对话功能

# 模型配置
SPRING_AI_BAIDU_CHAT_OPTIONS_MODEL: ernie-x1-32k-preview   # 文心一言大模型，可选值: ernie-x1-32k-preview, ernie-4.0-8k 等
SPRING_AI_BAIDU_CHAT_OPTIONS_TEMPERATURE: 0.7              # 温度参数，控制输出的随机性，范围 0-1
```

### 源码部署配置参数

```bash
# 百度千帆 API 配置
spring.ai.baidu.base-url=https://qianfan.bj.baidubce.com   # 百度千帆 API 基础地址
spring.ai.baidu.api-key=bce-v3/xxx                         # 替换为你的百度千帆 API Key
spring.ai.baidu.chat.enabled=true                          # 启用百度千帆对话功能

# 模型配置
spring.ai.baidu.chat.options.model=ernie-x1-32k-preview    # 文心一言大模型，可选值: ernie-x1-32k-preview, ernie-4.0-8k 等
spring.ai.baidu.chat.options.temperature=0.7               # 温度参数，控制输出的随机性，范围 0-1
```

## 配置步骤

### 1. 获取 API Key

1. 登录百度智能云控制台：[https://console.bce.baidu.com](https://console.bce.baidu.com)
2. 进入访问控制 IAM：[https://console.bce.baidu.com/iam/#/iam/apikey/list](https://console.bce.baidu.com/iam/#/iam/apikey/list)
3. 创建 API Key, [地址](https://console.bce.baidu.com/iam/#/iam/apikey/list)，服务选择 千帆Model Builder, 点击创建. 注意：选择 AI开放能力报错401
4. 保存生成的 API Key

### 2. 开通文心一言服务

1. 访问百度千帆大模型平台：[https://cloud.baidu.com/product/wenxinworkshop](https://cloud.baidu.com/product/wenxinworkshop)
2. 开通文心一言服务
3. 在控制台获取访问权限

### 3. 修改配置文件

:::tip 配置说明

- 将配置文件中的 `bce-v3/xxx` 替换为你获取的 API Key
- 根据实际需求选择适合的模型和调整 temperature 参数
:::

### 4. 管理后台配置

1. 登录微语管理后台
2. 进入 AI 模型配置页面
3. 选择百度千帆作为默认模型
4. 保存配置

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 5. 获取聊天代码

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
   - 验证是否已开通文心一言服务

2. **对话响应慢**
   - 检查网络连接
   - 确认服务器配置是否满足要求
   - 可以适当调整 temperature 参数

3. **模型调用失败**
   - 检查账户是否有足够的调用额度
   - 确认所选模型是否可用
   - 验证 API Key 权限是否足够

## 相关资源

- [百度千帆 API 文档](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Fm2vrveyu)
- [百度智能云控制台](https://console.bce.baidu.com)
- [Spring AI 文档](https://docs.spring.io/spring-ai/reference/)
- [微语文档中心](/docs/intro)
