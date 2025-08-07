---
sidebar_label: 访客邀请对话框
sidebar_position: 20
---

# 访客邀请对话框

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

## 概述

访客邀请对话框是微语客服系统的主动营销功能，通过智能化的邀请策略主动邀请网站访客开始对话。系统可以根据访客行为、停留时间、浏览路径等因素，在合适的时机弹出友好的邀请对话框，显著提升客户转化率和服务覆盖面。

:::info 功能说明
本文档主要介绍**访客端邀请对话框功能**。如需了解客服端协作邀请功能，请参考：[邀请会话](./invite.md)
:::

### 核心价值

- **主动服务**：变被动等待为主动邀请，提升服务触达率
- **智能触发**：基于用户行为智能判断最佳邀请时机
- **转化提升**：通过友好邀请显著提升访客咨询转化率
- **个性体验**：定制化邀请内容，提供个性化服务体验

## 邀请类型

### 💬 弹窗邀请

网页访客浏览时自动弹出的邀请对话框，是最常见的邀请形式。

**特点优势：**

- **视觉突出**：弹窗形式更容易引起访客注意
- **信息丰富**：可以展示较多的邀请信息和服务说明
- **交互友好**：支持接受、拒绝、稍后等多种响应选项
- **品牌展示**：可以展示企业Logo、客服头像等品牌元素

### 🔔 气泡邀请

页面右下角显示的友好邀请气泡，相对温和不打扰的邀请方式。

**适用场景：**

- **轻量邀请**：不希望过于打扰用户的温和邀请
- **持续展示**：长时间停留在页面角落，持续提醒
- **移动友好**：在移动端有更好的展示效果
- **品牌一致**：与网站整体设计风格保持一致

### ⏰ 定时邀请

根据访客行为和停留时间智能触发的邀请机制。

**触发条件：**

- **时间触发**：页面停留时间超过设定阈值
- **行为触发**：特定操作后触发邀请
- **路径触发**：访问特定页面或路径后邀请
- **意图触发**：检测到购买意图或困惑行为

### 🎯 个性化邀请

基于访客特征和历史行为定制的个性化邀请内容。

**个性化维度：**

- **访客类型**：新访客、回访客户、VIP客户
- **地理位置**：不同地区的本地化邀请内容
- **设备类型**：PC端、移动端的差异化展示
- **来源渠道**：搜索引擎、广告、直接访问等不同来源

## 核心功能

### 🎯 智能邀请策略

#### 行为分析触发

1. **页面停留分析**
   - 设置不同页面的停留时间阈值
   - 分析用户浏览深度和专注度
   - 识别用户犹豫或困惑的行为模式
   - 在最佳时机触发邀请对话

2. **交互行为监控**
   - 监控鼠标移动轨迹和点击行为
   - 检测页面滚动速度和停留区域
   - 识别表单填写中断等关键行为
   - 分析购物车操作和付款流程

3. **意图识别系统**
   - 基于页面内容识别用户需求
   - 分析搜索关键词和来源信息
   - 检测价格比较和产品对比行为
   - 识别帮助文档和FAQ页面访问

#### 时间策略控制

1. **首次邀请策略**
   - 设置首次弹出的延迟时间
   - 根据页面类型调整等待时长
   - 避免页面加载时立即弹出
   - 确保用户有足够时间浏览内容

2. **循环邀请机制**
   - 设置邀请重复显示的间隔时间
   - 控制总的邀请次数上限
   - 智能调整邀请频率避免打扰
   - 支持无限循环或限定次数

3. **时段控制功能**
   - 设置工作时间内的邀请策略
   - 非工作时间的留言邀请模式
   - 节假日期间的特殊邀请安排
   - 不同时区的本地化时间控制

### 🌟 邀请内容定制

#### 视觉设计定制

1. **主题样式配置**
   - 现代简约、商务专业、温馨友好等多种主题
   - 自定义颜色方案和字体样式
   - 支持深色模式和浅色模式切换
   - 与网站整体设计风格保持一致

2. **品牌元素展示**
   - 企业Logo和品牌标识展示
   - 客服人员头像和姓名信息
   - 品牌色彩和视觉识别应用
   - 企业认证标识和信任符号

