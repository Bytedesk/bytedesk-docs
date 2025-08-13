---
title: FAQ
sidebar_label: FAQ
sidebar_position: 10
description: Common questions about integrating Weiyu customer service system
---

## Question 1: Can I not use Ollama?

### Answer: Yes

### Configuration Steps

#### 1. Change default model to Zhipu AI, disable Ollama service

```yaml
# Disable Ollama service in docker-compose.yml
# Change default model to Zhipu AI
SPRING_AI_MODEL_CHAT: zhipuai
SPRING_AI_MODEL_EMBEDDING: zhipuai
# Disable Ollama service
SPRING_AI_OLLAMA_CHAT_ENABLED: false
SPRING_AI_OLLAMA_EMBEDDING_ENABLED: false
```

Or in source code configuration file:

```yaml
# Change default model to Zhipu AI
spring.ai.model.chat=zhipuai
spring.ai.model.embedding=zhipuai
# Disable Ollama service
spring.ai.ollama.chat.enabled=false
spring.ai.ollama.embedding.enabled=false
```

#### 2. Enable Zhipu AI service

:::info Important Note
Must fill in real Zhipu AI API Key, otherwise cannot start normally. Using glm-4-flash model is free and will not incur costs.
:::

Get API Key: [Zhipu AI Console](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)

```yaml
# Configure in docker-compose.yml
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'
SPRING_AI_ZHIPUAI_CHAT_ENABLED: true
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: true
```

Or in source code configuration file:

```yaml
spring.ai.zhipuai.api-key=sk-xxx
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.embedding.enabled=true
```

![faq_a](/img/faq/faq_1_a.jpg)

### Common Questions

**Q: If I don't want to use Zhipu AI, what if I want to use DeepSeek?**

**A:** Since DeepSeek model doesn't support embedding, if you want to use knowledge base Q&A functionality, you must use at least one model that supports embedding. Therefore, when enabling DeepSeek, you must also enable Zhipu AI's embedding or Ollama models that support embedding.

## Question 2: ChatClient dependency injection failure

**Error message:**
> Unsatisfied dependency expressed through constructor parameter 0: No qualifying bean of type 'org.springframework.ai.chat.client ChatClient' available

![faq1](/img/faq/faq_1.jpg)

### Error Cause

Failed to connect to Ollama service, causing ChatClient injection to fail.

### Solution

Modify Ollama service address configuration:

```yaml
# Modify to actual Ollama service address in docker-compose.yml
SPRING_AI_OLLAMA_BASE_URL: http://host.docker.internal:11434
```

Or in source code configuration file:

```yaml
spring.ai.ollama.base-url=http://127.0.0.1:11434
```

## Question 3: Cannot find Protobuf classes

![faq2](/img/faq/faq_2.png)

### Error Analysis

Related Protobuf classes not generated.

### Solution Steps

1. **Check Protobuf compilation tools**

   ```bash
   protoc --version
   # Expected output: libprotoc 25.3
   ```

2. **Recompile project**

   ```bash
   cd bytedesk  # Enter project root directory
   ./mvnw install -Dmaven.test.skip=true
   ```

:::tip Development Environment Recommendation
Recommended to use VS Code + Maven for development
:::

## Question 4: Message sorting error

![faq3](/img/faq/faq_3.png)

### Cause Analysis

Docker container timezone configuration error.

### Solution

Fix Docker container timezone settings.

## Question 5: Cannot get verification code or login failure

### Problem Analysis

Cannot connect to server correctly, possibly due to incorrect server address configuration.

### Solution Strategy

1. **Refresh page**: Try refreshing browser page multiple times
2. **Switch server**: If problem persists, try switching server

#### Operation Steps

##### Step 1: Click Settings

![faq4](/img/faq/faq_4.png)

##### Step 2: Select Server

![faq4](/img/faq/faq_4_a.png)

##### Step 3: Switch Server

![faq4](/img/faq/faq_4_a_1.png)

:::warning Note
This method is only suitable for local testing, production environment is recommended to refer to [Nginx Configuration](./deploy/depend/nginx.md)
:::

## Question 6: How to use domain name access

### Current Status

