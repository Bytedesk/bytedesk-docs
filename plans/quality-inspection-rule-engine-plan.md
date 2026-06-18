# 质检规则引擎落地方案

## 1. 背景与目标

微语当前已有质检方案、质检记录、质检申诉、质检统计等基础模块，但整体仍以人工评分表为主。后续需要将质检能力升级为可配置、可自动执行、可审计、可扩展的规则引擎体系，覆盖在线客服、机器人、呼叫中心三类核心服务场景。

目标是建设一套统一的质检平台：

- 支持在线客服、机器人、呼叫中心三类质检方案。
- 支持后台配置质检指标、规则算子、触发条件、评分动作。
- 支持系统在会话结束、通话结束、转写完成、定时补偿时自动运行质检。
- 支持人工复核、申诉、统计、规则版本追溯。
- 支持后续接入 AI 情绪识别、语义判断、话术完整性、答非所问检测等能力。

## 2. 设计原则

1. 一套规则引擎，多类业务上下文。
2. 规则配置可视化，执行过程可解释。
3. 自动质检和人工质检共用同一套质检结果模型。
4. 规则执行器不直接依赖在线客服、机器人、呼叫中心的具体业务表，由上下文构建器适配。
5. 规则必须支持多租户隔离、权限控制、版本追溯和审计。
6. 第一阶段采用受控 DSL + Java 内置执行器，不引入 Drools 等重型规则引擎。
7. AI 判断结果作为上下文字段进入规则引擎，不直接替代规则引擎的评分逻辑。

## 3. 质检场景范围

### 3.1 在线客服质检

质检对象：人工客服接待的在线会话。

典型检查项：

- 首响时长是否达标。
- 平均响应时长是否达标。
- 是否超时回复。
- 是否使用标准开场白。
- 是否使用标准结束语。
- 是否邀请用户评价。
- 是否按要求创建工单。
- 是否违规承诺、诱导、辱骂、泄露隐私。
- 是否出现敏感词、禁用词。
- 用户差评后是否有跟进动作。
- 是否存在客户重复追问、客服答非所问。

### 3.2 机器人质检

质检对象：机器人接待流程、机器人回复内容、机器人转人工行为。

典型检查项：

- 是否命中知识库。
- 是否连续多次兜底回复。
- 是否答非所问。
- 是否错误转人工或未及时转人工。
- 关键词转人工是否触发。
- 是否引导留资。
- 是否携带知识来源、附件、链接。
- 是否解决用户问题。
- 是否出现不合规生成内容。
- 用户重复追问后是否升级处理。

### 3.3 呼叫中心质检

质检对象：通话记录、录音、ASR 转写文本、坐席动作、通话元数据。

典型检查项：

- 是否录音。
- 是否完成 ASR 转写。
- 是否使用标准开场白、结束语。
- 是否完成身份核验。
- 通话时长是否异常。
- 静音时长是否异常。
- 是否频繁打断客户。
- 是否多次保持、转接。
- 是否客户主动挂机。
- 是否存在客户强烈负面情绪。
- 是否按要求生成工单或回访任务。
- 是否存在违规承诺、敏感词、投诉风险。

## 4. 总体架构

```text
业务事件
  |-- 在线会话结束
  |-- 机器人会话结束
  |-- 通话结束
  |-- ASR 转写完成
  |-- 定时补偿扫描
        |
        v
QualityAutoInspectionService
        |
        v
QualityInspectionContextBuilder
  |-- OnlineServiceQualityContextBuilder
  |-- BotQualityContextBuilder
  |-- CallCenterQualityContextBuilder
        |
        v
QualityRuleEngineService
        |
        v
QualityCheck / QualityRuleMatch / QualityStatistic
```

核心职责：

- 业务模块只负责产生事件或提供查询能力。
- 质检模块负责识别是否有启用方案、构建上下文、执行规则、生成结果。
- 规则引擎只处理规则匹配、评分计算、命中明细生成。
- 统计模块从质检结果中聚合，不重复实现规则逻辑。

## 5. 核心领域模型

### 5.1 QualityPlan 质检方案

现有模型继续复用，并扩展为规则引擎入口。

建议字段：

