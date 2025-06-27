---
sidebar_label: 服务器配置参数说明
sidebar_position: 7
---

# 微语服务器配置参数说明

本文档详细说明微语服务器（基于Spring Boot 3.x开发）的配置参数及其用法。

## 基础配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `server.port` | 服务器端口 | `9003` | `SERVER_PORT: 9003` |
| `bytedesk.debug` | 是否开启调试模式 | `true` | `BYTEDESK_DEBUG: true` |
| `bytedesk.edition` | 产品版本类型：COMMUNITY(社区版，功能受限)、ENTERPRISE(企业版，付费，功能不限)、PLATFORM(平台版，付费，功能不限) | `PLATFORM` | `BYTEDESK_EDITION: ENTERPRISE` |
| `bytedesk.version` | 产品版本号 | `0.7.8` | `BYTEDESK_VERSION: 0.7.8` |
| `bytedesk.appkey` | 授权密钥 | `ZjoyMDI1LTA2LTExOkNPTU1VTklUWTo6` | `BYTEDESK_APPKEY: ZjoyMDI1LTA2LTExOkNPTU1VTklUWTo6` |

## 自定义配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.custom.enabled` | 是否启用自定义配置（名称、logo、说明等） | `true` | `BYTEDESK_CUSTOM_ENABLED: false` |
| `bytedesk.custom.name` | 自定义产品名称，默认为空则使用默认名称 | - | `BYTEDESK_CUSTOM_NAME:` |
| `bytedesk.custom.logo` | 自定义产品logo，默认为空则使用默认logo | - | `BYTEDESK_CUSTOM_LOGO:` |
| `bytedesk.custom.description` | 自定义产品描述，默认为空则使用"Chat As A Service" | - | `BYTEDESK_CUSTOM_DESCRIPTION:` |
| `bytedesk.custom.show-right-corner-chat` | 是否显示右下角对话窗口 | `false` | `BYTEDESK_CUSTOM_SHOW_RIGHT_CORNER_CHAT: true` |
| `bytedesk.custom.privacy-policy-url` | 隐私政策URL地址 | - | `BYTEDESK_CUSTOM_PRIVACY_POLICY_URL:` |
| `bytedesk.custom.terms-of-service-url` | 服务条款URL地址 | - | `BYTEDESK_CUSTOM_TERMS_OF_SERVICE_URL:` |
| `bytedesk.custom.login-username-enable` | 是否启用用户名登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_USERNAME_ENABLE: true` |
| `bytedesk.custom.login-mobile-enable` | 是否启用手机号登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_MOBILE_ENABLE: true` |
| `bytedesk.custom.login-scan-enable` | 是否启用扫码登录 | `true` | `BYTEDESK_CUSTOM_LOGIN_SCAN_ENABLE: true` |
| `bytedesk.custom.doc-url-show` | 是否显示文档链接 | `true` | `BYTEDESK_CUSTOM_DOC_URL_SHOW: true` |
| `bytedesk.custom.doc-url` | 文档URL地址 | `https://www.weiyuai.cn/docs/zh-CN/` | `BYTEDESK_CUSTOM_DOC_URL: https://www.weiyuai.cn/docs/zh-CN/` |

