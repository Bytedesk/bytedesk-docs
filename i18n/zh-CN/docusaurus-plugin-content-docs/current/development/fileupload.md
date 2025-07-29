---
sidebar_label: 文件上传
sidebar_position: 32
---

# 文件上传

微语系统支持两种文件存储方式：**本地文件系统** 和 **MinIO对象存储**。系统默认使用本地文件系统存储，只有当 `bytedesk.minio.enabled=true` 时才会使用MinIO对象存储。您可以根据实际需求选择合适的存储方式。

## 配置说明

### 1. 本地文件系统存储

本地文件系统存储将文件保存在服务器的本地目录中，适合小规模部署和测试环境。

```properties
# ===============================
#= Upload config
# ===============================
# 存储类型：local 表示本地文件系统
bytedesk.upload.type=local
# 上传目录，注意不要以 '/' 结尾
# 示例：bytedesk.upload.dir=/var/www/html/weiyuai/file
bytedesk.upload.dir=uploads
# 上传文件的访问地址，请将127.0.0.1替换为服务器实际的IP地址或域名
bytedesk.upload.url=http://127.0.0.1:9003
```

**配置说明：**

- `bytedesk.upload.type=local`：设置为本地文件系统存储
- `bytedesk.upload.dir`：指定文件存储的本地目录路径
- `bytedesk.upload.url`：文件访问的URL地址，需要将127.0.0.1替换为您的服务器实际IP地址或域名

### 2. MinIO对象存储

MinIO是一个高性能的对象存储服务，适合大规模部署和生产环境。

:::tip 详细配置
有关 MinIO 的详细安装、配置和管理说明，请参考 [MinIO 对象存储](../deploy/depend/minio.md) 文档。
:::

```properties
# ===============================
# = MinIO 对象存储配置
# ===============================
# 是否启用 MinIO 存储
bytedesk.minio.enabled=false
# MinIO 服务地址，请将127.0.0.1替换为服务器实际的IP地址或域名
bytedesk.minio.endpoint=http://127.0.0.1:19000
# MinIO 访问密钥
bytedesk.minio.access-key=minioadmin
# MinIO 密钥
bytedesk.minio.secret-key=minioadmin123
# MinIO 存储桶名称
bytedesk.minio.bucket-name=bytedesk
# MinIO 区域
bytedesk.minio.region=us-east-1
# 是否使用 HTTPS
bytedesk.minio.secure=false
```

**配置说明：**

- `bytedesk.minio.enabled`：是否启用MinIO存储，默认为false。只有当设置为true时才会使用MinIO存储，否则使用本地文件系统存储
- `bytedesk.minio.endpoint`：MinIO服务的访问地址，需要将127.0.0.1替换为您的服务器实际IP地址或域名
- `bytedesk.minio.access-key`：MinIO的访问密钥ID
- `bytedesk.minio.secret-key`：MinIO的访问密钥
- `bytedesk.minio.bucket-name`：MinIO存储桶名称
- `bytedesk.minio.region`：MinIO服务区域
- `bytedesk.minio.secure`：是否使用HTTPS协议

## Docker Compose 配置

如果您使用Docker部署，可以在`docker-compose.yaml`文件中配置文件上传服务：

```yaml
# MinIO配置（当使用MinIO时）
BYTEDESK_MINIO_ENABLED=false
# MinIO服务的访问地址，需要将127.0.0.1替换为您的服务器实际IP地址或域名
BYTEDESK_MINIO_ENDPOINT=http://127.0.0.1:19000
BYTEDESK_MINIO_ACCESS_KEY=minioadmin
BYTEDESK_MINIO_SECRET_KEY=minioadmin123
BYTEDESK_MINIO_BUCKET_NAME=bytedesk
BYTEDESK_MINIO_REGION=us-east-1
BYTEDESK_MINIO_SECURE=false
```

## 存储方式选择

### 默认配置：本地文件系统

系统默认使用本地文件系统存储，无需额外配置。适合以下场景：

- **适用场景**：开发测试、小规模部署
- **优点**：配置简单，无需额外服务，开箱即用
- **缺点**：不支持分布式部署，存储容量受限于服务器磁盘

### 可选配置：MinIO对象存储

当需要更高性能和扩展性时，可以启用MinIO对象存储：

- **启用方式**：设置 `bytedesk.minio.enabled=true`
- **适用场景**：生产环境、大规模部署
- **优点**：支持分布式部署，高可用性，易于扩展
- **缺点**：需要额外部署MinIO服务

## 注意事项

1. **默认行为**：系统默认使用本地文件系统存储，无需额外配置
2. **MinIO启用**：只有当 `bytedesk.minio.enabled=true` 时才会使用MinIO存储
3. **URL配置**：确保`bytedesk.upload.url`配置为正确的服务器地址，需要将127.0.0.1替换为服务器实际IP地址或域名，客户端需要通过此地址访问上传的文件
4. **目录权限**：使用本地文件系统时，确保上传目录具有适当的读写权限
5. **存储桶创建**：使用MinIO时，需要提前创建对应的存储桶
6. **网络配置**：在Docker环境中，确保服务间网络通信正常
