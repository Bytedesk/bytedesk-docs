---
sidebar_label: Weiyu Softphone
sidebar_position: 27
---

# Weiyu Softphone

Weiyu Softphone is a lightweight browser-based SIP softphone — no software installation or plugins required. Open a browser and you can make and receive calls immediately. It works as a standalone page or can be embedded into third-party websites and applications, helping your team gain phone communication capabilities quickly.

## Use Cases

| Scenario | Description |
|----------|-------------|
| Customer Service Agents | Agents log in and answer customer calls directly, no physical phone needed |
| Outbound Sales | Sales reps dial numbers and call with one click, DTMF keypad support for IVR interactions |
| Internal Communication | Employees dial each other by extension number, free internal calls |
| Third-party Integration | Embed via URL into CRM, ticketing systems, or any web page |

## Key Features

### Account Login

When you open the page, you will first see the SIP account login form. Fill in the following:

- **Account**: Your SIP extension number, e.g. `1001`
- **Password**: SIP extension password
- **Domain**: SIP server domain, e.g. `sip.weiyuai.cn`
- **WebSocket Address** (optional): Leave blank to auto-construct from the domain
- **Display Name** (optional): The name shown to the other party during calls

> 💡 Check "Remember account and password, auto sign-in on refresh" to skip manual login next time.

After filling in, click **Login** to connect and register.

![softphone_account_settings](/img/callcenter/softphone/softphone_account_settings.png)

### Dial Pad

After successful login, the page switches to the dial pad where you can:

- Use the on-screen keypad to enter numbers, or type directly into the input field
- Click **Call** to initiate an outbound call
- During a call, use the keypad to send DTMF tones (e.g. press `1` for IVR menus)

![softphone_call_dial](/img/callcenter/softphone/softphone_call_dial.png)

### Answering Incoming Calls

When an incoming call arrives, the softphone alerts you in two ways:

1. Pop-up notification: Shows the caller's number and name, with **Answer** and **Decline** buttons
2. Dial pad switch: The dial area changes to show "Incoming Call" and the call/decline buttons replace the dial/hangup buttons

![softphone_incoming_call](/img/callcenter/softphone/softphone_incoming_call.png)

### Account Management

After logging in, click **Account Settings** in the top-right corner to modify account details or switch extensions. At the bottom of the settings panel, you can view real-time status:

- Current connection address
- Connection status (WebSocket Connected / Disconnected)
- Registration status (Registered / Registering / Unregistered)
- Call status (Incoming Call / In Call / Ringing / Idle)

Click **Sign Out** to unregister and clear locally saved login credentials.

## Integration

Weiyu Softphone is a pure web application controlled by URL parameters and can be embedded into any web page.

### Base URL Format

```
https://cdn.weiyuai.cn/call/phone?lang=en&mode=light&org=ORG_ID&visitorUid=VISITOR_ID&nickname=NAME&avatar=AVATAR_URL
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `lang` | No | UI language: `zh-cn` (Simplified Chinese), `zh-tw` (Traditional Chinese), `en` (English) |
| `mode` | No | Theme: `light` or `dark` |
| `org` | Yes | Organization ID, used to auto-fetch SIP server configuration |
| `visitorUid` | Yes | Unique visitor ID for call record association |
| `nickname` | No | Display name shown on the call interface |
| `avatar` | No | Avatar image URL |

### Embedding Example

**iframe embed:**

```html
<iframe
  src="https://cdn.weiyuai.cn/call/phone?lang=en&mode=light&org=df_org_uid&visitorUid=agent_001&nickname=Agent%20Smith"
  width="420"
  height="700"
  style="border: none"
/>
```

**Open in new window:**

```html
<a href="https://cdn.weiyuai.cn/call/phone?lang=en&mode=light&org=df_org_uid&visitorUid=agent_001&nickname=Agent%20Smith" target="_blank">
  Open Softphone
</a>
```

### Try It

[Click to try Weiyu Softphone](https://cdn.weiyuai.cn/call/phone?lang=zh-cn&mode=light&org=df_org_uid&visitorUid=visitor_001&nickname=%E7%94%A8%E6%88%B7%E5%B0%8F%E6%98%8E&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg)

## FAQ

### Login failed?

Check the following:

1. Account, password, and domain are correct
2. Do not prefix the domain with `wss://` or `https://`
3. Confirm the SIP server is reachable from your network
4. Check the connection status at the bottom of the page — WebSocket must be connected

### How to auto sign-in on refresh?

Check "Remember account and password, auto sign-in on refresh" when logging in. After a page refresh, the system will automatically connect and register, showing an "Auto signing in" indicator.

To disable auto sign-in, uncheck the option and click Sign Out — locally saved credentials will be cleared.

### Can I use it alongside a physical desk phone?

This depends on your SIP server configuration. If the server allows multiple registrations on the same extension (multi-endpoint), you can use both. Otherwise, we recommend logging in on only one device at a time.
