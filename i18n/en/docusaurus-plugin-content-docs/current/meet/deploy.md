---
title: Bytedesk Meet Deployment & Configuration Guide
sidebar_label: Deployment & Configuration
sidebar_position: 2
description: How to enable and configure Bytedesk Meet — Janus media server, backend webrtc.properties, meet frontend, meetAdmin console, HTTPS/WSS reverse proxy, and REST API reference
---

# Deployment & Configuration Guide

This guide explains how to enable, configure, and run Bytedesk Meet in a self-hosted environment. It covers the Janus media server, backend configuration, the meet frontend, the meetAdmin console, and production HTTPS deployment.

<!-- truncate -->

## Architecture Overview

Bytedesk Meet uses a browser-direct-to-Janus WebSocket architecture; the backend does not relay signaling:

```text
Browser (meet frontend, WebRTC)
   │  WebSocket (signaling)
   ▼
Janus Gateway (VideoRoom plugin, audio-first unified meetings)
   ▲
   │  REST (rooms, participants, recordings, client-config)
Backend (modules/webrtc + enterprise/webrtc)
```

| Component | Location | Purpose |
| --------- | -------- | ------- |
| Janus Gateway | `deploy/docker/compose/compose-janus.yaml` | Media server: VideoRoom (SFU), media forwarding, participant events |
| Backend | `modules/webrtc`, `enterprise/webrtc` | `RoomEntity`, `ParticipantEntity`, `MeetingRecordingEntity`, REST APIs, Janus client-config |
| meet frontend | `frontend/apps/meet` | Meeting client (React + Vite, dev port `9032`, basename `/meet`) |
| meetAdmin console | `frontend/apps/meetAdmin` | Room/participant management, Janus monitoring |

Unified meetings run on the Janus **VideoRoom** plugin (multistream, audio-first publish with on-demand video, up to 24 publishers by default, configurable per meeting with 6/12/24 capacity options). The legacy AudioBridge client code is retained for compatibility but is no longer used by the conference page.

## 1. Start the Janus Media Server

```bash
cd deploy/docker
./start.sh webrtc
```

This starts the Janus container with these port mappings:

| Host port | Container port | Protocol | Purpose |
| --------- | -------------- | -------- | ------- |
| `18188` | `8188` | WebSocket | Janus WS API (the browser connects here) |
| `18089` | `8088` | HTTP | Janus HTTP API (used by the `ping` health check) |
| `18090` | `8089` | HTTPS | Janus HTTPS API (if the SSL transport is enabled) |
| `17188` | `7188` | WebSocket | Janus Admin WS API |
| `18091` | `7088` | HTTP | Janus Admin HTTP API (meetAdmin monitoring) |
| `11000-11200` | `10000-10200` | UDP | RTP media port range (open it in the production firewall) |

Verify Janus is running:

```bash
curl -sS -X POST -H 'Content-Type: application/json' \
  --data '{"janus":"ping","transaction":"check"}' \
  http://localhost:18089/janus
```

A `janus: pong` response means the gateway is up.

### Key Janus configuration (`deploy/janus/etc/janus/janus.jcfg`)

| Option | Value | Notes |
| ------ | ----- | ----- |
| `token_auth` | `false` | **Required**. Stored-token auth is incompatible with the browser-direct-WS architecture; browsers don't carry tokens, session creation returns 403 |
| `admin_secret` | e.g. `janusoverlord` | Protects the Admin API; must match `bytedesk.webrtc.janus.admin.secret` on the backend |

After editing the config, restart the container:

```bash
docker restart janus-bytedesk
```

## 2. Configure the Backend

Meeting-related backend configuration lives in `starter/src/main/resources/properties/<profile>/webrtc.properties` (`local`, `prod`, ...):