3. **动画效果配置**
   - 滑入、淡入、缩放等多种动画效果
   - 可调节动画速度和缓动函数
   - 支持禁用动画以适应性能需求
   - 无障碍访问的动画替代方案

#### 文案内容个性化

1. **标题和正文定制**
   - 自定义邀请标题和主要内容
   - 支持HTML格式和富文本编辑
   - 多语言版本的文案管理
   - 动态变量插入（姓名、产品等）

2. **按钮文字配置**
   - 自定义"接受"和"拒绝"按钮文字
   - 支持"稍后提醒"等第三选项
   - 不同情境下的按钮文案变化
   - 按钮颜色和样式的个性化设置

3. **情境化内容适配**
   - 根据页面内容自动调整邀请文案
   - 产品页面突出产品相关服务
   - 价格页面强调咨询优惠信息
   - 技术页面提供专业技术支持

### 📊 效果分析优化

#### A/B测试支持

1. **多版本对比测试**
   - 同时运行多个邀请版本进行对比
   - 自动分配流量进行测试
   - 实时收集转化数据和用户反馈
   - 基于数据自动优选最佳版本

2. **测试维度配置**
   - 邀请文案内容的对比测试
   - 弹出时机和频率的效果测试
   - 视觉设计和交互方式的比较
   - 不同目标用户群体的差异化测试

#### 数据分析报告

1. **核心指标监控**
   - 邀请展示次数和展示率统计
   - 邀请接受率和拒绝率分析
   - 会话转化率和最终成交率
   - 用户满意度和服务质量评分

2. **深度分析洞察**
   - 不同时间段的邀请效果对比
   - 各页面邀请转化率的差异分析
   - 用户设备和渠道来源的影响
   - 长期趋势变化和季节性规律

## 配置指南

### 基础配置设置

#### 邀请对话框配置

```javascript
// 基础邀请配置
const inviteConfig = {
  // 基本设置
  show: true,                    // 是否启用邀请功能
  delay: 5000,                   // 首次弹出延迟时间(毫秒)
  
  // 循环设置  
  loop: true,                    // 是否启用循环邀请
  loopDelay: 30000,              // 循环间隔时间(毫秒)
  loopCount: 3,                  // 最大邀请次数(0表示无限)
  
  // 显示位置和样式
  position: "center",            // 显示位置: center/bottom-right/bottom-left
  theme: "modern",               // 主题样式: modern/classic/minimal
  
  // 文案定制
  title: "需要帮助吗？",
  content: "我们的专业客服团队随时为您提供支持",
  acceptText: "开始咨询",
  rejectText: "暂时不用",
  deferText: "稍后提醒",
  
  // 品牌设置
  showAvatar: true,              // 显示客服头像
  showLogo: true,                // 显示企业Logo
  brandColor: "#1890ff",         // 品牌主色调
};
```

#### 触发规则配置

```javascript
// 触发条件配置
const triggerConfig = {
  // 页面规则
  pages: {
    include: ["/products/*", "/pricing", "/contact"],  // 包含页面
    exclude: ["/admin/*", "/api/*"],                   // 排除页面
  },
  
  // 用户行为触发
  behavior: {
    scrollPercent: 50,           // 页面滚动百分比触发
    mouseIdle: 10000,            // 鼠标停止活动时间(毫秒)
    exitIntent: true,            // 离开意图检测
    formAbandonment: true,       // 表单放弃检测
  },
  
  // 访客特征筛选
  visitor: {
    newVisitor: true,            // 新访客
    returningVisitor: false,     // 回访客户  
    deviceType: ["desktop", "mobile"],  // 设备类型
    trafficSource: ["organic", "paid", "direct"],  // 流量来源
  },
  
  // 时间控制
  timing: {
    workingHours: {
      enabled: true,
      timezone: "Asia/Shanghai",
      schedule: {
        monday: "09:00-18:00",
        tuesday: "09:00-18:00", 
        wednesday: "09:00-18:00",
        thursday: "09:00-18:00",
        friday: "09:00-18:00",
        saturday: "10:00-16:00",
        sunday: "closed"
      }
    }
  }
};
```

### 高级配置选项

#### 个性化设置

