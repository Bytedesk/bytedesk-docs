---
sidebar_label: Custom Leave Message Form
sidebar_position: 26
---

# Custom Leave Message Form

Custom leave message forms are one of the key offline-service capabilities in Bytedesk. When no agent is available, when a workgroup is unattended, or when a session needs to move into offline handling, the system can display a business-specific form instead of a fixed set of default fields. This helps teams collect structured customer information based on their own service process.

This is especially useful for after-sales support, lead capture, appointment requests, project inquiries, complaint intake, and other scenarios where a simple free-text message is not enough. With a custom form, businesses can collect product details, order numbers, preferred contact time, issue category, urgency, region, and other fields in a more structured way.

## Value

- Turn offline messages into structured business forms instead of plain text submissions
- Bind a published leave-message form per organization or scenario
- Render fields dynamically on the visitor side based on form configuration
- Allow agents and admins to review, process, and follow up with complete context
- Support a more reliable offline service loop when no one is currently online

## Typical Use Cases

- Capturing customer needs during high-volume pre-sales periods
- Receiving offline requests outside business hours and following up later
- Collecting structured after-sales details such as order number, device information, and issue description
- Standardizing intake in education, healthcare, government, and enterprise-service scenarios

## Configuration Flow

### 1. Enable Leave Message Form Capability

Enable leave message forms in the admin console. Once enabled, visitors can submit messages in offline or unattended scenarios.

![message_leave_form](/img/form/message_leave_form.png)

If you only enable leave message forms, the system can still use the default built-in fields. If you need richer business fields, enable the custom form option and select a published form.

### 2. Build and Publish the Custom Form

Use FormBuilder to create a leave-message form. It is best to keep required fields to a minimum and organize the form clearly so completion stays easy for visitors.

Recommended core fields include:

- Contact name
- At least one valid contact method such as phone, email, or messaging handle
- A problem description or request summary
- Optional business fields such as issue type, service category, or priority

Before binding the form to the service flow, make sure it has already been published.

![message_leave_form_builder](/img/form/message_leave_form_builder.png)

### 3. Visitor Display and Submission

When no agent is available, the visitor sees the leave message form. After submission, the system saves the leave message and passes the structured information into the follow-up workflow.

For visitors, this reduces repeated explanation later. For the business, it means the offline request is not just a short message, but the beginning of a structured service case.

Typical visitor-side behavior includes:

- Automatically seeing the leave message form in offline or unattended scenarios
- Filling in fields such as contact details, issue description, order number, or appointment information
- Submitting the form and having the request stored for later handling
- Waiting for a reply or follow-up based on the leave message result

![message_leave_form](/img/form/message_leave_form.png)

### 4. Agent Processing

Agents can receive leave messages in real time, review submitted information, add replies, update status, and hand off to other team members when necessary.

For service teams, the biggest value is not merely receiving a message, but receiving a structured request. That lets them start with useful context instead of spending the first follow-up interaction collecting basics.

![message_leave_agent](/img/form/message_leave_agent.png)

### 5. Admin Review of Results

The admin backend provides a unified place to review leave message results and processing history for operations analysis, service review, and process optimization.

In practice, these results can be used to:

- Identify the most common issue categories and improve entry forms over time
- Prioritize urgent or high-value messages for faster callback
- Measure volume and efficiency by source or business type
- Review handling quality and optimize offline service procedures

![message_leave_result](/img/form/message_leave_result.png)

## Usage Recommendations

### Form Design Recommendations

- Keep required fields to the minimum needed for successful follow-up
- Put more complex business fields later in the form
- Use structured fields such as dropdowns, radios, and checkboxes where possible
- Add clear privacy or usage explanations for sensitive fields

### Operations Recommendations

- Prepare different leave message forms for different business lines when needed
- Use clear offline guidance text so visitors know when to expect a reply
- Review form fields regularly and remove anything that does not improve handling efficiency

## Best Practice Examples

### Example 1: After-Sales Issue Intake Form

Useful for software, hardware, equipment maintenance, and platform support teams that need more context before follow-up starts.

Recommended fields:

- Contact name
- Phone number or email
- Order number or customer ID
- Product name or device model
- Issue category
- Problem description
- Whether the issue affects normal use
- Attachment or screenshot upload

### Example 2: Sales Lead Capture Form

Useful for marketing campaigns, website inquiries, trial requests, and offline lead collection.

Recommended fields:

- Contact name
- Phone number
- Company name
- Industry
- Product or service of interest
- Current need description
- Budget range
- Preferred callback time

### Example 3: Appointment Request Form

Useful for in-person appointments, advisor sessions, course trials, demos, or scheduled service visits.

Recommended fields:

- Contact name
- Contact method
- Appointment topic
- Preferred date
- Preferred time slot
- Region
- Additional notes

The focus of this type of leave message form is not to collect many fields, but to make later callback and scheduling efficient.

## Difference from Default Leave Messages

Default leave messages are easier to launch quickly and work well for simple scenarios. Custom leave message forms are better when the business needs a more structured offline intake process. If your team must collect orders, appointments, cases, or lead details, a custom leave message form is usually the better choice.

## Quick Start

If you want to launch this quickly, follow this path:

1. Create a leave message form in FormBuilder
2. Publish the form and verify it can be previewed correctly
3. Enable leave message forms in the admin console
4. Enable the custom form option and select the published form
5. Test a real offline visitor submission and confirm the result reaches the service team

## Rollout Tips

### Prioritize Callback Readiness First

The first goal of a leave message form is not maximum data collection. It is to make sure your team can contact the visitor again and continue handling the request.

### Reduce Friction in Offline Scenarios

Visitors leaving an offline message usually have limited patience. If the form is too long, submission rate will drop. Focus on fields that truly improve callback and handling efficiency.

### Define the Processing Mechanism Before Launch

Before going live, make sure the team knows who owns incoming leave messages, how quickly they should respond, whether a callback is required, and when escalation is needed. Without that, the form will collect data but the service loop will remain weak.

## Pre-Launch Checklist

Before going live, make sure that:

- The leave message form is published and displays correctly in offline scenarios
- The form includes at least one valid contact method and a core problem description field
- The total number of fields stays reasonable and does not harm submission rate
- The team has a clear owner for receiving, replying to, and following up on leave messages
- Results are visible in both the service side and admin backend, with a clear next-step process

## Core Capabilities

### Dynamic Field Rendering

The visitor side does not use a single fixed page. It renders fields dynamically according to the selected published form, which makes service flows easier to evolve over time.

### Offline Handling Loop

Leave messages are not just stored as text. They become part of an offline handling loop that includes submission, review, response, and follow-up.

### Structured Information Collection

Compared with a plain free-text message, a custom form helps teams collect more usable information for routing, response quality, and reporting.

## Frequently Asked Questions

### How many fields should a leave message form include?

Start with fields that directly improve follow-up efficiency. Too many fields will reduce completion rate, especially on mobile and outside working hours.

### Does the form have to be custom?

No. Bytedesk supports both default leave message forms and custom forms. If the scenario is simple, the default form may be enough. If structured business data matters, use a custom form.

### Who benefits most from the results?

Frontline agents benefit from seeing the request details, supervisors benefit from classification and quality review, and operations leaders benefit from trend analysis and service efficiency insights.

## Related Docs

- [Leave Message Processing](message_leave.md): understand the full workflow for receiving, replying to, and managing leave messages
- [Custom Pre-Chat Form](pre_form.md): review the pre-conversation form workflow for online service entry
- [Chat Flow](chat_flow.md): see how form nodes can be used in broader customer service flows
- [Message Types](message.md): check the structure of form messages and form submission messages