## 管理员配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.admin.email` | 管理员邮箱 | `admin@email.com` | `BYTEDESK_ADMIN_EMAIL: admin@email.com` |
| `bytedesk.admin.password` | 管理员默认密码 | `admin` | `BYTEDESK_ADMIN_PASSWORD: admin` |
| `bytedesk.admin.password-default` | 创建/导入成员的默认密码 | `123456` | `BYTEDESK_ADMIN_PASSWORD_DEFAULT: 123456` |
| `bytedesk.admin.nickname` | 管理员昵称 | `SuperAdmin` | `BYTEDESK_ADMIN_NICKNAME: SuperAdmin` |
| `bytedesk.admin.mobile` | 管理员手机号 | `13345678000` | `BYTEDESK_ADMIN_MOBILE: 13345678000` |
| `bytedesk.admin.mobile-whitelist` | 手机号白名单，使用逗号分隔 | `18888888000,18888888001,...` | `BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001,18888888002,18888888003,18888888004,18888888005` |
| `bytedesk.admin.email-whitelist` | 邮箱白名单，使用逗号分隔 | `100@email.com,101@email.com,...` | `BYTEDESK_ADMIN_EMAIL_WHITELIST: 100@email.com,101@email.com,102@email.com,103@email.com,104@email.com,105@email.com` |
| `bytedesk.admin.validate-code` | 白名单手机号和邮箱的验证码，否则生成随机6位数字 | `123456` | `BYTEDESK_ADMIN_VALIDATE_CODE: 123456` |
| `bytedesk.admin.allow-register` | 是否允许注册新账户 | `true` | `BYTEDESK_FEATURES_ENABLE_REGISTRATION: false` |
| `bytedesk.admin.force-validate-mobile` | 是否强制验证手机号 | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_MOBILE: true` |
| `bytedesk.admin.force-validate-email` | 是否强制验证邮箱 | `true` | `BYTEDESK_ADMIN_FORCE_VALIDATE_EMAIL: true` |

## 成员配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.member.password` | 创建/导入成员的默认密码 | `123456` | `BYTEDESK_MEMBER_PASSWORD: 123456` |

## 性能测试配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.testing.enabled` | 是否启用性能测试模式 | `false` | `BYTEDESK_TESTING_ENABLED: false` |
| `bytedesk.testing.account-count` | 测试账号数量 | `300` | `BYTEDESK_TESTING_ACCOUNT_COUNT: 300` |
| `bytedesk.testing.account-username` | 测试账号用户名前缀 | `test` | `BYTEDESK_TESTING_ACCOUNT_USERNAME: test` |
| `bytedesk.testing.account-password` | 测试账号密码 | `password` | `BYTEDESK_TESTING_ACCOUNT_PASSWORD: password` |
| `bytedesk.testing.disable-captcha` | 是否禁用验证码 | `true` | `BYTEDESK_TESTING_DISABLE_CAPTCHA: true` |
| `bytedesk.testing.disable-ip-filter` | 是否禁用IP过滤 | `true` | `BYTEDESK_TESTING_DISABLE_IP_FILTER: true` |

## 组织配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.organization.name` | 组织名称 | `MyCompany` | `BYTEDESK_ORGANIZATION_NAME: MyCompany` |
| `bytedesk.organization.code` | 组织代码 | `bytedesk` | `BYTEDESK_ORGANIZATION_CODE: bytedesk` |

## 功能特性配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.features.java-ai` | 是否启用Java AI功能 | `true` | `BYTEDESK_FEATURES_JAVA_AI: false` |
| `bytedesk.features.python-ai` | 是否启用Python AI功能 | `false` | `BYTEDESK_FEATURES_PYTHON_AI: true` |
| `bytedesk.features.email-type` | 邮件发送方式，可选：`javamail`/`aliyun` | `javamail` | `BYTEDESK_FEATURES_EMAIL_TYPE: javamail` |
| `bytedesk.features.avatar-base-url` | 头像基础URL | - | `BYTEDESK_FEATURES_AVATAR_BASE_URL:` |

## 跨域配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.cors.allowed-origins` | 允许的跨域来源 | `*` | `BYTEDESK_CORS_ALLOWED_ORIGINS: *` |

## JWT配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.jwt.secret-key` | JWT密钥 | `1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` | `BYTEDESK_JWT_SECRET_KEY: 1dfaf8d004207b628a9a6b859c429f49a9a7ead9fd8161c1e60847aeef06dbd2` |
| `bytedesk.jwt.expiration` | JWT过期时间（毫秒），默认30天 | `2592000000` | `BYTEDESK_JWT_EXPIRATION: 2592000000` |
| `bytedesk.jwt.refresh-token-expiration` | 刷新令牌过期时间（毫秒），默认60天 | `5184000000` | `BYTEDESK_JWT_REFRESH_TOKEN_EXPIRATION: 5184000000` |

