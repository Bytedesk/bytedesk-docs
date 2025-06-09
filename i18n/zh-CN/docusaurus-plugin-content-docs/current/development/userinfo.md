---
sidebar_label: 用户信息
sidebar_position: 5
---

# 用户信息对接

本页面介绍如何将业务系统中的用户信息对接到微语客服系统，以实现用户身份识别和个性化服务。

- 演示链接：[用户信息对接演示](https://weiyuai.cn/reactdemo)
<!-- - H5链接演示：[H5用户信息对接](https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&uid=visitor_001&nickname=%E8%AE%BF%E5%AE%A2%E5%B0%8F%E6%98%8E&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg) -->
- 演示代码：[用户信息对接示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/userInfoDemo.tsx)

> 注意：请确保您已经完成了[React集成指南](../channel/react.md)中的基本功能对接，才能继续进行用户信息对接。

![用户信息对接示例](/img/develop/chat/userinfo.png)

## 为什么需要用户信息对接？

在实际业务场景中，您可能希望：

- 在客服系统中识别已登录的用户身份
- 展示用户的真实头像和昵称
- 记录用户的聊天历史
- 关联业务系统中的用户数据
- 为不同用户提供个性化的客服体验

通过用户信息对接，可以帮助客服人员更好地了解用户情况，提供更精准的服务。

## 对接方法

微语客服系统支持通过配置参数传入用户信息。在初始化客服组件时，通过`chatConfig`配置项传入用户相关信息。

### 核心参数

以下是用户信息对接的核心参数：

```javascript
chatConfig: {
  // 必填参数
  org: 'df_org_uid',        // 您的组织ID
  t: "1",                   // 会话类型
  sid: 'df_wg_uid',         // 会话ID
  
  // 用户信息参数 - 这些是用户信息对接的关键
  uid: 'visitor_001',       // 用户唯一ID，建议使用您业务系统中的用户ID
  nickname: '访客小明',     // 用户昵称
  avatar: 'https://example.com/avatar.jpg', // 用户头像URL
  
  // 自定义字段，可以传递任何附加信息（JSON字符串）
  extra: JSON.stringify({
    userType: 'vip',        // 例如：用户类型
    registerTime: '2025-01-01', // 例如：注册时间
    // 任何其他您希望传递的信息
  })
}
```

### 完整示例代码

下面是一个完整的用户信息对接示例，演示了如何根据不同用户切换身份信息：

```jsx
import { useState } from 'react';
import { Button, Card, Typography, Space, Avatar } from 'antd';
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web';

const { Title, Paragraph } = Typography;

// 定义用户信息接口
interface UserInfo {
    uid: string;
    nickname: string;
    avatar: string;
}

// 定义两个测试用户
const TEST_USERS = [
    {
        uid: 'visitor_001',
        nickname: '访客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
    },
    {
        uid: 'visitor_002',
        nickname: '访客小红',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg'
    }
];

const UserInfoDemo = () => {
    // 当前选中的用户信息
    const [currentUser, setCurrentUser] = useState(TEST_USERS[0]);

    // 配置客服组件
    const config = {
        placement: 'bottom-right',
        autoPopup: false,
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,  // 隐藏默认按钮
        },
        bubbleConfig: {
            show: false,  // 隐藏气泡消息
        },
        chatConfig: {
            org: 'df_org_uid',    // 替换为您的组织ID
            t: "1",
            sid: 'df_wg_uid',     // 替换为您的SID
            
            // 传入当前用户信息 - 核心部分
            uid: currentUser.uid,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            
            // 自定义字段，可以传递任何字段
            extra: JSON.stringify({
                userType: 'normal',
                registerDate: '2025-05-01'
            })
        },
        locale: 'zh-cn',
    };

    // 切换用户信息
    const handleSwitchUser = (user) => {
        setCurrentUser(user);
    };

    // 打开聊天窗口
    const handleShowChat = () => {
        console.log("打开聊天窗口");
        (window).bytedesk?.showChat();
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>用户信息对接演示</Title>
            <Paragraph>
                本示例演示如何通过配置参数传入用户信息（uid、nickname、avatar）到客服组件中。
                点击下方按钮可以切换不同的用户信息。
            </Paragraph>

            <Card style={{ marginTop: '20px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>当前用户信息：</Title>
                        <Space>
                            <Avatar src={currentUser.avatar} size={64} />
                            <div>
                                <Paragraph>用户ID: {currentUser.uid}</Paragraph>
                                <Paragraph>昵称: {currentUser.nickname}</Paragraph>
                            </div>
                        </Space>
                    </div>

                    <Space>
                        <Button 
                            type="primary"
                            onClick={() => handleSwitchUser(TEST_USERS[0])}
                            disabled={currentUser.uid === TEST_USERS[0].uid}
                        >
                            切换到访客小明
                        </Button>
                        <Button 
                            type="primary"
                            onClick={() => handleSwitchUser(TEST_USERS[1])}
                            disabled={currentUser.uid === TEST_USERS[1].uid}
                        >
                            切换到访客小红
                        </Button>
                    </Space>
                    
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button type="primary" size="large" onClick={handleShowChat}>
                            咨询客服
                        </Button>
                    </div>
                </Space>
            </Card>

            {/* 引入微语客服组件 */}
            <BytedeskReact {...config} />
        </div>
    );
};

export default UserInfoDemo;
```

## H5链接对接方法

除了组件集成方式外，微语客服系统还支持通过URL参数直接传递用户信息，适用于H5页面或快速集成场景。

### H5链接格式

基本链接格式如下：

```text
https://www.weiyuai.cn/chat/?org=您的组织ID&t=1&sid=会话ID&uid=用户ID&nickname=用户昵称&avatar=头像URL&extra=附加信息JSON
```

各参数说明：
- `org`: 您的组织ID
- `t`: 会话类型，通常为1
- `sid`: 会话ID
- `uid`: 用户唯一标识符
- `nickname`: 用户昵称(需URL编码)
- `avatar`: 用户头像URL(需URL编码) 
- `extra`: 额外信息(JSON字符串，需URL编码)

### 示例代码

```javascript
// 1. 准备用户基本信息
const userId = 'user12345';
const userNickname = '张三';
const userAvatar = 'https://example.com/avatar.jpg';

// 2. 准备额外信息(可选)
const extraInfo = {
  userType: 'vip',
  registerTime: '2025-01-01',
  memberLevel: '黄金会员'
};

// 3. URL编码处理
const encodedNickname = encodeURIComponent(userNickname);
const encodedAvatar = encodeURIComponent(userAvatar);
const encodedExtra = encodeURIComponent(JSON.stringify(extraInfo));

// 4. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&uid=${userId}&nickname=${encodedNickname}&avatar=${encodedAvatar}&extra=${encodedExtra}`;

// 5. 使用该链接进行跳转或生成按钮
window.location.href = chatUrl;
// 或者创建一个链接
// <a href="${chatUrl}">联系客服</a>
```

### 使用场景

H5链接对接特别适用于：

1. 移动端H5页面中"联系客服"按钮
2. 用户个人中心或订单页面中的客服入口
3. 邮件、短信或社交媒体中的客服链接
4. 无法实现复杂JavaScript集成的场景

### 注意事项

- 所有URL参数都应进行正确编码，特别是中文字符
- 头像URL应使用HTTPS协议以确保安全
- 考虑在不同场景下添加不同的跟踪参数
- 尽量避免在URL中传递敏感用户信息
- 超长参数可能会导致某些浏览器截断URL，请适当控制参数长度

## 用户信息处理流程

1. **登录状态检测**：在应用中检测用户是否已登录
2. **获取用户信息**：从您的业务系统中获取当前登录用户的信息
3. **配置参数**：将用户信息配置到微语客服组件的`chatConfig`中
4. **实时更新**：当用户登录状态或信息变化时，更新客服组件配置

## 最佳实践

1. **唯一标识**：确保每个用户的`uid`在您的系统中是唯一的，建议使用业务系统中的用户ID
2. **实时同步**：当用户登录状态变化时，及时更新微语客服组件的用户信息
3. **合理传参**：在`extra`字段中只传递必要的用户信息，避免传递敏感信息
4. **头像优化**：确保提供的头像URL可以正常访问，考虑使用CDN加速
5. **错误处理**：添加适当的错误处理机制，确保即使用户信息获取失败也不会影响客服功能

## 高级功能

除了基本的用户信息对接外，您还可以：

1. **动态切换用户**：实现多账号切换功能，如示例中的不同用户切换
2. **用户分组**：通过`extra`字段传递用户分组信息，实现不同分组用户的差异化服务
3. **自定义字段**：传递业务相关的自定义字段，为客服提供更多用户背景信息
4. **会话控制**：根据用户类型控制是否显示客服入口，例如对VIP用户显示特殊的客服入口

## 注意事项

1. **数据安全**：避免在客户端传递用户敏感信息
2. **兼容处理**：对于未登录用户，可以使用临时ID作为`uid`，确保体验一致性
3. **参数验证**：确保传入的用户信息格式正确，特别是头像URL
4. **更新机制**：当用户信息变更时，需要重新初始化客服组件以应用新的用户信息
