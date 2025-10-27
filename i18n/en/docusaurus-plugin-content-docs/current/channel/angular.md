---
title: Angular Integration Guide
sidebar_label: Angular
sidebar_position: 5
description: Integrate the Weiyu customer service system into an Angular application
---

- [github](https://github.com/Bytedesk/bytedesk-web)
- [![npm version](https://badge.fury.io/js/bytedesk-web.svg)](https://badge.fury.io/js/bytedesk-web)
- [![NPM Downloads](https://img.shields.io/npm/dm/bytedesk-web.svg?style=flat)](https://www.npmjs.com/package/bytedesk-web)
- [npmjs](https://www.npmjs.com/package/bytedesk-web)

### Install

```bash
npm install bytedesk-web
# or
yarn add bytedesk-web
```

### Import components

```bash
import { BytedeskAngular } from 'bytedesk-web/angular';
import type { BytedeskConfig } from 'bytedesk-web';
```

### Configuration

- Supports switching left/right sidebar; default: right
- Supports custom color theme; default: blue
- Supports customizing whether to show the bubble; default: show
- Supports custom i18n language; default: Chinese
- Supports dark mode; default: light
- Supports auto pop-up invite dialog (default: disabled), and customizing the invite dialog title/content, number of pop-ups, intervals, etc.

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
    org: 'df_org_uid',  // replace with your organization ID
    t: "2",
    sid: 'df_rt_uid'      // replace with your SID
  }
};
```

### Use the component

```bash
const App = () => {
  const handleInit = () => {
    console.log('BytedeskAngular initialized');
  };

  return (
    <div>
      <BytedeskAngular {...config} onInit={handleInit} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        Open Chat
      </button>
    </div>
  );
};
```

### Available methods

```bash
# Show/Hide chat window
(window as any).bytedesk?.showChat() 
(window as any).bytedesk?.hideChat()

# Show/Hide button
(window as any).bytedesk?.showButton();
(window as any).bytedesk?.hideButton();

# Show/Hide bubble message
(window as any).bytedesk?.showBubble();
(window as any).bytedesk?.hideBubble();

# Show/Hide invite dialog
(window as any).bytedesk?.showInviteDialog();
(window as any).bytedesk?.hideInviteDialog();
```
