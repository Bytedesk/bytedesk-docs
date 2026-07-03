---
title: React 集成指南
sidebar_label: React
sidebar_position: 3
description: 在 React 应用中集成微语客服系统
---

## 功能简介

React是目前最流行的前端框架之一，通过集成微语客服系统到您的React应用中，可以为用户提供便捷的在线客服功能。支持自定义主题、拖拽、多语言等丰富特性，完美融入您的React项目。

- 演示链接：[React 基础集成演示](https://weiyuai.cn/reactdemo/)
- 演示代码：[React 基础集成示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/BasicDemo.tsx)
- [github](https://github.com/Bytedesk/bytedesk-web)
<!-- - [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web) -->
<!-- - [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web) -->
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

![React 基础集成设置截图](/img/develop/chat/basicsettings.png)

## 快速对接

React 接入建议按下面 5 步完成：

1. 安装 `bytedesk-web`
2. 导入 `BytedeskReact` 和 `BytedeskConfig`
3. 先用最小配置跑通 `org`、`t`、`sid`
4. 再补充主题、入口按钮、访客信息、浏览上下文等可选项
5. 通过 `(window as any).bytedesk` 调用运行时方法，实现动态打开、切换会话和隐藏窗口

如果你只是想先接起来，直接使用下方“最小接入示例”即可；如果要和实际业务系统对接，继续看“推荐接入示例”和“运行时方法”。

### 1. 安装包

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 2. 导入组件

```ts
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';
```

### 3. 最小接入示例

这是最小可运行配置。`org`、`t`、`sid` 为必填项，先保证这 3 个值能正确打开会话。

```ts
const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: '2',
    sid: 'df_rt_uid',
  },
};
```

说明：

- `org`：企业 UID
- `t`：会话类型，常见值为 `0` 一对一、`1` 工作组、`2` 机器人、`16` 历史会话
- `sid`：会话 ID，对应客服 UID、工作组 UID、机器人 UID 等

### 4. 推荐接入示例

正式环境一般至少会补齐以下几类配置：

- 基础地址：`apiUrl`、`htmlUrl`
- UI：`placement`、`bubbleConfig`、`buttonConfig`、`theme`
- 会话：`chatConfig` 中的访客信息、业务扩展字段
- 上下文：`browseConfig`
- 行为：`inviteConfig`、`autoPopup`、`draggable`

```ts
const config: BytedeskConfig = {
  isDebug: false,
  forceRefresh: false,
  apiUrl: 'https://api.weiyuai.cn',
  htmlUrl: 'https://www.weiyuai.cn/chat',
  locale: 'zh-cn',

  chatPath: '/chat',
  threadPath: '/chat/thread',
  webrtcPath: '/webrtc',
  callPath: '/call',

  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  autoPopup: false,
  autoPopupDelay: 3000,
  draggable: true,

  chatConfig: {
    org: 'df_org_uid',
    t: '2',
    sid: 'df_rt_uid',
    title: '在线咨询',
    visitorUid: 'user_10001',
    nickname: '张三',
    avatar: 'https://example.com/avatar.jpg',
    mobile: '13800138000',
    email: 'zhangsan@example.com',
    note: '来自 React 官网接入',
    channel: 'WEB_VISITOR',
    vipLevel: '2',
    goodsInfo: '',
    orderInfo: '',
    extra: JSON.stringify({
      source: 'react-web',
      plan: 'pro',
    }),
    loadHistory: true,
  },

  browseConfig: {
    referrer: document.referrer,
    url: window.location.href,
    title: document.title,
  },

  inviteConfig: {
    show: false,
    text: '需要帮助吗？',
    icon: '👋',
    delay: 1000,
    loop: true,
    loopDelay: 10000,
    loopCount: 3,
    acceptText: '开始对话',
    rejectText: '稍后再说',
  },

  bubbleConfig: {
    show: true,
    icon: '💬',
    title: '需要帮助吗？',
    subtitle: '点击开始对话',
  },

  buttonConfig: {
    show: true,
    width: 60,
    height: 60,
    action: 'chat',
  },

  theme: {
    mode: 'light',
    textColor: '#ffffff',
    backgroundColor: '#0066FF',
  },

  onVisitorInfo: (uid, visitorUid) => {
    console.log('visitor info', uid, visitorUid);
  },
};
```

### 5. 在组件中使用

```tsx
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web/react';

const config: BytedeskConfig = {
  chatConfig: {
    org: 'df_org_uid',
    t: '2',
    sid: 'df_rt_uid',
  },
};

export default function App() {
  return (
    <div>
      <BytedeskReact
        {...config}
        onInit={() => {
          console.log('BytedeskReact initialized');
        }}
      />

      <button onClick={() => (window as any).bytedesk?.showChat()}>
        打开聊天
      </button>
    </div>
  );
}
```

## 常见对接方式

### 直接嵌入 React 页面

这是最常见方式。页面挂载 `BytedeskReact` 后，SDK 会自动创建气泡、按钮和聊天窗口。

适用场景：

- 官网右下角客服入口
- 帮助中心文档页
- 营销落地页
- SaaS 控制台内嵌客服

### 打开独立聊天页

如果你不想直接在 React 页内嵌，也可以使用独立 URL 打开聊天页。BasicDemo 当前也支持实时生成这类 URL。

```bash
https://www.weiyuai.cn/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn&mode=light&backgroundColor=%230066FF&textColor=%23ffffff&visitorUid=user_10001&nickname=%E5%BC%A0%E4%B8%89&avatar=https%3A%2F%2Fexample.com%2Favatar.jpg&loadHistory=1
```

更多 URL 参数说明请参考 [访客端开发文档](../development/chat)。

## 运行时方法

挂载完成后，可以通过全局对象动态控制客服入口和窗口行为。

```ts
// 显示 / 隐藏聊天窗口
(window as any).bytedesk?.showChat();
(window as any).bytedesk?.hideChat();

// 动态切换会话并打开聊天窗口
(window as any).bytedesk?.showChat({
  chatConfig: {
    org: 'df_org_uid',
    t: '1',
    sid: 'df_wg_uid',
    visitorUid: 'user_10001',
    nickname: '张三',
  },
});

// 直接打开其他内置入口
(window as any).bytedesk?.showThread();
(window as any).bytedesk?.showWebrtc();
(window as any).bytedesk?.showCall();

// 显示 / 隐藏按钮
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

// 显示 / 隐藏气泡
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

// 显示 / 隐藏邀请对话框
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();

// 获取 / 清空未读消息
const unreadCount = (window as any).bytedesk?.getUnreadMessageCount();
(window as any).bytedesk?.clearUnreadMessages();
```

## 推荐阅读

- [访客端开发文档](../development/chat)：查看聊天页 URL 参数、`channel` 取值和浏览上下文规则
- [历史消息](../development/message_history)：查看 `loadHistory` 和历史会话相关用法
- [商品信息对接](../integration/goods_info.md)
- [订单信息对接](../integration/order_info.md)
- [用户信息对接](../integration/user_info.md)
