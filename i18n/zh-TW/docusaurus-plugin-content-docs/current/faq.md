---
title: 常見問題
sidebar_label: 常見問題
sidebar_position: 9
description: 整合微語客服系統常見問題
---

## 問題1：可以不使用 Ollama 嗎？

### 答案：可以

### 配置步驟

#### 1. 修改預設模型為智譜AI，關閉 Ollama 服務

```yaml
# 在 docker-compose.yml 中關閉 Ollama 服務
# 修改預設模型為智譜AI
SPRING_AI_MODEL_CHAT: zhipuai
SPRING_AI_MODEL_EMBEDDING: zhipuai
# 關閉 Ollama 服務
SPRING_AI_OLLAMA_CHAT_ENABLED: false
SPRING_AI_OLLAMA_EMBEDDING_ENABLED: false
```

或在源碼配置檔案中：

```yaml
# 修改預設模型為智譜AI
spring.ai.model.chat=zhipuai
spring.ai.model.embedding=zhipuai
# 關閉 Ollama 服務
spring.ai.ollama.chat.enabled=false
spring.ai.ollama.embedding.enabled=false
```

#### 2. 啟用智譜AI服務

:::info 重要提示
必須填寫真實的智譜AI API Key，否則無法正常啟動。使用 glm-4-flash 模型免費，不會產生費用。
:::

取得API Key：[智譜AI控制台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)

```yaml
# 在 docker-compose.yml 中配置
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'
SPRING_AI_ZHIPUAI_CHAT_ENABLED: true
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: true
```

或在源碼配置檔案中：

```yaml
spring.ai.zhipuai.api-key=sk-xxx
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.embedding.enabled=true
```

![faq_a](/img/faq/faq_1_a.jpg)

### 常見疑問

**Q：如果我不想使用智譜AI，想用 DeepSeek 怎麼辦？**

**A：** 由於 DeepSeek 模型不支援 embedding，如果要使用知識庫問答功能，必須至少使用一款支援 embedding 的模型。因此在啟用 DeepSeek 的同時，必須同時啟用智譜AI的 embedding 或 Ollama 支援 embedding 的模型。

## 問題2：ChatClient 依賴注入失敗

**錯誤訊息：**
> Unsatisfied dependency expressed through constructor parameter 0: No qualifying bean of type 'org.springframework.ai.chat.client ChatClient' available

![faq1](/img/faq/faq_1.jpg)

### 錯誤原因

未成功連接到 Ollama 服務，導致無法注入 ChatClient。

### 處理方法

修改 Ollama 服務地址配置：

```yaml
# 在 docker-compose.yml 中修改為實際的 Ollama 服務地址
SPRING_AI_OLLAMA_BASE_URL: http://host.docker.internal:11434
```

或在源碼配置檔案中：

```yaml
spring.ai.ollama.base-url=http://127.0.0.1:11434
```

## 問題3：找不到 Protobuf 類

![faq2](/img/faq/faq_2.png)

### 錯誤分析

相關 Protobuf 類未生成。

### 處理步驟

1. **檢查 Protobuf 編譯工具**

   ```bash
   protoc --version
   # 預期輸出：libprotoc 25.3
   ```

2. **重新編譯專案**

   ```bash
   cd bytedesk  # 進入專案根目錄
   ./mvnw install -Dmaven.test.skip=true
   ```

:::tip 開發環境推薦
推薦使用 VS Code + Maven 進行開發
:::

## 問題4：訊息排序錯誤

![faq3](/img/faq/faq_3.png)

### 原因分析

Docker 容器時區配置錯誤。

### 解決辦法

修復 Docker 容器的時區設定。

## 問題5：無法取得驗證碼或登入失敗

### 問題分析

無法正確連接伺服器，可能是伺服器地址配置錯誤。

### 解決策略

1. **重新整理頁面**：多次重新整理瀏覽器頁面重試
2. **切換伺服器**：如果問題仍然存在，可嘗試切換伺服器

#### 操作步驟

##### 步驟1：點擊設定

![faq4](/img/faq/faq_4.png)

##### 步驟2：選擇伺服器

![faq4](/img/faq/faq_4_a.png)

##### 步驟3：切換伺服器

