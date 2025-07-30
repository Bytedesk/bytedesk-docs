---
sidebar_label: File Upload
sidebar_position: 32
---

# File Upload

The Weiyu system supports two file storage methods: **Local File System** and **MinIO Object Storage**. The system uses local file system storage by default, and only uses MinIO object storage when `bytedesk.minio.enabled=true`. You can choose the appropriate storage method based on your actual needs.

## Configuration Description

### 1. Local File System Storage

Local file system storage saves files in the server's local directory, suitable for small-scale deployments and testing environments.

```properties
# ===============================
#= Upload config
# ===============================
# Storage type: local indicates local file system
bytedesk.upload.type=local
# Upload directory, note not to end with '/'
# Example: bytedesk.upload.dir=/var/www/html/weiyuai/file
bytedesk.upload.dir=uploads
# Access URL for uploaded files, please replace 127.0.0.1 with the server's actual IP address or domain name
bytedesk.upload.url=http://127.0.0.1:9003
```

**Configuration Description:**

- `bytedesk.upload.type=local`: Set to local file system storage
- `bytedesk.upload.dir`: Specify the local directory path for file storage
- `bytedesk.upload.url`: URL address for file access, need to replace 127.0.0.1 with your server's actual IP address or domain name

### 2. MinIO Object Storage

MinIO is a high-performance object storage service, suitable for large-scale deployments and production environments.

:::tip Detailed Configuration
For detailed MinIO installation, configuration, and management instructions, please refer to the [MinIO Object Storage](../deploy/depend/minio.md) documentation.
:::

```properties
# ===============================
# = MinIO Object Storage Configuration
# ===============================
# Whether to enable MinIO storage
bytedesk.minio.enabled=false
# MinIO service address, please replace 127.0.0.1 with the server's actual IP address or domain name
bytedesk.minio.endpoint=http://127.0.0.1:19000
# MinIO access key
bytedesk.minio.access-key=minioadmin
# MinIO secret key
bytedesk.minio.secret-key=minioadmin123
# MinIO bucket name
bytedesk.minio.bucket-name=bytedesk
# MinIO region
bytedesk.minio.region=us-east-1
# Whether to use HTTPS
bytedesk.minio.secure=false
```

**Configuration Description:**

- `bytedesk.minio.enabled`: Whether to enable MinIO storage, default is false. Only when set to true will MinIO storage be used, otherwise local file system storage will be used
- `bytedesk.minio.endpoint`: MinIO service access address, need to replace 127.0.0.1 with your server's actual IP address or domain name
- `bytedesk.minio.access-key`: MinIO access key ID
- `bytedesk.minio.secret-key`: MinIO access secret key
- `bytedesk.minio.bucket-name`: MinIO bucket name
- `bytedesk.minio.region`: MinIO service region
- `bytedesk.minio.secure`: Whether to use HTTPS protocol

## Docker Compose Configuration

If you use Docker deployment, you can configure the file upload service in the `docker-compose.yaml` file:

```yaml
# MinIO configuration (when using MinIO)
BYTEDESK_MINIO_ENABLED=false
# MinIO service access address, please replace 127.0.0.1 with the server's actual IP address or domain name
BYTEDESK_MINIO_ENDPOINT=http://127.0.0.1:19000
BYTEDESK_MINIO_ACCESS_KEY=minioadmin
BYTEDESK_MINIO_SECRET_KEY=minioadmin123
BYTEDESK_MINIO_BUCKET_NAME=bytedesk
BYTEDESK_MINIO_REGION=us-east-1
BYTEDESK_MINIO_SECURE=false
```

## Storage Method Selection

### Default Configuration: Local File System

The system uses local file system storage by default, no additional configuration required. Suitable for the following scenarios:

- **Applicable Scenarios**: Development testing, small-scale deployment
- **Advantages**: Simple configuration, no additional services required, ready to use out of the box
- **Disadvantages**: Does not support distributed deployment, storage capacity limited by server disk

### Optional Configuration: MinIO Object Storage

When higher performance and scalability are needed, MinIO object storage can be enabled:

- **Enable Method**: Set `bytedesk.minio.enabled=true`
- **Applicable Scenarios**: Production environment, large-scale deployment
- **Advantages**: Supports distributed deployment, high availability, easy to scale
- **Disadvantages**: Requires additional MinIO service deployment

## Important Notes

1. **Default Behavior**: The system uses local file system storage by default, no additional configuration required
2. **MinIO Enablement**: Only when `bytedesk.minio.enabled=true` will MinIO storage be used
3. **URL Configuration**: Ensure `bytedesk.upload.url` is configured with the correct server address, need to replace 127.0.0.1 with the server's actual IP address or domain name, clients need to access uploaded files through this address
4. **Directory Permissions**: When using local file system, ensure the upload directory has appropriate read and write permissions
5. **Bucket Creation**: When using MinIO, the corresponding bucket needs to be created in advance
6. **Network Configuration**: In Docker environment, ensure normal network communication between services