```properties
# Enable Janus integration (VideoRoom/AudioBridge/SIP/Admin)
bytedesk.webrtc.janus.enabled=true

# Janus WS endpoint (local compose: 18188 -> 8188)
bytedesk.webrtc.janus.ws-url=ws://127.0.0.1:18188/janus

# ICE servers delivered to the frontend via client-config
bytedesk.webrtc.janus.ice-servers[0].urls=stun:127.0.0.1:13478
bytedesk.webrtc.janus.ice-servers[1].urls=turn:127.0.0.1:13478?transport=udp
bytedesk.webrtc.janus.ice-servers[1].username=bytedesk
bytedesk.webrtc.janus.ice-servers[1].credential=bytedesk123

# Janus Admin API (meetAdmin monitoring)
bytedesk.webrtc.janus.admin.enabled=true
bytedesk.webrtc.janus.admin.ws-url=ws://127.0.0.1:17188/janus
bytedesk.webrtc.janus.admin.http-url=http://127.0.0.1:18091/admin
bytedesk.webrtc.janus.admin.secret=janusoverlord

# AudioBridge defaults
bytedesk.webrtc.janus.audio-bridge.default-permanent=false

# Meeting recording storage (host-uploaded browser recordings, year/month/day subfolders)
bytedesk.webrtc.meeting.record.dir=uploads/webrtc-meeting-recordings
```

Notes:

- `admin.secret` must match `admin_secret` in `janus.jcfg`, otherwise Janus monitoring fails with 403.
- Meeting recordings: the host-only upload endpoint accepts browser recordings (webm/mp4 and audio variants, up to 500MB per file) and stores them under `bytedesk.webrtc.meeting.record.dir` (relative to the working directory by default). Playback and download require room visibility; only the room creator can upload or delete.
- In production, put the deployment behind `wss://`/`https://` (see section 5) and inject the admin secret through an environment variable (e.g. `BYTEDESK_JANUS_ADMIN_SECRET`) instead of committing it.
- Start the backend the usual way; no extra profile is needed for Meet.

## 3. Run the meet Frontend

```bash
cd frontend
pnpm install
turbo dev --filter=meet          # dev server at http://localhost:9032/meet
```

The web router uses basename `/meet`, so meeting invite links look like `http://<host>:9032/meet/room/{inviteUid}`.

For a production build, deploy the `dist` output behind your reverse proxy under the `/meet/` path.

## 4. Run the meetAdmin Console

```bash
cd frontend
turbo dev --filter=meetAdmin
```

The console provides:

- Meeting room and participant record management (permission-controlled)
- Meeting recording management: browse, play, and download recordings organization-wide (Recordings page, `MEETING_RECORDING_READ` permission)
- Janus server monitoring: server info, settings, active sessions, and tokens pages (super admin only), backed by the Admin HTTP API configured above

## 5. Production Deployment: HTTPS + WSS

Browsers only grant microphone access in secure contexts (HTTPS or localhost). For LAN/production use:

1. Terminate TLS at nginx and reverse-proxy the meet frontend under `/meet/` (SPA fallback: `try_files $uri $uri/ /meet/index.html;`) and meetAdmin under `/meetadmin/`.
2. Reverse-proxy the Janus WebSocket to the `18188` host port and expose it as `wss://janus.example.com/janus`; then set `bytedesk.webrtc.janus.ws-url` accordingly.
3. Configure STUN/TURN (`ice-servers`) with a publicly reachable TURN server (e.g. coturn) so participants behind strict NAT can connect.
4. Keep the Janus Admin API off the public internet — bind it to an internal interface or protect it behind an access-controlled proxy; it is already protected by `admin_secret`.

A reference nginx snippet (as used for `www.weiyuai.cn`; full config at `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_443.conf`):

```nginx
location /meet/ {
    try_files $uri $uri/ /meet/index.html;
}
location /meetadmin/ {
    try_files $uri $uri/ /meetadmin/index.html;
}
```

Serve Janus from a dedicated domain (e.g. `janus.weiyuai.cn`): the WebSocket proxy must include upgrade headers and a long read timeout (see `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_janus_443.conf`):

```nginx
# janus.<your-domain> vhost
location ^~ /janus {
    proxy_pass http://127.0.0.1:18188;      # host port 18188 -> container 8188
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400;               # long-lived WebSocket
    proxy_buffering off;
}

# Janus Admin HTTP API (optional, internal/controlled exposure only; already protected by admin_secret)
location /admin/ {
    proxy_pass http://127.0.0.1:18091;      # host port 18091 -> container 7088
}
```

Matching production backend settings (`properties/prod/webrtc.properties`, as used by weiyuai.cn):

```properties
bytedesk.webrtc.janus.ws-url=wss://janus.weiyuai.cn/janus
bytedesk.webrtc.janus.admin.http-url=https://janus.weiyuai.cn/admin
bytedesk.webrtc.janus.ice-servers[0].urls=stun:coturn.weiyuai.cn:3478
bytedesk.webrtc.janus.ice-servers[1].urls=turn:coturn.weiyuai.cn:3478
```

