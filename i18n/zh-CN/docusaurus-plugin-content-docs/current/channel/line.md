---
sidebar_label: Line
sidebar_position: 15
---

# Line

import ZoomableImage from '@site/src/components/ZoomableImage';
import '@site/src/css/watermark.css';

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

<ZoomableImage src={LineBusinessIdCreate} alt="LINE业务ID创建" width="360px" />

### 创建 LINE 官方账号

import line_business_dashboard_new from '/img/channel/line/line_business_dashboard_new.png';

<ZoomableImage src={line_business_dashboard_new} alt="LINE业务ID创建2"/>

- [访问LINE 官方帐号管理页](https://manager.line.biz/account/)

import LineBusinessDashboard from '/img/channel/line/line_business_dashboard.png';

<ZoomableImage src={LineBusinessDashboard} alt="LINE业务仪表板" />

### 点击账号，进入 LINE 官方帐号管理详情页

import LineBusinessDashboardDetail from '/img/channel/line/line_business_dashboard_detail.png';

<ZoomableImage src={LineBusinessDashboardDetail} alt="LINE业务仪表板详情" />

### 设置 Messaging API

import LineSettings from '/img/channel/line/line_settings.png';

<ZoomableImage src={LineSettings} alt="LINE设置" />

### 点击Messaging API，再点击Enable Messaging API

import LineSettingsMessageApi1 from '/img/channel/line/line_settings_message_api_1.png';

<ZoomableImage src={LineSettingsMessageApi1} alt="启用Messaging API" />

### 建立服务提供商

建立服务提供商，任意输入名称或 LINE 官方帐号名称即可 （不影响后续操作），并点击同意

import LineSettingsMessageApi2 from '/img/channel/line/line_settings_message_api_2.png';

<ZoomableImage src={LineSettingsMessageApi2} alt="建立服务提供商" width="360px" />

### 隐私权政策及服务条款并确认启用

- 隐私权政策及服务条款网址可留白，直接点击 确定。
- 若有需求，可填入隐私权政策及服务条款网址。
- 确认账户名和服务提供商名称，并点击 确定 。

import LineSettingsMessageApi3 from '/img/channel/line/line_settings_message_api_3.png';

<ZoomableImage src={LineSettingsMessageApi3} alt="隐私权政策及服务条款确认" />

## 集成到微语系统

### 点击复制 Channel Id 和 Channel Secret 填写到微语后台

import LineSettingsMessageApi4 from '/img/channel/line/line_settings_message_api_4.png';

<ZoomableImage src={LineSettingsMessageApi4} alt="复制Channel Id和Channel Secret" />

### 微语后台创建 LINE 渠道官方账号

import LineWeiyuCreate from '/img/channel/line/line_weiyu_create.png';

<ZoomableImage src={LineWeiyuCreate} alt="微语后台创建LINE渠道" />

### 微语后台获取 Webhook URL

import LineWeiyuWebhook from '/img/channel/line/line_weiyu_webhook.png';

<ZoomableImage src={LineWeiyuWebhook} alt="获取Webhook URL" />

### 回到 LINE 官方帐号管理页，并填入 Webhook URL

打开[LINE Developers Console](https://developers.LINE.biz/console/)

import lineSettingUseWebhook1 from '/img/channel/line/line_setting_use_webhook_1.png';

<ZoomableImage src={lineSettingUseWebhook1} alt="LINE设置Webhook 1" />

开启Webhook

import lineSettingUseWebhook2 from '/img/channel/line/line_setting_use_webhook_2.png';

<ZoomableImage src={lineSettingUseWebhook2} alt="开启Webhook" />

往下滚动页面，可以开启群聊

import lineGroupChat from '/img/channel/line/line_group_chat.png';

<ZoomableImage src={lineGroupChat} alt="LINE群聊设置" />

import lineSettingUseWebhook3 from '/img/channel/line/line_setting_use_webhook_3.png';

<ZoomableImage src={lineSettingUseWebhook3} alt="LINE设置Webhook 3" />

import lineSettingUseWebhook4 from '/img/channel/line/line_setting_use_webhook_4.png';

<ZoomableImage src={lineSettingUseWebhook4} alt="填入Webhook URL" />

## 费用

访问[查看费用](https://manager.line.biz/account)

import lineDashboardFee1 from '/img/channel/line/line_dashboard_fee_1.png';

<ZoomableImage src={lineDashboardFee1} alt="LINE费用查看" />

访问[LINE Web Store](https://manager.LINE.biz/webstore/)

import lineDashboardFee2 from '/img/channel/line/line_dashboard_fee_2.png';

<ZoomableImage src={lineDashboardFee2} alt="LINE Web Store" />

## 参考链接

- [LINE 官方帐号](https://manager.LINE.biz/)
- [Line Developers Console](https://developers.line.biz/console/)
- [Line Messaging API](https://developers.line.biz/en/docs/messaging-api/overview/)
- [Line Java SDK](https://github.com/line/line-bot-sdk-java)
- [Line API Use Case](https://developers.line.biz/en/docs/messaging-api/overview/#line-api-use-case)
