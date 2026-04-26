---
sidebar_label: 对接 MaxKB
sidebar_position: 39
---

# 对接 MaxKB

本页说明微语如何将 MaxKB 作为第三方知识库与问答服务进行集成。

## 概览

当前仓库中已经存在明确的 MaxKB 集成证据：

- MaxKB 已出现在内置 provider 列表与后台静态资源中
- Swagger 中暴露了独立的 MaxKB chat API 分组
- 企业知识库模块中包含完整的 MaxKB 集成说明与配置示例

这说明 MaxKB 并不是占位 provider，而是仓库里已经规划过接入路径的能力。

## MaxKB 在微语中的适用场景

在微语中，MaxKB 适合承担以下场景：

- 外部知识库问答
- 兼容 OpenAI 风格的对话补全调用
- 将已有企业知识系统接入客服工作流
- 在机器人或服务入口后挂接第三方知识应用

## 仓库里的集成依据

目前仓库中可以确认的集成点包括：

- MaxKB provider 元数据，包含生产 base URL 与官网地址
- 面向租户和组织级别的 MaxKB 配置项
- Swagger 分组 `maxkb-chat-apis`
- 请求路径 `/api/v1/maxkb/chat/**`
- 企业集成说明中出现的 API URL、API Key、应用 ID 与 OpenAI 兼容调用示例

## 典型配置流程

1. 部署或准备一个可访问的 MaxKB 实例
2. 在 MaxKB 中创建知识应用
3. 在 MaxKB 控制台生成 API Key
4. 在微语中填写 MaxKB 连接信息
5. 将该能力绑定到目标机器人或业务入口

## 配置示例方向

企业集成说明中展示的配置模式如下：

```yaml
bytedesk:
  maxkb:
    enabled: true
    api-url: https://maxkb.fit2cloud.com
    api-key: application-xxxxxxxxf00e21a7530d1177c20967
    default-model: gpt-3.5-turbo
    default-stream: false
    timeout: 30000
```

## API 风格说明

仓库中附带的集成说明表明，MaxKB 既可以按 OpenAI 兼容的 chat completion 风格调用，也可以走更简单的消息接口。这样做的价值在于：微语侧的编排层可以保持稳定，而知识问答逻辑交给 MaxKB 来完成。

## 常见检查项

1. 确认微语服务器可以访问 MaxKB 实例。
2. 确认 API Key 有效，并且绑定到了目标应用。
3. 确认应用 ID 或对应接口地址填写正确。

## 相关资源

- [MaxKB 官网](https://maxkb.cn)
- [MaxKB 文档](https://maxkb.cn/docs)
- [MaxKB API 参考](https://maxkb.cn/docs/v1/dev_manual/APIKey_chat/#1-openai-api)
