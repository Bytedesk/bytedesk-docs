---
sidebar_label: 源碼部署
sidebar_position: 2
---

# 源碼部署指南

:::info 試用版License
需要試用版License？請參考：[問題13：如何申請licenseKey](../faq#問題13如何申請licensekey)
:::

本文檔提供詳細的源碼部署步驟，幫助您快速部署和執行專案。

:::tip 系統要求

- **作業系統**：Ubuntu 22.04 LTS
- **硬體配置**：標準部署：2核4G記憶體

:::

## 1. 取得源碼

首先，從程式碼倉庫克隆專案源碼到本地：

```bash
# 國內使用者推薦使用Gitee鏡像源
git clone https://github.com/Bytedesk/bytedesk.git

# 或者使用GitHub源
git clone https://github.com/bytedesk/bytedesk.git

# 進入專案目錄
cd weiyu  # 或 cd bytedesk
```

## 2. 環境準備

### 2.1 安裝JDK 17

專案基於Spring Boot 3開發，**必須**使用JDK 17或更高版本：

```bash
# 檢查Java版本
java --version
# 應顯示: java 17.x.x 或更高版本
```

如果沒有安裝JDK 17，請參考：[JDK 17安裝指南](./depend/jdk)

### 2.2 安裝專案依賴

- [安裝專案依賴](./jar.md#12-安裝專案依賴)

## 3. 編譯與啟動

### 3.1 安裝開發工具

推薦的開發環境：

- 編輯器：Visual Studio Code
- 建構工具：Maven 3.6+
- 其他依賴：protobuf 編譯工具（專案使用了protobuf）

```bash
# 檢查Maven版本
mvn --version
# 應顯示 Apache Maven 3.6+ 版本

# 檢查protobuf版本（如果已安裝）
protoc --version
# 建議使用 libprotoc 25.0+
```

### 3.2 編譯專案

```bash
# 在專案根目錄下執行編譯（跳過測試以加快速度）
./mvnw install -Dmaven.test.skip=true
```

### 3.3 修改配置檔案

編輯`starter/src/main/resources/application-dev.properties`檔案，配置資料庫和Redis連線資訊：[請參考應用配置說明](./config.md)

### 3.4 啟動專案

```bash
# 進入啟動模組目錄
cd starter

# 啟動應用
./mvnw spring-boot:run
```

> 🚀 **啟動成功標誌**：控制台輸出"Started Application"且無異常資訊。

## 4. 存取系統

### 4.1 本地存取
