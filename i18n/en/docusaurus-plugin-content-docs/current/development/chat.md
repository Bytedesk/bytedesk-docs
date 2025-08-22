---
sidebar_label: Visitor Client
sidebar_position: 1
---

# Visitor Client Development Documentation

## Introduction

The Weiyu visitor client is used to help developers quickly integrate online customer service functionality into their applications, supporting multi-platform access including Web, iOS, Android, WeChat Mini Program, etc.

## Visitor Client Chat Interface

The visitor client chat interface (ChatBox) is the core component for user interaction with customer service, providing rich functionality to ensure a good communication experience.

### Main Features

1. **Message Display**
   - Supports multiple message types: text, images, files, videos, product information, etc.
   - Message bubbles show sending status: sending, sent successfully, failed to send, etc.
   - Message timestamp display
   - Supports rich text content rendering

2. **Message Input**
   - Text input and sending
   - Emoji selector
   - Image upload functionality
   - File upload functionality
   - Input preview (other party can see what you're typing)

3. **Robot Interaction**
   - Intelligent robot responses
   - Common question recommendations
   - Similar question recommendations
   - Robot result evaluation (useful/useless feedback)
   - Robot conversation transfer to human customer service

4. **Message Function**
   - Message submission during non-working hours or when customer service is offline
   - Supports text and image messages
   - Message status tracking
   - Message reply display

5. **Service Evaluation**
   - Customer service actively invites evaluation
   - User-initiated evaluation
   - Rating and evaluation content submission
   - Mark whether the problem is solved

6. **Smart Tips**
   - Real-time input suggestions
   - Related question recommendations based on input keywords
   - Popular question display

7. **Message Operations**
   - Message copying
   - Image preview
   - File download
   - Context menu (right-click menu)

### Network Communication

The chat interface uses two communication methods:

1. **WebSocket (STOMP)** - Used for real-time message communication
   - Message sending and receiving
   - Status updates
   - Input preview
   - Online status maintenance

2. **HTTP Requests** - Used for non-real-time operations
   - Session initialization
   - Historical message retrieval
   - File upload
   - Evaluation submission
   - Message submission

### Customization Configuration

The visitor client supports various customization configurations:

1. **Theme Settings**
   - Light/dark mode switching
   - Custom navigation bar color
   - Custom background color and text color

2. **Multi-language Support**
   - Built-in multi-language support
   - Optional languages: Chinese, English, etc.

3. **Interface Layout**
   - Navigation bar show/hide
   - Wide/narrow screen adaptation
   - Right panel show/hide

4. **Feature Switches**
   - Message function switch
   - Evaluation function switch
   - Robot function switch
   - File upload switch

### Context Communication

To provide more intelligent service, the visitor client collects and utilizes the following context information:

1. **Visitor Information**
   - UID
   - Nickname
   - Avatar
   - VIP level
   - Custom fields

2. **Browsing Information**
   - Browser type
   - Operating system
   - Device information
   - Source page
   - Page title

3. **Session Information**
   - Session ID
   - Session type
   - Historical messages

### Technical Implementation Details

1. **State Management**
   - Uses Zustand to manage global state
   - Centralized management of message list, visitor information, and other states

2. **Message Processing**
   - Message sending queue
   - Message status tracking
   - Message retry mechanism

3. **Real-time Preview**
   - Uses debounce technology to optimize real-time preview
   - Intelligent input suggestions

4. **Network Fault Tolerance**
   - WebSocket disconnection and reconnection
   - Message sending failure retry
   - Network error prompts

5. **Security Processing**
   - Message content security detection
   - XSS protection
   - Sensitive information filtering

### Parameter Configuration

The ChatBox component supports various parameter configurations:

| Parameter | Type | Description | Default Value |
|-----------|------|-------------|---------------|
| org | string | Enterprise UID | - |
| t | string | Session type (0: one-to-one; 1: workgroup, 2: robot, 16: history) | "1" |
| sid | string | Session ID (customer service UID/workgroup UID/robot UID) | - |
| lang | string | Language setting ("zh-cn"/"zh-tw"/"en") | "zh-cn" |
| mode | string | Theme mode (light/dark/system) | "system" |
| backgroundColor | string | Custom navigation background color | - |
| textColor | string | Custom navigation text color | - |
| referer | string | Source page | - |
| title | string | Page title | - |
| url | string | Page URL | - |
| navbar | boolean | Whether to show navigation bar, 0 means hidden | true |
| navbarTheme | string | Navigation bar theme | - |
| visitorUid | string | Custom visitor unique ID | Auto-generated |
| nickname | string | Custom visitor nickname | "Visitor" |
| avatar | string | Custom visitor avatar | Default avatar |
| vipLevel | string | Visitor VIP level | "0" |
| extra | string | Custom visitor additional information (JSON format) | - |
| loadHistory | string | Whether to automatically load historical chat records, loads when value is "1", doesn't load for other values, see [Historical Messages](./history) for details | - |
| goodsInfo | string | Product information (JSON format), see [Product Information Integration](./goodsinfo.md) for details | - |
| orderInfo | string | Order information (JSON format), see [Order Information Integration](./order_info.md) for details | - |
| userInfo | string | User information (JSON format), see [User Information Integration](./userinfo.md) for details | - |

## Common Questions

### How to integrate with existing user systems? How to pass visitor information to the customer service client?

You can pass information from existing user systems to the customer service client through the following methods:

1. **URL Parameter Passing**: Pass user information through URL parameters when initializing the chat window

   ```bash
   https://chat.example.com?visitorUid=user123&nickname=Zhang San&avatar=https://example.com/avatar.jpg&vipLevel=2
   ```

## Advanced Usage

### Related Features

- [Historical Messages](./history) - Learn how to load and display historical chat records
- [Product Information Integration](./goodsinfo.md) - Learn how to pass product information to customer service
- [Order Information Integration](./order_info.md) - Learn how to pass order information to customer service
- [User Information Integration](./userinfo.md) - Learn how to pass user information to customer service
- [Personalized Service](./viplevel.md) - Learn how to provide differentiated services based on user levels
- [Internationalization](./i18n.md) - Learn how to support multiple languages
