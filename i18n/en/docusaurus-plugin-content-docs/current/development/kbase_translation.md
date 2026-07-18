---
sidebar_label: Kbase Translation
sidebar_position: 29
---

# Knowledge Base Multilingual Translation

Bytedesk Knowledge Base supports one-click translation of FAQs, text, chunks, webpages, and other knowledge content into multiple languages. This enables multilingual knowledge retrieval and intelligent Q&A, helping global businesses quickly build an international knowledge service system.

:::tip Note
Community Edition does not support this feature. Please upgrade to Enterprise or Platform Edition.
:::

:::info Related Documents

- [Knowledge Base Architecture](./kbase.md): Core knowledge base architecture
- [FAQ Management](./kbase_faq.md): FAQ management
- [Text Knowledge](./kbase_text.md): Text knowledge management
- [Webpage Knowledge](./kbase_webpage.md): Webpage knowledge scraping

:::

## Feature Overview

The knowledge base translation feature uses large language models (LLMs) to automatically translate knowledge base content into target languages. Translation results are automatically indexed in both full-text search (Elasticsearch) and vector search, enabling multilingual users to search the knowledge base and get accurate answers in their native language.

### Key Features

- **One-Click Translation**: Click the translate button on FAQ, text, chunk, and webpage management pages to trigger LLM translation
- **Multilingual Support**: Supports Chinese, English, Japanese, Korean, French, German, Spanish, and more than ten languages
- **Automatic Indexing**: Automatically updates full-text and vector indexes upon successful translation — no manual operation needed
- **Translation Management**: Centrally view and manage all translation records with editing and retranslation support
- **Multilingual Q&A**: The system builds full-text and vector indexes for translated knowledge content by target language. When language preferences are provided, it can prioritize content in the corresponding language and return answers in that language

## Usage Flow

### 1. Configure Target Languages

In knowledge base settings, configure the list of target languages for translation:

The system supports configuring multiple target languages simultaneously. Translation tasks generate independent translation records for each language.

### 2. Trigger Translation

On knowledge content management pages (FAQ, Text, Chunk, Webpage), each record has a translate button in the action column. Clicking the translate button triggers the configured translation LLM to automatically generate translations in the target language.

### 3. View Translation Results

After translation completes, view all translation records on the Translation Management page.

Translation records include:
- **Source/Target Language**: The language pair
- **Translation Status**: NEW, PROCESSING, SUCCESS, ERROR
- **Translated Content**: Title, body, summary, etc.
- **Translation Provider**: The translation model used

### 4. Verify with Search Test

On the Search Test page, search in the target language to verify that translation content is correctly indexed and retrievable.

## Translation Content Retrieval

Successfully translated content is automatically incorporated into the search system:

### Full-Text Search (Elasticsearch)

Each successful translation is stored as a separate ES document with a `translated=true` flag and target language field. Searches match both original and all translated documents simultaneously.

### Vector Search

Translation content is also vectorized and stored. Semantic searches automatically match content vectors in the corresponding language.

### Robot Q&A

The system builds full-text and vector indexes for translated knowledge content by target language. When language preferences are provided, it can prioritize content in the corresponding language and return answers in that language.

## Translation Management

### Translation List

The Translation Management page (`Admin → AI Assistant → Knowledge Base → Translation Management`) provides:

- Filter by knowledge base, source type, status, language, etc.
- Edit translation content
- Delete translation records
- Retranslate

### Editing Translation Content

Click the edit button to manually modify translation content. Changes automatically update the index.

### Translation Status Tracking

Status descriptions:
- **NEW**: Pending translation — placeholder created but content is empty
- **PROCESSING**: LLM is currently processing the translation
- **SUCCESS**: Translation succeeded, automatically indexed
- **ERROR**: Translation failed — view error details and retry

## Technical Implementation

### Translation Flow

```
User clicks translate → Create translation record (NEW) → Call LLM → Update status (SUCCESS/ERROR)
                                                                    ↓
                                                          Auto-update ES index
                                                          Auto-update vector index
```

### Automatic Indexing

When translation status becomes SUCCESS, the system automatically triggers:
1. Elasticsearch full-text index update for the source entity (FAQ/Text/Chunk/Webpage)
2. Vector index update for the source entity

Translation content is stored as independent index documents alongside the original, matched uniformly during search.

### Supported Languages

| Language Code | Language Name |
|--------------|---------------|
| ZH_CN | Simplified Chinese |
| ZH_TW | Traditional Chinese |
| EN | English |
| JA | Japanese |
| KO | Korean |
| FR | French |
| DE | German |
| ES | Spanish |
| PT | Portuguese |
| RU | Russian |
| AR | Arabic |
| TH | Thai |
| VI | Vietnamese |
| ID | Indonesian |

## FAQ

### What content types are supported for translation?

FAQ, TEXT, Chunk, and WEBPAGE are all supported.

### Which model is used for translation?

By default, the Alibaba Bailian Qwen-MT translation model is used. You can customize the translation agent's model and prompt in Robot settings.

### Does translation affect the original content?

No. Translation content is stored independently — the original content remains unchanged.

### How do I verify that translations are properly indexed?

On the Knowledge Base Search Test page, search in the target language. If translated content is recalled with a score > 0, indexing is working correctly.
