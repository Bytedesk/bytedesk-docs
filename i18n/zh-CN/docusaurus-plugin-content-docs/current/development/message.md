---
sidebar_label: 消息结构
sidebar_position: 12
---

# 对话消息结构

本文仅描述消息 `type` 与 `content` 的结构。

## 消息基础结构

所有消息都遵循统一的基础数据结构：

```typescript
type MessageResponse = {
  uid?: string;           // 消息唯一标识
  type: string;          // 消息类型
  content?: unknown;     // 消息内容：部分类型为字符串（如 TEXT/NOTICE/CONTINUE/READ/DELIVERED/RECALL）；其它类型为对象（见下方结构定义）
  status: string;        // 消息状态
  createdAt?: string;    // 创建时间
  channel?: string;      // 发送渠道
  extra?: unknown;       // 扩展信息：格式不固定
  timestamp?: number;    // 时间戳
  thread?: THREAD.ThreadResponse;  // 会话信息
  user?: USER.UserProtobuf;        // 用户信息
};
```

## content 对象结构对照

说明：本文仅展示已确认 `content` 结构的消息类型；结构尚未明确的类型不在此页展示。

## 消息类型结构

### WELCOME（欢迎消息）

```typescript
type WelcomeContent = {
  content?: string; // 欢迎消息文本
  faqs?: Array<{
    uid?: string; // FAQ uid
    question?: string; // 问题
    answer?: string; // 答案
    type?: string; // 类型
  }>; // 常见问题列表（精简结构）
  kbUid?: string; // 关联知识库 uid
};
```

### CONTINUE（继续会话）

```typescript
type ContinueContent = string; // 继续会话提示文本
```

### SYSTEM（系统消息）

```typescript
type SystemContent = string; // 系统消息文本（目前以字符串为主）
```

### NOTICE（通知消息）

```typescript
type NoticeContent = string; // 通知消息文本
```

### TEXT（文本消息）

说明：`content` 为字符串，支持任意格式（纯文本/Markdown/HTML/JSON 字符串等）。

```typescript
type TextContent = string; // 文本内容：支持任意格式字符串（纯文本/Markdown/HTML/JSON 字符串等）
```

### IMAGE（图片消息）

```typescript
type ImageContent = {
  url?: string; // 图片 URL
  content?: string; // HTML 正文
  textContent?: string; // 纯文本正文
  attachments?: Array<{
    filename?: string; // 文件名
    name?: string; // 显示名称
    mimeType?: string; // MIME 类型
    size?: string; // 大小（字节，字符串存储）
    url?: string; // 附件 URL
    hash?: string; // 哈希
    description?: string; // 描述
    contentId?: string; // Content-ID（内联附件）
    isInline?: boolean; // 是否内联
  }>; // 附件列表
  label?: string; // 标签/说明
};
```

### DOCUMENT（文档消息）

```typescript
type DocumentContent = {
  url?: string; // 文档 URL
  name?: string; // 展示名称
  size?: string; // 文件大小（字节，字符串存储）
  type?: string; // MIME 类型
  caption?: string; // 说明文字
  thumbnail?: string; // 缩略图 URL
  label?: string; // 标签/说明
  hash?: string; // 文件哈希
  filename?: string; // 文件名（兼容字段）
};
```

### AUDIO（音频消息）

```typescript
type AudioContent = {
  url?: string; // 音频 URL
  duration?: string; // 时长（秒，字符串存储）
  format?: string; // 格式（兼容字段）
  mimeType?: string; // MIME 类型
  label?: string; // 标签/说明
  size?: string; // 文件大小（字节，字符串存储）
  hash?: string; // 文件哈希
  filename?: string; // 文件名
  caption?: string; // 说明文字
};
```

### VOICE（语音消息）

```typescript
type VoiceContent = {
  url?: string; // 语音 URL
  duration?: string; // 时长（秒，字符串存储）
  format?: string; // 格式（如 ogg/mp3）
  caption?: string; // 说明文字
  label?: string; // 标签/说明
};
```

