# FreeSWITCH 配置动态化实施方案

## 目标

在不破坏现有 FreeSWITCH 启动链路的前提下，将高频变化的 SIP 业务配置迁移到微语服务数据库，并通过 xml_curl 与 ESL 实现受控发布、回滚和观测。

## 设计原则

1. 保留静态骨架
internal/external 的监听、TLS、WS/WSS、基础 NAT、证书路径继续留在本地 XML。

2. 先动态化业务配置
优先动态化 directory、gateway、号码路由、IVR 绑定、部分 dialplan 与 configuration。

3. 保持可回退
数据库命中失败时，继续回退到本地 XML 文件，避免一次性切换导致注册和通话不可用。

4. 发布动作受控
配置变更后由后端统一调用 ESL 执行 reloadxml、xml_flush_cache、sofia profile rescan 或 restart。

## 当前仓库基础

- xml_curl 已启用：[deploy/freeswitch/conf/autoload_configs/xml_curl.conf.xml](deploy/freeswitch/conf/autoload_configs/xml_curl.conf.xml)
- mod_xml_curl 已加载：[deploy/freeswitch/conf/autoload_configs/modules.conf.xml](deploy/freeswitch/conf/autoload_configs/modules.conf.xml)
- Sofia profile 静态骨架仍从本地 include：[deploy/freeswitch/conf/autoload_configs/sofia.conf.xml](deploy/freeswitch/conf/autoload_configs/sofia.conf.xml)
- 后端 xml_curl 入口：[modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlController.java](modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlController.java)
- 后端 ESL 控制入口：[modules/call/src/main/java/com/bytedesk/call/esl/EslController.java](modules/call/src/main/java/com/bytedesk/call/esl/EslController.java)
- 前端控制台入口：[frontend/apps/callAdmin/src/pages/Dashboard/Call/FreeswitchControl/index.tsx](frontend/apps/callAdmin/src/pages/Dashboard/Call/FreeswitchControl/index.tsx)

## 当前实现现状

1. FreeSWITCH 侧已经有 dialplan、configuration、directory 的动态 XML 骨架。
部署目录中的 Lua xml_handler 已具备按 section 分发和按数据库视图渲染 dialplan、ivr.conf 的能力。

2. 应用侧真正可用的仍主要是 directory。
[modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlService.java](modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlService.java) 里 directory 已支持 provider 顺序回退；dialplan 仍只有目标号 9297 的演示片段；configuration 中 ivr.conf 仍只是空的 menus 和 phrases 壳。

3. 当前 xml_curl 绑定只应继续保持 directory。
在应用侧 dialplan provider、configuration provider 和路由建模补齐之前，不应直接把 mod_xml_curl 绑定扩展到 dialplan 或 configuration，否则只会得到 not found 或空壳配置。

4. enterprise 现有实体还不足以直接渲染完整 FreeSWITCH XML。
[enterprise/call/src/main/java/com/bytedesk/call/dialplan/DialplanEntity.java](enterprise/call/src/main/java/com/bytedesk/call/dialplan/DialplanEntity.java) 目前只有 name、description、type；[enterprise/call/src/main/java/com/bytedesk/call/destination/DestinationEntity.java](enterprise/call/src/main/java/com/bytedesk/call/destination/DestinationEntity.java) 只有号码基础信息；[enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuRequest.java](enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuRequest.java) 和现有前端类型也只承载 extensionNumber、workflowUid 这一层绑定语义。

5. 应用侧 provider 扩展点也还没长到阶段三所需的形状。
[modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlDirectoryProvider.java](modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlDirectoryProvider.java) 只覆盖 directory；[modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlConfigurationProvider.java](modules/call/src/main/java/com/bytedesk/call/xml_curl/XmlCurlConfigurationProvider.java) 只覆盖 configuration；当前还没有与 dialplan 对应的 pluggable provider 接口。

