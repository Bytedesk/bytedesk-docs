---
sidebar_label: 知识图谱
sidebar_position: 82
---

<!-- markdownlint-disable MD060 MD033 -->

# 知识图谱（Neo4j）

:::tip 提示
本功能社区版不可用，请升级到企业版或平台版，并替换 [licenseKey](../development/license.md)。
:::

知识图谱功能让微语把知识组织成一张**相互连接的知识网络**——常见问题、分类、产品之间通过"相关""归属""提及"等关系连接起来。AI 不再只能逐个关键词匹配，还可以沿着这些关联找到**相关但问法不同**的知识，为更聪明的问答（GraphRAG）打下基础。

微语通过自部署的 [Neo4j](https://github.com/neo4j/neo4j) 图数据库（社区版）实现该能力。所有数据都运行在您自己的服务器上——**知识数据不会经过任何第三方云服务**。

:::info 当前阶段
本版本交付的是知识图谱底座：Docker 部署、功能开关、连通性检查与演示接口。基于图谱的检索增强（GraphRAG）将在后续版本开放。您现在就可以开启，并在 Neo4j Browser 中直观查看演示图谱。
:::

## 使用前提

| 前提 | 说明 |
| --- | --- |
| 版本 | 企业版或平台版（社区版镜像不含此功能） |
| Neo4j 服务 | 通过 Docker 启动（见下方第一步） |
| 应用开关 | `bytedesk.ai.neo4j.enabled=true` |

## 如何开启（管理员操作）

三步走：启动图数据库 → 打开微语开关 → 重启微语。

### 第一步：启动 Neo4j 服务

在服务器上进入 `deploy/docker` 目录，在启动脚本后面追加 `neo4j` 关键字：

```bash
cd deploy/docker

# 与中间件栈一起启动
./start.sh middleware neo4j

# 或在全量启动时附带
./start.sh all neo4j
```

启动后，浏览器打开 `http://127.0.0.1:17474`——能看到 Neo4j Browser 登录页即说明服务就绪。默认账号 `neo4j`，密码取自 `.env` 中的 `NEO4J_PASSWORD`（默认 `bytedesk-neo4j`）。登录时请把连接地址填为 `127.0.0.1:17687`——Bolt 映射到宿主机 17687 端口，而非默认的 7687（见下方常见问题）。

import Neo4j from '/img/neo4j/neo4j-login.png';

<img src={Neo4j} alt="登录窗口" width="360" />

### 第二步：打开微语侧开关

**Docker 部署**：编辑 `deploy/docker/.env`，增加：

```bash
BYTEDESK_AI_NEO4J_ENABLED=true
BYTEDESK_AI_NEO4J_PASSWORD=bytedesk-neo4j   # 与 NEO4J_PASSWORD 保持一致
# 应用与 Neo4j 在同一 docker 网络时，默认地址
# bolt://neo4j-bytedesk:7687 无需修改。
```

**源码本地运行**：编辑 `starter/src/main/resources/properties/local/ai-neo4j.properties`：

```properties
bytedesk.ai.neo4j.enabled=true
bytedesk.ai.neo4j.uri=bolt://127.0.0.1:17687
bytedesk.ai.neo4j.password=bytedesk-neo4j
```

### 第三步：重启微语

重新执行启动命令（或重建应用容器）后生效。

## 配置参数

所有参数均可在 `ai-neo4j.properties` 中调整（或通过对应环境变量）：

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `bytedesk.ai.neo4j.enabled` | 功能开关 | `false` |
| `bytedesk.ai.neo4j.uri` | Neo4j 连接地址 | 视部署方式而定（见上文） |
| `bytedesk.ai.neo4j.username` | 用户名（不可改，只能是 `neo4j`） | `neo4j` |
| `bytedesk.ai.neo4j.password` | 密码（与 `NEO4J_PASSWORD` 保持一致） | `bytedesk-neo4j` |
| `bytedesk.ai.neo4j.database` | 数据库名（社区版仅支持单库） | `neo4j` |
| `bytedesk.ai.neo4j.connect-timeout-ms` | 连接超时（毫秒） | `10000` |
| `bytedesk.ai.neo4j.max-connection-pool-size` | 最大连接池 | `10` |

> 生产环境请修改 `.env` 中的 `NEO4J_PASSWORD`，不要保留默认值。注意：初始密码**仅在数据卷为空的首次启动时生效**，详见下方常见问题。

## 验证是否生效

在调试模式（`bytedesk.debug=true`）下，可直接在浏览器打开以下地址：

| 接口 | 地址 | 用途 |
| --- | --- | --- |
| 状态 | `http://127.0.0.1:9003/spring/ai/api/v1/neo4j/status` | 配置与连通性检查 |
| 写入演示 | 下方命令 | 写入一小份演示知识图谱 |
| 查看演示图谱 | `http://127.0.0.1:9003/spring/ai/api/v1/neo4j/graph-demo?limit=100` | 返回演示节点与关系 |
| 清理演示 | 下方命令 | 删除演示数据 |

```bash
# 写入演示图谱（幂等，可重复执行）
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/neo4j/seed-demo

# 清理演示数据
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/neo4j/clear-demo
```

若 `/status` 返回 `"health": "up"`，且 `graph-demo` 能返回节点与关系，说明知识图谱链路已通。

**直观查看**：浏览器打开 `http://127.0.0.1:17474`，用配置的账号登录。**注意：连接地址必须使用宿主机端口 `17687`**——在连接对话框中把 Connection URL 从默认的 `127.0.0.1:7687` 改为 `127.0.0.1:17687`（本部署把 `17687` 映射到容器 `7687`，宿主机 7687 并未开放，不改会报 "Connection to instance failed"，见下方常见问题）。连接后执行 `MATCH (n) RETURN n`，即可看到由点和线画出的演示图谱。

![neo4j-graph](/img/neo4j/neo4j-graph.png)

## 常见问题

### 为什么提示 "Service is not available"？

调试模式未开启（需要 `bytedesk.debug=true`），或者您运行的是社区版（不包含企业版模块）。

### Neo4j Browser 登录时提示 "Connection to instance failed"？

Browser 登录对话框默认连接 `bolt://127.0.0.1:7687`，而本部署将 Bolt 映射到宿主机 **17687** 端口（`compose-neo4j.yaml` 中的 `17687:7687`）。宿主机 7687 端口没有服务监听，浏览器的 WebSocket 连接因此被拒绝（报 `ServiceUnavailable: WebSocket connection failure`）。请在 "Connect to instance" 对话框中把 **Connection URL** 改为 `127.0.0.1:17687`（即 `neo4j://127.0.0.1:17687`），用户名保持 `neo4j`、密码取 `NEO4J_PASSWORD`，再点击 Connect。若 "Recent connections" 中存有旧的 `127.0.0.1:7687` 记录，请勿直接选用。

### 修改了 `.env` 里的 `NEO4J_PASSWORD`，为什么微语还是连不上？

初始密码**仅在数据卷为空的首次启动时生效**。数据卷已存在时，修改 `.env` 不会覆盖库内旧密码。解决办法任选其一：继续使用旧密码（把 `BYTEDESK_AI_NEO4J_PASSWORD` 改成与旧密码一致）、在 Neo4j 内部修改密码，或停止服务后删除数据卷重新初始化（`docker volume rm bytedesk_neo4j-data`）。

### 没有部署 Neo4j，微语会启动失败吗？

不会。开关默认关闭，只有显式设置 `bytedesk.ai.neo4j.enabled=true` 才会连接 Neo4j；开关关闭时，即使地址或密码配置错误也不影响启动。

### 演示数据和我真实的知识库是什么关系？

演示接口只写入和读取带 `BytedeskDemo` 标签的数据，与业务数据完全隔离；`clear-demo` 也只删除演示数据。

## 参考链接

- [Neo4j Docker 入门指南（官方文档）](https://neo4j.com/docs/operations-manual/current/docker/introduction/)
- [Neo4j Docker 镜像（Docker Hub）](https://hub.docker.com/_/neo4j)
- [Neo4j GitHub 仓库](https://github.com/neo4j/neo4j)
