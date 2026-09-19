---
sidebar_label: ASR Hotword
sidebar_position: 27
---

# ASR Custom Hotwords

Bytedesk supports ASR custom hotword (Vocabulary) capabilities, allowing administrators to create hotword lists and synchronize them with the Alibaba Cloud Model Studio platform to improve the recognition accuracy of specific terms during ASR speech recognition. Hotword lists can be managed in the admin console with real-time sync status tracking and one-click refresh from Alibaba Cloud.

## What ASR Hotwords Solve

- **Improved Proper Noun Recognition**: Add product names, brand names, and technical terms as hotwords to significantly boost ASR accuracy for these words
- **Industry Terminology Optimization**: Add high-frequency industry-specific terms for medical, legal, financial, and other sectors to make speech recognition more relevant to business scenarios
- **Multi-Language Support**: Configure hotword weights for different languages (Chinese/English/Japanese/Cantonese/Korean/German/French/Russian) to meet internationalization needs
- **Centralized Management**: All hotword lists are managed in one place, supporting CRUD operations and sync status tracking

## Core Concepts

| Concept | Description |
| ------- | ----------- |
| **Vocabulary** | A collection of hotword entries that, once created and synced to Alibaba Cloud, can be referenced during ASR recognition to improve specific word accuracy |
| **Hotword Entry** | Each hotword consists of `text` (the hotword text), `weight` (1–5, default 4), and `lang` (optional language code) |
| **prefix** | A custom prefix for the vocabulary list, allowing only digits and lowercase letters, max 10 characters. Used for identification and filtering |
| **targetModel** | The target ASR model (e.g., `fun-asr`, `paraformer-v2`). The vocabulary must match the model used in subsequent ASR calls |
| **vocabularyId** | The unique identifier returned by Alibaba Cloud for the vocabulary (e.g., `vocab-testpfx-xxxx`) |

### Hotword Entry Constraints

| Field | Constraint |
| ----- | ---------- |
| `text` | Required; max 15 characters for non-ASCII text; max 7 space-separated tokens for pure ASCII |
| `weight` | Required, range 1–5, default 4 |
| `lang` | Optional, supports `zh` / `en` / `ja` / `yue` / `ko` / `de` / `fr` / `ru` |

## Supported Target Models

| Model ID | Description |
| -------- | ----------- |
| `fun-asr` | Fun-ASR speech recognition model |
| `paraformer-v2` | Paraformer V2 speech recognition model |

> The initial model set aligns with what Alibaba Cloud Model Studio currently supports and may be expanded as the platform evolves.

## Admin Console Features

### 1. Hotword List

Navigate to AI Agent Management → Agent page and switch to the "Hotword" tab to view all hotword lists for the current organization. The list is displayed as a ProTable with the following columns:

- **Name**: User-defined hotword list name
- **Target Model**: Selected target ASR recognition model
- **Prefix**: Vocabulary prefix identifier
- **Vocabulary ID**: The vocabularyId returned by Alibaba Cloud (copyable)
- **Status**: PENDING / OK / UNDEPLOYED / FAILED / DELETED

Supported operations:

- Filter by name, target model, prefix, and status
- Create new hotword list
- Edit hotword content
- Sync status (pull latest status from Alibaba Cloud)
- Delete (also deletes the remote Alibaba Cloud vocabulary)

### 2. Create/Edit Hotword Drawer

Click "New Hotword List" or the "Edit" row action to open a side drawer:

| Field | Description | Required |
| ----- | ----------- | -------- |
| Name | Custom name, e.g. "Product Glossary" | ✅ |
| Target Model | Select `fun-asr` or `paraformer-v2` from dropdown | ✅ |
| Prefix | Digits + lowercase letters, ≤ 10 chars, e.g. `prod`, `sku` | ✅ |
| Description | Optional notes | ❌ |
| Type | Applicable scenario (THREAD/VISITOR/CUSTOMER/TICKET) | ❌ |

#### Hotword Editor

Edit hotword entries within the Drawer:

- Each row contains: hotword text + weight (1–5) + language (optional dropdown)
- Add/remove rows as needed
- Bulk paste import supported (one hotword per line, default weight=4, lang empty)
- Stored as a JSON array submitted to the `vocabulary` field

> **Note**: Once a vocabulary is created and a `vocabularyId` is obtained, the `prefix` and `targetModel` cannot be modified during subsequent edits to prevent mismatches with the remote resource. Only hotword content, name, and description can be updated for synced vocabularies.

### 3. Sync Status

Click the "Sync Status" button in the row actions:

- Pulls the latest status from Alibaba Cloud and updates local fields including `status`, `errorMessage`, and `rawResponse`
- Displays human-readable error messages in the list when sync fails

### 4. Remote Queries (Optional Enhancement)

- **Remote List**: Query Alibaba Cloud remote vocabulary list (read-only, not stored locally)
- **Remote Detail**: Query full vocabulary content by `vocabularyId` from Alibaba Cloud

## Permissions

The ASR Hotword feature uses the `ASR_HOTWORD` permission module with the following sub-permissions:

