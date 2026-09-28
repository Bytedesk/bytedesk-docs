---
sidebar_label: WeCom Smart Robot (Long Connection)
sidebar_position: 13
---

# WeCom Smart Robot (Long Connection)

## Overview

Bytedesk can connect to WeCom **Smart Robots** (智能机器人) via a persistent
**long connection** (WebSocket). Once connected, the Smart Robot you created in
the WeCom PC client is powered by a Bytedesk AI robot as its "brain", so it can
automatically receive and answer customer messages — no callback URL, no server
code, and no development required.

This mode is best suited to one-on-one conversations between a customer and the
robot, such as guided Q&A, service triage, lead collection, and automated first
response. The robot can also be added to internal WeCom group chats and invoked
by @-mentioning it. To compare with the legacy webhook approach, see
[WeCom Group Chat Bot](./wechat_work_group_robot.md).

:::tip Prerequisites

- Available in Enterprise and Platform editions only. [Contact us](/img/wechat.png)
  if you need it.
- The WeCom admin console has **no entry for creating Smart Robots** — the
  creation entry is only in the WeCom PC client.
- Prepare a usable Bytedesk AI robot in advance. If human handoff is required,
  prepare the target workgroup as well.
:::

## Step 1: Create a Smart Robot in the WeCom PC Client

1. Open the WeCom PC client and go to **Contacts → Smart Robot**.
2. Click **Create Smart Robot**.

![Smart Robot entry in the WeCom client](/img/wechat_work/wechat_work_create_bot.png)

1. Fill in the robot name, description, and other basic information.
2. Choose **API mode**, which is used to connect to Bytedesk.

![Choosing API mode when creating the robot](/img/wechat_work/wechat_work_create_bot_2.png)

1. Select the **long connection** method in the API configuration.
2. Write down the **BotID** and **Secret** shown on the page. You will need them when binding the robot in Bytedesk.

![Getting the BotID and Secret](/img/wechat_work/wechat_work_create_bot_3.png)

## Step 2: Bind the Robot in Bytedesk

1. Log in to the Bytedesk admin console.
2. Go to **Channels → WeCom Robot**.
3. Click **Bind** and fill in the form:

![Binding a WeCom Smart Robot in the Bytedesk console](/img/wechat_work/wechat_work_bot_bytedesk.png)

| Field | Description |
| --- | --- |
| Name | A name to identify this robot |
| BotID | The BotID issued by the Smart Robot API mode in the WeCom PC client |
| Secret | The Secret issued by the Smart Robot API mode in the WeCom PC client |
| AI Robot | The Bytedesk AI robot that acts as the answering brain |
| Workgroup | The workgroup that robot conversations are routed to (agent collaboration) |
| WebSocket URL | Defaults to `wss://openws.work.weixin.qq.com`; override only for private deployments |
| Enabled | Whether to connect automatically on startup |

1. Click **Save**.

If you want the robot to answer first and transfer to human agents only when
needed, configure both the AI robot and the target workgroup here.

## Step 3: Establish the Long Connection

After saving, click **Connect**. Bytedesk will establish a persistent WebSocket
connection with WeCom. The status becomes **CONNECTED** when the connection is
successful. If you only want to confirm the current connectivity, you can also
refresh or check the status from the detail panel.

- **CONNECTING** — connecting in progress
- **CONNECTED** — connection established, ready to receive messages
- **RECONNECTING** — connection dropped, automatically reconnecting
- **DISCONNECTED** — not connected
- **DISABLED** — robot is disabled

## Step 4: Test

Start a direct one-on-one conversation with the robot from the WeCom client to
verify that Bytedesk has taken over message handling.

![Starting a robot conversation in the WeCom client](/img/wechat_work/wechat_work_bot_start_chat.png)

Once in the conversation, send a test message and confirm the Bytedesk AI robot
replies correctly.

![One-on-one robot conversation](/img/wechat_work/wechat_work_chat.png)

At minimum, verify these two points:

1. The robot can receive a message and return an answer.
2. When AI cannot handle the case alone, the conversation is routed to the
  expected workgroup.

## Step 5 (Optional): Add the Robot to a Group Chat

If your use case needs the robot inside an internal WeCom group, you can add
the Smart Robot to the group chat. After that, invoke it by @-mentioning the
robot.

![Smart Robot in an internal WeCom group chat](/img/wechat_work/wechat_work_group_chat.png)

This works well for internal collaboration, knowledge Q&A, and in-group
assistance, but it still runs on the Smart Robot long connection — it is not
the legacy webhook group bot.

## Smart Robot vs. Group Chat Bot

| | Group Chat Bot | Smart Robot (Long Connection) |
| --- | --- | --- |
| Mechanism | Webhook callback URL | Persistent WebSocket long connection |
| Where | Internal group notifications and simple auto-replies | One-on-one chat; can also join internal group chats |
| Setup | Copy webhook URL into Bytedesk | Bind the BotID + Secret generated in the WeCom PC client |

For the group chat (webhook) bot, see [WeCom Group Chat Bot](./wechat_work_group_robot.md).

## FAQ

**Q: The connection shows CONNECTING but never becomes CONNECTED.**

- Make sure the BotID and Secret are copied exactly.
- Make sure the robot has API mode (long connection) enabled in WeCom.
- Make sure your server can reach `wss://openws.work.weixin.qq.com`.

**Q: Why can't I find the "create robot" entry in the WeCom admin console?**

That is expected. Smart Robots are not created in the WeCom admin console. Use
the WeCom PC client instead: **Contacts → Smart Robot**.

**Q: It connects once, then falls back to RECONNECTING or DISCONNECTED.**

- First, verify that the WeCom-side configuration is still valid.
- Then check server network stability, plus any proxy, firewall, or egress rule
  that may block WebSocket traffic.

**Q: Can I change the answering brain after binding?**

Yes. Edit the robot and choose a different AI robot or workgroup, then save.

**Q: How is this different from a WeCom group chat bot?**

The Smart Robot long-connection mode is mainly for direct one-on-one
conversations with the robot, and it can also join internal group chats. The
group chat bot is mainly for notifications, broadcasting, and simple automation
inside a WeCom group. The setup flow and use cases are different.

**Q: Can the Smart Robot be added to a WeCom group chat?**

Yes. Create and configure the Smart Robot in the WeCom client first, then add
it to an internal group chat and use it by @-mentioning the robot.

## References

- [WeCom Smart Robot — Long Connection](https://developer.work.weixin.qq.com/document/path/101463)