| 字段 | 说明 |
| --- | --- |
| uid | 方案 UID |
| name | 方案名称 |
| description | 方案说明 |
| type | ONLINE_SERVICE / BOT / CALL_CENTER / TICKET |
| indicators | 质检指标列表 |
| enabled | 是否启用 |
| autoCheckEnabled | 是否自动质检 |
| baseScore | 基础分，默认 100 |
| passScore | 及格分，默认 70 |
| samplingStrategy | 抽检策略，ALL / RATIO / COUNT |
| samplingValue | 抽检比例或数量 |
| version | 发布版本 |
| publishedAt | 发布时间 |

### 5.2 QualityIndicator 质检指标

现有指标模型继续保留，用来表示评分维度。

建议字段：

| 字段 | 说明 |
| --- | --- |
| indicatorName | 指标名称 |
| indicatorScore | 分值 |
| deduction | 是否扣分项 |
| mandatory | 是否必检 |
| description | 指标说明 |
| category | 指标分类，如服务礼仪、响应效率、合规风险 |
| maxDeduction | 单指标最大扣分 |

### 5.3 QualityRule 质检规则

新增核心模型，绑定到质检方案。

建议字段：

| 字段 | 说明 |
| --- | --- |
| uid | 规则 UID |
| planUid | 所属质检方案 UID |
| planType | ONLINE_SERVICE / BOT / CALL_CENTER |
| name | 规则名称 |
| description | 规则说明 |
| category | 规则分类 |
| target | 检测对象 |
| scope | 检测范围 |
| operator | 算子 |
| values | 匹配值列表 |
| conditionJson | 高级条件 JSON |
| actionJson | 命中动作 JSON |
| priority | 优先级 |
| enabled | 是否启用 |
| version | 规则版本 |

示例：

```json
{
  "name": "未使用标准开场白",
  "planType": "ONLINE_SERVICE",
  "target": "AGENT_MESSAGE",
  "scope": "FIRST_AGENT_REPLY",
  "operator": "NOT_CONTAINS_ANY",
  "values": ["您好", "请问有什么可以帮您"],
  "actionJson": {
    "indicatorName": "服务礼仪",
    "score": 5,
    "deduction": true,
    "riskLevel": "MEDIUM",
    "needReview": false
  }
}
```

### 5.4 QualityCheck 质检结果

现有质检结果模型继续复用，并扩展自动质检字段。

建议字段：

| 字段 | 说明 |
| --- | --- |
| uid | 质检结果 UID |
| type | ONLINE_SERVICE / BOT / CALL_CENTER |
| status | COMPLETED / APPEALING / CLOSED 等 |
| qualityPlanUid | 方案 UID |
| qualityPlanVersion | 方案版本 |
| queueMember | 在线客服/机器人会话关联 |
| callRecordUid | 呼叫中心通话记录 UID |
| indicators | 最终评分指标 |
| ruleMatches | 规则命中明细 |
| autoCheck | 是否自动质检生成 |
| rawScore | 自动质检原始分 |
| manualAdjustedScore | 人工调整后分数 |
| reviewRequired | 是否需要人工复核 |
| comment | 备注 |

### 5.5 QualityRuleMatch 命中明细

可以先作为 JSON 字段存储在 QualityCheck 中，后续数据量变大再拆表。

建议字段：

| 字段 | 说明 |
| --- | --- |
| ruleUid | 命中规则 UID |
| ruleName | 规则名称快照 |
| indicatorName | 影响的指标 |
| score | 加扣分值 |
| deduction | 是否扣分 |
| riskLevel | LOW / MEDIUM / HIGH / CRITICAL |
| evidence | 命中证据文本 |
| target | 命中对象 |
| messageUid | 消息 UID，可选 |
| startTime | 通话证据开始时间，可选 |
| endTime | 通话证据结束时间，可选 |
| needReview | 是否需要人工复核 |

## 6. 规则算子设计

### 6.1 文本算子

| 算子 | 说明 |
| --- | --- |
| CONTAINS_ANY | 包含任一关键词 |
| CONTAINS_ALL | 包含全部关键词 |
| NOT_CONTAINS_ANY | 不包含任一关键词 |
| EQUALS | 完全等于 |
| REGEX | 正则匹配 |
| LENGTH_GT | 文本长度大于 |
| LENGTH_LT | 文本长度小于 |

### 6.2 数值算子

| 算子 | 说明 |
| --- | --- |
| GT | 大于 |
| GTE | 大于等于 |
| LT | 小于 |
| LTE | 小于等于 |
| BETWEEN | 区间内 |
| NOT_BETWEEN | 区间外 |

### 6.3 布尔与存在性算子

