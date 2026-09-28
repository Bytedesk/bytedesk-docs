---
sidebar_label: 物件儲存
sidebar_position: 83
---

# 物件儲存（MinIO）

物件儲存功能讓微語把聊天中的**圖片、語音、視訊、檔案**等上傳內容保存到專門的儲存服務（[MinIO](https://github.com/minio/minio)）中，而不是應用伺服器的本地磁碟。對使用者來說操作完全一樣——照常傳送圖片和檔案即可，只是檔案最終存放的位置不同。

## 功能介紹

- **預設（本地儲存）**：上傳檔案保存在應用伺服器的本地目錄，適合單機小規模部署
- **開啟物件儲存後**：上傳檔案統一寫入 MinIO，適合以下場景：
  - 聊天檔案越來越多，不想佔用應用伺服器的磁碟空間
  - 多實例部署（多台應用伺服器）需要共享同一份檔案
  - 希望對檔案單獨擴容、備份和遷移
- **資料自主可控**：MinIO 部署在您自己的伺服器上，檔案不經過任何第三方雲服務
- **無縫相容其他功能**：線上檔案預覽（圖片、PDF、Office 文件等）對 MinIO 中的檔案同樣有效，參見[線上檔案預覽](./filepreview.md)
- 開啟後微語啟動時會**自動建立儲存貯體**（預設 `bytedesk`）並設定為公開讀取，無需手動建桶

## 使用前提

| 條件 | 說明 |
| --- | --- |
| Docker 環境 | 伺服器已安裝 Docker |
| MinIO 服務 | 已透過啟動指令碼拉起（見下文第一步） |
| 應用開關 | `bytedesk.minio.enabled=true` |

## 如何開啟（管理員操作）

整個過程分三步：啟動 MinIO 服務 → 開啟微語開關 → 重新啟動微語。

### 第一步：啟動 MinIO 服務

在伺服器上進入 `deploy/docker` 目錄，使用啟動指令碼追加 `minio` 關鍵字：

```bash
cd deploy/docker

# 與中介軟體一起啟動
./start.sh middleware minio

# 或在啟動完整服務時附帶
./start.sh all minio
```

啟動後，瀏覽器開啟 `http://127.0.0.1:19001` 能看到 MinIO Console 登入頁，說明服務已就緒。帳號密碼取自 `.env` 中的 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`（預設 `minioadmin` / `minioadmin123`）。

### 第二步：開啟微語側開關

**Docker 部署**：編輯 `deploy/docker/.env`，新增：

```bash
BYTEDESK_MINIO_ENABLED=true
# 應用容器與 MinIO 在同一 docker 網路時，位址預設 http://bytedesk-minio:9000，無需修改
# 存取金鑰自動使用 .env 中的 MINIO_ROOT_USER / MINIO_ROOT_PASSWORD，無需單獨配置
```

**原始碼本地執行**：編輯 `starter/src/main/resources/properties/local/minio.properties`：

```properties
bytedesk.minio.enabled=true
# endpoint 預設 http://127.0.0.1:19000（宿主機埠），無需修改
# access-key / secret-key 需與 .env 中 MINIO_ROOT_USER / MINIO_ROOT_PASSWORD 一致，
# 預設已配置好匹配預設帳號的金鑰，僅需將 enabled 改為 true
```

### 第三步：重新啟動微語

重新執行啟動命令（或重建應用容器）使配置生效。啟動日誌出現「MinIO 初始化完成，儲存貯體: bytedesk，策略: 公開讀取」即為開啟成功。

## 配置參數說明

以下參數均可在配置檔案 `minio.properties`（或對應環境變數）中調整：

| 參數 | 說明 | 預設值 |
| --- | --- | --- |
| `bytedesk.minio.enabled` | 是否啟用 MinIO 儲存，關閉時回退本地磁碟 | `false` |
| `bytedesk.minio.endpoint` | MinIO 服務位址 | 見上文兩種部署方式 |
| `bytedesk.minio.access-key` | 存取金鑰（與 `MINIO_ROOT_USER` 一致） | 部署環境相關 |
| `bytedesk.minio.secret-key` | 私有金鑰（與 `MINIO_ROOT_PASSWORD` 一致） | 部署環境相關 |
| `bytedesk.minio.bucket-name` | 儲存貯體名稱，啟動時自動建立 | `bytedesk` |
| `bytedesk.minio.region` | 區域標識 | `us-east-1` |
| `bytedesk.minio.secure` | 是否使用 HTTPS 存取 MinIO | `false` |

> 生產環境建議修改 `.env` 中的 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`，避免使用預設值；Docker 部署下微語側金鑰會自動跟隨，無需額外操作。

## 驗證是否生效

1. **看啟動日誌**：出現「MinIO 客戶端初始化成功」「MinIO 初始化完成，儲存貯體: bytedesk，策略: 公開讀取」
2. **傳一張圖片測試**：在聊天視窗傳送圖片後，右鍵複製圖片連結——位址開頭應是 MinIO 埠（如 `http://127.0.0.1:19000/bytedesk/images/...`），而不再是微語位址的 `/file/...` 路徑
3. **開啟 MinIO Console**：登入 `http://127.0.0.1:19001`，進入 Object Browser 的 `bytedesk` 桶，可看到按型別分目錄（`images`、`audios`、`videos` 等）存放的剛上傳檔案
4. **預覽測試**：點擊檔案訊息的預覽按鈕，圖片、PDF、Office 文件均可正常線上預覽

## 常見問題

### 開啟後上傳報錯？

依次檢查：MinIO 容器是否在執行（`docker ps | grep minio`）；`endpoint` 位址是否正確（Docker 部署用 `http://bytedesk-minio:9000` 容器內位址，原始碼本地執行用 `http://127.0.0.1:19000` 宿主機位址）；金鑰是否與 `.env` 中 `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` 一致。

### 關閉開關後，之前存到 MinIO 的檔案還能存取嗎？

關閉開關隻影響**新上傳**的檔案（改存本地磁碟）；已存入 MinIO 的檔案，其連結仍指向 MinIO，需要保持 MinIO 服務線上才能存取。建議存量資料繼續保留 MinIO 執行，或聯絡管理員做資料遷移。

### 檔案資料安全嗎？

MinIO 部署在您自己的伺服器上，檔案存取不經過任何第三方雲服務。注意：預設桶策略為**公開讀取**（知道檔案連結即可檢視），如有保密要求，可在 MinIO Console 中自行調整為私有讀寫並改用帶簽名的臨時連結。

### 社群版可以使用嗎？

可以。物件儲存屬於開源功能，社群版、企業版、平台版均可使用，無需額外授權。

### 物件儲存和本地儲存如何選擇？

單機小規模部署用預設本地儲存即可；出現以下情況建議開啟物件儲存：多實例部署需共享檔案、聊天檔案量大需獨立擴容、或需要對檔案做獨立備份和容災。

## 相關連結

- [MinIO 元件部署說明](../deploy/depend/minio.md)：部署依賴元件目錄中的 MinIO 說明
- [MinIO 官網](https://min.io)：產品介紹與下載
- [MinIO 官方文件](https://docs.min.io)：維運與管理文件
- [MinIO GitHub 儲存庫](https://github.com/minio/minio)：開源專案原始碼儲存庫
