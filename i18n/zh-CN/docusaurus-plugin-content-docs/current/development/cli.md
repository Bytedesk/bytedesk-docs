---
sidebar_label: CLI
sidebar_position: 71
---

# CLI

微语 CLI 是一个轻量级命令行运行时，用于自动化脚本、Agent 调用和运维操作。

## 模块组成

- `modules/cli`：开源版 CLI 基础模块
- `enterprise/cli`：基于同一运行时扩展的企业版 CLI 模块
- `starter`：桥接入口，允许通过 starter 打包产物直接分发 CLI 命令

## 当前命令组

- `auth`：登录、查看当前会话、退出登录
- `org`：列出组织、查看当前组织、切换组织、按 uid 查询组织
- `ticket`：查询工单、查看工单详情、创建工单、关闭工单
- `config`：查看和修改本地配置
- `thread`、`message`、`knowledge`：当前仍为占位命令组
- `license`、`seat`、`audit`：企业版占位命令组

## 本地配置

CLI 配置文件保存在 `~/.bytedesk/config.properties`。

常用配置键：

- `server.base-url`
- `auth.token`
- `auth.platform`
- `auth.channel`
- `auth.current-org-uid`
- `auth.current-org-name`

## 构建命令

```bash
./starter/mvnw -f pom.xml -pl modules/cli,enterprise/cli -am -DskipTests compile
./starter/mvnw -f pom.xml -pl modules/cli -am -Dtest=BytedeskCliTests -Dsurefire.failIfNoSpecifiedTests=false test
./starter/mvnw -f pom.xml -pl enterprise/cli -am -Dtest=com.bytedesk.cli.EnterpriseCliTests -Dsurefire.failIfNoSpecifiedTests=false test
```

## 直接运行 CLI jar

开源版 CLI：

```bash
java -jar modules/cli/target/bytedesk-module-cli-1.9.0.jar help
java -jar modules/cli/target/bytedesk-module-cli-1.9.0.jar auth whoami
```

企业版 CLI：

```bash
java -jar enterprise/cli/target/bytedesk-enterprise-cli-1.9.0.jar help
```

## 通过 bytedesk-starter 调用 CLI

现在 `bytedesk-starter` 已经聚合了开源版和企业版 CLI 模块，可以直接通过 starter 包分发 CLI 能力。

通过 starter 调用开源版 CLI：

```bash
java -jar starter/target/bytedesk-starter.jar cli help
java -jar starter/target/bytedesk-starter.jar cli auth login \
  --server http://127.0.0.1:9003 \
  --username admin@email.com \
  --password your-password
java -jar starter/target/bytedesk-starter.jar cli ticket list --page 0 --size 10
```

通过 starter 调用企业版 CLI：

```bash
java -jar starter/target/bytedesk-starter.jar enterprise-cli help
```

当首个参数是 `cli` 或 `enterprise-cli` 时，starter 会直接切换到 CLI 运行模式，不再启动 Web 服务。

## 推荐使用流程

```bash
java -jar starter/target/bytedesk-starter.jar cli auth login \
  --server http://127.0.0.1:9003 \
  --username admin@email.com \
  --password your-password
java -jar starter/target/bytedesk-starter.jar cli org list
java -jar starter/target/bytedesk-starter.jar cli org switch --org your-org-uid
java -jar starter/target/bytedesk-starter.jar cli ticket create \
  --title "支付回调失败" \
  --description "生产环境回调接口返回 500" \
  --priority HIGH \
  --type BUG
```

## JSON 输出

如果给脚本、Agent 或自动化流程使用，请将 `--format=json` 放在命令名前。

```bash
java -jar starter/target/bytedesk-starter.jar cli --format=json auth whoami
java -jar starter/target/bytedesk-starter.jar cli --format=json ticket list --page 0 --size 5
```

## 当前限制

- `thread`、`message`、`knowledge` 仍为占位实现
- 企业版命令组当前仍为占位实现
- 当前 CLI 调用依赖微语标准返回结构：`code`、`message`、`data`
- 本地联调通常默认服务端地址为 `http://127.0.0.1:9003`