## 缓存配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.cache.level` | 缓存级别：0(不使用缓存)、1(使用Caffeine缓存)、2(使用Caffeine + Redis缓存) | `0` | `BYTEDESK_CACHE_LEVEL: 0` |
| `bytedesk.cache.prefix` | 缓存前缀 | `bytedeskim` | `BYTEDESK_CACHE_PREFIX: bytedeskim` |
| `bytedesk.cache.redis-stream-key` | Redis流键名 | `bytedeskim:stream` | `BYTEDESK_CACHE_REDIS_STREAM_KEY: bytedeskim:stream` |

## 上传配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.upload.type` | 上传类型 | `local` | `BYTEDESK_UPLOAD_TYPE: local` |
| `bytedesk.upload.dir` | 上传目录（请首先在服务器创建文件夹，路径末尾不能添加'/'） | `/var/www/html/weiyuai/file` | `BYTEDESK_UPLOAD_DIR: /var/www/html/weiyuai/file` |
| `bytedesk.upload.url` | 外部访问上传文件URL(需要将域名替换为自己域名) | `https://www.weiyuai.cn` | `BYTEDESK_UPLOAD_URL: https://www.weiyuai.cn` |

### 上传配置URL组成说明

完整的上传文件URL实例：`https://www.weiyuai.cn/file/2025/05/21/20250521112410_pigeon_blue.png`

其中：

- `https://www.weiyuai.cn` 对应 `bytedesk.upload.url` 配置值
- `/file` 对应 `bytedesk.upload.dir` 配置的最后一级目录名
- `/2025/05/21/20250521112410_pigeon_blue.png` 为系统自动生成的文件存储路径和文件名

## 知识库配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.kbase.theme` | 知识库主题，可选：`default`/`eduport`/`social`/`kbdoc` | `default` | `BYTEDESK_KBASE_THEME: default` |
| `bytedesk.kbase.html-path` | 请首先在服务器创建文件夹，HTML路径 | `/var/www/html/weiyuai/helpcenter` | `BYTEDESK_KBASE_HTML_PATH: /var/www/html/weiyuai/helpcenter` |
| `bytedesk.kbase.api-url` | 外部访问知识库URL(需要将域名替换为自己域名) | `https://api.weiyuai.cn` | `BYTEDESK_KBASE_API_URL: https://api.weiyuai.cn` |

## Socket模块配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.socket.enabled` | 是否启用Socket | `true` | `BYTEDESK_SOCKET_ENABLED: true` |
| `bytedesk.socket.host` | Socket主机 | `0.0.0.0` | `BYTEDESK_SOCKET_HOST: 0.0.0.0` |
| `bytedesk.socket.websocket-port` | WebSocket端口 | `9885` | `BYTEDESK_SOCKET_WEBSOCKET_PORT: 9885` |
| `bytedesk.socket.leak-detector-level` | 内存泄漏检测级别 | `SIMPLE` | `BYTEDESK_SOCKET_LEAK_DETECTOR_LEVEL: SIMPLE` |
| `bytedesk.socket.parent-event-loop-group-thread-count` | 父事件循环组线程数 | `1` | `BYTEDESK_SOCKET_PARENT_EVENT_LOOP_GROUP_THREAD_COUNT: 1` |
| `bytedesk.socket.child-event-loop-group-thread-count` | 子事件循环组线程数 | `8` | `BYTEDESK_SOCKET_CHILD_EVENT_LOOP_GROUP_THREAD_COUNT: 8` |
| `bytedesk.socket.max-payload-size` | 最大载荷大小（字节） | `10240` | `BYTEDESK_SOCKET_MAX_PAYLOAD_SIZE: 10240` |

## AI模块配置

