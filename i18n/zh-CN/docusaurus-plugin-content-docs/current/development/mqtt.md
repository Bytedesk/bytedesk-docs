---
sidebar_label: 长连接
sidebar_position: 33
---

# MQTT 长连接

MQTT (Message Queuing Telemetry Transport) 是一种轻量级的发布/订阅消息传输协议，适用于实时通信场景。微语使用 MQTT 协议实现客户端与服务器之间的长连接通信，支持实时消息收发。

## 快速开始

### 1. 安装依赖

```bash
npm install mqtt
```

### 2. 建立连接

```javascript
import mqtt from 'mqtt';

// 连接参数类型定义
type mqttConnectOptions = {
  uid: string;        // 用户唯一标识符
  username: string;   // 用户名，用于MQTT认证
  accessToken: string; // 访问令牌，作为MQTT密码进行认证
};

// 连接参数示例
const connectOptions = {
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

  // 连接 MQTT 服务器
  const client = mqtt.connect('wss://your-mqtt-server.com', options);
  
  return client;
};
```

### 3. 添加事件监听

```javascript
// 连接成功事件
client.on('connect', () => {
  console.log('MQTT 连接成功');
  // 可以在这里订阅主题
});

// 接收消息事件
client.on('message', (topic, message, packet) => {
  console.log('收到消息:', {
    topic: topic,
    message: message.toString(),
    packet: packet
  });
  
  // 处理收到的消息
  handleReceivedMessage(topic, message);
});

// 重连事件
client.on('reconnect', () => {
  console.log('MQTT 重新连接中...');
});

// 连接关闭事件
client.on('close', () => {
  console.log('MQTT 连接已关闭');
});

// 错误事件
client.on('error', (error) => {
  console.error('MQTT 连接错误:', error);
});

// 离线事件
client.on('offline', () => {
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
    type: 'USER'               // 用户类型：USER/AGENT/MEMBER
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
  
  // 业务消息
  WELCOME: 'WELCOME',         // 欢迎消息
  ARTICLE: 'ARTICLE',         // 文章消息
  GOODS: 'GOODS',             // 商品消息
  ORDER: 'ORDER',             // 订单消息
  
  // 状态消息
  TYPING: 'TYPING',           // 正在输入
  PROCESSING: 'PROCESSING',   // 正在处理
  STREAM: 'STREAM',           // 流式输出
  PREVIEW: 'PREVIEW',         // 消息预览
  
  // 回执消息
  DELIVERED: 'DELIVERED',     // 已送达回执
  READ: 'READ',               // 已读回执
  
  // 系统消息
  NOTICE: 'NOTICE',           // 系统通知
  RECALL: 'RECALL',           // 消息撤回
  
  // 会话管理
  TRANSFER: 'TRANSFER',       // 转接消息
  TRANSFER_ACCEPT: 'TRANSFER_ACCEPT', // 接受转接
  TRANSFER_REJECT: 'TRANSFER_REJECT', // 拒绝转接
  INVITE: 'INVITE',           // 邀请消息
  INVITE_ACCEPT: 'INVITE_ACCEPT',     // 接受邀请
  INVITE_REJECT: 'INVITE_REJECT',     // 拒绝邀请
  
  // 评价相关
  RATE_INVITE: 'RATE_INVITE', // 邀请评价
  RATE_SUBMIT: 'RATE_SUBMIT', // 提交评价
  RATE_CANCEL: 'RATE_CANCEL', // 取消评价
};
```

#### 1. MQTT 发送消息（首选方式）

当MQTT连接正常时，使用Protobuf格式发送二进制消息：

