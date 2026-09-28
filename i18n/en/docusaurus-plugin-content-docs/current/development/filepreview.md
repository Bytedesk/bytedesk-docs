---
sidebar_label: File Preview
sidebar_position: 80
---

# Online File Preview

The online file preview feature lets you view files from chats and the knowledge base **directly inside the Weiyu interface, without downloading them**. When you receive a file message, just click to preview it — as easy as viewing a photo.

## Introduction

Before preview, receiving a Word or PDF file meant downloading it and opening it with local software. With preview enabled, simply click the file to see its content immediately, greatly improving communication efficiency. This feature is especially useful for:

- **Agent–visitor communication**: agents can open contracts, quotations, and other files sent by visitors instantly, without downloading
- **Knowledge base browsing**: product manuals and documents uploaded to the knowledge base can be read online
- **Team collaboration**: files shared between colleagues can be viewed with one click

### Supported File Types

| File Type | Common Formats | Preview Method |
| --- | --- | --- |
| Images | jpg, png, gif, webp, etc. | Displayed directly |
| PDF documents | pdf | Online page-by-page reading |
| Text files | txt, md, json, logs, etc. | Online text viewing |
| Audio | mp3, wav, etc. | Online playback |
| Video | mp4, webm, etc. | Online playback |
| Office documents | doc/docx, xls/xlsx, ppt/pptx | Online after the server enables conversion |
| Archives, CAD, etc. | zip, rar, dwg, etc. | Not supported yet; download prompt shown |

## How to Use

Preview works the same way across all three clients: find the file and click "Preview".

### 1. Admin Console (Knowledge Base Files)

1. Open the knowledge base file list in the admin console;
2. Click "Preview" in the action column of the file list;
3. View the file content in the dialog; you can also download or open it in a new window at any time.

### 2. Agent Desktop (File Messages)

1. Find a file message bubble in the conversation window;
2. Click the "Preview" button (eye icon) below the bubble;
3. View the file content in the dialog.

### 3. Visitor Client (File Messages)

File messages on the visitor side also support online preview:

1. Find a file message in the chat window;
2. Click the "Preview" button below the message bubble;
3. View the file content in the dialog.

## Office Document Preview Notes

Word, Excel, and PowerPoint documents must be **converted to PDF on the server** before they can be viewed online. Keep the following in mind:

1. **First open requires waiting**: the system converts the document to PDF automatically, showing "Converting file, please wait..." — usually a few to tens of seconds depending on file size;
2. **Each file is converted only once**: the result is cached after conversion, so reopening the same file is instant;
3. **When conversion is not enabled**: if the server has not enabled this capability, previewing an Office document shows "This format does not support online preview, please download". You can still download and open it locally; other features are unaffected.

### How to Enable Office Conversion (Administrator)

Office document preview is disabled by default. Two conversion modes are supported:

| Mode | Applicable deployment | How it works |
| --- | --- | --- |
| `local` (default) | Running the jar directly / self-built full image | JODConverter (integrated as a Java library) launches LibreOffice installed on the host |
| `remote` | Official (slim) Docker image | Conversion is delegated over HTTP to a **Gotenberg** sidecar container (official image `gotenberg/gotenberg:8`, LibreOffice + CJK fonts built in) |

> The preview button is only shown when the server reports preview as **enabled and available** (`preview.enabled` + `preview.available` from `/config/bytedesk/properties`). After installing LibreOffice or starting Gotenberg, refresh the page / re-login.

#### Option A: Direct jar deployment (mode=local, recommended for non-Docker)

The conversion capability (JODConverter) is already integrated as a Java library inside Weiyu — simply install LibreOffice on the deployment host to enable it. No extra service is required.

##### Step 1: Install LibreOffice

Choose the command for your server OS:

**macOS** (Homebrew):

```bash
brew install --cask libreoffice
```

**Ubuntu / Debian**:

```bash
sudo apt update
sudo apt install -y libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress
# Recommended for CJK documents to avoid missing glyphs:
sudo apt install -y fonts-noto-cjk
```

**CentOS / RHEL / Rocky Linux**:

```bash
sudo yum install -y libreoffice-writer libreoffice-calc libreoffice-impress
# CJK fonts:
sudo yum install -y google-noto-sans-cjk-ttc-fonts google-noto-serif-cjk-ttc-fonts
```

> Note: the LibreOffice installation path is auto-detected — no manual configuration needed. Only set `bytedesk.preview.convert.office-home` when it is installed in a non-standard location (e.g. `/Applications/LibreOffice.app/Contents` on macOS). WPS Office cannot replace LibreOffice. **The host-install approach only works when the jar runs directly on the host — a LibreOffice installed on the host is NOT visible inside a Docker container.**

##### Step 2: Enable the config and restart

1. Edit the configuration file and set `bytedesk.preview.convert.enabled=true` (keep `mode=local`, the default);
2. Restart the Weiyu service.

#### Option B: Docker deployment (mode=remote, Gotenberg sidecar — recommended)

First, the key point: **installing LibreOffice on the Docker host does NOT make it available to the containerized Weiyu app**. The official image is slim and does not bundle LibreOffice — enable preview by starting the Gotenberg conversion sidecar and pointing Weiyu at it:

```bash
cd deploy/docker
# 1. Start the conversion sidecar (official image, CJK fonts included since 8.30)
./start.sh gotenberg
# 2. Enable preview in .env
#    BYTEDESK_PREVIEW_CONVERT_ENABLED=true
#    BYTEDESK_PREVIEW_CONVERT_MODE=remote
#    (BYTEDESK_PREVIEW_CONVERT_REMOTE_URL defaults to http://bytedesk-gotenberg:3000)
# 3. Restart the app
./stop.sh && ./start.sh
```

