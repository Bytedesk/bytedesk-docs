---
sidebar_label: Elasticsearch
sidebar_position: 4
---

# Elasticsearch 在微语系统中的应用

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [Elasticsearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)。
:::

## 简介

Elasticsearch 是一个分布式、RESTful 的搜索和分析引擎，在微语系统中扮演着重要角色。它主要用于以下两个方面：

1. **全文检索**：支持对历史对话和知识库内容进行高效检索
2. **向量存储与检索**：存储和检索 AI 生成的文本向量，支持语义搜索和相关性匹配

## 核心功能

### 全文检索

Elasticsearch 提供强大的全文搜索能力，在微语系统中用于：

- 对话历史快速检索
- 知识库文档搜索
- 多维度过滤（时间、会话、关键词等）
- 高亮匹配结果

### 向量存储与检索

作为向量数据库使用，Elasticsearch 支持：

- 存储大语言模型生成的文本嵌入向量
- 语义相似性搜索
- KNN（K近邻）检索
- 高维向量索引优化

## 方式一：Docker安装

- [使用Docker安装](../jar.md#12-安装项目依赖)

## 方式二：非 Docker 安装（Tarball + systemd）

本项目需要搜索能力支持。以下给出使用官方二进制包（tarball）在 Ubuntu 22.04 上安装并作为 systemd 服务运行 Elasticsearch（单机/开发模式）的完整指南，便于复现与维护。

提示：以下示例使用版本 9.2.0，若下载失败或版本不可用，请替换为官网最新稳定版，版本号以官网为准。

### 环境要求

- 操作系统：Ubuntu 22.04（其他 Linux 发行版可参考对应包管理器安装方式）
- 端口占用：9200（HTTP）在本机回环地址 127.0.0.1 监听
- 最低内存建议：2 GB（示例配置将 JVM 堆设置为 512MB，可按需调整）

### 一键安装（已在本机按此部署）

以下步骤使用官方二进制包（tarball）安装为 systemd 服务，避免包管理器依赖冲突：

1) 下载与解压（版本示例：9.2.0）

```bash
sudo mkdir -p /opt
cd /opt
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-9.2.0-linux-x86_64.tar.gz
tar -xzf elasticsearch-9.2.0-linux-x86_64.tar.gz
ln -sfn elasticsearch-9.2.0 elasticsearch
```

2) 创建运行用户与目录权限

```bash
sudo id -u elasticsearch >/dev/null 2>&1 || sudo useradd -r -s /usr/sbin/nologin -d /opt/elasticsearch elasticsearch
sudo mkdir -p /opt/elasticsearch/data /opt/elasticsearch/logs
sudo chown -R elasticsearch:elasticsearch /opt/elasticsearch-9.2.0 /opt/elasticsearch
```

3) 最小化配置（开发/单机）

```bash
sudo tee /opt/elasticsearch/config/elasticsearch.yml >/dev/null <<'EOF'
cluster.name: weiyuai-es
node.name: node-1
path.data: /opt/elasticsearch/data
path.logs: /opt/elasticsearch/logs
network.host: 127.0.0.1
http.port: 9200
discovery.type: single-node
xpack.security.enabled: false
EOF
```

4) JVM 堆内存（示例设置 512MB）

```bash
sudo mkdir -p /opt/elasticsearch/config/jvm.options.d
echo "-Xms512m" | sudo tee /opt/elasticsearch/config/jvm.options.d/heap.options >/dev/null
echo "-Xmx512m" | sudo tee -a /opt/elasticsearch/config/jvm.options.d/heap.options >/dev/null
sudo chown -R elasticsearch:elasticsearch /opt/elasticsearch/config/jvm.options.d
```

5) 系统内核参数（必需）

```bash
echo 'vm.max_map_count=262144' | sudo tee /etc/sysctl.d/99-elasticsearch.conf >/dev/null
sudo sysctl -p /etc/sysctl.d/99-elasticsearch.conf
```

6) 注册为 systemd 服务并启动