6. 前端管理面也还停留在基础资料层。
[frontend/apps/callAdmin/src/@types/call/destination.d.ts](frontend/apps/callAdmin/src/@types/call/destination.d.ts) 和 [frontend/apps/callAdmin/src/@types/call/dialplan.d.ts](frontend/apps/callAdmin/src/@types/call/dialplan.d.ts) 目前没有 routeTargetType、routeTargetUid、context、priority、matchExpression 等字段，无法直接承载动态路由配置。

## 动态化边界

### 保持静态

- profile 名称
- sip-ip / rtp-ip
- sip-port
- tls / wss 监听
- 证书路径
- 基础 NAT 相关参数

### 进入数据库

- SIP 分机目录
- gateway / trunk
- 号码到 IVR / workflow 绑定
- 组织级路由规则
- 部分业务变量
- 可热更新的 configuration 子集

## 分阶段实施

### 阶段一：Directory 动态化

目标：让 FreeSWITCH 优先从数据库读取分机目录，失败时回退本地 XML。

实施要点：

1. 将 directory provider 改为顺序 provider 机制。
2. 新增数据库 provider，优先按数据库目标号返回最小可注册 XML。
3. 保留本地 provider 作为 fallback。
4. 发布后只执行 reloadxml + xml_flush_cache。

### 阶段二：Gateway 动态化

目标：将 external 侧 gateway 从文件迁移到数据库。

实施要点：

1. 建模 gateway 参数与 profile 归属。
2. 通过 configuration section 返回 profile/gateway XML 片段。
3. 发布后执行 reloadxml + xml_flush_cache + sofia profile external rescan。

### 阶段三：号码路由与 IVR 绑定动态化

目标：让号码、IVR、流程编排通过数据库驱动 dialplan。

实施要点：

1. 明确引入路由对象，而不是继续把语义压在现有 destination 或 dialplan 简化实体里。
建议新增或补强以下建模能力：
   - 入局号码或匹配表达式
   - 生效 context 与优先级
   - 路由目标类型：ivr_menu、workflow、queue、bridge、hangup、playback
   - 目标标识与附加参数
   - 启停状态、组织归属、发布时间

2. 将 IVR 绑定拆成两层。
   - 第一层是 DID 或路由规则命中后进入哪个 IVR 菜单或工作流
   - 第二层是 IVR 菜单内部按键如何继续流转
当前 IvrMenu 只覆盖了第一层的一部分入口语义，不等于完整 ivr.conf。

3. 应用侧新增 dialplan provider，而不是依赖 XmlCurlService 中的 9297 演示分支。
provider 需要按 context、destination_number、组织信息生成最小可执行的 extension XML，并保留本地 fallback。

4. 应用侧新增 ivr.conf provider。
provider 需要把 IVR 菜单入口、欢迎语、超时/无效按键处理、按键目标等渲染成 configuration section，而不是继续返回空壳 menus。

5. 发布后执行 reloadxml + xml_flush_cache，并按变更类别决定是否追加 profile rescan。

6. 阶段三验收标准不是“打开 dialplan/configuration 绑定”，而是：
   - 指定 DID 可以稳定命中数据库路由
   - IVR 入口与下游动作可重复渲染
   - 关闭数据库命中时能安全回退到本地 XML

### 阶段三建议落地物

为避免阶段三继续停留在抽象层，建议把交付物固定为下面三类。

#### 1. 后端数据模型

建议新增独立路由实体，例如 CallRouteEntity，而不是继续复用现有 DialplanEntity 和 DestinationEntity。

建议字段：

- routeName
- orgUid
- context
- matchType：exact、regex、prefix
- matchValue
- priority
- targetType：ivr_menu、workflow、queue、bridge、hangup、playback
- targetUid 或 targetValue
- failoverType 与 failoverTarget
- enabled
- publishedVersion
- remark

现有实体的建议职责调整：

- DestinationEntity：保留号码资源、归属地、启停、标签等资料属性
- DialplanEntity：保留业务模板或规则集合定义，不再承担单条 DID 路由事实
- IvrMenuEntity：继续表示 IVR 入口及 workflow 绑定，但不直接承担完整按键树渲染

#### 2. 应用侧 xml_curl 扩展点

建议新增以下接口或等价实现：

