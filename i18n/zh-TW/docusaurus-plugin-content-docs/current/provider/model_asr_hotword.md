---
sidebar_label: ASR 熱詞
sidebar_position: 27
---

# ASR 語音辨識自訂熱詞

微語客服系統支援 ASR 語音辨識自訂熱詞（Vocabulary）能力，可建立熱詞列表並同步至阿里雲百煉平台，用於提升特定詞語的 ASR 語音辨識準確率。管理員可在後台管理熱詞列表，即時查看同步狀態，並一鍵從阿里雲拉取最新狀態。

## 一、ASR 熱詞可以解決什麼問題

- **提升專有名詞辨識率**：將產品名稱、品牌名、專業術語等新增為熱詞，顯著提升 ASR 對這些詞語的辨識準確率
- **行業術語最佳化**：針對醫療、法律、金融等行業，將高頻行業用語新增為熱詞，讓語音辨識更貼合業務場景
- **多語種支援**：支援為不同語種（中／英／日／粵／韓／德／法／俄）配置熱詞權重，滿足國際化需求
- **集中管理**：所有熱詞列表統一在後台管理，支援增刪改查與同步狀態追蹤

## 二、核心概念

| 概念 | 說明 |
| ---- | ---- |
| **熱詞列表（Vocabulary）** | 一組熱詞項集合，建立並同步至阿里雲後，可在 ASR 辨識時引用以提升特定詞語辨識率 |
| **熱詞項** | 每條熱詞包含 `text`（熱詞文本）、`weight`（權重 1-5，預設 4）、`lang`（可選語種） |
| **prefix** | 熱詞列表自訂前綴，僅允許數字和小寫字母，長度 ≤ 10 字元，用於列表標識和篩選 |
| **targetModel** | 目標語音辨識模型（如 `fun-asr`、`paraformer-v2`），熱詞列表必須與後續 ASR 呼叫使用的模型一致 |
| **vocabularyId** | 阿里雲返回的熱詞列表唯一標識（如 `vocab-testpfx-xxxx`） |

### 熱詞項約束

| 欄位 | 約束 |
| ---- | ---- |
| `text` | 必填；含非 ASCII 字元時不超過 15 個字元；純 ASCII 時按空格分隔片段不超過 7 個 |
| `weight` | 必填，範圍 1-5，預設 4 |
| `lang` | 可選，支援 `zh` / `en` / `ja` / `yue` / `ko` / `de` / `fr` / `ru` |

## 三、支援的目標模型

| 模型 ID | 說明 |
| ------- | ---- |
| `fun-asr` | Fun-ASR 語音辨識模型 |
| `paraformer-v2` | Paraformer V2 語音辨識模型 |

> 首版支援的模型範圍以阿里雲百煉平台當前支援為準，後續可按平台更新擴展。

## 四、管理後台功能介紹

### 1. 熱詞列表

在 AI 客服管理 → 智慧體頁面中，切換到「熱詞」頁籤，可查看當前組織下所有熱詞列表。列表以 ProTable 形式展示，包含以下欄位：

- **熱詞列表名稱**：使用者自訂名稱
- **目標模型**：選擇的目標 ASR 辨識模型
- **前綴**：熱詞列表前綴標識
- **熱詞列表 ID**：阿里雲返回的 vocabularyId，可複製
- **狀態**：PENDING（待同步）／OK（已就緒）／UNDEPLOYED（不可呼叫）／FAILED（同步失敗）／DELETED（已刪除）

支援的操作：

- 按名稱、目標模型、前綴、狀態篩選
- 新建熱詞列表
- 編輯熱詞內容
- 同步狀態（從阿里雲拉取最新狀態）
- 刪除（同時刪除遠端阿里雲熱詞列表）

### 2. 新建／編輯熱詞 Drawer

點擊「新建熱詞列表」或行操作「編輯」，開啟側邊抽屜填寫以下資訊：