```bash
sudo tee /etc/systemd/system/elasticsearch.service >/dev/null <<'EOF'
[Unit]
Description=Elasticsearch
Documentation=https://www.elastic.co
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=elasticsearch
Group=elasticsearch
WorkingDirectory=/opt/elasticsearch
Environment=ES_HOME=/opt/elasticsearch
Environment=JAVA_HOME=/opt/elasticsearch/jdk
Environment=ES_PATH_CONF=/opt/elasticsearch/config
ExecStart=/opt/elasticsearch/bin/elasticsearch
Restart=on-failure
LimitNOFILE=65535
TimeoutStopSec=20

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now elasticsearch
```

至此，Elasticsearch 将作为系统服务运行，并随开机自启。

备注：若你更偏好 apt/yum 安装，可参考官方仓库方式：https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html

### 服务管理

```bash
# 查看状态
systemctl status elasticsearch

# 启动/停止/重启
sudo systemctl start elasticsearch
sudo systemctl stop elasticsearch
sudo systemctl restart elasticsearch
```

### 运行验证

```bash
curl http://127.0.0.1:9200
```

预期返回类似：

```json
{
	"name": "node-1",
	"cluster_name": "weiyuai-es",
	"version": { "number": "9.2.0" },
	"tagline": "You Know, for Search"
}
```

### 常见配置

- 监听地址：目前绑定 127.0.0.1，仅本机可访问。若需远程访问，可将 `network.host` 改为服务器内网 IP 或 0.0.0.0（生产环境请配合防火墙/认证）。
- 堆内存：调整 `/opt/elasticsearch/config/jvm.options.d/heap.options` 中 `-Xms/-Xmx`，建议两者相等，通常设为机器内存的 1/4（不超过 32GB）。
- 数据与日志目录：分别为 `/opt/elasticsearch/data` 与 `/opt/elasticsearch/logs`。

### 启用安全认证（可选，生产建议开启）

当前为了便于本机开发，示例配置关闭了安全。若需开启：

1) 修改配置：

```bash
sudo sed -i 's/^xpack.security.enabled: .*/xpack.security.enabled: true/' /opt/elasticsearch/config/elasticsearch.yml
sudo systemctl restart elasticsearch
```

2) 设置内置用户密码（非交互）：

```bash
sudo /opt/elasticsearch/bin/elasticsearch-reset-password -u elastic -b
```

命令将输出新密码。之后即可通过 HTTPS 访问并使用 `elastic` 用户认证（自签发证书，建议本机测试使用 `-k` 忽略证书校验）：

```bash
curl -k -u elastic:你的密码 https://127.0.0.1:9200
```

命令将输出临时密码。你可以直接用该密码访问，或继续将其改为“自定义强密码”（推荐）。

3) 修改内置用户密码为自定义值（推荐）：

已知当前密码（上一步生成的临时密码）时，可以通过安全 API 修改：

```bash
# 将 <临时密码> 替换为上一步输出；将 <你的新密码> 替换为目标密码
curl -u elastic:<临时密码> \
	-H "Content-Type: application/json" \
	-X POST http://127.0.0.1:9200/_security/user/_password \
	-d '{"password":"<你的新密码>"}'
```

修改成功后，使用新密码访问（未启用 HTTP TLS 的情况下为 http）：

```bash
curl -u elastic:<你的新密码> http://127.0.0.1:9200
```

若你启用了 HTTP 层 TLS（自签发证书），请使用 https 并在本机测试时添加 `-k` 忽略证书校验：

```bash
curl -k -u elastic:<你的新密码> https://127.0.0.1:9200
```


### 开启外网访问（重要）

默认仅监听本机回环地址（127.0.0.1）。如需被外部访问，请按下面步骤修改并重启服务：

1) 修改监听地址为 0.0.0.0（或指定服务器的内/公网 IP）：

```bash
sudo sed -i 's/^network.host:.*/network.host: 0.0.0.0/' /opt/elasticsearch/config/elasticsearch.yml
```

2) 确保已启用安全认证（已在本文档前文说明，推荐保持开启）：

