---
sidebar_label: 鼎信通达语音网关
sidebar_position: 20
---

<!-- markdownlint-disable MD060 MD033 -->

# 鼎信通达语音网关对接微语

## 型号 DAG1000

- 2S2O (2内线+2外线)

## 使用步骤

- 模拟话机摘机，拨打*159#，听取IP地址
- 浏览器输入听到的IP地址，比如听到的IP地址为：192.168.1.3，则打开：[https://192.168.1.3](https://192.168.1.3/Login.htm)，注意需要使用https开头
- 默认用户名：admin，密码：admin，登录设备管理后台

## 常用命令

- 听取IP地址：*159#

<!-- ![dinstar_cmd.png](/img/callcenter/dinstar/dinstar_cmd.png) -->
<!-- ![dinstar_cmd2.png](/img/callcenter/dinstar/dinstar_cmd2.png) -->

## 对接过程

### 配置设备

- 将网线一头插到语音网关WAN口，另一端插到光猫
- 将一条电话线一头插到FXS 0口，另外一头插到固定话机
- 将另外一条电话线一头插到FXO 0口，另外一头插到光猫话机口

import dinstar_0 from '/img/callcenter/dinstar/dinstar_0.jpg';

<img src={dinstar_0} alt="版权声明" width="360" />

### 登录界面

![login.png](/img/callcenter/dinstar/login.png)

### 登录之后

![dashboard.png](/img/callcenter/dinstar/dashboard.png)

### 对接微语SIP服务器

- 微语演示SIP服务器地址：sip.weiyuai.cn，端口：5060，生产环境请修改为自家服务器，并修改默认端口号
- 修改SIP传输方式为：TCP

![dinstar_1.png](/img/callcenter/dinstar/dinstar_1.png)

### 添加端口

![dinstar_2.png](/img/callcenter/dinstar/dinstar_2.png)

### 添加FXO对外端口

- 用于对接运营商外线
- FXO对应端口：2、3
- 填写SIP账号和密码
- 代拨号码即从运营商出购买的座机号码，需要填写包括区号和座机号码

![dinstar_3.png](/img/callcenter/dinstar/dinstar_3.png)

### 添加FXS对应端口

- 用于对接内部话机
- FXS对应端口：0、1
- 填写SIP账号和密码，注意跟FXO区分不同账号

![dinstar_4.png](/img/callcenter/dinstar/dinstar_4.png)

### 添加IP-Tel路由

![dinstar_5.png](/img/callcenter/dinstar/dinstar_5.png)

![dinstar_6.png](/img/callcenter/dinstar/dinstar_6.png)

### 添加Tel-IP/Tel路由

![dinstar_7.png](/img/callcenter/dinstar/dinstar_7.png)

![dinstar_8.png](/img/callcenter/dinstar/dinstar_8.png)

### 查看对接状态

![dinstar_9.png](/img/callcenter/dinstar/dinstar_9.png)

## 更多命令

### 查询与基础维护

- *158#：查询 LAN 口 IP 地址
- *159#：查询 WAN 口 IP 地址（路由模式）/ 查询管理 IP 地址（桥接模式）
- *114#：查询端口电话号码
- *115#：查询端口组电话号码
- *168#：查询注册状态
- *154#：解除登录限制
- *111#：重启设备

### 网络配置

- *150*：设置获取 IP 方式
- *150*1#：设置固定 IP
- *150*2#：通过 DHCP 获取 IP
- *157*：设置网络模式
- *157*0#：设置路由模式
- *157*1#：设置桥接模式
- *152*：设置 IP 地址
- *153*：设置子网掩码
- *156*：设置网关

### 端口与访问控制

- *149*：打开/关闭 FXO 配置开关
- *149*1：打开 FXO 配置开关
- *149*0：关闭 FXO 配置开关
- *160*：远程访问开关
- *160*1#：打开 WAN 口访问 Web 开关
- *160*0#：关闭 WAN 口访问 Web 开关
- *160*3#：打开 LAN 口访问 Web 开关
- *160*2#：关闭 LAN 口访问 Web 开关
- *160*5#：打开 WAN 口访问 Telnet 开关
- *160*4#：关闭 WAN 口访问 Telnet 开关
- *160*7#：打开 LAN 口访问 Telnet 开关
- *160*6#：关闭 LAN 口访问 Telnet 开关

### 恢复出厂设置

- *165*：基本配置恢复出厂值
- *165*000000#：账户、密码和网络配置恢复出厂设置
- *166*：恢复出厂设置
- *166*000000#：执行恢复出厂设置

### 通话控制

- *47*：直接 IP 地址呼叫，例如目标 IP 为 192.168.1.11 时，拨打 \*47\*192\*168\*1\*11#
- *51#：启用呼叫等待
- *50#：禁用呼叫等待
- *87*：盲转，例如通话过程中转接到 801，请先拍叉再拨 \*87\*801#
- *72*：启用无条件呼转，后接转移号码
- *73#：禁用无条件呼转
- *90*：启用遇忙呼转，后接转移号码
- *91#：禁用遇忙呼转
- *92*：启用无应答呼转，后接转移号码
- *93#：禁用无应答呼转
- *78#：启用免打扰
- *79#：禁用免打扰
- *200#：访问语音信箱
- \*#：呼叫保持。通话过程中 2 秒内拨完 \*# 即进入呼叫保持，可通过拍叉或再次拨打 \*# 恢复通话
- \#\#：呼叫切换。端口存在两路通话时，通话过程中 2 秒内拨完 \#\# 即进行呼叫切换，释放当前通话并恢复未激活的通话
- Flash/Hook：在呼入电话之间切换；如果当前不在会话中，Flash/Hook 会为新呼叫切换到一条新的通道

### 音量调节

- *170#：增加端口音量（仅当该端口设置了 Tel 策略时有效，作用于该 Tel 策略）
- *171#：减小端口音量（仅当该端口设置了 Tel 策略时有效，作用于该 Tel 策略）

> 注意：以上部分功能操作码需要平台配合处理信令后才能正常使用。

## 常用链接

- [鼎信通达官方文档下载](https://www.dinstar.cn/Download/Analog-VoIP-Gateway/datasheet/?coseeId=7152701868)
