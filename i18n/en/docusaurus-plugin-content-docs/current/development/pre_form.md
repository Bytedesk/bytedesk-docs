---
sidebar_label: Custom Pre-Chat Form
sidebar_position: 72
---

# Custom Pre-Chat Form

Custom pre-chat forms allow Bytedesk to collect key visitor information before a conversation officially starts. Instead of asking agents to gather everything manually after the session begins, you can request important fields up front, such as name, phone number, order number, issue category, product of interest, region, source channel, or lead priority.

Compared with the traditional "connect first, ask later" workflow, a pre-chat form moves information collection to the beginning of the journey. That gives agents more context before the first reply, helps them identify customer intent faster, and improves routing accuracy and first-response efficiency.

## Value

- Capture visitor information before the chat starts
- Bind a published pre-chat form and customize fields for different business scenarios
- Optionally make the form mandatory before the conversation can continue
- Support lead qualification, service routing, and service quality analysis

## Typical Use Cases

- Pre-sales qualification, where budget, industry, and product interest matter
- After-sales support, where order number, device model, or issue type must be confirmed first
- Healthcare, education, finance, and public service scenarios that require structured intake before service begins
- Teams that want to identify priority visitors before handing the conversation to an agent

## Configuration Flow

### 1. Enable the Pre-Chat Form in Admin

Enable the pre-chat form in service settings and select a published form.

If visitors must complete the form before they can continue, also enable the option that requires submission before consultation starts.

![pre_form](/img/form/pre_form.png)

### 2. Build the Pre-Chat Form

Use FormBuilder to design a form specifically for pre-conversation information collection. A good rule is to focus on fields that help agents handle the first interaction better, instead of collecting every possible field at once.

Common pre-chat fields include:

- Basic contact details such as name, phone number, or email
- Business identifiers such as order number, product name, or service type
- Routing fields such as issue category, consultation topic, or priority
- Analysis fields such as region, source channel, or customer type

If your business needs strong qualification before service starts, you can add fields such as budget range, industry, company size, or lead intent. If submission rate matters more, keep the form short and focus on the most critical 3 to 5 fields.

![pre_form_builder](/img/form/pre_form_builder.png)

### 3. Visitor Prompt and Submission

When a visitor enters the conversation, the system can display the pre-chat form as a prompt before service continues. The submitted information is then associated with the session so agents can see it during the interaction.

If mandatory submission is enabled, the visitor must complete the form before continuing. If it is not enabled, the form can still be used as a lightweight information collection step.

For visitors, this reduces repeated follow-up questions later. For agents, it means they can begin the conversation with more context.

Typical visitor-side behavior includes:

- Seeing a pre-chat prompt before entering the conversation
- Filling in fields such as contact details, issue type, or order number
- Entering the agent or bot flow only after submission
- Having submitted information linked to the current consultation record

![pre_form_visitor](/img/form/pre_form_visitor.png)

### 4. Review Form Results

Submitted results can be reviewed in the admin backend and used for lead analysis, service optimization, follow-up workflows, and quality checks.

In practice, pre-chat results help teams:

- Understand where visitors come from and what they need
- Identify high-intent leads and prioritize handling
- Review high-frequency issue types and improve intake design over time
- Use pre-chat data as part of follow-up, service analytics, and internal reporting

![pre_form_result](/img/form/pre_form_result.png)

## Practical Scenarios

### Lead Qualification

In pre-sales scenarios, pre-chat forms can collect industry, company size, budget range, and product interest before a sales or support conversation starts.

### Service Routing

In multi-team or multi-service-line environments, pre-chat forms can collect order numbers, service types, and issue categories so the conversation can be routed more efficiently.

### Better First Response Quality

When key information is collected in advance, agents no longer need to start every session from zero. This improves response quality and reduces visitor frustration.

## Form Design Tips

