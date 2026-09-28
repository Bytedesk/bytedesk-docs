---
sidebar_label: 对象存储
sidebar_position: 83
---

# 对象存储（MinIO）

对象存储功能让微语把聊天中的**图片、语音、视频、文件**等上传内容保存到专门的存储服务（[MinIO](https://github.com/minio/minio)）中，而不是应用服务器的本地磁盘。对使用者来说操作完全一样——照常发送图片和文件即可，只是文件最终存放的位置不同。

## 功能介绍

- **默认（本地存储）**：上传文件保存在应用服务器的本地目录，适合单机小规模部署
- **开启对象存储后**：上传文件统一写入 MinIO，适合以下场景：
  - 聊天文件越来越多，不想占用应用服务器的磁盘空间
  - 多实例部署（多台应用服务器）需要共享同一份文件
  - 希望对文件单独扩容、备份和迁移
- **数据自主可控**：MinIO 部署在您自己的服务器上，文件不经过任何第三方云服务
- **无缝兼容其他功能**：在线文件预览（图片、PDF、Office 文档等）对 MinIO 中的文件同样有效，参见[在线文件预览](./filepreview.md)
- 开启后微语启动时会**自动创建存储桶**（默认 `bytedesk`）并设置为公开读取，无需手动建桶

## 使用前提

| 条件 | 说明 |
| --- | --- |
| Docker 环境 | 服务器已安装 Docker |
| MinIO 服务 | 已通过启动脚本拉起（见下文第一步） |
| 应用开关 | `bytedesk.minio.enabled=true` |

## 如何开启（管理员操作）

整个过程分三步：启动 MinIO 服务 → 打开微语开关 → 重启微语。

### 第一步：启动 MinIO 服务

在服务器上进入 `deploy/docker` 目录，使用启动脚本追加 `minio` 关键字：

```bash
cd deploy/docker

# 与中间件一起启动
./start.sh middleware minio

# 或在启动完整服务时附带
./start.sh all minio
```

启动后，浏览器打开 `http://127.0.0.1:19001` 能看到 MinIO Console 登录页，说明服务已就绪。账号密码取自 `.env` 中的 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`（默认 `minioadmin` / `minioadmin123`）。

### 第二步：打开微语侧开关

**Docker 部署**：编辑 `deploy/docker/.env`，添加：

```bash
BYTEDESK_MINIO_ENABLED=true
# 应用容器与 MinIO 在同一 docker 网络时，地址默认 http://bytedesk-minio:9000，无需修改
# 访问密钥自动使用 .env 中的 MINIO_ROOT_USER / MINIO_ROOT_PASSWORD，无需单独配置
```

**源码本地运行**：编辑 `starter/src/main/resources/properties/local/minio.properties`：

```properties
bytedesk.minio.enabled=true
# endpoint 默认 http://127.0.0.1:19000（宿主机端口），无需修改
# access-key / secret-key 需与 .env 中 MINIO_ROOT_USER / MINIO_ROOT_PASSWORD 一致，
# 默认已配置好匹配默认账号的密钥，仅需将 enabled 改为 true
```

### 第三步：重启微语

重新执行启动命令（或重建应用容器）使配置生效。启动日志出现「MinIO 初始化完成，存储桶: bytedesk，策略: 公开读取」即为开启成功。

## 配置参数说明

以下参数均可在配置文件 `minio.properties`（或对应环境变量）中调整：

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `bytedesk.minio.enabled` | 是否启用 MinIO 存储，关闭时回退本地磁盘 | `false` |
| `bytedesk.minio.endpoint` | MinIO 服务地址 | 见上文两种部署方式 |
| `bytedesk.minio.access-key` | 访问密钥（与 `MINIO_ROOT_USER` 一致） | 部署环境相关 |
| `bytedesk.minio.secret-key` | 私有密钥（与 `MINIO_ROOT_PASSWORD` 一致） | 部署环境相关 |
| `bytedesk.minio.bucket-name` | 存储桶名称，启动时自动创建 | `bytedesk` |
| `bytedesk.minio.region` | 区域标识 | `us-east-1` |
| `bytedesk.minio.secure` | 是否使用 HTTPS 访问 MinIO | `false` |

> 生产环境建议修改 `.env` 中的 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`，避免使用默认值；Docker 部署下微语侧密钥会自动跟随，无需额外操作。

## 验证是否生效

1. **看启动日志**：出现「MinIO 客户端初始化成功」「MinIO 初始化完成，存储桶: bytedesk，策略: 公开读取」
2. **发一张图片测试**：在聊天窗口发送图片后，右键复制图片链接——地址开头应是 MinIO 端口（如 `http://127.0.0.1:19000/bytedesk/images/...`），而不再是微语地址的 `/file/...` 路径
3. **打开 MinIO Console**：登录 `http://127.0.0.1:19001`，进入 Object Browser 的 `bytedesk` 桶，可看到按类型分目录（`images`、`audios`、`videos` 等）存放的刚上传文件
4. **预览测试**：点击文件消息的预览按钮，图片、PDF、Office 文档均可正常在线预览

![minio-admin](/img/minio/minio-admin.png)

## 常见问题

### 开启后上传报错？

依次检查：MinIO 容器是否在运行（`docker ps | grep minio`）；`endpoint` 地址是否正确（Docker 部署用 `http://bytedesk-minio:9000` 容器内地址，源码本地运行用 `http://127.0.0.1:19000` 宿主机地址）；密钥是否与 `.env` 中 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` 一致。

### 关闭开关后，之前存到 MinIO 的文件还能访问吗？

关闭开关只影响**新上传**的文件（改存本地磁盘）；已存入 MinIO 的文件，其链接仍指向 MinIO，需要保持 MinIO 服务在线才能访问。建议存量数据继续保留 MinIO 运行，或联系管理员做数据迁移。

### 文件数据安全吗？

MinIO 部署在您自己的服务器上，文件存取不经过任何第三方云服务。注意：默认桶策略为**公开读取**（知道文件链接即可查看），如有保密要求，可在 MinIO Console 中自行调整为私有读写并改用带签名的临时链接。

### 社区版可以使用吗？

可以。对象存储属于开源功能，社区版、企业版、平台版均可使用，无需额外授权。

### 对象存储和本地存储如何选择？

单机小规模部署用默认本地存储即可；出现以下情况建议开启对象存储：多实例部署需共享文件、聊天文件量大需独立扩容、或需要对文件做独立备份和容灾。

## 相关链接

- [MinIO 组件部署说明](../deploy/depend/minio.md)：部署依赖组件目录中的 MinIO 说明
- [MinIO 官网](https://min.io)：产品介绍与下载
- [MinIO 官方文档](https://docs.min.io)：运维与管理文档
- [MinIO GitHub 仓库](https://github.com/minio/minio)：开源项目源码仓库
