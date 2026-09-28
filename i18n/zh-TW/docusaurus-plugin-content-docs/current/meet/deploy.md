---
title: 微語會議部署與設定指南
sidebar_label: 部署與設定
sidebar_position: 2
description: 微語會議開啟與設定說明：Janus 媒體伺服器、後端 webrtc.properties、meet 前端、meetAdmin 管理後台、HTTPS/WSS 反向代理與 REST API 參考
---

# 部署與設定指南

本文說明如何在自建環境中開啟、設定並執行微語會議，內容涵蓋 Janus 媒體伺服器、後端設定、meet 前端、meetAdmin 管理後台以及正式環境 HTTPS 部署。

<!-- truncate -->

## 架構總覽

微語會議採用「瀏覽器直連 Janus WebSocket」的架構，後端不做信令轉發：

```text
瀏覽器（meet 前端，WebRTC）
   │  WebSocket（信令）
   ▼
Janus 網關（VideoRoom 外掛，音訊優先統一會議）
   ▲
   │  REST（會議室、參會記錄、錄製、client-config）
後端（modules/webrtc + enterprise/webrtc）
```

| 元件 | 位置 | 職責 |
| ---- | ---- | ---- |
| Janus 網關 | `deploy/docker/compose/compose-janus.yaml` | 媒體伺服器：VideoRoom（SFU）、媒體轉發、參與者事件 |
| 後端 | `modules/webrtc`、`enterprise/webrtc` | `RoomEntity`、`ParticipantEntity`、`MeetingRecordingEntity`、REST API、Janus client-config |
| meet 前端 | `frontend/apps/meet` | 會議用戶端（React + Vite，dev 連接埠 `9032`，basename `/meet`） |
| meetAdmin 後台 | `frontend/apps/meetAdmin` | 會議室/參會記錄管理、Janus 監控 |

統一會議由 Janus **VideoRoom** 外掛承載（multistream 多流訂閱、音訊優先發布、按需升級視訊，預設最多 24 路同時發布，建立會議時可選擇 6/12/24 容量檔位）。舊 AudioBridge 用戶端程式碼保留用於相容，但會議頁不再使用。

## 1. 啟動 Janus 媒體伺服器

```bash
cd deploy/docker
./start.sh webrtc
```

該命令啟動 Janus 容器，連接埠對應如下：

| 宿主機連接埠 | 容器連接埠 | 協定 | 用途 |
| ------------ | ---------- | ---- | ---- |
| `18188` | `8188` | WebSocket | Janus WS API（瀏覽器連線入口） |
| `18089` | `8088` | HTTP | Janus HTTP API（`ping` 健康檢查用） |
| `18090` | `8089` | HTTPS | Janus HTTPS API（如啟用 SSL transport） |
| `17188` | `7188` | WebSocket | Janus Admin WS API |
| `18091` | `7088` | HTTP | Janus Admin HTTP API（meetAdmin 監控用） |
| `11000-11200` | `10000-10200` | UDP | RTP 媒體連接埠段（正式環境防火牆需放行） |

驗證 Janus 是否正常運作：

```bash
curl -sS -X POST -H 'Content-Type: application/json' \
  --data '{"janus":"ping","transaction":"check"}' \
  http://localhost:18089/janus
```

回傳 `janus: pong` 即表示閘道存活。

### Janus 關鍵設定（`deploy/janus/etc/janus/janus.jcfg`）

| 設定項 | 值 | 說明 |
| ------ | -- | ---- |
| `token_auth` | `false` | **必須**。儲存型 token 驗證與「瀏覽器直連 WS」架構不相容：瀏覽器不攜帶 token，建立 session 即 403 |
| `admin_secret` | 如 `janusoverlord` | 保護 Admin API；需與後端 `bytedesk.webrtc.janus.admin.secret` 一致 |

修改設定後重啟容器：

```bash
docker restart janus-bytedesk
```

## 2. 設定後端

會議相關後端設定位於 `starter/src/main/resources/properties/<profile>/webrtc.properties`（`local`、`prod` 等）：

```properties
# 是否啟用 Janus 後端接入（VideoRoom/AudioBridge/SIP/Admin）
bytedesk.webrtc.janus.enabled=true

# Janus WS 位址（本地 compose：18188 -> 8188）
bytedesk.webrtc.janus.ws-url=ws://127.0.0.1:18188/janus

# ICE 伺服器（經 client-config 下發給前端）
bytedesk.webrtc.janus.ice-servers[0].urls=stun:127.0.0.1:13478
bytedesk.webrtc.janus.ice-servers[1].urls=turn:127.0.0.1:13478?transport=udp
bytedesk.webrtc.janus.ice-servers[1].username=bytedesk
bytedesk.webrtc.janus.ice-servers[1].credential=bytedesk123

# Janus Admin API（meetAdmin 監控）
bytedesk.webrtc.janus.admin.enabled=true
bytedesk.webrtc.janus.admin.ws-url=ws://127.0.0.1:17188/janus
bytedesk.webrtc.janus.admin.http-url=http://127.0.0.1:18091/admin
bytedesk.webrtc.janus.admin.secret=janusoverlord

# AudioBridge 預設參數
bytedesk.webrtc.janus.audio-bridge.default-permanent=false

# 會議錄製儲存目錄（主持人上傳的瀏覽器錄製，按 年/月/日 子目錄存放）
bytedesk.webrtc.meeting.record.dir=uploads/webrtc-meeting-recordings
```

