---
sidebar_label: 客服端长连接
sidebar_position: 33
---

# 客服端长连接

客服端基于MQTT协议实现长连接，用于与服务器建立持久的连接，支持实时消息收发。

## 协议说明

MQTT (Message Queuing Telemetry Transport) 是一种轻量级的发布/订阅消息传输协议，适用于实时通信场景。微语使用 MQTT 协议实现客服端与服务器之间的长连接通信，支持实时消息收发。

:::info 使用场景说明
MQTT长连接主要用于**客服端向访客端发送消息**的场景。当客服人员需要主动向网站访客或用户发送消息时，通过MQTT协议可以实现：

- **实时消息推送**：客服消息可以立即推送到访客端
- **双向通信**：支持客服和访客之间的实时对话
- **离线消息处理**：访客离线时，消息会在其重新连接后推送
- **多媒体消息支持**：支持文本、图片、文件、语音等多种消息类型

**典型流程：**

1. 客服端建立MQTT连接到服务器（通常在用户登录时建立）
2. 客服端通过系统发送消息到服务器
3. 服务器通过MQTT将消息推送到访客端
4. 访客端实时接收并显示消息

:::

## 快速开始

### 1. 安装依赖

```bash
npm install mqtt
```

### 2. 建立连接

```javascript
import mqtt from 'mqtt';

// 全局MQTT客户端变量
let mqttClient = null;

// 连接参数类型定义
type mqttConnectOptions = {
  uid: string;        // 用户唯一标识符
  username: string;   // 用户名，用于MQTT认证
  accessToken: string; // 访问令牌，作为MQTT密码进行认证
};

// 连接参数示例
const connectOptions: mqttConnectOptions = {
  uid: 'user123',              // 必填：用户ID，用于生成唯一的客户端ID
  username: 'your_username',   // 必填：用户名，通常是用户登录名
  accessToken: 'your_access_token' // 必填：访问令牌，从服务端获取的JWT或其他认证令牌
};

// 建立 MQTT 连接
const mqttConnect = ({ uid, username, accessToken }) => {
  // 检查访问令牌 - 匿名用户不建立MQTT连接
  if (!accessToken) {
    console.log("accessToken is empty, don't connect mqtt");
    return;
  }

  // 生成唯一的客户端ID
  // 格式：用户ID/渠道/设备ID
  const deviceUid = 'device_unique_id'; // 设备唯一标识
  const clientId = `${uid}/web/${deviceUid}`;
  
  // MQTT连接配置详解
  const options = {
    keepalive: 30,          // 心跳间隔(秒)，设置0为禁用
    clientId: clientId,     // 客户端唯一标识，用于服务端识别客户端身份
    username: username,     // MQTT用户名，用于服务端认证
    password: accessToken,  // MQTT密码(访问令牌)，用于服务端认证
    clean: false,          // 持久会话：false=离线时可接收QoS 1和2消息
    path: "/websocket",    // WebSocket路径，WSS协议必需
    reconnectPeriod: 5000, // 重连间隔(毫秒)，设置0禁用自动重连
    connectTimeout: 30000, // 连接超时(毫秒)
    reschedulePings: true, // 发送数据包后重新安排ping消息
    rejectUnauthorized: false, // WSS连接时是否验证服务器证书
  };

  // 连接 MQTT 服务器，并将客户端实例赋值给全局变量
  mqttClient = mqtt.connect(getMqttUrl(), options);
  
  return mqttClient;
};
```

#### MQTT服务器连接说明

微语支持两种WebSocket协议连接MQTT服务器：

```javascript
// 1. 开发环境 - 使用 ws:// 协议（非加密连接）
const MQTT_URL_DEV = "ws://127.0.0.1:9885/websocket";

// 2. 生产环境 - 使用 wss:// 协议（加密连接）
const MQTT_URL_PROD = "wss://api.weiyuai.cn/websocket";

// 根据环境选择连接地址
const getMqttUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? MQTT_URL_DEV : MQTT_URL_PROD;
};

// 使用示例
const client = mqtt.connect(getMqttUrl(), options);
```

**协议说明：**

