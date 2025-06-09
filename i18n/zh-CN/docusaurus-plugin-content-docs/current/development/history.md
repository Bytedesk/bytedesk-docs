---
sidebar_label: 历史记录
sidebar_position: 9
---

# 历史聊天记录

本页面介绍如何通过 `loadHistory` 参数控制是否自动加载历史聊天记录，帮助用户查看历史会话内容。

<!-- - 演示链接：[历史记录演示](https://weiyuai.cn/reactdemo) -->
<!-- - 演示代码：[历史记录示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/historyDemo.tsx) -->

> 注意：请确保您已经完成了[React集成指南](../channel/react.md)中的基本功能对接，才能使用历史记录功能。

## 为什么需要历史记录功能？

在实际业务场景中，您可能希望：

- 让用户查看之前的聊天记录
- 保持会话的连续性
- 方便用户回顾重要信息
- 提高用户体验和沟通效率
- 便于用户了解历史问题处理情况

通过历史记录功能，可以帮助用户更好地了解之前的沟通内容，提供更连贯的服务体验。

## 对接方法

微语客服系统支持通过配置参数控制历史记录的加载。在初始化客服组件时，通过 `chatConfig` 配置项传入 `loadHistory` 参数。

### 核心参数

以下是历史记录功能的核心参数配置：

```javascript
chatConfig: {
  // 必填参数
  org: 'df_org_uid',        // 您的组织ID
  t: "1",                   // 会话类型
  sid: 'df_wg_uid',         // 会话ID
  
  // 历史记录参数 - 这是控制历史记录加载的关键
  loadHistory: "1",         // 值为"1"时加载历史记录，其他值不加载
  
  // 其他可选参数
  uid: 'visitor_001',       // 用户唯一ID
  nickname: '访客小明',     // 用户昵称
  avatar: 'https://example.com/avatar.jpg' // 用户头像URL
}
```

### H5链接对接方法

除了组件集成方式外，微语客服系统还支持通过URL参数直接控制历史记录加载，适用于H5页面或快速集成场景。

### H5链接格式

基本链接格式如下：

```text
https://www.weiyuai.cn/chat/?org=您的组织ID&t=1&sid=会话ID&loadHistory=1
```

参数说明：
- `loadHistory`: 控制是否加载历史记录，值为"1"时加载，其他值不加载

### 示例代码

```javascript
// 1. 准备基本参数
const orgId = 'df_org_uid';
const sessionId = 'df_wg_uid';

// 2. 拼接完整URL（加载历史记录）
const chatUrl = `https://www.weiyuai.cn/chat/?org=${orgId}&t=1&sid=${sessionId}&loadHistory=1`;

// 3. 使用该链接进行跳转或生成按钮
window.location.href = chatUrl;
// 或者创建一个链接
// <a href="${chatUrl}">查看历史记录</a>
```

## 最佳实践

1. **按需加载**：根据业务场景决定是否加载历史记录
2. **性能考虑**：历史记录较多时可能影响加载速度，建议适当控制加载数量
3. **用户体验**：在合适的场景下提供历史记录功能，提升用户满意度
4. **数据安全**：确保历史记录的安全性和隐私保护

## 注意事项

1. **参数值**：`loadHistory` 参数使用字符串 "1" 表示加载历史记录
2. **加载时机**：历史记录在会话初始化时加载
3. **数据量**：历史记录较多时可能影响加载性能
4. **更新机制**：当参数值变更时，需要重新初始化客服组件以应用新的设置