| 欄位 | 說明 | 必填 |
| ---- | ---- | ---- |
| 熱詞列表名稱 | 自訂名稱，如「產品詞庫」 | ✅ |
| 目標模型 | 從下拉列表中選擇 `fun-asr` 或 `paraformer-v2` | ✅ |
| 前綴 | 數字 + 小寫字母，≤ 10 字元，如 `prod`、`sku` | ✅ |
| 描述 | 可選說明 | ❌ |
| 類型 | 熱詞適用場景（THREAD／VISITOR／CUSTOMER／TICKET） | ❌ |

#### 熱詞編輯器

在 Drawer 中可逐條編輯熱詞內容：

- 每行包含：熱詞文本 + 權重（1-5）+ 語種（下拉可選）
- 支援新增／刪除行
- 支援多行文本批量貼上匯入（每行一個熱詞，預設 weight=4，lang 留空）
- 儲存為 JSON 陣列提交到 `vocabulary` 欄位

> **注意**：新建成功後獲得 `vocabularyId`，再次編輯時不允許修改 `prefix` 和 `targetModel`，避免與遠端資源錯位。編輯已同步的熱詞列表時，僅允許更新熱詞內容、名稱和描述。

### 3. 同步狀態

點擊列表操作列的「同步狀態」按鈕：

- 從阿里雲拉取最新狀態，更新本地記錄的 `status`、`errorMessage`、`rawResponse` 等欄位
- 同步失敗時在列表錯誤資訊列顯示可讀的失敗原因

### 4. 遠端查詢（可選增強）

- **遠端列表**：查詢阿里雲遠端熱詞列表（不落庫）
- **遠端詳情**：按 `vocabularyId` 查詢阿里雲遠端熱詞完整內容

## 五、權限控制

ASR 熱詞功能的權限模組為 `ASR_HOTWORD`，包含以下子權限：

| 權限 | 說明 | 適用介面 |
| ---- | ---- | -------- |
| `ASR_HOTWORD_READ` | 查看 | 查詢列表、遠端查詢 |
| `ASR_HOTWORD_CREATE` | 建立 | 新建熱詞列表 |
| `ASR_HOTWORD_UPDATE` | 更新 | 編輯熱詞、同步狀態 |
| `ASR_HOTWORD_DELETE` | 刪除 | 刪除熱詞列表 |
| `ASR_HOTWORD_EXPORT` | 匯出 | Excel 匯出 |

僅具備相應權限且在 Enterprise／Platform 版本中，AI 智慧體頁面才會顯示「熱詞」頁籤。

## 六、API 端點一覽

| 方法 | 路徑 | 權限 | 說明 |
| ---- | ---- | ---- | ---- |
| GET | `/api/v1/asr_hotword/query/org` | READ | 按組織查詢熱詞列表 |
| GET | `/api/v1/asr_hotword/query/user` | READ | 按使用者查詢熱詞列表 |
| GET | `/api/v1/asr_hotword/query/uid` | READ | 按 UID 查詢單筆 |
| POST | `/api/v1/asr_hotword/create` | CREATE | 建立熱詞列表（含遠端同步） |
| POST | `/api/v1/asr_hotword/update` | UPDATE | 更新熱詞列表（含遠端同步） |
| POST | `/api/v1/asr_hotword/delete` | DELETE | 刪除熱詞列表（含遠端刪除） |
| GET | `/api/v1/asr_hotword/export` | EXPORT | Excel 匯出 |
| POST | `/api/v1/asr_hotword/sync` | UPDATE | 從阿里雲同步熱詞狀態 |
| POST | `/api/v1/asr_hotword/remote/list` | READ | 查詢阿里雲遠端熱詞列表 |
| POST | `/api/v1/asr_hotword/remote/detail` | READ | 查詢阿里雲遠端熱詞詳情 |

## 七、同步策略

ASR 熱詞管理採用「本地編輯 + 即時遠端同步」策略：

