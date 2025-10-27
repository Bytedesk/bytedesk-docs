---
title: Angular 整合指南
sidebar_label: Angular
sidebar_position: 5
description: 在 Angular 應用中整合微語客服系統
---

- [github](https://github.com/Bytedesk/bytedesk-web)
- [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web)
- [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web)
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

### 安裝套件

```bash
npm install bytedesk-web
# 或
yarn add bytedesk-web
```

### 匯入元件

```bash
import { BytedeskAngular } from 'bytedesk-web/angular';
import type { BytedeskConfig } from 'bytedesk-web';
```

### 設定參數

- 支援切換左右側欄，預設右側
- 支援自訂顏色主題，預設藍色
- 支援自訂是否顯示氣泡，預設顯示
- 支援自訂國際化語言，預設中文
- 支援深色模式，預設淺色
- 支援是否自動彈窗邀請對話（預設關閉），並可自訂邀請對話的標題與內容、彈窗次數、時間間隔等

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
    org: 'df_org_uid',  // 替換為您的組織ID
    t: "2",
    sid: 'df_rt_uid'      // 替換為您的SID
  }
};
```

### 使用元件

```bash
const App = () => {
  const handleInit = () => {
    console.log('BytedeskAngular initialized');
  };

  return (
    <div>
      <BytedeskAngular {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        打開聊天
      </button>
    </div>
  );
};
```

### 可用方法

```bash
# 顯示/隱藏聊天視窗
(window as any).bytedesk?.showChat() 
(window as any).bytedesk?.hideChat()

# 顯示/隱藏按鈕
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

# 顯示/隱藏氣泡訊息
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

# 顯示/隱藏邀請對話框
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();
```
