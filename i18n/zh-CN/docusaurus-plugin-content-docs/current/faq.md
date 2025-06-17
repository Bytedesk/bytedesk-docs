---
title: 常见问题
sidebar_label: 常见问题
sidebar_position: 9
description: 集成微语客服系统常见问题
---

## 问题1：可不可以不用ollama

### 答案1：可以

如果不想使用ollama，可以关闭ollama服务，但同时必须启用另外一个大模型服务，比如智谱AI，并修改配置文件

```yaml
# docker-compose.yml中关闭ollama服务
SPRING_AI_OLLAMA_CHAT_ENABLED: false
SPRING_AI_OLLAMA_EMBEDDING_ENABLED: false
# 或者 在源码中关闭ollama服务
spring.ai.ollama.chat.enabled=false
spring.ai.ollama.embedding.enabled=false
```

同时必须启用智谱AI服务，且必须填写真实智谱AI API Key，否则无法正常启动。使用glm-4-flash模型免费，不会产生任何费用。

```yaml
# 申请智谱AI API Key：https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys
# docker-compose.yml中启用智谱AI服务
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'
SPRING_AI_ZHIPUAI_CHAT_ENABLED: true
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: true
# 或者 在源码中启用智谱AI服务
spring.ai.zhipuai.api-key=sk-xxx
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.embedding.enabled=true
```

![faq_a](/img/faq/faq_1_a.jpg)

那么问题来了：

- 问：如果我不想使用智谱AI，比如我想用deepseek，那我该怎么办呢？
- 答：因为目前deepseek模型不支持embedding，所以如果要使用知识库问答，必须至少使用一款支持embedding的模型。所以在启用deepseek的同时，必须同时启用智谱AI的embedding或者Ollama支持embedding的模型，否则无法使用知识库问答功能。

## 问题2：Unsatisfied dependency expressed through constructor parameter 0: N o qualifying bean of type 'org.springframework.ai.chat.client ChatClient' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations

![faq1](/img/faq/faq_1.jpg)

### 原因2

未成功连上ollama服务，导致无法注入ChatClient。

### 解决方案2

修改配置文件

```yaml
# docker-compose.yml中修改地址为自己ollama服务的地址
SPRING_AI_OLLAMA_BASE_URL: http://host.docker.internal:11434
# 或者 在源码配置文件中修改地址为自己ollama服务的地址
spring.ai.ollama.base-url=http://127.0.0.1:11434
```

## 问题3：找不到protobuf类

![faq2](/img/faq/faq_2.png)

### 原因3

相关protobuf类未生成

### 解决方案3

```bash
# 推荐开发环境：vscode + maven
# 项目使用了protobuf，可能需要安装 protobuf 编译工具
protoc --version
libprotoc 25.3
# 安装protoc之后，重新编译项目，生成相关protobuf类
cd bytedesk # 进入项目根目录
./mvnw install -Dmaven.test.skip=true
```

## 问题4：消息乱序，排序错误

![faq3](/img/faq/faq_3.png)

### 原因4

docker时区错误

### 解决方案4

请修复docker所在时区

## 问题5：无法获取验证码或无法登录

### 原因5

无法正确连接服务器，可能是服务器地址错误

### 解决方案5

刷新几次浏览器页面，如果验证码还无法显示或无法登录，可以尝试切换服务器

#### 步骤1

![faq4](/img/faq/faq_4.png)

#### 步骤2

![faq4](/img/faq/faq_4_a.png)

#### 步骤3

![faq4](/img/faq/faq_4_a_1.png)

注意：此种方式仅适用于本地测试，对于线上情况建议参考 [Nginx配置](./deploy/depend/nginx.md)

## 问题6：如何使用域名访问

### 原因6

默认情况下，访问地址: http://服务器ip:9003

### 解决方案6

- 方法一：前后分离部署，参考 [Nginx配置](./deploy/depend/nginx.md)，推荐，升级方便，无需重启服务器
- 方法二：前后端一体部署，仅使用nginx做反向代理，参考文件[gitee config](https://gitee.com/270580156/weiyu/blob/main/deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_api_443.conf)

## 问题7：上传图片、文件和知识库无法正常显示

### 原因7

未正确配置上传地址

### 解决方案7： 修改配置，否则上传图片、文件和知识库无法正常显示

- 修改 `docker-compose.yaml` 文件 或 `docker-compose-ollama.yaml` 文件，将127.0.0.1替换为你的服务器ip地址或者域名。

```bash
# 请将服务器127.0.0.1替换为你的服务器ip，或者域名
BYTEDESK_UPLOAD_URL: http://127.0.0.1:9003
BYTEDESK_KBASE_API_URL: http://127.0.0.1:9003
```

## 问题8：修改默认密码

- 修改 `docker-compose.yaml` 文件 或 `docker-compose-ollama.yaml` 文件 中的默认管理员密码

```bash
BYTEDESK_ADMIN_EMAIL: admin@email.com
BYTEDESK_ADMIN_PASSWORD: admin
```

- 在 properties 文件中修改默认管理员密码

```bash
# 修改默认管理员密码
bytedesk.admin.email=admin@email.com
bytedesk.admin.password=admin
```

或登录之后在个人资料修改密码

## 问题9：试用版提示

为什么管理后台右上角有提示，如下图：

![faq_9](/img/faq/faq_9.png)

### 原因9

使用企业版或平台版，但未付费

### 解决方案9

通过下面方法可以隐藏此提示：

- 方法一：购买企业版或平台版，参考 [购买](./payment.md)
- 方法二：修改配置文件

```bash
# COMMUNITY, // 社区版-单租户，不限人，免费, 功能受限
# ENTERPRISE, // 企业版-单租户，不限人，付费，功能不限
# PLATFORM // 平台版-多租户，不限人数，付费，功能不限
```

## 问题10：如何自定义名称和LOGO

### 原因10

默认使用微语名称和LOGO

### 解决方案10

- [自定义名称和LOGO](./deploy/config.md#自定义配置)

## 问题11：导入成员默认密码

### 原因11

默认密码为：123456

### 解决方案11

修改配置

```bash
# spring boot 配置文件导入成员默认密码
bytedesk.member.password=123456
# 或者在docker-compose.yaml文件中修改
BYTEDESK_MEMBER_PASSWORD: 123456
```

- [修改默认密码](./deploy/config.md#成员配置)