- **ws://** - WebSocket协议，明文传输，适用于本地开发环境
  - 优点：配置简单，调试方便
  - 缺点：数据未加密，不安全
  - 使用场景：本地开发、测试环境

- **wss://** - WebSocket Secure协议，TLS/SSL加密传输，适用于生产环境
  - 优点：数据加密安全，防止中间人攻击
  - 缺点：需要SSL证书配置
  - 使用场景：生产环境、公网部署

**连接地址格式：**

```text
协议://域名:端口/路径
ws://127.0.0.1:9885/websocket    # 本地开发
wss://api.weiyuai.cn/websocket   # 生产环境
```

### 3. 添加事件监听

```javascript
// 连接成功事件
mqttClient.on('connect', () => {
  console.log('MQTT 连接成功');
  // 可以在这里订阅主题
});

// 接收消息事件
mqttClient.on('message', (topic, message, packet) => {
  console.log('收到消息:', {
    topic: topic,
    message: message.toString(),
    packet: packet
  });
  
  // 处理收到的消息
  handleReceivedMessage(topic, message);
});

// 重连事件
mqttClient.on('reconnect', () => {
  console.log('MQTT 重新连接中...');
});

// 连接关闭事件
mqttClient.on('close', () => {
  console.log('MQTT 连接已关闭');
});

// 错误事件
mqttClient.on('error', (error) => {
  console.error('MQTT 连接错误:', error);
});

// 离线事件
mqttClient.on('offline', () => {
  console.log('MQTT 客户端离线');
});
```

## 核心功能

### 发送消息

微语支持两种消息发送方式：**MQTT长连接发送**（首选）和 **HTTP REST API发送**（降级）。系统会自动根据连接状态选择最佳发送方式。

#### 消息格式标准

所有消息都采用统一的数据结构，支持多种消息类型：

```javascript
// 标准消息结构
const messageStructure = {
  uid: 'message_unique_id',    // 消息唯一标识
  type: 'MESSAGE_TYPE',        // 消息类型（见下方类型列表）
  content: 'message_content',  // 消息内容（文本或JSON字符串）
  timestamp: 1691234567890,    // 消息时间戳
  status: 'SENDING',           // 消息状态：SENDING/SUCCESS/FAILED
  channel: 'web',              // 发送渠道：web/mobile/api
  user: {                      // 发送者信息
    uid: 'user123',
    nickname: '用户昵称',
    avatar: 'avatar_url',
    type: 'USER'               // 用户类型：USER/AGENT
  },
  thread: {                    // 会话信息
    uid: 'thread_uid',
    type: 'THREAD_TYPE',
    topic: 'thread_topic'
  },
  extra: {                     // 扩展信息
    orgUid: 'organization_id'  // 组织ID
  }
};
```

#### 支持的消息类型

```javascript
// 基础消息类型
const MESSAGE_TYPES = {
  // 基础消息
  TEXT: 'TEXT',               // 文本消息
  IMAGE: 'IMAGE',             // 图片消息
  FILE: 'FILE',               // 文件消息
  VIDEO: 'VIDEO',             // 视频消息
  AUDIO: 'AUDIO',             // 音频消息
  VOICE: 'VOICE',             // 语音消息
  LOCATION: 'LOCATION',       // 位置消息
  .....
};
```

:::tip 消息类型详细说明
如需了解各种消息类型的详细结构、TypeScript定义和使用示例，请参考 [消息类型文档](./message.md)。
:::

#### 1. MQTT 发送消息（首选方式）

当MQTT连接正常时，使用Protobuf格式发送二进制消息：