說明：

- `admin.secret` 必須與 `janus.jcfg` 中的 `admin_secret` 一致，否則 Janus 監控會 403。
- 會議錄製：僅主持人可用的上傳介面接受瀏覽器錄製檔案（webm/mp4 及其音訊變體，單檔最大 500MB），儲存在 `bytedesk.webrtc.meeting.record.dir`（預設相對工作目錄）。播放/下載需具備會議室可見性；上傳與刪除僅限會議室建立者。
- 正式環境應透過 `wss://`/`https://` 對外提供服務（見第 5 節），並透過環境變數（如 `BYTEDESK_JANUS_ADMIN_SECRET`）注入 admin 密鑰，不要明文提交到儲存庫。
- 按常規方式啟動 starter 即可，會議功能無需額外 profile。

## 3. 執行 meet 前端

```bash
cd frontend
pnpm install
turbo dev --filter=meet          # 開發伺服器 http://localhost:9032/meet
```

web 端路由 basename 為 `/meet`，因此會議邀請連結形態為 `http://<host>:9032/meet/room/{inviteUid}`。

正式建置時，將 `dist` 產物交由反向代理按 `/meet/` 路徑對外提供服務。

## 4. 執行 meetAdmin 管理後台

```bash
cd frontend
turbo dev --filter=meetAdmin
```

管理後台提供：

- 會議室與參會記錄管理（權限控制）
- 會議錄製管理：按組織瀏覽、播放、下載會議錄製（「錄製」頁面，`MEETING_RECORDING_READ` 權限）
- Janus 伺服器監控：伺服器資訊、執行設定、活動會話、Token 頁面（僅超級管理員可見），資料來自上文設定的 Admin HTTP API

## 5. 正式部署：HTTPS + WSS

瀏覽器僅在安全上下文（HTTPS 或 localhost）下開放麥克風擷取。區域網路/正式環境請：

1. 在 nginx 終止 TLS，將 meet 前端反向代理到 `/meet/` 路徑（SPA 回退：`try_files $uri $uri/ /meet/index.html;`），meetAdmin 反向代理到 `/meetadmin/`。
2. 將 Janus WebSocket 反向代理到宿主機 `18188` 連接埠並對外暴露為 `wss://janus.example.com/janus`，隨後相應修改 `bytedesk.webrtc.janus.ws-url`。
3. 設定公網可達的 STUN/TURN（`ice-servers`，如 coturn），確保嚴格 NAT 環境下的參會者也能連通。
4. Janus Admin API 不要直接暴露公網——綁定內部網卡或經存取控制的代理轉發；其本身已由 `admin_secret` 保護。

nginx 參考片段（`www.weiyuai.cn` 在用，完整設定見 `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_443.conf`）：

```nginx
location /meet/ {
    try_files $uri $uri/ /meet/index.html;
}
location /meetadmin/ {
    try_files $uri $uri/ /meetadmin/index.html;
}
```

Janus 建議使用獨立網域（如 `janus.weiyuai.cn`），WebSocket 反向代理必須攜帶升級標頭並放寬讀取逾時（參考 `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_janus_443.conf`）：

```nginx
# janus.<your-domain> 虛擬主機
location ^~ /janus {
    proxy_pass http://127.0.0.1:18188;      # 宿主機連接埠 18188 -> 容器 8188
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400;               # WebSocket 長連線
    proxy_buffering off;
}

# Janus Admin HTTP API（可選，僅內網/受控暴露；已由 admin_secret 保護）
location /admin/ {
    proxy_pass http://127.0.0.1:18091;      # 宿主機連接埠 18091 -> 容器 7088
}
```

對應的後端正式環境設定範例（`properties/prod/webrtc.properties`，`weiyuai.cn` 在用）：

```properties
bytedesk.webrtc.janus.ws-url=wss://janus.weiyuai.cn/janus
bytedesk.webrtc.janus.admin.http-url=https://janus.weiyuai.cn/admin
bytedesk.webrtc.janus.ice-servers[0].urls=stun:coturn.weiyuai.cn:3478
bytedesk.webrtc.janus.ice-servers[1].urls=turn:coturn.weiyuai.cn:3478
```

注意：STUN/TURN（coturn）走 UDP/TCP 直連（如 `coturn.weiyuai.cn:3478`），nginx 無法反向代理該類協定；如需為 coturn 網域提供監控/說明頁，可參考 `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_coturn_443.conf`（僅 HTTPS 靜態頁，與 STUN/TURN 流量本身無關）。