### VIDEO（视频消息）

```typescript
type VideoContent = {
  url?: string; // 视频 URL
  coverUrl?: string; // 封面 URL
  duration?: string; // 时长（秒，字符串存储）
  width?: string; // 宽度
  height?: string; // 高度
  format?: string; // 格式（兼容字段）
  mimeType?: string; // MIME 类型
  label?: string; // 标签/说明
  size?: string; // 文件大小（字节，字符串存储）
  hash?: string; // 文件哈希
  filename?: string; // 文件名
  caption?: string; // 说明文字
};
```

### MUSIC（音乐消息）

```typescript
type MusicContent = {
  url?: string; // 音乐 URL
  title?: string; // 标题
  artist?: string; // 艺术家
  album?: string; // 专辑
  coverUrl?: string; // 封面 URL
  duration?: string; // 时长（秒，字符串存储）
  label?: string; // 标签/说明
};
```

### LOCATION（位置消息）

```typescript
type LocationContent = {
  latitude?: string; // 纬度
  longitude?: string; // 经度
  address?: string; // 地址
  label?: string; // 位置标签/名称
};
```

### LINK（链接消息）

```typescript
type LinkContent = {
  url?: string; // 链接 URL
  title?: string; // 标题
  description?: string; // 描述
  imageUrl?: string; // 预览图 URL
  label?: string; // 标签/说明
};
```

### URL（网址消息）

```typescript
type UrlContent = {
  url?: string; // URL
  target?: string; // 打开方式（如 _blank/_self）
  title?: string; // 标题
  description?: string; // 描述
  imageUrl?: string; // 预览图
  label?: string; // 标签/说明
};
```

### BUTTON（按钮消息）

```typescript
type ButtonContent = {
  type?: string; // 按钮类型（web_url/postback/phone_number/...）
  title?: string; // 标题
  payload?: string; // 回传载荷
  url?: string; // URL
  webviewHeightRatio?: string; // webview 高度（compact/tall/full）
  messengerExtensions?: boolean; // 是否启用扩展
  fallbackUrl?: string; // 备用 URL
  webviewShareButton?: string; // webview 分享按钮设置
  viewStyle?: string; // 视图样式
  enableShareButton?: boolean; // 是否启用分享按钮
  gameMetadata?: {
    playerId?: string; // 玩家ID
    contextId?: string; // 上下文ID
  }; // 游戏元数据
  timezone?: string; // 时区
};
```

### QUOTATION（引用消息）

```typescript
type QuotationContent = {
  content?: string; // 当前消息的文本内容
  quotedMessageType?: string; // 被引用消息类型（枚举名字符串）
  quotedContent?: string; // 被引用消息原始内容（文本或 JSON 字符串）
  quotedMessageUid?: string; // 被引用消息 uid
  quotedSenderName?: string; // 被引用消息发送人名称
  quotedSenderUid?: string; // 被引用消息发送人 uid
  quotedCreatedAt?: string; // 被引用消息发送时间（字符串化时间）
};
```

### STICKER（贴纸）

```typescript
type StickerContent = {
  url?: string; // 贴纸 URL
  label?: string; // 标签/说明
  mimeType?: string; // MIME 类型
  size?: string; // 文件大小（字节，字符串存储）
  hash?: string; // 文件哈希
  filename?: string; // 文件名
  caption?: string; // 说明文字
};
```

### TYPING（正在输入）

```typescript
type TypingContent = {}; // 正在输入（当前无字段）
```

### PREVIEW（消息预知）

```typescript
type PreviewContent = {
  v?: number; // 版本号
  content?: string; // 预览文本
  clear?: boolean; // 是否清空预览
  ts?: number; // 时间戳（毫秒）
};
```

### PROCESSING（正在处理）

```typescript
type ProcessingContent = {}; // 处理中（通常仅作为状态提示）
```

### RECALL（撤回）

```typescript
type RecallContent = string; // 被撤回消息 uid
```

### DELIVERED（回执：已送达）

