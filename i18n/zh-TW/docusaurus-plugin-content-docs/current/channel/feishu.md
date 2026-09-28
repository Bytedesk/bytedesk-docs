---
sidebar_label: Feishu
sidebar_position: 14
---

# 飛書

飛書渠道整合說明。完整圖文步驟（企業自建應用對接、內部群聊 Webhook 機器人）請查看[簡體中文版飛書文件](https://www.weiyuai.cn/zh-CN/docs/channel/feishu)。

## 飛書知識庫匯入

適合場景：把飛書知識空間（Wiki）中的文件同步到微語大模型知識庫，同步後自動建立全文索引與向量索引，直接用於 AI 客服問答。

同步能力基於企業自建應用實現，需先在[飛書開放平台](https://open.feishu.cn/app)建立自建應用（取得 App ID/App Secret 並發布），再按下列步驟操作。

### 1. 開通知識庫相關權限

在應用的 **權限管理** 中搜尋並開通以下權限：

| 權限 | 說明 |
| --- | --- |
| `wiki:wiki:readonly` | 讀取知識庫空間列表和節點樹 |
| `drive:drive:readonly` | 讀取雲文件基礎資訊 |
| `drive:export:readonly` | 匯出文件內容（docx/xlsx） |
| `docx:document:readonly` | 讀取新版文件內容 |

![feishu_add_permissions](/img/feishu/feishu_add_permissions.png)

開通權限後，需要**重新發布應用版本**使權限生效。

> **docx 內嵌內容下鑽權限（可選）**
>
> 若需同步 docx 文件中內嵌的附件和圖片，還需額外開通以下權限（缺失時自動回退到匯出 docx，不會同步失敗，僅無法取得內嵌表格/附件）：
>
> - `docx:document:readonly` — 讀取文件區塊（上表已含，此處僅供核對）
> - `drive:drive:readonly` / `docs:document.media:download` — 下載附件、圖片
> - `sheets:spreadsheet:readonly` — 讀取內嵌電子表格
> - `bitable:app:readonly` — 讀取內嵌多維表格

### 2. 將應用加入為知識空間成員（重要）

僅開通權限還不夠：應用必須被加入為目標知識空間的成員，才能讀到該空間的內容。

1. 在飛書用戶端開啟目標知識庫，點擊知識庫底部的 **知識庫設定** 按鈕：

   ![feishu_kbase_settings](/img/feishu/feishu_kbase_settings.png)

2. 進入 **成員設定**，點擊 **新增成員**，切換到 **應用** 頁籤：

   ![feishu_kbase_add_member_1](/img/feishu/feishu_kbase_add_member_1.png)

3. 搜尋並加入你建立的自建應用，為應用授予至少 **可閱讀** 權限：

   ![feishu_kbase_add_member_2](/img/feishu/feishu_kbase_add_member_2.png)

若跳過此步，同步時空間列表會為空。

### 3. 在微語後台綁定飛書應用

1. 開啟微語管理後台 → **知識庫** → **大模型** → **飛書文件**。
2. 點擊 **綁定飛書應用**：可選擇已有飛書應用，或直接新建（填寫 App ID、App Secret；Base URL 預設 `https://open.feishu.cn`，Lark 國際版填 `https://open.larksuite.com`）。
3. 綁定成功後，頁面頂部會顯示已綁定的應用資訊。

![feishu_kbase_bind](/img/feishu/feishu_kbase_bind.png)

### 4. 同步文件

1. 點擊 **同步文件**，開啟同步彈窗。
2. 選擇要同步的知識空間：**支援多選**（下拉列表已自動去重）；不選擇則同步全部空間（會彈窗二次確認，文件較多時耗時較長）。
3. 點擊 **開始同步**，完成後會提示統計結果：總數、新建、更新、失敗、刪除、不支援。

說明：

- 當前僅支援**新版文件（docx）**；舊版 doc、電子表格、多維表格、思考筆記等類型會計入「不支援」並跳過
- 同步為增量冪等：內容未變化的文件自動跳過，重複同步不會產生冗餘資料
- 飛書側已刪除的文件會被軟刪除，並同步清理全文/向量索引

![feishu_kbase_sync](/img/feishu/feishu_kbase_sync.png)

### 5. 查看同步記錄

同步記錄表格中可追蹤每篇文件的處理進度：

- **同步狀態**：NEW / PROCESSING / SUCCESS / ERROR
- **全文索引狀態**：Elasticsearch 寫入結果
- **向量索引狀態**：向量庫寫入結果（用於 AI 語義檢索）
- 文件標題可點擊跳轉回飛書原文

![feishu_kbase_list](/img/feishu/feishu_kbase_list.png)

### 常見問題

- **空間列表為空**：應用未加入為知識空間成員，或權限未開通/未重新發布版本。
- **全文索引狀態 ERROR**：檢查 Elasticsearch 是否已啟動（可用 `deploy/docker` 中的 compose 啟動）。
- **同步總數為 0**：確認所選空間內存在新版文件（docx）。
- **部分文件計入「不支援」**：這些文件是表格/思考筆記/文件等類型，當前版本不支援，不影響其他文件同步。