- XmlCurlDialplanProvider：按 context、destination_number、组织信息生成完整 dialplan XML
- IvrConfigurationXmlBuilder：把 IVR 菜单及按键动作渲染为 ivr.conf 的 menu 结构
- CallRouteResolver：负责从 DID、上下文、组织信息解析命中的路由目标

建议最小调用链：

1. XmlCurlController 接收 dialplan section 请求
2. XmlCurlService 委托 XmlCurlDialplanProvider
3. XmlCurlDialplanProvider 调用 CallRouteResolver 命中路由
4. 根据 targetType 输出 bridge、transfer、ivr、queue 等 action XML
5. 未命中时回退本地 XML 或 result not found

configuration 的建议最小调用链：

1. XmlCurlController 接收 ivr.conf 请求
2. XmlCurlService 委托 XmlCurlConfigurationProvider
3. provider 内部调用 IvrConfigurationXmlBuilder
4. builder 根据 IvrMenu、按键项、录音资源输出 menus

#### 3. 管理端 DTO 与页面增量

建议为 destination 或新 route 模块增加以下字段：

- context
- matchType
- matchValue
- priority
- routeTargetType
- routeTargetUid
- routeTargetLabel
- failoverTargetType
- failoverTargetUid
- enabled

建议前端页面职责：

- Destination 页面继续管理号码资源
- 新 Route 页面负责 DID 到目标的命中规则
- IvrMenu 页面继续管理入口号码和 workflow 绑定
- 后续再单独增加 IVR 节点或按键树编辑页

### 阶段三补充：5002 测试号码接入自定义 IVR 的建议实施顺序

该需求的关键不是先改 FreeSWITCH，而是先把 workflow IVRBuilder 里的流程语义收敛成一组可被电话引擎稳定执行的节点子集。

当前仓库现状：

- workflow 的 IVRBuilder 已经能保存 IVR 类型工作流，节点类型包括 start、text、keyboard、condition、end。
- callAdmin 的 IvrMenu 页面已经支持 extensionNumber 和 workflowUid 绑定。
- 后端 IvrMenuRestService 已经校验 workflowUid 必须指向 IVR 类型工作流。
- 后端 IvrMenuHttapiController 目前只做到“按号码找到 workflow，提取第一段可播报内容，然后播报并挂断”，还不支持完整按键导航。

因此，建议把“5002 自定义 IVR 测试”拆成下面五步，而不是一次性同时改 workflow、callAdmin、xml_curl、ivr.conf。

#### 第一步：先锁定首批可执行节点语义

首批只支持以下最小子集：

- start：流程入口，不直接产生语音动作
- text：播放提示音或 TTS 文本
- keyboard：收集按键输入
- condition：按键值到分支的映射
- end：挂断或结束流程

这一步要先明确节点到 FreeSWITCH 动作的映射关系：

- text 对应 speak 或 playback
- keyboard 对应 play_and_get_digits 或 HTTAPI collectdigits
- condition 对应 digits 到下一节点的路由判断
- end 对应 hangup

如果这个映射不先定，后续 workflow 保存出来的 schema 无法稳定渲染到 FreeSWITCH。

#### 第二步：先做“工作流 schema 编译器”，不要让 FreeSWITCH 直接理解前端 schema

建议新增一个独立的后端编译层，职责是把 workflow schema 编译为电话流程中间表示，而不是让 xml_curl 或 HTTAPI controller 直接遍历前端 JSON。

建议输出的中间表示至少包含：

- entryNodeId
- prompts
- digitCollectors
- branches
- terminalAction

这样做的原因有两个：

- workflow 前端 schema 将来还会继续演进，不能让 FreeSWITCH 适配逻辑直接绑死在前端字段上
- 同一份编译结果后续既可以渲染 HTTAPI，也可以渲染 ivr.conf 或 dialplan XML

#### 第三步：先用 5002 做静态测试入口，验证导航闭环

在“先验证、后动态化”的原则下，5002 建议先作为固定测试入口，不要第一步就走全量动态路由。

推荐顺序：

