---
sidebar_label: 客服端
sidebar_position: 2
---

# 客戶端/客服端開發文檔

## 簡介

微語客服端用於專業的企業IM或客服工作台，提供會話分配、訊息處理、客戶管理等功能。

![agent](/img/develop/agent/agent_chat.png)

## accessToken 登入

在客服端登入路徑 `/agent/auth/login?accessToken=xxx` 中，透過 `accessToken` 參數進行登入。

```bash
http://伺服器ip/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

## iframe通訊介面文檔

### 概述

微語客服端支援透過iframe嵌入到外部系統中，並提供雙向通訊機制。當檢測到頁面在iframe中執行時，會自動啟用通訊功能。

### 向外發送的事件

#### 1. 未讀訊息總數事件 (unread_message_count)

當未讀訊息數量發生變化時觸發。

```javascript
// 父視窗接收訊息
window.addEventListener('message', (event) => {
  if (event.data.type === 'unread_message_count') {
    const { totalUnreadCount, unreadThreads } = event.data.data;
    console.log('未讀訊息總數:', totalUnreadCount);
    console.log('未讀會話列表:', unreadThreads);
  }
});
```

#### 2. 新訪客訊息事件 (new_visitor_message)

當有新訪客接入時觸發。

```javascript
// 父視窗接收訊息
window.addEventListener('message', (event) => {
  if (event.data.type === 'new_visitor_message') {
    const { thread } = event.data.data;
    console.log('新訪客接入:', thread);
    // thread包含: uid, topic, type, user, content, createdAt
  }
});
```

#### 3. 座席狀態變化事件 (agent_status_changed)

當座席狀態發生變化時觸發。

```javascript
// 父視窗接收訊息
window.addEventListener('message', (event) => {
  if (event.data.type === 'agent_status_changed') {
    const { status, agentInfo } = event.data.data;
    console.log('座席狀態變化:', status);
    console.log('座席資訊:', agentInfo);
  }
});
```

#### 4. 會話狀態變化事件 (thread_status_changed)

當會話狀態發生變化時觸發。

```javascript
// 父視窗接收訊息
window.addEventListener('message', (event) => {
  if (event.data.type === 'thread_status_changed') {
    const { thread, action } = event.data.data;
    console.log('會話狀態變化:', action);
    console.log('會話資訊:', thread);
  }
});
```

### 接收外部事件

#### 1. 更新座席狀態 (update_agent_status)

```javascript
// 父視窗發送訊息
const iframe = document.getElementById('bytedesk-iframe');
iframe.contentWindow.postMessage({
  type: 'update_agent_status',
  data: { status: 'AVAILABLE' } // 可選值: AVAILABLE, BUSY, OFFLINE
}, '*');
```

#### 2. 設定座席為線上狀態 (update_agent_status_available)

```javascript
// 父視窗發送訊息
iframe.contentWindow.postMessage({
  type: 'update_agent_status_available'
}, '*');
```

#### 3. 設定座席為忙碌狀態 (update_agent_status_busy)

```javascript
// 父視窗發送訊息
iframe.contentWindow.postMessage({
  type: 'update_agent_status_busy'
}, '*');
```

#### 4. 設定座席為離線狀態 (update_agent_status_offline)

```javascript
// 父視窗發送訊息
iframe.contentWindow.postMessage({
  type: 'update_agent_status_offline'
}, '*');
```

#### 5. 重新整理會話列表 (refresh_threads)

```javascript
// 父視窗發送訊息
iframe.contentWindow.postMessage({
  type: 'refresh_threads'
}, '*');
```

#### 6. 清除指定會話的未讀訊息數 (clear_unread_count)

```javascript
// 父視窗發送訊息
iframe.contentWindow.postMessage({
  type: 'clear_unread_count',
  data: { threadUid: 'thread_uid_here' }
}, '*');
```

### 使用範例

#### 完整的父視窗程式碼範例

```html
<!DOCTYPE html>
<html>
<head>
    <title>微語客服系統</title>
