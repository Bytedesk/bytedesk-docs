---
slug: feishu-kbase-import
title: "微語支援從飛書知識庫匯入內容到微語知識庫"
authors: jackning
tags: [bytedesk, 飛書, 知識庫, AI]
---

企業的知識資產大量沉澱在飛書知識庫（知識空間/Wiki）中，但要讓 AI 客服用上這些知識，往往還需要人工「搬運」：匯出、格式轉換、重新錄入。微語（Bytedesk）新增飛書知識庫匯入能力：在管理後台綁定飛書應用、選擇知識空間，即可把飛書文件一鍵同步進微語大模型知識庫，同步完成後自動建立全文索引與向量索引，直接用於 AI 客服問答。

<!-- truncate -->

## 它能解決什麼問題

- **知識分散**：產品手冊、FAQ、內部規範都在飛書知識庫裡，客服系統和 AI 問答卻用不上
- **重複維護**：同一份文件要在飛書和客服知識庫裡各維護一份，極易不同步
- **接入門檻高**：自行開發同步程式需要處理飛書開放平台鑑權、分頁、增量去重、索引更新等一堆細節

現在，微語把這些全部內建：綁定一次，隨時手動（後續支援定時）同步。

## 功能特性

### 1. 綁定飛書應用

在「管理後台 → 知識庫 → 大模型 → 飛書文件」頁面，點擊「綁定飛書應用」：

- **選擇已有應用**：複用渠道模組中已配置的飛書自建應用，綁定到當前知識庫
- **新建應用**：直接填寫 `App ID`、`App Secret`（Base URL 預設 `https://open.feishu.cn`，Lark 國際版填 `https://open.larksuite.com`）

![feishu_kbase_bind](/img/feishu/feishu_kbase_bind.png)

### 2. 多空間選擇同步

點擊「同步文件」，下拉**支援多選**知識空間（自動去重）；不選擇則同步該應用可存取的全部空間（會二次確認，防止誤觸發大批量同步）。

![feishu_kbase_sync](/img/feishu/feishu_kbase_sync.png)

### 3. 增量冪等同步

- 基於「飛書應用 + 資源類型 + 文件 Token」做冪等 upsert：新文件入庫，已有文件內容變化才更新
- 內容雜湊（contentHash）比對：未變化的文件自動跳過，重複同步不產生冗餘寫入
- 刪除檢測：空間中已不存在的舊文件會軟刪除，並同步清理全文/向量索引

### 4. 三類狀態可視化

同步記錄表格中可以分別追蹤每篇文件的處理進度：

- **同步狀態**：NEW / PROCESSING / SUCCESS / ERROR
- **全文索引狀態**：Elasticsearch 寫入結果
- **向量索引狀態**：向量庫寫入結果（用於 AI 語義檢索）

![feishu_kbase_list](/img/feishu/feishu_kbase_list.png)

文件標題可點擊跳轉回飛書原文，方便核對內容。

## 需要的飛書權限

在飛書開放平台為應用開通以下權限（權限管理中搜尋權限標識即可）：

| 權限標識 | 用途 |
| --- | --- |
| `wiki:wiki:readonly` | 列出知識空間與節點樹 |
| `docx:document:readonly` | 讀取新版文件（docx）純文字內容 |

同時，需要把應用**加入為目標知識空間的成員**（至少「可閱讀」權限），否則同步時空間列表為空。詳細步驟見[飛書對接文件](/docs/channel/feishu)。

## 當前限制與路線圖

- 當前僅支援**新版文件（docx）**；舊版 doc、電子表格、多維表格、思考筆記等類型會標記為「不支援」並跳過
- 同步為手動觸發；定時自動同步、飛書雲碟、Webhook 事件驅動增量同步在路線圖中

## 線上演示

- 官網演示環境：[https://www.weiyuai.cn/admin](https://www.weiyuai.cn/admin)（知識庫 → 大模型 → 飛書文件）
- GitHub：[https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)

歡迎體驗並回饋，讓我們一起把企業知識更順暢地接入 AI 客服。
