---
sidebar_label: Thread History
sidebar_position: 10
---

# Thread History Retrieval and Display

This page explains how to retrieve and display historical conversation threads (ThreadList) in the visitor side, and how to integrate it through page parameters or direct API calls.

- Demo link: [Thread History Demo](https://weiyuai.cn/reactdemo)
- Demo code:
	- [ThreadHistoryDemo (React example)](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/ThreadHistoryDemo.tsx)
	- [ThreadList (visitor implementation)](https://github.com/Bytedesk/bytedesk-1x/blob/master/frontend/apps/visitor/src/pages/Thread/index.tsx)

> Note: It is recommended to complete the basic integration from the [React Integration Guide](../channel/react.md) before enabling thread history.

## What this page provides

Thread history page path: `/chat/thread`

Key capabilities:

1. Retrieve historical threads by visitor identity
2. Search threads by keyword
3. Infinite scroll pagination
4. Open a selected thread in a side drawer to view message history

## Why integrate thread history?

In real business scenarios, thread history helps you:

- Let users quickly find previous conversations after returning
- Reduce repeated questions and improve service efficiency
- Support a “review history first, then continue chatting” workflow
- Provide a continuous and traceable support experience

## Integration Method 1: Open thread history via SDK

Set `chatPath: '/chat/thread'` in SDK config.

### React example

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

		// Strongly recommended for stable history matching
		visitorUid: 'visitor_001',
		nickname: 'Visitor Xiao Ming',
		avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
	},
	locale: 'en',
};

export default function Demo() {
	return <BytedeskReact {...config} />;
}
```

## Integration Method 2: Direct H5 URL to thread history

You can directly open the thread history page with URL parameters:

```text
{{BASE_URL}}/chat/thread?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=Visitor%20Xiao%20Ming&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=en&mode=light
```

### Common parameters

- `org`: Organization uid (required)
- `t`: Session type (commonly `1`)
- `sid`: Workgroup uid / Robot uid / Agent uid (required for visitor initialization)
- `visitorUid`: Visitor business uid (strongly recommended)
- `uid`: Visitor entity uid (optional alias for compatibility)
- `nickname`: Visitor nickname (optional, URL-encode recommended)
- `avatar`: Visitor avatar URL (optional, URL-encode recommended)
- `lang`: Language, e.g. `zh-cn` / `en`
- `mode`: Theme mode, e.g. `light` / `dark`

## Thread history API (without component)

ThreadList internally calls: `/visitor/api/v1/threads`

### Method

`GET /visitor/api/v1/threads`

### Query parameters

- `orgUid: string` (required, organization uid)
- `uid: string` (optional, visitor entity uid)
- `visitorUid: string` (optional, visitor business uid, recommended)
- `pageNumber: number` (required, backend is zero-based)
- `pageSize: number` (required, default is `10`)
- `searchText: string` (optional, keyword search)

> Note: `orgUid` is required; passing both `uid` and `visitorUid` is recommended for historical data compatibility.

### Paging mapping

- UI page 1 -> `pageNumber=0`
- UI page 2 -> `pageNumber=1`
- and so on

### Request examples

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

## Key runtime behaviors (aligned with current implementation)

1. **Identity priority**
	 - Logged-in user: use `userInfo.uid`
	 - URL `visitorUid`: has higher priority
	 - Otherwise fallback to local `anonymousVisitor/currentVisitor`

2. **Anonymous initialization**
	 - If not logged in and no available visitor uid, it calls `initVisitor`
	 - Requires at least `org + sid`
	 - On success, writes both `currentVisitor` and `anonymousVisitor`

3. **Duplicate request protection**
	 - Request key format: `orgUid|uid|pageNumber|pageSize|searchText`
	 - Duplicate in-flight or recently successful requests are skipped

4. **403 cooldown**
	 - If a request returns 403, the same request key enters `30s` cooldown
	 - During cooldown, the same request is blocked

5. **Scroll loading**
	 - Loads next page when distance to bottom is around `80px`
	 - New pages are merged with deduplication

6. **Thread detail view**
	 - Click “View” to open Drawer
	 - Uses `ChatBox` with `type=history` and `sid=threadUid`

## FAQ

### 1) Why is my history list empty?

Check these first:

- Whether `org/orgUid` is correct
- Whether current visitor identity (`uid` / `visitorUid`) is valid
- Whether this visitor actually has historical threads

### 2) Why cannot I fetch history in anonymous mode?

If no reusable `visitorUid` exists, call `initVisitor` first to get `uid/visitorUid`, then query thread history.

### 3) Why are repeated requests blocked for a short time?

When the API returns 403, frontend applies a 30-second cooldown for the same request key as a protection mechanism.

## Best practices

1. Always pass a stable `visitorUid` in production
2. Pass both `uid + visitorUid` when querying history
3. URL-encode Chinese text and URL parameters via `encodeURIComponent`
4. Show clear UI hints for 403, empty lists, and no-more-data states
5. Initialize visitor identity first for unauthenticated users
