---
sidebar_label: 線上檔案預覽
sidebar_position: 80
---

# 線上檔案預覽

線上檔案預覽功能讓您**無需下載檔案到本機**，直接在微語介面內查看聊天記錄和知識庫中的檔案內容。收到檔案訊息後，點擊即可預覽，就像查看圖片一樣簡單。

## 功能介紹

開啟預覽前，收到 Word、PDF 等檔案只能下載後用本機軟體開啟；開啟預覽後，點擊檔案即可直接查看內容，大幅提升溝通效率。該功能特別適用於：

- **客服與訪客溝通**：訪客發送的合約、報價單等檔案，客服可直接點開查看，無需下載
- **知識庫資料查閱**：管理員在知識庫上傳的產品手冊、說明文件，可線上翻閱
- **團隊協作**：同事間傳遞的檔案資料，即點即看，減少檔案管理負擔

### 支援預覽的檔案類型

| 檔案類型 | 常見格式 | 預覽方式 |
| --- | --- | --- |
| 圖片 | jpg、png、gif、webp 等 | 直接顯示 |
| PDF 文件 | pdf | 線上翻頁閱讀 |
| 文字檔案 | txt、md、json、日誌等 | 線上查看文字內容 |
| 音訊 | mp3、wav 等 | 線上播放 |
| 視訊 | mp4、webm 等 | 線上播放 |
| Office 文件 | doc/docx、xls/xlsx、ppt/pptx | 需伺服器開啟轉換後線上查看 |
| 壓縮檔、CAD 等 | zip、rar、dwg 等 | 暫不支援預覽，提示下載 |

## 使用方法

預覽功能在三個端的使用方式一致：找到檔案，點擊「預覽」即可。

### 1. 管理後台（知識庫檔案）

1. 進入管理後台的知識庫檔案列表；
2. 在檔案列表的操作列點擊「預覽」；
3. 彈窗中即可查看檔案內容，也可隨時下載或新視窗開啟。

### 2. 客服端（檔案訊息）

1. 在會話視窗中找到檔案類型的訊息氣泡；
2. 點擊氣泡下方的「預覽」按鈕（眼睛圖示）；
3. 彈窗中查看檔案內容。

### 3. 訪客端（檔案訊息）

訪客端的檔案訊息同樣支援線上預覽：

1. 在聊天視窗找到檔案訊息；
2. 點擊訊息氣泡下方的「預覽」按鈕；
3. 彈窗中查看檔案內容。

## Office 文件預覽說明

Word、Excel、PowerPoint 文件需要**伺服器端轉換為 PDF 後**才能線上查看，因此有以下特點：

1. **首次開啟需要等待**：系統會將文件自動轉換為 PDF，轉換期間會顯示「檔案轉換中，請稍候...」，通常幾秒到幾十秒（取決於檔案大小）；
2. **同一檔案只轉換一次**：轉換完成後會快取結果，再次開啟同一檔案時秒開；
3. **未開啟轉換時的表現**：若伺服器未啟用該能力，預覽 Office 文件時會提示「該格式暫不支援線上預覽，請下載查看」，此時可下載後用本機軟體開啟，其他功能不受影響。

### 如何開啟 Office 轉換（管理員操作）

Office 文件預覽預設關閉。支援兩種轉換模式：

| 模式 | 適用部署形態 | 原理 |
| --- | --- | --- |
| `local`（預設） | 直跑 jar / 自建全量映像 | jodconverter（已整合為 Java 函式庫）拉起部署環境安裝的 LibreOffice |
| `remote` | 官方（精簡）Docker 映像 | 透過 HTTP 呼叫 **gotenberg** 轉換 sidecar 容器（官方映像 `gotenberg/gotenberg:8`，自帶 LibreOffice 與中文字型） |

> 前端預覽按鈕僅在伺服器上報「已開啟且可用」時顯示（`/config/bytedesk/properties` 下發的 `preview.enabled` + `preview.available`）。安裝 LibreOffice 或啟動 gotenberg 後，重新整理頁面/重新登入即可看到按鈕。

#### 方式一：直跑 jar（mode=local，非 Docker 部署推薦）

轉換能力（jodconverter）已作為 Java 函式庫整合在微語中，只需**宿主機**安裝 LibreOffice 即可開啟，無需部署額外服務。

##### 第一步：安裝 LibreOffice

根據伺服器作業系統選擇對應命令：

**macOS**（Homebrew）：

```bash
brew install --cask libreoffice
```

**Ubuntu / Debian**：

```bash
sudo apt update
sudo apt install -y libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress
# 中文文件建議同時安裝中文字型，避免亂碼：
sudo apt install -y fonts-noto-cjk
```

**CentOS / RHEL / Rocky Linux**：

```bash
sudo yum install -y libreoffice-writer libreoffice-calc libreoffice-impress
# 中文字型：
sudo yum install -y google-noto-sans-cjk-ttc-fonts google-noto-serif-cjk-ttc-fonts
```