```yaml
xpack.security.enabled: true
```

3) 重启服务并验证：

```bash
sudo systemctl restart elasticsearch
# 本机验证返回 401（未认证），说明端口已对外监听
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:9200
# 远程机器验证（请替换为你的服务器 IP，并提供凭据）
curl -u elastic:<你的密码> http://<你的服务器IP>:9200
```

4) 防火墙/安全组开放：
	- 开放 TCP 9200 端口，仅允许可信来源 IP（建议限制来源）。
	- 云主机请在“安全组”/“防火墙规则”中放行相应入站策略。

> 安全提示：在对公网开放时，强烈建议启用 HTTPS/TLS（见下文），并使用强口令策略与最小权限。

### 可选：启用 HTTPS/TLS（推荐对公网场景）

为 HTTP 层启用 TLS（自签证书示例，生产可使用受信 CA 证书）：

1) 生成自签证书（PKCS#12 容器）：

```bash
sudo /opt/elasticsearch/bin/elasticsearch-certutil cert -out /opt/elasticsearch/config/http.p12 -pass ""
sudo chown elasticsearch:elasticsearch /opt/elasticsearch/config/http.p12
```

2) 在 `elasticsearch.yml` 启用 HTTP TLS：

```yaml
xpack.security.http.ssl:
	enabled: true
	keystore.path: /opt/elasticsearch/config/http.p12
	keystore.password: ""
```

3) 重启服务并以 https 访问（自签证书，测试时可 `-k`）：

```bash
sudo systemctl restart elasticsearch
curl -k -u elastic:<你的密码> https://<你的服务器IP>:9200
```

> 说明：多节点/生产环境还应为“传输层（transport，9300）”启用 TLS（`xpack.security.transport.ssl.enabled: true`），并正确配置证书信任链。详见官方文档。

### 故障排查（非 Docker 部署）

- 查看日志：

```bash
journalctl -u elasticsearch -f
```

- 端口未监听：
	- 检查日志中的错误；
	- 确认 `vm.max_map_count` 已生效；
	- 降低 JVM 堆（如 512MB 或更小）以避免内存压力。

### 卸载（tarball 方式）

```bash
sudo systemctl disable --now elasticsearch
sudo rm -f /etc/systemd/system/elasticsearch.service
sudo systemctl daemon-reload
sudo rm -rf /opt/elasticsearch /opt/elasticsearch-9.2.0 /etc/sysctl.d/99-elasticsearch.conf
sudo sysctl -p || true
sudo userdel elasticsearch 2>/dev/null || true
```

注意：卸载会删除数据与日志目录，请在操作前做好备份。

## 微语系统中的应用集成

### 集成配置

在微语系统中集成 Elasticsearch 需要以下配置：

```properties
# Elasticsearch 配置
spring.elasticsearch.uris=http://elasticsearch-bytedesk:9200
spring.elasticsearch.username=elastic
spring.elasticsearch.password=bytedesk123
```

### 索引管理

微语系统会自动创建和管理以下索引：

- **bytedesk-messages**: 存储消息数据和向量
- **bytedesk-knowledge**: 存储知识库文档和向量
- **bytedesk-logs**: 存储系统操作日志

## 性能优化建议

1. **硬件资源**：生产环境建议至少 4GB 内存，8GB 或更高更佳
2. **索引设置**：根据数据特点调整分片数和副本数
3. **批量操作**：使用批量API进行数据写入，减少请求次数
4. **查询优化**：使用过滤器和聚合优化查询性能
5. **定期维护**：设置索引生命周期管理策略

## 常见问题排查

1. **内存不足**：调整 ES_JAVA_OPTS 增加 JVM 堆内存
2. **连接超时**：检查网络配置和防火墙设置
3. **集群状态异常**：使用 `GET /_cluster/health` API 检查集群状态
4. **索引错误**：检查索引映射配置和数据类型

> **注意**：生产环境部署时，建议进一步加强安全措施，包括设置HTTPS、IP限制和角色权限管理。