Default access address: `http://serverIP:9003`

### Deployment Solutions

#### Method 1: Frontend-backend separation deployment (Recommended)

- Refer to [Nginx Configuration](./deploy/depend/nginx.md)  
- Advantages: Easy to upgrade, no need to restart server

#### Method 2: Frontend-backend integrated deployment

- Use Nginx as reverse proxy
- Reference configuration: [Gitee Example Configuration](https://github.com/Bytedesk/bytedesk/blob/main/deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_api_443.conf)

## Question 7: Upload functionality cannot work normally

### Affected Scope

The following functions may not display normally:

- Image upload
- File upload  
- Knowledge base content

### Solution

Modify upload address settings in configuration file.

#### Operation Method

In `docker-compose.yaml` or `docker-compose-ollama.yaml` file, replace `127.0.0.1` with actual server IP address or domain name:

```bash
# Please replace 127.0.0.1 with your server IP or domain name
BYTEDESK_UPLOAD_URL: http://127.0.0.1:9003
# Knowledge base access address, please modify to server actual address
BYTEDESK_KBASE_API_URL: http://127.0.0.1:9003
# Avatar access address, please modify to server actual address
BYTEDESK_FEATURES_AVATAR_BASE_URL: http://127.0.0.1:9003
```

## Question 8: How to modify default password

### Modification Method

#### Method 1: Modify through configuration file

**Docker deployment:**

Modify in `docker-compose.yaml` or `docker-compose-ollama.yaml` file:

```bash
BYTEDESK_ADMIN_EMAIL: admin@email.com
BYTEDESK_ADMIN_PASSWORD: admin
```

**Source code deployment:**

Modify in properties configuration file:

```bash
# Modify default admin password
bytedesk.admin.email=admin@email.com
bytedesk.admin.password=admin
```

#### Method 2: Modify after login

After logging into the system, modify password in personal profile page.

## Question 9: Trial version prompt appears

### Problem Phenomenon

Trial version prompt appears in the top right corner of admin backend:

![faq_9](/img/faq/faq_9.png)

### Cause

Using Enterprise Edition or Platform Edition features, but haven't completed paid authorization.

### Solution

#### Method 1: Purchase official version

Refer to [Purchase Guide](./payment.md) to complete paid authorization.

#### Method 2: Switch to Community Edition

Modify configuration file to use Community Edition appkey

## Question 10: How to customize brand information

### Current Status

System uses Weiyu name and LOGO by default.

### Customization Method

Refer to documentation: [Customize Name and LOGO](./deploy/config.md#custom-configuration)

## Question 11: Default password for imported members

### Default Settings

Default password for imported members: `123456`

### Modification Method

#### Source code configuration file

```bash
bytedesk.member.password=123456
```

#### Docker deployment configuration

Modify in `docker-compose.yaml` or `docker-compose-ollama.yaml` file:

```bash
BYTEDESK_MEMBER_PASSWORD: 123456
```

## Question 12: How to close default demo page

### Default Interface

![faq_12_show_demo](/img/faq/faq_12_show_demo.png)

### Page After Closing

![faq_12_hide_demo](/img/faq/faq_12_hide_demo.png)

### Modification Method

#### Source code configuration file

```bash
bytedesk.custom.show-demo=false
```

#### Docker deployment configuration

Modify in `docker-compose.yaml` or `docker-compose-ollama.yaml` file:

```bash
BYTEDESK_CUSTOM_SHOW_DEMO: "false"
```

### More Configuration

For detailed configuration instructions, please refer to: [Member Configuration Documentation](./deploy/config.md#member-configuration)

## Question 13: How to apply for licenseKey

### How to Get

Log in to [Weiyu Admin Backend](https://www.weiyuai.cn/admin) with phone number, click Settings -> License Management to get trial version license.

![faq_13](/img/faq/faq_13_get_license.png)

### Fill the obtained licenseKey into configuration file

```java
// properties configuration file
bytedesk.licenseKey=<KEY>

// docker-compose configuration file
BYTEDESK_LICENSE_KEY: <KEY>
```

For more details, refer to [licenseKey Configuration](./development/license.md)