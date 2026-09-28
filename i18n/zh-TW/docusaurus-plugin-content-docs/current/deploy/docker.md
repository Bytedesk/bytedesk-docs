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
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml up -d

# 其他組合示例
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-postgresql.yaml -f compose/compose-artemis.yaml up -d
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-rabbitmq.yaml up -d
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
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml -f compose/compose-bytedesk.yaml up -d

# RabbitMQ 全量示例
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-rabbitmq.yaml -f compose/compose-bytedesk.yaml up -d

# 對話模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b
# 向量模型
docker exec ollama-bytedesk ollama pull bge-m3:latest
```

## 方法三：使用腳本（推薦）

```bash
cd bytedesk/deploy/docker

# 啟動：start.sh [關鍵字...]（db/mq/元件/目標任意順序組合）
./start mysql artemis middleware
./start mysql artemis all
./start postgresql rabbitmq all

# 停止：stop.sh [stop|down] [關鍵字...]
./stop mysql artemis stop all
./stop mysql artemis down middleware
```

## 停止容器

```bash
# 僅中介服務
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml stop

# 全量（中介服務 + bytedesk 映像）
docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml -f compose/compose-bytedesk.yaml stop
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

- [compose/compose-elasticsearch.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-elasticsearch.yaml)
- [compose/compose-mysql.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-mysql.yaml)
- [compose/compose-postgresql.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-postgresql.yaml)
- [compose/compose-oracle.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-oracle.yaml)
- [compose/compose-artemis.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-artemis.yaml)
- [compose/compose-rabbitmq.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-rabbitmq.yaml)
- [compose/compose-freeswitch.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-freeswitch.yaml)
- [compose/compose-bytedesk.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-bytedesk.yaml)

若使用雲模型（如智譜AI），可在 `compose/compose-bytedesk.yaml` 的環境變數中配置：

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