Gotenberg runs on the internal compose network only (no host port exposed), the main image stays slim, and conversion can scale independently.

**Self-built full image** (single container, no sidecar): build with `--build-arg INSTALL_LIBREOFFICE=true` and keep `mode=local`:

```dockerfile
# Append an install layer on top of the official image (Debian-based; CJK fonts avoid garbled CJK documents)
FROM registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest
RUN apt update && apt install -y --no-install-recommends \
    libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*
```

```bash
docker build -t bytedesk-libreoffice:latest .
# Edit compose-bytedesk.yaml: image: bytedesk-libreoffice:latest
```

Once enabled, Office documents can be previewed online on all three clients. Leaving it disabled does not affect preview of other formats (images, PDF, audio/video, text).

**Verify it works**: upload a docx/xlsx/pptx file and click "Preview" — if PDF content appears within a few to tens of seconds, it is working; if it says "online preview not supported", check whether LibreOffice is installed (running `soffice --version` in a terminal should print a version) or whether the Gotenberg container is running (`docker ps | grep gotenberg`).

#### Optional Advanced Settings

The following settings are pre-provided with default values in the File preview config section of `compose-bytedesk.yaml`; override them in `.env` or edit the compose file directly as needed:

| Property | Description | Default | Environment Variable |
| --- | --- | --- | --- |
| `bytedesk.preview.convert.enabled` | Enable Office-to-PDF conversion | `false` | `BYTEDESK_PREVIEW_CONVERT_ENABLED` |
| `bytedesk.preview.convert.mode` | Conversion mode: `local` (in-process LibreOffice) / `remote` (Gotenberg sidecar) | `local` | `BYTEDESK_PREVIEW_CONVERT_MODE` |
| `bytedesk.preview.convert.remote-url` | remote mode: Gotenberg service address | `http://bytedesk-gotenberg:3000` | `BYTEDESK_PREVIEW_CONVERT_REMOTE_URL` |
| `bytedesk.preview.convert.remote-timeout` | remote mode: HTTP timeout per conversion (ms) | `180000` | `BYTEDESK_PREVIEW_CONVERT_REMOTE_TIMEOUT` |
| `bytedesk.preview.convert.office-home` | LibreOffice installation directory; empty = auto-detect (local mode only) | empty | `BYTEDESK_PREVIEW_CONVERT_OFFICE_HOME` |
| `bytedesk.preview.convert.ports` | LibreOffice process ports, comma-separated (local mode only) | `2001` | `BYTEDESK_PREVIEW_CONVERT_PORTS` |
| `bytedesk.preview.convert.task-execution-timeout` | Conversion task timeout (ms, local mode only) | `180000` | `BYTEDESK_PREVIEW_CONVERT_TASK_EXECUTION_TIMEOUT` |
| `bytedesk.preview.convert.process-timeout` | LibreOffice process timeout (ms, local mode only) | `300000` | `BYTEDESK_PREVIEW_CONVERT_PROCESS_TIMEOUT` |
| `bytedesk.preview.convert.max-tasks-per-process` | Max tasks per process before restart (local mode only) | `20` | `BYTEDESK_PREVIEW_CONVERT_MAX_TASKS_PER_PROCESS` |
| `bytedesk.preview.convert.max-file-size-mb` | Max source file size for conversion (MB) | `100` | `BYTEDESK_PREVIEW_CONVERT_MAX_FILE_SIZE_MB` |
| `bytedesk.preview.convert.remote-source-enabled` | Allow downloading source files from object storage for conversion | `true` | `BYTEDESK_PREVIEW_CONVERT_REMOTE_SOURCE_ENABLED` |
| `bytedesk.preview.convert.allowed-remote-hosts` | Allow list of remote source hosts; MinIO endpoint only by default | empty | `BYTEDESK_PREVIEW_CONVERT_ALLOWED_REMOTE_HOSTS` |

> Tip: when MinIO object storage is enabled, Office conversion still works — see the FAQ entry [Can files stored in MinIO object storage be previewed?](#can-files-stored-in-minio-object-storage-be-previewed).

## FAQ

### Why does an Office document say "online preview not supported"?

The server has not enabled Office conversion, or the file exceeds the conversion size limit (100MB by default). Ask your administrator to enable conversion, or download the file to view it.

### Why is the first open of an Office document slow?

The system is converting the document to PDF. The result is cached, so subsequent opens of the same file are fast.

### Does preview modify the original file?

No. Preview is read-only; the PDF generated during Office conversion is a separate artifact. The original file remains unchanged, and downloading still retrieves the original file.

### Can archives or CAD drawings be previewed?

These formats are not yet supported in the current version; clicking preview shows a download prompt. Support will be extended in future releases.

### Do visitors need to log in to use preview?

No. File preview on the visitor client works without logging in.

### Can files stored in MinIO object storage be previewed?

Yes. When MinIO storage is enabled, images, PDFs, audio/video, and text files load directly from object storage. Office documents are also supported: the server downloads the source file from object storage to a temporary directory (only the configured MinIO address is allowed; other hosts are rejected by default), converts it to PDF, and cleans up the temporary file automatically. Conversion results are cached, so each file is converted only once, and the original file in object storage is never modified.

Administrators can adjust two settings:

- `bytedesk.preview.convert.remote-source-enabled`: whether downloading source files from object storage for conversion is allowed, default `true`;
- `bytedesk.preview.convert.allowed-remote-hosts`: an optional allow list of extra direct-link domains (e.g. self-hosted OSS/COS); by default only the MinIO address is allowed.