1. 先在 FreeSWITCH 本地测试拨号入口中增加 5002
2. 5002 的动作先固定指向微语后端的 IVR HTTAPI 或等价测试入口
3. 请求参数带上 extensionNumber=5002，以及必要时的 orgUid
4. 由后端按 5002 找到 IvrMenu，再由 IvrMenu 找到 workflowUid，再执行编译后的 IVR 流程

这样做的目的，是把“自定义 IVR 流程是否可导航”这个问题，和“dialplan 是否完全动态化”这个问题拆开验证。

#### 第四步：callAdmin 只负责号码与 workflow 绑定，不负责编辑 IVR 语音流程

callAdmin 的 IvrMenuPage 在这个需求里应该继续保持轻量职责，只负责：

- 创建测试号码 5002 的 IVR 菜单记录
- 绑定 workflowUid
- 展示当前绑定关系
- 提供跳转到 workflow IVRBuilder 的入口

不建议把 IVR 节点编辑能力复制到 callAdmin。IVRBuilder 才是流程编辑器，callAdmin 只负责电话入口绑定。

因此，这一阶段 callAdmin 的新增最好只包括：

- 增加“测试号码”说明或预置 5002 的引导
- 增加“去 IVRBuilder 编辑”跳转
- 增加“测试拨号说明”或“复制测试号码”辅助信息

#### 第五步：5002 跑通后，再把临时测试入口迁移到动态路由

当 5002 已经能稳定完成以下动作之后，再进入真正的阶段三动态化：

- 进入 workflow 首节点播报
- 接收用户按键
- 根据按键跳到下一节点
- 能正常结束或挂断

此时再做下面两件事：

1. 用 CallRouteEntity 或 dialplan provider 把 5002 从静态测试入口迁到数据库路由
2. 再决定是否把 HTTAPI 执行链进一步沉淀成 ivr.conf provider 或 dialplan XML provider

#### 推荐落地顺序总结

1. 先定义 IVRBuilder 节点到电话动作的最小语义子集
2. 后端增加 workflow schema 到电话流程中间表示的编译层
3. FreeSWITCH 增加固定测试号码 5002，先接后端测试入口
4. callAdmin 用 IvrMenu 绑定 5002 和 workflowUid
5. workflow IVRBuilder 只负责流程编辑和保存
6. 跑通按键导航后，再把 5002 从静态入口迁到动态 dialplan/route

#### 这一轮不建议直接做的事

- 不建议第一步就把 xml_curl 直接扩到完整 dialplan 和 ivr.conf
- 不建议让 FreeSWITCH 直接解析前端 workflow schema
- 不建议同时在 workflow 项目和 callAdmin 项目都实现 IVR 流程编辑
- 不建议把“5002 测试入口”与“最终动态路由体系”一次性交付

### 阶段四：发布、审计与回滚

目标：让动态化配置可管理、可追踪、可恢复。

实施要点：

1. 增加配置版本、差异预览、审计日志。
2. 增加 XML 预渲染校验与错误阻断。
3. 增加配置发布记录和回滚入口。
4. 增加最近 xml_curl 命中和 ESL 执行结果观测。

## 发布动作建议

1. directory / dialplan 变更：reloadxml + xml_flush_cache
2. gateway / external profile 相关变更：reloadxml + xml_flush_cache + sofia profile external rescan
3. 监听级参数变更：人工确认后 restart profile 或重启 FreeSWITCH

## 风险与控制

1. 远端配置不可用风险
保留最小本地静态配置和本地 provider fallback。

2. 错误配置扩散风险
在发布前执行 schema 校验、XML 渲染校验和预览 diff。

3. 热更新能力边界不清
所有配置项必须标记生效级别：热更新、需 rescan、需 restart、禁止动态化。

4. 安全风险
xml_curl 必须增加 token 校验、来源 IP 白名单、限流与审计。

## 首期范围结论

首期推荐只做：

- directory 动态化
- gateway 动态化准备
- 号码路由与 IVR 绑定的数据模型设计
- 发布与回退链路

首期不做：

- internal/external profile 全量远程化
- 监听端口、证书、基础网络配置数据库化
- 在 provider 和数据模型未补齐前直接开启 dialplan/configuration 动态绑定
