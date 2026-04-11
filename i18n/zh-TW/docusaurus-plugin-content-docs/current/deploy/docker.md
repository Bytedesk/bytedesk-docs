---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::info 試用版License
需要試用版License？請參考：[問題13：如何申請licenseKey](../faq#問題13如何申請licensekey)
:::

:::tip

- 作業系統：Ubuntu 22.04 LTS
- 伺服器最低配置4核8G記憶體
- 配置要求太高？建議：可以分拆 MySQL、Redis、Elasticsearch、ArtemisMQ 等服務到其他伺服器，僅保留核心服務在主伺服器上。可以有效降低伺服器配置要求。
- Docker社區版鏡像，二選其一即可，建議國內選阿里雲鏡像
  - bytedesk/bytedesk-ce:latest # hub.docker.com community
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk-ce:latest # 阿里雲社區版鏡像
- Docker企業版/平台版鏡像，二選其一即可，建議國內選阿里雲鏡像
  - bytedesk/bytedesk:latest # hub.docker.com enterprise
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest # 阿里雲企業版/平台版鏡像

:::

## 方法一：啟動中介服務（適合源碼啟動）

```bash
git clone https://github.com/Bytedesk/bytedesk.git
cd bytedesk/deploy/docker

# MySQL + Artemis + standard（僅中介服務）
docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d

# 其他組合示例
docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
```

### 因專案預設使用ollama qwen3:0.6b模型，所以需要另外拉取模型

```bash
# 對話模型
ollama pull qwen3:0.6b
# 向量模型
ollama pull bge-m3:latest
```

## 方法二：全量啟動（中介服務 + bytedesk 映像）

```bash
git clone https://github.com/Bytedesk/bytedesk.git
cd bytedesk/deploy/docker

# MySQL + Artemis + standard + app（全量）
docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-artemis.yaml up -d

# RabbitMQ 全量示例
docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-rabbitmq.yaml up -d

# 對話模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b
# 向量模型
docker exec ollama-bytedesk ollama pull bge-m3:latest
```

## 方法三：使用腳本（推薦）

```bash
cd bytedesk/deploy/docker

# 啟動：start.sh <db> <mq> <scenario> [all|middleware]
./start.sh mysql artemis standard middleware
./start.sh mysql artemis standard all
./start.sh postgresql rabbitmq standard all

# 停止：stop.sh <db> <mq> <scenario> [stop|down] [all|middleware]
./stop.sh mysql artemis standard stop all
./stop.sh mysql artemis standard down middleware
```

## 停止容器

```bash
# 僅中介服務
docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml stop

# 全量（中介服務 + bytedesk 映像）
docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-artemis.yaml stop
```

## 開放埠

請開放內網入方向埠

- 9003
- 9885

## 演示

本地預覽

```bash
# 請將127.0.0.1替換為你的伺服器ip
存取地址：http://127.0.0.1:9003/
預設帳號：admin@email.com
預設密碼：admin
```

## 編排內容（分層）

- [compose-base.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-base.yaml)
- [compose-db-mysql.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-db-mysql.yaml)
- [compose-db-postgresql.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-db-postgresql.yaml)
- [compose-db-oracle.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-db-oracle.yaml)
- [compose-mq-artemis.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-mq-artemis.yaml)
- [compose-mq-rabbitmq.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-mq-rabbitmq.yaml)
- [compose-scenario-standard.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-scenario-standard.yaml)
- [compose-scenario-noai.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-scenario-noai.yaml)
- [compose-scenario-call.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-scenario-call.yaml)
- [compose-app-bytedesk.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-app-bytedesk.yaml)
- [compose-app-mq-artemis.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-app-mq-artemis.yaml)
- [compose-app-mq-rabbitmq.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-app-mq-rabbitmq.yaml)

若使用雲模型（如智譜AI），可在 `compose-app-bytedesk.yaml` 的環境變數中配置：

```yaml
# 申請智譜AI API Key：https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx' # 智譜AI API Key
SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
```

## 問題排查

查看logs

```bash
# 例如查看MySQL容器的日誌
docker logs mysql-bytedesk
```
