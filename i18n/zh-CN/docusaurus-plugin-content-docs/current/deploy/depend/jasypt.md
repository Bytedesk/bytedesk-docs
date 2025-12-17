---
sidebar_label: Jasypt
sidebar_position: 18
---

# Jasypt

- [github](https://github.com/jasypt/jasypt?tab=readme-ov-file)
- [github下载](https://github.com/jasypt/jasypt/releases/download/jasypt-1.9.3/jasypt-1.9.3-dist.zip)
- [本地下载](https://www.weiyuai.cn/download/jasypt-1.9.3-dist.zip)

## 功能概述

Jasypt（Java Simplified Encryption）为 Bytedesk 的 Spring Boot 模块提供基于口令的加密与哈希能力，可安全地把敏感数据写入 `application-*.properties`、`.env` 或 Docker Compose，而无需暴露明文密钥。

## 命令行准备

1. 切换到工具目录并赋权：
	```bash
	cd deploy/jasypt-1.9.3
	chmod +x bin/*.sh
	```
2. Windows 直接运行同名 `.bat` 文件，无需 chmod。

## 常用脚本

| 脚本 | 功能 |
| --- | --- |
| `bin/encrypt.sh` | 输入明文，输出 BASE64 密文 |
| `bin/decrypt.sh` | 解密 `encrypt.sh` 生成的密文 |
| `bin/digest.sh` | 生成单向哈希（用于口令存储） |
| `bin/listAlgorithms.sh` | 列出当前 JDK 可用算法 |

## 加密敏感信息

1. 生成强口令，供脚本与 Spring Boot 共用：
	```bash
	export JASYPT_ENCRYPTOR_PASSWORD="$(openssl rand -base64 32)"
	```
2. 执行加密（替换 `mySecret` 为真实值）：
	```bash
	./bin/encrypt.sh input="mySecret" \
		 password="$JASYPT_ENCRYPTOR_PASSWORD" \
		 algorithm=PBEWITHHMACSHA512ANDAES_256
	```
3. 将输出结果包裹成 `ENC(...)` 并写入配置：
	```properties
	spring.datasource.password=ENC(ekPdwvAUc3QxZ0...)
	```

## 解密或校验

```bash
./bin/decrypt.sh input="<ciphertext>" \
	 password="$JASYPT_ENCRYPTOR_PASSWORD" \
	 algorithm=PBEWITHHMACSHA512ANDAES_256
```

仅需验证哈希是否一致时，可改用 `bin/digest.sh`。

## REST API 方式（推荐）

为避免依赖命令行工具，可使用 微语 内置的 REST API 接口进行加密/解密。**启动服务后，直接调用 HTTP 接口即可**，无需下载、安装、学习 Jasypt CLI。

### 接口概览

| 端点 | 方法 | 功能 | 必需参数 | 可选参数 |
|------|------|------|---------|---------|
| `/jasypt/encrypt` | POST | 加密明文 | `plaintext`（明文，在 JSON body 中） | `password`（自定义密码，在 JSON body 中，不提供则使用应用启动密钥） |
| `/jasypt/decrypt` | POST | 解密密文 | `ciphertext`（密文，在 JSON body 中） | `password`（自定义密码，在 JSON body 中，不提供则使用应用启动密钥） |
| `/jasypt/info` | GET | 查看工具信息 | 无 | 无 |

### 加密示例

#### 使用应用启动密钥加密

```bash
curl -X POST "http://127.0.0.1:9003/jasypt/encrypt" \
  -H "Content-Type: application/json" \
  -d '{"plaintext":"r8FqfdbWUaN3"}'
```

#### 使用自定义密码加密

下面命令中的 password 可以通过执行下面命令生成：
```bash
openssl rand -base64 32
```

```bash
curl -X POST "http://127.0.0.1:9003/jasypt/encrypt" \
  -H "Content-Type: application/json" \
  -d '{"plaintext":"r8FqfdbWUaN3", "password":"4PXVIoTO3wESIAnzT2XsnqXn1GtqeAks2QRMpFP0g8w="}'
```

#### 响应示例（使用自定义密码）

```json
{
  "code": 200,
  "message": "Encryption successful",
  "data": {
    "plaintext": "r8FqfdbWUaN3",
    "ciphertext": "ekPdwvAUc3QxZ0ZpSHpJYUZodVZSMnJUS25uVEQ0anVJYjBURU8yL2dSN0E9",
    "encFormat": "ENC(ekPdwvAUc3QxZ0ZpSHpJYUZodVZSMnJUS25uVEQ0anVJYjBURU8yL2dSN0E9)",
    "algorithm": "PBEWITHHMACSHA512ANDAES_256",
    "encryptionMode": "custom password"
  }
}
```

> 取 `encFormat` 字段的值，直接复制到 `application-*.properties` 中。若 `encryptionMode` 为 `custom password`，解密时也需要提供相同的密码。

### 解密示例

#### 使用应用启动密钥解密

```bash
curl -X POST "http://127.0.0.1:9003/jasypt/decrypt" \
  -H "Content-Type: application/json" \
  -d '{"ciphertext":"ekPdwvAUc3QxZ0ZpSHpJYUZodVZSMnJUS25uVEQ0anVJYjBURU8yL2dSN0E9"}'
```

#### 使用自定义密码解密

```bash
curl -X POST "http://127.0.0.1:9003/jasypt/decrypt" \
  -H "Content-Type: application/json" \
  -d '{"ciphertext":"ekPdwvAUc3QxZ0ZpSHpJYUZodVZSMnJUS25uVEQ0anVJYjBURU8yL2dSN0E9", "password":"4PXVIoTO3wESIAnzT2XsnqXn1GtqeAks2QRMpFP0g8w="}'
```

#### 响应示例（使用自定义密码）

```json
{
  "code": 200,
  "message": "Decryption successful",
  "data": {
    "ciphertext": "ekPdwvAUc3QxZ0ZpSHpJYUZodVZSMnJUS25uVEQ0anVJYjBURU8yL2dSN0E9",
    "plaintext": "r8FqfdbWUaN3",
    "decryptionMode": "custom password"
  }
}
```

### 查看工具信息

```bash
curl -X GET "http://127.0.0.1:9003/jasypt/info"
```

返回所有可用端点、使用说明及示例。

### Swagger UI 测试

启动服务后，访问 `http://127.0.0.1:9003/swagger-ui/index.html`，在 **jasypt - 加密解密** 分类下可找到三个接口，点击 **Try it out** 即可在线测试。

> **提示**：参数 `password` 为可选，可留空。如果留空，则使用应用启动时配置的 `JASYPT_ENCRYPTOR_PASSWORD`。

## 应用启动密钥 vs 自定义密码

| 场景 | 使用应用启动密钥 | 使用自定义密码 |
|------|-----------------|----------------|
| 配置文件中的 `ENC(...)` 密文 | ✓ 推荐 | 仅用于临时测试 |
| 一次性加密某个敏感值 | × | ✓ 推荐 |
| 跨应用共享加密数据 | × | ✓ 可用 |
| 无需重启应用 | × | ✓ 可用 |

> **建议**：
> - 若要将加密结果配置到 `application-*.properties`，应使用 **应用启动密钥**（启动服务时提供 `JASYPT_ENCRYPTOR_PASSWORD`）
> - 若只是临时加密某个值，可使用 **自定义密码**，但此时需要记住密码以便后续解密

## Spring Boot 集成

启动服务时提供相同口令，即可自动解析 `ENC(...)`：

```bash
export JASYPT_ENCRYPTOR_PASSWORD=<strong-password>
java -Djasypt.encryptor.password=$JASYPT_ENCRYPTOR_PASSWORD -jar bytedesk-starter.jar
```

算法、迭代次数等可由 `bytedesk.security.jasypt.*`（如 `BYTEDESK_SECURITY_JASYPT_ALGORITHM`）调整。

## Docker Compose 场景

- 在 `.env` 或 `docker-compose*.yaml` 中保持 `ENC(...)` 格式。
- 仅在本地 `.env` 保存 `JASYPT_ENCRYPTOR_PASSWORD`，禁止提交仓库。
- 执行 `docker compose up` 时变量会自动注入，容器启动即完成解密。

## 常见问题排查

- 加密失败时运行 `bin/listAlgorithms.sh`，确认算法受当前 JDK 支持。
- 出现 `BadPaddingException` 多因口令或算法不一致，需保持与加密端完全相同。
- 若运行期仍得到明文，请确认 Shell 与服务进程都能读取 `JASYPT_ENCRYPTOR_PASSWORD`。