| 算子 | 说明 |
| --- | --- |
| EXISTS | 字段存在 |
| NOT_EXISTS | 字段不存在 |
| IS_TRUE | 为 true |
| IS_FALSE | 为 false |

### 6.4 集合算子

| 算子 | 说明 |
| --- | --- |
| IN | 字段值在集合中 |
| NOT_IN | 字段值不在集合中 |
| COUNT_GT | 集合数量大于 |
| COUNT_LT | 集合数量小于 |

## 7. 检测对象与范围

### 7.1 target 检测对象

| target | 适用场景 | 说明 |
| --- | --- | --- |
| AGENT_MESSAGE | 在线客服、呼叫中心转写 | 坐席消息或坐席话术 |
| BOT_MESSAGE | 机器人 | 机器人回复 |
| VISITOR_MESSAGE | 在线客服、机器人、呼叫中心转写 | 用户消息或用户话术 |
| FULL_TRANSCRIPT | 三类场景 | 完整会话或完整转写文本 |
| SERVICE_ACTION | 在线客服、机器人 | 转人工、建工单、邀请评价等动作 |
| CALL_METADATA | 呼叫中心 | 通话时长、响铃时长、挂机方等 |
| EXTERNAL_FIELD | 三类场景 | 客户等级、渠道、业务类型等外部字段 |

### 7.2 scope 检测范围

| scope | 说明 |
| --- | --- |
| FIRST_AGENT_REPLY | 坐席首条回复 |
| FIRST_BOT_REPLY | 机器人首条回复 |
| LAST_AGENT_REPLY | 坐席最后回复 |
| ALL_AGENT_MESSAGES | 全部坐席消息 |
| ALL_BOT_MESSAGES | 全部机器人消息 |
| ALL_VISITOR_MESSAGES | 全部访客消息 |
| FULL_THREAD | 完整会话 |
| CALL_TRANSCRIPT | 完整通话转写 |
| CALL_METADATA | 通话元数据 |

## 8. 质检上下文

### 8.1 统一上下文结构

规则引擎不直接读取业务表，而是读取统一上下文。

建议结构：

```json
{
  "type": "ONLINE_SERVICE",
  "orgUid": "org_xxx",
  "workgroupUid": "wg_xxx",
  "agentUid": "agent_xxx",
  "robotUid": "robot_xxx",
  "visitorUid": "visitor_xxx",
  "channel": "WEB",
  "startedAt": "2026-06-16T10:00:00+08:00",
  "endedAt": "2026-06-16T10:12:00+08:00",
  "messages": [],
  "actions": [],
  "metrics": {},
  "call": {},
  "ai": {},
  "external": {}
}
```

### 8.2 在线客服上下文

重点字段：

- 消息列表。
- 坐席首响时间。
- 平均响应时间。
- 最大响应时间。
- 是否转接。
- 是否创建工单。
- 是否邀请评价。
- 满意度结果。
- 客户是否差评。

### 8.3 机器人上下文

重点字段：

- 机器人回复列表。
- 知识库命中次数。
- 兜底回复次数。
- 转人工次数。
- 关键词转人工命中情况。
- 用户重复追问次数。
- AI 语义评分结果。

### 8.4 呼叫中心上下文

重点字段：

- 通话记录 UID。
- CDR UID。
- 录音文件 URL。
- 是否有录音。
- 是否完成 ASR。
- 转写文本。
- 说话人分离结果。
- 通话时长。
- 响铃时长。
- 静音时长。
- 转接次数。
- 保持次数。
- 挂机方。
- 客户情绪。

## 9. 自动运行机制

### 9.1 事件触发

| 事件 | 场景 | 处理方式 |
| --- | --- | --- |
| ThreadClosedEvent | 在线客服、机器人 | 会话结束后自动质检 |
| QueueMemberClosedEvent | 在线客服、机器人 | 排队成员结束后自动质检 |
| CallRecordCompletedEvent | 呼叫中心 | 通话结束后自动质检 |
| CdrCompletedEvent | 呼叫中心 | CDR 完成后自动质检 |
| AsrTranscriptionCompletedEvent | 呼叫中心 | 转写完成后补跑质检 |

### 9.2 定时补偿

新增 `QualityInspectionScheduler`，定时扫描未质检数据：

- `QueueMember.qualityChecked = false` 且会话已结束。
- 呼叫中心通话已结束但未质检。
- ASR 转写完成但未质检。
- 质检任务失败但可重试。

