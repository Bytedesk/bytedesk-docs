---
sidebar_label: PopUp
sidebar_position: 25
---

# PopUp

Call popup is the real-time inbound call alert capability in the Weiyu Call Center agent workspace. When a customer calls in through a mobile phone, desk phone, or external trunk, the system automatically opens a call window in the agent desktop, showing the caller number, live call status, and action entry points so the agent can recognize and answer the call immediately.

![Agent call popup demo](/img/callcenter/popup/popup.png)

## Highlights

- **Real-time inbound alert**: Once a customer call is routed to an agent extension, the workspace automatically opens the incoming call window without requiring the agent to switch pages.
- **Caller information display**: The popup shows the caller number or SIP peer information, and it can be expanded later with customer profile, visitor records, tickets, and conversation history.
- **One-click answer and decline**: When the desktop softphone is online, agents can answer or reject the call directly from the popup.
- **In-call status display**: After answer, the popup transitions into the live call window and shows call state, duration, mute, hangup, and related controls.
- **Desk phone collaboration**: The same extension can be shared by a physical desk phone and the agent workspace. When the desk phone rings, the desktop popup is shown as well; when the desk phone answers, the desktop switches to in-call state; when it hangs up, the desktop returns to idle.
- **Inbound IVR integration**: If the caller first enters an IVR flow and then transfers to a live agent, the popup still appears for the assigned agent.

## Typical workflow

1. An administrator configures agent calling settings, for example by binding extension `5003` and enabling calling.
2. The agent opens the workspace and clicks Sign In on the softphone toolbar.
3. A customer calls the business number and the call enters a FreeSWITCH, IVR, or queue flow.
4. When the call is routed to the agent extension, the desktop receives the inbound event and opens the call popup.
5. The agent can answer from the workspace or pick up the linked desk phone.
6. Once the call is connected, the workspace shows the live call state and call duration.
7. When either endpoint hangs up, the workspace synchronizes to call ended.

## What the popup shows

The current popup in the agent workspace mainly includes the following information and actions:

- Caller number or SIP peer identity.
- Call state such as ringing, in call, desk-phone in call, and call ended.
- Softphone actions including answer, decline, hangup, and mute.
- Call duration.
- External endpoint notice, for example when the current call is being handled by the desk phone and the desktop only mirrors the state.

In real business scenarios, the popup can also be connected to customer data so it shows customer name, location, recent conversations, past tickets, order details, service tags, and notes.

## Shared extension with desk phone and workspace

Weiyu supports using the same agent extension on both a desk phone and the agent workspace. For example, the desk phone is bound to `5003` and the currently logged-in agent also signs in to `5003` in the desktop workspace.

This mode is suitable when:

- Agents prefer answering with a desk phone but still want customer data to appear automatically on screen.
- Agents need to review customer information, create tickets, and record notes on the computer while keeping stable voice quality on a desk phone.
- The business wants to migrate gradually from traditional devices to a WebRTC softphone without removing either answer mode.

In this shared-extension mode, FreeSWITCH keeps separate Contacts for the desk phone and the desktop workspace through multi-registration support. The desktop workspace registers with its own SIP instance identity, and signing out only unregisters that WebRTC endpoint without affecting the desk phone registration. This makes the following behavior possible:

- If the workspace is not signed in, the desk phone can still ring normally.
- If the workspace is signed in, the desk phone rings and the desktop popup appears at the same time.
- If the desk phone answers, the desktop synchronizes to in-call state and disables controls that do not apply to an externally handled call.
- If the desk phone hangs up, the desktop synchronizes to call ended.

## How it works

The call popup is driven by FreeSWITCH call events, a backend ESL event stream, and the SIP controller in the agent workspace.

### Backend event stream

During a call, FreeSWITCH emits events such as `CHANNEL_CREATE`, `CHANNEL_ANSWER`, `CHANNEL_HANGUP`, and `CHANNEL_CALLSTATE`. The Weiyu backend listens to these events, converts them into a unified call event model, and pushes them to the workspace through SSE.

### Workspace popup behavior

The workspace registers the agent extension with SIP.js and subscribes to the backend ESL event stream through SSE with authenticated headers. After receiving events that match the current extension, the frontend maps FreeSWITCH events to popup states:

- `CHANNEL_CREATE`: ringing, open the popup.
- `CHANNEL_ANSWER`: in call.
- `CHANNEL_HANGUP` / `CHANNEL_HANGUP_COMPLETE` / `CHANNEL_DESTROY`: call ended.
- `CHANNEL_CALLSTATE` / `CHANNEL_STATE`: additional state hints for ringing, answer, and hangup.

### IVR to agent popup flow

When a caller first enters IVR and then presses a key to reach a live agent, the path is typically:

1. The external number enters FreeSWITCH.
2. The dialplan sends the call to an IVR entry such as `5002`.
3. The IVR uses HTTAPI to play a welcome message and collect keypad input.
4. After the caller presses `0`, the system runs `transfer 5003 XML default` to route the call to the agent extension.
5. The desk phone and workspace endpoint registered to `5003` are both called.
6. The workspace receives the event and opens the popup.

This design does not bypass the FreeSWITCH dialplan or directory, so the platform can continue to use desk phone registration, WebRTC registration, simultaneous ringing across endpoints, and synchronized state updates.

## Requirements

Before using call popup, make sure the following are ready:

- FreeSWITCH is enabled and the backend option `bytedesk.call.freeswitch.enabled=true` is turned on.
- The current workspace account has an agent role.
- The agent has an enabled `CallSettingsEntity` whose target extension matches the FreeSWITCH extension.
- The workspace can access the SIP WebSocket service and register the extension successfully.
- The backend endpoint `/api/v1/freeswitch/esl/events/stream` is reachable from the workspace and the request carries a valid login token.
- When a desk phone and workspace share the same extension, FreeSWITCH must allow multiple Contact registrations for that extension.

## Troubleshooting suggestions

If the popup does not appear or the state is not synchronized, check the following in order:

1. Confirm in the softphone toolbar that the agent is signed in and SIP registration succeeded.
2. Check in FreeSWITCH whether the extension is registered, for example with `show registrations`.
3. Call `/api/v1/freeswitch/esl/events/recent` and confirm that `CHANNEL_CREATE`, `CHANNEL_ANSWER`, and `CHANNEL_HANGUP` events are present.
4. Verify that the workspace can access `/api/v1/freeswitch/esl/events/stream` without authentication errors.
5. If the desk phone rings but no popup appears, focus on the ESL event stream and agent sign-in state.
6. If the popup appears but the desk phone does not ring, focus on extension registration, directory `dial-string`, and multi-registration configuration.
7. If the desk phone answers but the workspace does not switch to in-call state, check whether the `CHANNEL_ANSWER` event includes the current extension or Presence ID.

## Typical scenarios

- Service hotline calls where the agent should identify the customer before answering.
- Automatic popup after IVR key transfer to a live agent.
- Desk-phone answering while the workspace mirrors customer information and call state.
- A unified workspace where phone service and online service agents handle tickets, notes, and conversations during the call.
- Call-center operations involving outbound calls, hold, transfer, and transfer to IVR.

## Related reading

- [Softphone](./softphone): See how agents sign in, place outbound calls, and control hold, transfer, and hangup actions.
- [IVR](./ivr): See how callers are routed through voice menus and keypad flows before reaching a live agent.
