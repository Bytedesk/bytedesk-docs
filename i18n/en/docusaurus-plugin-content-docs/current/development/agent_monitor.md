---
sidebar_label: Agent Monitor
sidebar_position: 69
---

# Agent Monitor

:::tip Note
This feature is not available in the Community Edition. Please upgrade to the Enterprise Edition or Platform Edition before using it.
:::

## Overview

Bytedesk supports real-time supervision and intervention for ongoing workgroup conversations. This capability is designed for supervisors, team leaders, QA staff, trainers, and senior agents who need to observe or step into live customer sessions.

The feature includes three core actions:

- Monitor: observe the conversation without taking over the primary handling role
- Barge: join the conversation and collaborate without replacing the current primary agent
- Takeover: become the new primary agent for the conversation

These three actions represent different levels of intervention, from low-impact supervision to full ownership transfer.

## Feature Differences

### Monitor

Monitor is the lightest intervention mode. It is mainly used for supervision, coaching, and quality review.

**Typical scenarios:**

- Live quality inspection
- New agent training
- Reviewing context before deciding whether to intervene further
- Supervising important customer conversations

**Characteristics:**

- Does not replace the current primary agent
- Focused on observation
- Usually the first step before barge or takeover

### Barge

Barge means joining the conversation as a collaborator. The current primary agent remains unchanged, but the new participant can help handle the case.

**Typical scenarios:**

- Expert support for complex issues
- Senior agent assisting a junior agent
- Cross-functional collaboration for special cases

**Characteristics:**

- Primary agent remains unchanged
- The participant can collaborate in the session
- Best suited for cooperative handling rather than ownership transfer

### Takeover

Takeover means the current user becomes the new primary agent for the conversation.

**Typical scenarios:**

- Complaint escalation
- Urgent handoff to a supervisor
- High-value customer handling
- Cases beyond the current agent's ability or authority

**Characteristics:**

- Replaces the current primary agent
- Transfers ownership of the session
- Should be used carefully in escalation scenarios

## Comparison

| Action | Can view conversation | Can participate | Replaces primary agent | Typical use |
| --- | --- | --- | --- | --- |
| Monitor | Yes | No | No | QA, coaching, supervision |
| Barge | Yes | Yes | No | Collaboration, expert support |
| Takeover | Yes | Yes | Yes | Escalation, supervisor handling |

## Prerequisites

Before using this feature, make sure the following conditions are met:

1. Your system is running Enterprise Edition or Platform Edition.
2. The current account has proper permission.
3. Monitorable workgroups have been assigned to the current agent.
4. There are ongoing workgroup conversations available for supervision.

## Admin Setup Recommendations

To make Monitor, Barge, and Takeover practical in production, administrators should prepare the feature carefully:

1. Identify which workgroups should be open to supervision.
2. Assign monitorable workgroups only to specific staff.
3. Grant this capability mainly to supervisors, team leads, trainers, and QA staff.
4. Avoid granting broad access to all workgroups unless truly necessary.
5. Define clear takeover rules for escalations, complaints, and high-value customer cases.

For larger organizations, it is recommended to assign monitoring scope by team, business unit, or region.

## How To Use

### Step 1: Assign monitorable workgroups

An administrator must first assign one or more monitorable workgroups to the target account. Only conversations from authorized workgroups will appear in the monitoring list.

### Step 2: Open the monitoring conversation list

In the desktop agent client, click the Monitor Conversation menu in the conversation list area. The system will load the authorized workgroups and their ongoing conversations.

If multiple workgroups are configured, the top area provides a multi-select dropdown so the user can:

- select a single workgroup
- select multiple workgroups together
- narrow down the monitoring scope quickly

### Step 3: Open a conversation

After selecting a conversation, the chat detail panel is shown on the right. If the conversation is in a valid monitoring context, the header can show the following actions:

- Monitor
- Barge
- Takeover

The system automatically adjusts button visibility based on the current role in that conversation. For example:

- if the current user is already the primary agent, these actions are hidden
- if the current user is already monitoring, Monitor is hidden
- if the current user is already assisting, only meaningful next actions remain visible

### Step 4: Perform an action

#### Use Monitor

1. Open the target conversation.
2. Click Monitor.
3. The system adds the current account as a monitor.
4. Continue observing or decide whether to barge or take over later.

#### Use Barge

1. Open the target conversation.
2. Click Barge.
3. The system adds the current account as a collaborator.
4. The original primary agent stays unchanged.

#### Use Takeover

1. Open the target conversation.
2. Click Takeover.
3. The system sets the current account as the new primary agent.
4. The new owner continues handling the session.

## Best Practices

- Start with Monitor before choosing Barge or Takeover.
- Use Barge for collaboration, not replacement.
- Use Takeover only when ownership really needs to change.
- Define internal escalation rules for complaints and high-value customers.
- Assign monitoring permission by team or workgroup instead of granting broad access.

## FAQ

### Why can't I see the Monitor Conversation entry?

Possible reasons include:

- the current edition is not Enterprise or Platform
- no monitorable workgroup has been assigned
- the current user lacks permission
- there are no eligible ongoing workgroup conversations

### Why can't I see the Monitor, Barge, or Takeover buttons?

Possible reasons include:

- the current conversation is not in monitoring context
- the conversation is not a workgroup conversation
- the current user is already the primary agent
- there is no meaningful next action available for the current role

## Related Docs

- [License](./license.md)