补偿策略：

- 每 5 分钟扫描最近 24 小时未质检记录。
- 每天凌晨扫描最近 7 天异常记录。
- 单条失败记录最多重试 3 次。
- 失败原因写入任务日志，避免静默失败。

### 9.3 手动触发

后台支持：

- 单条会话重新质检。
- 单条通话重新质检。
- 按时间范围批量重跑。
- 按方案版本批量重跑。
- 按坐席、技能组、机器人批量重跑。

## 10. 后台功能规划

### 10.1 质检方案列表

功能：

- 查询方案。
- 新建方案。
- 编辑方案。
- 启用/停用。
- 复制方案。
- 发布新版本。
- 查看方案版本。

### 10.2 质检方案编辑

建议使用 Tabs：

1. 基本信息。
2. 评分指标。
3. 规则算子。
4. 自动质检设置。
5. 测试与预览。
6. 版本记录。

### 10.3 规则算子编辑

字段：

- 规则名称。
- 适用场景。
- 检测对象。
- 检测范围。
- 算子类型。
- 匹配值。
- 高级条件。
- 命中动作。
- 风险等级。
- 是否需要人工复核。
- 是否启用。

### 10.4 规则测试

支持两种测试方式：

- 输入模拟文本测试。
- 选择历史会话或通话测试。

测试结果展示：

- 命中规则。
- 命中证据。
- 加扣分明细。
- 预计总分。
- 是否需要人工复核。

### 10.5 质检结果页

增加展示：

- 自动质检/人工质检来源。
- 方案名称和版本。
- 命中规则列表。
- 命中证据。
- 原始分和人工调整分。
- 风险等级。
- 复核状态。

## 11. 权限设计

建议权限模块：

| 权限 | 说明 |
| --- | --- |
| QUALITY_PLAN_VIEW | 查看质检方案 |
| QUALITY_PLAN_CREATE | 创建质检方案 |
| QUALITY_PLAN_UPDATE | 修改质检方案 |
| QUALITY_PLAN_DELETE | 删除质检方案 |
| QUALITY_RULE_VIEW | 查看质检规则 |
| QUALITY_RULE_CREATE | 创建质检规则 |
| QUALITY_RULE_UPDATE | 修改质检规则 |
| QUALITY_RULE_DELETE | 删除质检规则 |
| QUALITY_CHECK_VIEW | 查看质检结果 |
| QUALITY_CHECK_REVIEW | 人工复核质检结果 |
| QUALITY_CHECK_RERUN | 重新运行质检 |
| QUALITY_APPEAL_VIEW | 查看质检申诉 |
| QUALITY_APPEAL_REVIEW | 审核质检申诉 |
| QUALITY_STATISTIC_VIEW | 查看质检统计 |

需要同步优化角色权限页面中的名称展示，避免用户找不到“会话质检”相关权限。

落地时需要兼容现有后端权限常量：后端已有 `QUALITY_PLAN_READ`、`QUALITY_CHECK_READ` 等命名，表格中的 `VIEW` 可作为产品语义或前端展示文案，实际权限常量建议统一使用 `READ`，避免同一权限出现两套编码。

## 12. 分期落地步骤

### 阶段一：规则引擎基础闭环

目标：完成在线客服和机器人自动质检的最小可用闭环。

后端任务：

1. 新增 `quality_rule` 包和 CRUD。
2. 新增 `QualityRuleEntity`、`QualityRuleRequest`、`QualityRuleResponse`。
3. 新增规则枚举：场景、检测对象、检测范围、算子、风险等级。
4. 新增 `QualityRuleEngineService`。
5. 新增 `QualityInspectionContext` DTO。
6. 新增 `OnlineServiceQualityContextBuilder`。
7. 新增 `BotQualityContextBuilder`。
8. 扩展 `QualityCheckEntity`，保存 `autoCheck`、`ruleMatches`、`rawScore`、`reviewRequired`。
9. 新增 `QualityAutoInspectionService.inspectQueueMember(uid)`。
10. 会话结束后触发自动质检。

前端任务：

1. 新增 `quality_rule.ts` API。
2. 新增 `quality_rule.d.ts` 类型。
3. 扩展质检方案编辑页，增加规则算子 Tab。
4. 新增规则编辑抽屉或弹窗。
5. 质检结果详情展示命中规则和证据。
6. 补充 i18n 文案。

验证标准：

