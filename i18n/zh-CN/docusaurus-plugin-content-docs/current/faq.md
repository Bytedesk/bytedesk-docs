---
title: 常见问题
sidebar_label: 常见问题
sidebar_position: 10
description: 集成微语客服系统常见问题
---

## 问题0：是否可以不用大模型

### 答案0：可以

### 配置步骤0

参考源码 [application-noai.properties](https://github.com/Bytedesk/bytedesk/blob/main/starter/src/main/resources/application-noai.properties) 文件配置：

```bash
# 关闭文本对话配置
spring.ai.model.chat=none
# 关闭向量模型
spring.ai.model.embedding=none
# 关闭视觉模型
spring.ai.model.vision=none
spring.ai.model.image=none
spring.ai.model.moderation=none
# 关闭语音模型
spring.ai.model.audio=none
spring.ai.model.audio.speech=none
spring.ai.model.audio.transcription=none
# 关闭重排序模型
spring.ai.model.rerank=none
# 关闭向量数据库
spring.ai.vectorstore.type=none
# 关闭 Dashscope
spring.ai.dashscope.enabled=false
# 关闭 Elasticsearch 向量数据库
spring.ai.vectorstore.elasticsearch.enabled=false
```

或者参考 [docker-compose-noai.yml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/docker-compose-noai.yaml) 文件配置：

```yaml
# 关闭文本对话配置
SPRING_AI_MODEL_CHAT: none
# 关闭向量模型
SPRING_AI_MODEL_EMBEDDING: none
# 关闭视觉模型
SPRING_AI_MODEL_AUDIO: none
SPRING_AI_MODEL_AUDIO_SPEECH: none
SPRING_AI_MODEL_AUDIO_TRANSCRIPTION: none
# 关闭语音模型
SPRING_AI_MODEL_VISION: none
SPRING_AI_MODEL_IMAGE: none
SPRING_AI_MODEL_MODERATION: none
# 关闭重排序模型
SPRING_AI_MODEL_RERANK: none
# 关闭向量数据库
SPRING_AI_VECTORSTORE_TYPE: none
# 关闭 Dashscope
SPRING_AI_DASHSCOPE_ENABLED: "false"
# 关闭 Elasticsearch 向量数据库
SPRING_AI_VECTORSTORE_ELASTICSEARCH_ENABLED: "false"
```

## 问题1：可以不使用 Ollama 吗？

### 答案：可以

### 配置步骤

参考 [docker-compose.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/docker-compose.yaml)

#### 1. 修改默认模型为智谱AI，关闭 Ollama 服务

```yaml
# 在 docker-compose.yml 中关闭 Ollama 服务
# 修改默认模型为智谱AI
SPRING_AI_MODEL_CHAT: zhipuai
SPRING_AI_MODEL_EMBEDDING: zhipuai
# 关闭 Ollama 服务
SPRING_AI_OLLAMA_CHAT_ENABLED: false
SPRING_AI_OLLAMA_EMBEDDING_ENABLED: false
```

或在源码配置文件中：

```yaml
# 修改默认模型为智谱AI
spring.ai.model.chat=zhipuai
spring.ai.model.embedding=zhipuai
# 关闭 Ollama 服务
spring.ai.ollama.chat.enabled=false
spring.ai.ollama.embedding.enabled=false
```

#### 2. 启用智谱AI服务

:::info 重要提示
必须填写真实的智谱AI API Key，否则无法正常启动。使用 glm-4-flash 模型免费，不会产生费用。
:::

获取API Key：[智谱AI控制台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)

```yaml
# 在 docker-compose.yml 中配置
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'
SPRING_AI_ZHIPUAI_CHAT_ENABLED: true
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: true
```

或在源码配置文件中：

```yaml
spring.ai.zhipuai.api-key=sk-xxx
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.embedding.enabled=true
```

![faq_a](/img/faq/faq_1_a.jpg)

### 常见疑问

**Q：如果我不想使用智谱AI，想用 DeepSeek 怎么办？**

**A：** 由于 DeepSeek 模型不支持 embedding，如果要使用知识库问答功能，必须至少使用一款支持 embedding 的模型。因此在启用 DeepSeek 的同时，必须同时启用智谱AI的 embedding 或 Ollama 支持 embedding 的模型。

## 问题2：ChatClient 依赖注入失败

**错误信息：**
> Unsatisfied dependency expressed through constructor parameter 0: No qualifying bean of type 'org.springframework.ai.chat.client ChatClient' available

![faq1](/img/faq/faq_1.jpg)

### 错误原因

未成功连接到 Ollama 服务，导致无法注入 ChatClient。

### 处理方法

修改 Ollama 服务地址配置：

```yaml
# 在 docker-compose.yml 中修改为实际的 Ollama 服务地址
SPRING_AI_OLLAMA_BASE_URL: http://host.docker.internal:11434
```

或在源码配置文件中：

```yaml
spring.ai.ollama.base-url=http://127.0.0.1:11434
```

## 问题3：找不到 Protobuf 类

![faq2](/img/faq/faq_2.png)

### 错误分析

相关 Protobuf 类未生成。

### 处理步骤

1. **检查 Protobuf 编译工具**

   ```bash
   protoc --version
   # 预期输出：libprotoc 25.3
   ```

2. **重新编译项目**

   ```bash
   cd bytedesk  # 进入项目根目录
   ./mvnw install -Dmaven.test.skip=true
   ```

:::tip 开发环境推荐
推荐使用 VS Code + Maven 进行开发
:::

## 问题4：消息排序错误

![faq3](/img/faq/faq_3.png)

### 原因分析

Docker 容器时区配置错误。

### 解决办法

修复 Docker 容器的时区设置。

## 问题5：无法获取验证码或登录失败

### 问题分析

无法正确连接服务器，可能是服务器地址配置错误。

### 解决策略

1. **刷新页面**：多次刷新浏览器页面重试
2. **切换服务器**：如果问题仍然存在，可尝试切换服务器

#### 操作步骤

##### 步骤1：点击设置

![faq4](/img/faq/faq_4.png)

##### 步骤2：选择服务器

![faq4](/img/faq/faq_4_a.png)

##### 步骤3：切换服务器

![faq4](/img/faq/faq_4_a_1.png)

:::warning 注意
此方法仅适用于本地测试，生产环境建议参考 [Nginx配置](./deploy/depend/nginx.md)
:::

## 问题6：如何使用域名访问

### 当前状态

默认访问地址：`http://服务器IP:9003`

### 部署方案

#### 方法一：前后分离部署（推荐）

- 参考 [Nginx配置](./deploy/depend/nginx.md)  
- 优点：升级方便，无需重启服务器

#### 方法二：前后端一体部署

- 使用 Nginx 做反向代理
- 参考配置：[Gitee示例配置](https://github.com/Bytedesk/bytedesk/blob/main/deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_api_443.conf)

## 问题7：上传功能无法正常使用

### 影响范围

以下功能可能无法正常显示：

- 图片上传
- 文件上传  
- 知识库内容

### 解决方法

修改配置文件中的上传地址设置。

#### 操作方法

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 文件中，将 `127.0.0.1` 替换为实际的服务器IP地址或域名：

```bash
# 请将 127.0.0.1 替换为你的服务器IP或域名
BYTEDESK_UPLOAD_URL: http://127.0.0.1:9003
# 知识库的访问地址，请修改为服务器实际的地址
BYTEDESK_KBASE_API_URL: http://127.0.0.1:9003
# 头像的访问地址，请修改为服务器实际的地址
BYTEDESK_FEATURES_AVATAR_BASE_URL: http://127.0.0.1:9003
```

## 问题8：如何修改默认密码

### 修改方法

#### 方法一：通过配置文件修改

**Docker 部署：**

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 文件中修改：

```bash
BYTEDESK_ADMIN_EMAIL: admin@email.com
BYTEDESK_ADMIN_PASSWORD: admin
```

**源码部署：**

在 properties 配置文件中修改：

```bash
# 修改默认管理员密码
bytedesk.admin.email=admin@email.com
bytedesk.admin.password=admin
```

#### 方法二：登录后修改

登录系统后，在个人资料页面修改密码。

## 问题9：出现试用版提示

### 问题现象

管理后台右上角出现试用版提示：

![faq_9](/img/faq/faq_9.png)

### 产生原因

使用企业版或平台版功能，但未完成付费授权。

### 处理方案

#### 方法一：购买正式版本

参考 [购买指南](./payment.md) 完成付费授权。

#### 方法二：切换到社区版

修改配置文件，使用社区版licenseKey

更多详情参考 [licenseKey配置](./development/license.md)

## 问题10：如何自定义品牌信息

### 当前状态

系统默认使用微语的名称和LOGO。

### 自定义方法

参考文档：[自定义名称和LOGO](./deploy/config.md#自定义配置)

## 问题11：导入成员的默认密码

### 默认设置

导入成员时的默认密码为：`123456`

### 修改方法

#### 源码配置文件

```bash
bytedesk.member.password=123456
```

#### Docker 部署配置

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 文件中修改：

```bash
BYTEDESK_MEMBER_PASSWORD: 123456
```

## 问题12：如果关闭默认演示页面

### 默认界面

![faq_12_show_demo](/img/faq/faq_12_show_demo.png)

### 关闭后页面

![faq_12_hide_demo](/img/faq/faq_12_hide_demo.png)

### 修改方法

#### 源码配置文件

```bash
bytedesk.custom.show-demo=false
```

#### Docker 部署配置

在 `docker-compose.yaml` 或 `docker-compose-ollama.yaml` 文件中修改：

```bash
BYTEDESK_CUSTOM_SHOW_DEMO: "false"
```

### 更多配置

详细配置说明请参考：[成员配置文档](./deploy/config.md#成员配置)

## 问题13：如何申请licenseKey

### 获取方法

手机号登录 [微语管理后台](https://www.weiyuai.cn/admin) ，点击 设置 -> License 管理，即可获取试用版 license。

![faq_13](/img/faq/faq_13_get_license.png)

### 将获取到的 licenseKey 填入配置文件中

```java
// properties配置文件
bytedesk.licenseKey=<KEY>

// docker-compose配置文件
BYTEDESK_LICENSE_KEY: <KEY>
```

更多详情参考 [licenseKey配置](./development/license.md)
