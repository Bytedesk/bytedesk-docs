---
sidebar_label: Product Information
sidebar_position: 7
---

# Product Information Integration

This page explains how to pass product information from your business system to the customer service system, especially suitable for e-commerce websites, helping customer service quickly understand the product details that users are inquiring about.

- Demo link: [Product Information Integration Demo](https://weiyuai.cn/reactdemo)
- Demo code:
- [Product Information Integration Example-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx)
- [Product Information Integration Example-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/goodsInfoDemo.vue)

> Note: Please ensure you have completed the basic functionality integration in the [React Integration Guide](../channel/react.md) or [Vue Integration Guide](../channel/vue.md) before proceeding with product information integration.

![Product Information Integration Example](/img/develop/chat/goodsinfo.png)

## Why do we need product information integration?

In e-commerce scenarios, when users consult customer service, they often ask questions about specific products. Seamlessly passing product information to customer service can:

- Let customer service immediately understand the product the user is browsing
- Save communication time and improve service efficiency
- Enable customer service to provide more accurate answers for specific products
- Improve user satisfaction and conversion rates
- Facilitate customer service recommendations for related or alternative products

## Integration Method

The Weiyu customer service system supports passing product information through configuration parameters. When initializing the customer service component, pass product-related information through the `chatConfig.goodsInfo` configuration item.

### Product Information Data Structure

Product information is passed as a JSON string containing the following fields:

```typescript
// Product information data structure
interface GoodsInfo {
    uid: string;         // Product ID
    title: string;       // Product title
    image: string;       // Product image URL
    description: string; // Product description
    price: number;       // Product price
    url: string;         // Product detail page URL
    tagList: string[];   // Product tag list
    extra: string;       // Additional information (JSON string)
}
```

### Configuration Example

The following is a complete configuration example demonstrating how to pass product information to the customer service system:

```javascript
const config = {
  // Other configuration items
  placement: 'bottom-right',
  autoPopup: false,
  marginBottom: 20,
  marginSide: 20,
  
  // Chat configuration
  chatConfig: {
    org: 'df_org_uid',       // Your organization ID
    t: "1",                   
    sid: 'df_wg_uid',         // Session ID
    
    // Basic user information (optional)
    visitorUid: 'visitor_001',
    nickname: 'Visitor Xiao Ming',
    avatar: 'https://example.com/avatar.jpg',
    
    // Product information - Core part
    goodsInfo: JSON.stringify({
      uid: 'goods_001',                   // Product ID
      title: 'BYD Yangwang U7 Luxury Pure Electric Sedan',  // Product title
      image: 'https://example.com/car.jpg', // Product image
      description: 'The BYD Yangwang U7 is a luxury pure electric sedan using the latest generation Blade Battery technology...', // Product description
      price: 299900,                      // Product price (unit: yuan)
      url: 'https://example.com/product/001', // Product detail page link
      tagList: ['New Energy', 'Luxury Sedan', 'Smart Driving', 'Long Range'], // Product tags
      extra: JSON.stringify({             // Additional custom information
        sku: 'SKU12345',
        stock: 100,
        discount: '8.8折'
      })
    })
  }
};
```

### Product Information Display Effect

When you correctly configure product information, the customer service system will display a product information card in the customer service workbench showing the product the user is inquiring about, including product image, title, price, description, and other key information, making it convenient for customer service to quickly understand product details and provide targeted services.

## H5 Link Integration Method

In addition to component integration, Weiyu customer service also provides a simpler H5 link integration method, suitable for mobile H5 pages or scenarios requiring quick integration.

### H5 Link Format

The basic link format is as follows:

```javascript
https://www.weiyuai.cn/chat/?org=Your Organization ID&t=1&sid=Session ID&goodsInfo=Product Information JSON
```

The `goodsInfo` parameter needs URL encoding, as shown in the following example:

```javascript
// 1. Prepare product information object
const goodsInfo = {
  uid: 'goods_001',                      // Product ID
  title: 'BYD Yangwang U7 Luxury Pure Electric Sedan', // Product title
  image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg', // Product image
  description: 'The BYD Yangwang U7 is a luxury pure electric sedan', // Description
  price: 299900,                         // Price
  tagList: ['New Energy', 'Luxury Sedan']        // Tags
};

// 2. Convert to JSON string and URL encode
const goodsInfoStr = encodeURIComponent(JSON.stringify(goodsInfo));

// 3. Concatenate complete URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&goodsInfo=${goodsInfoStr}`;

// 4. Navigate to customer service consultation page
window.location.href = chatUrl;
// Or create a link
// <a href="${chatUrl}" target="_blank">Contact Customer Service</a>
```

### Usage Scenarios

H5 link integration is particularly suitable for the following scenarios:

1. "Contact Customer Service" buttons on product detail pages
2. Product consultation links in marketing SMS or emails
3. Social media promotion links
4. Third-party platforms that cannot implement complex JS integration

### Implementation Steps

1. **Get Product Information**: Get current product details from your business system
2. **Build Parameter Object**: Build product information JSON object according to format
3. **Encode and Concatenate**: URL encode the JSON string and concatenate it to the base link
4. **Create Link or Button**: Add link or button on the product page pointing to the generated URL

### Important Notes

- Ensure all URL parameters are properly encoded, especially Chinese characters and special characters
- Image URLs should use HTTPS protocol to ensure security
- Simplify product information, only pass necessary fields, avoid overly long URLs
- Consider adding tracking parameters to links for easy conversion rate statistics

### Key Parameter Descriptions

- `uid`: Unique identifier for the product, recommended to use the product ID from your system
- `title`: Product name or title
- `image`: Main product image URL, recommended to use high-definition images
- `description`: Product description information, can be a brief introduction
- `price`: Product price, unit is yuan
- `url`: Complete URL of the product detail page, customer service can click to view
- `tagList`: Product tag array, used to quickly understand product features
- `extra`: Additional custom fields, passed as JSON string

## Best Practices

### 1. Data Preparation

- **Optimize Images**: Ensure product images are optimized, recommended size not exceeding 800×800 pixels
- **Concise Descriptions**: Product descriptions should be concise and highlight core selling points
- **Necessary Tags**: Use tags to mark key product features, such as "New", "Hot Sale", "Limited Time", etc.
- **Complete Links**: Provide complete product URLs for easy customer service access to product pages

### 2. Implementation Techniques

- **Dynamic Passing**: Dynamically update the `goodsInfo` parameter when users browse different products
- **Load on Demand**: Only initialize the customer service component when users click the "Contact Customer Service" button
- **Stock Check**: Pass stock information in the `extra` field for easy customer service to inform users
- **Multi-Product Support**: Design mechanisms that allow users to consult multiple products simultaneously

### 3. User Experience Optimization

- **Button Placement**: Place "Contact Customer Service" buttons in prominent positions on product detail pages
- **Preset Questions**: Preset common questions for specific products to help users quickly initiate consultations
- **Real-time Updates**: Update information passed to customer service in time when product prices or stock changes
- **Feedback Mechanism**: Collect user feedback after consultation to optimize service processes

## Common Questions

### Q1: How to update product information when users browse different products?

**A**: You need to re-initialize the customer service component when users switch products, or dynamically pass current product information when opening the chat window. Example code:

```javascript
// When user switches to new product
const switchToProduct = (newProduct) => {
  setCurrentProduct(newProduct);
  
  // Open chat window and pass new product information
  window.bytedesk?.showChat({
    chatConfig: {
      goodsInfo: JSON.stringify({
        uid: newProduct.uid,
        title: newProduct.title,
        // ...other product information
      })
    }
  });
};
```

### Q2: What are the requirements for images in product information?

**A**: Product images should:

- Use HTTPS links to ensure security
- Be optimized for fast loading
- Clearly showcase product features
- Recommended size not exceeding 800×800 pixels
- Ensure image URLs are publicly accessible

### Q3: How to handle consultations for multiple products?

**A**: There are several methods to handle multi-product consultations:

1. Update the passed product information each time users click "Contact Customer Service" buttons for different products
2. Use the `extra` field to pass brief information about multiple products
3. Implement a "Shopping Cart Consultation" feature in your business system to pass multiple product information to customer service at once

### Q4: How to synchronize product price changes to the customer service system?

**A**: You should ensure that the latest product information, including real-time prices, is obtained when opening the customer service chat window. If prices change during the conversation, you can pass updated product information by calling the `showChat` method again.

## Advanced Features

In addition to basic product information passing, you can also implement the following advanced features:

1. **Product Recommendations**: Customer service can recommend related products to users
2. **Real-time Stock**: Display real-time stock status in conversations
3. **Price Notifications**: Notify users when product prices change
4. **Promotional Combinations**: Show promotional combinations for specific products
5. **Purchase History**: Provide personalized services based on user purchase history

## Summary

Product information integration is an important part of improving e-commerce customer service experience. By seamlessly passing product details to the customer service system, communication efficiency and service quality can be greatly improved, thereby enhancing user satisfaction and conversion rates. During implementation, please pay attention to keeping data concise, updating in time, and optimizing user experience.

## Complete Example Code

[Product Information Integration Example](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx)
