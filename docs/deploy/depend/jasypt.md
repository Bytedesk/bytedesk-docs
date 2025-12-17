---
sidebar_label: Jasypt
sidebar_position: 18
---

# Jasypt

- [github](https://github.com/jasypt/jasypt?tab=readme-ov-file)
- [Download](https://github.com/jasypt/jasypt/releases/download/jasypt-1.9.3/jasypt-1.9.3-dist.zip)
- [Mirror](https://www.weiyuai.cn/download/jasypt-1.9.3-dist.zip)

# Overview

Jasypt (Java Simplified Encryption) adds password-based encryption and hashing to any Spring Boot module in Bytedesk. Use it whenever sensitive values must be stored inside `application-*.properties`, `.env`, or Docker Compose files without exposing raw secrets in version control.

## Prepare The CLI

1. Go to the bundled toolkit.
	```bash
	cd deploy/jasypt-1.9.3
	chmod +x bin/*.sh
	```
2. On Windows run the `.bat` counterparts, no extra chmod needed.

## Common Scripts

| Script | Purpose |
| --- | --- |
| `bin/encrypt.sh` | Encrypts an input string and prints a BASE64 ciphertext |
| `bin/decrypt.sh` | Decrypts a value produced by `encrypt.sh` |
| `bin/digest.sh` | Generates one-way hashes (useful for passwords) |
| `bin/listAlgorithms.sh` | Lists algorithms supported by the current JDK |

## Encrypt Secrets

1. Generate a strong password and export it so both CLI scripts and Spring Boot share the same secret.
	```bash
	export JASYPT_ENCRYPTOR_PASSWORD="$(openssl rand -base64 32)"
	```
2. Encrypt the plaintext (replace `mySecret`).
	```bash
	./bin/encrypt.sh input="mySecret" \
		 password="$JASYPT_ENCRYPTOR_PASSWORD" \
		 algorithm=PBEWITHHMACSHA512ANDAES_256
	```
3. Wrap the output with `ENC(...)` before placing it inside configuration files, for example:
	```properties
	spring.datasource.password=ENC(ekPdwvAUc3QxZ0...)
	```

## Decrypt Or Verify

```bash
./bin/decrypt.sh input="<ciphertext>" \
	 password="$JASYPT_ENCRYPTOR_PASSWORD" \
	 algorithm=PBEWITHHMACSHA512ANDAES_256
```

If you only need to confirm a value matches a stored hash, rely on `bin/digest.sh` instead of decrypting.

## Spring Boot Integration

Provide the same password when launching services so encrypted properties resolve automatically:

```bash
export JASYPT_ENCRYPTOR_PASSWORD=<strong-password>
java -Djasypt.encryptor.password=$JASYPT_ENCRYPTOR_PASSWORD -jar bytedesk-starter.jar
```

Fine-tune algorithms or iterations via `bytedesk.security.jasypt.*` properties (e.g., `BYTEDESK_SECURITY_JASYPT_ALGORITHM`).

## Docker Compose Usage

- Put encrypted values inside `.env` or `docker-compose*.yaml` as `ENC(...)`.
- Store the password locally (never commit it) by adding `JASYPT_ENCRYPTOR_PASSWORD=<password>` to `.env`.
- During `docker compose up`, the environment variable is injected automatically, so containers can decrypt secrets at startup.

## Troubleshooting

- If encryption fails, rerun `bin/listAlgorithms.sh` to confirm the algorithm exists in the JDK.
- For `BadPaddingException`, ensure the password, algorithm, and iterations match those used to encrypt the value.
- When secrets appear as plain text, confirm the password variable is present for both shell sessions and runtime processes.
