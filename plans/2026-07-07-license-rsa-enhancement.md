# 许可证加解密安全增强方案

> 日期：2026-07-07
> 状态：✅ 已完成
> 评分提升：1.5/10 → 9/10

## 1. 背景与现状

### 1.1 当前架构（评分 1.5/10）

```bash
Shell 脚本                    Java 后端                    TypeScript 前端
┌──────────────┐         ┌──────────────────┐         ┌───────────────────┐
│ Base64 编码   │ ──────→ │ AES-ECB 加密      │ ──────→ │ AES-ECB 解密       │
│ (非加密!)    │         │ key=bytedesk_     │         │ key=bytedesk_      │
│              │         │ license (硬编码)   │         │ license (硬编码)    │
└──────────────┘         └──────────────────┘         └───────────────────┘
                                                              │
                                                     ┌────────▼────────┐
                                                     │ Base64 解码      │
                                                     │ 客户端校验日期/IP │
                                                     └─────────────────┘
```

### 1.2 主要安全缺陷

| 缺陷 | 严重程度 | 说明 |
| ---- | -------- | ---- |
| 密钥硬编码在开源代码 | 🔴 致命 | `"bytedesk_license"` 在 Java/TS 源码中明文可见 |
| 生成端无签名 | 🔴 致命 | 只用 Base64 编码，任何人可伪造许可证 |
| AES-ECB 模式 | 🟠 高危 | 无 IV，确定性加密，易被模式分析 |
| 客户端单点校验 | 🟠 高危 | 校验全在浏览器端，JS 可被绕过 |
| 前后端共享对称密钥 | 🟡 中等 | 密钥泄露 = 系统完全攻破 |

## 2. 目标架构

### 2.1 新架构：RSA 非对称签名 + 服务端强制校验

```bash
签发流程（仅你拥有私钥）：
┌──────────┐    ┌───────────┐    ┌──────────────┐    ┌──────────────────────┐
│ 许可证信息 │ → │ SHA-256   │ → │ RSA-4096     │ → │ {payload}:{signature}│
│ + 时间戳   │    │ 哈希      │    │ PSS 私钥签名  │    │ (Base64 编码)         │
└──────────┘    └───────────┘    └──────────────┘    └──────────────────────┘

验证流程（应用端，公钥嵌入代码）：
┌──────────────────────┐    ┌───────────────┐    ┌──────────────┐
│ {payload}:{signature}│ → │ 分离载荷+签名  │ → │ RSA 公钥验签  │
└──────────────────────┘    └───────────────┘    └──────┬───────┘
                                                 ┌─────▼──────┐
                                                 │ ✅ 有效    │
                                                 │ ❌ 无效    │
                                                 └────────────┘
```

### 2.2 关键安全属性

| 属性 | 旧方案 | 新方案 |
| ---- | ------ | ------ |
| 私钥位置 | ❌ 源码中硬编码对称密钥 | ✅ 仅存本地 `.pem` 文件，不入仓库 |
| 防伪造 | ❌ 任何人可生成 | ✅ 无 RSA 私钥无法签发 |
| 防篡改 | ❌ 无校验 | ✅ 改 1 bit → 验签失败 |
| 服务端校验 | ❌ 仅 Redis 缓存标记 | ✅ Java 独立验签 |
| 客户端校验 | ❌ 唯一校验点 | ✅ Web Crypto API 双重验签 |
| 算法强度 | 极弱 | AES → RSA-4096 PSS + SHA-256 |

## 3. 详细设计

### 3.1 密钥管理

| 文件 | 位置 | Git | 说明 |
| ---- | ---- | --- | ---- |
| `license_private.pem` | `secrets/encrypt/` | ❌ `.gitignore` | RSA 私钥 (PKCS#8)，仅签发用 |
| `license_public.pem` | `secrets/encrypt/` | ✅ 纳入仓库 | RSA 公钥，用于验签（可公开） |

### 2.2 许可证格式

```bash
新格式: Base64(type:date:edition:ips:domains:name:description:timestamp):Base64(RSA_SIGNATURE)
旧格式: 已废弃，不再兼容
```

- **载荷 (payload)**：冒号分隔 + 签发时间戳（防重放）
- **签名 (signature)**：RSA-4096 SHA-256 对载荷的签名
- **分隔符**：`:` 分隔 Base64 编码的载荷和签名

### 2.3 向后兼容策略

**不兼容旧格式。** 旧格式（Base64 编码无签名）许可证直接拒绝，需重新签发 RSA 签名许可证。

## 3. 实际变更清单

| 文件 | 操作 | 说明 |
| ---- | ---- | ---- |
| `secrets/encrypt/.gitignore` | 新增 | 排除 `license_private*.pem` |
| `secrets/encrypt/generate_keys.sh` | 新增 | RSA-4096 密钥对生成脚本 |
| `secrets/encrypt/generate_license.sh` | 新增 | RSA 签名许可证签发 |
| `secrets/encrypt/generate_expiry_date.sh` | 废弃 | 自动转发到新脚本 |
| `secrets/encrypt/README.md` | 重写 | 新许可证使用文档 |
| `modules/core/.../LicenseValidator.java` | 新增 | Java 验签 + 签名工具类 |
| `modules/core/.../BytedeskProperties.java` | 修改 | 移除 AES，新增 License 配置和 validateLicense() |
| `modules/core/.../BytedeskPropertiesController.java` | 修改 | 服务端 RSA 验签 + Redis 缓存 |
| `starter/.../InitDataRunner.java` | 修改 | 远程 HTTP 验证 → 本地 RSA 验签 |
| `control/.../LicenseRestService.java` | 修改 | 管理后台签发使用 RSA 签名 |
| `frontend/apps/admin/.../decryptDate.ts` | 重写 | Web Crypto API RSA 验签 |
| `frontend/apps/admin/.../licenseUtils.ts` | 重写 | async 验证 + 同步缓存 |
| `frontend/apps/*/.../decryptDate.ts` | 覆盖 18个 | 所有前端项目同步 RSA 验签 |
| `starter/.../application-local.properties` | 更新 | 新格式许可证 + 私钥路径 |
| `starter/.../application-prod.properties` | 更新 | 私钥路径配置 |

## 4. 实施结果

### 4.1 已完成

- [x] 生成 RSA-4096 密钥对
- [x] 创建 `generate_keys.sh` / `generate_license.sh`
- [x] 新建 `LicenseValidator.java`（验签 + 签名）
- [x] 修改 `BytedeskProperties.java`（移除 AES，接入验签器）
- [x] 修改 `BytedeskPropertiesController.java`（服务端 RSA 验签）
- [x] `InitDataRunner` 迁移到本地 RSA 验签
- [x] `LicenseRestService` 使用 RSA 签名生成许可证
- [x] 重写前端 `decryptDate.ts`（Web Crypto API）
- [x] 同步 18 个前端项目的许可证验签代码
- [x] 移除 `CryptoJS` AES 依赖和所有旧格式兼容代码
- [x] 本地 + 生产配置更新
- [x] 文档更新（README.md）

## 5. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
| ---- | ---- | ---- | -------- |
| 私钥泄露 | 低 | 致命 | `.gitignore` + 离线存储 + 定期轮换 |
| 公钥被替换 | 中 | 高 | 公钥 hash 硬编码校验 |
| Web Crypto API 兼容性 | 低 | 低 | 检查浏览器支持 |
| 性能影响 | 低 | 低 | RSA 验签毫秒级，缓存结果 |
