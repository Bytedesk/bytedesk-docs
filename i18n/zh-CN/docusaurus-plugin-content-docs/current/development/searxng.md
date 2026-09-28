---
sidebar_label: 联网搜索
sidebar_position: 81
---

# 联网搜索（SearXNG）

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

联网搜索功能让微语的 AI 助手能够**实时检索互联网上的最新信息**，并结合搜索结果回答问题。无论是产品价格、新闻动态还是技术资料，AI 都可以先「上网查一查」再回答，让答案更及时、更可靠。

## 功能介绍

微语通过自部署的 [SearXNG](https://github.com/searxng/searxng)（开源元搜索引擎）实现联网搜索：它会同时向 Google、Bing、百度等多个搜索引擎发起查询，聚合去重后返回结果。整个过程运行在您自己的服务器上，**搜索行为不经过任何第三方云服务**，数据安全可控。

联网搜索适合以下场景：

- **时效性问题**：最新价格、政策、新闻等，模型训练数据可能滞后，联网后可获取实时信息
- **资料查询**：让 AI 基于搜索结果总结答案，并在回答末尾附上来源链接
- **知识库补充**：知识库没有覆盖的问题，可借助联网搜索兜底

## 使用前提

| 条件 | 说明 |
| --- | --- |
| 版本 | 企业版或平台版（社区版镜像中不包含此功能） |
| SearXNG 服务 | 已通过 Docker 启动（见下文第一步） |
| 应用开关 | `bytedesk.ai.searxng.enabled=true` |

## 如何开启（管理员操作）

整个过程分三步：启动搜索服务 → 打开微语开关 → 重启微语。

### 第一步：启动 SearXNG 搜索服务

在服务器上进入 `deploy/docker` 目录，使用启动脚本追加 `searxng` 关键字（也可写作 `search`）：

```bash
cd deploy/docker

# 与中间件一起启动
./start.sh middleware searxng

# 或在启动完整服务时附带
./start.sh all searxng
```

启动后，浏览器打开 `http://127.0.0.1:18888` 能看到 SearXNG 搜索页面，说明服务已就绪。

### 第二步：打开微语侧开关

**Docker 部署**：编辑 `deploy/docker/.env`，添加：

```bash
BYTEDESK_AI_SEARXNG_ENABLED=true
# 应用与 SearXNG 在同一 docker 网络时，地址默认为 http://searxng-bytedesk:8080，无需修改
```

**源码本地运行**：`starter/src/main/resources/properties/local/ai-searxng.properties` 中默认已开启，地址为 `http://127.0.0.1:18888`，无需额外配置。

### 第三步：重启微语

重新执行启动命令（或重建应用容器）使配置生效。

## 配置参数说明

以下参数均可在配置文件 `ai-searxng.properties`（或对应环境变量）中调整：

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `bytedesk.ai.searxng.enabled` | 功能开关，默认关闭 | `false` |
| `bytedesk.ai.searxng.base-url` | SearXNG 服务地址 | 见上文两种部署方式 |
| `bytedesk.ai.searxng.timeout-ms` | 请求超时时间（毫秒） | `10000` |
| `bytedesk.ai.searxng.max-results` | 最多返回的搜索结果条数 | `5` |
| `bytedesk.ai.searxng.language` | 搜索语言，如 `zh-CN`、`en-US`、`all` | 跟随部署 profile |
| `bytedesk.ai.searxng.categories` | 搜索分类，如 `general`、`news`、`it` | 空（使用 SearXNG 默认） |
| `bytedesk.ai.searxng.safe-search` | 安全搜索级别：0 关闭 / 1 中等 / 2 严格 | `1` |

> 生产环境建议同时修改 `.env` 中的 `SEARXNG_SECRET`（SearXNG 实例密钥），避免使用默认值。

## 验证是否生效

确认微语已开启调试模式（`bytedesk.debug=true`）后，可直接在浏览器中访问以下地址测试：

| 接口 | 地址 | 作用 |
| --- | --- | --- |
| 状态检查 | `http://127.0.0.1:9003/spring/ai/api/v1/searxng/status` | 查看配置与服务连通性 |
| 联网搜索 | `http://127.0.0.1:9003/spring/ai/api/v1/searxng/search?query=bytedesk` | 返回原始搜索结果 |
| 搜索 + AI 总结 | 见下方命令 | 搜索后由大模型总结回答 |

搜索 + AI 总结（需已在微语中配置大模型）：

```bash
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/searxng/chat \
  -H 'Content-Type: application/json' \
  -d '{"message": "微语bytedesk是什么", "query": "bytedesk 微语", "maxResults": 5}'
```

看到返回结果中包含网页标题、链接与摘要，即说明联网搜索已生效。

## 常见问题

### 为什么搜索结果为空？

先打开 `http://127.0.0.1:18888` 用同样关键词手动搜索：若页面也无结果，说明是 SearXNG 侧部分引擎不可达（国内网络下 Google、DuckDuckGo 等引擎超时属正常现象）。微语默认配置已启用 Bing 与百度引擎，国内外服务器均可使用；若仍为空，请检查服务器的外网访问。

### 为什么提示 "Service is not available"？

微语未开启调试模式（需 `bytedesk.debug=true`），或当前为社区版（不包含企业版模块）。

### /chat 接口报 "ChatModel is not available"？

搜索 + AI 总结需要先在微语中配置可用的**大模型**；单独的 `/search` 搜索不依赖大模型，不受影响。

### 搜索数据会经过第三方吗？

不会。SearXNG 部署在您自己的服务器上，微语只与它通信；聚合查询由 SearXNG 直接发往各搜索引擎。

## 相关链接

- [SearXNG Docker 安装文档](https://docs.searxng.org/admin/installation-docker.html#installation-container)：官方 Docker 部署指南
- [SearXNG Docker 镜像](https://hub.docker.com/r/searxng/searxng)：Docker Hub 官方镜像页面
- [SearXNG GitHub 仓库](https://github.com/searxng/searxng)：开源项目源码仓库