```typescript
type DeliveredContent = string; // 被回执消息 uid
```

### READ（回执：已读）

```typescript
type ReadContent = string; // 被回执消息 uid
```

### QUEUE（排队消息）

```typescript
type QueueContent = {
  content?: string; // 排队提示文本
  position?: number; // 排队位置（从 1 开始）
  queueSize?: number; // 队列总人数（含自己）
  waitSeconds?: number; // 预计等待秒数（可为 null 表示无法估算）
  estimatedWaitTime?: string; // 人性化等待时间描述（如 "约5分钟"）
  serverTimestamp?: number; // 服务端时间戳（毫秒）
};
```

### QUEUE_UPDATE（排队更新消息）

```typescript
type QueueUpdateContent = {
  content?: string; // 排队提示文本
  position?: number; // 排队位置（从 1 开始）
  queueSize?: number; // 队列总人数（含自己）
  waitSeconds?: number; // 预计等待秒数
  estimatedWaitTime?: string; // 人性化等待时间
  serverTimestamp?: number; // 服务端时间戳（毫秒）
};
```

### QUEUE_ACCEPT（排队接受消息）

```typescript
type QueueAcceptContent = {
  content?: string; // 排队提示文本
  position?: number;
  queueSize?: number;
  waitSeconds?: number;
  estimatedWaitTime?: string;
  serverTimestamp?: number;
};
```

### QUEUE_TIMEOUT（排队超时消息）

```typescript
type QueueTimeoutContent = {
  content?: string; // 排队提示文本
  position?: number;
  queueSize?: number;
  waitSeconds?: number;
  estimatedWaitTime?: string;
  serverTimestamp?: number;
};
```

### QUEUE_CANCEL（排队取消消息）

```typescript
type QueueCancelContent = {
  content?: string; // 排队提示文本
  position?: number;
  queueSize?: number;
  waitSeconds?: number;
  estimatedWaitTime?: string;
  serverTimestamp?: number;
};
```

### QUEUE_NOTICE（排队通知消息）

```typescript
type QueueNotificationContent = {
  queueMemberUid?: string; // 队列成员 uid
  threadUid?: string; // 会话 uid
  threadTopic?: string; // 会话 topic
  position?: number; // 排队位置
  queueSize?: number; // 队列总人数
  estimatedWaitMs?: number; // 预计等待毫秒
  serverTimestamp?: number; // 服务端时间戳（毫秒）
  user?: string; // 访客信息（UserProtobuf 的 JSON 字符串）
};
```

### FORM（表单）

```typescript
type FormContent = {
  formUid?: string; // 表单 uid
  formSchema?: string; // 表单 schema 快照（字符串/JSON）
  formVersion?: number; // 表单版本
};
```

### FORM_SUBMIT（表单提交）

```typescript
type FormSubmitContent = {
  formUid?: string; // 表单 uid
  formSchema?: string; // 表单 schema 快照（字符串/JSON）
  formVersion?: number; // 表单版本
};
```

### CHOICE（选择消息）

```typescript
type ChoiceContent = {
  choiceUid?: string; // 选择消息 uid
  content?: string; // 提示文本/问题
  hint?: string; // 辅助说明
  multiple?: boolean; // 是否多选
  minSelect?: number; // 最少选择数量
  maxSelect?: number; // 最多选择数量
  options?: Array<{
    optionUid?: string; // 选项 uid
    title?: string; // 标题
    value?: string; // 值（提交/回传）
    description?: string; // 描述
    payload?: string; // payload（兼容按钮/回传）
    disabled?: boolean; // 是否禁用
  }>; // 选项列表
  selectedValues?: string[]; // 已选值
};
```

### CHOICE_SUBMIT（选择提交）

```typescript
type ChoiceSubmitContent = {
  choiceUid?: string;
  content?: string;
  hint?: string;
  multiple?: boolean;
  minSelect?: number;
  maxSelect?: number;
  options?: Array<{
    optionUid?: string;
    title?: string;
    value?: string;
    description?: string;
    payload?: string;
    disabled?: boolean;
  }>;
  selectedValues?: string[];
};
```