```javascript
// 个性化邀请配置
const personalizationConfig = {
  // 动态内容
  dynamicContent: {
    useVisitorName: true,        // 使用访客姓名
    usePageContext: true,        // 根据页面内容调整
    useGeoLocation: true,        // 根据地理位置定制
  },
  
  // 条件规则
  conditionalRules: [
    {
      condition: "page_url_contains('/pricing')",
      content: {
        title: "对价格有疑问吗？",
        message: "让我们为您详细介绍最适合的方案"
      }
    },
    {
      condition: "visitor_type == 'returning'",
      content: {
        title: "欢迎回来！",
        message: "有什么新的问题需要我们协助吗？"
      }
    }
  ],
  
  // 语言本地化
  localization: {
    autoDetect: true,            // 自动检测语言
    defaultLang: "zh-CN",        // 默认语言
    fallbackLang: "en",          // 备选语言
    supportedLangs: ["zh-CN", "zh-TW", "en", "ja", "ko"]
  }
};
```

#### 集成配置

```javascript
// 第三方集成配置
const integrationConfig = {
  // 分析工具集成
  analytics: {
    googleAnalytics: {
      enabled: true,
      trackingId: "GA_TRACKING_ID",
      eventCategory: "Chat Invite"
    },
    customEvents: {
      onShow: "invite_shown",
      onAccept: "invite_accepted", 
      onReject: "invite_rejected"
    }
  },
  
  // CRM系统集成
  crm: {
    enabled: true,
    syncVisitorData: true,
    trackConversions: true
  },
  
  // 营销自动化
  marketing: {
    leadScoring: true,
    segmentTracking: true,
    campaignAttribution: true
  }
};
```

## 技术集成

### 前端SDK集成

#### Web端集成

```html
<!-- 基础HTML集成 -->
<!DOCTYPE html>
<html>
<head>
    <title>网站标题</title>
</head>
<body>
    <!-- 网站内容 -->
    
    <!-- 微语客服代码 -->
    <script>
        window.bytedeskConfig = {
            // 基础配置
            org: 'your_org_id',
            sid: 'your_service_id',
            
            // 邀请对话框配置
            inviteConfig: {
                show: true,
                delay: 3000,
                loop: true,
                loopDelay: 20000,
                loopCount: 2,
                
                title: "需要帮助吗？",
                content: "我们的客服团队随时为您服务",
                acceptText: "立即咨询",
                rejectText: "不需要",
                
                theme: "modern",
                position: "bottom-right",
                showAvatar: true,
                brandColor: "#1890ff"
            }
        };
    </script>
    <script src="https://cdn.bytedesk.com/js/bytedesk-web.js"></script>
</body>
</html>
```

#### JavaScript API

```javascript
// 邀请对话框控制API
class BytedeskInvite {
    // 显示邀请对话框
    static show(config = {}) {
        window.bytedesk?.showInviteDialog(config);
    }
    
    // 隐藏邀请对话框  
    static hide() {
        window.bytedesk?.hideInviteDialog();
    }
    
    // 更新邀请配置
    static updateConfig(config) {
        window.bytedesk?.updateInviteConfig(config);
    }
    
    // 监听邀请事件
    static on(event, callback) {
        window.bytedesk?.on(`invite.${event}`, callback);
    }
    
    // 移除事件监听
    static off(event, callback) {
        window.bytedesk?.off(`invite.${event}`, callback);
    }
}

// 事件监听示例
BytedeskInvite.on('shown', function(data) {
    console.log('邀请对话框已显示', data);
    // 发送统计事件
    gtag('event', 'invite_shown', {
        'custom_parameter': data.inviteId
    });
});

BytedeskInvite.on('accepted', function(data) {
    console.log('用户接受邀请', data);
    // 记录转化事件
    gtag('event', 'invite_accepted', {
        'value': 1,
        'currency': 'CNY'
    });
});

BytedeskInvite.on('rejected', function(data) {
    console.log('用户拒绝邀请', data);
    // 分析拒绝原因
    analytics.track('Invite Rejected', {
        reason: data.reason,
        timing: data.showTime
    });
});
```

### 移动端集成

#### React Native