- 可以创建在线客服方案。
- 可以创建机器人方案。
- 可以配置关键词、正则、数值、存在性规则。
- 会话结束后自动生成质检结果。
- 质检结果可以看到命中明细。

### 阶段二：呼叫中心质检接入

目标：支持通话结束、录音转写完成后的自动质检。

后端任务：

1. 新增 `CallCenterQualityContextBuilder`。
2. 适配 CallRecord/CDR 数据。
3. 接入录音 URL、通话时长、响铃时长、挂机方等元数据。
4. 接入 ASR 转写文本字段。
5. 新增 `inspectCallRecord(uid)`。
6. 通话结束事件触发自动质检。
7. ASR 转写完成事件触发补跑质检。

前端任务：

1. 呼叫中心方案支持 CALL_CENTER 类型。
2. 规则算子增加通话特征字段。
3. 质检结果支持查看录音、转写文本、命中片段。

验证标准：

- 通话结束后可自动生成质检结果。
- 有 ASR 文本时可检测话术、敏感词、违规承诺。
- 无 ASR 文本时可先检测通话元数据。

### 阶段三：自动任务与批量重跑

目标：提升自动质检可靠性和运营可用性。

后端任务：

1. 新增 `QualityInspectionTaskEntity` 或任务日志。
2. 新增 `QualityInspectionScheduler`。
3. 支持未质检会话补偿扫描。
4. 支持失败任务重试。
5. 支持按方案批量重跑。
6. 支持规则版本快照。

前端任务：

1. 增加自动质检设置。
2. 增加批量重跑入口。
3. 增加任务执行日志页面。

验证标准：

- 事件漏触发后可以由定时任务补偿。
- 规则更新后可以手动重跑历史数据。
- 失败原因可追踪。

### 阶段四：AI 智能质检增强

目标：把 AI 分析能力作为规则引擎上下文字段接入。

后端任务：

1. 接入情绪识别结果。
2. 接入答非所问检测结果。
3. 接入话术完整性检测结果。
4. 接入投诉风险识别结果。
5. 接入机器人回复质量评分。
6. 将 AI 输出结构化存入 `context.ai`。

前端任务：

1. 规则算子支持 AI 字段。
2. 质检结果展示 AI 分析摘要。
3. 支持人工反馈 AI 误判。

验证标准：

- AI 结果可作为规则条件参与评分。
- 质检结果仍可解释，不依赖黑盒总分。

### 阶段五：统计、申诉、运营闭环

目标：完善质检运营能力。

后端任务：

1. 按规则、指标、风险等级统计命中率。
2. 按坐席、技能组、机器人统计质检得分。
3. 申诉通过后修正统计数据。
4. 支持质检员复核工作量统计。

前端任务：

1. 增加规则命中趋势。
2. 增加坐席质检排行。
3. 增加机器人质检排行。
4. 增加高风险会话列表。
5. 增加申诉处理看板。

验证标准：

- 管理员可以看到质检覆盖率、平均分、风险命中率。
- 可以定位高风险规则、高风险坐席、高风险机器人。
- 申诉和复核能闭环。

## 13. 推荐第一期实施清单

第一期建议只做必要闭环：

1. `QualityRule` 后端 CRUD。
2. 基础规则执行器。
3. 在线客服上下文构建器。
4. 机器人上下文构建器。
5. `QualityCheck` 保存自动质检命中明细。
6. 会话结束自动执行质检。
7. 后台规则配置 UI。
8. 后台规则测试 UI。
9. 质检结果展示命中明细。
10. 基础权限和菜单可见性修正。
11. Liquibase 数据库变更和索引设计。
12. 自动质检幂等键、执行日志和失败原因记录。
13. 规则配置校验、正则安全限制和执行超时保护。
14. 单元测试覆盖规则算子、评分计算和上下文构建。

不建议第一期就做：

- Drools 等复杂规则引擎。
- 大规模 AI 语义质检。
- 完整呼叫中心 ASR 质量分析。
- 复杂抽样策略。
- 独立 BI 大屏。

## 14. 验收用例

### 14.1 在线客服

1. 创建在线客服质检方案。
2. 添加规则：坐席首响超过 60 秒扣 5 分。
3. 添加规则：坐席首条回复不包含“您好”扣 3 分。
4. 结束一条测试会话。
5. 系统自动生成质检结果。
6. 结果中展示命中规则、证据和扣分。

### 14.2 机器人

