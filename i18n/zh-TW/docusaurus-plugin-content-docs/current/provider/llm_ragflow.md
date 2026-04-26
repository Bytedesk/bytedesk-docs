---
sidebar_label: LLM RagFlow
sidebar_position: 39
---

# LLM RagFlow

本頁說明如何將微語對接 RagFlow，並以 Chat 或 Agent 模式作為外部知識型應用接入。

:::tip 提示

社群版不支援此能力。請先升級到企業版或平台版。
:::

## 步驟一：在微語中建立 RagFlow 提供商

![llm_ragflow_create](/img/provider/ragflow/llm_ragflow_create.png)

請選擇正確類型：chat 或 agent。

![llm_ragflow_type](/img/provider/ragflow/llm_ragflow_type.png)

## 步驟二：從 RagFlow 取得 baseUrl 與 API Key

![llm_ragflow_home](/img/provider/ragflow/llm_ragflow_home.png)

API Server 對應 baseUrl，API KEY 對應 apiKey。

![llm_ragflow_apikey](/img/provider/ragflow/llm_ragflow_apikey.png)

## 步驟三：對接 Chat 模式

在 RagFlow 建立聊天應用：

![llm_ragflow_chatid_create](/img/provider/ragflow/llm_ragflow_chatid_create.png)

取得 Chat ID：

![llm_ragflow_chatid_get](/img/provider/ragflow/llm_ragflow_chatid_get.png)

複製 Chat ID，填入微語中的 RagFlow ID 欄位。

![llm_ragflow_chatid_copy](/img/provider/ragflow/llm_ragflow_chatid_copy.png)

設定 RagFlow 模型：

![llm_ragflow_model](/img/provider/ragflow/llm_ragflow_model.png)

## 步驟四：或對接 Agent 模式

在 RagFlow 建立 Agent：

![llm_ragflow_agentid_create](/img/provider/ragflow/llm_ragflow_agentid_create.png)

取得 Agent ID：

![llm_ragflow_agentid_get](/img/provider/ragflow/llm_ragflow_agentid_get.png)

複製 Agent ID，填入微語中的 RagFlow ID 欄位。

![llm_ragflow_agentid_copy](/img/provider/ragflow/llm_ragflow_agentid_copy.png)

## 步驟五：在微語填入 Base URL、API Key 與 RagFlow ID

![llm_ragflow_fill_id](/img/provider/ragflow/llm_ragflow_fill_id.png)

## 步驟六：配置機器人模型

![llm_ragflow_provider](/img/provider/ragflow/llm_ragflow_provider.png)
![llm_ragflow_provider_choose](/img/provider/ragflow/llm_ragflow_provider_choose.png)
![llm_ragflow_provider_save](/img/provider/ragflow/llm_ragflow_provider_save.png)

## 步驟七：測試對話

取得對話連結：

![llm_ragflow_provider_link](/img/provider/ragflow/llm_ragflow_provider_link.png)

開始對話：

![llm_ragflow_chat](/img/provider/ragflow/llm_ragflow_chat.png)

## 相關資源

- [RagFlow HTTP API Reference](https://ragflow.io/docs/dev/http_api_reference)
