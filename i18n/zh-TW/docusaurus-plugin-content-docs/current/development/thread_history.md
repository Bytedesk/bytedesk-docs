---
sidebar_label: 訪客端拉取歷史會話
sidebar_position: 10
---

# 歷史會話拉取與展示

本頁面介紹如何在訪客端拉取並展示歷史會話列表（ThreadList），以及如何透過頁面參數或介面直調方式完成對接。

- 演示連結：[歷史會話演示](https://weiyuai.cn/reactdemo)
- 演示程式碼：
	- [ThreadHistoryDemo（React 範例）](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/ThreadHistoryDemo.tsx)
	- [ThreadList（訪客端實作）](https://github.com/Bytedesk/bytedesk-1x/blob/master/frontend/apps/visitor/src/pages/Thread/index.tsx)

> 注意：建議先完成 [React 整合指南](../channel/react.md) 的基礎接入，再進行歷史會話能力對接。

## 能力說明

歷史會話頁面路徑為：`/chat/thread`

此頁面主要提供以下能力：

1. 依據訪客身份拉取歷史會話列表
2. 依關鍵字搜尋會話
3. 列表滾動載入更多（分頁）
4. 點擊某條會話，在側邊抽屜查看該會話歷史訊息

## 為什麼要接入歷史會話？

在實際業務中，歷史會話能力可用於：

- 使用者重新進入頁面後快速找回先前諮詢記錄
- 降低重複提問，提升客服處理效率
- 支援「先看歷史，再繼續諮詢」的業務流程
- 為使用者提供連續、可追溯的服務體驗

## 接入方式一：透過 SDK 跳轉到歷史會話頁面

可透過 SDK 設定 `chatPath: '/chat/thread'` 進入歷史會話頁。

### React 配置範例

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

		// 建議傳入，便於穩定命中訪客歷史會話
		visitorUid: 'visitor_001',
		nickname: '訪客小明',
		avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
	},
	locale: 'zh-tw',
};

export default function Demo() {
	return <BytedeskReact {...config} />;
}
```

## 接入方式二：H5 連結直達歷史會話頁

也可以透過 URL 直接開啟歷史會話頁面：

```text
{{BASE_URL}}/chat/thread?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=訪客小明&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=zh-tw&mode=light
```

### 常用參數說明

- `org`：組織 uid（必填）
- `t`：會話類型（常用 `1`）
- `sid`：工作組 uid / 機器人 uid / 客服 uid（用於初始化訪客時必需）
- `visitorUid`：訪客業務 uid（強烈建議）
- `uid`：訪客實體 uid（可選別名參數，便於相容）
- `nickname`：訪客暱稱（可選，建議 URL 編碼）
- `avatar`：訪客頭像 URL（可選，建議 URL 編碼）
- `lang`：語言，如 `zh-tw` / `en`
- `mode`：主題模式，如 `light` / `dark`

## 歷史會話介面說明（不依賴元件）

ThreadList 頁面內部呼叫介面：`/visitor/api/v1/threads`

### 請求方法

`GET /visitor/api/v1/threads`

### Query 參數

- `orgUid: string`（必填，組織 uid）
- `uid: string`（可選，訪客實體 uid）
- `visitorUid: string`（可選，訪客業務 uid，建議傳）
- `pageNumber: number`（必填，後端從 `0` 開始）
- `pageSize: number`（必填，範例預設 `10`）
- `searchText: string`（可選，關鍵字搜尋）

> 說明：`orgUid` 必傳；`uid` 與 `visitorUid` 建議同時傳，兼容歷史資料差異。

### 分頁映射規則

- UI 第 1 頁 -> `pageNumber=0`
- UI 第 2 頁 -> `pageNumber=1`
- 以此類推

### 請求範例

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

## 頁面內部關鍵行為（與實作保持一致）

以下行為來自目前 ThreadList 實作：

1. **身份優先級**
	 - 已登入使用者：使用 `userInfo.uid`
	 - URL 傳入 `visitorUid`：優先使用 URL 的訪客標識
	 - 否則回退到本地 `anonymousVisitor/currentVisitor`

2. **匿名初始化**
	 - 當未登入、且沒有可用訪客 uid 時，會嘗試呼叫 `initVisitor`
	 - 初始化至少需要提供 `org + sid`
	 - 初始化成功後，寫入 `currentVisitor` 與 `anonymousVisitor`

3. **防重複請求**
	 - 使用請求鍵：`orgUid|uid|pageNumber|pageSize|searchText`
	 - 相同請求在進行中或剛成功時會被攔截，避免重複拉取

4. **403 冷卻機制**
	 - 命中 403 後，對相同請求鍵進入 `30s` 冷卻
	 - 冷卻期間相同請求不再發起

5. **滾動載入**
	 - 列表底部閾值約 `80px` 時自動載入下一頁
	 - 新頁資料會去重合併

6. **會話詳情查看**
	 - 點擊「查看」後開啟 Drawer
	 - 透過 `ChatBox` 傳入 `type=history` 與 `sid=threadUid` 展示歷史訊息

## 常見問題

### 1）為什麼歷史列表為空？

優先檢查：

- `org/orgUid` 是否正確
- 當前訪客標識（`uid`/`visitorUid`）是否有效
- 是否確實存在該訪客的歷史會話資料

### 2）匿名模式下拉不到歷史會話怎麼辦？

如果沒有可復用的 `visitorUid`，需要先完成 `initVisitor` 取得 `uid/visitorUid`，再呼叫會話列表介面。

### 3）為什麼會出現短時間無法重複請求？

當介面返回 403 時，前端會對同請求進入 30 秒冷卻，屬於保護機制。

## 最佳實踐

1. 生產環境建議始終傳入穩定的 `visitorUid`
2. 拉歷史會話時建議同時傳 `uid + visitorUid`
3. URL 參數中的中文與 URL 應做 `encodeURIComponent`
4. 對 403、空列表、分頁到底等場景提供明確 UI 提示
5. 對未登入使用者優先完成訪客初始化，避免首屏無身份導致空結果
