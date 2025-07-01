---
title: Uniapp 集成指南
sidebar_label: Uniapp
sidebar_position: 8
description: 在 Uniapp 应用中集成微语客服系统
---

import ZoomableImage from '@site/src/components/ZoomableImage';
import '@site/src/css/watermark.css';

## 功能简介

Uniapp是一个基于Vue.js的跨平台应用开发框架，可以一套代码发布到多个平台。通过集成微语客服系统，您的Uniapp应用可以同时在Web、H5、小程序、Android、iOS等全平台提供统一的客服体验。本SDK基于Vue.js开发，100%开源，支持自定义界面，让您轻松构建专业的客服功能。

## 部分功能

- 微语官方技术支持
- 全部基于 vuejs 开发，不依赖原生 SDK，100%全部开源，支持自定义界面SS
- 支持 web/h5/小程序/安卓/iOS 等全平台
- 支持人工客服
- 支持机器人
- 支持文字、图片、语音、表情
- 支持消息预知：对方正在输入
- 支持消息状态：送达、已读
- 支持消息撤回
- 对接第三方账号系统/多用户切换
- 支持 vue2/vue3
- 注意：运行项目 bytedesk_demo_vue3 之前，首先需要进入项目文件夹执行 yarn 或者 npm install 初始化
<!-- - 支持发送商品信息 -->
<!-- - 未读消息数查询接口 -->
<!-- - 支持视频客服 -->

## Demo 下载

- bytedesk_demo_vue2 和 bytedesk_demo_vue3 的分别是vue2和vue3的demo，请选择其中一个即可
- [Gitee Demo](https://gitee.com/270580156/bytedesk-uniapp)
- [Github Demo](https://github.com/Bytedesk/bytedesk-uniapp)

## 配置步骤说明（共两步）

- 首先：将 components/bytedesk_sdk 文件夹拷贝到自己应用 components 文件夹，
- 然后：在 pages.json 中添加以下几个页面，具体可参考 demo 中 pages.json 文件

```js
{
 "path": "components/bytedesk_sdk/chat-kf",
 "style": {
  "navigationBarTitleText": "微语智能客服",
  "navigationBarBackgroundColor":"#007AFF",
  "navigationBarTextStyle":"white"
 }
},
{
 "path": "components/bytedesk_sdk/rate",
 "style": {
  "navigationBarTitleText": "满意度评价",
  "navigationBarBackgroundColor":"#007AFF",
  "navigationBarTextStyle":"white"
 }
},
{
 "path": "components/bytedesk_sdk/webview",
 "style": {
  "navigationBarTitleText": "微语H5",
  "navigationBarBackgroundColor":"#007AFF",
  "navigationBarTextStyle":"white"
 }
},
{
 "path": "components/bytedesk_sdk/leavemsg",
 "style": {
  "navigationBarTitleText": "留言",
  "navigationBarBackgroundColor":"#007AFF",
  "navigationBarTextStyle":"white"
 }
}
```

## 开发步骤说明（共三步）

- 第一步：引入文件。在调用客服的 vue 页面，如：index.vue，引入

```js
import * as bytedesk from "@/components/bytedesk_sdk/js/bytedesk.js";
```

- 第二步：初始化。在 index.vue 页面 onLoad 函数

```js
// 第二步：初始化
// 获取企业uid，登录后台->客服->渠道->uniapp
// http://www.weiyuai.cn/admin/cs/channel
let orgUid = 'df_org_uid'
bytedesk.init(orgUid);
// 注：如果需要多平台统一用户（用于同步聊天记录等），可使用:
// bytedesk.initWithUidAndNicknameAndAvatar(orgUid, 'myuniappuid', '我是美女', 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/avatars/girl.png');
// bytedesk.initWithUid(orgUid, 'myuniappuid'); // 其中：uid为自定义uid，可与开发者所在用户系统对接，用于多用户切换
// 具体参数可以参考 @/components/bytedesk_sdk/js/bytedesk.js 文件中接口
```

- 第三步：开始会话

```js
// 第三步：获取技能组uid，登录后台->客服->渠道->uniapp
// http://www.weiyuai.cn/admin/cs/channel
startChat () {
  uni.navigateTo({
    url: '../../components/bytedesk_sdk/chat-kf?sid=' + this.workGroupWid + '&type=1'
  });
}
```

- 结束
- 具体请参考 demo 中 index.vue 页面
