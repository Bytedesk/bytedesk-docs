---
sidebar_label: License
sidebar_position: 27
---

# License

任何用户要想使用微语系统，无论是社区版、企业版还是平台版（源码版除外），都需要申请 licenseKey。本文档将详细介绍如何获取和配置 licenseKey。

## 如何申请 licenseKey

### 获取方法

1. 使用手机号登录官方 [微语管理后台](https://www.weiyuai.cn/admin)
2. 点击 **设置** -> **License 管理**
3. 即可获取试用版 license
4. 找到 **激活秘钥**，复制粘贴到配置文件中即可。

![获取License](/img/faq/faq_13_get_license.png)

### 配置 licenseKey

获取到 licenseKey 后，需要将其填入配置文件中：

#### Properties 配置文件

```properties
# 在 application.properties 或 application.yml 中添加
bytedesk.licenseKey=your_license_key_here
```

#### Docker Compose 配置文件

```yaml
version: '3.8'
services:
  bytedesk:
    image: bytedesk/bytedesk:latest
    environment:
      - BYTEDESK_LICENSE_KEY=your_license_key_here
    # ... 其他配置
```

#### 环境变量配置

```bash
# Linux/Mac
export BYTEDESK_LICENSE_KEY=your_license_key_here

# Windows
set BYTEDESK_LICENSE_KEY=your_license_key_here
```

## 注意事项

- LicenseKey 有效期为 30 天，到期后需要重新申请
- 请妥善保管您的 licenseKey，不要泄露给他人
- 如需正式版企业版或平台版 licenseKey，请联系客服获取正式授权

## 常见问题

**Q: 申请 license 需要什么条件？**
A: 只需要使用手机号注册微语管理后台即可申请试用版 license。

**Q: License 过期了怎么办？**
A: 重新登录管理后台，在 License 管理页面重新获取即可。

**Q: 为什么免费开源还需要licenseKey？**
A: 考虑到客服系统可能被用于诈骗等非法行为，为防止此类行为的发生，特实行licenseKey。并且需要用户自行保管好自己的key，以防被盗用。
