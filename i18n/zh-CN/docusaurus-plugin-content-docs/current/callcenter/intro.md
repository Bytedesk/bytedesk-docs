---
sidebar_label: 微语呼叫中心
sidebar_position: 1
---

# 微语AI智能呼叫中心/AI智能电话客服系统

微语呼叫中心面向电话营销、售前咨询、售后服务、客户回访等场景，提供呼入接待、外呼触达、IVR 语音导航、坐席协作、通话转接与会议等能力，帮助企业将传统电话线路快速接入统一客服平台。

- [呼入AI智能接待解决方案](../solution/call_in_auto.md)
- [外呼AI智能触达解决方案](../solution/call_out_auto.md)
- [更多](../solution/)

## 快速试用指南

在快速试用微语呼叫中心之前，请先准备以下内容。完成这些准备后，即可验证线路接入、坐席签入、IVR 导航和基础通话流转是否正常。

- 固话或可接入的电话终端
- 可用的固话号码
- 鼎信通达 Dinstar 语音网关，安装与接线可参考 [鼎信通达语音网关](./dinstar.md)
- 如果需要试用分机号、网关对接指导或业务场景咨询，可联系客服获取支持。[扫码联系微信](/img/wechat.png)

### 呼叫配置

呼叫配置用于建立“外部号码 - 分机 - 坐席账号”之间的对应关系，是电话接入平台后的第一步。通过该配置，可以明确来电进入哪个分机、由哪个客服账号接听，以及坐席是否具备呼出能力。

前往[呼叫中心管理后台](https://www.weiyuai.cn/ippbx/)创建呼叫配置，将客服坐席、固话号码与分机号绑定。

![call_settings](/img/callcenter/call_settings.png)

#### 创建呼叫配置

创建时建议优先确认线路号码、分机号、归属坐席和启用状态。配置完成后，系统即可按规则将通话分配到对应客服，便于后续进行呼入接待、外呼回访和通话记录追踪。

![call_settings_new](/img/callcenter/call_settings_new.png)

#### 客服工作台查看

相应客服账号的呼叫配置开启之后，登录[客服工作台](https://www.weiyuai.cn/agent/)查看是否显示软电话工具条。软电话工具条是坐席进行电话作业的核心入口，签入后即可执行呼出、接听、转接、三方会议等操作，也方便坐席统一处理电话与在线客服会话。

![softphone](/img/callcenter/softphone.png)

### IVR设置

IVR 设置用于搭建自动语音应答流程，帮助企业在人工坐席接听前完成欢迎语播报、按键导航、业务分流和服务时段提示。适用于总机接待、售前分流、售后转人工等场景。

![call_ivr](/img/callcenter/call_ivr.png)

#### 创建IVR

创建 IVR 时，可以配置语音提示、按键规则和后续流转节点。这样来电用户可以根据语音菜单自主选择服务方向，减少前台人工转接压力，并提升高峰时段的接待效率。

![call_ivr_new](/img/callcenter/call_ivr_new.png)

### IVR工作流

IVR 工作流用于把语音菜单、队列分配、转人工、超时处理、挂机结束等节点串联起来，形成完整的来电处理路径。通过可视化工作流，业务人员可以更直观地设计不同场景下的接待逻辑。

![call_ivr_workflow](/img/callcenter/call_ivr_workflow.png)

#### 自定义IVR工作流

通过自定义 IVR 工作流，可以按企业实际业务需求扩展分支流程，例如按地区分流、按产品线分流、转指定技能组、下班时间自动播报或回退上一级菜单。该能力适合对接待策略有精细化要求的团队。

![call_workflow](/img/callcenter/call_workflow.png)

### [客服工作台](https://www.weiyuai.cn/agent/callcenter)

完成以上配置后，即可进入[呼叫中心客服工作台](https://www.weiyuai.cn/agent/callcenter)进行实际试呼叫，验证来电接入、坐席签入、IVR 导航、转接与会议等功能是否符合预期。

![call_agent](/img/callcenter/call_agent.png)

## 文档下载

如需向团队内部汇报、做方案评审或交付实施文档，可直接下载以下 PPT 和 Word 版本资料。

- [微语呼叫中心-呼入解决方案ppt下载](https://www.weiyuai.cn/download/ppt/%E5%BE%AE%E8%AF%AD%E5%91%BC%E5%8F%AB%E4%B8%AD%E5%BF%83-%E5%91%BC%E5%85%A5%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pptx)
- [微语呼叫中心-呼入解决方案word下载](https://www.weiyuai.cn/download/docx/%E5%BE%AE%E8%AF%AD%E5%91%BC%E5%8F%AB%E4%B8%AD%E5%BF%83-%E5%91%BC%E5%85%A5%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.docx)
- [微语呼叫中心-外呼解决方案ppt下载](https://www.weiyuai.cn/download/ppt/%E5%BE%AE%E8%AF%AD%E5%91%BC%E5%8F%AB%E4%B8%AD%E5%BF%83-%E5%A4%96%E5%91%BC%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pptx)
- [微语呼叫中心-外呼解决方案word下载](https://www.weiyuai.cn/download/docx/%E5%BE%AE%E8%AF%AD%E5%91%BC%E5%8F%AB%E4%B8%AD%E5%BF%83-%E5%A4%96%E5%91%BC%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.docx)
