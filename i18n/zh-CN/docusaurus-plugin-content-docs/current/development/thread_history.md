---
sidebar_label: 访客端拉取历史会话
sidebar_position: 10
---

# 历史会话拉取与展示

本页面介绍如何在访客端拉取并展示历史会话列表（ThreadList），以及如何通过页面参数或接口直调方式完成对接。

- 演示链接：[历史会话演示](https://weiyuai.cn/reactdemo/threadHistory)
- 演示代码：
  - [ThreadHistoryDemo（React 示例）](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/ThreadHistoryDemo.tsx)

> 注意：建议先完成 [React 集成指南](../channel/react.md) 的基础接入，再进行历史会话能力对接。

## 能力说明

历史会话页面路径为：`/chat/thread`

该页面主要提供以下能力：

1. 根据访客身份拉取历史会话列表
2. 按关键词搜索会话
3. 列表滚动加载更多（分页）
4. 点击某条会话，在侧边抽屉查看该会话历史消息

## 为什么要接入历史会话？

在实际业务中，历史会话能力可用于：

- 用户重新进入页面后快速找回之前咨询记录
- 降低重复提问，提升客服处理效率
- 支持“先看历史，再继续咨询”的业务流程
- 为用户提供连续、可追溯的服务体验

## 接入方式一：通过 SDK 跳转到历史会话页面

可通过 SDK 配置 `chatPath: '/chat/thread'` 进入历史会话页。

### React 配置示例

```tsx
import { BytedeskReact } from '@bytedesk/web/adapters/react';
import type { BytedeskConfig } from '@bytedesk/web/types';

const config: BytedeskConfig = {
 chatPath: '/chat/thread',
 autoPopup: false,
 placement: 'bottom-right',
 marginBottom: 20,
 marginSide: 20,
 chatConfig: {
  org: 'df_org_uid',
  t: '1',
  sid: 'df_wg_uid',

  // 推荐传入，便于稳定命中访客历史会话
  visitorUid: 'visitor_001',
  nickname: '访客小明',
  avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
 },
 locale: 'zh-cn',
};

export default function Demo() {
 return <BytedeskReact {...config} />;
}
```

## 接入方式二：H5 链接直达历史会话页

也可以通过 URL 直接打开历史会话页面：

```text
{{BASE_URL}}/chat/thread?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=访客小明&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=zh-cn&mode=light
```

### 常用参数说明

- `org`：组织 uid（必填）
- `t`：会话类型（常用 `1`）
- `sid`：工作组 uid / 机器人 uid / 客服 uid（用于初始化访客时必需）
- `visitorUid`：访客业务 uid（强烈推荐）
- `uid`：访客实体 uid（可选别名参数，便于兼容）
- `nickname`：访客昵称（可选，建议 URL 编码）
- `avatar`：访客头像 URL（可选，建议 URL 编码）
- `lang`：语言，如 `zh-cn` / `en`
- `mode`：主题模式，如 `light` / `dark`

## 历史会话接口说明（不依赖组件）

ThreadList 页面内部调用接口：`/visitor/api/v1/threads`

### 请求方法

`GET /visitor/api/v1/threads`

### Query 参数

- `orgUid: string`（必填，组织 uid）
- `uid: string`（可选，访客实体 uid）
- `visitorUid: string`（可选，访客业务 uid，推荐传）
- `pageNumber: number`（必填，后端从 `0` 开始）
- `pageSize: number`（必填，示例默认 `10`）
- `searchText: string`（可选，关键词搜索）

> 说明：`orgUid` 必传；`uid` 与 `visitorUid` 建议同时传，兼容历史数据差异。

### 分页映射规则

- UI 第 1 页 -> `pageNumber=0`
- UI 第 2 页 -> `pageNumber=1`
- 以此类推

### 请求示例

```bash
curl --request GET \
 --url 'https://{YOUR_API_HOST}/visitor/api/v1/threads?orgUid=df_org_uid&uid=visitor_001&visitorUid=visitor_001&pageNumber=0&pageSize=10&searchText='
```

```ts
const params = new URLSearchParams({
 orgUid: 'df_org_uid',
 uid: 'visitor_001',
 visitorUid: 'visitor_001',
 pageNumber: '0',
 pageSize: '10',
 searchText: '',
});

const response = await fetch(
 `https://{YOUR_API_HOST}/visitor/api/v1/threads?${params.toString()}`,
 {
  method: 'GET',
  credentials: 'include',
 }
);
const data = await response.json();
```

## 页面内部关键行为（与实现保持一致）

以下行为来自当前 ThreadList 实现：

1. **身份优先级**

- 已登录用户：使用 `userInfo.uid`
- URL 传入 `visitorUid`：优先使用 URL 的访客标识
- 否则回退到本地 `anonymousVisitor/currentVisitor`

1. **匿名初始化**

- 当未登录、且没有可用访客 uid 时，会尝试调用 `initVisitor`
- 初始化需要至少提供 `org + sid`
- 初始化成功后，写入 `currentVisitor` 与 `anonymousVisitor`

1. **防重复请求**

- 使用请求键：`orgUid|uid|pageNumber|pageSize|searchText`
- 相同请求在进行中或刚成功时会被拦截，避免重复拉取

1. **403 冷却机制**

- 命中 403 后，对相同请求键进入 `30s` 冷却
- 冷却期间相同请求不再发起

1. **滚动加载**

- 列表底部阈值约 `80px` 时自动加载下一页
- 新页数据会去重合并

1. **会话详情查看**

- 点击“查看”后打开 Drawer
- 通过 `ChatBox` 传入 `type=history` 与 `sid=threadUid` 展示历史消息

## 常见问题

### 1）为什么历史列表为空？

优先检查：

- `org/orgUid` 是否正确
- 当前访客标识（`uid`/`visitorUid`）是否有效
- 是否确实存在该访客的历史会话数据

### 2）匿名模式下拉不到历史会话怎么办？

如果没有可复用的 `visitorUid`，需要先完成 `initVisitor` 获取 `uid/visitorUid`，再调用会话列表接口。

### 3）为什么会出现短时间无法重复请求？

当接口返回 403 时，前端会对同请求进入 30 秒冷却，属于保护机制。

## 最佳实践

1. 生产环境建议始终传入稳定的 `visitorUid`
2. 拉历史会话时建议同时传 `uid + visitorUid`
3. URL 参数中中文与 URL 应做 `encodeURIComponent`
4. 对 403、空列表、分页到底等场景提供明确 UI 提示
5. 对未登录用户优先完成访客初始化，避免首屏无身份导致空结果