> Docker 部署的完整說明（gotenberg sidecar、環境變數開關、自建全量映像、驗證）見下方方式二。

> 說明：LibreOffice 安裝路徑會被自動探測，無需手動配置；僅當安裝在非標準位置時，才需要設定 `bytedesk.preview.convert.office-home` 指向其安裝目錄（如 macOS 的 `/Applications/LibreOffice.app/Contents`）。WPS 不能替代 LibreOffice。
>
> **注意：宿主機安裝的 LibreOffice 僅對直跑 jar 有效**——容器內的微語看不到宿主機安裝路徑，Docker 部署請用方式二（gotenberg sidecar）或自建全量映像。

##### 第二步：開啟配置並重啟

1. 修改設定檔，設定 `bytedesk.preview.convert.enabled=true`（`mode` 保持預設 `local`）；
2. 重新啟動微語服務。

#### 方式二：Docker 部署（mode=remote，gotenberg sidecar 推薦）

先說結論：**在宿主機上安裝 LibreOffice 無法被容器內的微語使用**。官方映像已精簡（不含 LibreOffice），Docker 部署推薦啟動 gotenberg 轉換 sidecar 並指向它：

```bash
cd deploy/docker
# 1. 啟動轉換 sidecar（官方映像 gotenberg/gotenberg:8，8.30.0+ 自帶中文字型）
./start.sh gotenberg
# 2. 在 .env 中開啟預覽：
#    BYTEDESK_PREVIEW_CONVERT_ENABLED=true
#    BYTEDESK_PREVIEW_CONVERT_MODE=remote
#    （BYTEDESK_PREVIEW_CONVERT_REMOTE_URL 預設 http://bytedesk-gotenberg:3000，無需填寫）
# 3. 重啟應用
./stop.sh && ./start.sh
```

gotenberg 僅在 compose 內網監聽（不映射宿主埠），主映像保持精簡，轉換負載可獨立擴縮容。

**自建全量映像**（單容器、不想跑 sidecar）：構建時加 `--build-arg INSTALL_LIBREOFFICE=true`，並保持 `MODE=local`：

```dockerfile
# 基於現有映像追加一層（Debian 基礎映像；中文字型避免中文文件轉換亂碼）
FROM registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest
RUN apt update && apt install -y --no-install-recommends \
    libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*
```

```bash
docker build -t bytedesk-libreoffice:latest .
# 修改 compose-bytedesk.yaml：image: bytedesk-libreoffice:latest
```

開啟後，三端的 Office 文件即可線上預覽；未開啟也不影響其他格式（圖片、PDF、影音、文字）的正常預覽。

**驗證是否生效**：上傳一個 docx/xlsx/pptx 檔案並點擊「預覽」，若幾秒到幾十秒內出現 PDF 內容即為成功；若提示「暫不支援線上預覽」，請檢查——直跑 jar/全量映像：LibreOffice 是否已安裝（終端執行 `soffice --version` 應輸出版本號）；gotenberg 模式：容器是否在運行（`docker ps | grep gotenberg`）。

## 常見問題

### 為什麼 Office 文件提示「暫不支援線上預覽」？

伺服器未開啟 Office 轉換能力，或檔案超出了轉換大小限制（預設 100MB）。請聯絡管理員開啟轉換功能，或直接下載檔案查看。

### 為什麼 Office 文件第一次開啟比較慢？

系統正在將文件轉換為 PDF 格式，轉換完成後會快取，之後開啟同一檔案會很快。

### 預覽會修改原檔案嗎？

不會。預覽是唯讀操作；Office 轉換產生的 PDF 是額外產物，原檔案保持不變，下載功能依然取得原始檔案。

### 壓縮檔、CAD 圖面能預覽嗎？

目前版本暫不支援這幾類格式的線上預覽，點擊預覽會提示下載。後續版本會逐步擴充支援。

### 訪客使用預覽需要登入嗎？

不需要。訪客端的檔案預覽無需登入即可使用。

### 檔案儲存在 MinIO 物件儲存中，能預覽嗎？

能。開啟 MinIO 儲存後，圖片、PDF、音視訊、文字等格式直接從物件儲存載入預覽；Office 文件同樣支援——伺服器會先從物件儲存下載來源檔案到臨時目錄（僅允許設定的 MinIO 位址，其他站點預設拒絕），轉換為 PDF 後自動清理臨時檔案。轉換結果會快取，同一檔案只需轉換一次，且不會改動物件儲存中的原始檔案。

管理員可按需調整兩個設定：

- `bytedesk.preview.convert.remote-source-enabled`：是否允許從物件儲存下載來源檔案用於轉換，預設 `true`；
- `bytedesk.preview.convert.allowed-remote-hosts`：額外允許的直連網域白名單（如自建 OSS/COS），預設僅允許 MinIO 位址。
