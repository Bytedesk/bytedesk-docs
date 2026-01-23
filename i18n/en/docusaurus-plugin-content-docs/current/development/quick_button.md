---
sidebar_label: Quick Button
sidebar_position: 14
---

# Quick Button

Quick Buttons let you pin frequently-used actions into the chat toolbar. Agents can click once to send a structured message or trigger an action, avoiding repetitive typing.

Common use cases:

- Repeatedly sending the same kind of content (e.g. forms, guides, links, products)
- Reducing mistakes by using a pre-configured button

Recommended workflow: create -> choose a type and configure -> bind to the toolbar -> test -> use in the agent app

## Create a Quick Button

Create a new Quick Button in the admin console and fill in the basic fields.

![quick_button_add](/img/quick_button/quick_button_add.png)

## Choose Button Type

The button type determines what will be sent or triggered when the agent clicks it. After selecting a type, configure the fields shown on the page.

![quick_button_type](/img/quick_button/quick_button_type.png)

## Bind to Toolbar

Bind the Quick Button to the chat toolbar, otherwise it won't appear in the agent app.

![quick_button_toolbar](/img/quick_button/quick_button_toolbar.png)

## Test

Test it in a conversation to make sure the behavior/content is correct.

![quick_button_test](/img/quick_button/quick_button_test.png)

## View in Agent App

After clicking the Quick Button, the corresponding message will show up in the conversation (rendering depends on the button type).

![quick_button_agent](/img/quick_button/quick_button_agent.png)

## FAQ

- Button not visible: usually not bound to the toolbar, or missing permissions.
- Click does nothing: re-check the type configuration and test in the correct channel/conversation.