### Ollama配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.ollama.base-url` | Ollama基础URL，默认为11434端口，Docker环境建议修改为21434端口 | `http://127.0.0.1:21434` | `SPRING_AI_OLLAMA_BASE_URL: http://127.0.0.1:21434` |
| `spring.ai.ollama.chat.enabled` | 是否启用Ollama聊天功能 | `true` | `SPRING_AI_OLLAMA_CHAT_ENABLED: true` |
| `spring.ai.ollama.chat.options.model` | Ollama聊天模型 | `qwen3:0.6b` | `SPRING_AI_OLLAMA_CHAT_OPTIONS_MODEL: qwen3:0.6b` |
| `spring.ai.ollama.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_OLLAMA_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.ollama.embedding.enabled` | 是否启用Ollama嵌入功能 | `true` | `SPRING_AI_OLLAMA_EMBEDDING_ENABLED: true` |
| `spring.ai.ollama.embedding.options.model` | Ollama嵌入模型 | `bge-m3:latest` | `SPRING_AI_OLLAMA_EMBEDDING_OPTIONS_MODEL: bge-m3:latest` |

### 智谱AI配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.zhipuai.api-key` | 智谱AI API密钥 | `sk-xxx` | `SPRING_AI_ZHIPUAI_API_KEY: sk-xxx` |
| `spring.ai.zhipuai.chat.enabled` | 是否启用智谱AI聊天功能 | `false` | `SPRING_AI_ZHIPUAI_CHAT_ENABLED: false` |
| `spring.ai.zhipuai.chat.options.model` | 智谱AI聊天模型 | `glm-4-flash` | `SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash` |
| `spring.ai.zhipuai.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.zhipuai.embedding.enabled` | 是否启用智谱AI嵌入功能 | `false` | `SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: false` |

### DeepSeek配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.deepseek.base-url` | DeepSeek基础URL | `https://api.deepseek.com` | `SPRING_AI_DEEPSEEK_BASE_URL: https://api.deepseek.com` |
| `spring.ai.deepseek.api-key` | DeepSeek API密钥 | `sk-xxx` | `SPRING_AI_DEEPSEEK_API_KEY: sk-xxx` |
| `spring.ai.deepseek.chat.enabled` | 是否启用DeepSeek聊天功能 | `false` | `SPRING_AI_DEEPSEEK_CHAT_ENABLED: false` |
| `spring.ai.deepseek.chat.options.model` | DeepSeek聊天模型 | `deepseek-chat` | `SPRING_AI_DEEPSEEK_CHAT_OPTIONS_MODEL: deepseek-chat` |
| `spring.ai.deepseek.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_DEEPSEEK_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### OpenAI配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.openai.base-url` | OpenAI基础URL | `https://api.openai.com` | `SPRING_AI_OPENAI_BASE_URL: https://api.openai.com` |
| `spring.ai.openai.api-key` | OpenAI API密钥 | `sk-xxx` | `SPRING_AI_OPENAI_API_KEY: sk-xxx` |
| `spring.ai.openai.chat.enabled` | 是否启用OpenAI聊天功能 | `false` | `SPRING_AI_OPENAI_CHAT_ENABLED: false` |
| `spring.ai.openai.chat.options.model` | OpenAI聊天模型 | `gpt-4o` | `SPRING_AI_OPENAI_CHAT_OPTIONS_MODEL: gpt-4o` |
| `spring.ai.openai.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_OPENAI_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.openai.embedding.enabled` | 是否启用OpenAI嵌入功能 | `false` | `SPRING_AI_OPENAI_EMBEDDING_ENABLED: false` |
| `spring.ai.openai.image.enabled` | 是否启用OpenAI图像功能 | `false` | `SPRING_AI_OPENAI_IMAGE_ENABLED: false` |
| `spring.ai.openai.audio.transcription.enabled` | 是否启用OpenAI音频转录功能 | `false` | `SPRING_AI_OPENAI_AUDIO_TRANSCRIPTION_ENABLED: false` |
| `spring.ai.openai.audio.speech.enabled` | 是否启用OpenAI语音功能 | `false` | `SPRING_AI_OPENAI_AUDIO_SPEECH_ENABLED: false` |
| `spring.ai.openai.moderation.enabled` | 是否启用OpenAI内容审核功能 | `false` | `SPRING_AI_OPENAI_MODERATION_ENABLED: false` |

