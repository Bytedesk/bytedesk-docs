---
sidebar_label: Webhook
sidebar_position: 27
---

# Webhook

:::tip Prerequisites

- This feature is only supported in Enterprise and Platform editions. If needed, please [scan QR code to contact WeChat](/img/wechat.png)
- Need trial version License? Please refer to: [Question 13: How to apply for licenseKey](../faq#question-13-how-to-apply-for-licensekey)
:::

## Feature Introduction

Webhook is an important message push functionality of the Weiyu system, used to push various important events and messages from the system to external systems in real-time. By configuring Webhook URLs, the Weiyu system can automatically push message notifications, customer information, system alerts, and other information to third-party platforms such as WeChat Work, Feishu, DingTalk, etc., achieving timely notification and processing of messages.

![webhook](/img/develop/admin/webhook.png)

## Main Application Scenarios

### 📝 Message Push

- **Customer Message Notifications**: When customers submit messages during non-working hours or when customer service is offline, automatically push to specified channels
- **Message Content Synchronization**: Push detailed message information (including customer information, message content, contact details, etc.) to enterprise collaboration platforms
- **Timely Response Reminders**: Ensure customer service personnel can see customer messages in time, improving response speed

### 👤 Customer Information Push

- **Potential Customer Information**: When visitors submit contact information or registration details, push to CRM system in real-time
- **Sales Lead Management**: Automatically synchronize customer information to sales team work platforms
- **Customer Profile Building**: Push customer behavior data to help build complete customer profiles

### ⚠️ System Alert Push

- **System Exception Notifications**: When system exceptions or failures occur, push to operations team in time
- **Performance Monitoring Alerts**: Automatically push alert information when system performance indicators are abnormal
- **Security Event Notifications**: Immediately notify relevant personnel when security-related events are detected

### 🎫 Ticket Status Changes

- **Ticket Creation Notifications**: Push to relevant responsible persons when new tickets are created
- **Ticket Status Updates**: Synchronize notifications to relevant personnel when ticket status changes
- **Ticket Processing Reminders**: Send reminders when tickets are about to timeout or need escalation

## Supported Push Platforms

- [WeChat Work](../channel/wechat_work_group_robot.md)
- [Feishu](../channel/feishu.md)
- [DingTalk](../channel/dingtalk.md)

<!-- ### Other Platforms

- **Slack**: Supports Slack Webhook integration
- **Discord**: Supports Discord Webhook integration
- **Custom API**: Supports pushing to custom API interfaces -->
