---
sidebar_label: JMeter
sidebar_position: 2
---

# JMeter 性能测试方案

- [下载JMeter 5.6.3](https://www.weiyuai.cn/download/apache-jmeter-5.6.3.zip)
- [JMeter Plugins](https://jmeter-plugins.org/install/Install/)
- [压测脚本与数据](https://github.com/Bytedesk/bytedesk/tree/main/jmeter)

## 测试准备

在进行性能测试之前，需要先配置微语系统以支持测试模式。根据您的部署方式选择相应的配置方法：

### 方式一：修改配置文件

在微语系统的配置文件中修改以下配置（如没有，请自行添加），以开启性能测试：

```properties
# ===============================
#= Performance Testing config
# ===============================
bytedesk.testing.enabled=true
bytedesk.testing.disable-captcha=true
bytedesk.testing.disable-ip-filter=true
```

### 方式二：Docker Compose 环境变量

如果使用 Docker Compose 部署，在 Docker 部署配置中（例如 `deploy/docker/compose-app-bytedesk.yaml`）添加以下环境变量：

```yaml
# Performance Testing config
BYTEDESK_TESTING_ENABLED: "true"
BYTEDESK_TESTING_DISABLE_CAPTCHA: "true"
BYTEDESK_TESTING_DISABLE_IP_FILTER: "true"
```

配置说明

- `bytedesk.testing.enabled`: 设置为 true 启用性能测试模式
- `bytedesk.testing.disable-captcha`: 设置为 true 禁用验证码验证
- `bytedesk.testing.disable-ip-filter`: 设置为 true 禁用IP过滤

配置完成后重启微语系统服务。

### 方式三：通过将ip添加到白名单

用超级管理员登录管理后台，在：管理后台-》超级管理-》用户-》白名单IP 添加测试机器的IP。

![ip_white](/img/performance/ip_white.png)

## 测试步骤

### 启动JMeter

注意：mac上双击 bin/ApacheJMeter.jar 启动 jmeter 会报错，需要使用终端运行。

```bash
cd bin/ && ./jmeter.sh
```

### 开始测试

- [登录测试步骤](./01_login.md)
- [一对一客服测试步骤](./02_agent.md)
- [工作组客服测试步骤](./03_workgroup.md)
- [机器人客服测试步骤](./04_robot.md)

## 参考链接

- [JMeter官网](https://jmeter.apache.org/)
- [官网下载JMeter](https://jmeter.apache.org/download_jmeter.cgi) (推荐版本: 5.6.3)
- [📊 压测脚本与数据](https://github.com/Bytedesk/bytedesk/tree/main/jmeter)
- [JMeter插件安装说明](https://apifox.com/apiskills/jmeter-plugin-collection/)
