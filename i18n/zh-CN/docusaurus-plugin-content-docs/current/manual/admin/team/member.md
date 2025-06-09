---
sidebar_label: 成员
sidebar_position: 1
---

# 成员

## 成员管理概述

管理员可以通过两种方式添加团队成员：导入成员和新建成员。新成员可以使用系统分配的默认凭据登录平台。

## 添加成员

### 新建成员

1. 在管理后台导航到"组织-》成员"页面
2. 点击"新建成员"按钮
3. 填写必要信息（姓名、邮箱等）
4. 提交表单完成创建

### 导入成员

如果您需要批量添加成员，可以使用导入功能：

1. 准备包含成员信息的Excel文件（按照系统要求的格式）
2. 在管理后台导航到"组织-》成员"页面
3. 点击"导入成员"按钮
4. 选择并上传Excel文件
5. 确认导入信息无误后提交

## 成员登录凭据

新创建或导入的用户登录凭据如下：

- **用户名**：邮箱地址
- **默认密码**：123456

## 修改默认密码

您可以通过以下方式修改系统默认密码：

### 通过配置文件修改

在`properties`文件中找到并修改以下配置项：

```properties
# create/import member default password
bytedesk.admin.password-default=123456
```

### 通过Docker Compose修改

如果您使用Docker部署，可以在docker-compose文件中添加或修改相应环境变量：

```yaml
services:
  bytedesk-server:
    environment:
      - BYTEDESK_ADMIN_PASSWORD_DEFAULT=新密码
```

> **注意**：为保障系统安全，建议成员首次登录后立即修改默认密码。
