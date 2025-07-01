---
title: Flutter 集成指南
sidebar_label: Flutter
sidebar_position: 9
description: 在 Flutter 应用中集成微语客服系统
---

import ZoomableImage from '@site/src/components/ZoomableImage';
import '@site/src/css/watermark.css';

## 功能简介

Flutter是Google开发的跨平台UI框架，一套代码可以同时构建Android、iOS、Web、Desktop等多端应用。通过集成微语Flutter SDK，您的应用可以在所有平台上提供统一的客服体验。SDK源码100%开源，支持丰富的功能，包括机器人对话、人工客服、电商商品信息发送等，让您轻松构建专业的移动客服系统。

## 部分功能

- SDK源码100%开源
- 支持安卓、iOS、Web、Mac、Windows
- 机器人对话
- 技能组客服
- 一对一客服
- 支持发送电商商品信息(支持点击商品回调)
- 支持发送附言消息
- 对接APP用户信息(昵称/头像)
- 获取当前客服在线状态
- 获取历史会话
- 消息提示音/振动设置
- 消息送达/已读
- 消息撤回
- 输入状态(对方正在输入)
- 发送/播放视频
- 查询未读消息数
- 支持绑定第三方账号及多账号切换
<!-- - 提交工单 -->
<!-- - 意见反馈 -->

## Demo 下载

- [Gitee Demo](https://gitee.com/270580156/bytedesk-flutter)
- [Github Demo](https://github.com/Bytedesk/bytedesk-flutter)

## 集成步骤

### 第一步

- 微语 pubspec.yaml添加：bytedesk_kefu: ^2.0.0
<!-- - 最新版本：[![Pub](https://img.shields.io/pub/v/bytedesk_kefu.svg)](https://pub.dev/packages/bytedesk_kefu) -->
<!-- - [![pub package](https://img.shields.io/pub/v/bytedesk_kefu.svg)](https://pub.dev/packages/bytedesk_kefu) -->
<!-- [![pub points](https://badges.bar/bytedesk_kefu/pub%20points)](https://pub.dev/packages/bytedesk_kefu/score) | [![popularity](https://badges.bar/bytedesk_kefu/popularity)](https://pub.dev/packages/bytedesk_kefu/score) | [![likes](https://badges.bar/bytedesk_kefu/likes)](https://pub.dev/packages/bytedesk_kefu/score) -->
- [注册账号](https://www.weiyuai.cn/admin/)

- 复制SDK中assets文件夹到自己项目中，并配置pubspec.yaml文件

```dart
# 添加下面3条
assets:
    - assets/audio/
    - assets/images/chat/
    - assets/images/feedback/
```

### 第二步：初始化

```dart
// 获取企业uid，登录后台->客服->渠道->flutter
// http://www.weiyuai.cn/admin/cs/channel
String orgUid = "df_org_uid";
// 第一步：初始化
BytedeskKefu.init(orgUid);
```

### 第三步：联系客服

- 获取技能组workGroupWid：登录后台->客服管理->技能组->唯一wid
- BytedeskKefu.startWorkGroupChat(context, workGroupWid, "技能组客服wid");
