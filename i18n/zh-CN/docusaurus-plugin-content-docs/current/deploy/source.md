---
sidebar_label: 源码部署
sidebar_position: 1
---

# 源码部署

## 前期准备

### jdk 17

因项目依赖spring boot 3, 最低要求 jdk17, 请确保已安装

### redis-stack-server


### mysql 或 postgresql


```bash
git clone https://github.com/Bytedesk/bytedesk.git
# 配置文件: bytedesk/starter/src/main/resources/application-dev.properties
# 推荐开发环境：vscode + maven
#
# java --version
# java 17.0.4 2022-07-19 LTS
# 
# mvn --version
# Apache Maven 3.8.4 (9b656c72d54e5bacbed989b64718c159fe39b537)
# OS name: "mac os x", version: "14.2.1", arch: "aarch64", family: "mac"
# 
# 项目使用了protobuf，可能需要安装 protobuf 编译工具
# protoc --version
# libprotoc 25.3
# 
cd bytedesk
mvn install -Dmaven.test.skip=true
# 
cd starter
mvn spring-boot:run
# 
# 本地预览
开发者入口: http://127.0.0.1:9003/dev
web: http://127.0.0.1:9003/
管理后台: http://127.0.0.1:9003/admin, 用户名: admin@email.com, 密码: admin
客服端: http://127.0.0.1:9003/agent, 用户名: admin@email.com, 密码: admin
访客: http://127.0.0.1:9003/chat?org=df_org_uid&t=0&sid=df_ag_uid&
api文档: http://127.0.0.1:9003/swagger-ui/index.html
actuator: http://127.0.0.1:9003/actuator
h2数据库: http://127.0.0.1:9003/h2-console, 路径: ./h2db/weiyuim, 用户名: sa, 密码: sa
```
