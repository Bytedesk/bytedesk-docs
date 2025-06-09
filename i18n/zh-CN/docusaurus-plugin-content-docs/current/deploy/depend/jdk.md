---
sidebar_label: JDK17
sidebar_position: 10
---

# JDK17 安装指南

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：4核8G内存
:::

## 准备工作

1. 访问[Oracle官网](https://www.oracle.com/java/technologies/downloads/)下载JDK17
2. 直接[点击此链接](https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz)下载Linux x64版本的JDK17

## 安装步骤

### 步骤1：解压JDK安装包

将下载好的JDK压缩包解压到当前目录：

```bash
sudo tar -zxvf jdk-17_linux-x64_bin.tar.gz
```

> 解压后会得到名为`jdk-17.0.10`的文件夹（版本号可能有所不同）

### 步骤2：创建安装目录并移动JDK文件

创建Java安装目录并将JDK文件夹移动到该目录下：

```bash
sudo mkdir -p /usr/java
sudo mv jdk-17.0.10 /usr/java/
```

### 步骤3：配置环境变量

我们需要配置全局环境变量，使所有用户都能使用Java：

1. 使用文本编辑器打开全局配置文件：

```bash
sudo vi /etc/profile
```

2. 在文件**底部**添加以下配置信息：

```bash
export JAVA_HOME=/usr/java/jdk-17.0.10
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:%{JAVA_HOME}/lib:%{JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```

> 注意：请确保JAVA_HOME路径与您实际的JDK安装路径一致

3. 保存并退出编辑器（在vi中按ESC，然后输入`:wq`回车）

4. 使环境变量立即生效：

```bash
source /etc/profile
```

### 步骤4：验证安装

执行以下命令验证JDK是否安装成功：

```bash
java -version
```

如果看到类似下面的输出，说明JDK安装成功：

```bash
java version "17.0.10" 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 17.0.10+11-LTS-240)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.10+11-LTS-240, mixed mode, sharing)
```

## 常见问题

### 1. 环境变量不生效

如果执行`java -version`命令后提示"命令未找到"，可能是环境变量未正确设置。尝试以下方法：

- 确认是否正确执行了`source /etc/profile`命令
- 检查`/etc/profile`文件中添加的路径是否正确
- 尝试重新登录系统后再测试

### 2. 特定用户配置

如果只想为当前用户配置环境变量，可以编辑`~/.bashrc`或`~/.profile`文件，添加相同的环境变量设置。

### 3. 管理多个JDK版本

如果需要在同一系统上安装多个JDK版本，可以使用`alternatives`命令进行管理：

```bash
sudo update-alternatives --install /usr/bin/java java /usr/java/jdk-17.0.10/bin/java 1
```

## 加密策略配置（JCE）

:::note
JDK 17默认已包含无限制加密策略。对于JDK 8及以下版本，可能需要手动安装JCE（Java Cryptography Extension）无限制强度加密策略文件。
:::

对于JDK 8，由于受到美国对出口软件的限制，某些加密功能（如高强度加密算法）需要单独安装JCE策略文件：

1. [下载JDK加密策略文件包](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)
2. 解压下载的ZIP文件
3. 安装策略文件：

```bash
# 安装解压工具
sudo apt install unzip

# 解压策略文件
unzip jce_policy-8.zip
cd UnlimitedJCEPolicyJDK8

# 拷贝策略文件到JDK安装目录
# 可通过命令 echo $JAVA_HOME 查看JDK安装路径
# 替换下面的路径为您的实际JDK路径
sudo cp US_export_policy.jar /usr/java/jdk1.8.0_351/jre/lib/security/
sudo cp local_policy.jar /usr/java/jdk1.8.0_351/jre/lib/security/
```

## 其他资源

- [JDK 17官方文档](https://docs.oracle.com/en/java/javase/17/)
- [Java语言规范](https://docs.oracle.com/javase/specs/jls/se17/html/index.html)
- [JDK工具参考](https://docs.oracle.com/en/java/javase/17/docs/specs/man/index.html)
