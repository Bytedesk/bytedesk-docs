---
sidebar_label: Whatsapp
sidebar_position: 14
---

# Whatsapp

import ZoomableImage from '@site/src/components/ZoomableImage';
import '@site/src/css/watermark.css';

:::tip 前置条件

- 此模块为付费模块，如需要，请[扫码联系微信](/img/wechat.png)

:::

## 功能简介

WhatsApp是全球最受欢迎的即时通讯应用之一，拥有数十亿用户。通过集成WhatsApp渠道，企业可以直接在微语平台上接收和回复来自WhatsApp的客户消息，提供便捷的客服体验。本指南将带您完成通过YCloud平台接入WhatsApp的完整流程，让您的企业能够利用WhatsApp的庞大用户基础，提供高效的客户服务。

## 通过 YCloud 接入 Whatsapp

### [登录 YCloud](https://www.ycloud.com/console/#/entry/login)

- [注册](https://www.ycloud.com/?utm_invite_code=fangchen)

import whatsappYcloudLogin from '/img/channel/whatsapp/whatsapp_ycloud_login.png';

{/* YCloud登录页面 */}
<ZoomableImage src={whatsappYcloudLogin} alt="YCloud登录页面" />

### [创建 API Key](https://www.ycloud.com/console/#/app/developers/apikey)

import whatsappYcloudKeyCreate from '/img/channel/whatsapp/whatsapp_ycloud_key_create.png';

{/* 创建API Key */}
<ZoomableImage src={whatsappYcloudKeyCreate} alt="创建API Key" />

### Ycloud里面注册WhatsApp API号码

- [绑定WhatsApp账号](https://www.ycloud.com/console/#/app/whatsApp/getStarted)

- [绑定视频教程](https://www.bilibili.com/video/BV1Aa4y1g7di/)

### 将API Key填入微语后台

填入相应从名称、描述，以及key等信息，保存即可。

import whatsappYcloudKeyFill from '/img/channel/whatsapp/whatsapp_ycloud_key_fill.png';

{/* 填入API Key到微语后台 */}
<ZoomableImage src={whatsappYcloudKeyFill} alt="填入API Key到微语后台" />

### 从微语后台获取 Webhook URL

![whatsapp_ycloud_webhook](/img/channel/whatsapp/whatsapp_ycloud_webhook.png)

### 在 YCloud 里面填写 Webhook URL

#### 打开[YCloud Webhook](https://www.ycloud.com/console/#/app/developers/webhook)，点击：添加端点，将微语后台的Webhook URL填入

![whatsapp_ycloud_webhook_1](/img/channel/whatsapp/whatsapp_ycloud_webhook_1.png)

#### 勾选WhatsApp相关事件，点击确认

![whatsapp_ycloud_webhook_2](/img/channel/whatsapp/whatsapp_ycloud_webhook_2.png)

#### 激活 Webhook

![whatsapp_ycloud_webhook_3](/img/channel/whatsapp/whatsapp_ycloud_webhook_3.png)

### 对话测试

首先在 WhatsApp 添加 在YCloud 中绑定的 WhatsApp账号为联系人

- [查看YCloud WhatsApp账号](https://www.ycloud.com/console/#/app/whatsApp/account)

#### WhatsApp 发送消息

import whatsapp_ycloud_send from '/img/channel/whatsapp/whatsapp_ycloud_send.png';

<img src={whatsapp_ycloud_send} alt="搜索BotFather" style={{width: 360}} />

#### 微语客服端回复

![whatsapp_ycloud_reply](/img/channel/whatsapp/whatsapp_ycloud_reply.png)

#### 支持接收图片

![whatsapp_ycloud_receive_image](/img/channel/whatsapp/whatsapp_ycloud_receive_image.png)

#### 支持接收文件

![whatsapp_ycloud_receive_file](/img/channel/whatsapp/whatsapp_ycloud_receive_file.png)

#### 支持接收语音

![whatsapp_ycloud_receive_audio](/img/channel/whatsapp/whatsapp_ycloud_receive_audio.png)

#### 支持位置信息

![whatsapp_ycloud_receive_location](/img/channel/whatsapp/whatsapp_ycloud_receive_location.png)

## 参考链接

- [WhatsApp 开放平台](https://developers.facebook.com/docs/whatsapp/)
- [Whatsapp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Business Management API](https://developers.facebook.com/docs/whatsapp/business-management-api)
- [Marketing Messages Lite API](https://developers.facebook.com/docs/whatsapp/marketing-messages-lite-api/)
- [Meta Webhooks](https://developers.facebook.com/docs/graph-api/webhooks)
- [WhatsApp Business Manager](https://business.facebook.com/)
- [YCloud 帮助中心](https://helpdocs.ycloud.com/help-center/zh)
- [YCloud API 文档](https://docs.ycloud.com/reference/introduction)
- [YCloud WhatsApp Messages](https://helpdocs.ycloud.com/help-center/whatsapp-basics/messages)
- [WhatsApp Messages](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages)
- [阿里云ChatApp](https://chatapp.console.aliyun.com/Overview)
- [阿里无影云手机](https://help.aliyun.com/zh/ecp/what-is-cloud-phone?spm=a2c4g.11186623.help-menu-254658.d_0_0.1e116b54QHIMjO)
- [WhatsApp 云设备](https://faq.whatsapp.com/378279804439436/?helpref=hc_fnav&cms_platform=android&locale=zh_CN)
