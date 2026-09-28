---
slug: deepseek-v4-1-flash
title: 微语已支持 DeepSeek-V4.1-Flash：默认模型新增 deepseek-flash
authors: jackning
tags: [bytedesk, AI, DeepSeek, LLM, Agent]
---

DeepSeek 已正式发布 DeepSeek-V4.1-Flash 模型，并建议所有新接入统一使用 `deepseek-flash` 作为模型名。微语已在默认模型列表中增加 `deepseek-flash`，企业可以直接在微语管理后台完成切换与配置，无需改动任何集成方式。

<!-- truncate -->

## DeepSeek-V4.1-Flash 带来了什么

根据 DeepSeek 官方说明，DeepSeek-V4.1-Flash 是当前 DeepSeek Flash 系列的最新版本，通过 `deepseek-flash` 模型名提供服务，主要特性包括：

- 支持 1M 超长上下文，最大输出 384K，适合长文档问答与复杂知识库场景
- 支持思考模式（默认）与非思考模式
- 支持 Json Output、Tool Calls、Responses API 与 Anthropic API
- 支持图像理解
- Flash 级定价，性价比更高，适合在线客服、常见问题与批量对话等高并发场景

## 新模型名与旧模型名的关系

DeepSeek 官方已明确说明模型名的变化：

- 新接入请统一使用 `deepseek-flash`
- 旧模型名 `deepseek-v4-flash`、`deepseek-v4-flash-vision-exp` 仍可调用，但对应模型已下线，请求将由 DeepSeek-V4.1-Flash 提供服务，并按 Flash 价格计费
- `deepseek-v4-pro` 继续提供服务，对应版本为 DeepSeek-V4-Pro-0813

| 模型名 | 实际服务版本 | 说明 |
| --- | --- | --- |
| deepseek-flash | DeepSeek-V4.1-Flash | 推荐新配置使用 |
| deepseek-v4-flash | DeepSeek-V4.1-Flash | 旧模型名，仍可调用 |
| deepseek-v4-pro | DeepSeek-V4-Pro-0813 | 继续提供 |

## 微语当前已支持的 DeepSeek 模型

在微语的模型配置中，DeepSeek 供应商下已提供以下模型：

- deepseek-flash
- deepseek-v4-flash
- deepseek-v4-pro

其中 `deepseek-flash` 已加入默认模型列表，可以直接在 AI 模型配置页选择使用。

## 微语中的推荐迁移方式

如果你已经在微语中使用 DeepSeek，推荐按下面方式迁移：

### 1. 将默认模型切换为 deepseek-flash

将默认模型从下列旧值替换为 `deepseek-flash`：

- deepseek-chat -> deepseek-flash
- deepseek-reasoner -> deepseek-flash
- deepseek-v4-flash -> deepseek-flash

如果你的场景更看重复杂推理、长链路任务和 Agent 表现，也可以继续使用 `deepseek-v4-pro`。

### 2. 保持 base URL 不变

DeepSeek-V4.1-Flash 的 API 接入方式没有改变，仍然使用原有 DeepSeek API 地址：

```bash
https://api.deepseek.com
```

迁移时主要修改的是 model 参数，而不是接入地址。

### 3. 在微语后台完成切换

你可以直接在微语管理后台中完成以下操作：

1. 登录管理后台
2. 进入 AI 模型配置页面
3. 选择 DeepSeek 作为模型提供商
4. 将默认模型切换为 deepseek-flash
5. 保存并测试对话效果

整个过程不需要重新嵌入聊天代码，也不需要改动访客端接入方式。

## 选择建议

如果你不确定该如何选择，可以参考下面的实践建议：

- 在线客服机器人默认首选 deepseek-flash
- 复杂业务问答、知识库深度问答、工作流助手优先选择 deepseek-v4-pro
- 需要图像理解能力时，使用 deepseek-flash

## 总结

随着 DeepSeek-V4.1-Flash 发布，微语已经同步在默认模型列表中增加 `deepseek-flash`。对于需要长上下文、多模态理解和更高性价比自动化客服体验的团队来说，这是一次值得尽快完成的升级。

如果你已经在使用微语对接 DeepSeek，建议尽快把默认模型迁移到 `deepseek-flash`，以便享受最新的 V4.1-Flash 能力。

## 相关资源

- [DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/)
- [DeepSeek 模型 & 价格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
