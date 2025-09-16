---
sidebar_label: 对接 Coze
sidebar_position: 39
---

# 对接 Coze

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

## 步骤一： 微语管理后台创建 Coze

![llm_coze_create](/img/provider/coze/llm_coze_create.png)

## 步骤二：Coze 后台获取 botId 和 apiKey

[Coze 首页](https://www.coze.cn/home)

![llm_coze_home](/img/provider/coze/llm_coze_home.png)

获取 botId

![llm_coze_bot_id](/img/provider/coze/llm_coze_bot_id.png)

[Coze 个人访问令牌](https://www.coze.cn/open/oauth/pats)，获取 apiKey

![llm_coze_apikey](/img/provider/coze/llm_coze_apikey.png)

## 步骤三：将获取到的 botId 和 apiKey 填写到微语管理后台的 Coze 配置中

![llm_coze_change](/img/provider/coze/llm_coze_change.png)

## 步骤四：创建机器人，并在 机器人-》大模型 中配置 Coze

![llm_coze_create_bot](/img/provider/coze/llm_coze_create_bot.png)

![llm_coze_change_provider](/img/provider/coze/llm_coze_change_provider.png)

![llm_coze_save_provider](/img/provider/coze/llm_coze_save_provider.png)

## 步骤五：测试对话

### 获取对话链接

![llm_coze_get_link](/img/provider/coze/llm_coze_get_link.png)

### 开始对话

![llm_coze_chat](/img/provider/coze/llm_coze_chat.png)

## 参考链接

- [Coze 首页](https://www.coze.cn/home)
- [Coze API 文档](https://www.coze.cn/open/docs/developer_guides/chat_v3)
- [Coze 个人访问令牌](https://www.coze.cn/open/oauth/pats)