```javascript
// MQTT发送消息的核心函数
const mqttSendMessage = async (messageUid, messageType, messageContent, currentThread) => {
  console.log('MQTT发送消息:', { messageUid, messageType, messageContent });
  const timestamp = Date.now();

  // 检查MQTT连接状态
  if (mqttClient && mqttClient.connected) {
    // 1. 构建Thread信息
    const thread = new threadProto.Thread();
    thread.setUid(currentThread.uid);
    thread.setType(currentThread.type);
    thread.setTopic(currentThread.topic);
    
    // 设置Thread用户信息
    const threadUser = new userProto.User();
    threadUser.setUid(currentThread.user?.uid);
    threadUser.setNickname(currentThread.user?.nickname);
    threadUser.setAvatar(currentThread.user?.avatar);
    thread.setUser(threadUser);

    // 2. 构建发送者信息（根据会话类型选择不同的用户身份）
    const user = new userProto.User();

    // 需要自己设置用户信息，这里仅为示例：
    const userInfo = getUserInfo();
    user.setUid(userInfo.uid);
    user.setNickname(userInfo.nickname);
    user.setAvatar(userInfo.avatar);
    user.setType('USER');
    
    // 3. 构建消息体
    const messageExtra = {
      orgUid: userInfo?.currentOrganization?.uid // 组织ID
    };
    
    const message = new messageProto.Message();
    message.setUid(messageUid);
    message.setType(messageType);
    message.setStatus('SENDING');
    message.setCreatedat(timestamp);
    message.setChannel('web');
    message.setContent(formatMessageContent(messageType, messageContent));
    message.setUser(user);
    message.setThread(thread);
    message.setExtra(JSON.stringify(messageExtra));

    // 4. 序列化为二进制数据并发送
    const messageData = message.serializeBinary();
    mqttClient.publish(currentThread.topic, messageData, { qos: 0 });

  } else {
    // MQTT连接断开，降级到HTTP发送
    console.log('MQTT连接断开，使用HTTP发送');
    await sendMessageViaHttp(messageUid, messageType, messageContent, currentThread);
  }
};

// 格式化不同类型的消息内容
const formatMessageContent = (messageType, messageContent) => {
  // 文本类型消息直接返回
  const textTypes = ['TEXT', 'WELCOME', 'NOTICE', 'TYPING', 'PROCESSING', 'READ', 'DELIVERED', 'RECALL'];
  if (textTypes.includes(messageType)) {
    return messageContent;
  }

  // 多媒体消息需要转换为JSON格式
  switch (messageType) {
    case 'IMAGE':
      return JSON.stringify({ url: messageContent, type: 'IMAGE' });
    case 'FILE':
      return JSON.stringify({ url: messageContent, type: 'FILE' });
    case 'VIDEO':
      return JSON.stringify({ url: messageContent, type: 'VIDEO' });
    case 'AUDIO':
      return JSON.stringify({ url: messageContent, type: 'AUDIO' });
    case 'VOICE':
      return JSON.stringify({ url: messageContent, type: 'VOICE' });
    case 'LOCATION':
      return JSON.stringify({ address: messageContent, type: 'LOCATION' });
    default:
      return messageContent;
  }
};
```

#### 2. HTTP 发送消息（降级方式）

当MQTT连接不可用时，自动降级使用HTTP REST API：

```javascript
// HTTP降级发送消息
const sendMessageViaHttp = async (messageUid, messageType, messageContent, currentThread) => {
  console.log('HTTP发送消息:', { messageUid, messageType, messageContent });
  
  // 1. 构建HTTP消息格式（JSON格式）
  const messageObject = formatMessageProtobuf(
    currentThread,
    getUserInfo(),
    getAgentInfo(),
    messageUid,
    messageType,
    messageContent,
    Date.now()
  );

  try {
    // 2. 发送HTTP请求
    const messageString = JSON.stringify(messageObject);
    const response = await sendRestMessage(messageString);
    
    console.log('HTTP响应:', response.data);
    
    // 3. 处理响应结果
    if (response.data.code === 200) {
      // 发送成功，更新本地消息状态
      updateMessageStatus(messageObject.uid, 'SUCCESS');
      console.log('HTTP消息发送成功');
      
      // 触发状态更新事件
      emitMessageStatusEvent({
        uid: messageObject.uid,
        type: 'SUCCESS'
      });
    } else {
      // 发送失败
      console.error('HTTP消息发送失败:', response.data.message);
      updateMessageStatus(messageObject.uid, 'FAILED');
      showErrorMessage(response.data.message);
    }
    
  } catch (error) {
    console.error('HTTP发送异常:', error);
    updateMessageStatus(messageObject.uid, 'FAILED');
    
    // 可以将失败的消息存储到本地，待连接恢复后重发
    storeFailedMessage(messageObject);
  }
};

// HTTP消息格式化函数
const formatMessageProtobuf = (currentThread, userInfo, agentInfo, messageUid, messageType, messageContent, timestamp) => {
  return {
    uid: messageUid,
    type: messageType,
    content: formatMessageContent(messageType, messageContent),
    status: 'SENDING',
    createdAt: timestamp,
    channel: 'web',
    user: {
      uid: userInfo.uid,
      nickname: userInfo.nickname,
      avatar: userInfo.avatar,
      type: 'USER'
    },
    thread: {
      uid: currentThread.uid,
      type: currentThread.type,
      topic: currentThread.topic,
      user: {
        uid: currentThread.user?.uid,
        nickname: currentThread.user?.nickname,
        avatar: currentThread.user?.avatar
      }
    },
    extra: {
      orgUid: userInfo?.currentOrganization?.uid
    }
  };
};
```