| Permission | Description | Applicable APIs |
| ---------- | ----------- | --------------- |
| `ASR_HOTWORD_READ` | View | List query, remote query |
| `ASR_HOTWORD_CREATE` | Create | Create hotword list |
| `ASR_HOTWORD_UPDATE` | Update | Edit hotword, sync status |
| `ASR_HOTWORD_DELETE` | Delete | Delete hotword list |
| `ASR_HOTWORD_EXPORT` | Export | Excel export |

The "Hotword" tab only appears in the AI Agent page when the user has the appropriate permissions and is using the Enterprise or Platform edition.

## API Endpoints

| Method | Path | Permission | Description |
| ------ | ---- | ---------- | ----------- |
| GET | `/api/v1/asr_hotword/query/org` | READ | Query hotword lists by organization |
| GET | `/api/v1/asr_hotword/query/user` | READ | Query hotword lists by user |
| GET | `/api/v1/asr_hotword/query/uid` | READ | Query single record by UID |
| POST | `/api/v1/asr_hotword/create` | CREATE | Create hotword list (with remote sync) |
| POST | `/api/v1/asr_hotword/update` | UPDATE | Update hotword list (with remote sync) |
| POST | `/api/v1/asr_hotword/delete` | DELETE | Delete hotword list (with remote deletion) |
| GET | `/api/v1/asr_hotword/export` | EXPORT | Excel export |
| POST | `/api/v1/asr_hotword/sync` | UPDATE | Sync hotword status from Alibaba Cloud |
| POST | `/api/v1/asr_hotword/remote/list` | READ | Query remote vocabulary list |
| POST | `/api/v1/asr_hotword/remote/detail` | READ | Query remote vocabulary detail |

## Sync Strategy

ASR hotword management follows a "local edit + real-time remote sync" strategy:

| Operation | Sync Timing | Behavior |
| --------- | ----------- | -------- |
| Create | Synchronous on save | Call Alibaba Cloud create → obtain `vocabularyId` → persist locally (status=OK) |
| Update | Synchronous on save | Call Alibaba Cloud full update → update local record |
| Delete | Synchronous on delete | Call Alibaba Cloud delete → soft-delete local record |
| Sync | Manual trigger | Pull latest status from Alibaba Cloud by `vocabularyId` or `prefix` |

**Failure Handling**:

- When a remote call fails, the local record's `status` is set to `FAILED`, with `errorMessage` and `rawResponse` preserved
- When remote deletion returns a "resource not found" result, it is treated as a successful deletion and the local record is soft-deleted normally

## Configuration

ASR Hotword relies on the Alibaba Cloud Model Studio (DashScope) platform. Configure the following in `application.properties`:

```properties
# DashScope API Key (reuses existing ASR configuration)
spring.ai.dashscope.audio.transcription.api-key=${spring.ai.dashscope.api-key:${DASHSCOPE_API_KEY:}}

# Alibaba Cloud Model Studio WorkspaceId
bytedesk.ai.dashscope.workspace-id=ws-xxxxxxxxxxxx

# Optional: region (default cn-beijing)
bytedesk.ai.dashscope.region=cn-beijing

# Optional: custom hotword endpoint (highest priority)
# bytedesk.ai.dashscope.asr-hotword.endpoint=https://custom.endpoint.com
```

> **Note**: The Singapore region's sub-workspaces do not currently support the hotword feature. Using the Singapore region will return a clear error message.

## Technical Implementation

The ASR Hotword module resides in the `enterprise/ai` module. Key classes:

| Class | Responsibility |
| ----- | -------------- |
| `AsrHotwordEntity` | JPA entity for local hotword records and remote sync status |
| `AsrHotwordRestController` | CRUD APIs (query / create / update / delete / export) |
| `AsrHotwordController` | Execution APIs (sync / remote list / remote detail) |
| `AsrHotwordRestService` | Core business logic, local CRUD + sync orchestration |
| `AsrHotwordSyncService` | Remote sync orchestration layer, wrapping Alibaba Cloud API calls |
| `AliyunAsrHotwordClient` | Alibaba Cloud DashScope ASR hotword HTTP API client |
| `AliyunAsrHotwordApiResponse` | Normalized API response DTO |
| `AsrHotwordStatusEnum` | PENDING / OK / UNDEPLOYED / FAILED / DELETED enum |
| `AsrHotwordTypeEnum` | THREAD / VISITOR / CUSTOMER / TICKET enum (applicable scenarios) |
| `AsrHotwordSpecification` | Query filter construction |
| `AsrHotwordPermissions` | Permission constants |

### Endpoint Resolution Priority

The Alibaba Cloud hotword API endpoint is resolved in the following priority order:

1. Custom endpoint: `bytedesk.ai.dashscope.asr-hotword.endpoint`
2. Workspace endpoint: `{WorkspaceId}.{region}.maas.aliyuncs.com`
3. Public endpoint fallback: Beijing `dashscope.aliyuncs.com`, Singapore `dashscope-intl.aliyuncs.com`

## References

- [Alibaba Cloud ASR Hotword Java SDK Reference](https://help.aliyun.com/zh/model-studio/vocabulary-java-sdk)
- [Alibaba Cloud ASR Hotword HTTP API Reference](https://help.aliyun.com/zh/model-studio/vocabulary-http-api)