### LEAVE_MSG（留言）

```typescript
type LeaveMsgContent = {
  content?: string; // 留言内容
  status?: string; // 状态
};
```

### LEAVE_MSG_SUBMIT（留言提交）

```typescript
type LeaveMsgSubmitContent = {
  content?: string;
  status?: string;
};
```

### LEAVE_MSG_REPLIED（留言回复）

```typescript
type LeaveMsgRepliedContent = {
  content?: string;
  status?: string;
};
```

### ROBOT（机器人消息）

```typescript
type RobotContent = {
  question?: string; // 用户提问
  questionUid?: string; // 提问消息 uid（用于配对）
  answer?: string; // 机器人答案
  reasonContent?: string; // 推理内容
  sources?: Array<{
    sourceType?: string; // 来源类型（faq/text/chunk/...）
    sourceUid?: string; // 来源 uid
    sourceName?: string; // 来源名称
    fileName?: string; // 文件名
    fileUrl?: string; // 文件 URL
    fileUid?: string; // 文件 uid
    contentSummary?: string; // 内容摘要
    score?: number; // 相似度
    highlighted?: boolean; // 是否高亮
  }>; // 引用来源
  regenerationContext?: string; // 重新生成上下文
  kbUid?: string; // 知识库 uid
  robotUid?: string; // 机器人 uid
};
```

### ROBOT_CANCEL（机器人回答取消）

```typescript
type RobotCancelContent = RobotContent; // 同 ROBOT
```

### ROBOT_UNANSWERED（机器人未回答）

```typescript
type RobotUnansweredContent = RobotContent; // 同 ROBOT
```

### ROBOT_ERROR（机器人错误消息）

```typescript
type RobotErrorContent = RobotContent; // 同 ROBOT
```

### ROBOT_STREAM（机器人流式响应）

```typescript
type RobotStreamContent = RobotContent; // 同 ROBOT
```

### ROBOT_STREAM_START（机器人流式响应开始）

```typescript
type RobotStreamStartContent = RobotContent; // 同 ROBOT
```

### ROBOT_STREAM_END（机器人流式响应结束）

```typescript
type RobotStreamEndContent = RobotContent; // 同 ROBOT
```

### ROBOT_STREAM_CANCEL（机器人流式响应取消）

```typescript
type RobotStreamCancelContent = RobotContent; // 同 ROBOT
```

### ROBOT_STREAM_UNANSWERED（机器人流式响应未回答）

```typescript
type RobotStreamUnansweredContent = RobotContent; // 同 ROBOT
```

### ROBOT_STREAM_ERROR（机器人流式响应错误）

```typescript
type RobotStreamErrorContent = RobotContent; // 同 ROBOT
```

### RATE_INVITE（邀请评价）

```typescript
type RateInviteContent = {
  content?: string; // 文本
  status?: string; // 状态
};
```

### RATE（访客主动评价）

```typescript
type RateContent = {
  content?: string;
  status?: string;
};
```

### RATE_SUBMIT（访客提交评价）

```typescript
type RateSubmitContent = {
  content?: string;
  status?: string;
};
```

### RATE_CANCEL（访客取消评价）

```typescript
type RateCancelContent = {
  content?: string;
  status?: string;
};
```

### AUTO_CLOSED（自动关闭）

```typescript
type AutoClosedContent = string; // 自动关闭提示文本
```

### AGENT_CLOSED（客服关闭）

```typescript
type AgentClosedContent = string; // 客服关闭提示文本
```

### TRANSFER（会话转接）

```typescript
type TransferContent = {
  content?: string; // 文本
  status?: string; // 状态
};
```

### TRANSFER_REJECT（转接拒绝）

```typescript
type TransferRejectContent = {
  content?: string;
  status?: string;
};
```

### TRANSFER_ACCEPT（转接接受）

```typescript
type TransferAcceptContent = {
  content?: string;
  status?: string;
};
```

