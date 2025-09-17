---
sidebar_label: 对接 RagFlow
sidebar_position: 39
---

# 对接 RagFlow

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

## 步骤一：微语管理后台创建 RagFlow

![llm_ragflow_create](/img/provider/ragflow/llm_ragflow_create.png)

注意选择相应的类型：聊天chat 或 智能体agent

![llm_ragflow_type](/img/provider/ragflow/llm_ragflow_type.png)

## 步骤二：RagFlow后台获取 baseUrl 和 apiKey

![llm_ragflow_home](/img/provider/ragflow/llm_ragflow_home.png)

API服务器即：baseUrl，API KEY即：apikey

![llm_ragflow_apikey](/img/provider/ragflow/llm_ragflow_apikey.png)

## 步骤三：对接聊天Chat

### RagFlow后台创建Chat

![llm_ragflow_chatid_create](/img/provider/ragflow/llm_ragflow_chatid_create.png)

### 获取 RagFlow ChatID

![llm_ragflow_chatid_get](/img/provider/ragflow/llm_ragflow_chatid_get.png)

复制 Chat Id，并填写到 微语后台 RagFlow ID字段

![llm_ragflow_chatid_copy](/img/provider/ragflow/llm_ragflow_chatid_copy.png)

### 设置 RagFlow Model

![llm_ragflow_model](/img/provider/ragflow/llm_ragflow_model.png)

<!-- 修改微语后台的model，名称统一 -->
<!-- ![llm_ragflow_model_weiyu](/img/provider/ragflow/llm_ragflow_model_weiyu.png) -->

## 步骤三：或 对接智能体Agent

### RagFlow后台创建Agent

![llm_ragflow_agentid_create](/img/provider/ragflow/llm_ragflow_agentid_create.png)

### 获取 RagFlow AgentID

![llm_ragflow_agentid_get](/img/provider/ragflow/llm_ragflow_agentid_get.png)

复制 Agent Id，并填写到 微语后台 RagFlow ID字段

![llm_ragflow_agentid_copy](/img/provider/ragflow/llm_ragflow_agentid_copy.png)

## 步骤四：将 Base Url 、ApiKey、Chat Id 或者 Agent Id 填入微语后台

![llm_ragflow_fill_id](/img/provider/ragflow/llm_ragflow_fill_id.png)

## 步骤五：配置 机器人 模型

![llm_ragflow_provider](/img/provider/ragflow/llm_ragflow_provider.png)

![llm_ragflow_provider_choose](/img/provider/ragflow/llm_ragflow_provider_choose.png)

![llm_ragflow_provider_save](/img/provider/ragflow/llm_ragflow_provider_save.png)

## 步骤六：测试对话

获取对话链接

![llm_ragflow_provider_link](/img/provider/ragflow/llm_ragflow_provider_link.png)

开始对话

![llm_ragflow_chat](/img/provider/ragflow/llm_ragflow_chat.png)

## 参考链接

- [RagFlow HTTP API 参考](https://ragflow.io/docs/dev/http_api_reference)
