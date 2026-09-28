---
sidebar_label: Object Storage
sidebar_position: 83
---

# Object Storage (MinIO)

Object storage lets Weiyu store uploaded chat content — **images, voice messages, videos, and files** — in a dedicated storage service ([MinIO](https://github.com/minio/minio)) instead of the application server's local disk. For users, nothing changes: send pictures and files as usual; only where they are ultimately stored differs.

## What It Does

- **Default (local storage)**: uploaded files are saved in a local directory on the application server — fine for small single-machine deployments
- **With object storage enabled**: uploads are written to MinIO, which suits these scenarios:
  - Growing chat files that you don't want filling the application server's disk
  - Multi-instance deployments (several app servers) that need to share the same files
  - Independent scaling, backup, and migration of file storage
- **Self-hosted and private**: MinIO runs on your own servers; files never pass through any third-party cloud
- **Works with other features**: online file preview (images, PDFs, Office documents) works equally well for files in MinIO — see [Online File Preview](./filepreview.md)
- On startup, Weiyu **creates the bucket automatically** (default `bytedesk`) and sets it to public read; no manual bucket setup is needed

## Prerequisites

| Requirement | Description |
| --- | --- |
| Docker | Docker installed on the server |
| MinIO service | Started via the launch script (see Step 1 below) |
| App switch | `bytedesk.minio.enabled=true` |

## How to Enable (Administrator)

Three steps: start the MinIO service → turn on the Weiyu switch → restart Weiyu.

### Step 1: Start the MinIO service

On your server, go to the `deploy/docker` directory and add the `minio` keyword to the start script:

```bash
cd deploy/docker

# Start together with the middleware stack
./start.sh middleware minio

# Or attach it when starting the full stack
./start.sh all minio
```

Once started, open `http://127.0.0.1:19001` in a browser — the MinIO Console login page means the service is ready. Sign in with `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` from `.env` (defaults `minioadmin` / `minioadmin123`).

### Step 2: Turn on the Weiyu-side switch

**Docker deployment**: edit `deploy/docker/.env` and add:

```bash
BYTEDESK_MINIO_ENABLED=true
# When the app and MinIO share the same docker network, the default address
# http://bytedesk-minio:9000 already works — no change needed.
# Access keys automatically follow MINIO_ROOT_USER / MINIO_ROOT_PASSWORD in .env;
# no separate configuration required.
```

**Running from source**: edit `starter/src/main/resources/properties/local/minio.properties`:

```properties
bytedesk.minio.enabled=true
# endpoint defaults to http://127.0.0.1:19000 (host port) — no change needed.
# access-key / secret-key must match MINIO_ROOT_USER / MINIO_ROOT_PASSWORD in .env;
# the defaults already match the default account, so just set enabled=true.
```

### Step 3: Restart Weiyu

Re-run the start command (or recreate the app container) for the change to take effect. A startup log line like "MinIO initialized, bucket: bytedesk, policy: public read" means it is enabled.

## Configuration Parameters

All parameters can be adjusted in `minio.properties` (or via the corresponding environment variables):

| Parameter | Description | Default |
| --- | --- | --- |
| `bytedesk.minio.enabled` | Feature switch; falls back to local disk when off | `false` |
| `bytedesk.minio.endpoint` | MinIO service address | Depends on deployment (see above) |
| `bytedesk.minio.access-key` | Access key (same as `MINIO_ROOT_USER`) | Deployment-specific |
| `bytedesk.minio.secret-key` | Secret key (same as `MINIO_ROOT_PASSWORD`) | Deployment-specific |
| `bytedesk.minio.bucket-name` | Bucket name, created automatically on startup | `bytedesk` |
| `bytedesk.minio.region` | Region identifier | `us-east-1` |
| `bytedesk.minio.secure` | Whether to access MinIO over HTTPS | `false` |

> For production, change `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` in `.env` instead of keeping the defaults. Under Docker deployment the Weiyu-side keys follow automatically — no extra steps needed.

## Verify It Works

1. **Check startup logs**: look for "MinIO client initialized" and "MinIO initialized, bucket: bytedesk, policy: public read"
2. **Send an image test**: send an image in a chat, then right-click and copy the image link — the URL should start with the MinIO port (e.g. `http://127.0.0.1:19000/bytedesk/images/...`) instead of the Weiyu `/file/...` path
3. **Open the MinIO Console**: sign in at `http://127.0.0.1:19001`, open the `bytedesk` bucket in Object Browser, and you will find the freshly uploaded file under type-based folders (`images`, `audios`, `videos`, etc.)
4. **Preview test**: click the preview button on a file message — images, PDFs, and Office documents all preview normally

## FAQ

### Uploads fail after enabling it?

Check in order: is the MinIO container running (`docker ps | grep minio`); is `endpoint` correct (Docker deployment uses the in-container address `http://bytedesk-minio:9000`; source runs use the host address `http://127.0.0.1:19000`); do the keys match `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` in `.env`.

### After turning it off, can files previously stored in MinIO still be accessed?

Turning off the switch only affects **new uploads** (they go back to local disk). Files already in MinIO keep pointing at MinIO, which must stay online for those links to work. Keep MinIO running for existing data, or ask your administrator to migrate it.

### Is the data secure?

MinIO runs on your own servers and file access never goes through third-party clouds. Note that the default bucket policy is **public read** (anyone with the file link can view it); if confidentiality matters, change the bucket to private in the MinIO Console and use signed temporary links instead.

### Is it available in the Community Edition?

Yes. Object storage is an open-source feature available in the Community, Enterprise, and Platform editions — no extra license required.

### Object storage or local storage — which should I choose?

For small single-machine deployments, the default local storage is fine. Consider enabling object storage when: multiple app instances need to share files, chat file volume requires independent scaling, or you need separate backup and disaster recovery for files.

## Related Links

- [MinIO deployment component notes](../deploy/depend/minio.md): MinIO notes in the deployment dependencies section
- [MinIO website](https://min.io): product overview and downloads
- [MinIO official docs](https://docs.min.io): operations and administration guides
- [MinIO GitHub repository](https://github.com/minio/minio): open-source project repository
