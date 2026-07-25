---
sidebar_label: Weiyu Softphone Toolbar
sidebar_position: 27
---

# Weiyu Softphone Toolbar

Weiyu Softphone Toolbar is a compact browser-based SIP softphone designed specifically for embedding into existing business systems. It sits as a toolbar across the top of the page, taking minimal space without obscuring your main interface. Use it standalone or embed it via iframe into third-party applications.

Compared to the full softphone, the toolbar version is lighter and more suitable for customer service agents and sales teams who need to make and receive calls throughout their daily workflow without switching screens.

## Use Cases

| Scenario | Description |
|----------|-------------|
| System Embedding | Embed into CRM, ticketing, or ERP systems so agents can handle calls without leaving the page |
| Agent Desktop | Agents handle online chats while simultaneously taking customer calls |
| Outbound Sales | Quick dial for outbound calls, with transfer, consultation, conference, and other advanced controls |
| Lightweight Agent Seat | When a full call center workspace isn't needed — just basic call control |

## Key Features

### Sign In & Sign Out

The top-left corner of the toolbar shows your current sign-in status. Click to expand the menu:

- **Auto Signing In** (blue): Page refreshed, auto-connecting with saved credentials
- **Signed In** (green): SIP registration successful, ready for calls
- **Connected** (blue): WebSocket connected but not yet registered
- **Ready to Sign In** (orange): Configuration loaded, waiting for sign-in
- **Configuration Error** (red): Failed to fetch SIP server config
- **Not Configured** (gray): No account information filled in

Click **Account Settings** in the menu to open the configuration form. Fill in your SIP account details and click **Sign In** to go online.

![softphonebar_account_settings](/img/callcenter/softphone/softphonebar_account_settings.png)

### Making Calls

Enter a target number in the input field in the middle of the toolbar, then press Enter or click the **Call** button. The number field supports phone numbers, extension numbers, and IVR numbers.

### Call Controls

When a call is active, action buttons appear on the right side of the toolbar. If there are too many buttons to fit, extras automatically collapse into a **More** menu:

- **Mute / Unmute**: Mute your microphone so the other party can't hear you
- **Hold / Resume**: Temporarily suspend the call; neither party can hear each other
- **Consult**: Dial an internal extension during a call without hanging up
- **Transfer**: Transfer the current call to another extension or agent
- **Transfer to IVR**: Route the call into an IVR voice menu (e.g. satisfaction survey, password verification)
- **Conference**: Invite more extensions to join, creating a multi-party call
- **Hang Up / Cancel**: End the call or cancel an outgoing call in progress

![softphonebar_calling](/img/callcenter/softphone/softphonebar_calling.png)

### Answering Incoming Calls

When a customer calls in, the toolbar responds by:

1. Switching the right-side action area to **Decline** and **Answer**
2. Showing a prominent "**Incoming Call**" alert in the status bar
3. Displaying an incoming call notification popup with the caller's number

![softphonebar_incoming_call](/img/callcenter/softphone/softphonebar_incoming_call.png)

### Remember Me

Check "Remember account and password, auto sign-in on refresh" in the account settings. Your SIP credentials will be saved locally in the browser. The next time you open the page, the toolbar will automatically connect and register — the status briefly shows "Auto Signing In".

To clear auto sign-in: uncheck the option and click Sign Out. Locally saved credentials will be deleted.

## Integration

Weiyu Softphone Toolbar is controlled by URL parameters and can be embedded via iframe into any web page.

### Base URL Format

```
https://cdn.weiyuai.cn/call/phone-bar?lang=en&mode=light&org=ORG_ID&visitorUid=VISITOR_ID&nickname=NAME&avatar=AVATAR_URL
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `lang` | No | UI language: `zh-cn` (Simplified Chinese), `zh-tw` (Traditional Chinese), `en` (English) |
| `mode` | No | Theme: `light` or `dark` |
| `org` | Yes | Organization ID, used to auto-fetch SIP server configuration |
| `visitorUid` | Yes | Unique visitor ID for call record association |
| `nickname` | No | Display name shown in incoming call notifications |
| `avatar` | No | Avatar image URL |

### Embedding Example

**iframe embed (recommended width ≥ 800px):**

```html
<iframe
  src="https://cdn.weiyuai.cn/call/phone-bar?lang=en&mode=light&org=df_org_uid&visitorUid=agent_001&nickname=Agent%20Smith"
  width="100%"
  height="56"
  style="border: none"
/>
```

> ⚠️ Set the iframe height to at least `56px` to ensure the toolbar content displays fully. The height will automatically expand on incoming calls to show alerts.

**Open in new window:**

```html
<a href="https://cdn.weiyuai.cn/call/phone-bar?lang=en&mode=light&org=df_org_uid&visitorUid=agent_001&nickname=Agent%20Smith" target="_blank">
  Open Softphone Toolbar
</a>
```

### Try It

[Click to try Weiyu Softphone Toolbar](https://cdn.weiyuai.cn/call/phone-bar?lang=zh-cn&mode=light&org=df_org_uid&visitorUid=visitor_001&nickname=%E7%94%A8%E6%88%B7%E5%B0%8F%E6%98%8E&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg)

## Full Softphone vs Toolbar

| Feature | Weiyu Softphone (Full) | Weiyu Softphone Toolbar |
|---------|------------------------|-------------------------|
| Form Factor | Standalone full-page app | Compact toolbar, embedded at page top |
| Dialing | Visual keypad + input field | Input field + Enter / button |
| Call Controls | Call, Hang Up | Mute, Hold, Consult, Transfer, Transfer to IVR, Conference, Hang Up |
| Best For | Standalone use, full-screen embed | Embedding into existing systems, minimal space |
| Recommended Width | ≥ 420px | ≥ 800px |
| DTMF Support | ✅ In-call keypad | ❌ |
| Advanced Call Actions | ❌ | ✅ Internal consultation, transfer, conference, etc. |

## FAQ

### Toolbar not displaying fully?

The toolbar adapts to different widths. When the browser window is narrow, extra action buttons automatically collapse into the "More" menu. For the best experience, keep the iframe width at least 800px.

### How do I switch accounts?

Click the status button in the top-left corner of the toolbar, select "Account Settings", update your account details, and click "Sign In". If already signed in, click "Sign Out" first to disconnect your current account.

### Can I use both the full softphone and the toolbar simultaneously?

The toolbar and full softphone use independent local storage and don't interfere with each other. However, if your SIP server doesn't support multiple registrations on the same extension, we recommend logging in on only one endpoint at a time.
