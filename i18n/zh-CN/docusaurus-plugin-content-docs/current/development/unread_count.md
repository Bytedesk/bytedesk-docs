---
sidebar_label: 访客端未读消息数
sidebar_position: 6
---

# 访客端获取未读消息数

本文介绍如何在访客端通过 SDK 获取并清空未读消息数，常用于导航角标、消息中心入口、页面内状态同步等场景。

- 演示代码：
  - [React 未读消息示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/UnreadCountDemo.tsx)
  - [Vue 未读消息示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/unreadCountDemo.vue)

## 一、基础配置

未读消息数统计依赖当前会话上下文，请确保初始化配置包含组织、会话类型与会话目标。

```javascript
chatConfig: {
 org: 'df_org_uid', // 组织 ID（必填）
 t: '1',            // 会话类型：0：一对一，1：工作组，2：机器人
 sid: 'df_wg_uid',  // 会话目标 ID（客服 / 工作组 / 机器人）

 // 推荐传入访客身份，保证多端识别一致
 visitorUid: 'visitor_001',
 nickname: '访客小明',
 avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
}
```

## 二、核心 API

### 1) 获取未读消息数

```javascript
const count = await window.bytedesk?.getUnreadMessageCount();
console.log('当前未读数：', count);
```

### 2) 清空未读消息数（标记为已读）

```javascript
const count = await window.bytedesk?.clearUnreadMessages();
console.log('清空后未读数：', count); // 通常为 0
```

### 3) 页面初始化时主动刷新

```javascript
useEffect(() => {
 window.bytedesk?.getUnreadMessageCount().then((count) => {
  setUnreadCount(count || 0);
 });
}, []);
```

## 三、接口 URL + 参数说明（基于 SDK 实现）

SDK 内部调用的是消息接口，不是 `/chat` 页面路径：

- `getUnreadMessageCount()` → `GET /visitor/api/v1/message/unread/count`
- `clearUnreadMessages()` → `POST /visitor/api/v1/message/unread/clear`

### 1) 获取未读数接口（GET）

```http
GET https://api.weiyuai.cn/visitor/api/v1/message/unread/count?uid={uid}&visitorUid={visitorUid}&orgUid={orgUid}&client=WEB_FLOAT
```

### 2) 清空未读数接口（POST）

```http
POST https://api.weiyuai.cn/visitor/api/v1/message/unread/clear
Content-Type: application/json

{
 "uid": "{uid}",
 "visitorUid": "{visitorUid}",
 "orgUid": "{orgUid}",
 "client": "WEB_FLOAT"
}
```

参数来源说明：

- `uid`：SDK 从本地 `localStorage.BYTEDESK_UID` 读取（系统访客 UID）
- `visitorUid`：优先使用 `chatConfig.visitorUid`，否则回退到 `localStorage.BYTEDESK_VISITOR_UID`
- `orgUid`：来自 `chatConfig.org`
- `client`：由 SDK 请求层自动追加，常量值为 `WEB_FLOAT`

> 注意：当 `uid` 为空时，`getUnreadMessageCount()` 在 SDK 内会直接返回 `0`，不会发起请求。

## 四、实践建议

1. 页面初次渲染时调用一次 `getUnreadMessageCount()`，确保角标初值准确。
2. 打开聊天窗口后，可在合适时机再次刷新未读数，避免延迟感知。
3. 用户读完消息后调用 `clearUnreadMessages()`，统一会话与页面状态。
4. 建议固定传 `visitorUid`，避免匿名模式下未读归属不稳定。