```javascript
import { BytedeskInvite } from '@bytedesk/react-native';

// 配置邀请功能
const inviteConfig = {
  show: true,
  delay: 3000,
  title: "需要帮助吗？",
  content: "专业客服为您答疑解惑",
  acceptText: "开始咨询",
  rejectText: "稍后再说",
  
  // 移动端特定配置
  mobile: {
    fullWidth: true,
    slideUp: true,
    hapticFeedback: true
  }
};

// 使用组件
export default function App() {
  return (
    <View style={styles.container}>
      {/* 应用内容 */}
      
      <BytedeskInvite
        config={inviteConfig}
        onShow={(data) => console.log('邀请显示', data)}
        onAccept={(data) => console.log('接受邀请', data)}
        onReject={(data) => console.log('拒绝邀请', data)}
      />
    </View>
  );
}
```

#### Flutter

```dart
import 'package:bytedesk_flutter/bytedesk_invite.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Stack(
          children: [
            // 应用主要内容
            YourMainContent(),
            
            // 邀请对话框
            BytedeskInvite(
              config: InviteConfig(
                show: true,
                delay: Duration(seconds: 3),
                title: "需要帮助吗？",
                content: "专业客服团队为您服务",
                acceptText: "立即咨询",
                rejectText: "不需要",
                
                // Flutter特定配置
                theme: InviteTheme.material,
                position: InvitePosition.bottomCenter,
                animation: InviteAnimation.slideUp,
              ),
              
              onShow: (data) => print('邀请显示: $data'),
              onAccept: (data) => print('接受邀请: $data'),
              onReject: (data) => print('拒绝邀请: $data'),
            ),
          ],
        ),
      ),
    );
  }
}
```

### 后端API

#### 邀请统计API

```bash
# 获取邀请统计数据
GET /api/invite/stats?start_date=2024-01-01&end_date=2024-01-31

# 响应示例
{
  "code": 200,
  "data": {
    "total_shows": 15420,
    "total_accepts": 3210,
    "total_rejects": 8950,
    "total_defers": 1260,
    "acceptance_rate": 20.8,
    "conversion_rate": 15.6,
    "daily_stats": [
      {
        "date": "2024-01-01",
        "shows": 523,
        "accepts": 108,
        "rejects": 301,
        "defers": 42
      }
    ]
  }
}
```

#### 邀请配置API

```bash
# 更新邀请配置
PUT /api/invite/config
Content-Type: application/json

{
  "show": true,
  "delay": 5000,
  "loop": true,
  "loopDelay": 30000,
  "loopCount": 3,
  "title": "需要帮助吗？",
  "content": "专业客服团队为您提供支持",
  "acceptText": "开始咨询",
  "rejectText": "暂时不用",
  "theme": "modern",
  "position": "center"
}

# 获取当前配置
GET /api/invite/config

# 批量更新多语言配置
POST /api/invite/config/i18n
{
  "zh-CN": {
    "title": "需要帮助吗？",
    "content": "专业客服团队为您提供支持"
  },
  "en": {
    "title": "Need Help?", 
    "content": "Our professional support team is here for you"
  }
}
```

## 最佳实践

### 邀请策略优化

#### 时机选择最佳实践

1. **页面停留时间设置**
   - **首页/落地页**：15-20秒后邀请，给用户足够浏览时间
   - **产品详情页**：30-45秒后邀请，用户可能产生疑问
   - **价格页面**：20-30秒后邀请，帮助解答价格疑虑
   - **帮助文档页**：10-15秒后邀请，用户可能需要进一步支持

2. **行为触发优化**
   - **滚动监控**：页面滚动超过50%时触发，表明用户感兴趣
   - **鼠标悬停**：在重要按钮或链接悬停3秒以上时邀请
   - **表单放弃**：开始填写表单但中途停止时及时邀请
   - **离开意图**：检测到鼠标移向关闭按钮或地址栏时挽留

3. **频率控制策略**
   - **同一访客**：24小时内最多显示3次邀请
   - **会话间隔**：两次邀请间隔至少15分钟
   - **拒绝记忆**：用户拒绝后7天内不再显示
   - **接受后控制**：用户接受一次后，后续访问减少邀请频率

#### 文案设计最佳实践