### 阿里云百炼配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.dashscope.base-url` | 阿里云百炼基础URL | `https://dashscope.aliyuncs.com/compatible-mode` | `SPRING_AI_DASHSCOPE_BASE_URL: https://dashscope.aliyuncs.com/compatible-mode` |
| `spring.ai.dashscope.api-key` | 阿里云百炼API密钥 | `sk-xxx` | `SPRING_AI_DASHSCOPE_API_KEY: sk-xxx` |
| `spring.ai.dashscope.chat.enabled` | 是否启用阿里云百炼聊天功能 | `false` | `SPRING_AI_DASHSCOPE_CHAT_ENABLED: false` |
| `spring.ai.dashscope.chat.options.model` | 阿里云百炼聊天模型 | `deepseek-r1` | `SPRING_AI_DASHSCOPE_CHAT_OPTIONS_MODEL: deepseek-r1` |
| `spring.ai.dashscope.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TEMPERATURE: 0.7` |
| `spring.ai.dashscope.chat.options.topP` | topP参数 | `3` | `SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TOP_P: 3` |
| `spring.ai.dashscope.audio.transcription.enabled` | 是否启用阿里云百炼音频转录功能 | `false` | `SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED: false` |
| `spring.ai.dashscope.image.enabled` | 是否启用阿里云百炼图像功能 | `false` | `SPRING_AI_DASHSCOPE_IMAGE_ENABLED: false` |
| `spring.ai.dashscope.embedding.enabled` | 是否启用阿里云百炼嵌入功能 | `false` | `SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED: false` |
| `spring.ai.dashscope.audio.synthesis.enabled` | 是否启用阿里云百炼音频合成功能 | `false` | `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED: false` |
| `spring.ai.nacos.prompt.template.enabled` | 是否启用Nacos提示模板 | `false` | `SPRING_AI_NACOS_PROMPT_TEMPLATE_ENABLED: false` |

### SiliconFlow配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.siliconflow.base-url` | SiliconFlow基础URL | `https://api.siliconflow.cn` | `SPRING_AI_SILICONFLOW_BASE_URL: https://api.siliconflow.cn` |
| `spring.ai.siliconflow.api-key` | SiliconFlow API密钥 | `sk-xxxx` | `SPRING_AI_SILICONFLOW_API_KEY: sk-xxxx` |
| `spring.ai.siliconflow.chat.enabled` | 是否启用SiliconFlow聊天功能 | `false` | `SPRING_AI_SILICONFLOW_CHAT_ENABLED: false` |
| `spring.ai.siliconflow.chat.options.model` | SiliconFlow聊天模型 | `Qwen/QwQ-32B` | `SPRING_AI_SILICONFLOW_CHAT_OPTIONS_MODEL: Qwen/QwQ-32B` |
| `spring.ai.siliconflow.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_SILICONFLOW_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### Gitee配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.gitee.base-url` | Gitee基础URL | `https://ai.gitee.com` | `SPRING_AI_GITEE_BASE_URL: https://ai.gitee.com` |
| `spring.ai.gitee.api-key` | Gitee API密钥 | `xxx` | `SPRING_AI_GITEE_API_KEY: xxx` |
| `spring.ai.gitee.chat.enabled` | 是否启用Gitee聊天功能 | `false` | `SPRING_AI_GITEE_CHAT_ENABLED: false` |
| `spring.ai.gitee.chat.options.model` | Gitee聊天模型 | `Qwen/QwQ-32B` | `SPRING_AI_GITEE_CHAT_OPTIONS_MODEL: Qwen/QwQ-32B` |
| `spring.ai.gitee.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_GITEE_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### 腾讯云配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.tencent.base-url` | 腾讯云基础URL | `https://api.hunyuan.cloud.tencent.com` | `SPRING_AI_TENCENT_BASE_URL: https://api.hunyuan.cloud.tencent.com` |
| `spring.ai.tencent.api-key` | 腾讯云API密钥 | `sk-xxx` | `SPRING_AI_TENCENT_API_KEY: sk-xxx` |
| `spring.ai.tencent.chat.enabled` | 是否启用腾讯云聊天功能 | `false` | `SPRING_AI_TENCENT_CHAT_ENABLED: false` |
| `spring.ai.tencent.chat.options.model` | 腾讯云聊天模型 | `hunyuan-t1-latest` | `SPRING_AI_TENCENT_CHAT_OPTIONS_MODEL: hunyuan-t1-latest` |
| `spring.ai.tencent.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_TENCENT_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### 百度云配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.baidu.base-url` | 百度云基础URL | `https://qianfan.baidubce.com/v2` | `SPRING_AI_BAIDU_BASE_URL: https://qianfan.baidubce.com/v2` |
| `spring.ai.baidu.api-key` | 百度云API密钥 | `bce-v3/xxx` | `SPRING_AI_BAIDU_API_KEY: bce-v3/xxx` |
| `spring.ai.baidu.chat.enabled` | 是否启用百度云聊天功能 | `false` | `SPRING_AI_BAIDU_CHAT_ENABLED: false` |
| `spring.ai.baidu.chat.options.model` | 百度云聊天模型 | `ernie-x1-32k-preview` | `SPRING_AI_BAIDU_CHAT_OPTIONS_MODEL: ernie-x1-32k-preview` |
| `spring.ai.baidu.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_BAIDU_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### 火山引擎配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.volcengine.base-url` | 火山引擎基础URL | `https://ark.cn-beijing.volces.com/api/v3` | `SPRING_AI_VOLCENGINE_BASE_URL: https://ark.cn-beijing.volces.com/api/v3` |
| `spring.ai.volcengine.api-key` | 火山引擎API密钥 | `xxx` | `SPRING_AI_VOLCENGINE_API_KEY: xxx` |
| `spring.ai.volcengine.chat.enabled` | 是否启用火山引擎聊天功能 | `false` | `SPRING_AI_VOLCENGINE_CHAT_ENABLED: false` |
| `spring.ai.volcengine.chat.options.model` | 火山引擎聊天模型 | `doubao-1-5-pro-32k-250115` | `SPRING_AI_VOLCENGINE_CHAT_OPTIONS_MODEL: doubao-1-5-pro-32k-250115` |
| `spring.ai.volcengine.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_VOLCENGINE_CHAT_OPTIONS_TEMPERATURE: 0.7` |

