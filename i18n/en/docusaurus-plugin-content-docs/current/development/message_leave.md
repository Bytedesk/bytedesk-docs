---
sidebar_label: Leave Message Processing
sidebar_position: 26
---

# Leave Message Processing

## Overview

When agents are offline, the system can automatically display a leave message form so visitors can submit their request and contact details instead of abandoning the conversation. With webhook notifications and a structured processing workflow, teams can continue handling customer needs even outside live service hours.

### Key Capabilities

- Automatic leave message collection when no agent is available
- Support for custom leave message forms rendered from published schemas
- Multi-channel notifications through WeChat Work, Feishu, DingTalk, and other webhook targets
- Image upload support for richer problem descriptions
- Offline fallback routing through backup agent, backup workgroup, or other configured logic
- Visitor-side history view for previous leave messages and replies
- Real-time handling and follow-up from the service side

### Typical Use Cases

- After-hours support and holiday coverage
- Peak periods when agents cannot respond immediately
- Scenarios that require structured intake before follow-up
- Cross-time-zone service operations

## Visitor Experience

### Basic Leave Message Submission

import leavemsgChat from '/img/develop/leavemsg/leavemsg_chat.png';
import leavemsgChat2 from '/img/develop/leavemsg/leavemsg_chat2.png';

When service is offline, visitors can submit a leave message that usually includes:

- Name
- Phone number or email address
- Problem description
- Optional issue category or business context

<img src={leavemsgChat} alt="Leave message entry" width="360" />
<img src={leavemsgChat2} alt="Leave message form" width="360" />

### Image Upload Support

import leavemsgImage from '/img/develop/leavemsg/leavemsg_image.png';

Visitors can upload images to explain a problem more clearly. This is useful for screenshots, product photos, and other visual context.

<img src={leavemsgImage} alt="Leave message image upload" width="360" />

### Leave Message History

import leavemsgHistoryIcon from '/img/develop/leavemsg/leavemsg_history_icon.png';
import leavemsgHistory from '/img/develop/leavemsg/leavemsg_history.png';

Visitors can review previous leave messages and see whether they are waiting for a reply, already answered, or closed.

<img src={leavemsgHistoryIcon} alt="Leave message history icon" width="360" />
<img src={leavemsgHistory} alt="Leave message history list" width="360" />

### Submit Another Leave Message

import leavemsgAdd from '/img/develop/leavemsg/leavemsg_add.png';

Visitors can create another leave message later without restarting the whole process from scratch.

<img src={leavemsgAdd} alt="Add another leave message" width="360" />

### Custom Leave Message Forms

Admins can bind a custom form to the leave-message scenario. Once enabled, the visitor side no longer relies only on a fixed set of built-in fields. Instead, it renders the published form schema dynamically.

Typical setup steps are:

1. Create a form of type `MESSAGE_LEAVE` in FormBuilder.
2. Publish the form.
3. Enable leave message forms in leave-message settings.
4. If custom fields are needed, enable the custom form option and select the published form.

Recommended core fields include:

- Contact name
- At least one valid contact method
- Problem description
- Optional business fields such as category, source, or priority

### Leave Message Toggle Behavior

Leave-message toggles directly affect what visitors see:

- If leave message forms are enabled, visitors can submit a leave message directly in offline scenarios.
- If leave message forms are disabled, the leave-message form and related quick entry points are not shown.
- If the custom form option is enabled and a valid form is selected, the visitor sees custom fields instead of only the default built-in fields.
- If the custom form is missing, unpublished, or invalid, the system falls back to the default leave-message form.

### How Custom Fields Are Stored

The submission flow prioritizes standard fields such as name, contact details, issue type, message content, and image attachments.

- Standard fields are stored as structured fields for easier filtering and handling.
- Additional custom fields are preserved together with the leave message content so agents can still review them in context.

## Service-Side Processing

![leavemsg_agent](/img/develop/leavemsg/leavemsg_agent.png)

The service side typically supports:

- Leave message lists for pending items
- Detailed visitor information review
- Reply handling and follow-up
- Status updates such as pending, replied, or closed
- Transfer or reassignment when needed

### Typical Processing Flow

1. The system receives a new leave message.
2. The responsible team is notified.
3. An agent reviews the submitted details.
4. The agent replies or follows up.
5. The message status is updated and tracked.

## Admin Backend

![leavemsg_admin](/img/develop/leavemsg/leavemsg_admin.png)

The admin backend provides centralized leave message management, including:

- Volume and processing statistics
- Filtering by type, status, and time
- Batch operations and export
- Permission control for different roles

### Leave Message Settings

In service settings, teams can configure:

- Leave message guidance text shown to visitors
- Whether leave message forms are enabled
- Whether a custom leave message form is used
- Which custom form is bound
- Backup agent settings
- Backup workgroup settings

Typical offline handling priority is:

1. Backup agent
2. Backup workgroup
3. Bot or other default offline handling logic

If an earlier fallback can take the request, later steps are not used.

### Reply and Review

![leavemsg_reply](/img/develop/leavemsg/leavemsg_reply.png)

Admins or supervisors can also manage reply templates, review reply quality, and export leave-message data for reporting.

## Leave Message Notifications

### WeChat Work

- [WeChat Work](../channel/wechat_work_group_robot.md)

### Feishu

- [Feishu](../channel/feishu.md)

### DingTalk

- [DingTalk](../channel/dingtalk.md)

## Best Practices

### Form Design

1. Keep required fields simple and practical.
2. Use category fields to support downstream routing.
3. Provide clear helper text where needed.
4. Explain how sensitive information will be used.

### Response Strategy

1. Define an expected reply window for all leave messages.
2. Avoid overly robotic responses when a more personal reply is possible.
3. Set up follow-up rules for complex issues.
4. Review visitor satisfaction when relevant.

### Data Analysis

1. Track leave message trends over time.
2. Measure handling efficiency and response quality.
3. Identify high-frequency issue categories.
4. Use results to improve both service workflows and forms.

## Frequently Asked Questions

**Q: How do I enable automatic leave message notifications?**
A: Configure webhook targets in the admin backend and connect them to the supported notification channels. New leave messages can then be pushed automatically.

**Q: Can visitors delete a leave message they already submitted?**
A: Currently visitors cannot delete submitted leave messages directly. If removal is necessary, the service team or an admin must handle it.

**Q: Are leave messages stored permanently?**
A: Leave-message records are typically retained in the backend so teams can review history, follow up, and export data when needed.

**Q: Does the leave message flow support multiple languages?**
A: Yes. Bytedesk supports multilingual interfaces, and leave-message experiences can be localized as part of the broader service workflow.

## Related Docs

- [Custom Leave Message Form](message_leave_form.md): understand how to design and bind a custom offline intake form
- [Custom Pre-Chat Form](pre_form.md): review the structured intake flow before a session starts
- [Chat Flow](chat_flow.md): see how form nodes fit into broader service journeys
- [Message Types](message.md): inspect form-related message payload structures
