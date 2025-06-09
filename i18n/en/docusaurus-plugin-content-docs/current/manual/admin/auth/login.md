---
sidebar_label: Login
sidebar_position: 1
---

# Login

## Custom Server

- Login to admin dashboard
- Click `Settings` -> `Server Settings` in the left menu -> Copy server address
- Find admin/config.json file, default format is as follows:

```json
{
    "enabled": false, // Change false to true. Only when changed to true, the apiHost and htmlHost below will take effect
    "apiHost": "api.weiyuai.cn", // Important: Change to online api address, like: api.example.com, cannot start with http
    "htmlHost": "www.weiyuai.cn" // Change to static webpage address, like: www.example.com, cannot start with http
}
```

Replace apiHost and htmlHost with your server address