### OpenRouter配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.ai.openrouter.base-url` | OpenRouter基础URL | `https://openrouter.ai` | `SPRING_AI_OPENROUTER_BASE_URL: https://openrouter.ai` |
| `spring.ai.openrouter.api-key` | OpenRouter API密钥 | - | `SPRING_AI_OPENROUTER_API_KEY:` |
| `spring.ai.openrouter.chat.enabled` | 是否启用OpenRouter聊天功能 | `false` | `SPRING_AI_OPENROUTER_CHAT_ENABLED: false` |
| `spring.ai.openrouter.chat.options.model` | OpenRouter聊天模型 | - | `SPRING_AI_OPENROUTER_CHAT_OPTIONS_MODEL:` |
| `spring.ai.openrouter.chat.options.temperature` | 温度参数 | `0.7` | `SPRING_AI_OPENROUTER_CHAT_OPTIONS_TEMPERATURE: 0.7` |

## Telegram配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.telegram.enabled` | 是否启用Telegram功能 | `false` | `BYTEDESK_TELEGRAM_ENABLED: false` |
| `bytedesk.telegram.default-bot-enabled` | 是否启用默认Telegram机器人。必须先启用Telegram功能，此配置才有效 | `false` | `BYTEDESK_TELEGRAM_DEFAULT_BOT_ENABLED: false` |
| `bytedesk.telegram.default-bot-token` | 默认Telegram机器人令牌 | `placeholder` | `BYTEDESK_TELEGRAM_DEFAULT_BOT_TOKEN: placeholder` |

> 注意：使用Telegram功能需要确保服务器能够访问 `https://api.telegram.org`

## 向量数据库配置

