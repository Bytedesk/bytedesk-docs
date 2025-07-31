---
sidebar_label: 未讀訊息
sidebar_position: 13
---

# 未讀訊息數對接

本頁面介紹如何在您的應用中整合微語客服系統的未讀訊息計數功能，即時顯示使用者未讀的客服訊息數量，幫助提升使用者體驗和訊息閱讀率。

- 演示連結：[未讀訊息數對接演示](https://weiyuai.cn/reactdemo)
<!-- - H5連結演示：[H5未讀訊息數對接](https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid) -->
- 演示程式碼：
- [未讀訊息數對接範例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/unreadCountDemo.tsx)
- [未讀訊息數對接範例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/unreadCountDemo.vue)

> 注意：請確保您已經完成了[React整合指南](../channel/react.md)或[Vue整合指南](../channel/vue.md)中的基本功能對接，才能繼續進行未讀訊息數對接。

![未讀訊息數對接範例](/img/develop/chat/unread_count.png)

## 為什麼需要未讀訊息數對接？

在現代應用中，即時顯示未讀訊息數是提升使用者體驗的重要功能，它可以：

- 提醒使用者有新的客服訊息需要查看
- 增加使用者回覆訊息的可能性，提高溝通效率
- 減少使用者錯過重要訊息的機率
- 提升應用的專業性和完整性
- 為使用者提供更好的訊息管理體驗

## 未讀訊息數功能實現

微語客服系統提供了簡單易用的API來獲取和管理未讀訊息數，主要包括三個核心方法：

1. `getUnreadMessageCount()`: 獲取當前未讀訊息數
2. `clearUnreadMessages()`: 將所有訊息標記為已讀
<!-- 3. 訂閱未讀訊息數變化事件（透過鉤子函數實現） -->

### 基本用法

#### 1. 獲取未讀訊息數

您可以使用`getUnreadMessageCount()`方法隨時獲取當前使用者的未讀訊息數：

```javascript
// 獲取未讀訊息數
window.bytedesk?.getUnreadMessageCount().then((count) => {
  console.log('當前未讀訊息數：', count);
  // 更新您的UI顯示
  setUnreadCount(count);
});
```

#### 2. 標記所有訊息為已讀

當使用者查看了所有訊息，或者您需要手動重置未讀訊息數時，可以使用`clearUnreadMessages()`方法：

```javascript
// 標記所有訊息為已讀
window.bytedesk?.clearUnreadMessages().then((count) => {
  console.log('所有訊息已標記為已讀:', count);
  // 更新UI顯示
  // setUnreadCount(0);
});
```

## API 參考

### 1. getUnreadMessageCount()

獲取當前使用者未讀訊息總數。

**返回值**：Promise&lt;number&gt; - 未讀訊息數量

**範例**：

```javascript
window.bytedesk?.getUnreadMessageCount().then((count) => {
  console.log('當前未讀訊息數：', count);
});
```

### 2. clearUnreadMessages()

將所有訊息標記為已讀，重置未讀計數為0。

**返回值**：Promise&lt;number&gt; - 重置後的未讀訊息數量（應為0）

**範例**：

```javascript
window.bytedesk?.clearUnreadMessages().then((count) => {
  console.log('所有訊息已標記為已讀，當前未讀數：', count);
});
```

## 最佳實踐

### 1. 未讀訊息數展示

- **適當位置**：在導航欄、標籤頁或固定位置顯示未讀計數
- **醒目樣式**：使用紅色或其他醒目的顏色展示未讀數
- **數字限制**：當未讀數超過一定數量（如99）時，可顯示為"99+"
- **自動重新整理**：定期自動重新整理未讀計數（建議間隔不少於30秒）

### 2. 使用者體驗最佳化

- **即時更新**：當使用者開啟聊天視窗並閱讀訊息後，及時更新未讀計數
- **通知提醒**：結合瀏覽器通知API，在使用者允許的情況下發送新訊息通知
- **聲音提示**：可為重要訊息新增聲音提示（需考慮使用者偏好設定）
- **自訂控制**：允許使用者自行控制是否顯示未讀計數及通知方式

### 3. 效能考量

- **避免頻繁查詢**：不要過於頻繁地呼叫API檢查未讀訊息數
- **快取策略**：可適當快取未讀計數，減少請求次數
- **錯誤處理**：妥善處理API請求失敗的情況，避免影響使用者體驗

## 常見問題

### Q1: 未讀訊息數不會自動更新，如何解決？

**A**: 目前未讀訊息數需要手動呼叫API獲取。您可以：

1. 在應用初始化時獲取一次未讀訊息數
2. 設定定時器定期重新整理（如每1-5分鐘）
3. 在使用者開啟聊天視窗後、關閉聊天視窗前分別獲取一次

### Q2: 如何在多個標籤頁之間同步未讀訊息狀態？

**A**: 對於多標籤頁場景，您可以：

1. 使用LocalStorage事件機制在標籤頁間通訊
2. 每個標籤頁獨立定期獲取最新未讀訊息數
3. 當一個標籤頁中呼叫了`clearUnreadMessages()`方法後，可以透過LocalStorage通知其他標籤頁更新狀態

範例程式碼：

```javascript
// 在標記已讀後廣播給其他標籤頁
window.bytedesk?.clearUnreadMessages().then(() => {
  localStorage.setItem('bytedesk_unread_update', Date.now().toString());
});

// 在其他標籤頁監聽變化
window.addEventListener('storage', (e) => {
  if (e.key === 'bytedesk_unread_update') {
    window.bytedesk?.getUnreadMessageCount().then((count) => {
      setUnreadCount(count);
    });
  }
});
```

### Q3: 是否可以獲取特定會話的未讀訊息數？

**A**: 當前版本API主要提供總未讀訊息數。如需更細粒度控制，建議：

1. 使用`getUnreadMessageCount()`獲取總未讀數
2. 在應用中自行記錄使用者閱讀特定會話的狀態
<!-- 3. 聯絡微語客服技術支援，了解未來可能提供的更細粒度API -->

### Q4: 未讀訊息數顯示異常怎麼辦？

**A**: 如果遇到未讀訊息數顯示異常，可嘗試以下解決方案：

1. 確認您的應用與微語客服系統連線正常
2. 檢查使用者登入狀態是否一致
3. 手動呼叫`getUnreadMessageCount()`重新整理計數
4. 必要時可呼叫`clearUnreadMessages()`重置計數

### Q5: 如何使用純API實現獲取訪客的未讀訊息數？

- 首先獲取當前訪客uid，可以從localStorage.getItem('VISITOR_STORE')中獲取訪客資訊，並從json中解析currentVisitor並獲取uid

```javascript
// 獲取訪客資訊
const visitorInfo = localStorage.getItem('VISITOR_STORE');
const currentVisitor = JSON.parse(visitorInfo).state.currentVisitor;
const uid = currentVisitor.uid; // 獲取訪客uid
```

![獲取訪客uid](/img/develop/chat/unread_count_uid.png)

- 呼叫API獲取未讀訊息數. 程式碼範例

```javascript
// 請求地址範例：請將127.0.0.1:9003替換為您的微語客服系統地址
http://127.0.0.1:9003/visitor/api/v1/message/unread/count?uid=1678201721979008
// 返回結果範例：
{
    message: "get unread messages count success",
    code: 200,
    data: 10 // 未讀訊息數
}
```

### Q6: 如何拉取微語客服系統中訪客端未讀訊息列表？

- 呼叫API獲取未讀訊息. 程式碼範例

```javascript
// 請求地址範例：請將127.0.0.1:9003替換為您的微語客服系統地址
http://127.0.0.1:9003/visitor/api/v1/message/unread?pageNumber=0&pageSize=10&uid=1678201721979008
// 返回結果範例：
{
    message: "get unread messages success",
    code: 200,
    data: [] // 未讀訊息列表
}
```

- 參考[API介面程式碼](https://github.com/Bytedesk/bytedesk-web/blob/master/src/apis/message.ts)
- 注：訪客端匿名使用者，無需token，只需要uid即可。如需登入使用者授權，請聯絡微語客服。

## 小結

未讀訊息數對接是提升使用者體驗的重要功能，透過即時顯示未讀訊息計數，可以有效提醒使用者及時查看客服訊息，提高溝通效率。微語客服系統提供了簡單易用的API，幫助開發者輕鬆實現未讀訊息數管理功能。透過遵循本文提供的最佳實踐，您可以為使用者打造更加完善的訊息通知體驗。
