---
sidebar_label: 在线文件预览
sidebar_position: 80
---

# 在线文件预览

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

在线文件预览功能让您**无需下载文件到本地**，直接在微语界面内查看聊天记录和知识库中的文件内容。收到文件消息后，点击即可预览，就像查看图片一样简单。

## 功能介绍

开启预览前，收到 Word、PDF 等文件只能下载后用本地软件打开；开启预览后，点击文件即可直接查看内容，大幅提升沟通效率。该功能特别适用于：

- **客服与访客沟通**：访客发送的合同、报价单等文件，客服可直接点开查看，无需下载
- **知识库资料查阅**：管理员在知识库上传的产品手册、说明文档，可在线翻阅
- **团队协作**：同事间传递的文件资料，即点即看，减少文件管理负担

### 支持预览的文件类型

| 文件类型 | 常见格式 | 预览方式 |
| --- | --- | --- |
| 图片 | jpg、png、gif、webp 等 | 直接显示 |
| PDF 文档 | pdf | 在线翻页阅读 |
| 文本文件 | txt、md、json、日志等 | 在线查看文字内容 |
| 音频 | mp3、wav 等 | 在线播放 |
| 视频 | mp4、webm 等 | 在线播放 |
| Office 文档 | doc/docx、xls/xlsx、ppt/pptx | 需服务器开启转换后在线查看 |
| 压缩包、CAD 等 | zip、rar、dwg 等 | 暂不支持预览，提示下载 |

## 使用方法

预览功能在三个端的使用方式一致：找到文件，点击「预览」即可。

### 1. 管理后台（知识库文件）

1. 进入管理后台的知识库文件列表；
2. 在文件列表的操作列点击「预览」；
3. 弹窗中即可查看文件内容，也可随时下载或新窗口打开。

### 2. 客服端（文件消息）

1. 在会话窗口中找到文件类型的消息气泡；
2. 点击气泡下方的「预览」按钮（眼睛图标）；
3. 弹窗中查看文件内容。

### 3. 访客端（文件消息）

访客端的文件消息同样支持在线预览：

1. 在聊天窗口找到文件消息；
2. 点击消息气泡下方的「预览」按钮；
3. 弹窗中查看文件内容。

## Office 文档预览说明

Word、Excel、PowerPoint 文档需要**服务器端转换为 PDF 后**才能在线查看，因此有以下特点：

1. **首次打开需要等待**：系统会将文档自动转换为 PDF，转换期间会显示「文件转换中，请稍候...」，通常几秒到几十秒（取决于文件大小）；
2. **同一文件只转换一次**：转换完成后会缓存结果，再次打开同一文件时秒开；
3. **未开启转换时的表现**：若服务器未启用该能力，预览 Office 文档时会提示「该格式暂不支持在线预览，请下载查看」，此时可下载后用本地软件打开，其他功能不受影响。

### 如何开启 Office 转换（管理员操作）

Office 文档预览默认关闭。支持两种转换模式：

| 模式 | 适用部署形态 | 原理 |
| --- | --- | --- |
| `local`（默认） | 直跑 jar / 自建全量镜像 | jodconverter（已集成为 Java 库）拉起部署环境安装的 LibreOffice |
| `remote` | 官方（精简）Docker 镜像 | 通过 HTTP 调用 **gotenberg** 转换 sidecar 容器（官方镜像 `gotenberg/gotenberg:8`，自带 LibreOffice 与中文字体） |

> 前端预览按钮仅在服务端上报「已开启且可用」时显示（`/config/bytedesk/properties` 下发的 `preview.enabled` + `preview.available`）。安装 LibreOffice 或启动 gotenberg 后，刷新页面/重新登录即可看到按钮。

#### 方式一：直跑 jar（mode=local，非 Docker 部署推荐）

转换能力（jodconverter）已作为 Java 库集成在微语中，只需**宿主机**安装 LibreOffice 即可开启，无需部署额外服务。

##### 第一步：安装 LibreOffice

根据服务器操作系统选择对应命令：

**macOS**（Homebrew）：

```bash
brew install --cask libreoffice
```

**Ubuntu / Debian**：

