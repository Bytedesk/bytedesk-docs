---
sidebar_label: Line
sidebar_position: 15
---

# Line

:::tip 前置条件

- 此模块为付费模块，如需要，请[扫码联系微信](/img/wechat.png)

:::

## 功能简介

集成LINE渠道，可以将LINE的聊天记录同步到微语平台，让企业能够通过微语后台实时查看并回复用户的询问，管理LINE官方帐号，并利用LINE的社交性和实时性与用户进行即时沟通，提供统一的多渠道客服。

与普通 LINE 帐号的不同之处就是 LINE 官方帐号让用户更快捷地、大量地传送讯息，特别是企业用户，他们可以与私人帐号分开，保障隐私之余，还将生活工作分开。此外， LINE 官方帐号也支持跨平台、多人同步使用等。你可以使用 Messaging API 连结你的 LINE 官方帐号，强化你的客户服务。

## 操作流程

### 注册账号并登录

- 访问[LINE 官方帐号](https://manager.LINE.biz/)

import LineBusinessIdCreate from '/img/channel/line/line_business_id_create.png';

<img src={LineBusinessIdCreate} alt="LINE业务ID创建" style={{width: 360}} />

### 创建 LINE 官方账号

![line_business_dashboard](/img/channel/line/line_business_dashboard.png)

### 进入 LINE 官方帐号管理页

![line_business_dashboard_detail](/img/channel/line/line_business_dashboard_detail.png)

### 设置 Messaging API

![line_settings](/img/channel/line/line_settings.png)

### 点击Messaging API，再点击Enable Messaging API

![line_settings_message_api_1](/img/channel/line/line_settings_message_api_1.png)

### 建立服务提供商

建立服务提供商，任意输入名称或 LINE 官方帐号名称即可 （不影响后续操作），并点击同意

import LineSettingsMessageApi2 from '/img/channel/line/line_settings_message_api_2.png';

<img src={LineSettingsMessageApi2} alt="建立服务提供商" style={{width: 360}} />

### 隐私权政策及服务条款并确认启用

- 隐私权政策及服务条款网址可留白，直接点击 确定。
- 若有需求，可填入隐私权政策及服务条款网址。
- 确认账户名和服务提供商名称，并点击 确定 。

![line_settings_message_api_3](/img/channel/line/line_settings_message_api_3.png)

## 集成到微语系统

### 点击复制 Channel Id 和 Channel Secret 填写到微语后台

![line_settings_message_api_4](/img/channel/line/line_settings_message_api_4.png)

![line_weiyu_create](/img/channel/line/line_weiyu_create.png)

![line_weiyu_webhook](/img/channel/line/line_weiyu_webhook.png)

## 参考链接

- [LINE 官方帐号](https://manager.LINE.biz/)
- [Line Developers Console](https://developers.line.biz/console/)
- [Line Messaging API](https://developers.line.biz/en/docs/messaging-api/overview/)
- [Line Java SDK](https://github.com/line/line-bot-sdk-java)
- [Line API Use Case](https://developers.line.biz/en/docs/messaging-api/overview/#line-api-use-case)
