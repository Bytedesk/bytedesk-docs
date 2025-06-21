---
sidebar_label: 商品信息
sidebar_position: 7
---

# 商品信息对接

本页面介绍如何将业务系统中的商品信息传递给客服系统，特别适用于电商类网站，帮助客服快速了解用户咨询的商品详情。

- 演示链接：[商品信息对接演示](https://weiyuai.cn/reactdemo)
<!-- - H5链接演示：[H5商品信息对接](https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&goodsInfo=%7B%22uid%22%3A%22goods_001%22%2C%22title%22%3A%22%E6%AF%94%E4%BA%9A%E8%BF%AA%20%E4%BB%B0%E6%9C%9BU7%20%E8%B1%AA%E5%8D%8E%E7%BA%AF%E7%94%B5%E5%8A%A8%E8%BD%BF%E8%BD%A6%22%2C%22image%22%3A%22https%3A%2F%2Fwww.weiyuai.cn%2Fassets%2Fimages%2Fcar%2Fyu7.jpg%22%2C%22price%22%3A299900%2C%22description%22%3A%22%E6%AF%94%E4%BA%9A%E8%BF%AA%E4%BB%B0%E6%9C%9BU7%E6%98%AF%E4%B8%80%E6%AC%BE%E8%B1%AA%E5%8D%8E%E7%BA%AF%E7%94%B5%E5%8A%A8%E8%BD%BF%E8%BD%A6%22%2C%22tagList%22%3A%5B%22%E6%96%B0%E8%83%BD%E6%BA%90%22%2C%22%E8%B1%AA%E5%8D%8E%E8%BD%BF%E8%BD%A6%22%5D%7D) -->
- 演示代码：[商品信息对接示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx)

> 注意：请确保您已经完成了[React集成指南](../channel/react.md)中的基本功能对接，才能继续进行商品信息对接。

![商品信息对接示例](/img/develop/chat/goodsinfo.png)

## 为什么需要商品信息对接？

在电商场景中，用户咨询客服时往往是针对特定商品提问。无缝地将商品信息传递给客服可以：

- 让客服立即了解用户正在浏览的商品
- 节省沟通时间，提高服务效率
- 让客服能够针对具体商品提供更准确的回答
- 提高用户满意度和转化率
- 便于客服推荐相关或替代产品

## 对接方法

微语客服系统支持通过配置参数传入商品信息。在初始化客服组件时，通过`chatConfig.goodsInfo`配置项传入商品相关信息。

### 商品信息数据结构

商品信息以JSON字符串形式传递，包含以下字段：

```typescript
// 商品信息数据结构
interface GoodsInfo {
    uid: string;         // 商品ID
    title: string;       // 商品标题
    image: string;       // 商品图片URL
    description: string; // 商品描述
    price: number;       // 商品价格
    url: string;         // 商品详情页URL
    tagList: string[];   // 商品标签列表
    extra: string;       // 额外信息(JSON字符串)
}
```

### 配置示例

以下是一个完整的配置示例，演示如何将商品信息传递给客服系统：

```javascript
const config = {
  // 其他配置项
  placement: 'bottom-right',
  autoPopup: false,
  marginBottom: 20,
  marginSide: 20,
  
  // 聊天配置
  chatConfig: {
    org: 'df_org_uid',       // 您的组织ID
    t: "1",                   
    sid: 'df_wg_uid',         // 会话ID
    
    // 用户基本信息（可选）
    uid: 'visitor_001',
    nickname: '访客小明',
    avatar: 'https://example.com/avatar.jpg',
    
    // 商品信息 - 核心部分
    goodsInfo: JSON.stringify({
      uid: 'goods_001',                   // 商品ID
      title: '比亚迪 仰望U7 豪华纯电动轿车',  // 商品标题
      image: 'https://example.com/car.jpg', // 商品图片
      description: '比亚迪仰望U7是一款豪华纯电动轿车，采用最新一代刀片电池技术...', // 商品描述
      price: 299900,                      // 商品价格（单位：元）
      url: 'https://example.com/product/001', // 商品详情页链接
      tagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'], // 商品标签
      extra: JSON.stringify({             // 额外自定义信息
        sku: 'SKU12345',
        stock: 100,
        discount: '8.8折'
      })
    })
  }
};
```

### 商品信息显示效果

当您正确配置商品信息后，客服系统会在客服工作台显示用户正在咨询的商品信息卡片，包括商品图片、标题、价格、描述等关键信息，方便客服快速了解商品详情并提供针对性服务。

## H5链接对接方法

除了组件集成方式，微语客服还提供了更简便的H5链接对接方式，适用于移动端H5页面或需要快速集成的场景。

### H5链接格式

基本链接格式如下：

```javascript
https://www.weiyuai.cn/chat/?org=您的组织ID&t=1&sid=会话ID&goodsInfo=商品信息JSON
```

其中`goodsInfo`参数需要进行URL编码，示例如下：

```javascript
// 1. 准备商品信息对象
const goodsInfo = {
  uid: 'goods_001',                      // 商品ID
  title: '比亚迪 仰望U7 豪华纯电动轿车', // 商品标题
  image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg', // 商品图片
  description: '比亚迪仰望U7是一款豪华纯电动轿车', // 描述
  price: 299900,                         // 价格
  tagList: ['新能源', '豪华轿车']        // 标签
};

// 2. 转换为JSON字符串并进行URL编码
const goodsInfoStr = encodeURIComponent(JSON.stringify(goodsInfo));

// 3. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&goodsInfo=${goodsInfoStr}`;

// 4. 跳转到客服咨询页面
window.location.href = chatUrl;
// 或者创建一个链接
// <a href="${chatUrl}" target="_blank">咨询客服</a>
```

### 使用场景

H5链接对接方式特别适合以下场景：

1. 商品详情页中的"咨询客服"按钮
2. 营销短信或邮件中的产品咨询链接
3. 社交媒体推广链接
4. 无法实现复杂JS集成的第三方平台

### 实现步骤

1. **获取商品信息**: 从您的业务系统中获取当前商品详情
2. **构建参数对象**: 按格式构建商品信息JSON对象
3. **编码与拼接**: 将JSON字符串URL编码并拼接到基础链接
4. **创建链接或按钮**: 在商品页面添加链接或按钮，指向生成的URL

### 注意事项

- 确保所有URL参数都经过正确编码，特别是中文和特殊字符
- 图片URL应使用HTTPS协议，确保安全
- 简化商品信息，只传递必要字段，避免URL过长
- 考虑在链接中添加跟踪参数，方便统计转化率

### 关键参数说明

- `uid`: 商品的唯一标识符，建议使用您系统中的商品ID
- `title`: 商品的名称或标题
- `image`: 商品的主图URL，建议使用高清图片
- `description`: 商品的描述信息，可以是简短介绍
- `price`: 商品价格，单位为元
- `url`: 商品详情页的完整URL，客服可以点击查看
- `tagList`: 商品标签数组，用于快速了解商品特点
- `extra`: 额外的自定义字段，以JSON字符串形式传递

## 最佳实践

### 1. 数据准备

- **精简图片**: 确保商品图片经过优化，建议尺寸不超过800×800像素
- **简洁描述**: 商品描述应简明扼要，突出核心卖点
- **必要标签**: 使用标签标注商品的关键特性，如"新品"、"热销"、"限时"等
- **完整链接**: 提供完整的商品URL，便于客服快速访问商品页面

### 2. 实现技巧

- **动态传递**: 在用户浏览不同商品时，动态更新`goodsInfo`参数
- **按需加载**: 只在用户点击"咨询客服"按钮时才初始化客服组件
- **库存检查**: 在`extra`字段中传递库存信息，便于客服告知用户
- **多商品支持**: 设计允许用户同时咨询多个商品的机制

### 3. 用户体验优化

- **按钮位置**: 在商品详情页的显眼位置放置"咨询客服"按钮
- **预设问题**: 针对特定商品预设常见问题，帮助用户快速发起咨询
- **实时更新**: 当商品价格或库存变动时，及时更新传递给客服的信息
- **反馈机制**: 在咨询结束后收集用户反馈，优化服务流程

## 常见问题

### Q1: 如何在用户浏览不同商品时更新商品信息？

**A**: 您需要在用户切换商品时重新初始化客服组件，或者在打开聊天窗口时动态传入当前商品信息，示例代码如下：

```javascript
// 用户切换到新商品时
const switchToProduct = (newProduct) => {
  setCurrentProduct(newProduct);
  
  // 打开聊天窗口并传入新的商品信息
  window.bytedesk?.showChat({
    chatConfig: {
      goodsInfo: JSON.stringify({
        uid: newProduct.uid,
        title: newProduct.title,
        // ...其他商品信息
      })
    }
  });
};
```

### Q2: 商品信息中的图片有什么要求？

**A**: 商品图片应当:

- 使用HTTPS链接确保安全
- 经过优化以快速加载
- 清晰展示商品特点
- 建议尺寸不超过800×800像素
- 确保图片URL可公开访问

### Q3: 如何处理多个商品的咨询？

**A**: 有几种方法处理多商品咨询:

1. 用户每次点击不同商品的"咨询客服"按钮时，更新传入的商品信息
2. 利用`extra`字段传递多个商品的简要信息
3. 在您的业务系统中实现一个"购物车咨询"功能，将多个商品信息一次性传递给客服

### Q4: 商品价格变动如何同步到客服系统？

**A**: 您应该确保在打开客服聊天窗口时获取最新的商品信息，包括实时价格。如果在对话过程中价格发生变化，您可以通过再次调用`showChat`方法并传入更新后的商品信息。

## 进阶功能

除了基本的商品信息传递，您还可以实现以下进阶功能：

1. **商品推荐**: 客服可以向用户推荐相关商品
2. **实时库存**: 在对话中显示实时库存状态
3. **价格通知**: 当商品价格变动时通知用户
4. **促销组合**: 展示特定商品的促销组合
5. **购买历史**: 结合用户购买历史提供个性化服务

## 小结

商品信息对接是提升电商客服体验的重要环节。通过将商品详情无缝传递给客服系统，可以大幅提高沟通效率和服务质量，进而提升用户满意度和转化率。在实现过程中，请注意保持数据简洁、及时更新和优化用户体验。

## 完整示例代码

[商品信息对接示例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx)
