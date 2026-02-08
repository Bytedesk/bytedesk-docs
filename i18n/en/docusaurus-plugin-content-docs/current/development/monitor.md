---
sidebar_label: Monitor
sidebar_position: 49
---

# Monitor

This page introduces Bytedesk Desktop’s **Session Monitor / Join / Takeover** features.

In short: if you have the required management permission, you can view ongoing sessions for specific teams (workgroups) and step in when needed.

## When to use

- **Quality & coaching**: supervisors observe conversations and guide agents when needed.
- **Escalation handling**: step in for complaints or critical incidents to reduce back-and-forth.
- **On-call backup**: take over when the current agent is offline or unresponsive.

## Key concepts

- **Workgroup**: a support team (e.g. “Pre-sales”, “After-sales”).
- **Agent**: the person who chats with customers.
- **Monitor**: see ongoing sessions and open a session to read the conversation (usually without changing who is handling it).
- **Join**: the manager joins the session and participates.
- **Takeover**: the manager transfers handling responsibility to themselves (or someone else).

## Who can use it

Only users who are granted **workgroup management permission** can use these features.

If you don’t see Monitor in Desktop, it usually means your account hasn’t been granted access yet. Ask your organization admin to configure it.

## Desktop entry & workflow

### Entry

In Bytedesk Desktop, there is a **Monitor** menu in the left navigation (or filter menu).

You’ll see a list of workgroups you are allowed to manage.

### Typical monitoring flow

1. Open **Monitor**.
2. Select a workgroup you manage.
3. View the workgroup’s **ongoing session list**.
4. Open a session:
	 - start with **read-only monitoring**;
	 - if you need to intervene, use **Join** or **Takeover**.

## Join vs Takeover (behavior guidance)

- **Join**: you participate while keeping the current agent in the loop.
	- Good for: clarification, calming down users, approvals, or providing expert input.
	- Risk: multiple speakers can confuse the user—coordinate internally first if possible.

- **Takeover**: you become the handler (or assign to someone else).
	- Good for: the current agent is offline/busy, or this requires escalation.
	- Tip: when taking over, introduce yourself and explain why.

## Tips

- Monitor first, then act: read the context before joining or taking over.
- Avoid “talking over” the agent when joining: coordinate to prevent duplicated or conflicting replies.
- After takeover, set expectations: who you are, why you took over, what happens next.

## FAQ

### Why don’t I see any workgroups under Monitor?

Usually because your account hasn’t been granted workgroup management permission.

Ask your organization admin to configure which workgroups you can monitor/take over.

### Does a workgroup admin have to be an agent in that workgroup?

Not necessarily.

A supervisor/QA/on-call owner can be granted monitor/takeover permissions without being assigned as a daily handling agent.