### Elasticsearch向量存储配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `spring.elasticsearch.uris` | Elasticsearch URI | `http://127.0.0.1:19200` | `SPRING_ELASTICSEARCH_URIS: http://127.0.0.1:19200` |
| `spring.elasticsearch.username` | Elasticsearch用户名 | `elastic` | `SPRING_ELASTICSEARCH_USERNAME: elastic` |
| `spring.elasticsearch.password` | Elasticsearch密码 | `bytedesk123` | `SPRING_ELASTICSEARCH_PASSWORD: bytedesk123` |
| `spring.ai.vectorstore.elasticsearch.enabled` | 是否启用Elasticsearch向量存储 | `true` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_ENABLED: true` |
| `spring.ai.vectorstore.elasticsearch.initialize-schema` | 是否初始化Elasticsearch向量存储架构 | `true` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_INITIALIZE_SCHEMA: true` |
| `spring.ai.vectorstore.elasticsearch.index-name` | Elasticsearch向量存储索引名称 | `bytedesk_vs_index` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_INDEX_NAME: bytedesk_vs_index` |
| `spring.ai.vectorstore.elasticsearch.dimensions` | Elasticsearch向量维度 | `1024` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_DIMENSIONS: 1024` |
| `spring.ai.vectorstore.elasticsearch.similarity` | Elasticsearch相似度计算方法 | `cosine` | `SPRING_AI_VECTORSTORE_ELASTICSEARCH_SIMILARITY: cosine` |

## 阿里云短信服务配置 - 手机登录验证码

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `aliyun.region.id` | 阿里云区域ID查看 | `cn-hangzhou` | `ALIYUN_REGION_ID: cn-hangzhou` |
| `aliyun.access.key.id` | 阿里云访问密钥ID申请 | - | `ALIYUN_ACCESS_KEY_ID:` |
| `aliyun.access.key.secret` | 阿里云访问密钥秘钥申请 | - | `ALIYUN_ACCESS_KEY_SECRET:` |
| `aliyun.sms.signname` | 短信签名申请 | `ALIYUN_SMS_SIGNNAME: 微语` | `ALIYUN_SMS_SIGNNAME: 微语` |
| `aliyun.sms.templatecode` | 短信模板申请 | `SMS_xxxxxxxxx` | `ALIYUN_SMS_TEMPLATECODE: SMS_xxxxxxxxx` |

### 阿里云短信相关资源链接

- [阿里云区域ID查看](https://api.aliyun.com/product/Dysmsapi) - 短信服务区域ID查看文档
- [阿里云AccessKey申请](https://ram.console.aliyun.com/profile/access-keys) - 阿里云AccessKey管理控制台
- [阿里云短信签名申请](https://dysms.console.aliyun.com/domestic/text/sign) - 阿里云短信签名管理控制台
- [阿里云短信模板申请](https://dysms.console.aliyun.com/domestic/text/template) - 阿里云短信服务控制台

### 默认测试手机号和验证码配置

配置默认测试手机号白名单，这些手机号将使用固定验证码进行验证，方便开发和测试：

**配置文件方式：**

```properties
# 配置默认测试手机号白名单
bytedesk.admin.mobile-whitelist=18888888000,18888888001,18888888002,18888888003,18888888004,18888888005,18888888006

# 为白名单手机号和邮箱配置固定验证码，否则生成随机6位数字
bytedesk.admin.validate-code=123456
```

**Docker环境变量方式：**

```yaml
BYTEDESK_ADMIN_MOBILE_WHITELIST: 18888888000,18888888001,18888888002,18888888003,18888888004,18888888005
BYTEDESK_ADMIN_VALIDATE_CODE: 123456
```

> **注意：** 白名单手机号使用固定验证码，仅用于开发和测试环境。生产环境请谨慎使用，确保安全性。

## 百度翻译配置

| 参数名 | 说明 | 示例值 | Docker环境变量 |
| ------ | ------ | ------ | ------ |
| `bytedesk.translate.baidu.appid` | 百度翻译AppID | `placeholder` | `BYTEDESK_TRANSLATE_BAIDU_APPID: placeholder` |
| `bytedesk.translate.baidu.key` | 百度翻译密钥 | `placeholder` | `BYTEDESK_TRANSLATE_BAIDU_KEY: placeholder` |

### 百度翻译相关资源链接

- [百度翻译开放平台](https://fanyi-api.baidu.com/doc/21) - 百度翻译API文档
