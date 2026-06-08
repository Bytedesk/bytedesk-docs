---
sidebar_label: Softphone
sidebar_position: 26
---

# Softphone

The Weiyu Call Center softphone toolbar is the main entry point for agents to sign in, place outbound calls, and control live calls from the desktop workspace. It brings traditional desk phones, SIP extensions, and the online agent console into one operating surface, so agents can handle the full call flow without constantly switching systems.

For enterprises, this is more than a dialing bar. It is a practical telephony workspace for customer service, sales, outbound teams, and internal support. With the Weiyu softphone toolbar, phone handling, customer context, ticket logging, and online conversations can stay in one agent desktop, improving connection efficiency, reducing operation steps, and making call handling more standardized.

![softphone](/img/callcenter/softphone.png)

## Highlights

- **One-click sign in and sign out**: Agents can register or unregister their SIP extension directly from the workspace and switch their availability quickly.
- **Visible live status**: The toolbar shows the current sign-in state, such as disabled, signed out, signing in, signed in, or sign-in failed, so agents and supervisors can immediately see whether the extension is ready.
- **Fast outbound dialing**: Agents can enter a mobile number, extension, or IVR target and place a call directly, which fits callbacks, outbound sales, and internal collaboration.
- **Call duration display**: Once a call is connected, the toolbar shows the live duration to help agents manage the conversation rhythm and support quality review later.
- **In-call controls**: The toolbar supports hold and resume, transfer, transfer to IVR, invite to conference, and hangup for common call-center workflows.
- **Adaptive overflow actions**: When space becomes limited, less critical actions are automatically moved into a More menu to keep the interface clean without losing functionality.

## What the toolbar supports

### Sign in and sign out

Sign in means the current agent's SIP extension is registered and available for inbound handling, desktop call popups, and softphone control. Sign out means the agent actively unregisters the WebRTC softphone session.

This gives teams flexible control over agent availability, for example:

- Sign in at the start of a shift and start taking calls immediately.
- Sign out temporarily when stepping away, so new calls are not routed to the current agent.
- Control the desktop endpoint independently when a physical desk phone and the desktop softphone share the same extension.

### Outbound dialing

Agents can directly enter a target number, internal short code, extension, or IVR target and click Call to start dialing. In high-volume outbound scenarios, this is much more efficient than switching between systems, copying numbers, and dialing manually.

Typical outbound use cases include:

- After-sales callbacks
- Lead follow-up
- Reminder calls
- Order confirmation
- Internal extension dialing

### In-call control

After the call is connected, the toolbar continues to provide the key call-control actions agents need:

- **Hold and resume**: Useful when the agent needs to check information, confirm something internally, or pause the conversation briefly.
- **Transfer**: Move the current call to another agent, extension, or destination and reduce repeated explanations.
- **Transfer to IVR**: Send the caller back into a voice menu flow for self-service or menu selection.
- **Conference invite**: Bring another agent or extension into the live call for collaboration or escalation.
- **Hangup**: End the current call quickly.

Together, these actions form the operational core of daily call-center work without requiring a separate phone panel or a complex telephony interface.

## Business value

### One workspace for calls and customer service

The Weiyu softphone toolbar is embedded directly into the agent desktop. While agents are on a call, they can continue to review customer details, visitor source, conversation history, tickets, tags, and notes without splitting work between disconnected systems.

### Lower agent training cost

Common call actions are grouped in one stable area of the interface. That lowers learning cost and shortens training time, which is especially important for new teams, outsourcing teams, and high-turnover roles.

### Faster handling and collaboration

From sign-in and outbound dialing to transfer, IVR redirection, and conference collaboration, the toolbar covers the high-frequency actions agents use most. Agents can complete the main call-handling flow without jumping across multiple screens.

### A gradual path away from legacy desk phones

Enterprises can keep existing desk phones and gradually move call control into the WebRTC agent workspace. Weiyu supports both models in parallel, which protects existing telephony assets while lowering the switching barrier for modern cloud-based operations.

## Typical workflow

1. An administrator enables calling for an agent and binds the correct SIP extension.
2. The agent signs in from the softphone toolbar in the Weiyu desktop workspace.
3. The agent enters a customer number, internal short code, or business target and starts an outbound call, or waits for an incoming call.
4. Once the call is connected, the agent can hold, transfer, send the caller to IVR, or invite another agent into a conference as needed.
5. After the call ends, the agent can continue with customer follow-up, notes, or ticket handling.

## Typical scenarios

- Unified inbound and callback handling for support teams
- Proactive outbound work for sales and lead follow-up
- Escalation and coordinated handling for after-sales service
- Combined operator console, IVR, and live agent workflow
- Hybrid operation with both desk phones and desktop softphones

## Why Weiyu Call Center

Weiyu Call Center is not only about telephony. It is built around integrating communication capabilities with real customer-service workflows. The softphone toolbar may look like a small entry point, but it carries the full chain of agent availability, live conversation, customer handling, and team collaboration.

For organizations that want to move from traditional phone equipment toward an online, visible, collaborative service model, the Weiyu softphone toolbar is a direct and practical step. It helps agents get productive faster, helps managers standardize operations, and helps customers receive a more stable and efficient service experience on every call.

## Related reading

- [PopUp](./popup): See how inbound calls trigger real-time agent popups, answer actions, and synchronized call status.
- [IVR](./ivr): See how inbound calls are handled through voice menus, self-service flows, and transfers to live agents.
