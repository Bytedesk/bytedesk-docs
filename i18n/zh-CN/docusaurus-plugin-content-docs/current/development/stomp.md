---
sidebar_label: 访客端长连接
sidebar_position: 33
---

# 访客端长连接

访客端基于STOMP协议实现长连接，用于与服务器建立持久的连接，支持实时消息收发。

## 协议说明

STOMP (Simple Text Oriented Messaging Protocol) 是一种简单的面向文本的消息传输协议，基于WebSocket实现。微语使用STOMP协议为访客端提供实时消息收发功能，确保访客与客服之间的双向通信。

:::info 使用场景说明
STOMP长连接主要用于**访客端收发消息**的场景。当网站访客需要与客服进行实时对话时，通过STOMP协议可以实现：

- **实时消息接收**：访客可以立即接收到客服回复的消息
- **双向通信支持**：访客可以发送消息给客服，并接收客服回复
- **消息状态管理**：支持消息送达回执、已读回执等状态更新
- **多种消息类型**：支持文本、图片、文件、评价、留言等多种消息类型
- **自动重连机制**：连接断开时自动重连，保证服务稳定性

**典型流程：**

1. 访客端建立STOMP连接并订阅消息主题
2. 访客发送消息到服务器
3. 服务器将消息推送给客服端
4. 客服回复消息，服务器推送给访客端
5. 访客端实时接收并显示消息

:::

## 快速开始

### 1. 安装依赖

```bash
npm install @stomp/stompjs
```

### 2. 建立连接

```typescript
import * as StompJs from "@stomp/stompjs";

// 全局STOMP客户端变量
let stompClient: StompJs.Client;
let transformedTopic: string;
let subscribedTopics: string[] = [];

// 连接参数类型定义
type StompConnectProps = {
  username?: string;    // 用户名（可选）
  password?: string;    // 密码（可选）
  topic: string;        // 订阅主题
  orgUid: string;       // 组织唯一标识
};

// 建立STOMP连接
export const stompConnect = ({ username, topic, orgUid }: StompConnectProps) => {
  console.log("STOMP连接参数:", { username, topic, orgUid });
  subscribedTopics = [];

  // 创建STOMP客户端实例
  stompClient = new StompJs.Client({
    brokerURL: getStompWsUrl(), // WebSocket服务器地址
    connectHeaders: {
      login: username || "",
      // 可以添加其他认证头信息
    },
    // 心跳配置 - 保持连接活跃
    heartbeatIncoming: 10 * 1000, // 10秒，与服务器保持一致
    heartbeatOutgoing: 10 * 1000, // 10秒，与服务器保持一致
    // 调试信息输出
    debug: function (str) {
      if (process.env.NODE_ENV === 'development') {
        console.log("STOMP调试:", str);
      }
    },
  });

  return stompClient;
};
```

#### STOMP服务器连接说明

微语支持WebSocket协议连接STOMP服务器：

```typescript
// 获取STOMP WebSocket连接地址
const getStompWsUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // 开发环境
    return "ws://127.0.0.1:9003/stomp";
  } else {
    // 生产环境
    return "wss://api.weiyuai.cn/stomp";
  }
};

// 使用示例
const client = new StompJs.Client({
  brokerURL: getStompWsUrl(),
  // 其他配置...
});
```

**连接地址格式：**

```text
ws://127.0.0.1:9003/stomp     # 本地开发环境
wss://api.weiyuai.cn/stomp    # 生产环境
```

### 3. 添加事件监听

```typescript
// 连接成功事件
stompClient.onConnect = function (frame) {
  console.log("STOMP连接成功:", frame);
  
  // 等待连接完全建立后再订阅
  setTimeout(() => {
    if (stompClient && stompClient.connected) {
      stompSubscribe({ topic, orgUid });
    } else {
      console.error("STOMP连接尚未完全建立");
    }
  }, 500); // 添加500毫秒延时，确保连接已完成建立
};

// 连接断开事件
stompClient.onDisconnect = function (frame) {
  console.log("STOMP连接断开:", frame);
  subscribedTopics = [];
};

// WebSocket关闭事件
stompClient.onWebSocketClose = (event) => {
  console.log("WebSocket连接关闭:", event);
  subscribedTopics = [];
};

// WebSocket错误事件
stompClient.onWebSocketError = (error) => {
  console.error("WebSocket连接错误:", error);
  subscribedTopics = [];
};

// STOMP协议错误事件
stompClient.onStompError = function (frame) {
  console.error("STOMP协议错误:", frame.headers["message"]);
  console.error("错误详情:", frame.body);
  subscribedTopics = [];
};

// 激活连接
stompClient.activate();
```

## 核心功能

### 订阅消息主题

