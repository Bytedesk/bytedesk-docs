---
sidebar_label: 性能测试
sidebar_position: 10
---

# 性能测试方案

## 私有部署 JMeter 进行性能测试

- [下载 jmeter](https://jmeter.apache.org/download_jmeter.cgi)
- [压测脚本与数据](https://gitee.com/270580156/weiyu/tree/main/jmeter)

### 测试步骤

#### 启动JMeter

注意：mac上双击 bin/ApacheJMeter.jar 启动 jmeter 会报错，需要使用终端运行。

```bash
cd bin/ && ./jmeter.sh
```

#### 在JMeter中导入这些.jmx文件

#### 根据需要调整HOST和PORT变量

#### 运行测试并查看结果

这两个JMeter测试文件分别对应：

1. agent_single_visitor_test.jmx/workgroup_single_visitor_test.jmx:
    - agent: 单客服、workgroup: 客服组
    - 模拟单个访客流程
    - 包含init和request两个请求
    - 设置了必要的请求头和参数
    - 使用JSON提取器获取响应数据
2. agent_multiple_visitors_test.jmx/workgroup_multiple_visitors_test.jmx:
    - agent: 单客服、workgroup: 客服组
    - 模拟100个并发访客
    - 每个访客发送100个请求
    - 使用计数器生成唯一访客ID
    - 包含结果查看器和汇总报告

这些测试文件完全模拟了Java测试代码中的行为，并添加了性能测试相关的配置。

## 利用阿里云 PTS 进行性能测试

## 利用腾讯云 PTS 进行性能测试

## 参考链接

- [JMeter](https://jmeter.apache.org/)
- [📊 压测脚本与数据](https://gitee.com/270580156/weiyu/tree/main/jmeter)
- [阿里云性能测试](https://ptsnext.console.aliyun.com/?spm=5176.7946858.J_5253785160.4.5a02ed1dhApB1v#/overviewpage)
- [腾讯云性能测试](https://console.cloud.tencent.com/monitor/pts)