1. 创建机器人质检方案。
2. 添加规则：连续兜底次数大于 2 扣 10 分。
3. 添加规则：用户消息包含“人工”但未转人工扣 10 分。
4. 结束一条机器人会话。
5. 系统自动生成质检结果。
6. 结果标记为需要人工复核。

### 14.3 呼叫中心

1. 创建呼叫中心质检方案。
2. 添加规则：无录音扣 20 分。
3. 添加规则：通话时长小于 10 秒扣 5 分。
4. 添加规则：转写文本包含敏感词扣 10 分。
5. 完成一条通话记录。
6. 系统自动质检通话元数据。
7. ASR 完成后补充执行文本规则。

## 15. 风险与注意事项

1. 正则规则必须限制长度和执行超时，避免性能问题。
2. 不允许后台配置任意 SpEL 或脚本表达式，避免安全风险。
3. 规则版本必须保存快照，避免历史质检结果无法解释。
4. 自动质检必须可重试，不能因单条失败影响整体任务。
5. 呼叫中心质检依赖录音和 ASR，第一期应允许无 ASR 时只检查元数据。
6. AI 质检必须保留证据和人工复核入口，避免黑盒扣分。
7. 多租户场景下规则、结果、统计必须严格按 orgUid 隔离。
8. 批量重跑需要限流，避免影响线上业务。

## 16. 需要补充的落地设计

结合业内质检平台和规则引擎实践，当前方案还需要补充以下工程化设计，否则后续实现时容易出现重复质检、历史结果无法解释、规则配置不安全、统计口径不一致等问题。

### 16.1 模块边界与兼容策略

当前质检方案、质检记录、质检申诉、质检统计位于 `enterprise/service`，队列成员、会话和消息等基础数据位于 `modules/service`。第一期建议继续把规则引擎放在 `enterprise/service`：

- `quality_rule`、`quality_engine`、`quality_context`、`quality_task` 均放入 `enterprise/service/src/main/java/com/bytedesk/service/` 下。
- 只通过 `QueueMemberRestService`、消息查询服务、机器人会话查询服务构建上下文，不让规则引擎直接跨模块读取过多业务细节。
- 开源模块只保留 `QueueMember.qualityChecked`、`qualityCheckScore`、`qualityCheckedAt` 这类结果标记，不反向依赖企业规则引擎。
- 前端继续放在 `frontend/apps/admin/src/pages/Dashboard/Quality/thread`，先复用现有质检菜单，再增加规则 Tab 和命中明细展示。

### 16.2 数据库变更与索引

所有新增字段和表必须通过 Liquibase 维护，避免 JPA 自动建表在生产环境不可控。

建议一期新增：

- `bytedesk_service_quality_rule`：保存规则配置。
- `bytedesk_service_quality_inspection_task`：保存自动质检任务、重试次数和失败原因。
- `bytedesk_service_quality_check` 扩展字段：`is_auto_check`、`rule_matches`、`raw_score`、`manual_adjusted_score`、`is_review_required`、`quality_plan_version`、`rule_snapshot`。
- `bytedesk_service_quality_plan` 扩展字段：`is_auto_check_enabled`、`base_score`、`pass_score`、`sampling_strategy`、`sampling_value`、`plan_version`、`published_at`。

建议索引：

- 规则表：`org_uid + plan_uid + enabled + deleted`。
- 任务表：`org_uid + object_type + object_uid` 唯一幂等键，另加 `status + next_retry_at`。
- 结果表：`org_uid + quality_plan_uid + created_at`、`org_uid + check_type + created_at`、`queue_member_uid`。

### 16.3 规则版本与快照

规则执行必须保存快照，不能只保存 `ruleUid`。否则规则被修改后，历史质检结果无法解释。

建议：

- `QualityRuleEntity.version` 每次发布规则时递增。
- 自动质检时把命中规则的名称、算子、匹配值、动作、风险等级、版本写入 `QualityRuleMatch`。
- `QualityCheckEntity.ruleSnapshot` 保存本次执行使用的全部规则摘要，用于审计和复跑对比。
- 草稿规则不参与自动质检，只有已发布且启用的规则参与执行。

### 16.4 执行幂等与任务状态机

自动质检必须幂等。同一会话或通话在同一方案版本下重复触发时，不应重复生成多条有效结果。

建议任务状态：

