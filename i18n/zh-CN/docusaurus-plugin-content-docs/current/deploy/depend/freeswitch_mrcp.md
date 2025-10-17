---
sidebar_label: Freeswitch Mrcp
sidebar_position: 16
---

# Freeswitch Mrcp

## mod_unimrcp 编译安装

:::tip 前置条件
在安装 mod_unimrcp 之前，请先完成 FreeSWITCH 的安装，详见 [Freeswitch 安装指南](./freeswitch.md)。
:::

### 环境要求

- Linux 64位系统（Ubuntu/Debian/CentOS）
- GCC 8.2 或更高版本
- 已安装 FreeSWITCH（参考 [Freeswitch 安装指南](./freeswitch.md)）
- 4核8G内存（推荐配置，支持约20并发）

### 编译步骤

#### 1. 编译 UniMRCP 依赖（APR、APR-Utils）

```bash
# 下载 UniMRCP 依赖包
wget https://www.unimrcp.org/project/component-view/unimrcp-deps-1-6-0-tar-gz/download -O unimrcp-deps-1.6.0.tar.gz
tar xvzf unimrcp-deps-1.6.0.tar.gz
cd unimrcp-deps-1.6.0

# 编译 APR
cd libs/apr
./configure --prefix=/usr/local/apr
make
sudo make install
cd ..

# 编译 APR-Util
cd apr-util
./configure --prefix=/usr/local/apr --with-apr=/usr/local/apr
make
sudo make install
cd ../..
```

#### 2. 编译 UniMRCP

```bash
# 克隆 UniMRCP 源码
git clone https://github.com/unispeech/unimrcp.git
cd unimrcp

# 编译安装
./bootstrap
./configure
make
sudo make install
cd ..
```

#### 3. 编译并安装 mod_unimrcp

```bash
# 克隆 mod_unimrcp 源码
git clone https://github.com/freeswitch/mod_unimrcp.git
cd mod_unimrcp

# 设置 PKG_CONFIG_PATH 环境变量
export PKG_CONFIG_PATH=/usr/local/freeswitch/lib/pkgconfig:/usr/local/unimrcp/lib/pkgconfig

# 编译安装
./bootstrap.sh
./configure
make
sudo make install
```

#### 4. 启用模块

编辑 FreeSWITCH 模块配置文件：

```bash
vim /usr/local/freeswitch/conf/autoload_configs/modules.conf.xml
```

在 `<modules>` 节点中添加：

```xml
<load module="mod_unimrcp"/>
```

#### 5. 验证安装

```bash
# 检查模块文件是否存在
ls -l /usr/local/freeswitch/mod/mod_unimrcp.so

# 重启 FreeSWITCH
freeswitch -stop
freeswitch -nc

# 连接到 FreeSWITCH CLI 并验证模块加载
fs_cli
# 在 CLI 中执行：
show modules | grep unimrcp
# 应该看到 mod_unimrcp 已加载
```

### 常见问题

1. **编译错误：找不到 FreeSWITCH 头文件**
   - 确保 FreeSWITCH 已正确安装
   - 检查 PKG_CONFIG_PATH 环境变量设置是否正确

2. **编译错误：找不到 UniMRCP 库**
   - 确认 UniMRCP 已成功编译安装
   - 检查 `/usr/local/unimrcp` 目录是否存在
   - 运行 `sudo ldconfig` 更新系统库缓存

3. **模块加载失败**
   - 检查 FreeSWITCH 日志：`tail -f /usr/local/freeswitch/log/freeswitch.log`
   - 确认模块文件权限正确
   - 验证依赖库是否完整

4. **权限问题**
   - 某些操作需要 sudo 权限
   - 确保有足够的权限访问安装目录

## 对接

### 百度云MRCP

