---
sidebar_label: Facebook
sidebar_position: 15
---

# Facebook Messenger

:::tip 前置条件

- 社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
- 服务器需要能够访问Facebook的API接口网站 `graph.facebook.com`，请使用海外服务器或代理，否则无法正常使用。
:::

## 功能简介

Facebook是全球最大的社交网络平台，拥有数十亿用户。通过集成Facebook Messenger渠道，企业可以直接在微语平台上管理来自Facebook公共主页的消息和对话，提供即时的客户服务。本指南将详细介绍如何创建Facebook公共主页、注册开发者账号、创建应用程序，并将其与微语系统集成，帮助您建立完整的Facebook客服体系。

## Facebook 公共主页创建

### 登录 Facebook 账号，左侧菜单-》公共主页

- [登录Facebook](https://www.facebook.com/)

import metaCreatePublicPage1 from '/img/channel/meta/meta_create_public_page_1.png';

{/* Facebook左侧菜单公共主页 */}
<img src={metaCreatePublicPage1} />

### 新建公共主页

- [新建公共主页](https://www.facebook.com/pages/?category=your_pages&ref=bookmarks)

import metaCreatePublicPage2 from '/img/channel/meta/meta_create_public_page_2.png';

{/* 新建公共主页 */}
<img src={metaCreatePublicPage2} />

## Facebook 开发者注册

- [注册开发者](https://developers.facebook.com/docs/development/register)

import metaRegisterDev1 from '/img/channel/meta/meta_register_dev_1.png';
import metaRegisterDev2 from '/img/channel/meta/meta_register_dev_2.png';
import metaRegisterDev3 from '/img/channel/meta/meta_register_dev_3.png';
import metaRegisterDev4 from '/img/channel/meta/meta_register_dev_4.png';
import metaRegisterDev5 from '/img/channel/meta/meta_register_dev_5.png';

<img src={metaRegisterDev1} />
<img src={metaRegisterDev2} />
<img src={metaRegisterDev3} />
<img src={metaRegisterDev4} />
<img src={metaRegisterDev5} />

## Facebook 应用创建

- [创建应用页面](https://developers.facebook.com/apps/creation/)
- [创建应用说明](https://developers.facebook.com/docs/development/create-an-app)

import metaCreateApp1 from '/img/channel/meta/meta_create_app_1.png';
import metaCreateApp2 from '/img/channel/meta/meta_create_app_2.png';
import metaCreateApp3 from '/img/channel/meta/meta_create_app_3.png';
import metaCreateApp4 from '/img/channel/meta/meta_create_app_4.png';
import metaCreateApp5 from '/img/channel/meta/meta_create_app_5.png';
import metaMessengerBind from '/img/channel/meta/meta_messenger_bind.png';
import metaMessengerWebhook from '/img/channel/meta/meta_messenger_webhook.png';
import metaMessengerWebhookBind from '/img/channel/meta/meta_messenger_webhook_bind.png';
import metaWebhookBind from '/img/channel/meta/meta_webhook_bind.png';
import metaAppIdSecret from '/img/channel/meta/meta_app_appid_appsecret.png';
import metaPageAccessToken from '/img/channel/meta/meta_app_generate_page_access_token.png';
import metaPageId from '/img/channel/meta/meta_app_get_page_id.png';

<img src={metaCreateApp1} />
<img src={metaCreateApp2} />
<img src={metaCreateApp3} />
<img src={metaCreateApp4} />

### [Facebook 应用后台](https://developers.facebook.com/apps/)

点击创建 Messenger 应用

<img src={metaCreateApp5} />

## 微语后台绑定

### 绑定 Meta 应用

<img src={metaMessengerBind} />

### 获取 Webhook URL回调地址 和 验证口令

<img src={metaMessengerWebhook} />

### 绑定 Facebook Messenger Webhook URL回调地址 和 验证口令

注意是：Messenger Webhook URL回调地址 和 验证口令，不是 Webhook URL回调地址 和 验证口令。

<img src={metaMessengerWebhookBind} />

### 添加公共主页

![添加公共主页](/img/channel/meta/meta_messenger_add_page.png)

### 添加订阅

![添加订阅](/img/channel/meta/meta_messenger_add_subscribe.png)

### 订阅结果

![订阅结果](/img/channel/meta/meta_messenger_subscribe_list.png)

### 获取 App ID 和 App Secret

- [Facebook 应用](https://developers.facebook.com/apps/)，选择对应的应用-》应用设置-》基本

<img src={metaAppIdSecret} />

### 获取 Page Access Token

- [Facebook 应用](https://developers.facebook.com/apps/)，选择对应的应用-》Messenger-》Messenger API 设置-》绑定页面-》生成访问令牌

<img src={metaPageAccessToken} />

### 获取 Page ID

- [访客口令信息](https://developers.facebook.com/tools/debug/accesstoken/?access_token=EAAV8HSdkm0cBO2AC47g86fWjhTQyYq1kZBDlNnmsR0bvCa0ywWV6MDtVEwdQGZBxax0tYiKbb2Ue2jHqziJI6lhOdbbIJvuF9YZAhZAtUfDZAoUsD6XxbeC44dgA38EI2OAyl3lujMjE0Ir938dSoWa7Jb9P2BxHTT3wwTVjPleyYBrZBMqogOxDUoqqjYJlJGcdWgaDS2jJubdCywMZBgZD&version=v23.0)

<img src={metaPageId} />

### 微语后台编辑-》填写Page Access Token 和 Page ID，并保存后

![编辑](/img/channel/meta/meta_weiyu_messenger_edit.png)

![填写](/img/channel/meta/meta_weiyu_messenger_page_access_token.png)

<!-- ### 绑定 Facebook Webhook URL回调地址 和 验证口令
注意是：Webhook URL回调地址 和 验证口令，不是Messenger Webhook URL回调地址 和 验证口令。
<img src={metaWebhookBind} /> -->

### 开始对话

#### 打开自己的Facebook公共主页，开始对话

可以输入: /help 查看帮助信息

![对话](/img/channel/messenger/messenger_chat.png)

<!-- #### 可以输入: /help 查看帮助信息 -->
<!-- ![对话](/img/channel/messenger/messenger_chat_help.png) -->

### Facebook 主页发送消息

发送文字 和 图片消息

![messenger_chat_image_page](/img/channel/messenger/messenger_chat_image_page.png)

### 微语客服端查看对话

在微语客服端查看

![messenger_chat_image](/img/channel/messenger/messenger_chat_image.png)

### 本地开发测试步骤

1. ngrok http 9003，生成url
2. 在微语管理后台-》客服-》渠道-》Meta-》添加Messenger应用
3. 获取到第2步生成的webhook url，使用上面第1步生成的url替换掉前面域名
   - 如：`https://e1a4-111-48-134-179.ngrok-free.app/meta/webhooks/1666799623995648`
4. 填写到Meta平台的webhook url中，验证口令使用在第3步中生成的验证token

## 参考链接

- [Facebook 开发者](https://developers.facebook.com/)
- [Facebook 应用](https://developers.facebook.com/apps/)
- [Facebook 登录](https://developers.facebook.com/docs/facebook-login)
- [Meta Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/)
- [Messenger Webhooks](https://developers.facebook.com/docs/messenger-platform/webhooks)
- [Meta Webhooks](https://developers.facebook.com/docs/graph-api/webhooks)
- [绑定Whatsapp和Instagram](https://www.facebook.com/settings/?tab=linked_profiles)
- [Messenger 开放平台](https://developers.facebook.com/docs/messenger-platform/)
- [微语AI-Facebook 公共主页](https://www.facebook.com/profile.php?id=61577041798201)
- [图谱 API](https://developers.facebook.com/docs/graph-api)
- [图谱 API 探索工具](https://developers.facebook.com/tools/explorer)
- [graph-api-webhooks-samples](https://github.com/fbsamples/graph-api-webhooks-samples)
- [Meta Business SDK](https://developers.facebook.com/docs/business-sdk/getting-started)
- [Messenger Conversation Routing](https://www.facebook.com/settings?tab=msgr_conversation_routing)
- [市场营销 API](https://developers.facebook.com/docs/marketing-apis)
- [在 Meta Business Suite 中向业务资产组合添加公共主页](https://www.facebook.com/business/help/720478807965744?id=420299598837059&helpref=faq_content)
- [Messenger 体验示例：Original Coast Clothing](https://developers.facebook.com/docs/messenger-platform/getting-started/sample-experience/)
- [阿里云ChatApp](https://chatapp.console.aliyun.com/Overview)
