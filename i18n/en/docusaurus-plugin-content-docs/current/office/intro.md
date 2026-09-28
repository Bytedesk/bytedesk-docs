---
title: Weiyu Docs Intro
sidebar_label: Weiyu Docs Intro
sidebar_position: 1
description: Introduction to the Weiyu Docs module — create, edit, and save docx/pptx/pdf/excel documents with a built-in AI assistant
---

<!-- markdownlint-disable MD025 -->

# Weiyu Docs

Weiyu Docs is the office suite module of the Weiyu collaboration platform. It brings **word documents, spreadsheets, presentations, PDF, and Markdown** files into one workspace: create, edit, and save them as you normally would, with an AI assistant always on standby — draft a document from scratch, polish the wording, or tidy up the formatting, all with a single sentence.

In short: **edit documents the way you do in Microsoft Office, and use AI like a personal secretary.**

:::tip Module note
Weiyu Docs is under continuous development; some capabilities ship in stages.
:::

## 📄 Supported document types

| Type | Format | What you can do |
| ---- | ------ | --------------- |
| Word documents | .docx | Write notices, proposals, reports, and weekly updates; styles, table of contents, charts, equations, tracked changes, and comments |
| Spreadsheets | .xlsx | Record and compute data with formulas, charts, pivot tables, and conditional formatting |
| Presentations | .pptx | Build decks for meetings and training; masters, layouts, and smart guides |
| PDF | .pdf | Retype text and edit images in place, annotate, fill forms, rearrange pages, and convert PDF to Word/Excel/PowerPoint |
| Markdown | .md | Lightweight notes and documents such as README files |

## 🤖 What the AI assistant can do

Open the AI panel on the right side of any document and give instructions in plain language.

### Generate content

- **Draft from scratch** — say "write a weekly project report", "draft a product announcement", or "outline an event plan", and the AI produces a first draft for you.
- **Continue writing** — pick up where the current content ends.
- **Fill templates** — the AI finds the placeholders in a document and fills them in.

### Refine and beautify documents

- **Polish the whole document** — make the tone more professional and the wording clearer and smoother.
- **AI formatting** — fix heading levels, unify list styles, remove stray bold/italic, and restore first-line indents. Formatting only — the words themselves are never changed.
- **Edit a selection** — select some text, then polish, shorten, expand, or fix grammar and typos in one click.
- **Batch edits** — queue multiple change requests and send them together; the AI applies them in one pass.

### More capabilities

- **Summarize** — get the key points of a long document in one click.
- **Generate illustrations / web search / image search** — add images to a document, look up facts, and insert web images.
- **Track changes** — AI edits are marked as revisions; accept or reject them one by one in the review tab.
- **Version snapshots** — a snapshot is saved automatically before every AI turn; roll back anytime with one click.

## 💼 Microsoft Office compatibility

Weiyu Docs works directly with the real Microsoft Office formats (.docx/.xlsx/.pptx), with no intermediate conversion:

- Files edited in Weiyu Docs open cleanly in Word/Excel/PowerPoint — layouts do not break.
- Word documents are saved with minimal rewriting: only the paragraphs you changed are regenerated; everything else is kept exactly as it was.
- Pagination matches Word, so what you see is what you get.

## ❓ FAQ

**Does the AI need extra setup?**

Yes — configure a model provider in the AI settings. Mainstream providers (OpenAI, Claude, Gemini, DeepSeek, Kimi, GLM, Qwen, and more) are supported, as well as custom OpenAI-compatible endpoints.

**Are my documents uploaded to the cloud?**

Documents are either kept on your own machine — editing and saving happen locally — or synced to your privately deployed Weiyu server for team collaboration and sharing. Content is only sent to the model provider you configured, and only when you use AI features.

**Does PDF conversion handle scanned files?**

Yes. On macOS and Windows, system OCR reads scanned pages and converts them into editable Word/Excel/PowerPoint files.

**Which platforms are supported?**

Desktop apps for macOS, Windows, and Linux, with light/dark themes.

## 📌 Tips

- A version snapshot is taken before every AI edit — feel free to experiment.
- Turn on track changes to keep every AI edit reviewable — ideal when document quality matters.
- Select text before giving a rewrite instruction; by default it only applies to the selection.