### TRANSFER_TIMEOUT（转接超时）

```typescript
type TransferTimeoutContent = {
  content?: string;
  status?: string;
};
```

### TRANSFER_CANCEL（转接取消）

```typescript
type TransferCancelContent = {
  content?: string;
  status?: string;
};
```

### NOTIFICATION_AGENT_REPLY_TIMEOUT（客服回复超时提醒）

```typescript
type NotificationAgentReplyTimeoutContent = string; // 提醒文本
```

### NOTIFICATION_RATE_SUBMITTED（访客评价提交提醒）

```typescript
type NotificationRateSubmittedContent = string; // 提醒文本
```

### GOODS（商品消息）

```typescript
type GoodsContent = {
  uid?: string; // 商品 uid
  title?: string; // 标题
  image?: string; // 图片 URL
  description?: string; // 描述
  price?: number; // 价格
  url?: string; // 商品链接
  tagList?: string[]; // 标签列表
  extra?: string; // 业务扩展（建议 JSON 字符串）
  quantity?: number; // 数量
};
```

### ORDER（订单）

```typescript
type OrderContent = {
  uid?: string; // 订单号
  time?: string; // 下单时间（字符串）
  status?: string; // 订单状态
  statusText?: string; // 状态文案
  goods?: GoodsContent; // 商品信息
  totalAmount?: number; // 总金额
  shippingAddress?: {
    name?: string; // 收货人
    phone?: string; // 电话
    address?: string; // 地址
  }; // 收货地址
  paymentMethod?: string; // 支付方式
  extra?: string; // 业务扩展（建议 JSON 字符串）
};
```

### ARTICLE（文章）

```typescript
type ArticleContent = {
  title?: string; // 标题
  kbUid?: string; // 知识库 uid
  uid?: string; // 文章 uid
  summary?: string; // 摘要
  contentMarkdown?: string; // Markdown 正文
  contentHtml?: string; // HTML 正文
  type?: string; // 内容类型（TEXT/MARKDOWN/HTML）
  coverImageUrl?: string; // 封面图 URL
};
```

### FAQ（常见问题）

```typescript
type FaqContent = {
  faqUid?: string; // FAQ uid
  faqQuestion?: string; // 问题
  faqAnswer?: string; // 答案
};
```

### FAQ_QUESTION（常见问题问题）

```typescript
type FaqQuestionContent = {
  faqUid?: string;
  faqQuestion?: string;
  faqAnswer?: string;
};
```

### FAQ_ANSWER（常见问题答案）

```typescript
type FaqAnswerContent = {
  faqUid?: string;
  faqQuestion?: string;
  faqAnswer?: string;
};
```

### PHONE_NUMBER（电话号码）

```typescript
type PhoneNumberContent = {
  phoneNumber?: string; // 电话号码
};
```

### EMAILL_ADDRESS（邮箱地址）

```typescript
type EmailAddressContent = {
  emailAddress?: string; // 邮箱地址
  emailSubject?: string; // 邮件主题
  emailBody?: string; // 邮件正文
};
```
### WECHAT_NUMBER（微信号）

```typescript
type WechatNumberContent = {
  wechatNumber?: string; // 微信号
};
```

### EMAIL（邮件）

```typescript
type EmailContent = {
  subject?: string; // 主题
  content?: string; // HTML 正文
  textContent?: string; // 纯文本正文
  attachments?: Array<{
    filename?: string; // 文件名
    name?: string; // 显示名称
    mimeType?: string; // MIME 类型
    size?: string; // 大小（字节，字符串存储）
    url?: string; // 附件 URL
    hash?: string; // 哈希
    description?: string; // 描述
    contentId?: string; // Content-ID（内联附件）
    isInline?: boolean; // 是否内联
  }>; // 附件列表
  label?: string; // 标签/说明
};
```

## 参考

- [MessageEntity.java（GitHub）](https://github.com/Bytedesk/bytedesk/blob/main/modules/core/src/main/java/com/bytedesk/core/message/MessageEntity.java)