| 操作 | 同步時機 | 行為 |
| ---- | -------- | ---- |
| 建立 | 儲存時同步呼叫 | 先調阿里雲建立 → 獲取 `vocabularyId` → 入庫（status=OK） |
| 更新 | 儲存時同步呼叫 | 先調阿里雲全量更新 → 更新本地記錄 |
| 刪除 | 刪除時同步呼叫 | 先調阿里雲刪除 → 軟刪除本地記錄 |
| 同步 | 手動觸發 | 按 `vocabularyId` 或 `prefix` 從阿里雲拉取最新狀態 |

**失敗處理**：

- 遠端呼叫失敗時，本地記錄 `status` 寫為 `FAILED`，同時儲存 `errorMessage` 和 `rawResponse`
- 遠端刪除返回「資源不存在」類結果時，視為刪除成功，正常軟刪除本地記錄

## 八、配置說明

ASR 熱詞能力基於阿里雲百煉 DashScope 平台提供。使用前需在 `application.properties` 中配置以下參數：

```properties
# DashScope API Key（沿用現有 ASR 配置）
spring.ai.dashscope.audio.transcription.api-key=${spring.ai.dashscope.api-key:${DASHSCOPE_API_KEY:}}

# 阿里雲百煉 WorkspaceId
bytedesk.ai.dashscope.workspace-id=ws-xxxxxxxxxxxx

# 可選：區域配置（預設 cn-beijing）
bytedesk.ai.dashscope.region=cn-beijing

# 可選：自訂熱詞端點（優先級最高）
# bytedesk.ai.dashscope.asr-hotword.endpoint=https://custom.endpoint.com
```

> **注意**：阿里雲新加坡地域的子業務空間暫不支援熱詞功能。若使用新加坡地域，呼叫將返回明確錯誤提示。

## 九、技術實現

ASR 熱詞模組位於 `enterprise/ai` 模組，核心類別：

| 類別 | 職責 |
| --- | --- |
| `AsrHotwordEntity` | JPA 實體，儲存本地熱詞記錄與遠端同步狀態 |
| `AsrHotwordRestController` | CRUD 型 API（query / create / update / delete / export） |
| `AsrHotwordController` | 執行型 API（sync / remote list / remote detail） |
| `AsrHotwordRestService` | 核心業務邏輯，本地 CRUD + 呼叫同步編排 |
| `AsrHotwordSyncService` | 遠端同步編排層，封裝阿里雲 API 的 create／update／delete／query |
| `AliyunAsrHotwordClient` | 阿里雲 DashScope ASR 熱詞 HTTP API 客戶端 |
| `AliyunAsrHotwordApiResponse` | 阿里雲 API 回應正規化 DTO |
| `AsrHotwordStatusEnum` | PENDING / OK / UNDEPLOYED / FAILED / DELETED 列舉 |
| `AsrHotwordTypeEnum` | THREAD / VISITOR / CUSTOMER / TICKET 列舉（熱詞適用場景） |
| `AsrHotwordSpecification` | 查詢過濾條件建構 |
| `AsrHotwordPermissions` | 權限常數定義 |

### 端點解析優先級

阿里雲熱詞 API 端點按以下優先級解析：

1. 自訂端點：`bytedesk.ai.dashscope.asr-hotword.endpoint`
2. Workspace 端點：`{WorkspaceId}.{region}.maas.aliyuncs.com`
3. 公共端點 fallback：北京 `dashscope.aliyuncs.com`，新加坡 `dashscope-intl.aliyuncs.com`

## 十、參考連結

- [阿里雲 ASR 語音辨識自訂熱詞 Java SDK 參考](https://help.aliyun.com/zh/model-studio/vocabulary-java-sdk)
- [阿里雲 ASR 語音辨識自訂熱詞 HTTP API 參考](https://help.aliyun.com/zh/model-studio/vocabulary-http-api)