```typescript
// 订阅参数类型定义
type StompSubscribeProps = {
  topic: string;    // 订阅主题
  orgUid: string;   // 组织标识
};

// 订阅消息主题
export const stompSubscribe = ({ topic, orgUid }: StompSubscribeProps) => {
  // 转换主题格式：将/替换为.
  transformedTopic = topic.replace(/\//g, ".");
  
  // 检查连接状态
  if (stompClient == null || !stompClient.connected) {
    console.log("STOMP客户端未连接");
    return;
  }
  
  // 防止重复订阅
  if (subscribedTopics.includes(transformedTopic)) {
    console.log("主题已订阅:", transformedTopic);
    return;
  }
  
  subscribedTopics.push(transformedTopic);
  console.log("订阅主题:", transformedTopic);
  
  try {
    stompClient.subscribe(
      "/topic/" + transformedTopic,
      (message) => {
        if (message.body) {
          const messageObject: MessageResponse = JSON.parse(message.body);
          handleReceivedMessage(messageObject, orgUid);
        }
        // 确认消息已处理
        message.ack();
      },
      { ack: "client" } // 客户端手动确认
    );
  } catch (error) {
    console.error("订阅主题失败:", error);
    // 订阅失败时从列表中移除
    subscribedTopics = subscribedTopics.filter(item => item !== transformedTopic);
  }
};
```

### 发送消息

```typescript
// 发送消息到服务器
export const stompSendMessage = (message: string) => {
  console.log("STOMP发送消息:", transformedTopic, message);
  
  // 检查连接状态
  if (!stompIsConnected()) {
    // 连接断开时使用HTTP发送
    sendHttpMessage(message);
    console.log("STOMP连接断开，使用HTTP发送");
    return;
  }
  
  // 通过STOMP发送消息
  stompClient.publish({
    destination: "/app/" + transformedTopic,
    body: message,
    // 可以添加自定义头信息
    // headers: { priority: '9' },
  });
};

// 检查连接状态
export const stompIsConnected = () => {
  return stompClient != null && stompClient?.connected;
};
```

### 处理接收消息

```typescript
// 处理接收到的消息
const handleReceivedMessage = (messageObject: MessageResponse, orgUid: string) => {
  // 判断是否为自己发送的消息
  if (!isSelfSend(messageObject)) {
    console.log("接收到其他人的消息:", messageObject);
    
    // 根据消息类型进行不同处理
    switch (messageObject.type) {
      case 'READ':
      case 'DELIVERED':
        // 消息回执处理
        console.log("收到消息回执:", messageObject);
        updateMessageStatus(messageObject);
        return;
        
      case 'TYPING':
        // 显示正在输入状态
        showTypingIndicator();
        return;
        
      case 'PROCESSING':
        // 显示处理中状态
        showProcessingIndicator();
        return;
        
      case 'RECALL':
        // 处理消息撤回
        handleRecallMessage(messageObject);
        return;
        
      case 'TRANSFER':
      case 'TRANSFER_ACCEPT':
      case 'TRANSFER_REJECT':
        // 忽略转接相关消息
        return;
        
      case 'INVITE_VISITOR':
        // 处理访客邀请
        handleVisitorInvite(messageObject);
        break;
        
      case 'AUTO_CLOSED':
        // 会话自动关闭，不播放提示音
        break;
        
      default:
        // 播放消息提示音
        playAudio();
    }
    
    // 发送消息送达回执
    sendReceiptMessage(orgUid, messageObject);
    
  } else {
    console.log("接收到自己发送的消息:", messageObject);
    
    // 处理自己发送的消息
    switch (messageObject.type) {
      case 'RATE_SUBMIT':
        showSuccessMessage("评价成功");
        updateMessageStatus(messageObject);
        return;
        
      case 'LEAVE_MSG_SUBMIT':
        showSuccessMessage("留言成功");
        updateMessageStatus(messageObject);
        return;
        
      case 'RECALL':
        handleRecallMessage(messageObject);
        return;
    }
    
    // 标记消息发送成功
    messageObject.status = 'SUCCESS';
  }
  
  // 将消息添加到消息列表
  addMessageToStore(messageObject);
};
```

### 特殊消息类型处理

#### 1. 发送留言消息

```typescript
type StompLeaveMsgProps = {
  uid?: string;
  nickname?: string;
  contact?: string;
  content?: string;
  type?: string;
  images?: string[];
  thread: ThreadResponse;
  visitor: VisitorProtobuf;
};

export const stompSendLeaveMessage = ({
  uid,
  nickname,
  contact,
  content,
  type,
  images,
  thread,
  visitor,
}: StompLeaveMsgProps) => {
  const messageExtra = {
    uid: uid || "",
    nickname: nickname,
    contact: contact,
    content: content,
    type: type,
    images: images,
    orgUid: getCurrentOrgUid(),
  };
  
  const message = {
    uid: uid,
    type: "LEAVE_MSG_SUBMIT",
    content: uid,
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "HTTP",
    extra: JSON.stringify(messageExtra),
    thread: thread,
    user: visitor,
  };
  
  const messageJson = JSON.stringify(message);
  stompSendMessage(messageJson);
};
```

