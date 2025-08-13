---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::info 試用版License
需要試用版License？請參考：[問題13：如何申請licenseKey](/docs/faq#問題13如何申請licensekey)
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

## 方法一：一行命令啟動，需要另行安裝ollama

```bash
git clone https://github.com/Bytedesk/bytedesk.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose.yaml up -d
```

### 因專案預設使用ollama qwen3:0.6b模型，所以需要另外拉取模型

```bash
# 對話模型
ollama pull qwen3:0.6b
# 向量模型
ollama pull bge-m3:latest
```

## 方法二： 使用 docker compose ollama，預設整合ollama

```bash
git clone https://github.com/Bytedesk/bytedesk.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose-ollama.yaml up -d
# 對話模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b
# 向量模型
docker exec ollama-bytedesk ollama pull bge-m3:latest
```

## 停止容器

```bash
docker compose -p weiyu -f docker-compose.yaml stop
# 或者
docker compose -p weiyu -f docker-compose-ollama.yaml stop
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

## 編排內容(二選一)

- [最新docker-compose.yaml-預設使用智譜AI](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/docker-compose.yaml)
- [最新docker-compose-ollama.yaml-預設使用ollama](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/docker-compose-ollama.yaml)

如果使用docker-compose.yaml-需要自行填充智譜AI相關配置，參考如下配置：

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
