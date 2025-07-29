---
sidebar_label: Customer Service Client
sidebar_position: 2
---

# Client/Customer Service Client Development Documentation

## Introduction

The Weiyu customer service client is used for professional enterprise IM or customer service workstations, providing session assignment, message processing, customer management, and other functions.

![agent](/img/develop/agent/agent_chat.png)

## accessToken Login

In the customer service client login path `/agent/auth/login?accessToken=xxx`, login is performed through the `accessToken` parameter.

```bash
http://server-ip/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

## iframe Communication Interface Documentation

### Overview

The Weiyu customer service client supports embedding into external systems through iframe and provides bidirectional communication mechanisms. When it detects that the page is running in an iframe, it automatically enables communication functionality.

### Outgoing Events

#### 1. Unread Message Count Event (unread_message_count)

Triggered when the number of unread messages changes.

```javascript
// Parent window receives messages
window.addEventListener('message', (event) => {
  if (event.data.type === 'unread_message_count') {
    const { totalUnreadCount, unreadThreads } = event.data.data;
    console.log('Total unread messages:', totalUnreadCount);
    console.log('Unread session list:', unreadThreads);
  }
});
```

#### 2. New Visitor Message Event (new_visitor_message)

Triggered when a new visitor connects.

```javascript
// Parent window receives messages
window.addEventListener('message', (event) => {
  if (event.data.type === 'new_visitor_message') {
    const { thread } = event.data.data;
    console.log('New visitor connected:', thread);
    // thread contains: uid, topic, type, user, content, createdAt
  }
});
```

#### 3. Agent Status Change Event (agent_status_changed)

Triggered when the agent status changes.

```javascript
// Parent window receives messages
window.addEventListener('message', (event) => {
  if (event.data.type === 'agent_status_changed') {
    const { status, agentInfo } = event.data.data;
    console.log('Agent status changed:', status);
    console.log('Agent information:', agentInfo);
  }
});
```

#### 4. Session Status Change Event (thread_status_changed)

Triggered when the session status changes.

```javascript
// Parent window receives messages
window.addEventListener('message', (event) => {
  if (event.data.type === 'thread_status_changed') {
    const { thread, action } = event.data.data;
    console.log('Session status changed:', action);
    console.log('Session information:', thread);
  }
});
```

### Receiving External Events

#### 1. Update Agent Status (update_agent_status)

```javascript
// Parent window sends message
const iframe = document.getElementById('bytedesk-iframe');
iframe.contentWindow.postMessage({
  type: 'update_agent_status',
  data: { status: 'AVAILABLE' } // Optional values: AVAILABLE, BUSY, OFFLINE
}, '*');
```

#### 2. Set Agent to Online Status (update_agent_status_available)

```javascript
// Parent window sends message
iframe.contentWindow.postMessage({
  type: 'update_agent_status_available'
}, '*');
```

#### 3. Set Agent to Busy Status (update_agent_status_busy)

```javascript
// Parent window sends message
iframe.contentWindow.postMessage({
  type: 'update_agent_status_busy'
}, '*');
```

#### 4. Set Agent to Offline Status (update_agent_status_offline)

```javascript
// Parent window sends message
iframe.contentWindow.postMessage({
  type: 'update_agent_status_offline'
}, '*');
```

#### 5. Refresh Session List (refresh_threads)

```javascript
// Parent window sends message
iframe.contentWindow.postMessage({
  type: 'refresh_threads'
}, '*');
```

#### 6. Clear Unread Message Count for Specified Session (clear_unread_count)

```javascript
// Parent window sends message
iframe.contentWindow.postMessage({
  type: 'clear_unread_count',
  data: { threadUid: 'thread_uid_here' }
}, '*');
```

### Usage Examples

#### Complete Parent Window Code Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Weiyu Customer Service System</title>
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
        
        // Listen for messages from Weiyu
        window.addEventListener('message', (event) => {
            // Verify message source
            if (event.origin !== 'https://your-domain.com') {
                return;
            }
            
            const { type, data, timestamp, source } = event.data;
            
            if (source !== 'bytedesk-desktop') {
                return;
            }
            
            switch (type) {
                case 'unread_message_count':
                    console.log('Total unread messages:', data.totalUnreadCount);
                    // Update UI to display unread message count
                    updateUnreadCount(data.totalUnreadCount);
                    break;
                    
                case 'new_visitor_message':
                    console.log('New visitor connected:', data.thread);
                    // Show new visitor notification
                    showNewVisitorNotification(data.thread);
                    break;
                    
                case 'agent_status_changed':
                    console.log('Agent status changed:', data.status);
                    // Update agent status display
                    updateAgentStatus(data.status);
                    break;
                    
                case 'thread_status_changed':
                    console.log('Session status changed:', data.action);
                    // Update session status display
                    updateThreadStatus(data.thread, data.action);
                    break;
            }
        });
        
        // Example: Set agent to online status
        function setAgentOnline() {
            iframe.contentWindow.postMessage({
                type: 'update_agent_status_available'
            }, '*');
        }
        
        // Example: Set agent to busy status
        function setAgentBusy() {
            iframe.contentWindow.postMessage({
                type: 'update_agent_status_busy'
            }, '*');
        }
        
        // Example: Set agent to offline status
        function setAgentOffline() {
            iframe.contentWindow.postMessage({
                type: 'update_agent_status_offline'
            }, '*');
        }
        
        // Example: Refresh session list
        function refreshThreads() {
            iframe.contentWindow.postMessage({
                type: 'refresh_threads'
            }, '*');
        }
        
        // Example: Clear unread message count for specified session
        function clearThreadUnread(threadUid) {
            iframe.contentWindow.postMessage({
                type: 'clear_unread_count',
                data: { threadUid }
            }, '*');
        }
        
        // UI update function examples
        function updateUnreadCount(count) {
            // Update unread message count display
            document.getElementById('unread-count').textContent = count;
        }
        
        function showNewVisitorNotification(thread) {
            // Show new visitor notification
            alert(`New visitor connected: ${thread.user.nickname}`);
        }
        
        function updateAgentStatus(status) {
            // Update agent status display
            document.getElementById('agent-status').textContent = status;
        }
        
        function updateThreadStatus(thread, action) {
            // Update session status display
            console.log(`Session ${thread.uid} status changed: ${action}`);
        }
    </script>
</body>
</html>
```

## Important Notes

1. **Security**: Please ensure to verify the message source and only process messages from trusted domains.
2. **Compatibility**: Ensure that the parent window and iframe use the same protocol (http/https).
3. **Error Handling**: It is recommended to add appropriate error handling mechanisms.
4. **Performance**: Avoid sending messages frequently to prevent performance impact.
5. **Debugging**: In development environments, you can view communication logs through the browser console.

## Agent Status Description

- `AVAILABLE`: Online reception
- `BUSY`: Customer service busy  
- `OFFLINE`: Customer service offline

## Session Type Description

- `AGENT`: One-to-one customer service session
- `WORKGROUP`: Workgroup customer service session
- `ROBOT`: Robot customer service session
- `MEMBER`: Colleague one-to-one session
- `GROUP`: Group session
