---
sidebar_label: 歷史訊息
sidebar_position: 9
---

# 歷史訊息記錄

本頁面介紹如何透過 `loadHistory` 參數控制是否自動載入歷史聊天記錄，幫助使用者查看歷史會話內容。

<!-- - 演示連結：[歷史記錄演示](https://weiyuai.cn/reactdemo) -->
<!-- - 演示程式碼：[歷史記錄範例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/historyDemo.tsx) -->

> 注意：請確保您已經完成了[React整合指南](../channel/react.md)中的基本功能對接，才能使用歷史記錄功能。

## 為什麼需要歷史記錄功能？

在實際業務場景中，您可能希望：

- 讓使用者查看之前的聊天記錄
- 保持會話的連續性
- 方便使用者回顧重要資訊
- 提高使用者體驗和溝通效率
- 便於使用者了解歷史問題處理情況

透過歷史記錄功能，可以幫助使用者更好地了解之前的溝通內容，提供更連貫的服務體驗。

## 對接方法

微語客服系統支援透過配置參數控制歷史記錄的載入。在初始化客服元件時，透過 `chatConfig` 配置項傳入 `loadHistory` 參數。

### 核心參數

以下是歷史記錄功能的核心參數配置：

```javascript
chatConfig: {
  // 必填參數
  org: 'df_org_uid',        // 您的組織ID
  t: "1",                   // 會話類型
  sid: 'df_wg_uid',         // 會話ID
  
  // 歷史記錄參數 - 這是控制歷史記錄載入的關鍵
  loadHistory: "1",         // 值為"1"時載入歷史記錄，其他值不載入
  
  // 其他可選參數
  visitorUid: 'visitor_001',       // 使用者唯一ID
  nickname: '訪客小明',     // 使用者暱稱
  avatar: 'https://example.com/avatar.jpg' // 使用者頭像URL
}
```

### H5連結對接方法

除了元件整合方式外，微語客服系統還支援透過URL參數直接控制歷史記錄載入，適用於H5頁面或快速整合場景。

### H5連結格式

基本連結格式如下：

```text
https://www.weiyuai.cn/chat/?org=您的組織ID&t=1&sid=會話ID&loadHistory=1
```

參數說明：

- `loadHistory`: 控制是否載入歷史記錄，值為"1"時載入，其他值不載入

### 範例程式碼

```javascript
// 1. 準備基本參數
const orgId = 'df_org_uid';
const sessionId = 'df_wg_uid';

// 2. 拼接完整URL（載入歷史記錄）
const chatUrl = `https://www.weiyuai.cn/chat/?org=${orgId}&t=1&sid=${sessionId}&loadHistory=1`;

// 3. 使用該連結進行跳轉或生成按鈕
window.location.href = chatUrl;
// 或者建立一個連結
// <a href="${chatUrl}">查看歷史記錄</a>
```

## 最佳實踐

1. **按需載入**：根據業務場景決定是否載入歷史記錄
2. **效能考慮**：歷史記錄較多時可能影響載入速度，建議適當控制載入數量
3. **使用者體驗**：在合適的場景下提供歷史記錄功能，提升使用者滿意度
4. **資料安全**：確保歷史記錄的安全性和隱私保護

## 注意事項

1. **參數值**：`loadHistory` 參數使用字串 "1" 表示載入歷史記錄
2. **載入時機**：歷史記錄在會話初始化時載入
3. **資料量**：歷史記錄較多時可能影響載入效能
4. **更新機制**：當參數值變更時，需要重新初始化客服元件以應用新的設定
