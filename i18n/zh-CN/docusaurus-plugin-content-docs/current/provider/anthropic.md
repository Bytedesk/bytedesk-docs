---
sidebar_label: Anthropic
sidebar_position: 9
---

# Anthropic 集成

本页介绍如何将 Bytedesk 接入 Anthropic Claude 模型，并将 Anthropic 设为默认聊天服务提供商。

:::tip 前提条件

- Bytedesk 已部署完成
- 已创建 Anthropic API 密钥
:::

## 配置步骤

### 1. 创建 API 密钥

1. 打开 Anthropic 控制台：[https://console.anthropic.com/](https://console.anthropic.com/)
2. 登录或创建账号
3. 在控制面板中创建 API 密钥
4. 保存生成的密钥

### 2. 配置管理后台

1. 登录 Bytedesk 管理后台
2. 打开服务商配置页面
3. 填入 Anthropic API 密钥

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 选择服务提供商

1. 打开 AI 模型设置
2. 选择 Anthropic 作为默认服务商
3. 保存更改

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 发布聊天代码

1. 在管理后台中找到"获取聊天代码"
2. 复制生成的代码
3. 将代码嵌入到你的网站中

![provider-code](/img/deploy/provider/provider-code.png)

## 效果示例

配置完成后，网站聊天即可使用 Anthropic 驱动的对话能力。

![Anthropic 聊天效果](/img/deploy/provider/provider-chat.png)

## 推荐模型

Bytedesk 当前在服务商元数据中提供以下 Anthropic 文本模型：

| 模型 | 推荐说明 | 备注 |
| --- | --- | --- |
| claude-sonnet-4-5 | 推荐默认模型 | 当前仓库中 Spring AI Anthropic 服务商配置使用的默认模型 |
| claude-3-5-sonnet-20240620 | 稳定替代方案 | 与服务商元数据中的模型目录一致 |
| claude-3-opus-20240229 | 高级任务 | 能力更强，通常成本更高 |
| claude-3-haiku-20240307 | 轻量任务 | 速度更快、成本更低 |

## 可选配置

### Docker 环境变量

```bash
SPRING_AI_ANTHROPIC_BASE_URL=https://api.anthropic.com
SPRING_AI_ANTHROPIC_API_KEY=sk-ant-xxx
SPRING_AI_ANTHROPIC_CHAT_ENABLED=true
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_MODEL=claude-sonnet-4-5
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_MAX_TOKENS=4096
```

### 源码配置

```bash
spring.ai.anthropic.base-url=https://api.anthropic.com
spring.ai.anthropic.api-key=sk-ant-xxx
spring.ai.anthropic.chat.enabled=true
spring.ai.anthropic.chat.options.model=claude-sonnet-4-5
spring.ai.anthropic.chat.options.temperature=0.7
spring.ai.anthropic.chat.options.max-tokens=4096
```

## 常见问题

1. API 密钥无效：请在 Anthropic 控制台中验证密钥和组织权限。
2. 模型不可用：切换到你的账户允许的其他 Claude 模型。
3. 响应慢或成本高：降低 max tokens 或使用 Haiku 等更轻量的模型。

## 相关资源

- [Anthropic 控制台](https://console.anthropic.com/)
- [Spring AI Anthropic](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)
- [Anthropic Java SDK](https://github.com/anthropics/anthropic-sdk-java)
- [Bytedesk 文档](../intro.md)
