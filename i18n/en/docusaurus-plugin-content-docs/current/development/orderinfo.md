---
sidebar_label: Order Information
sidebar_position: 6
---

# Order Information Integration

This page explains how to pass order information from your business system to the customer service system, especially suitable for e-commerce, logistics, and other scenarios that require order consultation services, helping customer service quickly understand the order details that users are inquiring about.

- Demo link: [Order Information Integration Demo](https://weiyuai.cn/reactdemo)
- Demo code:
- [Order Information Integration Example-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx)
- [Order Information Integration Example-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/orderInfoDemo.vue)

> Note: Please ensure you have completed the basic functionality integration in the [React Integration Guide](../channel/react.md) before proceeding with order information integration.

## Visitor End Integration Example

![Visitor End Integration Example](/img/develop/chat/orderinfo.png)

## Customer Service End Integration Example

![Customer Service End Integration Example](/img/develop/chat/orderinfo_agent.png)

## Why do we need order information integration?

In customer service scenarios, order issues are one of the most common topics users consult about. Order information integration can:

- Let customer service immediately understand the order details users are inquiring about without requiring users to repeat descriptions
- Accurately display key data such as order status, product information, delivery information, etc.
- Greatly improve the efficiency and accuracy of customer service problem resolution
- Reduce user waiting time and improve customer satisfaction
- Provide complete order background information for after-sales service

## Order Information Data Structure

Order information includes data from multiple aspects, mainly including:

```typescript
// Order information data structure
interface OrderInfo {
    uid: string;              // Order number
    time: string;             // Order time
    status: string;           // Order status code
    statusText: string;       // Order status text
    goods: GoodsInfo;         // Product information
    totalAmount: number;      // Order total amount
    shippingAddress: {        // Shipping information
        name: string;         // Recipient name
        phone: string;        // Contact phone
        address: string;      // Shipping address
    };
    paymentMethod: string;    // Payment method
    extra: string;            // Additional information (JSON string)
}

// Product information data structure
interface GoodsInfo {
    uid: string;              // Product ID
    title: string;            // Product title
    image: string;            // Product image URL
    description: string;      // Product description
    price: number;            // Product price
    url: string;              // Product detail page URL
    tagList: string[];        // Product tag list
    quantity: number;         // Purchase quantity
    extra: string;            // Additional information (JSON string)
}
```

## Integration Method

The Weiyu customer service system passes order information through configuration parameters. When initializing the customer service component, pass order data through the `chatConfig.orderInfo` configuration item.

### Configuration Example

The following is a complete configuration example demonstrating how to pass order information to the customer service system:

```javascript
const config = {
  // Basic configuration
  placement: 'bottom-right',
  autoPopup: false,
  marginBottom: 20,
  marginSide: 20,
  buttonConfig: {
    show: false,  // Hide default button, use custom button
  },
  bubbleConfig: {
    show: false,  // Hide bubble
    icon: '📦',
    title: 'Order issues?',
    subtitle: 'Click to contact customer service'
  },
  
  // Chat configuration
  chatConfig: {
    org: 'df_org_uid',    // Replace with your organization ID
    t: "1",
    sid: 'df_wg_uid',     // Replace with your SID
    
    // Optional: Pass user information
    visitorUid: 'visitor_001',
    nickname: 'Visitor Xiao Ming',
    avatar: 'https://example.com/avatar.jpg',
    
    // Order information - Core part
    orderInfo: JSON.stringify({
      uid: 'ORD202505270001',               // Order number
      time: '2025-05-27 14:30:00',          // Order time
      status: 'paid',                        // Order status code
      statusText: 'Paid',                    // Order status text
      
      // Product information
      goods: {
        uid: 'goods_001',
        title: 'BYD Yangwang U7 Luxury Pure Electric Sedan',
        image: 'https://example.com/yu7.jpg',
        description: 'The BYD Yangwang U7 is a luxury pure electric sedan...',
        price: 299900,
        url: 'https://example.com/product/yu7',
        tagList: ['New Energy', 'Luxury Sedan', 'Smart Driving', 'Long Range'],
        quantity: 1,
        extra: JSON.stringify({
          color: 'Aurora Blue',
          configuration: 'Luxury Edition'
        })
      },
      
      totalAmount: 299900,                  // Order total amount
      
      // Shipping information
      shippingAddress: {
        name: 'Zhang San',
        phone: '13800138000',
        address: 'No. 88 Jianguo Road, Chaoyang District, Beijing'
      },
      
      paymentMethod: 'WeChat Pay',            // Payment method
      
      // Additional information
      extra: JSON.stringify({
        invoiceType: 'Electronic Invoice',
        expectedDelivery: '2025-05-30',
        remarks: 'Please deliver on weekdays'
      })
    })
  },
  locale: 'zh-cn',
};
```

### Order Information Display Effect

When you correctly configure order information, the customer service system will display an order detail card in the customer service workbench showing the order the user is inquiring about, including order number, status, product information, shipping address, and other key information, making it convenient for customer service to quickly understand the order situation and provide targeted services.

## H5 Link Integration Method

In addition to component integration, Weiyu customer service also supports directly passing order information through URL parameters, especially suitable for H5 pages or scenarios requiring quick integration.

### H5 Link Format

The basic link format is as follows:

```javascript
https://www.weiyuai.cn/chat/?org=Your Organization ID&t=1&sid=Session ID&orderInfo=Order Information JSON
```

The `orderInfo` parameter needs URL encoding, as shown in the following example:

```javascript
// 1. Prepare order information object
const orderInfo = {
  uid: 'ORD202505270001',           // Order number
  time: '2025-05-27 14:30:00',      // Order time
  status: 'paid',                   // Order status
  statusText: 'Paid',               // Status text
  goods: {                          // Product information (simplified version)
    uid: 'goods_001',
    title: 'BYD Yangwang U7', 
    image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    price: 299900,
    quantity: 1
  },
  totalAmount: 299900               // Order total amount
};

// 2. Convert to JSON string and URL encode
const orderInfoStr = encodeURIComponent(JSON.stringify(orderInfo));

// 3. Concatenate complete URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_aftersales&orderInfo=${orderInfoStr}`;

// 4. Use this link for navigation
window.location.href = chatUrl;
```

### Usage Scenarios

H5 link integration is particularly suitable for the following scenarios:

1. "Contact Customer Service" buttons on mobile H5 order detail pages
2. Customer service links in order notification emails or SMS
3. Third-party platforms that cannot perform complex integration
4. Scenarios requiring quick navigation from external systems to the customer service system

### Important Notes

- URLs have length limits, please ensure the encoded order information is not too long
- Sensitive information should be desensitized or omitted
- Ensure JSON format is correct to avoid parsing errors

## Complete Example Code

[Order Information Integration Example](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx)

## Best Practices

### 1. Order Data Processing

- **Sensitive Information Handling**: Avoid passing complete phone numbers, detailed addresses, and other sensitive information, which can be appropriately desensitized
- **Status Standardization**: Unify order status codes for easy understanding and processing by the customer service system
- **Amount Display**: Ensure amount data types are correct and units are unified (such as "yuan")
- **Image Optimization**: Product images should be optimized to ensure loading speed and display effects

### 2. Implementation Techniques

- **Pass on Demand**: Only pass order information when users click the "Contact Customer Service" button
- **Order List**: If users have multiple orders, you can design an order selection mechanism to let users specify which order to consult about
- **Status Updates**: Update information passed to customer service when order status changes
- **Logistics Tracking**: For shipped orders, additional logistics information can be passed

### 3. User Experience Optimization

- **Problem Classification**: Design common order problem types to help users quickly select issues
- **Service Rating**: Collect user evaluations of solutions after consultation
- **Self-Service Options**: Provide self-service solutions for some common problems
- **Smart Recommendations**: Recommend possible problem solutions based on order status and consultation history

## Common Questions

### Q1: How to handle orders containing multiple products?

**A**: For orders containing multiple products, you can use the following methods:

1. Use an array to store multiple product information in the `goods` field:

```javascript
goods: [
  {
    uid: 'goods_001',
    title: 'Product 1',
    // Other product information
  },
  {
    uid: 'goods_002',
    title: 'Product 2',
    // Other product information
  }
]
```

1. Or only pass main product information and add brief information about other products in the `extra` field.

### Q2: How to update when order status changes?

**A**: When order status changes, you can:

1. Monitor order status change events
2. Update local order data
3. If the customer service session is already open, you can pass updated order information by calling the `showChat` method again:

```javascript
// After order status update
window.bytedesk?.showChat({
  chatConfig: {
    orderInfo: JSON.stringify(updatedOrderInfo)
  }
});
```

### Q3: How to handle large numbers of historical orders?

**A**: For situations where users have multiple historical orders:

1. Design an order selection interface to let users choose which order to consult about
2. Only pass information about the most recent few orders to avoid overly large data
3. Provide order search functionality to let users quickly find orders they need to consult about

### Q4: What custom fields can be included in order information?

**A**: In the `extra` field, you can add various custom information according to business needs, such as:

- Invoice information
- Expected delivery time
- Order remarks
- Coupon usage
- Points usage and acquisition
- After-sales service information
- Other customization requirements

## Advanced Features

In addition to basic order information passing, you can also consider implementing the following advanced features:

1. **Order Change Notifications**: Actively notify users when order status changes
2. **Refund/After-sales Processing**: Specialized handling for after-sales scenarios such as refunds and exchanges
3. **Logistics Tracking Integration**: Real-time display of logistics information
4. **Custom Operation Buttons**: Provide direct operation options in the customer service interface, such as "Apply for Refund", "Modify Address", etc.
5. **Satisfaction Evaluation**: Satisfaction evaluation system after problem resolution

## Summary

Order information integration is an important part of improving customer service experience. By passing complete order information to the customer service system, consultation efficiency and service quality can be greatly improved. Reasonably designing order data structures, ensuring accurate transmission of key information, while paying attention to protecting user privacy, will help you build a more efficient customer service system.
