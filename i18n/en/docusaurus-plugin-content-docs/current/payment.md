---
sidebar_label: "Pricing"
sidebar_position: 11
---

<!-- markdownlint-disable MD060 MD033 -->

# Pricing

## Versions and Pricing

The Weiyu system offers multiple editions to meet the needs of organizations of different sizes:

| Edition | Perpetual License | Annual Subscription | Key Features |
| --- | --- | --- | --- |
| **Community Edition** | **Free** | **Free** | Core features are open source and can be used commercially, single tenant, **[community edition source code with copyright notice retained](./deploy/source.md)**, unlimited users/customer service agents/bots/knowledge bases, retains the Weiyu logo, does not support [brand customization](./deploy/config.md#custom-configuration) |
| **Enterprise Edition** | **¥49,800** | **¥22,800/year** | Single tenant, full feature set, **[private deployment package](./deploy/docker.md), source code not included**, unlimited users/customer service agents/bots/knowledge bases, supports [brand customization](./deploy/config.md#custom-configuration) |
| **Platform Edition (Most Popular)** | **¥79,800** | **¥32,800/year** | **[Multi-tenant SaaS](./development/saas.md)**, full feature set, **[private deployment package](./deploy/docker.md), source code not included**, unlimited users/customer service agents/bots/knowledge bases, supports [brand customization](./deploy/config.md#custom-configuration) |
| **Source Code Edition (Popular Among Enterprises)** | Reference module pricing | **Not supported** | **Includes full source code with advanced capabilities**, available for separate module purchase. Includes all Platform Edition capabilities, no need to purchase Enterprise Edition or Platform Edition separately, and purchased modules do not require a license key. Unlike Enterprise Edition, source code can be modified directly and custom development is supported. |

- A perpetual license is a one-time permanent authorization. Annual subscriptions must be renewed every year. Prices exclude tax. If an invoice is required, ordinary invoices add 1% tax and VAT invoices add 1% or 3% tax.
- The prices above are software prices only and do not include operations or maintenance services.
- **Tenant note**: One tenant represents one enterprise account. Multiple departments, members, and customer service accounts can be created under one enterprise account. Data between different tenants is isolated and does not affect each other.

### Online Module Source Code Pricing

- [Instant Messaging Module Source Code Pricing](./price/instant-messaging.md)
- [Online Module Source Code Pricing](./price/online-module.md)

### Specialized Module Source Code Pricing (Split)

- [Call Center Module Source Code Pricing](./price/call-center.md)
- [Audio and Video Customer Service Module Source Code Pricing](./price/audio-video-service.md)
- [Video Conference Module Source Code Pricing](./price/video-conference.md)
- [Remote Assistance Module Source Code Pricing](./price/remote-assistance.md)

- Note: Modules can be purchased separately. Tech stack: [java + react](https://www.weiyuai.cn/architecture.html), with frontend-backend separation.
- The prices above are source code prices only. They do not include secondary customization fees, nor operations and maintenance services. Deployment must be handled by the customer.

### Purchase Notes

- Default prices exclude tax. If an invoice is required, ordinary invoices add 1% tax and VAT invoices add 1% or 3% tax.
- Within three months from the purchase date, when upgrading editions, for example from Enterprise Edition to Platform Edition or Source Code Edition, previously paid fees can be credited and only the price difference needs to be paid. After three months, the full amount is required.
- Free upgrades are included within one year, which must be explicitly confirmed for the Source Code Edition at the time of purchase. After one year, an optional 15% annual maintenance fee covers bug fixes, version upgrades, and remote assistance, excluding operations and maintenance.
- A 30-day free trial is available. After payment, a 7-day no-reason refund is supported. If source code has already been delivered, refunds are not supported.
- Custom development services are available at ¥2,000 per person-day.

## Feature Comparison Table

### Basic Features

| Feature | Community Edition | Enterprise Edition | Platform Edition | Product Agency | Source Code Edition |
| --- | --- | --- | --- | --- | --- |
| Multi-tenant Support | ❌ | ❌ | ✅ | ✅ | ✅ |
| Number of Users | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| Number of Customer Service Agents | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| Number of Bots | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| Number of Knowledge Bases | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |
| One-on-one Chat | ✅ | ✅ | ✅ | ✅ | ✅ |
| Group Chat | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Text Messages](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Image Messages](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Voice Messages](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Video Messages](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [File Messages](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Robot Messages | ✅ | ✅ | ✅ | ✅ | ✅ |
| Robot Customer Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| One-on-one Customer Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| Workgroup Customer Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Large Model Integration](./provider/deepseek.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Knowledge Base](./modules/kbase.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [User Information Integration](./integration/user_info.md) | ✅ | ✅ | ✅ | ✅ | ✅ |

### Advanced Features

| Feature | Community Edition | Enterprise Edition | Platform Edition | Product Agency | Source Code Edition |
| --- | --- | --- | --- | --- | --- |
| [Session Routing](./development/router.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Personalized Service](./integration/viplevel.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Product Information Integration](./integration/goods_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Order Information Integration](./integration/order_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Single Sign-On SSO](./development/sso.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Message Recall](./development/message.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Message Translation](./development/translate.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Sensitive Word Filtering](./development/taboo.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [IP Filtering and Blocking](./development/ip.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Data Analytics](./development/statistic.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Session Transfer](./development/transfer.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Session Invitation](./development/invite.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Satisfaction Rating](./development/rating.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Intelligent Ticketing](./development/ticket.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Conversation Quality Inspection](./development/qualitycheck.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Auto Reply](./development/autoreply.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Blacklist](./development/black.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Leave Message Handling](./development/message_leave.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Product Information](./integration/goods_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Order Integration](./integration/order_api.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Customer Management](./development/crm.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Session Summary](./development/summary.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Cluster Deployment](./deploy/cluster.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Brand Customization](./deploy/config.md#custom-configuration) | ❌ | ✅ | ✅ | ✅ | ✅ |
| Commercial Edition Source Code | ❌ | ❌ | ❌ | ❌ | ✅ |
| Official Technical Support | ❌ | ✅ | ✅ | ✅ | ✅ |
<!-- | [Text to Speech TTS](./development/tts.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [Speech to Text ASR/STT](./development/asr.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [Session Monitoring](./development/monitor.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [Feedback](./development/feedback.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [Customer Service Training](./modules/training.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->

### Supported Channels

#### Web and Application Frameworks

| Channel | Community Edition | Enterprise Edition | Platform Edition | Product Agency | Source Code Edition |
| --- | --- | --- | --- | --- | --- |
| [Website/H5](./channel/web.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [React](./channel/react.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Vue](./channel/vue.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Svelte](./channel/svelte.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Angular](./channel/angular.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Nextjs](./channel/nextjs.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Vanilla](./channel/vanilla.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [iOS](./channel/ios.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Android](./channel/android.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Uniapp](./channel/uniapp.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Flutter](./channel/flutter.md) | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Social Media Channels

| Channel | Community Edition | Enterprise Edition | Platform Edition | Product Agency | Source Code Edition |
| --- | --- | --- | --- | --- | --- |
| [WeChat Work](./channel/wechat_work.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [WeChat Customer Service](./channel/wechat_kf.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [WeChat Official Account](./channel/wechat_mp.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [WeChat Mini Program](./channel/mini.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| More Integration Channels | ❌ | ✅ | ✅ | ✅ | ✅ |

#### Overseas Media Channels

Not included in the Source Code Edition by default. Additional charges apply: source code for each channel costs ¥10,000.

| Channel | Community Edition | Enterprise Edition | Platform Edition | Product Agency | Source Code Edition |
| --- | --- | --- | --- | --- | --- |
| [WhatsApp](./channel/whatsapp.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Facebook](./channel/facebook.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Instagram](./channel/instagram.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Line](./channel/line.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Telegram](./channel/telegram.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Email](./channel/email.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| More Integration Channels | ❌ | ✅ | ✅ | ✅ | ✅ |

### Plus Feature Plugins

Not included in Enterprise Edition, Platform Edition, or Source Code Edition by default. Additional charges apply.

| Plugin Name | Feature Description | Price | Notes |
| --- | --- | --- | --- |
| [Remote Assistance](./plugins/remote.md) | Accessible remote support to resolve issues anytime, anywhere | TBD | In development |
<!-- | [Call Center](./plugins/freeswitch.md) | Voice calls, IVR, automatic call distribution | TBD | In development | -->
<!-- | [Audio/Video Customer Service](./plugins/video.md) | One-on-one audio calls, video calls, screen sharing | TBD | In development | -->
<!-- | [Workflow](./modules/workflow.md) | Large model workflow | TBD | In Development | -->
<!-- | [Kanban Plugin](./plugins/kanban.md) | Visual task and project management | TBD | In development | -->

<!-- ### Open Platform -->

### Service Terms

| Item | Community Edition | Enterprise Edition | Platform Edition | Product Agency | Source Code Edition |
| --- | --- | --- | --- | --- | --- |
| Free upgrades within 1 year | ❌ | ✅ | ✅ | ✅ | ✅ (must be specified at purchase) |
| Upgrade maintenance fee after 1 year | - | 15%/year | 15%/year | 15%/year | 15%/year |
| Custom development support | ❌ | ✅ | ✅ | ✅ | ✅ |

### Rights Statement

import Copyright from '/img/right/copyright.png';
import Trademark from '/img/right/trademark.png';

<img src={Copyright} alt="Copyright Statement" width="360" />
<img src={Trademark} alt="Trademark Statement" width="360" />

- Copyright owner: Beijing Weiyu Tianxia Technology Co., Ltd.

## Contact Information

- For consultation, purchase, feedback, or custom development, please [scan the QR code to contact us on WeChat](/img/wechat.png) and note: Weiyu

## Download Demo Materials

- [PPT](https://www.weiyuai.cn/download/ppt/)
- [Contract templates and documents](https://www.weiyuai.cn/download/docx/)
- [Feature list](https://www.weiyuai.cn/download/file/)
- [More download resources](https://www.weiyuai.cn/download/)

## Terms of Use and References

- **Allowed use**: Commercial use is allowed, but resale without authorization is prohibited.
- **Prohibited Uses**: Strictly prohibited for use in illegal and non-compliant businesses containing trojans, viruses, pornography, gambling, fraud, etc.
- **Disclaimer**: This software does not provide any form of legal guarantee. Please bear all risks arising from its use yourself.
- **Industry Comparison**: [View the Alibaba Cloud intelligent dialogue robot pricing comparison](https://help.aliyun.com/zh/beebot/intelligent-dialogue-robot-tongyi-version/product-overview/product-billing/?spm=a2c4g.11186623.0.nextDoc.1bf77058eyaBzh)
