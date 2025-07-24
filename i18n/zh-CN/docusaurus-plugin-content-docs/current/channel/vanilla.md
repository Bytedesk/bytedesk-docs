---
title: Vanilla 集成指南
sidebar_label: Vanilla
sidebar_position: 5
description: 在 Vanilla 应用中集成微语客服系统
---

## 功能简介

Vanilla JavaScript是原生的JavaScript，无需任何框架依赖。通过集成微语客服系统到您的Vanilla应用中，可以为用户提供便捷的在线客服功能。支持自定义主题、拖拽、多语言等丰富特性，完美融入您的原生JavaScript项目。

- 演示链接：[Vanilla 基础集成演示](https://weiyuai.cn/reactdemo/)
- 演示代码：[Vanilla 基础集成示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vanilla-demo/src/index.js)
- [github](https://github.com/Bytedesk/bytedesk-web)
<!-- - [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web) -->
<!-- - [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web) -->
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

### 安装包

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 导入组件

```bash
import { BytedeskVanilla } from 'bytedesk-web/vanilla';
import type { BytedeskConfig } from 'bytedesk-web';
```

### 配置参数

- 支持切换左右侧栏，默认右侧
- 支持自定义颜色主题，默认蓝色
- 支持自定义是否显示气泡，默认显示
- 支持自定义国际化语言，默认中文
- 支持自定义深色模式，默认浅色
- 支持是否自动弹窗邀请对话，默认不自动弹窗，并支持自定义弹窗邀请对话的标题和内容，弹窗次数，时间间隔等
- 支持拖拽功能，控制聊天窗口是否可拖动
- 支持自定义按钮配置，包括显示、宽高和图标等
- 支持国际化设置，支持中文简体、中文繁体、英文、日文和韩文等多种语言

```bash
const config: BytedeskConfig = {
  # isDebug: false,                 // 是否开启调试模式
  htmlUrl: 'https://www.weiyuai.cn/chat', // 自定义服务器htmlUrl
  apiUrl: 'https://api.weiyuai.cn', // 自定义服务器apiUrl
  placement: 'bottom-right',       // 位置：右下角:bottom-right, 左下角:bottom-left
  marginBottom: 20,                // 底部边距：20像素
  marginSide: 20,                  // 侧边距：20像素
  autoPopup: false,                // 是否自动弹出聊天窗口
  draggable: true,                 // 是否可拖拽，默认不可拖拽
  
  // 邀请对话框配置
  inviteConfig: {
    show: false,                   // 是否显示邀请对话框
    delay: 1000,                   // 首次弹出延迟时间, 单位: 毫秒
    loop: true,                    // 是否启用循环
    loopDelay: 10000,              // 循环间隔, 单位: 毫秒
    loopCount: 3,                  // 循环次数, 设置为0表示无限循环
    // 自定义接受和拒绝按钮文字
    // acceptText: '接受',
    // rejectText: '拒绝',
    // 自定义事件回调
    // onAccept: () => { console.log('accept'); },
    // onReject: () => { console.log('reject'); },
    // onClose: () => { console.log('close'); },
    // onOpen: () => { console.log('open'); }
  },
  
  // 气泡配置
  bubbleConfig: {
    show: true,                    // 是否显示气泡
    icon: '👋',                    // 气泡图标
    title: '需要帮助吗？',          // 气泡标题
    subtitle: '点击开始对话'        // 气泡副标题
  },
  
  // 按钮配置
  buttonConfig: {
    show: true,                    // 是否显示按钮
    width: 60,                     // 按钮宽度
    height: 60,                    // 按钮高度
    // icon: '👋',                 // 可自定义按钮图标
    // text: '需要帮助吗？',        // 可自定义按钮文本
  },
  
  // 聊天配置
  chatConfig: {
    org: 'df_org_uid',             // 替换为您的组织ID
    t: "2",                        // 0 代表一对一客服，1 代表工作组客服，2 代表机器人客服                
    sid: 'df_rt_uid',              // 替换为您的SID
    hello: 'hello'                 // 可添加任意自定义参数
  },
  
  // 主题配置
  theme: {
    mode: 'light',                 // 主题模式：light(浅色)、dark(深色)或system(跟随系统)
  },
  
  // 国际化设置：en(英文)、zh-cn(简体中文)、zh-tw(繁体中文)、ja(日文)、ko(韩文)
  locale: 'zh-cn',
};
```

### 使用组件

```bash
const App = () => {
  const handleInit = () => {
    console.log('BytedeskVanilla initialized');
  };

  return (
    <div>
      {/* 引入组件 */}
      <BytedeskVanilla {...config} onInit={handleInit} />
      
      {/* 添加按钮触发客服窗口 */}
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        打开聊天
      </button>
    </div>
  );
};
```

### 可用方法

```bash
# 显示/隐藏聊天窗口
(window as any).bytedesk?.showChat() 
(window as any).bytedesk?.hideChat()

# 带参数打开聊天窗口（可动态切换客服）, showChat支持上方参数：config: BytedeskConfig 
(window as any).bytedesk?.showChat({
  chatConfig: {
    org: 'df_org_uid',
    t: "1",
    sid: 'df_wg_uid'
  }
})

# 显示/隐藏按钮
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

# 显示/隐藏气泡消息
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

# 显示/隐藏邀请对话框
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();

# 获取未读消息数量
const unreadCount = (window as any).bytedesk?.getUnreadMessageCount();
# 清除未读消息数量
(window as any).bytedesk?.clearUnreadMessages()
```
