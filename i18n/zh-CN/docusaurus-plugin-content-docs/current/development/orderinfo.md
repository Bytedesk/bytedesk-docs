---
sidebar_label: 订单信息
sidebar_position: 6
---

# 订单信息对接

本页面介绍如何将业务系统中的订单信息传递给客服系统，特别适用于电商、物流等需要提供订单咨询服务的场景，帮助客服快速了解用户咨询的订单详情。

- 演示链接：[订单信息对接演示](https://weiyuai.cn/reactdemo)
<!-- - H5链接演示：[H5订单信息对接](https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_aftersales&orderInfo=%7B%22uid%22%3A%22ORD202505270001%22%2C%22time%22%3A%222025-05-27%2014%3A30%3A00%22%2C%22status%22%3A%22paid%22%2C%22statusText%22%3A%22%E5%B7%B2%E6%94%AF%E4%BB%98%22%2C%22goods%22%3A%7B%22uid%22%3A%22goods_001%22%2C%22title%22%3A%22%E6%AF%94%E4%BA%9A%E8%BF%AA%20%E4%BB%B0%E6%9C%9BU7%22%2C%22image%22%3A%22https%3A%2F%2Fwww.weiyuai.cn%2Fassets%2Fimages%2Fcar%2Fyu7.jpg%22%2C%22price%22%3A299900%2C%22quantity%22%3A1%7D%2C%22totalAmount%22%3A299900%7D) -->
- 演示代码：[订单信息对接示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx)

> 注意：请确保您已经完成了[React集成指南](../channel/react.md)中的基本功能对接，才能继续进行订单信息对接。

![订单信息对接示例](/img/develop/chat/orderinfo.png)

## 为什么需要订单信息对接？

在客户服务场景中，订单问题是用户咨询最常见的内容之一。订单信息对接可以：

- 让客服即时了解用户咨询的订单详情，无需用户重复描述
- 准确显示订单状态、商品信息、配送信息等关键数据
- 大幅提高客服解决问题的效率和准确性
- 减少用户等待时间，提升客户满意度
- 为售后服务提供完整的订单背景信息

## 订单信息数据结构

订单信息包含多个方面的数据，主要包括：

```typescript
// 订单信息数据结构
interface OrderInfo {
    uid: string;              // 订单编号
    time: string;             // 下单时间
    status: string;           // 订单状态编码
    statusText: string;       // 订单状态文本
    goods: GoodsInfo;         // 商品信息
    totalAmount: number;      // 订单总金额
    shippingAddress: {        // 收货信息
        name: string;         // 收货人
        phone: string;        // 联系电话
        address: string;      // 收货地址
    };
    paymentMethod: string;    // 支付方式
    extra: string;            // 额外信息(JSON字符串)
}

// 商品信息数据结构
interface GoodsInfo {
    uid: string;              // 商品ID
    title: string;            // 商品标题
    image: string;            // 商品图片URL
    description: string;      // 商品描述
    price: number;            // 商品价格
    url: string;              // 商品详情页URL
    tagList: string[];        // 商品标签列表
    quantity: number;         // 购买数量
    extra: string;            // 额外信息(JSON字符串)
}
```

## 对接方法

微语客服系统通过配置参数来传递订单信息，在初始化客服组件时，通过`chatConfig.orderInfo`配置项传入订单数据。

### 配置示例

以下是一个完整的配置示例，演示如何将订单信息传递给客服系统：

```javascript
const config = {
  // 基本配置
  placement: 'bottom-right',
  autoPopup: false,
  marginBottom: 20,
  marginSide: 20,
  buttonConfig: {
    show: false,  // 隐藏默认按钮，使用自定义按钮
  },
  bubbleConfig: {
    show: false,  // 隐藏气泡
    icon: '📦',
    title: '订单有问题？',
    subtitle: '点击咨询客服'
  },
  
  // 聊天配置
  chatConfig: {
    org: 'df_org_uid',    // 替换为您的组织ID
    t: "1",
    sid: 'df_wg_uid',     // 替换为您的SID
    
    // 可选：传入用户信息
    uid: 'visitor_001',
    nickname: '访客小明',
    avatar: 'https://example.com/avatar.jpg',
    
    // 订单信息 - 核心部分
    orderInfo: JSON.stringify({
      uid: 'ORD202505270001',               // 订单编号
      time: '2025-05-27 14:30:00',          // 下单时间
      status: 'paid',                        // 订单状态编码
      statusText: '已支付',                  // 订单状态文本
      
      // 商品信息
      goods: {
        uid: 'goods_001',
        title: '比亚迪 仰望U7 豪华纯电动轿车',
        image: 'https://example.com/yu7.jpg',
        description: '比亚迪仰望U7是一款豪华纯电动轿车...',
        price: 299900,
        url: 'https://example.com/product/yu7',
        tagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'],
        quantity: 1,
        extra: JSON.stringify({
          color: '极光蓝',
          configuration: '豪华版'
        })
      },
      
      totalAmount: 299900,                  // 订单总金额
      
      // 收货信息
      shippingAddress: {
        name: '张三',
        phone: '13800138000',
        address: '北京市朝阳区建国路88号'
      },
      
      paymentMethod: '微信支付',            // 支付方式
      
      // 额外信息
      extra: JSON.stringify({
        invoiceType: '电子发票',
        expectedDelivery: '2025-05-30',
        remarks: '请工作日送货'
      })
    })
  },
  locale: 'zh-cn',
};
```

### 订单信息显示效果

当您正确配置订单信息后，客服系统会在客服工作台显示用户咨询的订单详情卡片，包括订单编号、状态、商品信息、收货地址等关键信息，方便客服快速了解订单情况并提供针对性服务。

## H5链接对接方法

除了组件集成外，微语客服还支持通过URL参数直接传递订单信息，特别适用于H5页面或者需要快速集成的场景。

### H5链接格式

基本链接格式如下：

```javascript
https://www.weiyuai.cn/chat/?org=您的组织ID&t=1&sid=会话ID&orderInfo=订单信息JSON
```

其中`orderInfo`参数需要进行URL编码，示例如下：

```javascript
// 1. 准备订单信息对象
const orderInfo = {
  uid: 'ORD202505270001',           // 订单编号
  time: '2025-05-27 14:30:00',      // 下单时间
  status: 'paid',                   // 订单状态
  statusText: '已支付',             // 状态文本
  goods: {                          // 商品信息(简化版)
    uid: 'goods_001',
    title: '比亚迪 仰望U7', 
    image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    price: 299900,
    quantity: 1
  },
  totalAmount: 299900               // 订单总金额
};

// 2. 转换为JSON字符串并进行URL编码
const orderInfoStr = encodeURIComponent(JSON.stringify(orderInfo));

// 3. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_aftersales&orderInfo=${orderInfoStr}`;

// 4. 使用该链接进行跳转
window.location.href = chatUrl;
```

### 使用场景

H5链接对接特别适用于以下场景：

1. 移动端H5订单详情页中的"联系客服"按钮
2. 订单通知邮件或短信中的客服链接
3. 无法进行复杂集成的第三方平台
4. 需要从外部系统快速跳转到客服系统的场景

### 注意事项

- URL有长度限制，请确保编码后的订单信息不会过长
- 敏感信息应脱敏处理或省略
- 确保JSON格式正确，避免解析错误

## 完整示例代码

[订单信息对接示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx)

## 最佳实践

### 1. 订单数据处理

- **敏感信息处理**: 避免传递完整的手机号码、详细地址等敏感信息，可以进行适当脱敏
- **状态规范化**: 统一订单状态编码，便于客服系统理解和处理
- **金额显示**: 确保金额数据类型正确，单位统一（如"元"）
- **图片优化**: 商品图片应经过优化，确保加载速度和显示效果

### 2. 实现技巧

- **按需传递**: 仅在用户点击"咨询客服"按钮时才传递订单信息
- **订单列表**: 如果用户有多个订单，可以设计订单选择机制，让用户指定要咨询的订单
- **状态更新**: 订单状态变更时，更新传递给客服的信息
- **物流跟踪**: 对于已发货订单，可额外传递物流信息

### 3. 用户体验优化

- **问题分类**: 设计常见的订单问题类型，帮助用户快速选择问题
- **服务评分**: 咨询结束后收集用户对解决方案的评价
- **自助选项**: 提供部分常见问题的自助解决方案
- **智能推荐**: 基于订单状态和历史咨询推荐可能的问题解决方案

## 常见问题

### Q1: 如何处理包含多个商品的订单？

**A**: 对于包含多个商品的订单，可以采用以下方法：

1. 在`goods`字段中使用数组存储多个商品信息：

```javascript
goods: [
  {
    uid: 'goods_001',
    title: '商品1',
    // 其他商品信息
  },
  {
    uid: 'goods_002',
    title: '商品2',
    // 其他商品信息
  }
]
```

1. 或者只传递主要商品信息，在`extra`字段中添加简要的其他商品信息。

### Q2: 订单状态发生变化时如何更新？

**A**: 当订单状态变化时，您可以：

1. 监听订单状态变化事件
2. 更新本地订单数据
3. 如果客服会话已经开启，可以通过再次调用`showChat`方法并传递更新后的订单信息：

```javascript
// 订单状态更新后
window.bytedesk?.showChat({
  chatConfig: {
    orderInfo: JSON.stringify(updatedOrderInfo)
  }
});
```

### Q3: 如何处理大量历史订单？

**A**: 对于用户有多个历史订单的情况：

1. 设计一个订单选择界面，让用户从中选择需要咨询的订单
2. 只传递最近的几个订单信息，避免数据过大
3. 提供订单搜索功能，让用户快速找到需要咨询的订单

### Q4: 订单信息中可以包含哪些自定义字段？

**A**: 在`extra`字段中，您可以根据业务需要添加各种自定义信息，例如：

- 发票信息
- 预计送达时间
- 订单备注
- 优惠券使用情况
- 积分使用和获取情况
- 售后服务信息
- 其他定制化需求

## 进阶功能

除了基本的订单信息传递，您还可以考虑实现以下进阶功能：

1. **订单变更提醒**: 当订单状态变化时主动通知用户
2. **退款/售后处理**: 针对退款、换货等售后场景的专门处理
3. **物流追踪集成**: 实时显示物流信息
4. **自定义操作按钮**: 在客服界面提供直接操作选项，如"申请退款"、"修改地址"等
5. **满意度评价**: 问题解决后的满意度评价系统

## 小结

订单信息对接是提升客服体验的重要环节，通过将完整的订单信息传递给客服系统，可以大大提高咨询效率和服务质量。合理设计订单数据结构，确保关键信息准确传递，同时注意保护用户隐私，将帮助您构建更高效的客户服务体系。
