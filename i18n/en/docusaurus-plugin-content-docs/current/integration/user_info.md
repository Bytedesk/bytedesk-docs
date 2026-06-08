---
sidebar_label: Business User To Visitor Mapping
sidebar_position: 5
---

# Map Business Users To Visitor Identity

## Clarify Two Concepts First

This page mainly describes how logged-in members or registered users from your business system are mapped to visitor-side identity when entering a chat session.

This is not the same as backend registered users in the permission system:

- Backend registered user corresponds to `UserEntity`
- Chat/session visitor corresponds to `VisitorEntity`

Important distinctions:

- A logged-in member in your business system can be mapped into chat by passing `visitorUid`, `nickname`, and `avatar`
- This does not automatically create a backend `UserEntity`
- This does not automatically grant admin, agent, supervisor, or operator permissions
- Only explicitly created system users can log in to the admin console and receive roles/permissions

If your goal is:

- Let store members enter a chat session and be recognized: read this page
- Create backend admin or agent accounts and assign permissions: read user, role, and permission management docs

This page explains how to integrate user information from your business system into the Weiyu customer service system to achieve user identity recognition and personalized services.

- Demo link: [User Information Integration Demo](https://weiyuai.cn/reactdemo)
- Demo code:
- [User Information Integration Example-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/userInfoDemo.tsx)
- [User Information Integration Example-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/userInfoDemo.vue)

> Note: Please ensure you have completed the basic functionality integration in the [React Integration Guide](../channel/react.md) or [Vue Integration Guide](../channel/vue.md) before proceeding with user information integration.

![User Information Integration Example](/img/develop/chat/userinfo.png)

## Why do we need user information integration?

In actual business scenarios, you may want to:

- Identify logged-in user identities in the customer service system
- Display users' real avatars and nicknames
- Record users' chat history
- Associate user data from business systems
- Provide personalized customer service experiences for different users

Through user information integration, customer service personnel can better understand user situations and provide more accurate services.

More precisely, this page is about mapping business users to visitor-side session identity.

## Integration Method

The Weiyu customer service system supports passing identity information through configuration parameters. When initializing the chat component, use `chatConfig` to pass visitor-side identity fields.

These fields are mainly used for session identity and profile display, not for backend account authorization.

### Core Parameters

The following are the core parameters for user information integration:

```javascript
chatConfig: {
  // Required parameters
  org: 'df_org_uid',        // Your organization ID
  t: "1",                   // Session type
  sid: 'df_wg_uid',         // Session ID
  
    // Session identity parameters - these fields are mapped to visitor identity
    visitorUid: 'visitor_001',       // Visitor unique ID, recommended to use the user ID from your business system
  nickname: 'Visitor Xiao Ming',   // User nickname
  avatar: 'https://example.com/avatar.jpg', // User avatar URL
  mobile: '13800000000',    // User mobile number
  email: 'user@example.com', // User email
  note: 'Remark information',        // User remark
  
  // Custom fields, can pass any additional information (JSON string)
  extra: JSON.stringify({
    userType: 'vip',        // For example: user type
    registerTime: '2025-01-01', // For example: registration time
    // Any other information you want to pass
  })
}
```

### Complete Example Code

Below is a complete user information integration example demonstrating how to switch identity information based on different users:

```jsx
import { useState } from 'react';
import { Button, Card, Typography, Space, Avatar } from 'antd';
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web';

const { Title, Paragraph } = Typography;

// Define user information interface
interface UserInfo {
    visitorUid: string;
    nickname: string;
    avatar: string;
    mobile?: string; // Optional field, add as needed
    email?: string; // Optional field, add as needed
    note?: string; // Optional field, add as needed
}

// Define two logged-in business users and map them to visitor identity
const TEST_USERS = [
    {
        visitorUid: 'visitor_001',
        nickname: 'Visitor Xiao Ming',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        mobile: '13800000000',
        email: 'user@example.com',
        note: 'Remark information'
    },
    {
        visitorUid: 'visitor_002',
        nickname: 'Visitor Xiao Hong',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
        mobile: '13800000001',
        email: 'user2@example.com',
        note: 'Remark information'
    }
];

const UserInfoDemo = () => {
    // Current selected user information
    const [currentUser, setCurrentUser] = useState(TEST_USERS[0]);

    // Configure customer service component
    const config = {
        placement: 'bottom-right',
        autoPopup: false,
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,  // Hide default button
        },
        bubbleConfig: {
            show: false,  // Hide bubble messages
        },
        chatConfig: {
            org: 'df_org_uid',    // Replace with your organization ID
            t: "1",
            sid: 'df_wg_uid',     // Replace with your SID
            
            // Pass current business user information and map it to visitor identity
            visitorUid: currentUser.visitorUid,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            mobile: currentUser.mobile,
            email: currentUser.email,
            note: currentUser.note,
            
            // Custom fields, can pass any fields
            extra: JSON.stringify({
                userType: 'normal',
                registerDate: '2025-05-01'
            })
        },
        locale: 'zh-cn',
    };

    // Switch user information
    const handleSwitchUser = (user) => {
        setCurrentUser(user);
    };

    // Open chat window
    const handleShowChat = () => {
        console.log("Open chat window");
        (window).bytedesk?.showChat();
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>User Information Integration Demo</Title>
            <Paragraph>
                This example shows how to pass identity information (visitorUid, nickname, avatar) into the chat component.
                The selected business user is mapped to different visitor identity in the session.
            </Paragraph>

            <Card style={{ marginTop: '20px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>Current User Information:</Title>
                        <Space>
                            <Avatar src={currentUser.avatar} size={64} />
                            <div>
                                <Paragraph>User ID: {currentUser.visitorUid}</Paragraph>
                                <Paragraph>Nickname: {currentUser.nickname}</Paragraph>
                            </div>
                        </Space>
                    </div>

                    <Space>
                        <Button 
                            type="primary"
                            onClick={() => handleSwitchUser(TEST_USERS[0])}
                            disabled={currentUser.visitorUid === TEST_USERS[0].visitorUid}
                        >
                            Switch to Visitor Xiao Ming
                        </Button>
                        <Button 
                            type="primary"
                            onClick={() => handleSwitchUser(TEST_USERS[1])}
                            disabled={currentUser.visitorUid === TEST_USERS[1].visitorUid}
                        >
                            Switch to Visitor Xiao Hong
                        </Button>
                    </Space>
                    
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button type="primary" size="large" onClick={handleShowChat}>
                            Contact Customer Service
                        </Button>
                    </div>
                </Space>
            </Card>

            {/* Import Weiyu customer service component */}
            <BytedeskReact {...config} />
        </div>
    );
};

export default UserInfoDemo;
```

## H5 Link Integration Method

Notes:

- Even if a business user has already logged in to your own system, the parameters passed into the chat link are still visitor-side identity parameters
- These parameters are used for session recognition, not backend login authorization

In addition to component integration, the Weiyu customer service system also supports directly passing user information through URL parameters, suitable for H5 pages or quick integration scenarios.

### H5 Link Format

The basic link format is as follows:

```text
https://www.weiyuai.cn/chat/?org=Your Organization ID&t=1&sid=Session ID&visitorUid=User ID&nickname=User Nickname&avatar=Avatar URL&extra=Additional Information JSON
```

Parameter descriptions:

- `org`: Your organization ID
- `t`: Session type, usually 1
- `sid`: Session ID
- `visitorUid`: User unique identifier
- `nickname`: User nickname (URL encoding required)
- `avatar`: User avatar URL (URL encoding required)
- `mobile`: User mobile number (optional, URL encoding required)
- `email`: User email (optional, URL encoding required)
- `note`: Remark information (optional, URL encoding required)
- `extra`: Additional information (JSON string, URL encoding required)

### Example Code

```javascript
// 1. Prepare basic user information
const userId = 'user12345';
const userNickname = 'Zhang San';
const userAvatar = 'https://example.com/avatar.jpg';
const userMobile = '13800000000'; // Optional
const userEmail = 'zhangsan@example.com'; // Optional
const userNote = 'Remark information'; // Optional

// 2. Prepare additional information (optional)
const extraInfo = {
  userType: 'vip',
  registerTime: '2025-01-01',
  memberLevel: 'Gold Member',
};

// 3. URL encoding processing
const encodedNickname = encodeURIComponent(userNickname);
const encodedAvatar = encodeURIComponent(userAvatar);
const encodedMobile = encodeURIComponent(userMobile);
const encodedEmail = encodeURIComponent(userEmail);
const encodedNote = encodeURIComponent(userNote);
const encodedExtra = encodeURIComponent(JSON.stringify(extraInfo));

// 4. Concatenate complete URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=${userId}&nickname=${encodedNickname}&avatar=${encodedAvatar}&mobile=${encodedMobile}&email=${encodedEmail}&note=${encodedNote}&extra=${encodedExtra}`;

// 5. Use this link for navigation or generate a button
window.location.href = chatUrl;
// Or create a link
// <a href="${chatUrl}">Contact Customer Service</a>
```

### Usage Scenarios

H5 link integration is particularly suitable for:

1. "Contact Customer Service" buttons in mobile H5 pages
2. Customer service entry points in user personal centers or order pages
3. Customer service links in emails, SMS, or social media
4. Scenarios where complex JavaScript integration cannot be implemented

### Important Notes

- All URL parameters should be properly encoded, especially Chinese characters
- Avatar URLs should use HTTPS protocol to ensure security
- Consider adding different tracking parameters in different scenarios
- Avoid passing sensitive user information in URLs
- Overly long parameters may cause some browsers to truncate URLs, please control parameter length appropriately

## User Information Processing Flow

1. **Login Status Detection**: Detect whether users are logged in in the application
2. **Get User Information**: Get current logged-in user information from your business system
3. **Configure Parameters**: Configure user information into the `chatConfig` of the Weiyu customer service component
4. **Real-time Updates**: Update customer service component configuration when user login status or information changes

## Best Practices

1. **Unique Identification**: Ensure each user's `visitorUid` is unique in your system, recommended to use user ID from the business system
2. **Real-time Synchronization**: Update user information of the Weiyu customer service component in time when user login status changes
3. **Reasonable Parameter Passing**: Only pass necessary user information in the `extra` field, avoid passing sensitive information
4. **Avatar Optimization**: Ensure provided avatar URLs can be accessed normally, consider using CDN acceleration
5. **Error Handling**: Add appropriate error handling mechanisms to ensure customer service functionality is not affected even if user information retrieval fails

## Advanced Features

In addition to basic user information integration, you can also:

1. **Dynamic User Switching**: Implement multi-account switching functionality, such as different user switching in the example
2. **User Grouping**: Pass user grouping information through the `extra` field to achieve differentiated services for users in different groups
3. **Custom Fields**: Pass business-related custom fields to provide customer service with more user background information
4. **Session Control**: Control whether to display customer service entry based on user type, such as displaying special customer service entry for VIP users

## Important Notes 2

1. **Data Security**: Avoid passing sensitive user information on the client side
2. **Compatibility Handling**: For non-logged-in users, you can use temporary ID as `visitorUid` to ensure consistent experience
3. **Parameter Validation**: Ensure the format of passed user information is correct, especially avatar URLs
4. **Update Mechanism**: When user information changes, the customer service component needs to be re-initialized to apply new user information