1. **标题设计原则**
   - **简洁明了**：标题控制在10字以内，直观表达
   - **问题导向**：使用疑问句激发用户互动欲望
   - **价值突出**：强调能为用户解决的问题或提供的价值
   - **情感连接**：使用温暖友好的语调建立情感连接

2. **内容描述优化**
   - **具体服务**：明确说明能提供的具体帮助
   - **专业表达**：体现团队的专业性和可靠性
   - **即时响应**：强调快速响应和实时支持
   - **无压力感**：避免给用户造成销售压力

3. **按钮文字选择**
   - **积极行动**："开始咨询"、"获取帮助"、"立即沟通"
   - **降低门槛**："了解更多"、"快速咨询"、"免费咨询"
   - **拒绝友好**："稍后再说"、"暂时不用"避免"不需要"
   - **第三选择**：提供"稍后提醒"选项给犹豫用户

### 视觉设计优化

#### 界面设计原则

1. **品牌一致性**
   - 使用企业标准色彩和字体
   - 保持与网站整体设计风格统一
   - 展示企业Logo和品牌标识
   - 客服头像选择专业亲和的形象

2. **用户体验优化**
   - 确保在不同设备上的良好显示效果
   - 避免遮挡重要页面内容
   - 提供清晰的关闭和操作按钮
   - 支持键盘导航和无障碍访问

3. **视觉层次设计**
   - 使用对比色突出重要信息
   - 合理运用留白增强可读性
   - 图标和文字搭配清晰易懂
   - 动画效果自然不突兀

#### 移动端适配

1. **响应式设计**
   - 自动适配不同屏幕尺寸
   - 触摸友好的按钮大小设计
   - 考虑横屏和竖屏模式切换
   - 避免与系统UI元素冲突

2. **性能优化**
   - 控制图片和动画文件大小
   - 使用CSS3代替JavaScript动画
   - 延迟加载非必要资源
   - 支持弱网络环境下的降级展示

### 数据分析与优化

#### 关键指标监控

1. **展示相关指标**
   - **展示率**：邀请显示次数 / 符合条件的访问次数
   - **触达率**：实际看到邀请的用户比例
   - **注意力指标**：用户在邀请上的停留时间
   - **设备分布**：不同设备类型的展示效果差异

2. **转化相关指标**
   - **接受率**：接受邀请次数 / 邀请展示次数
   - **拒绝率**：拒绝邀请次数 / 邀请展示次数
   - **延迟率**：选择稍后的次数 / 邀请展示次数
   - **会话转化率**：成功开始会话 / 接受邀请次数

3. **质量相关指标**
   - **会话时长**：通过邀请开始的会话平均时长
   - **问题解决率**：邀请会话的问题解决比例
   - **客户满意度**：邀请用户的服务满意度评分
   - **复购率**：通过邀请转化客户的复购情况

#### 持续优化策略

1. **A/B测试规划**
   - **文案测试**：同时测试2-3个不同的邀请文案
   - **时机测试**：对比不同弹出时间的转化效果
   - **设计测试**：测试不同颜色、样式的视觉效果
   - **策略测试**：对比主动邀请和被动等待的效果

2. **数据驱动优化**
   - **周期性复盘**：每周分析邀请数据和用户反馈
   - **趋势分析**：关注长期趋势变化和季节性规律
   - **用户细分**：分析不同用户群体的邀请偏好
   - **竞品对比**：学习行业内优秀的邀请设计案例

## 注意事项

### 用户体验保障

1. **避免过度打扰**
   - 控制邀请频率，避免频繁弹出影响用户体验
   - 尊重用户的拒绝选择，不要在短时间内重复邀请
   - 提供清晰的关闭方式，不要强制用户与邀请互动
   - 在用户专注操作时（如填表、播放视频）避免弹出

2. **性能影响控制**
   - 确保邀请功能不影响页面加载速度
   - 优化资源加载，采用延迟加载策略
   - 避免阻塞页面渲染和用户交互
   - 在网络条件差时提供降级方案

3. **可访问性支持**
   - 支持屏幕阅读器等辅助技术
   - 提供键盘导航支持
   - 确保足够的颜色对比度
   - 支持放大镜等视觉辅助工具

