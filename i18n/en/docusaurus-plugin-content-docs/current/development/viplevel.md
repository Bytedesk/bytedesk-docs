---
sidebar_label: 千人千面
sidebar_position: 5
---

# 千人千面

同一个问题，针不同等级用户展示不同答案

## 管理后台

### 添加扩展问题，其中的vip等级对应客服代码中的 vipLevel 参数

- ![faq_1](/img/develop/faq/faq_1.png)

#### 添加关联问题

- ![faq_2](/img/develop/faq/faq_2.png)

## 示例代码

```bash
在访客端配置参数：vipLevel 
# 实例：
http://服务器地址/chat/?org=df_org_uid&t=1&sid=df_wg_uid&vipLevel=4&123=345&234=567
```

- ![faq_3](/img/develop/faq/faq_3.png)
- ![faq_4](/img/develop/faq/faq_4.png)
