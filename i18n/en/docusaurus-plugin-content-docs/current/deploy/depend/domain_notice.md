# Domain Replacement Notes

When deploying the Weiyu system, replace the example domains in the docs with your own. This document uses `weiyuai.cn` and `api.weiyuai.cn` as examples. In your deployment:

## Replacement checklist

1. In `config.json` files:
   - Replace `https://api.weiyuai.cn` with your API domain
   - Replace `wss://api.weiyuai.cn/websocket` and `wss://api.weiyuai.cn/stomp` with your WebSocket domain
   - Replace `https://www.weiyuai.cn` with your website domain

2. In Nginx configs:
   - Replace all `server_name` values `weiyuai.cn`, `*.weiyuai.cn`, and `api.weiyuai.cn` with your domains
   - If using HTTPS, update SSL certificate paths to your domain
   - You may rename config files where `weiyuai_cn` is part of the filename to match your domain marker

3. Config file names:
   - `weiyuai_cn_80.conf` → `your-domain_80.conf`
   - `weiyuai_cn_443.conf` → `your-domain_443.conf`
   - `weiyuai_cn_api_80.conf` → `your-domain_api_80.conf`
   - `weiyuai_cn_api_443.conf` → `your-domain_api_443.conf`

## Important

- Enable modules: ensure `enabled` is set to `true` in all `config.json`
- Domain consistency: use the same domain consistently to avoid misconfiguration
- SSL certificates: make sure your certificates match your domains when using HTTPS