```bash
sudo apt update
sudo apt install -y libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress
# 中文文档建议同时安装中文字体，避免乱码：
sudo apt install -y fonts-noto-cjk
```

**CentOS / RHEL / Rocky Linux**：

```bash
sudo yum install -y libreoffice-writer libreoffice-calc libreoffice-impress
# 中文字体：
sudo yum install -y google-noto-sans-cjk-ttc-fonts google-noto-serif-cjk-ttc-fonts
```

> 说明：LibreOffice 安装路径会被自动探测，无需手动配置；仅当安装在非标准位置时，才需要设置 `bytedesk.preview.convert.office-home` 指向其安装目录（如 macOS 的 `/Applications/LibreOffice.app/Contents`）。WPS 不能替代 LibreOffice。
>
> **注意：宿主机安装的 LibreOffice 仅对直跑 jar 有效**——容器内的微语看不到宿主机安装路径，Docker 部署请用方式二（gotenberg sidecar）或自建全量镜像。

##### 第二步：开启配置并重启

1. 修改配置文件，设置 `bytedesk.preview.convert.enabled=true`（`mode` 保持默认 `local`）；
2. 重启微语服务。

#### 方式二：Docker 部署（mode=remote，gotenberg sidecar 推荐）

先说结论：**在宿主机上安装 LibreOffice 无法被容器内的微语使用**。官方镜像已精简（不含 LibreOffice），Docker 部署推荐启动 gotenberg 转换 sidecar 并指向它：

```bash
cd deploy/docker
# 1. 启动转换 sidecar（官方镜像 gotenberg/gotenberg:8，8.30.0+ 自带中文字体）
./start.sh gotenberg
# 2. 在 .env 中开启预览：
#    BYTEDESK_PREVIEW_CONVERT_ENABLED=true
#    BYTEDESK_PREVIEW_CONVERT_MODE=remote
#    （BYTEDESK_PREVIEW_CONVERT_REMOTE_URL 默认 http://bytedesk-gotenberg:3000，无需填写）
# 3. 重启应用
./stop.sh && ./start.sh
```

gotenberg 仅在 compose 内网监听（不映射宿主端口），主镜像保持精简，转换负载可独立扩缩容。

**自建全量镜像**（单容器、不想跑 sidecar）：构建时加 `--build-arg INSTALL_LIBREOFFICE=true`，并保持 `MODE=local`：

```dockerfile
# 基于现有镜像追加一层（Debian 基础镜像；中文字体避免中文文档转换乱码）
FROM registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest
RUN apt update && apt install -y --no-install-recommends \
    libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*
```

```bash
docker build -t bytedesk-libreoffice:latest .
# 修改 compose-bytedesk.yaml：image: bytedesk-libreoffice:latest
```

开启后，三端的 Office 文档即可在线预览；未开启也不影响其他格式（图片、PDF、音视频、文本）的正常预览。

**验证是否生效**：上传一个 docx/xlsx/pptx 文件并点击「预览」，若几秒到几十秒内出现 PDF 内容即为成功；若提示「暂不支持在线预览」，请检查——直跑 jar/全量镜像：LibreOffice 是否已安装（终端执行 `soffice --version` 应输出版本号）；gotenberg 模式：容器是否在运行（`docker ps | grep gotenberg`）。

#### 可选高级配置

以下配置均已在 `compose-bytedesk.yaml` 的 File preview config 配置段中提供默认值，可按需在 `.env` 中覆盖或直接修改 compose 文件：

