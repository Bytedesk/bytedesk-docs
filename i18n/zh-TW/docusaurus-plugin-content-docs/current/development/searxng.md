---
sidebar_label: 網路搜尋
sidebar_position: 81
---

# 網路搜尋（SearXNG）

:::tip 提示
社區版不支援，請升級到企業版或平台版。請替換[licenseKey](../development/license.md)
:::

網路搜尋功能讓微語的 AI 助理能夠**即時檢索網際網路上的最新資訊**，並結合搜尋結果回答問題。無論是產品價格、新聞動態還是技術資料，AI 都可以先「上網查一查」再回答，讓答案更即時、更可靠。

## 功能介紹

微語透過自行部署的 [SearXNG](https://github.com/searxng/searxng)（開源元搜尋引擎）實現網路搜尋：它會同時向 Google、Bing、百度等多個搜尋引擎發起查詢，聚合去重後回傳結果。整個過程運行在您自己的伺服器上，**搜尋行為不經過任何第三方雲服務**，資料安全可控。

網路搜尋適合以下場景：

- **時效性問題**：最新價格、政策、新聞等，模型訓練資料可能滯後，聯網後可取得即時資訊
- **資料查詢**：讓 AI 基於搜尋結果總結答案，並在回答末尾附上來源連結
- **知識庫補充**：知識庫沒有覆蓋的問題，可藉助網路搜尋兜底

## 使用前提

| 條件 | 說明 |
| --- | --- |
| 版本 | 企業版或平台版（社區版映像中不包含此功能） |
| SearXNG 服務 | 已透過 Docker 啟動（見下文第一步） |
| 應用開關 | `bytedesk.ai.searxng.enabled=true` |

## 如何開啟（管理員操作）

整個過程分三步：啟動搜尋服務 → 開啟微語開關 → 重新啟動微語。

### 第一步：啟動 SearXNG 搜尋服務

在伺服器上進入 `deploy/docker` 目錄，使用啟動腳本附加 `searxng` 關鍵字（也可寫作 `search`）：

```bash
cd deploy/docker

# 與中介軟體一起啟動
./start.sh middleware searxng

# 或在啟動完整服務時附帶
./start.sh all searxng
```

啟動後，瀏覽器開啟 `http://127.0.0.1:18888` 能看到 SearXNG 搜尋頁面，說明服務已就緒。

### 第二步：開啟微語側開關

**Docker 部署**：編輯 `deploy/docker/.env`，加入：

```bash
BYTEDESK_AI_SEARXNG_ENABLED=true
# 應用與 SearXNG 在同一 docker 網路時，位址預設為 http://searxng-bytedesk:8080，無需修改
```

**原始碼本地運行**：`starter/src/main/resources/properties/local/ai-searxng.properties` 中預設已開啟，位址為 `http://127.0.0.1:18888`，無需額外設定。

### 第三步：重新啟動微語

重新執行啟動命令（或重建應用容器）使設定生效。

## 設定參數說明

以下參數均可在設定檔 `ai-searxng.properties`（或對應環境變數）中調整：

| 參數 | 說明 | 預設值 |
| --- | --- | --- |
| `bytedesk.ai.searxng.enabled` | 功能開關，預設關閉 | `false` |
| `bytedesk.ai.searxng.base-url` | SearXNG 服務位址 | 見上文兩種部署方式 |
| `bytedesk.ai.searxng.timeout-ms` | 請求逾時時間（毫秒） | `10000` |
| `bytedesk.ai.searxng.max-results` | 最多回傳的搜尋結果條數 | `5` |
| `bytedesk.ai.searxng.language` | 搜尋語言，如 `zh-CN`、`en-US`、`all` | 跟隨部署 profile |
| `bytedesk.ai.searxng.categories` | 搜尋分類，如 `general`、`news`、`it` | 空（使用 SearXNG 預設） |
| `bytedesk.ai.searxng.safe-search` | 安全搜尋級別：0 關閉 / 1 中等 / 2 嚴格 | `1` |

> 正式環境建議同時修改 `.env` 中的 `SEARXNG_SECRET`（SearXNG 實例金鑰），避免使用預設值。

## 驗證是否生效

確認微語已開啟除錯模式（`bytedesk.debug=true`）後，可直接在瀏覽器中存取以下位址測試：

| 介面 | 位址 | 作用 |
| --- | --- | --- |
| 狀態檢查 | `http://127.0.0.1:9003/spring/ai/api/v1/searxng/status` | 檢視設定與服務連通性 |
| 網路搜尋 | `http://127.0.0.1:9003/spring/ai/api/v1/searxng/search?query=bytedesk` | 回傳原始搜尋結果 |
| 搜尋 + AI 總結 | 見下方命令 | 搜尋後由大模型總結回答 |

搜尋 + AI 總結（需已在微語中設定大模型）：

```bash
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/searxng/chat \
  -H 'Content-Type: application/json' \
  -d '{"message": "微語bytedesk是什麼", "query": "bytedesk 微語", "maxResults": 5}'
```

看到回傳結果中包含網頁標題、連結與摘要，即說明網路搜尋已生效。

## 常見問題

### 為什麼搜尋結果為空？

先開啟 `http://127.0.0.1:18888` 用同樣關鍵字手動搜尋：若頁面也無結果，說明是 SearXNG 側部分引擎不可達（中國大陸網路下 Google、DuckDuckGo 等引擎逾時屬正常現象）。微語預設設定已啟用 Bing 與百度引擎，國內外伺服器均可使用；若仍為空，請檢查伺服器的外網存取。

### 為什麼提示 "Service is not available"？

微語未開啟除錯模式（需 `bytedesk.debug=true`），或目前為社區版（不包含企業版模組）。

### /chat 介面報 "ChatModel is not available"？

搜尋 + AI 總結需要先在微語中設定可用的**大模型**；單獨的 `/search` 搜尋不依賴大模型，不受影響。

### 搜尋資料會經過第三方嗎？

不會。SearXNG 部署在您自己的伺服器上，微語只與它通訊；聚合查詢由 SearXNG 直接發往各搜尋引擎。

## 相關連結

- [SearXNG Docker 安裝文件](https://docs.searxng.org/admin/installation-docker.html#installation-container)：官方 Docker 部署指南
- [SearXNG Docker 映像檔](https://hub.docker.com/r/searxng/searxng)：Docker Hub 官方映像檔頁面
- [SearXNG GitHub 儲存庫](https://github.com/searxng/searxng)：開源專案原始碼儲存庫