#### 常用消息发送示例

以下是各种消息类型的基本发送示例：

```javascript
// 发送文本消息
const sendTextMessage = (topic, content) => {
  const messageUid = generateMessageId();
  mqttSendMessage(messageUid, 'TEXT', content, currentThread);
};

// 发送图片消息
const sendImageMessage = (topic, imageUrl) => {
  const messageUid = generateMessageId();
  mqttSendMessage(messageUid, 'IMAGE', imageUrl, currentThread);
};

// 发送文件消息
const sendFileMessage = (topic, fileUrl, fileName) => {
  const messageUid = generateMessageId();
  const fileContent = JSON.stringify({
    url: fileUrl,
    name: fileName,
    size: fileSize,
    type: 'FILE'
  });
  mqttSendMessage(messageUid, 'FILE', fileContent, currentThread);
};

// 发送位置消息
const sendLocationMessage = (topic, latitude, longitude, address) => {
  const messageUid = generateMessageId();
  const locationContent = JSON.stringify({
    latitude: latitude,
    longitude: longitude,
    address: address,
    type: 'LOCATION'
  });
  mqttSendMessage(messageUid, 'LOCATION', locationContent, currentThread);
};

// 发送正在输入状态
const sendTypingStatus = (topic) => {
  const messageUid = generateMessageId();
  mqttSendMessage(messageUid, 'TYPING', '', currentThread);
};
```

:::info 更多消息类型示例
上述仅为基础示例，更多消息类型（如语音、视频、音频、按钮等）的详细实现和完整代码示例，请参考 [消息类型文档](./message.md)，其中包含：

- 完整的TypeScript类型定义
- 详细的JavaScript代码示例  
- 每种消息类型的使用场景说明
- 完整的数据结构文档
:::

#### 消息发送流程总结

1. **自动选择发送方式**：优先使用MQTT，连接断开时自动降级HTTP
2. **统一消息格式**：无论哪种方式，都使用相同的消息结构
3. **即时状态更新**：发送后立即更新本地消息状态，提升用户体验
4. **错误处理**：完善的异常处理和重试机制
5. **多场景支持**：支持普通会话、客服会话等不同场景

这种双重发送机制确保了消息的可靠传输，即使在网络不稳定的情况下也能保证消息正常发送。

### 处理接收消息

```javascript
// 处理接收消息
// 相应文件 [Protobuf](https://gitee.com/270580156/weiyu/tree/main/deploy/protobuf)
import { default as messageProto } from "@/network/protobuf/message_pb";
import { default as threadProto } from "@/network/protobuf/thread_pb";
import { default as userProto } from "@/network/protobuf/user_pb";
// 
const handleReceivedMessage = (topic, messageBinary) => {
  try {
    // 解析protobuf, 解密消息内容
    const messageProtobuf =
      messageProto.Message.deserializeBinary(messageBinary);
    console.log('接收到的消息:', messageProtobuf);
    
    const message = {
      uid: messageProtobuf.getUid(),
      type: messageProtobuf.getType(),
      content: messageProtobuf.getContent(),
      createdAt: messageProtobuf.getCreatedat(),
      user: {
        uid: messageProtobuf.getUser().getUid(),
        nickname: messageProtobuf.getUser().getNickname(),
        avatar: messageProtobuf.getUser().getAvatar()
      }
    };

    // 根据消息类型处理
    switch (message.type) {
      case 'TEXT':
        handleTextMessage(message);
        break;
      case 'IMAGE':
        handleImageMessage(message);
        break;
      case 'FILE':
        handleFileMessage(message);
        break;
      case 'TYPING':
        handleTypingMessage(message);
        break;
      case 'READ':
        handleReadReceipt(message);
        break;
      case 'DELIVERED':
        handleDeliveredReceipt(message);
        break;
      default:
        console.log('未知消息类型:', message.type);
    }
    
  } catch (error) {
    console.error('处理消息错误:', error);
  }
};
```

