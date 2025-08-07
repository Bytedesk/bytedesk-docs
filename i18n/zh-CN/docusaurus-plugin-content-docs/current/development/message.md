---
sidebar_label: 对话消息
sidebar_position: 12
---

# 对话消息

微语系统支持多种消息类型，满足不同场景下的沟通需求。每种消息类型有其特定的数据结构和显示方式。

:::info 消息发送函数说明
本文档中所有代码示例都使用 `mqttSendMessage` 函数来发送消息。该函数的详细实现和使用方法请参考 [MQTT长连接文档](./mqtt.md#发送消息)。

**函数签名：**

```javascript
mqttSendMessage(messageUid, messageType, messageContent, currentThread)
```

**参数说明：**

- `messageUid`: 消息唯一标识符
- `messageType`: 消息类型（如 "TEXT", "IMAGE", "FILE" 等）
- `messageContent`: 消息内容（文本消息为字符串，其他类型为JSON字符串）
- `currentThread`: 当前会话对象

:::

## 消息基础结构

所有消息都遵循统一的基础数据结构：

```typescript
type MessageResponse = {
  uid?: string;           // 消息唯一标识
  type: string;          // 消息类型
  content?: string;      // 消息内容（JSON字符串或纯文本）
  status: string;        // 消息状态
  createdAt?: string;    // 创建时间
  channel?: string;      // 发送渠道
  extra?: MessageExtra;  // 扩展信息
  timestamp?: number;    // 时间戳
  thread?: THREAD.ThreadResponse;  // 会话信息
  user?: USER.UserProtobuf;        // 用户信息
};

type MessageExtra = {
  translation?: string;     // 翻译内容
  orgUid?: string;         // 企业ID
};
```

## 消息类型

### 文本消息

最基础的消息类型，用于发送纯文本内容。文本消息的content字段直接存储字符串，无需JSON格式包装。

**代码示例：**

```javascript
// 发送文本消息
const sendTextMessage = (content) => {
  const message = {
    uid: generateMessageId(),
    type: "TEXT",
    content: content,  // 直接传入字符串，不需要JSON.stringify
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendTextMessage("您好，请问有什么可以帮助您的吗？");
```

**使用场景：**

- 一般文字交流
- 简单问答
- 指令发送

### 图片消息

用于发送和显示图片。

**数据结构：**

```typescript
type ImageContent = {
  url: string;           // 图片URL
  width?: string;        // 图片宽度
  height?: string;       // 图片高度
  label?: string;        // 图片标签/说明
  mimeType?: string;     // MIME类型 (如: image/jpeg, image/png)
  size?: string;         // 文件大小 (字节)
  hash?: string;         // 文件哈希值 (SHA256)
  thumbnail?: string;    // 缩略图URL
  filename?: string;     // 文件名
};
```

**代码示例：**

```javascript
// 发送图片消息
const sendImageMessage = (imageUrl, options = {}) => {
  const imageContent = {
    url: imageUrl,
    width: options.width || "300",
    height: options.height || "200",
    mimeType: options.mimeType || "image/jpeg",
    size: options.size,
    filename: options.filename,
    label: options.label || "图片"
  };
  
  const message = {
    uid: generateMessageId(),
    type: "IMAGE",
    content: JSON.stringify(imageContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendImageMessage("https://example.com/product.jpg", {
  width: "400",
  height: "300",
  filename: "product.jpg",
  label: "产品展示图"
});
```

**使用场景：**

- 产品展示
- 问题截图
- 图片资料分享

### 语音消息

用于发送语音录音。

**数据结构：**

```typescript
type VoiceContent = {
  url: string;       // 语音文件URL
  duration?: string; // 语音时长（秒）
  format?: string;   // 文件格式（如ogg, mp3）
  caption?: string;  // 语音说明文字
  label?: string;    // 语音标签
};
```

**代码示例：**

```javascript
// 发送语音消息
const sendVoiceMessage = (voiceUrl, duration, options = {}) => {
  const voiceContent = {
    url: voiceUrl,
    duration: duration.toString(),
    format: options.format || "ogg",
    caption: options.caption,
    label: options.label || "语音消息"
  };
  
  const message = {
    uid: generateMessageId(),
    type: "VOICE",
    content: JSON.stringify(voiceContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendVoiceMessage("https://example.com/voice.ogg", 15, {
  format: "ogg",
  caption: "语音回复",
  label: "客服语音"
});
```

**使用场景：**

- 语音留言
- 语音回复
- 语音指导

### 视频消息

用于发送视频内容。

**数据结构：**

```typescript
type VideoContent = {
  url: string;           // 视频URL
  coverUrl?: string;     // 视频封面URL
  duration?: string;     // 视频时长 (秒)
  width?: string;        // 视频宽度
  height?: string;       // 视频高度
  format?: string;       // 视频格式 (兼容性字段)
  mimeType?: string;     // MIME类型 (如: video/mp4, video/avi)
  label?: string;        // 视频标签/说明
  size?: string;         // 文件大小 (字节)
  hash?: string;         // 文件哈希值 (SHA256)
  filename?: string;     // 文件名
  caption?: string;      // 视频说明文字
};
```

**代码示例：**

```javascript
// 发送视频消息
const sendVideoMessage = (videoUrl, options = {}) => {
  const videoContent = {
    url: videoUrl,
    coverUrl: options.coverUrl,
    duration: options.duration?.toString(),
    width: options.width || "640",
    height: options.height || "480",
    mimeType: options.mimeType || "video/mp4",
    size: options.size,
    filename: options.filename,
    caption: options.caption,
    label: options.label || "视频"
  };
  
  const message = {
    uid: generateMessageId(),
    type: "VIDEO",
    content: JSON.stringify(videoContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendVideoMessage("https://example.com/demo.mp4", {
  coverUrl: "https://example.com/cover.jpg",
  duration: 120,
  width: "800",
  height: "600",
  filename: "product_demo.mp4",
  caption: "产品演示视频"
});
```

**使用场景：**

- 产品演示视频
- 操作指导视频
- 视频反馈

### 文件消息

用于发送各类文件。

**数据结构：**

```typescript
type FileContent = {
  url: string;           // 文件URL
  name?: string;         // 文件名称
  size?: string;         // 文件大小 (字节)
  type?: string;         // 文件MIME类型
  label?: string;        // 文件标签/说明
  hash?: string;         // 文件哈希值 (SHA256)
  filename?: string;     // 文件名 (兼容性字段)
};
```

**代码示例：**

```javascript
// 发送文件消息
const sendFileMessage = (fileUrl, options = {}) => {
  const fileContent = {
    url: fileUrl,
    name: options.name || options.filename,
    size: options.size?.toString(),
    type: options.type || "application/octet-stream",
    label: options.label || "文件",
    hash: options.hash,
    filename: options.filename
  };
  
  const message = {
    uid: generateMessageId(),
    type: "FILE",
    content: JSON.stringify(fileContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendFileMessage("https://example.com/contract.pdf", {
  name: "服务合同.pdf",
  size: "1024000",
  type: "application/pdf",
  label: "合同文件",
  filename: "contract.pdf"
});
```

**使用场景：**

- 文档传输
- 合同发送
- 资料共享

### 文档消息

专门用于各类文档的发送和显示。

**数据结构：**

```typescript
type DocumentContent = {
  url: string;           // 文档文件URL
  name?: string;         // 文件名称
  size?: string;         // 文件大小 (字节)
  type?: string;         // 文件MIME类型
  caption?: string;      // 文档说明文字
  thumbnail?: string;    // 缩略图URL
  label?: string;        // 文档标签
  hash?: string;         // 文件哈希值 (SHA256)
  filename?: string;     // 文件名 (兼容性字段)
};
```

**代码示例：**

```javascript
// 发送文档消息
const sendDocumentMessage = (docUrl, options = {}) => {
  const documentContent = {
    url: docUrl,
    name: options.name,
    size: options.size?.toString(),
    type: options.type || "application/pdf",
    caption: options.caption,
    thumbnail: options.thumbnail,
    label: options.label || "文档",
    hash: options.hash,
    filename: options.filename
  };
  
  const message = {
    uid: generateMessageId(),
    type: "DOCUMENT",
    content: JSON.stringify(documentContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendDocumentMessage("https://example.com/manual.pdf", {
  name: "用户手册.pdf",
  size: "2048000",
  type: "application/pdf",
  caption: "产品使用手册，请仔细阅读",
  thumbnail: "https://example.com/manual_thumb.jpg",
  label: "用户手册"
});
```

**使用场景：**

- PDF文档共享
- Office文档分享
- 技术文档传输

### 音频消息

用于发送音频文件。

**数据结构：**

```typescript
type AudioContent = {
  url: string;           // 音频URL
  duration?: string;     // 音频时长 (秒)
  format?: string;       // 音频格式 (兼容性字段)
  mimeType?: string;     // MIME类型 (如: audio/mp3, audio/wav)
  label?: string;        // 音频标签/说明
  size?: string;         // 文件大小 (字节)
  hash?: string;         // 文件哈希值 (SHA256)
  filename?: string;     // 文件名
  caption?: string;      // 音频说明文字
};
```

**代码示例：**

```javascript
// 发送音频消息
const sendAudioMessage = (audioUrl, options = {}) => {
  const audioContent = {
    url: audioUrl,
    duration: options.duration?.toString(),
    mimeType: options.mimeType || "audio/mp3",
    label: options.label || "音频",
    size: options.size?.toString(),
    filename: options.filename,
    caption: options.caption
  };
  
  const message = {
    uid: generateMessageId(),
    type: "AUDIO",
    content: JSON.stringify(audioContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendAudioMessage("https://example.com/audio.mp3", {
  duration: 180,
  mimeType: "audio/mp3",
  filename: "background_music.mp3",
  caption: "背景音乐文件",
  label: "音频文件"
});
```

**使用场景：**

- 音乐分享
- 音频资料

### 音乐消息

专门用于音乐分享的消息类型。

**数据结构：**

```typescript
type MusicContent = {
  url: string;
  title?: string;
  artist?: string;
  album?: string;
  coverUrl?: string;
  duration?: string;
  label?: string;
};
```

**代码示例：**

```javascript
// 发送音乐消息
const sendMusicMessage = (musicUrl, options = {}) => {
  const musicContent = {
    url: musicUrl,
    title: options.title || "未知歌曲",
    artist: options.artist || "未知艺术家",
    album: options.album,
    coverUrl: options.coverUrl,
    duration: options.duration?.toString(),
    label: options.label || "音乐分享"
  };
  
  const message = {
    uid: generateMessageId(),
    type: "MUSIC",
    content: JSON.stringify(musicContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendMusicMessage("https://example.com/song.mp3", {
  title: "夜空中最亮的星",
  artist: "逃跑计划",
  album: "世界",
  coverUrl: "https://example.com/album_cover.jpg",
  duration: 240,
  label: "推荐歌曲"
});
```

**使用场景：**

- 音乐推荐
- 音乐分享

### 位置消息

用于分享地理位置信息。

**数据结构：**

```typescript
type LocationContent = {
  latitude?: string;      // 纬度
  longitude?: string;     // 经度
  address?: string;       // 地址
  label?: string;         // 位置标签/名称
};
```

**代码示例：**

```javascript
// 发送位置消息
const sendLocationMessage = (options = {}) => {
  const locationContent = {
    latitude: options.latitude?.toString(),
    longitude: options.longitude?.toString(),
    address: options.address,
    label: options.label || "位置信息"
  };
  
  const message = {
    uid: generateMessageId(),
    type: "LOCATION",
    content: JSON.stringify(locationContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendLocationMessage({
  latitude: 39.9042,
  longitude: 116.4074,
  address: "北京市东城区天安门广场",
  label: "天安门广场"
});
```

**使用场景：**

- 位置共享
- 商家地址发送
- 集合地点说明

### 链接消息

用于分享网页链接或其他URL资源。

**数据结构：**

```typescript
type LinkContent = {
  url?: string;            // 链接地址
  title?: string;          // 链接标题
  description?: string;    // 链接描述
  imageUrl?: string;       // 预览图片URL
  label?: string;          // 链接标签
};
```

**代码示例：**

```javascript
// 发送链接消息
const sendLinkMessage = (options = {}) => {
  const linkContent = {
    url: options.url,
    title: options.title || "链接分享",
    description: options.description,
    imageUrl: options.imageUrl,
    label: options.label
  };
  
  const message = {
    uid: generateMessageId(),
    type: "LINK", 
    content: JSON.stringify(linkContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例
sendLinkMessage({
  url: "https://www.example.com",
  title: "技术博客",
  description: "最新的技术分享和开发教程",
  imageUrl: "https://www.example.com/preview.jpg",
  label: "推荐阅读"
});
```

**使用场景：**

- 网页分享
- 产品推荐
- 文档链接
- 文章推荐
- 产品链接

### 按钮消息

用于发送包含交互按钮的消息。

**数据结构：**

```typescript
type ButtonContent = {
  type?: string;        // 按钮类型 (web_url, postback, phone_number等)
  title?: string;       // 按钮文本标题  
  payload?: string;     // 按钮载荷数据（用于回调）
  url?: string;         // 按钮点击跳转链接（适用于web_url类型）
};
```

**代码示例：**

```javascript
// 发送按钮消息
const sendButtonMessage = (options = {}) => {
  const buttonContent = {
    type: options.type || "postback",
    title: options.title || "点击按钮",
    payload: options.payload,
    url: options.url
  };
  
  const message = {
    uid: generateMessageId(),
    type: "BUTTON",
    content: JSON.stringify(buttonContent),
    status: "SENDING",
    createdAt: new Date().toISOString(),
    channel: "web"
  };
  
  mqttSendMessage(message.uid, message.type, message.content, currentThread);
};

// 使用示例 - 网页链接按钮
sendButtonMessage({
  type: "web_url",
  title: "查看详情",
  url: "https://www.example.com/details"
});

// 使用示例 - 回调按钮
sendButtonMessage({
  type: "postback",
  title: "确认操作",
  payload: "CONFIRM_ACTION"
});

// 使用示例 - 电话按钮
sendButtonMessage({
  type: "phone_number",
  title: "联系客服",
  payload: "+86-400-123-4567"
});
```

**使用场景：**

- 菜单选择
- 快捷操作
- 引导式交互
- 确认对话框

### 机器人消息

AI机器人自动回复的消息。

**属性：**

- 问题内容
- 答案内容
- 相关推荐

**使用场景：**

- 自动问答
- 智能客服
- 知识库查询

## 消息撤回

微语支持消息撤回功能，允许用户在发送后的一定时间内撤回已发送的消息。

**撤回限制：**

- 时间限制：消息发送后5分钟内可撤回
- 权限限制：只能撤回自己发送的消息

**撤回显示：**

- 撤回后，双方会看到"此消息已撤回"的提示

## 消息引用

支持引用回复功能，可以引用之前的消息内容进行回复，便于消息关联。

## 相关文档

:::tip 完整实现指南
本文档提供了各种消息类型的数据结构和基本使用示例。要了解完整的消息发送实现，包括MQTT连接管理、错误处理、HTTP降级等详细功能，请查看：

📖 **[MQTT长连接文档](./mqtt.md)** - 包含完整的mqttSendMessage函数实现和使用指南

该文档详细介绍了：

- MQTT连接建立和管理
- 消息发送的完整流程
- 自动降级到HTTP的处理机制
- 错误处理和重试策略
- 最佳实践建议

:::
