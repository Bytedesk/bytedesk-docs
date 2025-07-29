---
sidebar_label: License
sidebar_position: 27
---

# License

任何使用者要想使用微語系統，無論是社區版、企業版還是平台版（源碼版除外），都需要申請 licenseKey。本文檔將詳細介紹如何取得和配置 licenseKey。

## 如何申請 licenseKey

### 取得方法

1. 使用手機號登入官方 [微語管理後台](https://www.weiyuai.cn/admin)
2. 點擊 **設定** -> **License 管理**
3. 即可取得試用版 license
4. 找到 **啟動秘鑰**，複製貼上到配置檔案中即可。

![取得License](/img/faq/faq_13_get_license.png)

### 配置 licenseKey

取得到 licenseKey 後，需要將其填入配置檔案中：

#### Properties 配置檔案

```properties
# 在 application.properties 或 application.yml 中新增
bytedesk.licenseKey=your_license_key_here
```

#### Docker Compose 配置檔案

```yaml
version: '3.8'
services:
  bytedesk:
    image: bytedesk/bytedesk:latest
    environment:
      - BYTEDESK_LICENSE_KEY=your_license_key_here
    # ... 其他配置
```

#### 環境變數配置

```bash
# Linux/Mac
export BYTEDESK_LICENSE_KEY=your_license_key_here

# Windows
set BYTEDESK_LICENSE_KEY=your_license_key_here
```

## 注意事項

- LicenseKey 有效期為 30 天，到期後需要重新申請
- 請妥善保管您的 licenseKey，不要洩露給他人
- 如需正式版企業版或平台版 licenseKey，請聯絡客服取得正式授權

## 常見問題

**Q: 申請 license 需要什麼條件？**
A: 只需要使用手機號註冊微語管理後台即可申請試用版 license。

**Q: License 過期了怎麼辦？**
A: 重新登入管理後台，在 License 管理頁面重新取得即可。

**Q: 為什麼免費開源還需要licenseKey？**
A: 考慮到客服系統可能被用於詐騙等非法行為，為防止此類行為的發生，特實行licenseKey。並且需要使用者自行保管好自己的key，以防被盜用。
