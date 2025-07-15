---
sidebar_label: Line
sidebar_position: 15
---

# Line

:::tip 前置条件

- 此模块为付费模块，如需要，请[扫码联系微信](/img/wechat.png)
- 服务器需要能够访问 Line API 服务器，即需要能够访问 `api.line.me`

:::

## 功能简介

集成LINE渠道，可以将LINE的聊天记录同步到微语平台，让企业能够通过微语后台实时查看并回复用户的询问，管理LINE官方帐号，并利用LINE的社交性和实时性与用户进行即时沟通，提供统一的多渠道客服。

与普通 LINE 帐号的不同之处就是 LINE 官方帐号让用户更快捷地、大量地传送讯息，特别是企业用户，他们可以与私人帐号分开，保障隐私之余，还将生活工作分开。此外， LINE 官方帐号也支持跨平台、多人同步使用等。你可以使用 Messaging API 连结你的 LINE 官方帐号，强化你的客户服务。

## 操作流程

### 注册账号并登录

- 访问[LINE 官方帐号](https://manager.LINE.biz/)

import LineBusinessIdCreate from '/img/channel/line/line_business_id_create.png';

<img src={LineBusinessIdCreate} width="360"/>

### 创建 LINE 官方账号

import line_business_dashboard_new from '/img/channel/line/line_business_dashboard_new.png';

<img src={line_business_dashboard_new} />

- [访问LINE 官方帐号管理页](https://manager.line.biz/account/)

import LineBusinessDashboard from '/img/channel/line/line_business_dashboard.png';

<img src={LineBusinessDashboard} />

### 点击账号，进入 LINE 官方帐号管理详情页

import LineBusinessDashboardDetail from '/img/channel/line/line_business_dashboard_detail.png';

<img src={LineBusinessDashboardDetail} />

### 设置 Messaging API

import LineSettings from '/img/channel/line/line_settings.png';

<img src={LineSettings} />

### 点击Messaging API，再点击Enable Messaging API

import LineSettingsMessageApi1 from '/img/channel/line/line_settings_message_api_1.png';

<img src={LineSettingsMessageApi1} />

### 建立服务提供商

建立服务提供商，任意输入名称或 LINE 官方帐号名称即可 （不影响后续操作），并点击同意

import LineSettingsMessageApi2 from '/img/channel/line/line_settings_message_api_2.png';

<img src={LineSettingsMessageApi2} width="360"/>

### 隐私权政策及服务条款并确认启用

- 隐私权政策及服务条款网址可留白，直接点击 确定。
- 若有需求，可填入隐私权政策及服务条款网址。
- 确认账户名和服务提供商名称，并点击 确定 。

import LineSettingsMessageApi3 from '/img/channel/line/line_settings_message_api_3.png';

<img src={LineSettingsMessageApi3} />

## 集成到微语系统

### 点击复制 Channel Id 和 Channel Secret 填写到微语后台

import LineSettingsMessageApi4 from '/img/channel/line/line_settings_message_api_4.png';

<img src={LineSettingsMessageApi4} />

### 微语后台创建 LINE 渠道官方账号

import LineWeiyuCreate from '/img/channel/line/line_weiyu_create.png';

<img src={LineWeiyuCreate} />

### 微语后台获取 Webhook URL

import LineWeiyuWebhook from '/img/channel/line/line_weiyu_webhook.png';

<img src={LineWeiyuWebhook} />

### 回到 LINE 官方帐号管理页，并填入 Webhook URL

打开[LINE Developers Console](https://developers.LINE.biz/console/)

import lineSettingUseWebhook1 from '/img/channel/line/line_setting_use_webhook_1.png';

<img src={lineSettingUseWebhook1} />

开启Webhook

import lineSettingUseWebhook2 from '/img/channel/line/line_setting_use_webhook_2.png';

<img src={lineSettingUseWebhook2} />

往下滚动页面，可以开启群聊

import lineGroupChat from '/img/channel/line/line_group_chat.png';

<img src={lineGroupChat} />

import lineSettingUseWebhook3 from '/img/channel/line/line_setting_use_webhook_3.png';

<img src={lineSettingUseWebhook3} />

import lineSettingUseWebhook4 from '/img/channel/line/line_setting_use_webhook_4.png';

<img src={lineSettingUseWebhook4} />

## kid 说明

首先在微语后台，点击生成密钥对

<img />

然后复制生成的公钥(public key) 到 [Line Developers Console](https://developers.line.biz/console)

<img />

找到 Register A Public Key, 并粘贴公钥(public key)，点击Register 按钮。[参考链接](https://developers.line.biz/en/docs/messaging-api/generate-json-web-token/#register-public-key-and-get-kid)

<img />

复制生成后的kid

<img />

到微语后台，点击编辑kid

<img />

填入kid，点击保存。

<img />

## 费用

访问[查看费用](https://manager.line.biz/account)

import lineDashboardFee1 from '/img/channel/line/line_dashboard_fee_1.png';

<img src={lineDashboardFee1} />

访问[LINE Web Store](https://manager.LINE.biz/webstore/)

import lineDashboardFee2 from '/img/channel/line/line_dashboard_fee_2.png';

<img src={lineDashboardFee2} />

## 参考链接

- [Line 官方配置 Message API教程](https://developers.line.biz/en/docs/messaging-api/getting-started/)
- [LINE 官方帐号](https://manager.LINE.biz/)
- [Line Developers Console](https://developers.line.biz/console/)
- [Line Messaging API](https://developers.line.biz/en/docs/messaging-api/overview/)
- [Line Java SDK](https://github.com/line/line-bot-sdk-java)
- [Line API Use Case](https://developers.line.biz/en/docs/messaging-api/overview/#line-api-use-case)
- [Line Channel Access Token](https://developers.line.biz/en/docs/basics/channel-access-token/)