| 配置项 | 说明 | 默认值 | 环境变量 |
| --- | --- | --- | --- |
| `bytedesk.preview.convert.enabled` | 是否启用 Office 转 PDF | `false` | `BYTEDESK_PREVIEW_CONVERT_ENABLED` |
| `bytedesk.preview.convert.mode` | 转换模式：`local`（进程内 LibreOffice）/ `remote`（gotenberg sidecar） | `local` | `BYTEDESK_PREVIEW_CONVERT_MODE` |
| `bytedesk.preview.convert.remote-url` | remote 模式：gotenberg 服务地址 | `http://bytedesk-gotenberg:3000` | `BYTEDESK_PREVIEW_CONVERT_REMOTE_URL` |
| `bytedesk.preview.convert.remote-timeout` | remote 模式：单次转换 HTTP 超时（毫秒） | `180000` | `BYTEDESK_PREVIEW_CONVERT_REMOTE_TIMEOUT` |
| `bytedesk.preview.convert.office-home` | LibreOffice 安装目录，留空自动探测（仅 local 模式） | 空 | `BYTEDESK_PREVIEW_CONVERT_OFFICE_HOME` |
| `bytedesk.preview.convert.ports` | LibreOffice 进程端口，多个逗号分隔（仅 local 模式） | `2001` | `BYTEDESK_PREVIEW_CONVERT_PORTS` |
| `bytedesk.preview.convert.task-execution-timeout` | 单次转换任务超时（毫秒，仅 local 模式） | `180000` | `BYTEDESK_PREVIEW_CONVERT_TASK_EXECUTION_TIMEOUT` |
| `bytedesk.preview.convert.process-timeout` | LibreOffice 进程存活超时（毫秒，仅 local 模式） | `300000` | `BYTEDESK_PREVIEW_CONVERT_PROCESS_TIMEOUT` |
| `bytedesk.preview.convert.max-tasks-per-process` | 每个进程最大任务数，超过后重启进程（仅 local 模式） | `20` | `BYTEDESK_PREVIEW_CONVERT_MAX_TASKS_PER_PROCESS` |
| `bytedesk.preview.convert.max-file-size-mb` | 待转换文件大小上限（MB） | `100` | `BYTEDESK_PREVIEW_CONVERT_MAX_FILE_SIZE_MB` |
| `bytedesk.preview.convert.remote-source-enabled` | 是否允许从对象存储 URL 下载源文件用于转换 | `true` | `BYTEDESK_PREVIEW_CONVERT_REMOTE_SOURCE_ENABLED` |
| `bytedesk.preview.convert.allowed-remote-hosts` | 远程源文件主机白名单，默认仅允许 MinIO endpoint | 空 | `BYTEDESK_PREVIEW_CONVERT_ALLOWED_REMOTE_HOSTS` |

> 提示：启用 MinIO 对象存储后，Office 转换同样可用，详见上文 [常见问题 - MinIO 预览](#文件存储在-minio-对象存储中能预览吗)。

## 客服端预览

![desktop-preview-icon.png](/img/filepreview/desktop-preview-icon.png)

![desktop-preview-modal.png](/img/filepreview/desktop-preview-modal.png)

## 访客端预览

![visitor-preview-icon.png](/img/filepreview/visitor-preview-icon.png)

![visitor-preview-modal.png](/img/filepreview/visitor-preview-modal.png)

## 常见问题

### 为什么 Office 文档提示「暂不支持在线预览」？

服务器未开启 Office 转换能力，或文件超出了转换大小限制（默认 100MB）。请联系管理员开启转换功能，或直接下载文件查看。

### 为什么 Office 文档第一次打开比较慢？

系统正在将文档转换为 PDF 格式，转换完成后会缓存，之后打开同一文件会很快。

### 预览会修改原文件吗？

不会。预览是只读操作；Office 转换生成的 PDF 是额外产物，原文件保持不变，下载功能依然获取原始文件。

### 压缩包、CAD 图纸能预览吗？

当前版本暂不支持这几类格式的在线预览，点击预览会提示下载。后续版本会逐步扩展支持。

### 访客使用预览需要登录吗？

不需要。访客端的文件预览无需登录即可使用。

### 文件存储在 MinIO 对象存储中，能预览吗？

能。开启 MinIO 存储后，图片、PDF、音视频、文本等格式直接从对象存储加载预览；Office 文档同样支持——服务器会先从对象存储下载源文件到临时目录（仅允许配置的 MinIO 地址，其他站点默认拒绝），转换为 PDF 后自动清理临时文件。转换结果会缓存，同一文件只需转换一次，且不改动对象存储中的原文件。

管理员可按需调整两个配置：

- `bytedesk.preview.convert.remote-source-enabled`：是否允许从对象存储下载源文件用于转换，默认 `true`；
- `bytedesk.preview.convert.allowed-remote-hosts`：额外允许的直链域名白名单（如自建 OSS/COS），默认仅允许 MinIO 地址。