![faq4](/img/faq/faq_4_a_1.png)

:::warning 注意
此方法僅適用於本地測試，生產環境建議參考 [Nginx配置](./deploy/depend/nginx.md)
:::

## 問題6：如何使用網域名稱存取

### 當前狀態

預設存取地址：`http://伺服器IP:9003`

### 部署方案

#### 方法一：前後分離部署（推薦）

- 參考 [Nginx配置](./deploy/depend/nginx.md)  
- 優點：升級方便，無需重啟伺服器

#### 方法二：前後端一體部署

- 使用 Nginx 做反向代理
- 參考配置：[Gitee範例配置](https://gitee.com/270580156/weiyu/blob/main/deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_api_443.conf)

## 問題7：上傳功能無法正常使用

### 影響範圍

以下功能可能無法正常顯示：

- 圖片上傳
- 檔案上傳  
- 知識庫內容

### 解決方法

修改配置檔案中的上傳地址設定。

#### 操作方法

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 檔案中，將 `127.0.0.1` 替換為實際的伺服器IP地址或網域名稱：

```bash
# 請將 127.0.0.1 替換為你的伺服器IP或網域名稱
BYTEDESK_UPLOAD_URL: http://127.0.0.1:9003
# 知識庫的存取地址，請修改為伺服器實際的地址
BYTEDESK_KBASE_API_URL: http://127.0.0.1:9003
# 頭像的存取地址，請修改為伺服器實際的地址
BYTEDESK_FEATURES_AVATAR_BASE_URL: http://127.0.0.1:9003
```

## 問題8：如何修改預設密碼

### 修改方法

#### 方法一：透過配置檔案修改

**Docker 部署：**

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 檔案中修改：

```bash
BYTEDESK_ADMIN_EMAIL: admin@email.com
BYTEDESK_ADMIN_PASSWORD: admin
```

**源碼部署：**

在 properties 配置檔案中修改：

```bash
# 修改預設管理員密碼
bytedesk.admin.email=admin@email.com
bytedesk.admin.password=admin
```

#### 方法二：登入後修改

登入系統後，在個人資料頁面修改密碼。

## 問題9：出現試用版提示

### 問題現象

管理後台右上角出現試用版提示：

![faq_9](/img/faq/faq_9.png)

### 產生原因

使用企業版或平台版功能，但未完成付費授權。

### 處理方案

#### 方法一：購買正式版本

參考 [購買指南](./payment.md) 完成付費授權。

#### 方法二：切換到社區版

修改配置檔案，使用社區版appkey

## 問題10：如何自訂品牌資訊

### 當前狀態

系統預設使用微語的名稱和LOGO。

### 自訂方法

參考文檔：[自訂名稱和LOGO](./deploy/config.md#自訂配置)

## 問題11：匯入成員的預設密碼

### 預設設定

匯入成員時的預設密碼為：`123456`

### 修改方法

#### 源碼配置檔案

```bash
bytedesk.member.password=123456
```

#### Docker 部署配置

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 檔案中修改：

```bash
BYTEDESK_MEMBER_PASSWORD: 123456
```

## 問題12：如果關閉預設演示頁面

### 預設介面

![faq_12_show_demo](/img/faq/faq_12_show_demo.png)

### 關閉後頁面

![faq_12_hide_demo](/img/faq/faq_12_hide_demo.png)

### 修改方法

#### 源碼配置檔案

```bash
bytedesk.custom.show-demo=false
```

#### Docker 部署配置

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 檔案中修改：

```bash
BYTEDESK_CUSTOM_SHOW_DEMO: "false"
```

### 更多配置

詳細配置說明請參考：[成員配置文檔](./deploy/config.md#成員配置)

## 問題13：如何申請licenseKey

### 取得方法

手機號登入 [微語管理後台](https://www.weiyuai.cn/admin) ，點擊 設定 -> License 管理，即可取得試用版 license。

![faq_13](/img/faq/faq_13_get_license.png)

### 將取得的 licenseKey 填入配置檔案中

```java
// properties配置檔案
bytedesk.licenseKey=<KEY>

// docker-compose配置檔案
BYTEDESK_LICENSE_KEY: <KEY>
```

更多詳情參考 [licenseKey配置](./development/license.md)