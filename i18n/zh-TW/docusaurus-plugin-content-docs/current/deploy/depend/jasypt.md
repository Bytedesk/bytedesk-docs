---
sidebar_label: Jasypt
sidebar_position: 18
---

# Jasypt

- [github](https://github.com/jasypt/jasypt?tab=readme-ov-file)
- [下載](https://github.com/jasypt/jasypt/releases/download/jasypt-1.9.3/jasypt-1.9.3-dist.zip)
- [鏡像下載](https://www.weiyuai.cn/download/jasypt-1.9.3-dist.zip)

## 功能總覽

Jasypt（Java Simplified Encryption）為 Bytedesk 的 Spring Boot 模組提供基於口令的加密與雜湊功能，能把敏感資料安全寫入 `application-*.properties`、`.env` 或 Docker Compose，而不需在版控中暴露明文。

## 命令列準備

1. 進入工具目錄並賦予執行權限：
	```bash
	cd deploy/jasypt-1.9.3
	chmod +x bin/*.sh
	```
2. Windows 直接執行同名 `.bat` 檔案，無須額外設定。

## 常用腳本

| 腳本 | 功能 |
| --- | --- |
| `bin/encrypt.sh` | 輸入明文，輸出 BASE64 密文 |
| `bin/decrypt.sh` | 解密 `encrypt.sh` 產生的密文 |
| `bin/digest.sh` | 產生單向雜湊（適合儲存口令） |
| `bin/listAlgorithms.sh` | 顯示目前 JDK 支援的演算法 |

## 加密敏感資訊

1. 產生強度足夠的口令，供腳本與 Spring Boot 共用：
	```bash
	export JASYPT_ENCRYPTOR_PASSWORD="$(openssl rand -base64 32)"
	```
2. 執行加密（將 `mySecret` 換成實際內容）：
	```bash
	./bin/encrypt.sh input="mySecret" \
		 password="$JASYPT_ENCRYPTOR_PASSWORD" \
		 algorithm=PBEWITHHMACSHA512ANDAES_256
	```
3. 將輸出包起來並寫入設定檔：
	```properties
	spring.datasource.password=ENC(ekPdwvAUc3QxZ0...)
	```

## 解密或驗證

```bash
./bin/decrypt.sh input="<ciphertext>" \
	 password="$JASYPT_ENCRYPTOR_PASSWORD" \
	 algorithm=PBEWITHHMACSHA512ANDAES_256
```

若只需確認雜湊是否一致，可改用 `bin/digest.sh`。

## Spring Boot 整合

啟動服務時提供相同口令，即可自動解析 `ENC(...)`：

```bash
export JASYPT_ENCRYPTOR_PASSWORD=<strong-password>
java -Djasypt.encryptor.password=$JASYPT_ENCRYPTOR_PASSWORD -jar bytedesk-starter.jar
```

演算法、迭代次數等可透過 `bytedesk.security.jasypt.*`（例如 `BYTEDESK_SECURITY_JASYPT_ALGORITHM`）調整。

## Docker Compose 使用情境

- 在 `.env` 或 `docker-compose*.yaml` 中維持 `ENC(...)` 格式。
- 只在本機 `.env` 儲存 `JASYPT_ENCRYPTOR_PASSWORD`，勿提交至版本庫。
- 執行 `docker compose up` 時環境變數會自動注入，容器啟動即可完成解密。

## 疑難排解

- 若加密失敗，先執行 `bin/listAlgorithms.sh` 確認演算法受到 JDK 支援。
- `BadPaddingException` 多半代表口令或演算法不一致，需與加密端保持相同設定。
- 若服務仍讀到明文，確認 Shell 與應用程式進程都能取得 `JASYPT_ENCRYPTOR_PASSWORD`。
