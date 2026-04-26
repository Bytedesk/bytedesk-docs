---
sidebar_label: LLM Coze
sidebar_position: 39
---

# LLM Coze

本頁說明如何將微語對接 Coze Bot，並把 Coze 作為外部 LLM 應用提供商。

:::tip 提示

社群版不支援此能力。請先升級到企業版或平台版，並替換授權金鑰。
:::

## 步驟一：在微語後台建立 Coze 提供商

![llm_coze_create](/img/provider/coze/llm_coze_create.png)

## 步驟二：從 Coze 取得 botId 與 API Key

開啟 Coze 控制台：[https://www.coze.cn/home](https://www.coze.cn/home)

![llm_coze_home](/img/provider/coze/llm_coze_home.png)

取得 bot ID：

![llm_coze_bot_id](/img/provider/coze/llm_coze_bot_id.png)

開啟個人存取權杖頁面並建立 API Key：

[https://www.coze.cn/open/oauth/pats](https://www.coze.cn/open/oauth/pats)

![llm_coze_apikey](/img/provider/coze/llm_coze_apikey.png)

## 步驟三：把 botId 與 API Key 填回微語

![llm_coze_change](/img/provider/coze/llm_coze_change.png)

## 步驟四：為機器人配置 Coze

建立機器人，並在 Robot -> LLM 設定中選擇 Coze。

![llm_coze_create_bot](/img/provider/coze/llm_coze_create_bot.png)
![llm_coze_change_provider](/img/provider/coze/llm_coze_change_provider.png)
![llm_coze_save_provider](/img/provider/coze/llm_coze_save_provider.png)

## 步驟五：測試對話

取得對話連結：

![llm_coze_get_link](/img/provider/coze/llm_coze_get_link.png)

開始對話：

![llm_coze_chat](/img/provider/coze/llm_coze_chat.png)

## 相關資源

- [Coze Home](https://www.coze.cn/home)
- [Coze Chat API](https://www.coze.cn/open/docs/developer_guides/chat_v3)
- [Coze Personal Access Tokens](https://www.coze.cn/open/oauth/pats)
