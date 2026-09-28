---
sidebar_label: Tickets
sidebar_position: 1
---

# Ticket Management

Tickets record issues that need follow-up. They can be created directly from conversations and flow between agents via assignment and transfer until resolution and verification.

## Ticket List

The ticket page shows filters on the left and the ticket list on the right.

![Ticket workspace](/img/manual/agent/ticket.png)

On wide screens the ticket workspace shows the full filter area and list:

![Ticket workspace wide layout](/img/manual/agent/ticket-wide.png)

### Filters

Tickets can be filtered by:

| Dimension | Values |
| --- | --- |
| Status | All, New, Processing, On hold, Reopened, Resolved, Closed, Verified |
| Priority | Lowest, Low, Medium, High, Urgent, Critical |
| Assignment | All, Created by me, Assigned to me, Unassigned |
| Time | All, Today, Yesterday, This week, Last week, This month, Last month |

### List Fields

The list shows: ticket number, description summary, type tag, status tag, priority tag, and update time. The top provides search, refresh, create, and the total count.

## Creating a Ticket

1. Click "Create ticket" at the top of the ticket page, or "Create ticket" in the chat window
2. Fill in the ticket information:
   - **Title, summary, description**: explain the problem
   - **Urgency, category**: select priority and business category
   - **Customer, handler, reporter, workgroup, department**: related people and organization
   - **Contact name, phone, email, WeChat**: visitor contact details
   - **Channel**: source channel of the ticket
3. Optionally associate the current visitor conversation
4. Upload attachments and save

## Ticket Details

Click a ticket to open its details, including the chat window and the "Ticket details" / "Flow records" tabs on the right:

![Ticket details with claim and assign](/img/manual/agent/ticket-detail.png)

- **Ticket details**: view and edit ticket fields
- **Flow records**: status transitions and handling records

## Handling Tickets

Available actions (depending on status and permissions):

| Action | Description |
| --- | --- |
| Edit | Modify ticket fields |
| Assign | Specify a handler |
| Close | Close the ticket |
| Reopen | Reopen a closed ticket |
| Verify | Verify the result |
| Invite | Invite other members |
| Delegate | Delegate to someone else |
| CC | Copy related people |
| Countersign | Add handling opinions |
| Return | Send back to the previous step |
| Revoke | Undo an operation |

## Ticket Status

The full status set:

- **New**: just created
- **Assigned**: a handler has been specified
- **Claimed**: the handler has claimed it
- **Processing**: being handled
- **On hold**: temporarily suspended
- **Reopened**: reopened after resolution or closure
- **Transferred**: transferred to someone else
- **Resolved**: handling complete, awaiting verification
- **Closed**: ticket closed
- **Cancelled**: ticket cancelled
- **Verified OK / Verified failed**: confirmation of the resolution by the visitor or reporter

:::note Note
Ticket statuses and flows are configured by administrators in the admin console and may differ between organizations.
:::
