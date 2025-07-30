---
sidebar_label: 檔案上傳
sidebar_position: 32
---

# 檔案上傳

微語系統支援兩種檔案儲存方式：**本地檔案系統** 和 **MinIO物件儲存**。系統預設使用本地檔案系統儲存，只有當 `bytedesk.minio.enabled=true` 時才會使用MinIO物件儲存。您可以根據實際需求選擇合適的儲存方式。

## 配置說明

### 1. 本地檔案系統儲存

本地檔案系統儲存將檔案保存在伺服器的本地目錄中，適合小規模部署和測試環境。

```properties
# ===============================
#= Upload config
# ===============================
# 儲存類型：local 表示本地檔案系統
bytedesk.upload.type=local
# 上傳目錄，注意不要以 '/' 結尾
# 範例：bytedesk.upload.dir=/var/www/html/weiyuai/file
bytedesk.upload.dir=uploads
# 上傳檔案的存取地址，請將127.0.0.1替換為伺服器實際的IP地址或網域名稱
bytedesk.upload.url=http://127.0.0.1:9003
```

**配置說明：**

- `bytedesk.upload.type=local`：設定為本地檔案系統儲存
- `bytedesk.upload.dir`：指定檔案儲存的本地目錄路徑
- `bytedesk.upload.url`：檔案存取的URL地址，需要將127.0.0.1替換為您的伺服器實際IP地址或網域名稱

### 2. MinIO物件儲存

MinIO是一個高效能的物件儲存服務，適合大規模部署和生產環境。

:::tip 詳細配置
有關 MinIO 的詳細安裝、配置和管理說明，請參考 [MinIO 物件儲存](../deploy/depend/minio.md) 文件。
:::

```properties
# ===============================
# = MinIO 物件儲存配置
# ===============================
# 是否啟用 MinIO 儲存
bytedesk.minio.enabled=false
# MinIO 服務地址，請將127.0.0.1替換為伺服器實際的IP地址或網域名稱
bytedesk.minio.endpoint=http://127.0.0.1:19000
# MinIO 存取金鑰
bytedesk.minio.access-key=minioadmin
# MinIO 金鑰
bytedesk.minio.secret-key=minioadmin123
# MinIO 儲存桶名稱
bytedesk.minio.bucket-name=bytedesk
# MinIO 區域
bytedesk.minio.region=us-east-1
# 是否使用 HTTPS
bytedesk.minio.secure=false
```

**配置說明：**

- `bytedesk.minio.enabled`：是否啟用MinIO儲存，預設為false。只有當設定為true時才會使用MinIO儲存，否則使用本地檔案系統儲存
- `bytedesk.minio.endpoint`：MinIO服務的存取地址，需要將127.0.0.1替換為您的伺服器實際IP地址或網域名稱
- `bytedesk.minio.access-key`：MinIO的存取金鑰ID
- `bytedesk.minio.secret-key`：MinIO的存取金鑰
- `bytedesk.minio.bucket-name`：MinIO儲存桶名稱
- `bytedesk.minio.region`：MinIO服務區域
- `bytedesk.minio.secure`：是否使用HTTPS協定

## Docker Compose 配置

如果您使用Docker部署，可以在`docker-compose.yaml`檔案中配置檔案上傳服務：

```yaml
# MinIO配置（當使用MinIO時）
BYTEDESK_MINIO_ENABLED=false
# MinIO服務的存取地址，請將127.0.0.1替換為伺服器實際的IP地址或網域名稱
BYTEDESK_MINIO_ENDPOINT=http://127.0.0.1:19000
BYTEDESK_MINIO_ACCESS_KEY=minioadmin
BYTEDESK_MINIO_SECRET_KEY=minioadmin123
BYTEDESK_MINIO_BUCKET_NAME=bytedesk
BYTEDESK_MINIO_REGION=us-east-1
BYTEDESK_MINIO_SECURE=false
```

## 儲存方式選擇

### 預設配置：本地檔案系統

系統預設使用本地檔案系統儲存，無需額外配置。適合以下場景：

- **適用場景**：開發測試、小規模部署
- **優點**：配置簡單，無需額外服務，開箱即用
- **缺點**：不支援分散式部署，儲存容量受限於伺服器磁碟

### 可選配置：MinIO物件儲存

當需要更高效能和擴展性時，可以啟用MinIO物件儲存：

- **啟用方式**：設定 `bytedesk.minio.enabled=true`
- **適用場景**：生產環境、大規模部署
- **優點**：支援分散式部署，高可用性，易於擴展
- **缺點**：需要額外部署MinIO服務

## 注意事項

1. **預設行為**：系統預設使用本地檔案系統儲存，無需額外配置
2. **MinIO啟用**：只有當 `bytedesk.minio.enabled=true` 時才會使用MinIO儲存
3. **URL配置**：確保`bytedesk.upload.url`配置為正確的伺服器地址，需要將127.0.0.1替換為伺服器實際IP地址或網域名稱，客戶端需要透過此地址存取上傳的檔案
4. **目錄權限**：使用本地檔案系統時，確保上傳目錄具有適當的讀寫權限
5. **儲存桶建立**：使用MinIO時，需要提前建立對應的儲存桶
6. **網路配置**：在Docker環境中，確保服務間網路通訊正常
