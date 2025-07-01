---
title: iOS 集成指南
sidebar_label: iOS
sidebar_position: 6
description: 在 iOS 应用中集成微语客服系统
---

import ZoomableImage from '@site/src/components/ZoomableImage';
import '@site/src/css/watermark.css';

## 功能简介

iOS是Apple公司开发的移动操作系统，拥有庞大的用户群体。通过集成微语iOS SDK，您的iPhone和iPad应用可以提供专业的客服功能。SDK基于Swift开发，100%开源，支持自定义界面，包含人工客服、机器人对话、消息状态管理等完整功能，让您的iOS应用拥有强大的客户服务能力。

## 部分功能

- 微语官方技术支持
- 全部基于Swift开发，100%全部开源，支持自定义界面
- 支持人工客服
- 支持机器人
- 支持文字、图片、语音、表情
- 支持消息预知：对方正在输入
- 支持消息状态：送达、已读
- 支持消息撤回
- 支持发送商品信息
- 未读消息数查询接口
- 对接第三方账号系统
- 支持多用户切换

## 源码及Demo下载

- [Github](https://github.com/Bytedesk/bytedesk-swift)

## 集成方式

建议: Xcode Version 14.3，最低兼容: iOS 13

### 方法 1. 本地集成

此方法适用于有自定义界面需求的开发者

- 下载源码，直接拖到自己项目中
- 选择项目，选中项目TARGET，选中 General，在 framework 中添加 bytedesk_swift.framework

### 方法 2. Swift Package Manager (SPM)

- [源地址1-gitee](https://gitee.com/270580156/bytedesk-swift)
- [源地址2-github](https://github.com/Bytedesk/bytedesk-swift)
- 国内用户建议使用源地址1
  
```bash
dependencies: [
    .package(url: "https://gitee.com/270580156/bytedesk-swift", .upToNextMajor(from: "3.0.0"))
]
或
dependencies: [
    .package(url: "https://github.com/Bytedesk/bytedesk-swift", .upToNextMajor(from: "3.0.0"))
]
```

### 3. Carthage

```bash
github 'bytedesk-swift/bytedesk-swift' ~> 3.0.0
```