## 6. REST API 參考

所有介面均需登入態（與微語帳號體系一致）。

### 會議室（`/api/v1/room`）

| 方法 | 路徑 | 說明 |
| ---- | ---- | ---- |
| POST | `/create` | 建立會議室 |
| POST | `/update` | 更新會議室 |
| POST | `/delete` | 刪除會議室 |
| POST | `/join` | 按 `inviteUid`（或 `uid`）加入會議：記錄參與關係並回傳會議室資訊 + 顯示暱稱 + 主持人 uid（用於前端僅對主持人顯示錄製按鈕） |
| GET | `/query/org` | 查詢組織內會議室 |
| GET | `/query/user` | 查詢目前使用者建立/加入過的會議室 |
| GET | `/query/uid` | 按 uid 查詢會議室 |
| GET | `/export` | 匯出會議室 |

### 參會記錄（`/api/v1/participant`）

| 方法 | 路徑 | 說明 |
| ---- | ---- | ---- |
| POST | `/join` | 記錄參會加入（冪等） |
| POST | `/leave` | 結算參會離開（冪等；計算時長並自動結算遺留 JOINED 記錄） |
| GET | `/query/room?roomUid=` | 查詢會議室的參會記錄 |

### 會議錄製（`/api/v1/meeting-recording`）

| 方法 | 路徑 | 說明 |
| ---- | ---- | ---- |
| POST | `/upload` | 主持人上傳瀏覽器錄製（multipart：`roomUid`、可選 `duration`、`file`）；校驗主持人身分、落盤、建索引一步完成 |
| GET | `/query/org` | 組織維度分頁查詢錄製列表，供 meetAdmin 後台使用（`MEETING_RECORDING_READ` 權限） |
| GET | `/query/room?roomUid=` | 按會議室查詢錄製列表（需會議室可見性） |
| GET | `/{uid}/content` | 鑑權串流播放/下載錄製檔案（需會議室可見性；追加 `?download=true` 以附件形式下載） |
| POST | `/delete` | 刪除錄製（僅主持人；同時刪除索引與檔案） |

### Janus client-config（企業版）

meet 前端啟動時從後端 client-config 介面拉取 WS 位址與 ICE 伺服器，因此瀏覽器需能同時存取 `/api` 與 Janus WS。

## 7. 常見問題排查

| 現象 | 原因 | 解決辦法 |
| ---- | ---- | -------- |
| 加入會議報 `Unauthorized request (wrong or missing secret/token)` | `janus.jcfg` 中 `token_auth = true` | 改為 `token_auth = false` 並重啟 Janus 容器 |
| 報 `TypeError: Cannot read properties of undefined (reading 'getUserMedia')` | 非 localhost 的 HTTP 存取（非安全上下文） | 改用 localhost、設定 HTTPS，或測試期設定瀏覽器安全白名單 |
| 攝影機或螢幕共享不可用 | 非安全上下文，或 `getDisplayMedia` 未在使用者手勢內發起 | 使用 HTTPS 或 localhost；一律透過工具列按鈕點擊發起共享 |
| 麥克風權限被拒絕 | 瀏覽器攔截了麥克風 | 點擊地址列鎖圖示允許麥克風後重新加入 |
| 錄製上傳被拒（403） | 上傳者不是會議室建立者，或檔案類型/大小不允許 | 僅主持人可上傳；檔案須為瀏覽器錄製格式（webm/mp4 及音訊變體）且不超過 500MB |
| meetAdmin Janus 監控 403 | `admin.secret` 與 `janus.jcfg` 的 `admin_secret` 不一致 | 兩處對齊後重啟 |
| Janus 健康檢查失敗 | Janus 容器未啟動或 WS 位址錯誤 | `docker ps` 檢查容器，核對連接埠對應與 `ws-url` |
| 參會記錄缺失 | 舊版前端未呼叫 join/leave | 升級到最新 meet 前端 |

## 8. 資料庫表

會議相關表在本機/開發環境由 JPA `ddl-auto` 管理：

| 表名 | 實體 | 用途 |
| ---- | ---- | ---- |
| `bytedesk_webrtc_room` | `RoomEntity` | 會議室（名稱、`inviteUid`、類型、描述等） |
| `bytedesk_webrtc_participant` | `ParticipantEntity` | CDR 式參會記錄（加入/離開時間、時長、主持人、狀態） |
| `bytedesk_webrtc_meeting_recording` | `MeetingRecordingEntity` | 會議錄製索引（會議室、上傳者、檔案路徑、類型、大小、時長、狀態） |

## 相關連結

- 微語官網：[https://www.weiyuai.cn](https://www.weiyuai.cn)
- 微語 GitHub：[https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)
- 問題回饋：[https://github.com/Bytedesk/bytedesk/issues](https://github.com/Bytedesk/bytedesk/issues)
- Janus WebRTC Gateway：[https://github.com/meetecho/janus-gateway](https://github.com/meetecho/janus-gateway)