</head>
<body>
    <iframe 
        id="bytedesk-iframe" 
        src="https://your-domain.com/desktop" 
        width="100%" 
        height="600px"
        frameborder="0">
    </iframe>

    <script>
        const iframe = document.getElementById('bytedesk-iframe');
        
        // 監聽來自微語的訊息
        window.addEventListener('message', (event) => {
            // 驗證訊息來源
            if (event.origin !== 'https://your-domain.com') {
                return;
            }
            
            const { type, data, timestamp, source } = event.data;
            
            if (source !== 'bytedesk-desktop') {
                return;
            }
            
            switch (type) {
                case 'unread_message_count':
                    console.log('未讀訊息總數:', data.totalUnreadCount);
                    // 更新UI顯示未讀訊息數量
                    updateUnreadCount(data.totalUnreadCount);
                    break;
                    
                case 'new_visitor_message':
                    console.log('新訪客接入:', data.thread);
                    // 顯示新訪客通知
                    showNewVisitorNotification(data.thread);
                    break;
                    
                case 'agent_status_changed':
                    console.log('座席狀態變化:', data.status);
                    // 更新座席狀態顯示
                    updateAgentStatus(data.status);
                    break;
                    
                case 'thread_status_changed':
                    console.log('會話狀態變化:', data.action);
                    // 更新會話狀態顯示
                    updateThreadStatus(data.thread, data.action);
                    break;
            }
        });
        
        // 範例：設定座席為線上狀態
        function setAgentOnline() {
            iframe.contentWindow.postMessage({
                type: 'update_agent_status_available'
            }, '*');
        }
        
        // 範例：設定座席為忙碌狀態
        function setAgentBusy() {
            iframe.contentWindow.postMessage({
                type: 'update_agent_status_busy'
            }, '*');
        }
        
        // 範例：設定座席為離線狀態
        function setAgentOffline() {
            iframe.contentWindow.postMessage({
                type: 'update_agent_status_offline'
            }, '*');
        }
        
        // 範例：重新整理會話列表
        function refreshThreads() {
            iframe.contentWindow.postMessage({
                type: 'refresh_threads'
            }, '*');
        }
        
        // 範例：清除指定會話的未讀訊息數
        function clearThreadUnread(threadUid) {
            iframe.contentWindow.postMessage({
                type: 'clear_unread_count',
                data: { threadUid }
            }, '*');
        }
        
        // UI更新函數範例
        function updateUnreadCount(count) {
            // 更新未讀訊息數量顯示
            document.getElementById('unread-count').textContent = count;
        }
        
        function showNewVisitorNotification(thread) {
            // 顯示新訪客通知
            alert(`新訪客接入: ${thread.user.nickname}`);
        }
        
        function updateAgentStatus(status) {
            // 更新座席狀態顯示
            document.getElementById('agent-status').textContent = status;
        }
        
        function updateThreadStatus(thread, action) {
            // 更新會話狀態顯示
            console.log(`會話 ${thread.uid} 狀態變化: ${action}`);
        }
    </script>
</body>
</html>
```

## 注意事項

1. **安全性**: 請確保驗證訊息來源，只處理來自可信網域的訊息。
2. **相容性**: 確保父視窗和iframe使用相同的協定（http/https）。
3. **錯誤處理**: 建議新增適當的錯誤處理機制。
4. **效能**: 避免頻繁發送訊息，以免影響效能。
5. **除錯**: 在開發環境中，可以透過瀏覽器控制台查看通訊日誌。

## 座席狀態說明

- `AVAILABLE`: 線上接待
- `BUSY`: 客服忙碌  
- `OFFLINE`: 客服下線

## 會話類型說明

- `AGENT`: 一對一客服會話
- `WORKGROUP`: 工作組客服會話
- `ROBOT`: 機器人客服會話
- `MEMBER`: 同事一對一會話
- `GROUP`: 群組會話
