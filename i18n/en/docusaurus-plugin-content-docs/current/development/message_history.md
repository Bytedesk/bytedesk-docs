---
sidebar_label: Historical Messages
sidebar_position: 9
---

# Historical Message Records

This page explains how to control whether to automatically load historical chat records through the `loadHistory` parameter, helping users view historical session content.

<!-- - Demo link: [Historical Records Demo](https://weiyuai.cn/reactdemo) -->
<!-- - Demo code: [Historical Records Example](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/historyDemo.tsx) -->

> Note: Please ensure you have completed the basic functionality integration in the [React Integration Guide](../channel/react.md) before using the historical records feature.

## Why do we need historical records functionality?

In actual business scenarios, you may want to:

- Let users view previous chat records
- Maintain session continuity
- Facilitate users to review important information
- Improve user experience and communication efficiency
- Help users understand historical problem handling situations

Through the historical records functionality, users can better understand previous communication content and provide a more coherent service experience.

## Integration Method

The Weiyu customer service system supports controlling historical record loading through configuration parameters. When initializing the customer service component, pass the `loadHistory` parameter through the `chatConfig` configuration item.

### Core Parameters

The following are the core parameter configurations for the historical records functionality:

```javascript
chatConfig: {
  // Required parameters
  org: 'df_org_uid',        // Your organization ID
  t: "1",                   // Session type
  sid: 'df_wg_uid',         // Session ID
  
  // Historical records parameter - This is the key to controlling historical record loading
  loadHistory: "1",         // Load historical records when value is "1", don't load for other values
  
  // Other optional parameters
  visitorUid: 'visitor_001',       // User unique ID
  nickname: 'Visitor Xiao Ming',   // User nickname
  avatar: 'https://example.com/avatar.jpg' // User avatar URL
}
```

### H5 Link Integration Method

In addition to component integration, the Weiyu customer service system also supports directly controlling historical record loading through URL parameters, suitable for H5 pages or quick integration scenarios.

### H5 Link Format

The basic link format is as follows:

```text
https://www.weiyuai.cn/chat/?org=Your Organization ID&t=1&sid=Session ID&loadHistory=1
```

Parameter description:

- `loadHistory`: Controls whether to load historical records, loads when value is "1", doesn't load for other values

### Example Code

```javascript
// 1. Prepare basic parameters
const orgId = 'df_org_uid';
const sessionId = 'df_wg_uid';

// 2. Concatenate complete URL (load historical records)
const chatUrl = `https://www.weiyuai.cn/chat/?org=${orgId}&t=1&sid=${sessionId}&loadHistory=1`;

// 3. Use this link for navigation or generate a button
window.location.href = chatUrl;
// Or create a link
// <a href="${chatUrl}">View Historical Records</a>
```

## Best Practices

1. **Load on Demand**: Decide whether to load historical records based on business scenarios
2. **Performance Considerations**: When there are many historical records, it may affect loading speed. It's recommended to appropriately control the loading quantity
3. **User Experience**: Provide historical records functionality in appropriate scenarios to improve user satisfaction
4. **Data Security**: Ensure the security and privacy protection of historical records

## Important Notes

1. **Parameter Value**: The `loadHistory` parameter uses the string "1" to indicate loading historical records
2. **Loading Timing**: Historical records are loaded when the session is initialized
3. **Data Volume**: When there are many historical records, it may affect loading performance
4. **Update Mechanism**: When the parameter value changes, the customer service component needs to be re-initialized to apply the new settings