#### 2. 发送评价消息

```typescript
type StompRateSubmitProps = {
  uid: string;
  score: number;
  resolved: boolean;
  content?: string;
  disabled: boolean;
  type: string;
  thread: ThreadResponse;
  visitor: VisitorProtobuf;
};

export const stompSendRateSubmitMessage = ({
  uid,
  score,
  resolved,
  content,
  thread,
  visitor,
}: StompRateSubmitProps) => {
  const messageExtra = {
    score: score,
    resolved: resolved,
    content: content || "",
    orgUid: getCurrentOrgUid(),
  };
  
  const message = {
    uid: generateUUID(),
    type: "RATE_SUBMIT",
    content: uid, // 评价对象的消息ID
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "HTTP",
    extra: JSON.stringify(messageExtra),
    thread: thread,
    user: visitor,
  };
  
  const messageJson = JSON.stringify(message);
  stompSendMessage(messageJson);
};
```

#### 3. 发送消息撤回

```typescript
export const stompSendRecallMessage = (
  recallMessageUid: string,
  thread: ThreadResponse,
) => {
  console.log("发送撤回消息:", recallMessageUid);
  
  const messageExtra = {
    orgUid: getCurrentOrgUid(),
  };
  
  const message = {
    uid: generateUUID(),
    type: "RECALL",
    content: recallMessageUid, // 要撤回的消息ID
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "HTTP",
    extra: JSON.stringify(messageExtra),
    thread: thread,
    user: getCurrentVisitor(),
  };
  
  const messageJson = JSON.stringify(message);
  stompSendMessage(messageJson);
};
```

### 消息回执处理

```typescript
// 发送消息回执
const sentUIDs = new Set<string>(); // 避免重复发送回执

export const sendReceiptMessage = (
  orgUid: string,
  message: MessageResponse
) => {
  // 检查是否需要发送回执
  if (shouldSendReceipt(message?.type)) {
    const uid = message?.uid || "";
    
    // 避免重复发送
    if (!sentUIDs.has(uid)) {
      sentUIDs.add(uid);
      
      const messageExtra = {
        orgUid: orgUid,
      };
      
      const receiptMessage = {
        uid: generateUUID(),
        type: "READ", // 访客端收到即已读
        status: "SENDING",
        content: message?.uid, // 原消息ID
        thread: message?.thread,
        extra: JSON.stringify(messageExtra),
        channel: "HTTP",
        user: {
          uid: getCurrentVisitor().uid,
        },
      };
      
      stompSendMessage(JSON.stringify(receiptMessage));
    }
  }
};

// 批量发送消息回执
export const sendReceiptMessageList = (
  orgUid: string,
  messageList: MessageResponse[]
) => {
  messageList.forEach((message) => {
    if (message?.status === "SUCCESS" || message?.status === "SENDING") {
      sendReceiptMessage(orgUid, message);
    }
  });
};
```

## 连接管理

### 取消订阅

```typescript
export const stompUnsubscribe = (topic: string) => {
  console.log("取消订阅主题:", topic);
  
  if (stompClient == null) {
    console.log("STOMP客户端不存在");
    return;
  }
  
  stompClient.unsubscribe(topic);
  subscribedTopics = subscribedTopics.filter(item => item !== topic);
};
```

### 断开连接

```typescript
export const stompDisconnect = () => {
  console.log("断开STOMP连接");
  
  if (stompClient == null) {
    return;
  }
  
  stompClient.deactivate();
  subscribedTopics = [];
};
```

### HTTP降级处理

```typescript
// 当STOMP连接断开时，使用HTTP发送消息
export const sendHttpMessage = async (message: string) => {
  try {
    const response = await sendRestMessage(message);
    console.log("HTTP发送消息:", message, response.data);
    
    if (response.data.code === 200) {
      const messageObject = JSON.parse(message);
      
      // 更新消息状态为成功
      messageObject.status = "SUCCESS";
      updateMessageStatus(messageObject);
      
      // 显示成功提示
      if (messageObject?.type === "RATE_SUBMIT") {
        showSuccessMessage("评价成功");
      }
      if (messageObject?.type === "LEAVE_MSG_SUBMIT") {
        showSuccessMessage("留言成功");
      }
    } else {
      showErrorMessage(response.data.message);
    }
  } catch (error) {
    console.error("HTTP发送消息失败:", error);
    showErrorMessage("消息发送失败");
  }
};
```

