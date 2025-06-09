---
title: Angular 集成指南
sidebar_label: Angular
sidebar_position: 5
description: 在 Angular 应用中集成微语客服系统
---

- [github](https://github.com/Bytedesk/bytedesk-web)
- [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web)
- [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web)
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

### 安装包

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 导入组件

```bash
import { BytedeskAngular } from 'bytedesk-web/angular';
import type { BytedeskConfig } from 'bytedesk-web';
```

### 配置参数

- 支持切换左右侧栏，默认右侧
- 支持自定义颜色主题，默认蓝色
- 支持自定义是否显示气泡，默认显示
- 支持自定义国际化语言，默认中文
- 支持自定义深色模式，默认浅色
- 支持是否自动弹窗邀请对话，默认不自动弹窗，并支持自定义弹窗邀请对话的标题和内容，弹窗次数，时间间隔等

```bash
const config: BytedeskConfig = {
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  bubbleConfig: {
    show: true,
    icon: '👋',
    title: 'Need help?',
    subtitle: 'Click to chat'
  },
  chatConfig: {
    org: 'df_org_uid',  // 替换为您的组织ID
    t: "2",
    sid: 'df_rt_uid'      // 替换为您的SID
  }
};
```

### 使用组件

```bash
const App = () => {
  const handleInit = () => {
    console.log('BytedeskAngular initialized');
  };

  return (
    <div>
      <BytedeskAngular {...config} onInit={handleInit} />
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

# 显示/隐藏按钮
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

# 显示/隐藏气泡消息
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

# 显示/隐藏邀请对话框
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();
```