```javascript
// MQTT发送消息的核心函数
const mqttSendMessage = async (messageUid, messageType, messageContent, currentThread, fromTicketTab = false) => {
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
    
    if (fromTicketTab) {
      // 工单会话：使用成员信息
      const memberInfo = getMemberInfo();
      user.setUid(memberInfo?.uid);
      user.setNickname(memberInfo?.nickname);
      user.setAvatar(memberInfo?.avatar);
      user.setType('MEMBER');
    } else if (isCustomerServiceThread(currentThread)) {
      // 客服会话：使用客服信息
      const agentInfo = getAgentInfo();
      user.setUid(agentInfo?.uid);
      user.setNickname(agentInfo?.nickname);
      user.setAvatar(agentInfo?.avatar);
      user.setType('AGENT');
    } else {
      // 普通会话：使用用户信息
      const userInfo = getUserInfo();
      user.setUid(userInfo.uid);
      user.setNickname(userInfo.nickname);
      user.setAvatar(userInfo.avatar);
      user.setType('USER');
    }

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

    // 5. 立即更新本地消息状态
    const messageResponse = {
      uid: message.getUid(),
      type: message.getType(),
      content: messageContent,
      channel: message.getChannel(),
      createdAt: message.getCreatedat(),
      status: message.getStatus(),
      thread: {
        uid: message.getThread().getUid(),
        type: message.getThread().getType(),
        topic: message.getThread().getTopic(),
      },
      user: {
        uid: message.getUser().getUid(),
        nickname: message.getUser().getNickname(),
        avatar: message.getUser().getAvatar(),
      },
    };
    
    // 添加到本地消息存储
    addMessageToStore(messageResponse);
    console.log('MQTT消息发送成功');
    
  } else {
    // MQTT连接断开，降级到HTTP发送
    console.log('MQTT连接断开，使用HTTP发送');
    await sendMessageViaHttp(messageUid, messageType, messageContent, currentThread, fromTicketTab);
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
const sendMessageViaHttp = async (messageUid, messageType, messageContent, currentThread, fromTicketTab) => {
  console.log('HTTP发送消息:', { messageUid, messageType, messageContent });
  
  // 1. 构建HTTP消息格式（JSON格式）
  let messageObject;
  
  if (fromTicketTab) {
    // 工单消息格式
    const memberInfo = getMemberInfo();
    messageObject = formatMessageProtobufTicket(
      currentThread,
      getUserInfo(),
      memberInfo,
      messageUid,
      messageType,
      messageContent,
      Date.now()
    );
  } else {
    // 普通消息格式
    messageObject = formatMessageProtobuf(
      currentThread,
      getUserInfo(),
      getAgentInfo(),
      messageUid,
      messageType,
      messageContent,
      Date.now()
    );
  }

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

```javascript
// 发送文本消息
const sendTextMessage = (topic, content) => {
  const messageUid = generateMessageId();
  mqttSendMessage(messageUid, 'TEXT', content, currentThread, false);
};

// 发送图片消息
const sendImageMessage = (topic, imageUrl) => {
  const messageUid = generateMessageId();
  mqttSendMessage(messageUid, 'IMAGE', imageUrl, currentThread, false);
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
  mqttSendMessage(messageUid, 'FILE', fileContent, currentThread, false);
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
  mqttSendMessage(messageUid, 'LOCATION', locationContent, currentThread, false);
};

// 发送正在输入状态
const sendTypingStatus = (topic) => {
  const messageUid = generateMessageId();
  mqttSendMessage(messageUid, 'TYPING', '', currentThread, false);
};
```

#### 消息发送流程总结

1. **自动选择发送方式**：优先使用MQTT，连接断开时自动降级HTTP
2. **统一消息格式**：无论哪种方式，都使用相同的消息结构
3. **即时状态更新**：发送后立即更新本地消息状态，提升用户体验
4. **错误处理**：完善的异常处理和重试机制
5. **多场景支持**：支持普通会话、客服会话、工单会话等不同场景

这种双重发送机制确保了消息的可靠传输，即使在网络不稳定的情况下也能保证消息正常发送。
```

### 处理接收消息

```javascript
const handleReceivedMessage = (topic, messageBinary) => {
  try {
    // 解析 protobuf 消息
    const messageProtobuf = parseProtobufMessage(messageBinary);
    
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

    // 发送消息回执
    if (shouldSendReceipt(message.type)) {
      sendReceiptMessage(topic, message.uid);
    }
    
  } catch (error) {
    console.error('处理消息错误:', error);
  }
};
```

### 消息回执

```javascript
// 发送已送达回执
const sendDeliveredReceipt = (topic, messageId) => {
  sendMessage(topic, 'DELIVERED', messageId);
};

// 发送已读回执
const sendReadReceipt = (topic, messageId) => {
  sendMessage(topic, 'READ', messageId);
};

// 发送正在输入状态
const sendTypingStatus = (topic) => {
  sendMessage(topic, 'TYPING', '');
};
```

## 连接管理

### 检查连接状态

```javascript
// 检查是否已连接
const isConnected = () => {
  return client && client.connected;
};

// 手动重连
const reconnect = () => {
  if (client) {
    client.reconnect();
  }
};

// 断开连接
const disconnect = () => {
  if (client) {
    client.end();
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

[MQTT.js 官方文档](https://github.com/mqttjs/MQTT.js)

## 参考连接

- [MQTT.js 官方文档](https://github.com/mqttjs/MQTT.js)