## 连接管理

### 检查连接状态

```javascript
// 检查是否已连接
const isConnected = () => {
  return mqttClient && mqttClient.connected;
};

// 手动重连
const reconnect = () => {
  if (mqttClient) {
    mqttClient.reconnect();
  }
};

// 断开连接
const disconnect = () => {
  if (mqttClient) {
    mqttClient.end();
  }
};
```

### 错误处理

```javascript
// 连接失败处理
const handleConnectionError = (error) => {
  console.error('MQTT 连接失败:', error);
  
  // 可以在这里实现重试逻辑或降级方案
  if (error.code === 'ECONNREFUSED') {
    console.log('服务器拒绝连接，请检查服务器状态');
  } else if (error.code === 'ENOTFOUND') {
    console.log('找不到服务器，请检查网络连接');
  }
};

// 消息发送失败处理
const handleSendError = (message, error) => {
  console.error('消息发送失败:', error);
  
  // 可以将失败的消息存储到本地，待连接恢复后重发
  storeFailedMessage(message);
};
```

## 最佳实践

### 1. 连接管理

- 在应用启动时建立连接
- 监听网络状态变化，自动重连
- 设置合适的心跳间隔和超时时间

### 2. 消息处理

- 对重要消息实现重发机制
- 避免发送过大的消息
- 合理设置 QoS 级别

### 3. 性能优化

- 批量处理消息订阅
- 使用消息缓存减少重复处理
- 及时取消不需要的订阅

### 4. 错误处理

- 实现完善的错误处理机制
- 提供 HTTP 降级方案
- 记录详细的错误日志

## 示例代码

```javascript
// 完整的MQTT连接和使用示例
import mqtt from 'mqtt';

// 全局MQTT客户端变量
let mqttClient = null;

// 连接函数
const connectToMQTT = async () => {
  const connectOptions = {
    uid: 'user123',
    username: 'your_username',
    accessToken: 'your_access_token'
  };

  // 建立连接
  mqttClient = mqttConnect(connectOptions);

  // 添加事件监听
  mqttClient.on('connect', () => {
    console.log('MQTT 连接成功');
    
    // 连接成功后可以订阅主题
    const userTopic = `user/${connectOptions.uid}/messages`;
    mqttClient.subscribe(userTopic, { qos: 0 });
  });

  mqttClient.on('message', (topic, message) => {
    handleReceivedMessage(topic, message);
  });

  mqttClient.on('error', (error) => {
    console.error('MQTT 连接错误:', error);
  });
};

// 发送消息函数
const sendMessage = (topic, content, type = 'TEXT') => {
  if (mqttClient && mqttClient.connected) {
    const message = {
      uid: generateMessageId(),
      type: type,
      content: content,
      timestamp: Date.now()
    };
    
    const messageData = JSON.stringify(message);
    mqttClient.publish(topic, messageData);
    console.log('消息发送成功');
  } else {
    console.log('MQTT未连接，无法发送消息');
  }
};

// 应用启动时连接MQTT
document.addEventListener('DOMContentLoaded', () => {
  connectToMQTT();
});

// 使用示例
setTimeout(() => {
  if (isConnected()) {
    sendMessage('user/123/messages', 'Hello World!');
  }
}, 2000);
```

## 参考连接

- [MQTT.js 官方文档](https://github.com/mqttjs/MQTT.js)
- [Protobuf](https://gitee.com/270580156/weiyu/tree/main/deploy/protobuf)
