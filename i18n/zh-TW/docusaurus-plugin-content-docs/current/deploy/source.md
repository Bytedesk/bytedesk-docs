---
sidebar_label: 源碼部署
sidebar_position: 2
---

# 源碼部署指南

:::info 試用版License
需要試用版License？請參考：[問題13：如何申請licenseKey](../faq#問題13如何申請licensekey)
:::

本文檔提供詳細的源碼部署步驟，幫助您快速部署和執行專案。

:::tip 系統要求

- **作業系統**：Ubuntu 22.04 LTS
- **硬體配置**：標準部署：2核4G記憶體

:::

## 1. 取得源碼

首先，從程式碼倉庫克隆專案源碼到本地：

```bash
# 國內使用者推薦使用Gitee鏡像源
git clone https://github.com/Bytedesk/bytedesk.git

# 或者使用GitHub源
git clone https://github.com/bytedesk/bytedesk.git

# 進入專案目錄
cd weiyu  # 或 cd bytedesk
```

## 2. 環境準備

### 2.1 安裝JDK 21

專案基於Spring Boot 3開發，**必須**使用JDK 21或更高版本：

```bash
# 檢查Java版本
java --version
# 應顯示: java 21.x.x 或更高版本
```

如果沒有安裝JDK 21，請參考：[JDK 21安裝指南](./depend/jdk)

### 2.2 安裝專案依賴

```bash
# 1. 進入 deploy/docker 目錄
cd bytedesk/deploy/docker

# 2. 啟動依賴（預設 MySQL）
# start.sh [keywords...] (db/mq/components/target, any order)

# Artemis + MySQL（預設）
./start mysql artemis middleware

# RabbitMQ + MySQL（預設）
./start mysql rabbitmq middleware

# 停止（保留容器）
# ./stop mysql artemis stop middleware
# ./stop mysql rabbitmq stop middleware

# 下線（刪除容器，保留資料卷）
# ./stop mysql artemis down middleware
# ./stop mysql rabbitmq down middleware

# 3. 切換 PostgreSQL（可選）
./start postgresql artemis middleware
./start postgresql rabbitmq middleware

# 4. 切換 Oracle（可選）
./start oracle artemis middleware
./start oracle rabbitmq middleware

# 5. 僅中介服務（建議用於源碼啟動，預設）
./start mysql artemis middleware
./start mysql rabbitmq middleware

# 6. 全量（中介服務 + bytedesk 映像）
./start mysql artemis all
./start mysql rabbitmq all

# 可選：透過環境變數切換專案名
# PROJECT_NAME=bytedesk ./start mysql artemis middleware

# 等價原生命令（先切到 deploy/docker）
# cd deploy/docker
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml up -d
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-postgresql.yaml -f compose/compose-artemis.yaml up -d
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-rabbitmq.yaml up -d
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-postgresql.yaml -f compose/compose-rabbitmq.yaml up -d
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-oracle.yaml -f compose/compose-artemis.yaml up -d
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-oracle.yaml -f compose/compose-rabbitmq.yaml up -d
# 全量示例（中介服務 + bytedesk 映像）
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml -f compose/compose-bytedesk.yaml up -d
```

- 或參考 [安裝專案依賴](./jar.md#前期准备)

## 3. 編譯與啟動

### 3.1 安裝開發工具

推薦的開發環境：

- 編輯器：Visual Studio Code
- 建構工具：Maven 3.6+
- 其他依賴：protobuf 編譯工具（專案使用了protobuf）

```bash
# 檢查Maven版本
mvn --version
# 應顯示 Apache Maven 3.6+ 版本

# 檢查protobuf版本（如果已安裝）
protoc --version
# 建議使用 libprotoc 25.0+
```

### 3.2 編譯專案

```bash
# 在專案根目錄下執行編譯（跳過測試以加快速度）
./mvnw install -Dmaven.test.skip=true
```

### 3.3 修改配置檔案

編輯`starter/src/main/resources/application-dev.properties`檔案，配置資料庫和Redis連線資訊：[請參考應用配置說明](./config.md)

### 3.4 伺服器位址（URL）配置

預設配置中的存取位址均為 `http://127.0.0.1:9003`，僅適用於本地除錯。部署到伺服器時，需要將其替換為伺服器實際IP位址或網域，否則瀏覽器無法存取上傳檔案、頭像、知識庫（幫助中心/部落格）等資源。

這些位址集中在 `starter/src/main/resources/properties/open/upload.properties` 檔案中（本地除錯對應 `properties/local/upload.properties`）：

```properties
# 上傳檔案的存取位址，請修改為伺服器實際的位址
bytedesk.upload.url=http://你的伺服器IP:9003
# 頭像的存取位址，請修改為伺服器實際的位址
bytedesk.features.avatar-base-url=http://你的伺服器IP:9003
# 知識庫的存取位址，請修改為伺服器實際的位址
bytedesk.kbase.api-url=http://你的伺服器IP:9003
# 幫助中心的存取位址（可選，不配置時使用 bytedesk.kbase.api-url）
bytedesk.kbase.helpcenter.api-url=http://你的伺服器IP:9003
# 部落格的存取位址（可選，不配置時使用 bytedesk.kbase.api-url）
bytedesk.kbase.blog.api-url=http://你的伺服器IP:9003
# 訪客工單頁面位址（用於郵件中的工單會話直達連結）
bytedesk.custom.ticket-html-url=http://你的伺服器IP:9003/ticket

# 外網可存取的 MQTT WebSocket 完整位址；當 WebSocket 埠（預設 9885）不對外開放（Nginx/反向代理）時配置
# bytedesk.custom.mqtt-websocket-url=wss://你的網域/websocket
# 外網可存取的上傳 API 位址（完整URL，不帶上傳路徑），用於多節點/反向代理上傳場景
# bytedesk.custom.upload-api-url=https://upload.你的網域
```

> 💡 **提示**：這些配置項與 Docker 部署中 `.env` 檔案的環境變數一一對應（參見 [Docker部署](./docker.md)），完整屬性說明請參考 [應用配置說明](./config.md)：

| 配置項（properties） | Docker 環境變數（.env） | 說明 |
| --- | --- | --- |
| `bytedesk.upload.url` | `BYTEDESK_UPLOAD_URL` | 上傳檔案的存取位址 |
| `bytedesk.features.avatar-base-url` | `BYTEDESK_FEATURES_AVATAR_BASE_URL` | 頭像的存取位址 |
| `bytedesk.kbase.api-url` | `BYTEDESK_KBASE_API_URL` | 知識庫的存取位址 |
| `bytedesk.kbase.helpcenter.api-url` | `BYTEDESK_KBASE_HELPCENTER_API_URL` | 幫助中心的存取位址 |
| `bytedesk.kbase.blog.api-url` | `BYTEDESK_KBASE_BLOG_API_URL` | 部落格的存取位址 |
| `bytedesk.custom.ticket-html-url` | `BYTEDESK_CUSTOM_TICKET_HTML_URL` | 訪客工單頁面位址 |
| `bytedesk.custom.mqtt-websocket-url` | `BYTEDESK_CUSTOM_MQTT_WEBSOCKET_URL` | 外網 MQTT WebSocket 位址（反向代理場景） |
| `bytedesk.custom.upload-api-url` | `BYTEDESK_CUSTOM_UPLOAD_API_URL` | 外網上傳 API 位址（多節點場景） |

### 3.5 啟動專案

```bash
# 進入啟動模組目錄
cd starter

# 啟動應用
./mvnw spring-boot:run
```

> 🚀 **啟動成功標誌**：控制台輸出"Started Application"且無異常資訊。

## 4. 存取系統

### 4.1 本地存取
