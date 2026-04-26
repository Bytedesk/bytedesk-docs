---
sidebar_label: LLM Coze
sidebar_position: 39
---

# LLM Coze

This page explains how to connect Bytedesk to Coze bots and use Coze as an external LLM application provider.

:::tip Note

This capability is not available in the community edition. Upgrade to Enterprise or Platform edition and replace the license key first.
:::

## Step 1. Create a Coze Provider in Bytedesk Admin

![llm_coze_create](/img/provider/coze/llm_coze_create.png)

## Step 2. Get the botId and API Key from Coze

Open the Coze console: [https://www.coze.cn/home](https://www.coze.cn/home)

![llm_coze_home](/img/provider/coze/llm_coze_home.png)

Get the bot ID:

![llm_coze_bot_id](/img/provider/coze/llm_coze_bot_id.png)

Open the personal access token page and create an API key:

[https://www.coze.cn/open/oauth/pats](https://www.coze.cn/open/oauth/pats)

![llm_coze_apikey](/img/provider/coze/llm_coze_apikey.png)

## Step 3. Fill botId and API Key into Bytedesk

![llm_coze_change](/img/provider/coze/llm_coze_change.png)

## Step 4. Configure a Robot to Use Coze

Create a robot and choose Coze in Robot -> LLM settings.

![llm_coze_create_bot](/img/provider/coze/llm_coze_create_bot.png)
![llm_coze_change_provider](/img/provider/coze/llm_coze_change_provider.png)
![llm_coze_save_provider](/img/provider/coze/llm_coze_save_provider.png)

## Step 5. Test the Conversation

Get the conversation link:

![llm_coze_get_link](/img/provider/coze/llm_coze_get_link.png)

Start a conversation:

![llm_coze_chat](/img/provider/coze/llm_coze_chat.png)

## Related Resources

- [Coze Home](https://www.coze.cn/home)
- [Coze Chat API](https://www.coze.cn/open/docs/developer_guides/chat_v3)
- [Coze Personal Access Tokens](https://www.coze.cn/open/oauth/pats)
