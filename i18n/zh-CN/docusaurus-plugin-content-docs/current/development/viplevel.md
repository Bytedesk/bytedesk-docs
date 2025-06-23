---
sidebar_label: 千人千面
sidebar_position: 5
---

# 千人千面

本页面介绍如何通过 `vipLevel` 参数实现针对不同等级用户展示不同的客服内容，实现千人千面的个性化服务体验。

- 演示链接：[千人千面演示](https://weiyuai.cn/reactdemo)
- 演示代码：
- [千人千面示例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/vipLevelDemo.tsx)
- [千人千面示例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/vipLevelDemo.vue)

> 注意：请确保您已经完成了[用户信息对接](./userinfo.md)的基本配置，才能更好地实现千人千面功能。

![千人千面示例](/img/develop/faq/faq_1.png)

## 为什么需要千人千面？

在实际业务场景中，您可能希望：

- 为不同等级的用户提供差异化的服务内容
- VIP用户获得更详细或更高级的解答
- 根据用户等级展示不同的产品介绍
- 为不同等级用户提供不同的优惠信息
- 实现更精细化的用户运营

通过千人千面功能，可以帮助您为不同等级的用户提供更精准、更个性化的服务体验。

## 对接方法

微语客服系统支持通过配置参数传入用户等级信息。在初始化客服组件时，通过 `chatConfig` 配置项传入 `vipLevel` 参数。

### 核心参数

以下是千人千面功能的核心参数配置：

```javascript
chatConfig: {
  // 必填参数
  org: 'df_org_uid',        // 您的组织ID
  t: "1",                   // 会话类型
  sid: 'df_wg_uid',         // 会话ID
  
  // 用户信息参数
  uid: 'visitor_001',       // 用户唯一ID
  nickname: '访客小明',     // 用户昵称
  avatar: 'https://example.com/avatar.jpg', // 用户头像URL
  
  // VIP等级参数 - 这是千人千面的关键
  vipLevel: 4,              // 用户VIP等级，可以是1-10的整数
  
  // 自定义字段，可以传递任何附加信息
  extra: JSON.stringify({
    userType: 'vip',
    registerTime: '2025-01-01',
    // 任何其他您希望传递的信息
  })
}
```

### 完整示例代码

下面是一个完整的千人千面示例，演示了如何根据不同用户等级展示不同内容：

```jsx
import { useState } from 'react';
import { Button, Card, Typography, Space, Select } from 'antd';
import { BytedeskReact } from 'bytedesk-web/react';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const VipLevelDemo = () => {
    // 当前选中的VIP等级
    const [vipLevel, setVipLevel] = useState(1);

    // 配置客服组件
    const config = {
        placement: 'bottom-right',
        autoPopup: false,
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,  // 隐藏默认按钮
        },
        chatConfig: {
            org: 'df_org_uid',    // 替换为您的组织ID
            t: "1",
            sid: 'df_wg_uid',     // 替换为您的SID
            uid: 'visitor_001',
            nickname: '测试用户',
            avatar: 'https://example.com/avatar.jpg',
            
            // 设置VIP等级
            vipLevel: vipLevel,
            
            extra: JSON.stringify({
                userType: 'vip',
                registerDate: '2025-05-01'
            })
        },
        locale: 'zh-cn',
    };

    // 切换VIP等级
    const handleVipLevelChange = (level) => {
        setVipLevel(level);
    };

    // 打开聊天窗口
    const handleShowChat = () => {
        console.log("打开聊天窗口");
        (window).bytedesk?.showChat();
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>千人千面演示</Title>
            <Paragraph>
                本示例演示如何通过配置参数传入用户VIP等级（vipLevel）到客服组件中。
                选择不同的VIP等级，将看到不同的客服内容。
            </Paragraph>

            <Card style={{ marginTop: '20px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>当前VIP等级：</Title>
                        <Select 
                            value={vipLevel} 
                            onChange={handleVipLevelChange}
                            style={{ width: 200 }}
                        >
                            <Option value={1}>普通用户</Option>
                            <Option value={2}>青铜会员</Option>
                            <Option value={3}>白银会员</Option>
                            <Option value={4}>黄金会员</Option>
                            <Option value={5}>钻石会员</Option>
                        </Select>
                    </div>
                    
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

export default VipLevelDemo;
```

## H5链接对接方法

除了组件集成方式外，微语客服系统还支持通过URL参数直接传递VIP等级信息，适用于H5页面或快速集成场景。

### H5链接格式

基本链接格式如下：

```text
https://www.weiyuai.cn/chat/?org=您的组织ID&t=1&sid=会话ID&uid=用户ID&nickname=用户昵称&avatar=头像URL&vipLevel=用户等级&extra=附加信息JSON
```

各参数说明：

- `org`: 您的组织ID
- `t`: 会话类型，通常为1
- `sid`: 会话ID
- `uid`: 用户唯一标识符
- `nickname`: 用户昵称(需URL编码)
- `avatar`: 用户头像URL(需URL编码)
- `vipLevel`: 用户VIP等级(1-10的整数)
- `extra`: 额外信息(JSON字符串，需URL编码)

### 示例代码

```javascript
// 1. 准备用户基本信息
const userId = 'user12345';
const userNickname = '张三';
const userAvatar = 'https://example.com/avatar.jpg';
const userVipLevel = 4;  // VIP等级

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
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&uid=${userId}&nickname=${encodedNickname}&avatar=${encodedAvatar}&vipLevel=${userVipLevel}&extra=${encodedExtra}`;

// 5. 使用该链接进行跳转或生成按钮
window.location.href = chatUrl;
// 或者创建一个链接
// <a href="${chatUrl}">联系客服</a>
```

## 管理后台配置

### 1. 添加扩展问题

在管理后台中，您可以为不同VIP等级配置不同的回答内容：

1. 进入管理后台的FAQ管理
2. 点击"添加扩展问题"
3. 在问题配置中设置对应的VIP等级
4. 为不同等级配置不同的回答内容

![添加扩展问题](/img/develop/faq/faq_1.png)

### 2. 添加关联问题

您还可以为不同VIP等级配置关联问题：

1. 在问题详情页面
2. 点击"添加关联问题"
3. 设置不同VIP等级对应的关联问题

![添加关联问题](/img/develop/faq/faq_2.png)

## 最佳实践

1. **等级划分**：建议将VIP等级划分为1-10级，便于管理和扩展
2. **内容差异化**：确保不同等级的内容有明显的价值差异
3. **动态调整**：根据用户反馈及时调整各等级的内容
4. **平滑过渡**：在等级之间设置合理的内容过渡
5. **数据统计**：定期分析不同等级用户的使用情况

## 注意事项

1. **等级范围**：`vipLevel` 参数建议使用1-10的整数
2. **内容维护**：定期检查和更新各等级的内容
3. **兼容处理**：对于未设置等级的用户，系统会默认使用基础内容
4. **更新机制**：当用户等级变更时，需要重新初始化客服组件以应用新的等级信息

## 效果展示

不同VIP等级用户将看到不同的回答内容：

![VIP等级效果1](/img/develop/faq/faq_3.png)
![VIP等级效果2](/img/develop/faq/faq_4.png)