- 请参考[百度呼叫中心语音MRCP用户指南](https://ai.baidu.com/ai-doc/SPEECH/Ukarty6aa)

#### 概述

百度云 MRCP Server 集成了呼叫中心 8K 采样率语音识别（ASR）和语音合成（TTS）能力，支持单独或同时使用。

#### 前置准备

1. **获取百度 AI 凭证**
   - 访问[百度 AI 开放平台](https://ai.baidu.com)
   - 创建应用，获取 AppID、API Key、Secret Key

2. **下载 MRCP Server**
   
   **方式一：浏览器下载**
   - 访问[呼叫中心语音解决方案 MrcpServer 下载页面](https://ai.baidu.com/download?sdkId=111)
   - 下载后上传到服务器
   
   **方式二：服务器命令下载（推荐）**
   
   ```bash
   # 创建下载目录
   mkdir -p ~/baidu-mrcp && cd ~/baidu-mrcp
   
   # 使用 wget 下载（如果下载链接有效）
   # 注意：百度可能需要登录才能下载，如果以下命令失败，请使用方式一
   wget -O baidu-mrcp-server.tar.gz "https://www.weiyuai.cn/download/baidu-MRCPServer-20200609.tar.gz"
   
   # 或使用 curl 下载
   curl -L -o baidu-mrcp-server.tar.gz "https://www.weiyuai.cn/download/baidu-MRCPServer-20200609.tar.gz"
   
   # 解压文件
   tar -xzf baidu-mrcp-server.tar.gz
   
   # 查看解压后的目录结构
   ls -la
   ```
   
   > **提示**：
   > - 由于百度 AI 平台的下载可能需要登录认证，直接使用 wget/curl 可能无法下载
   > - 如果命令下载失败，建议使用浏览器下载后，通过 `scp` 或 `sftp` 上传到服务器
   > - 上传命令示例：`scp baidu-mrcp-server.tar.gz user@server:/path/to/destination/`

3. **环境要求**
   - Linux 64位（CentOS 6u3、CentOS 7+ 或 Ubuntu）
   - GCC 8.2 或以上版本
   - 4核8G内存（支持约20并发）

#### 音频格式要求

| 参数 | 要求 |
|------|------|
| 编码格式 | PCMU、PCMA、L16 |
| 采样率 | 8KHz |
| 采样精度 | 16bits |
| 声道 | 单声道 |

#### 配置步骤

##### 1. 初始化环境

```bash
# 解压下载的 MRCP Server 包
cd ${SERVER_ROOT}/
sudo ./bootstrap.sh  # 配置 gcc8.2 环境（仅首次需要）
```

##### 2. 配置 IP 地址

编辑主配置文件 `${SERVER_ROOT}/mrcp-server/conf/unimrcpserver.xml`：

```xml
<!-- 方式1：自动获取（推荐） -->
<ip type="auto">auto</ip>

<!-- 方式2：指定网卡 -->
<ip type="iface">eth0</ip>

<!-- 方式3：手动指定IP -->
<ip>10.10.0.1</ip>
```

##### 3. 配置鉴权信息

**语音识别配置**（`conf/mrcp-asr.conf`）：

```bash
# 修改以下配置项
AUTH_APPID=your_app_id          # 百度 AppID
AUTH_APPKEY=your_api_key        # 百度 API Key
NEED_SAVE_AUDIO=1               # 是否保存识别音频（1-保存，0-不保存）
```

**语音合成配置**（`conf/mrcp-proxy.conf`）：

```bash
# 修改以下配置项
AUTH_APPID=your_app_id          # 百度 AppID
AUTH_APPKEY=your_api_key        # 百度 API Key
```

##### 4. 配置启动监测

编辑 `${SERVER_ROOT}/mrcp-server/conf/unimrcpserver_control.conf`：

```bash
# 如果使用 auto 方式配置 IP，保持默认
_check_cmd_pro="./bin/check 127.0.0.1 1544"

# 如果手动指定 IP，修改为对应 IP
_check_cmd_pro="./bin/check 10.10.0.1 1544"
```

##### 5. 防火墙配置

确保以下端口开放：
- **5060**：SIP 信令端口
- **1544**：MRCP 控制端口
- **1554**：RTP 媒体端口

```bash
# CentOS/RHEL 防火墙配置示例
sudo firewall-cmd --permanent --add-port=5060/tcp
sudo firewall-cmd --permanent --add-port=1544/tcp
sudo firewall-cmd --permanent --add-port=1554/tcp
sudo firewall-cmd --reload
```

#### 启动服务

##### 调试模式（推荐测试时使用）

```bash
cd ${SERVER_ROOT}/mrcp-server/
./bin/unimrcpserver -r . &

# 验证服务是否启动
netstat -nlp | grep unimrcp
# 应该看到 5060、1544、1554 端口正在监听
```

##### 生产模式（守护进程）

```bash
cd ${SERVER_ROOT}/mrcp-server/

# 启动服务
./bin/unimrcpserver_control start

# 停止服务
./bin/unimrcpserver_control stop

# 重启服务
./bin/unimrcpserver_control restart

# 查看进程状态
ps aux | grep mrcp
```

#### 测试验证

##### 1. 配置测试工具

编辑 `conf/client-profiles/unimrcp.xml`，修改服务器 IP：

```xml
<sip-settings>
    <server-ip>your_server_ip</server-ip>  <!-- 修改为实际服务器IP -->
    <server-port>5060</server-port>
</sip-settings>
```

##### 2. 测试语音识别

```bash
# 设置环境变量
export LD_LIBRARY_PATH=${SERVER_ROOT}/mrcp-server/lib:$LD_LIBRARY_PATH

# 进入测试目录
cd ${SERVER_ROOT}/mrcp-server/bin

# 运行识别测试
./asrclient
# 在交互界面输入命令：
run grammar.xml xeq.pcm
# 查看识别结果后输入 quit 退出
```

##### 3. 查看日志

```bash
# 查看识别日志
tail -f ${SERVER_ROOT}/mrcp-server/log/mrcp_debug.log

# 查看系统日志
tail -f ${SERVER_ROOT}/mrcp-server/log/comlog.log
```

#### 集成 FreeSWITCH

##### 1. 配置 FreeSWITCH MRCP Profile

创建或编辑 `/usr/local/freeswitch/conf/mrcp_profiles/baidu.xml`：

```xml
<profile name="baidu" version="2">
  <param name="server-ip" value="百度MRCP服务器IP"/>
  <param name="server-port" value="5060"/>
  <param name="resource-location" value=""/>
  <param name="sip-transport" value="udp"/>
  
  <!-- 语音识别配置 -->
  <synthparams>
  </synthparams>
  
  <!-- 语音合成配置 -->
  <recogparams>
    <param name="start-input-timers" value="false"/>
  </recogparams>
</profile>
```

##### 2. 在 Dialplan 中使用

```xml
<extension name="baidu_asr_test">
  <condition field="destination_number" expression="^9001$">
    <!-- 播放提示音 -->
    <action application="answer"/>
    <action application="sleep" data="1000"/>
    <action application="speak" data="请说话"/>
    
    <!-- 调用语音识别 -->
    <action application="play_and_detect_speech" 
            data="silence_stream://2000 mrcp:baidu {start-input-timers=false}builtin:grammar/boolean grammar.xml"/>
    
    <!-- 获取识别结果 -->
    <action application="log" data="INFO 识别结果: ${detect_speech_result}"/>
  </condition>
</extension>
```

#### 识别结果格式

默认返回 XML 格式：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<result>
    <asr confidence="100">今天天气怎么样</asr>
    <ext>
        <logid>6a373e36722811e9_2_1</logid>
    </ext>
</result>
```

可在 `conf/mrcp-asr.conf` 中通过 `XML_ASR_RESULT_TEMPLATE` 自定义返回格式。

#### 高级功能

##### 1. 自训练模型

对于专业术语、人名等特殊词汇，可使用[百度语音自训练平台](https://ai.baidu.com/tech/smartasr)训练专属模型。

训练完成后，在 MRCP 请求的 `vendor_specific_params` 参数中添加模型 ID：

```
lmid=your_model_id
```

##### 2. 单字过滤

避免因噪声误识别单字（如"嗯"、"啊"），可配置白名单：

在 `conf/mrcp-asr.conf` 中：
```bash
DETECT_START_OF_INPUT_BY_VAD=0
SINGLE_WORD_WHTIL_LIST=/path/to/whitelist.txt
```

#### 常见问题

1. **服务启动失败**
   - 检查端口是否被占用：`netstat -nlp | grep -E '5060|1544|1554'`
   - 查看日志文件排查具体错误

2. **识别无结果**
   - 确认 AppID 和 API Key 配置正确
   - 检查音频格式是否符合要求（8K、16bit、单声道）
   - 查看 `log/mrcp_debug.log` 日志

3. **频繁掉线**
   - 检查网络连接稳定性
   - 确认并发数未超过服务器承载能力

4. **识别率低**
   - 确保音频清晰，无明显噪音
   - 考虑使用自训练模型优化特定词汇识别

### 腾讯云MRCP

### 科大讯飞MRCP

### 阿里云MRCP

## 参考

- [mod_unimrcp github](https://github.com/freeswitch/mod_unimrcp)
- [mod_unimrcp freeswitch docs](https://developer.signalwire.com/freeswitch/FreeSWITCH-Explained/Modules/mod_unimrcp_6586728/)
- [百度呼叫中心语音MRCP用户指南](https://ai.baidu.com/ai-doc/SPEECH/Ukarty6aa)
- [FunASR](https://github.com/modelscope/FunASR)
- [MRCP在美团语音交互中的实践和应用](https://tech.meituan.com/2023/03/09/practice-and-application-of-mrcp-in-voice-interaction-of-meituan.html)