- Keep the number of fields reasonable and focus on information that truly improves first-contact handling
- Put the most important fields first, such as contact details, issue type, or order number
- Prefer structured controls such as select, radio, and checkbox fields when possible
- Add clear explanations for sensitive fields to reduce resistance
- If the form is mandatory, avoid making it too long, or conversion may drop sharply

## Best Practice Examples

### Example 1: Pre-Sales Qualification Form

Useful for SaaS, software, education, and professional services teams that want to evaluate visitor intent before the conversation begins.

Recommended fields:

- Contact name
- Phone number or business email
- Company name
- Industry
- Product or module of interest
- Current business need
- Budget range
- Expected launch timeline

### Example 2: After-Sales Support Form

Useful when agents need context before troubleshooting starts.

Recommended fields:

- Contact name
- Contact method
- Order number or customer ID
- Product name or version
- Issue category
- Problem description
- Whether normal use is affected
- Preferred support time

### Example 3: Routing-Focused Intake Form

Useful when one entry point must serve multiple teams or business lines.

Recommended fields:

- Contact name
- Contact method
- Business type
- Region
- Customer type or tier
- Priority level
- Preferred contact method

The goal of this type of form is not to collect as much information as possible, but to determine where the conversation should go next.

## Difference from Leave Message Forms

Pre-chat forms are used before a conversation starts, with the goal of helping the team serve the visitor faster and more accurately. Leave message forms are used when no one is available or when the interaction needs to move into offline handling. Both support custom forms, but they solve different stages of the customer journey.

## Quick Start

If you want to launch a pre-chat form quickly, follow this path:

1. Create a pre-chat form in FormBuilder
2. Publish the form and verify it works well on mobile
3. Enable the pre-chat form in service settings
4. Select the published form
5. Decide whether submission must be mandatory before consultation starts
6. Test the full visitor flow and confirm that results are recorded correctly

## Rollout Tips

### Start with a Short Form

For the first release, use a short 3 to 5 field form to validate submission rate. Do not start with a long intake form unless the business absolutely requires it.

### Match Mandatory Submission to Business Goals

If your goal is to improve information quality, you can start without requiring submission. If your business must verify identity, order details, or service type first, mandatory submission may be appropriate.

### Make Sure Agents Actually Use the Data

The real value of a pre-chat form comes from how agents use the data. If the service team does not reference the collected information during handling, even a well-designed form will create limited business value.

## Pre-Launch Checklist

Before going live, make sure that:

- The form is published and loads correctly on the visitor side
- The number of fields is reasonable and mobile completion feels smooth
- Required fields reflect real business needs instead of unnecessary friction
- Agents or sales staff know where the submitted data appears and how to use it
- Submitted results can be viewed in the backend and linked to the related conversation or follow-up flow

## Core Capabilities

### Pre-Conversation Information Collection

The form collects information before the first message exchange, giving agents better context immediately.

### Mandatory or Optional Entry Control

Teams can decide whether the form is a lightweight suggestion or a required step before consultation starts.

### Support for Routing and Analysis

Pre-collected fields help with routing, reporting, service review, and lead management.

## Frequently Asked Questions

### How should I decide which fields to include?

Focus on fields that directly improve first-contact handling. If a field does not help agents decide who the visitor is, what they need, or how urgently they should be handled, it probably does not belong in the first version.

### Should the form always be mandatory?

Not necessarily. Start with optional submission if you want to protect conversion. Use mandatory submission when the business truly depends on pre-collected information.

### Does the pre-chat form conflict with bot flows?

Usually no. The pre-chat form collects information before the bot or human handoff continues. In most cases, they work as upstream and downstream parts of the same journey.

## Related Docs

- [Leave Message Processing](message_leave.md): understand offline leave messages and the full follow-up workflow
- [Custom Leave Message Form](message_leave_form.md): review the custom form approach for offline service scenarios
- [Chat Flow](chat_flow.md): see how form nodes are used in broader conversation flow design
- [Message Types](message.md): check the structure of form messages and form submission messages
