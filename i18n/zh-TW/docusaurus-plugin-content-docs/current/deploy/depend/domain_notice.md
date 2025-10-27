# 網域替換說明

部署微語系統時，需將文件中的示例網域替換為你自己的網域。本文以 `weiyuai.cn` 與 `api.weiyuai.cn` 為示例，實際部署時請：

## 替換清單

1. 在 `config.json` 檔案中：
   - 將 `https://api.weiyuai.cn` 替換為你的 API 網域
   - 將 `wss://api.weiyuai.cn/websocket` 與 `wss://api.weiyuai.cn/stomp` 替換為你的 WebSocket 網域
   - 將 `https://www.weiyuai.cn` 替換為你的網站網域

2. 在 Nginx 設定檔中：
   - 將所有 `server_name` 中的 `weiyuai.cn`、`*.weiyuai.cn`、`api.weiyuai.cn` 替換為你的網域
   - 若使用 HTTPS，請將 SSL 憑證路徑中的網域替換為你的網域
   - 檔名中的 `weiyuai_cn` 可替換為你的網域識別

3. 設定檔名稱：
   - `weiyuai_cn_80.conf` → `你的網域_80.conf`
   - `weiyuai_cn_443.conf` → `你的網域_443.conf`
   - `weiyuai_cn_api_80.conf` → `你的網域_api_80.conf`
   - `weiyuai_cn_api_443.conf` → `你的網域_api_443.conf`

## 重要提示

- 啟用模組：請確認所有 `config.json` 中 `enabled` 設為 `true`
- 網域一致性：各處使用的網域需保持一致，避免設定錯誤
- SSL 憑證：若使用 HTTPS，請確認憑證與你的網域相符
