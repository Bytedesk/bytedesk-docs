---
sidebar_label: MinIO
sidebar_position: 8
---

# MinIO 对象存储

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS / CentOS 8 / Windows Server 2019
- 服务器推荐配置：2核4G内存，50GB存储空间
- 网络：支持HTTP/HTTPS访问
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [MinIO 官方文档](https://docs.min.io/)。
:::

## 简介

MinIO 是一个高性能的对象存储服务，兼容 Amazon S3 API。作为微语系统的可选文件存储组件，MinIO 提供了企业级的对象存储解决方案，主要用于存储聊天记录中的图片、文件、语音等多媒体资源，以及知识库文档等静态资源。

:::note 存储方式说明
微语系统默认使用本地文件系统存储，只有当 `bytedesk.minio.enabled=true` 时才会使用MinIO对象存储。您可以根据实际需求选择合适的存储方式。
:::

## MinIO 在微语系统中的应用场景

### 文件存储管理

- **多媒体文件存储**：存储聊天中的图片、视频、音频文件
- **文档管理**：知识库文档、FAQ文件、用户上传的各类文档
- **备份存储**：系统数据备份、日志文件存储
- **静态资源**：系统图标、模板文件等静态资源

### 高可用性保障

- **分布式存储**：支持多节点部署，提供高可用性
- **数据冗余**：通过纠删码技术确保数据安全
- **自动扩展**：根据业务需求自动扩展存储容量
- **跨区域复制**：支持跨地域的数据复制

## 为什么选择 MinIO

MinIO 相比其他存储方案具有以下优势：

- **S3兼容**：完全兼容Amazon S3 API，易于迁移和集成
- **高性能**：单节点可支持数GB/s的吞吐量
- **轻量级**：资源占用少，部署简单
- **开源免费**：Apache 2.0许可证，无商业限制
- **容器化友好**：完美支持Docker和Kubernetes部署

## 方法一：使用Docker安装MinIO

推荐使用Docker方式部署MinIO，简单高效且易于管理。下面是完整的docker-compose配置示例：

```yaml
services:
  # MinIO对象存储服务
  # http://localhost:19000 - MinIO Console
  # http://localhost:19001 - MinIO API
  bytedesk-minio:
    image: minio/minio:latest
    container_name: minio-bytedesk
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin123
      - TZ=Asia/Shanghai
    ports:
      - "19000:9000"   # API
      - "19001:9001"   # Console
    volumes:
      - minio_data:/data
    command: minio server /data --console-address ":9001"
    networks:
      - bytedesk-network
    restart: always     # 自动重启
    healthcheck:        # 健康检查
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 10s
      retries: 5

# 存储卷与网络定义
volumes:
  minio_data:  # MinIO数据持久化卷

networks:
  bytedesk-network:
    driver: bridge
```

## 方法二：直接下载安装包部署

### Linux/macOS 安装

```bash
# 下载MinIO二进制文件
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio

# 创建数据目录
mkdir -p /opt/minio/data

# 设置环境变量
export MINIO_ROOT_USER=minioadmin
export MINIO_ROOT_PASSWORD=minioadmin123

# 启动MinIO服务
./minio server /opt/minio/data --console-address ":9001"
```

### Windows 安装

```powershell
# 下载MinIO Windows版本
# 从 https://dl.min.io/server/minio/release/windows-amd64/minio.exe 下载

# 创建数据目录
mkdir C:\minio\data

# 设置环境变量
set MINIO_ROOT_USER=minioadmin
set MINIO_ROOT_PASSWORD=minioadmin123

# 启动MinIO服务
minio.exe server C:\minio\data --console-address ":9001"
```

## 微语应用配置

在微语中配置连接到MinIO对象存储。下面分别展示配置与对应的Docker环境变量设置方式：

### 微语属性配置（application.properties）

```properties
# ===============================
# = MinIO 对象存储配置
# ===============================
# 是否启用 MinIO 存储
bytedesk.minio.enabled=true
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

# ===============================
# = 文件上传配置（当使用MinIO时）
# ===============================
# 上传文件的访问地址，请将127.0.0.1替换为服务器实际的IP地址或域名
bytedesk.upload.url=http://127.0.0.1:9003
```

### 对应的Docker环境变量配置

在使用Docker部署微语服务时，可以通过环境变量来设置以上配置：

```yaml
services:
  bytedesk-server:
    image: bytedesk/bytedesk-server:latest
    environment:
      # MinIO配置
      - BYTEDESK_MINIO_ENABLED=true
      - BYTEDESK_MINIO_ENDPOINT=http://bytedesk-minio:9000  # Docker内部通信使用服务名
      - BYTEDESK_MINIO_ACCESS_KEY=minioadmin
      - BYTEDESK_MINIO_SECRET_KEY=minioadmin123
      - BYTEDESK_MINIO_BUCKET_NAME=bytedesk
      - BYTEDESK_MINIO_REGION=us-east-1
      - BYTEDESK_MINIO_SECURE=false
      
      # 文件上传配置
      - BYTEDESK_UPLOAD_URL=http://127.0.0.1:9003  # 请将127.0.0.1替换为服务器实际IP地址或域名
      
      # 其他微语系统配置...
    depends_on:
      - bytedesk-minio
    networks:
      - bytedesk-network
```

## 访问Web管理控制台

部署完成后，可以通过浏览器访问Web管理界面：

```bash
# 替换为自己服务器的IP地址
# MinIO管理控制台访问地址
http://127.0.0.1:19001
```

使用以下凭据登录：

- 用户名：minioadmin
- 密码：minioadmin123

### 管理控制台功能

- **存储桶管理**：创建、删除、配置存储桶
- **文件管理**：上传、下载、删除文件
- **用户管理**：创建和管理访问密钥
- **策略配置**：设置访问权限和策略
- **监控统计**：查看存储使用情况和性能指标

> **提示**：首次访问管理控制台时，建议立即修改默认密码以提高安全性

## 存储桶配置

### 创建存储桶

1. 登录MinIO管理控制台
2. 点击"Create Bucket"按钮
3. 输入存储桶名称：`bytedesk`
4. 选择区域：`us-east-1`
5. 点击"Create Bucket"完成创建

### 设置访问策略

为存储桶设置适当的访问策略，确保微语系统可以正常读写文件：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": ["*"]
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": ["arn:aws:s3:::bytedesk/*"]
        }
    ]
}
```

## 性能优化建议

### 硬件配置

- **CPU**：建议4核以上，支持并发处理
- **内存**：建议8GB以上，提高缓存效率
- **存储**：使用SSD硬盘，提高I/O性能
- **网络**：千兆网络，支持大文件传输

### 配置优化

```yaml
services:
  bytedesk-minio:
    image: minio/minio:latest
    environment:
      # 性能优化参数
      - MINIO_CACHE_DRIVES=/data
      - MINIO_CACHE_EXCLUDE=*.pdf;*.doc;*.docx
      - MINIO_CACHE_EXPIRY=240h
      - MINIO_CACHE_MAXUSE=80
    volumes:
      - minio_data:/data
      - /tmp/minio-cache:/tmp/minio-cache  # 缓存目录
```

## 安全配置

### 启用HTTPS

```yaml
services:
  bytedesk-minio:
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin123
    volumes:
      - minio_data:/data
      - ./certs:/root/.minio/certs  # SSL证书目录
    command: minio server /data --console-address ":9001" --address ":9000"
```

### 防火墙配置

```bash
# 开放MinIO端口
sudo ufw allow 19000/tcp  # API端口
sudo ufw allow 19001/tcp  # 控制台端口

# 限制访问来源（可选）
sudo ufw allow from 192.168.1.0/24 to any port 19000
sudo ufw allow from 192.168.1.0/24 to any port 19001
```

## 备份与恢复

### 数据备份

```bash
# 备份MinIO数据目录
tar -czf minio-backup-$(date +%Y%m%d).tar.gz /opt/minio/data

# 使用mc工具备份
mc mirror myminio/bytedesk /backup/bytedesk
```

### 数据恢复

```bash
# 恢复MinIO数据
tar -xzf minio-backup-20231201.tar.gz -C /opt/

# 使用mc工具恢复
mc mirror /backup/bytedesk myminio/bytedesk
```

## 监控与日志

### 日志查看

```bash
# Docker环境查看日志
docker logs minio-bytedesk

# 系统日志
journalctl -u minio -f
```

### 性能监控

```bash
# 查看存储使用情况
mc admin info myminio

# 查看存储桶统计
mc admin bucket-info myminio bytedesk
```

## 故障排除

### 常见问题

1. **连接失败**
   - 检查网络连接和防火墙设置
   - 确认MinIO服务是否正常运行
   - 验证访问密钥是否正确

2. **权限错误**
   - 检查存储桶是否存在
   - 验证访问策略配置
   - 确认用户权限设置

3. **性能问题**
   - 检查硬件资源配置
   - 优化网络带宽
   - 调整缓存配置

### 诊断命令

```bash
# 检查MinIO服务状态
docker ps | grep minio

# 测试连接
curl -I http://localhost:19000/minio/health/live

# 查看资源使用
docker stats minio-bytedesk
```

## MinIO与其他存储方案对比

| 对比项 | MinIO | 本地文件系统 | 阿里云OSS | 腾讯云COS |
|-------|-------|-------------|-----------|-----------|
| **部署复杂度** | 中等 | 简单 | 简单 | 简单 |
| **成本** | 低 | 最低 | 中等 | 中等 |
| **性能** | 高 | 中等 | 高 | 高 |
| **扩展性** | 高 | 低 | 极高 | 极高 |
| **数据安全** | 高 | 中等 | 高 | 高 |
| **运维复杂度** | 中等 | 低 | 低 | 低 |
| **S3兼容性** | 完全兼容 | 不支持 | 完全兼容 | 完全兼容 |

### 选择建议

- **小规模部署**：推荐使用本地文件系统，配置简单成本低，系统默认配置
- **中等规模**：推荐使用MinIO，平衡了性能和复杂度
- **大规模部署**：可考虑云存储服务，提供更好的扩展性
- **混合部署**：可根据不同业务场景选择不同存储方案

:::tip 快速开始
如果您是首次部署微语系统，建议先使用默认的本地文件系统存储，系统开箱即用。当需要更高性能和扩展性时，再考虑启用MinIO对象存储。
:::

## 总结

MinIO 作为微语系统的对象存储解决方案，提供了企业级的文件存储能力。通过Docker方式部署，可以快速搭建高可用的对象存储服务，满足微语系统对文件存储的各种需求。

## 参考资料

- [MinIO官方文档](https://docs.min.io/)
- [MinIO Docker镜像](https://hub.docker.com/r/minio/minio)
- [MinIO客户端工具](https://docs.min.io/docs/minio-client-complete-guide.html)
- [S3 API兼容性](https://docs.min.io/docs/s3-compatible-api.html)
