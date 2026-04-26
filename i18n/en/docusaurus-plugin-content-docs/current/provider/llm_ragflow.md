---
sidebar_label: LLM RagFlow
sidebar_position: 39
---

# LLM RagFlow

This page explains how to connect Bytedesk to RagFlow and use either Chat or Agent mode as an external knowledge-driven application.

:::tip Note

This capability is not available in the community edition. Upgrade to Enterprise or Platform edition first.
:::

## Step 1. Create a RagFlow Provider in Bytedesk

![llm_ragflow_create](/img/provider/ragflow/llm_ragflow_create.png)

Choose the correct type: chat or agent.

![llm_ragflow_type](/img/provider/ragflow/llm_ragflow_type.png)

## Step 2. Get baseUrl and API Key from RagFlow

![llm_ragflow_home](/img/provider/ragflow/llm_ragflow_home.png)

The API server is the baseUrl, and API KEY is the apiKey.

![llm_ragflow_apikey](/img/provider/ragflow/llm_ragflow_apikey.png)

## Step 3. Connect Chat Mode

Create a chat application in RagFlow:

![llm_ragflow_chatid_create](/img/provider/ragflow/llm_ragflow_chatid_create.png)

Get the Chat ID:

![llm_ragflow_chatid_get](/img/provider/ragflow/llm_ragflow_chatid_get.png)

Copy the Chat ID and paste it into the RagFlow ID field in Bytedesk.

![llm_ragflow_chatid_copy](/img/provider/ragflow/llm_ragflow_chatid_copy.png)

Set the RagFlow model:

![llm_ragflow_model](/img/provider/ragflow/llm_ragflow_model.png)

## Step 4. Or Connect Agent Mode

Create an agent in RagFlow:

![llm_ragflow_agentid_create](/img/provider/ragflow/llm_ragflow_agentid_create.png)

Get the Agent ID:

![llm_ragflow_agentid_get](/img/provider/ragflow/llm_ragflow_agentid_get.png)

Copy the Agent ID and paste it into the RagFlow ID field in Bytedesk.

![llm_ragflow_agentid_copy](/img/provider/ragflow/llm_ragflow_agentid_copy.png)

## Step 5. Fill Base URL, API Key, and RagFlow ID in Bytedesk

![llm_ragflow_fill_id](/img/provider/ragflow/llm_ragflow_fill_id.png)

## Step 6. Configure the Robot Model

![llm_ragflow_provider](/img/provider/ragflow/llm_ragflow_provider.png)
![llm_ragflow_provider_choose](/img/provider/ragflow/llm_ragflow_provider_choose.png)
![llm_ragflow_provider_save](/img/provider/ragflow/llm_ragflow_provider_save.png)

## Step 7. Test the Conversation

Get the conversation link:

![llm_ragflow_provider_link](/img/provider/ragflow/llm_ragflow_provider_link.png)

Start the conversation:

![llm_ragflow_chat](/img/provider/ragflow/llm_ragflow_chat.png)

## Related Resources

- [RagFlow HTTP API Reference](https://ragflow.io/docs/dev/http_api_reference)
