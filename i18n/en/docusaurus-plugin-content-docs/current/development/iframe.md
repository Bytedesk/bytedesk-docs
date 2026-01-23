---
sidebar_label: Third-party Integration
sidebar_position: 42
---

# Third-party System Integration (Iframe)

This page explains how to embed your business system pages into the Weiyu agent console via an Iframe, so agents can view CRM, orders, tickets, etc. without leaving the workspace.

## When to use

- Open CRM / order / membership pages in the agent side panel
- Auto-locate the current visitor in your system via `visitorUid`
- Reduce context switching for agents

## What you get

After configuration:

1. Add an Iframe integration item in the admin console
2. The agent console shows it in the conversation side panel
3. Weiyu automatically appends `visitorUid` to the configured URL

## Setup (Admin Console)

1. Go to the admin entry for “Third-party integration / Iframe”
2. Click “Add”
3. Fill in: name, embed URL, etc. (follow the admin UI prompts)
4. Save and refresh the agent console

![iframe_admin_add](/img/iframe/iframe_admin_add.png)

## Example: add a demo page

Demo URL: `https://www.baidu.com/`

![iframe_admin_add_baidu](/img/iframe/iframe_admin_add_baidu.png)

## Agent-side view

The agent console loads the configured page in the conversation side panel:

![iframe_agent_rightpanel](/img/iframe/iframe_agent_rightpanel.png)

## URL parameter append rules (important)

Weiyu automatically appends `visitorUid` to the embed URL so your page can identify the current visitor/user.

- If the original URL has no query string, Weiyu uses `?visitorUid=...`
	- Example: `https://example.com/page` → `https://example.com/page?visitorUid=1832567980425344`
- If the original URL already has query parameters, Weiyu uses `&visitorUid=...`
	- Example: `https://example.com/page?from=weiyu` → `https://example.com/page?from=weiyu&visitorUid=1832567980425344`

> To learn how `visitorUid` is provided from the web widget / H5 link, see: [User Information Integration](./userinfo.md)

## Best practices

- Embed your own business pages and load user data on the server side using `visitorUid`
- Do not put sensitive information (phone numbers, tokens, IDs) in the URL
- Prefer HTTPS

## FAQ

### 1) The page is blank or won’t load

Many websites block being embedded in an Iframe due to security policies. In DevTools console you may see:

- `Refused to display ... in a frame because it set 'X-Frame-Options' to 'deny'`
- `Content-Security-Policy: frame-ancestors ...`

What to do:

- Prefer embedding pages under your own domain
- Configure your page headers to allow embedding (per your security policy, adjust `CSP frame-ancestors` or `X-Frame-Options`)

### 2) How to pass more business parameters?

By default Weiyu only appends `visitorUid`. If you need more data, query it on your backend using `visitorUid`, or add your own fixed parameters in the URL (e.g. `from=weiyu`) and Weiyu will append `visitorUid` afterwards.