Note: STUN/TURN (coturn) uses direct UDP/TCP connectivity (e.g. `coturn.weiyuai.cn:3478`); nginx cannot reverse-proxy those protocols. If you want a monitoring/info page for the coturn domain, see `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_coturn_443.conf` (an HTTPS static page only, unrelated to the STUN/TURN traffic itself).

## 6. REST API Reference

All endpoints require a logged-in session (same account system as Bytedesk).

### Meeting rooms (`/api/v1/room`)

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/create` | Create a meeting room |
| POST | `/update` | Update a room |
| POST | `/delete` | Delete a room |
| POST | `/join` | Join by `inviteUid` (or `uid`); records participation and returns room info + display name + host uid (drives the host-only record button) |
| GET | `/query/org` | List rooms in the organization |
| GET | `/query/user` | List rooms created by or joined by the current user |
| GET | `/query/uid` | Query a room by uid |
| GET | `/export` | Export rooms |

### Participants (`/api/v1/participant`)

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/join` | Record a participant join (idempotent) |
| POST | `/leave` | Settle a participant leave (idempotent; computes duration, settles stale JOINED records) |
| GET | `/query/room?roomUid=` | Query participant records of a room |
### Meeting recordings (`/api/v1/meeting-recording`)

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/upload` | Host uploads a browser-side recording (multipart: `roomUid`, optional `duration`, `file`); validates host identity, saves the file, and creates the index in one step |
| GET | `/query/org` | Paginated organization-wide recording list for the meetAdmin console (`MEETING_RECORDING_READ` permission) |
| GET | `/query/room?roomUid=` | List recordings of a room (requires room visibility) |
| GET | `/{uid}/content` | Stream a recording for playback/download (authenticated, room visibility required; append `?download=true` for an attachment download) |
| POST | `/delete` | Delete a recording (host only; removes the index and the file) |
### Janus client config (enterprise)

The meet frontend fetches WS URL and ICE servers from the backend client-config endpoint at startup, so `/api` and the Janus WS must both be reachable from the browser.

## 7. Troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| `Unauthorized request (wrong or missing secret/token)` when joining | `token_auth = true` in `janus.jcfg` | Set `token_auth = false` and restart the Janus container |
| `TypeError: Cannot read properties of undefined (reading 'getUserMedia')` | Page opened over plain HTTP on a non-localhost host (no secure context) | Use `localhost`, enable HTTPS, or set an unsafely-treat-as-secure flag during testing |
| Camera or screen sharing unavailable | No secure context, or `getDisplayMedia` not called within a user gesture | Use HTTPS or localhost; always start sharing from the toolbar button click |
| Microphone permission denied | Browser blocked the mic | Click the lock icon in the address bar and allow the microphone, then rejoin |
| Recording upload rejected (403) | Uploader is not the room creator, or the file type/size is not allowed | Only the host can upload; files must be browser recordings (webm/mp4 and audio variants) and under 500MB |
| meetAdmin Janus monitoring returns 403 | `admin.secret` does not match `admin_secret` in `janus.jcfg` | Align the two values and restart |
| Janus health check fails | Janus container down or WS URL wrong | `docker ps`, verify port mapping and `ws-url` |
| Participant record missing | Older frontend version that did not call join/leave | Update to the latest meet frontend |

## 8. Database Tables

Meet tables are managed by JPA `ddl-auto` in local/dev setups:

| Table | Entity | Purpose |
| ----- | ------ | ------- |
| `bytedesk_webrtc_room` | `RoomEntity` | Meeting rooms (name, `inviteUid`, type, description, ...) |
| `bytedesk_webrtc_participant` | `ParticipantEntity` | CDR-style attendance (join/leave time, duration, host, status) |
| `bytedesk_webrtc_meeting_recording` | `MeetingRecordingEntity` | Meeting recording index (room, uploader, file path, content type, size, duration, status) |

## Related Links

- Bytedesk website: [https://www.weiyuai.cn](https://www.weiyuai.cn)
- Bytedesk on GitHub: [https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)
- Issue tracker: [https://github.com/Bytedesk/bytedesk/issues](https://github.com/Bytedesk/bytedesk/issues)
- Janus WebRTC Gateway: [https://github.com/meetecho/janus-gateway](https://github.com/meetecho/janus-gateway)
