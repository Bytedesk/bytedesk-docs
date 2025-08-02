---
sidebar_label: 微信公众号
sidebar_position: 9
---

# 微信公众号

import wechatMpHelloworld from '/img/channel/wechat/wechat_mp_helloworld.jpg';
import wechatMpLink1 from '/img/channel/wechat/wechat_mp_link_1.png';
import wechatMpLink2 from '/img/channel/wechat/wechat_mp_link_2.png';
import wechatMpLink3 from '/img/channel/wechat/wechat_mp_link_3.png';

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

## 功能简介

微信公众号是企业与用户沟通的重要渠道，拥有庞大的用户群体。通过集成微语客服系统到微信公众号，企业可以直接在公众号内为用户提供实时客服支持，无需用户跳转到其他平台。支持两种接入方式：企业微信客服对接和自定义菜单，满足不同场景的需求。

> 以下方法无需认证公众号即可接入，无需额外开发。

## 方法一：企业微信客服对接

可在公众号快速接入，特点如下：

- ✅ 有新消息提醒，客户可及时查看
- ✅ 可邀请客户添加企业微信
- ✅ 工具拿起即用，有机器人、欢迎语等

### 接入流程

1. 按照 [公众号接入](./wechat_work#在公众号中接入) 流程完成配置
2. 对接完毕之后，输入任意文字，即可收到客服卡片
3. 点击卡片可直接发起会话

<img src={wechatMpHelloworld} width="360"/>

## 方法二：自定义菜单

### H5页面

- [获取H5链接](./web.md)

### 微信客服链接

**步骤1：** 在企业微信管理后台，找到"应用管理"->"应用"->"微信客服"->"客服账号"

<img src={wechatMpLink1} />

**步骤2：** 点击客服账号，进入客服账号详情页面，找到"客服链接"，点击"复制链接"

<img src={wechatMpLink2} />

### 将客服链接复制到微信公众号的自定义菜单中，保存即可

<img src={wechatMpLink3} />
