---
sidebar_label: Janus
sidebar_position: 14
---

# Janus WebRTC 伺服器

:::info 提示
以下說明僅供參考，具體設定與使用方式請參考 Janus 官方文件：https://janus.conf.meetecho.com/docs/
:::

## 概述

Janus 是一套由 Meetecho 開發的開源通用 WebRTC 伺服器。它是輕量級的 WebRTC 閘道，可作為媒體伺服器處理音視訊通訊。

### 主要特性

- 多協定支援：HTTP、WebSocket、RabbitMQ 等
- 外掛架構：模組化設計，對應多種音視訊情境
- 高效能：以 C 寫成，表現優異
- 跨平台：支援 Linux、macOS、Windows
- 符合 WebRTC 標準：支援現代瀏覽器

### 應用情境

- 視訊會議
- 線上教育
- 直播／錄播
- 點對點通訊
- 多人語音/視訊聊天

### 系統需求

- 作業系統：Linux（建議 Ubuntu 18.04+/CentOS 7+）
- 記憶體：至少 1GB（建議 2GB+）
- 網路：公網 IP 或正確的 NAT 設定
- 依賴：libmicrohttpd、libwebsockets、OpenSSL…

### 微語官方測試與參考

:::tip 官方資源
- 線上測試（微語官方）：https://janus.weiyuai.cn/
- 參考配置與部署示例：https://github.com/Bytedesk/bytedesk/tree/main/deploy/janus
:::

---

## 安裝

### 快速安裝

以下步驟基於官方 README 的通用流程，涵蓋主流 Linux 與 macOS 的原始碼編譯，亦提供 Docker 用法。更多細節請見官方說明。

- 官方說明（英文）：https://github.com/meetecho/janus-gateway?tab=readme-ov-file

#### 1）準備依賴

- Ubuntu/Debian

```bash
sudo apt update
sudo apt install -y \
    git build-essential autoconf automake libtool pkg-config cmake \
    libmicrohttpd-dev libjansson-dev libssl-dev libsrtp2-dev \
    libglib2.0-dev libopus-dev libogg-dev libcurl4-openssl-dev \
    libwebsockets-dev libnice-dev libusrsctp-dev
```

- CentOS/RHEL（8+/Stream 建議 dnf，7 可能需自行編譯部分依賴）

```bash
sudo dnf groupinstall -y "Development Tools" || sudo yum groupinstall -y "Development Tools"
sudo dnf install -y \
    git autoconf automake libtool pkgconfig cmake \
    libmicrohttpd-devel jansson-devel openssl-devel \
    glib2-devel opus-devel libogg-devel libcurl-devel \
    libwebsockets-devel libnice-devel usrsctp-devel \
    libsrtp-devel || true
```

- macOS（Homebrew）

```bash
brew update
brew install autoconf automake libtool pkg-config cmake \
    jansson openssl@3 libsrtp libmicrohttpd glib opus libogg curl \
    libwebsockets libnice usrsctp
export PKG_CONFIG_PATH="$(brew --prefix openssl@3)/lib/pkgconfig:$PKG_CONFIG_PATH"
```

#### 2）抓取原始碼並編譯

```bash
git clone https://github.com/meetecho/janus-gateway.git
cd janus-gateway
sh autogen.sh
./configure --prefix=/opt/janus --disable-static
make -j$(getconf _NPROCESSORS_ONLN 2>/dev/null || sysctl -n hw.ncpu || echo 2)
sudo make install
sudo make configs
```

#### 3）快速驗證

```bash
/opt/janus/bin/janus --check-config
/opt/janus/bin/janus
curl http://127.0.0.1:8088/janus || true
```

#### 4）Docker 方式（可選）

- 參考： https://github.com/pengjinning/janus-webrtc-gateway-docker

Linux（host 網路）：

```yaml
version: '3.8'
services:
    janus-gateway:
        image: sucwangsr/janus-webrtc-gateway-docker:latest
        command: ["sh", "-c", "nginx && /usr/local/bin/janus -F /usr/local/etc/janus"]
        network_mode: "host"
        volumes:
            - ./conf/janus.transport.http.jcfg:/usr/local/etc/janus/janus.transport.http.jcfg:ro
            - ./conf/janus.transport.websockets.jcfg:/usr/local/etc/janus/janus.transport.websockets.jcfg:ro
            - ./conf/janus.jcfg:/usr/local/etc/janus/janus.jcfg:ro
            - ./conf/janus.eventhandler.sampleevh.jcfg:/usr/local/etc/janus/janus.eventhandler.sampleevh.jcfg:ro
        restart: always
```

macOS/Windows（埠映射）：

```yaml
version: '3.8'
services:
    janus-gateway:
        image: sucwangsr/janus-webrtc-gateway-docker:latest
        command: ["sh", "-c", "nginx && /usr/local/bin/janus -F /usr/local/etc/janus"]
        ports:
            - "8088:8088"   # HTTP API
            - "8188:8188"   # WS API
            - "7088:7088"   # Admin HTTP
            - "8086:8086"   # 內建 Nginx（如啟用）
            - "10000-10200:10000-10200/udp"  # RTP/RTCP 媒體埠段
        volumes:
            - ./conf/janus.transport.http.jcfg:/usr/local/etc/janus/janus.transport.http.jcfg:ro
            - ./conf/janus.transport.websockets.jcfg:/usr/local/etc/janus/janus.transport.websockets.jcfg:ro
            - ./conf/janus.jcfg:/usr/local/etc/janus/janus.jcfg:ro
        restart: always
```

#### 5）下一步

- 調整 HTTP/WS 相關設定（見「基本配置」）
- 防火牆/安全組開放對應埠
- 如需 NAT 穿越，配置 STUN/TURN（見相關章節）

## 埠號配置

需開放：HTTP/HTTPS、WS/WSS，以及 RTP 媒體埠段（如 10000–10200/udp，依設定而定）。

## 基本配置

主要配置位於 `/opt/janus/etc/janus/`，編輯 `janus.jcfg`、`janus.transport.http.jcfg`、`janus.transport.websockets.jcfg` 等。

## 部署 Web 管理介面

- 需先安裝 Nginx（參見同目錄 nginx.md）
- 將 `janus-gateway/html/demos` 拷貝到 Web 目錄並設定權限

## 故障排查與啟動運維

- 啟動前檢查：`/opt/janus/bin/janus --check-config`
- 前台/背景模式、systemd 管理、常用日誌與系統調優等請按章節操作

## STUN/TURN 設定

- 建議自建 Coturn 伺服器，並在 `janus.jcfg` 內設定 STUN/TURN
- 可用 Google 公用 STUN 做測試（生產不建議）

## 安全設定

- 啟用 HTTPS/WSS，設定證書；限制管理介面存取（admin_secret / admin_acl）

## 相關連結

- 官網：https://janus.conf.meetecho.com/index.html
- GitHub：https://github.com/meetecho/janus-gateway
- NPM：https://www.npmjs.com/package/janus-gateway