### 隐私与合规

1. **数据保护**
   - 遵守GDPR、CCPA等数据保护法规
   - 明确告知用户数据收集和使用目的
   - 提供数据删除和修改选项
   - 加密传输和存储用户数据

2. **Cookie策略**
   - 在必要时获取用户同意使用Cookie
   - 提供Cookie偏好设置选项
   - 支持拒绝非必要Cookie的用户
   - 定期清理过期的用户数据

3. **内容合规**
   - 确保邀请内容符合广告法规要求
   - 避免夸大宣传和虚假承诺
   - 提供真实的服务信息
   - 遵守行业特定的合规要求

### 技术风险控制

1. **兼容性保障**
   - 测试主流浏览器的兼容性
   - 处理JavaScript被禁用的情况
   - 确保在不同网络环境下正常工作
   - 提供优雅的降级方案

2. **安全防护**
   - 防止XSS和CSRF攻击
   - 验证所有用户输入
   - 使用HTTPS加密传输
   - 定期更新安全补丁

## 常见问题

### 配置相关问题

**Q：邀请对话框不显示怎么办？**
A：请按以下步骤排查：

1. **检查基础配置**
   - 确认 `show` 属性设置为 `true`
   - 检查是否正确引入了SDK文件
   - 验证组织ID和服务ID是否正确

2. **检查触发条件**
   - 确认当前页面URL符合显示规则
   - 检查是否满足时间延迟设置
   - 验证用户行为是否触发显示条件

3. **检查浏览器环境**
   - 确认浏览器未阻止弹窗
   - 检查JavaScript是否正常执行
   - 查看浏览器控制台是否有错误信息

**Q：如何设置不同页面的不同邀请内容？**
A：可以通过以下方式实现：

```javascript
// 方法1：页面级别配置
if (window.location.pathname.includes('/products')) {
  window.bytedeskConfig.inviteConfig.title = "对产品有疑问？";
  window.bytedeskConfig.inviteConfig.content = "让我们为您详细介绍产品特性";
}

// 方法2：动态更新配置
BytedeskInvite.updateConfig({
  title: "需要技术支持？",
  content: "专业技术团队为您解答",
  brandColor: "#ff6b6b"
});

// 方法3：使用条件规则
const conditionalConfig = {
  conditionalRules: [
    {
      condition: "page_url_contains('/support')",
      content: {
        title: "技术问题？",
        content: "技术专家为您答疑解惑"
      }
    }
  ]
};
```

**Q：如何统计邀请的转化效果？**
A：可以通过事件监听和API接口进行统计：

```javascript
// 1. 前端事件监听统计
let inviteStats = {
  shown: 0,
  accepted: 0,
  rejected: 0
};

BytedeskInvite.on('shown', () => inviteStats.shown++);
BytedeskInvite.on('accepted', () => inviteStats.accepted++);
BytedeskInvite.on('rejected', () => inviteStats.rejected++);

// 2. 集成Google Analytics
BytedeskInvite.on('accepted', (data) => {
  gtag('event', 'invite_accepted', {
    'event_category': 'engagement',
    'event_label': data.page_url,
    'value': 1
  });
});

// 3. 使用统计API
fetch('/api/invite/stats')
  .then(response => response.json())
  .then(data => {
    console.log('邀请统计数据：', data);
    // 处理统计数据
  });
```

### 技术集成问题

**Q：在React/Vue等SPA应用中如何使用？**
A：针对单页应用的特殊处理：

```javascript
// React示例
import { useEffect } from 'react';
import { BytedeskInvite } from '@bytedesk/web';

function App() {
  useEffect(() => {
    // 路由变化时重新初始化邀请
    const handleRouteChange = () => {
      BytedeskInvite.updateConfig({
        // 根据当前路由更新配置
        title: getPageSpecificTitle(),
        content: getPageSpecificContent()
      });
    };
    
    // 监听路由变化
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  return <div>应用内容</div>;
}

// Vue示例  
export default {
  mounted() {
    this.$router.afterEach((to, from) => {
      // 路由切换后更新邀请配置
      BytedeskInvite.updateConfig({
        title: this.getPageTitle(to.path),
        content: this.getPageContent(to.path)
      });
    });
  }
};
```