## 最佳实践

### 1. 连接管理

- **延时订阅**：连接成功后延时500ms再订阅，确保连接稳定
- **防重复订阅**：使用订阅列表避免重复订阅相同主题
- **自动重连**：利用STOMP客户端的自动重连机制
- **状态检查**：发送消息前检查连接状态

### 2. 消息处理

- **回执去重**：使用Set存储已发送回执的消息ID，避免重复发送
- **消息确认**：使用客户端手动确认模式，确保消息处理完成
- **错误处理**：订阅失败时及时清理订阅列表
- **降级机制**：连接断开时自动切换到HTTP发送

### 3. 性能优化

- **心跳配置**：合理设置心跳间隔，保持连接活跃
- **消息缓存**：避免重复处理相同消息
- **资源清理**：断开连接时及时清理订阅和缓存

### 4. 用户体验

- **实时反馈**：及时显示消息状态和处理结果
- **声音提示**：新消息到达时播放提示音
- **状态指示**：显示对方正在输入、处理中等状态

## 完整示例

```typescript
import * as StompJs from "@stomp/stompjs";

// 完整的STOMP连接和使用示例
class StompManager {
  private stompClient: StompJs.Client | null = null;
  private subscribedTopics: string[] = [];
  private currentTopic: string = "";

  // 建立连接
  async connect(username: string, topic: string, orgUid: string) {
    this.subscribedTopics = [];
    
    this.stompClient = new StompJs.Client({
      brokerURL: this.getStompWsUrl(),
      connectHeaders: {
        login: username || "",
      },
      heartbeatIncoming: 10 * 1000,
      heartbeatOutgoing: 10 * 1000,
      debug: (str) => {
        if (process.env.NODE_ENV === 'development') {
          console.log("STOMP:", str);
        }
      },
    });

    // 设置事件监听
    this.setupEventHandlers(topic, orgUid);
    
    // 激活连接
    this.stompClient.activate();
  }

  // 设置事件处理
  private setupEventHandlers(topic: string, orgUid: string) {
    if (!this.stompClient) return;

    this.stompClient.onConnect = (frame) => {
      console.log("连接成功:", frame);
      setTimeout(() => {
        this.subscribe(topic, orgUid);
      }, 500);
    };

    this.stompClient.onDisconnect = (frame) => {
      console.log("连接断开:", frame);
      this.subscribedTopics = [];
    };

    this.stompClient.onStompError = (frame) => {
      console.error("STOMP错误:", frame.headers["message"]);
      this.subscribedTopics = [];
    };
  }

  // 订阅消息
  private subscribe(topic: string, orgUid: string) {
    if (!this.stompClient?.connected) return;

    const transformedTopic = topic.replace(/\//g, ".");
    
    if (this.subscribedTopics.includes(transformedTopic)) return;
    
    this.subscribedTopics.push(transformedTopic);
    this.currentTopic = transformedTopic;

    this.stompClient.subscribe(
      `/topic/${transformedTopic}`,
      (message) => {
        if (message.body) {
          const messageObject = JSON.parse(message.body);
          this.handleMessage(messageObject, orgUid);
        }
        message.ack();
      },
      { ack: "client" }
    );
  }

  // 发送消息
  sendMessage(message: string) {
    if (!this.isConnected()) {
      this.sendHttpMessage(message);
      return;
    }

    this.stompClient!.publish({
      destination: `/app/${this.currentTopic}`,
      body: message,
    });
  }

  // 检查连接状态
  isConnected(): boolean {
    return this.stompClient != null && this.stompClient.connected;
  }

  // 断开连接
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.subscribedTopics = [];
    }
  }

  private getStompWsUrl(): string {
    return process.env.NODE_ENV === 'development' 
      ? "ws://127.0.0.1:9003/stomp"
      : "wss://api.weiyuai.cn/stomp";
  }

  private handleMessage(messageObject: any, orgUid: string) {
    // 消息处理逻辑
    console.log("处理消息:", messageObject);
  }

  private async sendHttpMessage(message: string) {
    // HTTP降级发送逻辑
    console.log("HTTP发送:", message);
  }
}

// 使用示例
const stompManager = new StompManager();

// 建立连接
stompManager.connect("visitor123", "org.123.visitor.456", "org123");

// 发送消息
setTimeout(() => {
  const message = {
    uid: "msg123",
    type: "TEXT",
    content: "Hello World!",
    status: "SENDING",
    createdAt: new Date().toISOString(),
  };
  
  stompManager.sendMessage(JSON.stringify(message));
}, 2000);
```

## 参考连接

- [STOMP.js 官方文档](https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html)
- [STOMP协议规范](https://stomp.github.io/stomp-specification-1.2.html)
