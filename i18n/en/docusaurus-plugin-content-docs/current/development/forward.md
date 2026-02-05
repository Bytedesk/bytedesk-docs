---
sidebar_label: Message Forwarding
sidebar_position: 46
---

# Message Forwarding

Use this feature to forward one or multiple messages to another conversation (DM / group / support ticket, depending on your setup). Two forwarding modes are available:

- **Forward one by one**: Sends the selected messages in order as individual messages.
- **Forward as a merged card**: Packs multiple messages into a single “chat history” bubble, great for handing off context.

In multi-select mode, you can also **Favorite**, **Download to computer**, or **Delete** the selected messages.

## Open the Multi-select menu

1. Locate any message you want to handle
2. Right-click the message to open the context menu
3. Click **Multi-select**

![forward_menu](/img/forward/forward_menu.png)

## Select messages

1. Check the messages you want to include (they can be continuous or non-continuous)
2. Choose an action from the action bar:
	- **Forward one by one**
	- **Forward as merged**
	- **Favorite**
	- **Download to computer**
	- **Delete** (be careful: permissions and recoverability depend on system settings)

Tips:

- Use **Forward as merged** for “handoff / reporting / full context”.
- Use **Forward one by one** if the receiver needs to reply or process each item individually.

![forward_choose](/img/forward/forward_choose.png)

## Forward messages

After choosing **Forward one by one** or **Forward as merged**, a forwarding window will appear:

1. Select the recipient conversation
2. Confirm the forwarding mode and preview content
3. Click send

![forward_modal](/img/forward/forward_modal.png)

## Merged forward bubble

When you choose **Forward as merged**, the receiver will see a “chat history” bubble. Clicking it expands the full list of merged messages.

![forward_message](/img/forward/forward_message.png)

## Preview before sending

Before sending, review the preview to confirm:

- The selected messages are complete
- The order is correct
- No sensitive information is included

If anything looks wrong, close the window and re-select the messages.

![forward_preview](/img/forward/forward_preview.png)

## FAQ

### Why can’t I find “Multi-select / Forward”?

- The current conversation type may not support forwarding, or your account lacks permission.
- Admin settings may enable/disable forwarding.

### Will the receiver see the original sender and timestamp?

- **Forward one by one** is usually closer to the original message format.
- **Forward as merged** is shown as a chat-history bubble; exact rendering depends on client version and configuration.

### How is Delete related to Forward?

- **Delete** affects only the current conversation (recoverability depends on settings).
- **Forward** sends a copy to another conversation. They are not equivalent.
