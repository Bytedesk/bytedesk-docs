---
sidebar_label: Feishu
sidebar_position: 14
---

# Feishu

Feishu channel integration documentation. For the complete illustrated guide (custom app integration, in-group Webhook bot), see the [Simplified Chinese Feishu guide](https://www.weiyuai.cn/zh-CN/docs/channel/feishu).

## Feishu Knowledge Base Import

Use case: sync documents from Feishu wiki spaces into the Bytedesk LLM knowledge base. Full-text and vector indexes are built automatically after sync, making the content immediately available for AI customer service Q&A.

The sync capability is built on a Feishu custom app. First create your app on the [Feishu Open Platform](https://open.feishu.cn/app) (obtain the App ID/App Secret and publish the app), then follow the steps below.

### 1. Enable Knowledge Base Permissions

Search and enable the following permissions in the app's **Permission Management**:

| Scope | Purpose |
| --- | --- |
| `wiki:wiki:readonly` | Read knowledge base space list and node tree |
| `drive:drive:readonly` | Read cloud document metadata |
| `drive:export:readonly` | Export document content (docx/xlsx) |
| `docx:document:readonly` | Read new-format document content |

![feishu_add_permissions](/img/feishu/feishu_add_permissions.png)

After enabling permissions, **publish a new app version** for them to take effect.

> **Optional: drill-down permissions for docx embedded content**
>
> To sync attachments and images embedded in docx documents, additionally enable the following permissions (if missing, sync falls back to exporting docx and will not fail — only embedded sheets/attachments cannot be fetched):
>
> - `docx:document:readonly` — read document blocks (already in the table above, listed here for reference)
> - `drive:drive:readonly` / `docs:document.media:download` — download attachments and images
> - `sheets:spreadsheet:readonly` — read embedded spreadsheets
> - `bitable:app:readonly` — read embedded bitables

### 2. Add the App as a Wiki Space Member (Important)

Permissions alone are not enough: the app must be added as a member of the target wiki space to read its content.

1. Open the target knowledge base in the Feishu client and click the **Knowledge Base Settings** button at the bottom:

   ![feishu_kbase_settings](/img/feishu/feishu_kbase_settings.png)

2. Go to **Member Settings**, click **Add Member**, and switch to the **Apps** tab:

   ![feishu_kbase_add_member_1](/img/feishu/feishu_kbase_add_member_1.png)

3. Search for and add your custom app, and grant it at least **Can Read** permission:

   ![feishu_kbase_add_member_2](/img/feishu/feishu_kbase_add_member_2.png)

If you skip this step, the space list will be empty during sync.

### 3. Bind the Feishu App in the Bytedesk Admin Console

1. Open the Bytedesk admin console → **Knowledge Base** → **LLM** → **Feishu Docs**.
2. Click **Bind Feishu App**: select an existing Feishu app, or create a new one directly (fill in App ID and App Secret; Base URL defaults to `https://open.feishu.cn`, or `https://open.larksuite.com` for Lark).
3. After binding, the bound app info is shown at the top of the page.

![feishu_kbase_bind](/img/feishu/feishu_kbase_bind.png)

### 4. Sync Documents

1. Click **Sync Docs** to open the sync dialog.
2. Choose the wiki spaces to sync: **multi-select is supported** (the dropdown is deduplicated automatically); selecting none syncs all accessible spaces (with a confirmation dialog, which may take longer for many documents).
3. Click **Start Sync**. When finished, a summary is shown: total, created, updated, failed, deleted, unsupported.

Notes:

- Only **new-format documents (docx)** are supported currently; legacy doc, sheets, bitable, mindnotes, etc. are counted as "unsupported" and skipped
- Sync is incremental and idempotent: unchanged documents are skipped automatically; repeated syncs produce no redundant data
- Documents deleted on the Feishu side are soft-deleted, and their full-text/vector indexes are cleaned up

![feishu_kbase_sync](/img/feishu/feishu_kbase_sync.png)

### 5. View Sync Records

The sync record table tracks per-document progress:

- **Sync status**: NEW / PROCESSING / SUCCESS / ERROR
- **Elastic status**: Elasticsearch indexing result
- **Vector status**: vector store indexing result (used for AI semantic search)
- Document titles link back to the original Feishu page

![feishu_kbase_list](/img/feishu/feishu_kbase_list.png)

### FAQ

- **Space list is empty**: the app has not been added as a wiki space member, or permissions were not enabled / a new version was not published.
- **Elastic status ERROR**: check whether Elasticsearch is running (start it via the compose files in `deploy/docker`).
- **Total is 0**: confirm the selected spaces contain new-format documents (docx).
- **Some documents counted as "unsupported"**: they are sheets/mindnotes/files etc., which are not supported in the current version; other documents are not affected.
