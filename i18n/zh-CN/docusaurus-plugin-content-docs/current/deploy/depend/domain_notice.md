# 域名替换说明

在部署微语系统时，需要将文档中示例的域名替换为你自己的域名。本文档使用 `weiyuai.cn` 和 `api.weiyuai.cn` 作为示例域名，在实际部署中：

## 域名替换清单

1. **在`config.json`文件中替换域名**：
   - 将 `https://api.weiyuai.cn` 替换为你自己的API域名
   - 将 `wss://api.weiyuai.cn/websocket` 和 `wss://api.weiyuai.cn/stomp` 替换为你自己的WebSocket域名
   - 将 `https://www.weiyuai.cn` 替换为你自己的网站域名

2. **在Nginx配置文件中替换域名**：
   - 所有的 `server_name` 指令中的 `weiyuai.cn`、`*.weiyuai.cn` 和 `api.weiyuai.cn` 需替换为你自己的域名
   - 如果使用HTTPS，需要将SSL证书路径中的域名部分替换为你自己的域名
   - 配置文件名称中的 `weiyuai_cn` 可以替换为你自己的域名标识

3. **配置文件名称**：
   - `weiyuai_cn_80.conf` → `你的域名_80.conf`
   - `weiyuai_cn_443.conf` → `你的域名_443.conf`
   - `weiyuai_cn_api_80.conf` → `你的域名_api_80.conf`
   - `weiyuai_cn_api_443.conf` → `你的域名_api_443.conf`

## 重要提示

- **启用模块**：确保在所有`config.json`文件中将`enabled`设置为`true`
- **域名一致性**：确保各处使用的域名保持一致，避免配置错误
- **SSL证书**：如果使用HTTPS，确保SSL证书与你的域名匹配
