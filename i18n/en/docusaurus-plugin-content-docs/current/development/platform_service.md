---
sidebar_label: Platform Service
sidebar_position: 84
---

# Platform Service (平台客服)

**Platform Service** provides a dispute-resolution channel **between users and merchants** for multi-tenant / platform deployments: when a visitor (user) runs into a dispute with a merchant's support team, the visitor can contact the platform's own support agents directly from the chat window; platform agents can also look up cross-organization data in the workbench, with clear boundaries.

The feature is **disabled by default**. Only the **super admin** can enable and configure it; tenant admins cannot change it.

## What this feature is

Platform Service consists of two complementary capabilities:

1. **"Platform Service" button on the visitor side**: while chatting with a merchant's agents, a visitor who runs into a dispute can click the "Platform Service" button in the toolbar to open a conversation with the platform's official support right inside the current window — no redirect, no extra tab.
2. **"Platform Query" in the agent workbench**: agents belonging to the platform organization can select "Platform Query" in the desktop workbench category list, first pick a target organization (merchant), and then read-only browse that organization's threads, chat history, and orders to understand the full context of a dispute.
3. **Platform service thread identification on the agent side**: in the platform agent's thread list, platform service threads carry a prominent purple "Platform" tag; selecting such a thread reveals a dedicated "Platform Service" tab in the right panel, which brings together the related origin merchant thread and the initiating visitor.

## When to use the "Platform Service" button

- The visitor feels the merchant's resolution is unreasonable and wants the platform to arbitrate;
- There is an after-sales dispute or a broken promise that needs higher-level coordination;
- The visitor hits a technical or service problem the merchant's agents cannot solve and needs platform support.

Visitor-side steps:

1. In the merchant chat window, the visitor clicks the "Platform Service" button in the toolbar;
2. A platform-service chat drawer opens on the right side of the window;
3. The visitor describes the dispute and sends the message;
4. In the desktop workbench, the platform agent can spot the thread at a glance by its purple "Platform" tag in the thread list; selecting it opens the "Platform Service" tab on the right, where clicking "View Chat History" shows the complete, read-only original conversation between the visitor and the merchant's agents — the evidence for arbitration.

## How to enable it (super admin)

1. Log in to the admin console with a super admin account;
2. Open the **Platform Service** group in system settings (`/super/system-config`);
3. Turn on "Enable platform service entry";
4. Optionally adjust the platform organization and workgroup (defaults to the system default organization and default workgroup — usually no change is needed);
5. After saving, refresh any tenant's visitor chat page: the "Platform Service" button appears in the toolbar; turning the switch off removes it.

Note: tenant admins have no configuration entry for this feature anywhere in their console.

### Enable platform service settings in the admin console

![Enable platform service settings in the admin console](/img/platform/platform_service_settings.png)

### The platform service button shown on the visitor chat page

![The platform service button shown on the visitor chat page](/img/platform/platform_service_toolbar.png)

## How the agent workbench identifies platform service threads

To help platform agents quickly locate dispute-intervention threads, the desktop workbench provides the following entry points:

1. **"Platform" tag in the thread list**: any thread created by a visitor requesting platform intervention from a merchant conversation shows a purple "Platform" tag in the left thread list, clearly distinguishing it from ordinary threads;
2. **The "Platform Service" tab in the right panel**: after selecting a platform service thread, a dedicated "Platform Service" tab appears in the right panel, showing:
   - **Related origin thread**: the origin thread ID, origin organization ID, origin thread type / status / last-updated time, and the visitor nickname on the origin thread; click "View Chat History" to read the original conversation between the visitor and the merchant's agents (read-only);
   - **Initiating visitor**: the avatar, nickname, and ID of the visitor on the current platform thread; click "View Full Visitor Profile" to jump to the visitor info tab;
3. **Origin thread section in thread details**: the "Thread Details" tab also keeps the origin thread information — both entry points show the same data.

Note: the "Platform Service" tab is visible only to agents of the platform organization; viewing the original thread's chat history is read-only — it never switches your currently active thread and never sends any receipts to the other side.

### The agent workbench showing platform service threads and related thread info

![The agent workbench showing platform service threads and related thread info](/img/platform/platform_service_desktop.png)

## How to select an organization first and run a platform query in the agent workbench

Agents of the platform organization (accounts belonging to the platform default organization) can use "Platform Query":

1. Find "Platform Query" in the left category list of the desktop workbench (if hidden, enable it via the "Display options" settings above the list);
2. The page shows a clear notice at the top: you are viewing the selected organization's data as a platform agent, only for dispute handling and technical support; data is read-only and queries are audit-logged;
3. **Step 1: search and select the organization to query** in the selector at the top — until an organization is selected, the query area stays disabled;
4. **Step 2: query the data** — once an organization is selected you can:
   - browse its thread list in the "Threads" tab; click any thread to open its read-only chat history drawer;
   - browse its order list in the "Orders" tab (enterprise/platform editions only; community edition has no such tab);
5. Switching organizations or refreshing the page returns to the "no organization selected" state — you must select an organization again to continue.
### Platform query in the agent workbench

![Platform query in the agent workbench](/img/platform/platform_service_query.png)
## What platform query can and cannot do

**Can (read-only):**

- the selected organization's thread list (visitor, type, status, time);
- the complete chat history of any of its threads (with image/file category browsing);
- the selected organization's order list (enterprise/platform editions).

**Cannot:**

- reply to, take over, transfer, modify, or delete anything across organizations;
- viewing history never switches your currently active thread and never sends read receipts to the other side;
- regular tenant agents have no "Platform Query" entry, and direct API calls with another organization's identifier are rejected by the server.

## FAQ

**Why must I select an organization first?**
Platform queries exist for concrete dispute handling. Forcing an explicit organization selection avoids accidental lookups of unrelated data and keeps every query's scope clear and auditable.

**Why is the "Orders" tab missing in some deployments?**
Order data is an enterprise feature. Community editions have no order module, so the tab is hidden automatically and only thread queries remain.

**Why don't I see "Platform Query" in my category list?**
Only agents of the platform (system default) organization can see it; tenant agents cannot. If you are sure your account belongs to the platform organization and still don't see it, enable it via the "Display options" settings above the category list.

**What does the purple "Platform" tag in the thread list mean?**
It marks a dispute thread created when a visitor requested platform intervention from a merchant conversation. Only agents of the platform organization can see the accompanying "Platform Service" tab; ordinary merchant threads never carry this tag.

**The visitor-side button is enabled but doesn't show up?**
Check that: the visitor's chat session is initialized (clicking requires an existing thread); the page has been refreshed after saving the switch; the organization and workgroup UIDs in the configuration are correct. The default configuration (default organization + default workgroup) works out of the box on standard deployments.
