---
sidebar_label: 知識圖譜
sidebar_position: 82
---

<!-- markdownlint-disable MD060 MD033 -->

# 知識圖譜（Neo4j）

:::tip 提示
本功能社群版不可用，請升級到企業版或平台版，並替換 [licenseKey](../development/license.md)。
:::

知識圖譜功能讓微語把知識組織成一張**相互連接的知識網路**——常見問題、分類、產品之間透過「相關」「歸屬」「提及」等關係連接起來。AI 不再只能逐個關鍵字比對，還可以沿著這些關聯找到**相關但問法不同**的知識，為更聰明的問答（GraphRAG）打下基礎。

微語透過自行部署的 [Neo4j](https://github.com/neo4j/neo4j) 圖資料庫（社群版）實現該能力。所有資料都運行在您自己的伺服器上——**知識資料不會經過任何第三方雲服務**。

:::info 目前階段
本版本交付的是知識圖譜底座：Docker 部署、功能開關、連通性檢查與演示介面。基於圖譜的檢索增強（GraphRAG）將在後續版本開放。您現在就可以開啟，並在 Neo4j Browser 中直觀查看演示圖譜。
:::

## 使用前提

| 前提 | 說明 |
| --- | --- |
| 版本 | 企業版或平台版（社群版映像檔不含此功能） |
| Neo4j 服務 | 透過 Docker 啟動（見下方第一步） |
| 應用開關 | `bytedesk.ai.neo4j.enabled=true` |

## 如何開啟（管理員操作）

三步走：啟動圖資料庫 → 打開微語開關 → 重新啟動微語。

### 第一步：啟動 Neo4j 服務

在伺服器上進入 `deploy/docker` 目錄，在啟動腳本後面附加 `neo4j` 關鍵字：

```bash
cd deploy/docker

# 與中介軟體棧一起啟動
./start.sh middleware neo4j

# 或在全量啟動時附加
./start.sh all neo4j
```

啟動後，瀏覽器開啟 `http://127.0.0.1:17474`——能看到 Neo4j Browser 登入頁即說明服務就緒。預設帳號 `neo4j`，密碼取自 `.env` 中的 `NEO4J_PASSWORD`（預設 `bytedesk-neo4j`）。登入時請把連線位址填為 `127.0.0.1:17687`——Bolt 映射到宿主機 17687 連接埠，而非預設的 7687（見下方常見問題）。

import Neo4j from '/img/neo4j/neo4j-login.png';

<img src={Neo4j} alt="登录窗口" width="360" />

### 第二步：打開微語側開關

**Docker 部署**：編輯 `deploy/docker/.env`，增加：

```bash
BYTEDESK_AI_NEO4J_ENABLED=true
BYTEDESK_AI_NEO4J_PASSWORD=bytedesk-neo4j   # 與 NEO4J_PASSWORD 保持一致
# 應用與 Neo4j 在同一 docker 網路時，預設位址
# bolt://neo4j-bytedesk:7687 無需修改。
```

**原始碼本地運行**：編輯 `starter/src/main/resources/properties/local/ai-neo4j.properties`：

```properties
bytedesk.ai.neo4j.enabled=true
bytedesk.ai.neo4j.uri=bolt://127.0.0.1:17687
bytedesk.ai.neo4j.password=bytedesk-neo4j
```

### 第三步：重新啟動微語

重新執行啟動命令（或重建應用容器）後生效。

## 配置參數

所有參數均可在 `ai-neo4j.properties` 中調整（或透過對應環境變數）：

| 參數 | 說明 | 預設值 |
| --- | --- | --- |
| `bytedesk.ai.neo4j.enabled` | 功能開關 | `false` |
| `bytedesk.ai.neo4j.uri` | Neo4j 連線位址 | 視部署方式而定（見上文） |
| `bytedesk.ai.neo4j.username` | 使用者名稱（不可改，只能是 `neo4j`） | `neo4j` |
| `bytedesk.ai.neo4j.password` | 密碼（與 `NEO4J_PASSWORD` 保持一致） | `bytedesk-neo4j` |
| `bytedesk.ai.neo4j.database` | 資料庫名稱（社群版僅支援單庫） | `neo4j` |
| `bytedesk.ai.neo4j.connect-timeout-ms` | 連線逾時（毫秒） | `10000` |
| `bytedesk.ai.neo4j.max-connection-pool-size` | 最大連線池 | `10` |

> 生產環境請修改 `.env` 中的 `NEO4J_PASSWORD`，不要保留預設值。注意：初始密碼**僅在資料卷為空的首次啟動時生效**，詳見下方常見問題。

## 驗證是否生效

在除錯模式（`bytedesk.debug=true`）下，可直接在瀏覽器開啟以下位址：

| 介面 | 位址 | 用途 |
| --- | --- | --- |
| 狀態 | `http://127.0.0.1:9003/spring/ai/api/v1/neo4j/status` | 配置與連通性檢查 |
| 寫入演示 | 下方命令 | 寫入一小份演示知識圖譜 |
| 查看演示圖譜 | `http://127.0.0.1:9003/spring/ai/api/v1/neo4j/graph-demo?limit=100` | 回傳演示節點與關係 |
| 清理演示 | 下方命令 | 刪除演示資料 |

```bash
# 寫入演示圖譜（冪等，可重複執行）
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/neo4j/seed-demo

# 清理演示資料
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/neo4j/clear-demo
```

若 `/status` 回傳 `"health": "up"`，且 `graph-demo` 能回傳節點與關係，說明知識圖譜鏈路已通。

**直觀查看**：瀏覽器開啟 `http://127.0.0.1:17474`，用配置的帳號登入。**注意：連線位址必須使用宿主機連接埠 `17687`**——在連線對話框中把 Connection URL 從預設的 `127.0.0.1:7687` 改為 `127.0.0.1:17687`（本部署把 `17687` 映射到容器 `7687`，宿主機 7687 並未開放，不改會報 "Connection to instance failed"，見下方常見問題）。連線後執行 `MATCH (n) RETURN n`，即可看到由點和線畫出的演示圖譜。

![neo4j-graph](/img/neo4j/neo4j-graph.png)

## 常見問題

### 為什麼提示 "Service is not available"？

除錯模式未開啟（需要 `bytedesk.debug=true`），或者您運行的是社群版（不包含企業版模組）。

### Neo4j Browser 登入時提示 "Connection to instance failed"？

Browser 登入對話框預設連線 `bolt://127.0.0.1:7687`，而本部署將 Bolt 映射到宿主機 **17687** 連接埠（`compose-neo4j.yaml` 中的 `17687:7687`）。宿主機 7687 連接埠沒有服務監聽，瀏覽器的 WebSocket 連線因此被拒絕（報 `ServiceUnavailable: WebSocket connection failure`）。請在 "Connect to instance" 對話框中把 **Connection URL** 改為 `127.0.0.1:17687`（即 `neo4j://127.0.0.1:17687`），使用者名稱保持 `neo4j`、密碼取 `NEO4J_PASSWORD`，再點擊 Connect。若 "Recent connections" 中存有舊的 `127.0.0.1:7687` 記錄，請勿直接選用。

### 修改了 `.env` 裡的 `NEO4J_PASSWORD`，為什麼微語還是連不上？

初始密碼**僅在資料卷為空的首次啟動時生效**。資料卷已存在時，修改 `.env` 不會覆蓋庫內舊密碼。解決辦法任選其一：繼續使用舊密碼（把 `BYTEDESK_AI_NEO4J_PASSWORD` 改成與舊密碼一致）、在 Neo4j 內部修改密碼，或停止服務後刪除資料卷重新初始化（`docker volume rm bytedesk_neo4j-data`）。

### 沒有部署 Neo4j，微語會啟動失敗嗎？

不會。開關預設關閉，只有明確設定 `bytedesk.ai.neo4j.enabled=true` 才會連線 Neo4j；開關關閉時，即使位址或密碼配置錯誤也不影響啟動。

### 演示資料和我真實的知識庫是什麼關係？

演示介面只寫入和讀取帶 `BytedeskDemo` 標籤的資料，與業務資料完全隔離；`clear-demo` 也只刪除演示資料。

## 參考連結

- [Neo4j Docker 入門指南（官方文件）](https://neo4j.com/docs/operations-manual/current/docker/introduction/)
- [Neo4j Docker 映像檔（Docker Hub）](https://hub.docker.com/_/neo4j)
- [Neo4j GitHub 儲存庫](https://github.com/neo4j/neo4j)
