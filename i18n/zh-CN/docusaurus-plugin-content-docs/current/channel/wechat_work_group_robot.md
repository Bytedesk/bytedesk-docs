---
sidebar_label: 企业微信群聊机器人
sidebar_position: 12
---

# 企业微信群聊机器人

:::info
外部群聊暂不支持添加群机器人，仅支持内部群聊机器人。
:::

:::tip 前置条件

- 仅企业版和平台版支持此功能，如需要，请[扫码联系微信](/img/wechat.png)
- 需要试用版License？请参考：[问题13：如何申请licenseKey](/docs/faq#问题13如何申请licensekey)
:::

## 内部群聊Webhook机器人

### 1.如何设置群机器人

[设置群机器人](https://open.work.weixin.qq.com/help2/pc/14931)

### 2.获取群机器人Webhook

![wechat_work_webhook](/img/develop/admin/wechat_work_webhook.png)

### 3.在微语后台配置

将Webhook URL填写到微语后台的Webhook配置中。

![webhook](/img/develop/admin/webhook.png)

### 4.推送效果

![wechat_work_webhook_leavemsg](/img/develop/admin/wechat_work_webhook_leavemsg.png)

## 外部群客服助理

### 1.开启群客服助理

import wechat_work_group_assistant from '/img/develop/admin/wechat_work_group_assistant.png';

<img src={wechat_work_group_assistant} alt="开启群客服助理" width="360" />

### 2.@客服助理

发送消息时，@客服助理。点击客服助理名片，开始对话

import wechat_work_group_chat from '/img/develop/admin/wechat_work_group_chat.png';

<img src={wechat_work_group_chat} alt="客服助理" width="360" />

### 3.对话效果

import wechat_work_group_kf from '/img/develop/admin/wechat_work_group_kf.png';

<img src={wechat_work_group_kf} alt="对话效果" width="360" />

## 参考链接

- [服务端Api-群机器人配置说明](https://developer.work.weixin.qq.com/document/path/99110)
- [客户端Api-群机器人配置说明](https://developer.work.weixin.qq.com/document/path/91770)