**Q：如何自定义邀请对话框的样式？**
A：提供多种自定义方式：

```css
/* 方法1：CSS变量覆盖 */
:root {
  --bytedesk-invite-primary-color: #ff6b6b;
  --bytedesk-invite-border-radius: 12px;
  --bytedesk-invite-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

/* 方法2：类名覆盖 */
.bytedesk-invite-dialog {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.bytedesk-invite-dialog .title {
  font-size: 18px;
  font-weight: 600;
}

.bytedesk-invite-dialog .accept-btn {
  background: #4CAF50;
  border: none;
  border-radius: 24px;
}
```

**Q：移动端显示效果不佳怎么优化？**
A：移动端优化建议：

```javascript
// 移动端专用配置
const mobileInviteConfig = {
  // 检测移动设备
  mobile: {
    enabled: true,
    fullWidth: true,          // 全宽显示
    position: 'bottom',       // 底部显示
    slideUp: true,            // 滑入动画
    backdropClose: true,      // 点击背景关闭
    hapticFeedback: true,     // 触觉反馈
  },
  
  // 适配配置
  responsive: {
    breakpoint: 768,          // 响应式断点
    mobileDelay: 2000,        // 移动端延迟时间
    tabletDelay: 3000,        // 平板延迟时间
  }
};

// 动态检测设备类型
const isMobile = window.innerWidth <= 768;
const finalConfig = isMobile ? mobileInviteConfig : desktopInviteConfig;

BytedeskInvite.updateConfig(finalConfig);
```

### 效果优化问题

**Q：邀请接受率低怎么提升？**
A：提升接受率的策略建议：

1. **优化邀请时机**
   - 分析用户行为数据，找到最佳邀请时机
   - 在用户可能遇到问题的页面增加邀请
   - 避免在用户专注操作时打断

2. **改善邀请内容**
   - 使用更有吸引力的标题和描述
   - 突出免费咨询、专业服务等价值点
   - 降低用户的心理门槛

3. **A/B测试优化**

   ```javascript
   // A/B测试配置示例
   const testVariants = [
     {
       name: 'variant_a',
       title: "需要帮助吗？",
       content: "专业客服为您答疑解惑",
       acceptText: "开始咨询"
     },
     {
       name: 'variant_b', 
       title: "有疑问？立即解答！",
       content: "1分钟快速响应，专业建议",
       acceptText: "免费咨询"
     }
   ];
   
   // 随机选择测试版本
   const variant = testVariants[Math.floor(Math.random() * testVariants.length)];
   BytedeskInvite.updateConfig(variant);
   ```

**Q：如何避免邀请功能影响网站性能？**
A：性能优化最佳实践：

1. **延迟加载策略**

   ```javascript
   // 延迟加载邀请功能
   setTimeout(() => {
     import('@bytedesk/web').then(module => {
       const BytedeskInvite = module.default;
       BytedeskInvite.init(config);
     });
   }, 2000);
   ```

2. **资源优化**
   - 使用CDN加速资源加载
   - 压缩图片和样式文件
   - 启用gzip压缩传输

3. **条件加载**

   ```javascript
   // 只在需要时加载邀请功能
   const shouldShowInvite = 
     !sessionStorage.getItem('invite_rejected') && 
     document.referrer.includes('google.com');
     
   if (shouldShowInvite) {
     loadInviteScript();
   }
   ```

## 更新日志

### 2024年12月

- 新增智能意图识别算法，更精准判断邀请时机
- 支持多语言自动检测和本地化内容适配
- 增强移动端体验，优化触摸交互和动画效果
- 完善A/B测试功能，支持更多维度的对比测试

### 2024年11月

- 支持条件规则配置，实现页面级别的个性化邀请
- 新增访客行为分析，基于用户意图智能触发邀请
- 优化邀请样式系统，提供更多主题和自定义选项
- 增强数据统计分析，提供详细的转化漏斗报告

### 2024年10月

- 发布访客邀请对话框基础功能
- 实现多种邀请形式：弹窗、气泡、定时邀请
- 完成前端SDK开发，支持Web、React Native、Flutter
- 建立邀请最佳实践指南，提供优化建议