| 状态 | 说明 |
| --- | --- |
| PENDING | 待执行 |
| RUNNING | 执行中 |
| SUCCEEDED | 执行成功 |
| FAILED_RETRYABLE | 可重试失败 |
| FAILED_FINAL | 最终失败 |
| SKIPPED | 无可用方案或抽样未命中 |

幂等键建议为：`orgUid + objectType + objectUid + planUid + planVersion`。

### 16.5 评分模型与统计口径

当前 `QualityCheckEntity.getTotalScore()` 是加分减分累加模型。规则引擎应改为更适合质检的基础分模型：

- 从 `QualityPlan.baseScore` 开始，默认 100 分。
- 扣分规则减少分数，加分规则增加分数。
- 最终分数按 0 到 100 截断，避免负分或超过 100 分。
- `rawScore` 保存自动质检分数，`manualAdjustedScore` 保存人工调整后分数。
- 统计默认使用人工调整后分数；若为空，则使用自动质检原始分。
- 同一指标可设置 `maxDeduction`，避免同类规则重复命中过度扣分。

### 16.6 规则配置校验与安全边界

第一期采用受控 DSL 是正确方向，还需要明确安全边界：

- 禁止后台输入任意 SpEL、JavaScript、SQL、Groovy、Shell。
- 正则表达式限制长度、禁用高风险模式，并设置匹配超时。
- `values` 数量、单值长度、`conditionJson` 大小需要限制。
- 所有 target、scope、operator 必须由枚举白名单校验。
- 高级条件只允许字段路径、比较符、常量值和 `AND/OR` 组合。
- 规则测试接口必须限流，避免被用作高成本正则执行入口。

### 16.7 上下文字段字典

后台规则配置页不能只给用户自由输入字段路径，需要提供上下文字段字典。

建议新增 `QualityContextFieldDescriptor`：

| 字段 | 说明 |
| --- | --- |
| fieldPath | 字段路径，如 `metrics.firstResponseSeconds` |
| label | 展示名称 |
| valueType | STRING / NUMBER / BOOLEAN / DATETIME / LIST |
| supportedOperators | 支持的算子列表 |
| planTypes | 适用方案类型 |
| description | 字段说明 |

前端根据字段字典动态过滤算子，减少错误配置。

### 16.8 审计、权限与操作日志

质检规则属于会影响员工绩效和申诉的数据，必须保留审计。

- 创建、修改、启用、停用、发布规则都需要记录操作人、时间、变更前后摘要。
- 人工调整分数、复核、申诉审核需要记录原因。
- 权限命名需要兼容现有代码中的 `QUALITY_PLAN_READ`、`QUALITY_CHECK_READ`，文档中的 `VIEW` 可以作为前端展示文案，但后端权限常量建议继续使用 `READ`，避免重复权限。
- 新增规则权限建议为 `QUALITY_RULE_CREATE/READ/UPDATE/DELETE/EXPORT`，重新质检建议为 `QUALITY_CHECK_RERUN`。

### 16.9 可观测性与运维保护

自动质检需要可观测，否则失败会静默吞掉运营数据。

建议记录指标：

- 自动质检触发次数、成功次数、失败次数、跳过次数。
- 单条上下文构建耗时、规则执行耗时、总耗时。
- 规则命中次数和高风险命中次数。
- 可重试失败队列长度。

保护策略：

- 批量重跑按租户限流。
- 单次任务限制最大消息数、最大转写文本长度和最大规则数。
- 上下文过大时截断并在命中明细中标记 `truncated=true`。

### 16.10 测试策略与发布闸门

一期至少补齐以下测试：

- 算子单元测试：文本、数值、布尔、集合、正则。
- 评分单元测试：基础分、扣分、加分、封顶封底、单指标最大扣分。
- 上下文构建测试：在线客服、机器人各一组正常和空数据样例。
- 幂等测试：同一会话重复触发不会生成重复有效结果。
- 权限测试：无规则权限不能创建或修改规则。
- 前端表单测试或最小人工验收：字段字典、算子联动、规则测试结果展示。

发布前必须通过 `enterprise/service` 编译，并至少跑规则引擎相关单元测试。

## 17. 后续扩展方向

- 接入客户满意度、差评、VOC 数据。
- 自动提取优秀服务案例。
- 自动沉淀优质回复到知识库或 skills。
- 将低分质检结果转培训任务。
- 将高风险会话自动生成工单或预警。
- 建立坐席服务质量成长档案。
- 建立机器人知识缺口分析和自动优化建议。
