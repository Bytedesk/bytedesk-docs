# Bytedesk Self-Evolving Agent Skills Design

Date: 2026-04-26

## Goal

为微语设计一套面向企业客服场景的自进化 Agent Skills 落地方案。该方案不修改当前业务能力边界，而是在现有 AI、知识库、工作组路由、消息反馈和后台配置基础上，引入技能资产化、失败结构化、诊断自动化和优化半自动化能力，逐步把机器人从“基于提示词和知识库的问答器”升级为“可持续运营、可复盘、可迭代的技能系统”。

## Non-Goals

- 不在第一阶段直接实现全自动技能改写并上线。
- 不替换当前知识库检索、机器人路由或工作组接待主流程。
- 不重构现有模型接入层，不改变 providers.json 的职责。
- 不在第一阶段引入任意脚本执行或不受控工具执行能力。

## Current State

当前仓库已经具备以下能力，可作为本设计的直接基础：

- `modules/ai` 已支持多模型提供商、FAQ 检索结果聚合、LLM 上下文构造、默认回复与知识库辅助回答。
- `modules/kbase` 已支持 FAQ、服务设置、知识库绑定、workflow 开关等服务配置。
- `modules/service` 已支持机器人路由、人工兜底、工作组路由策略以及消息反馈实体雏形。
- `frontend/apps/admin` 已有工作组设置、FAQ 与机器人配置入口，可承载技能运营后台。
- 现有流程具备人机协同基础，适合采用“自动诊断 + 人工审核 + 灰度发布”的演进路线。

当前主要缺口有四类：

- 技能没有被定义成正式资产，仍分散在 prompt、知识库、FAQ、默认回复和路由规则中。
- 失败样本没有统一结构，无法稳定归因到 Knowledge、Tool、Clarification、Style。
- 没有技能版本、变更记录、评估对比和回滚链路。
- 没有针对失败样本的诊断与优化流水线。

## Design Principles

- 资产化优先：先把技能变成稳定对象，再谈自动优化。
- 最小侵入：尽量复用现有机器人、知识库、工作组和后台设置结构。
- 人工兜底：自动生成结论和修订草案，但正式发布必须可审核、可回滚。
- 结构化优先：先沉淀失败数据和技能结构，再逐步提高自动化程度。
- 多租户隔离：技能、反馈、评估和版本必须严格按 org / tenant 隔离。

## Proposed Architecture

### Overview

设计新增一条与现有客服主链路并行的“技能运营链路”：

1. 运行时链路：访客请求进入现有机器人/人工路由流程，机器人仍按当前机制基于知识库和 LLM 回复。
2. 观察链路：对每次 AI 回答、人工接管、人工改写、用户追问、满意度和工具调用结果做结构化记录。
3. 诊断链路：周期性聚合失败样本，输出技能缺陷报告。
4. 优化链路：根据缺陷报告生成技能修订草案，由管理员审核后发布新版本。
5. 评估链路：对不同技能版本进行离线回放、灰度对比和线上效果评估。

### Core Components

建议拆成五个核心能力域：

#### 1. Skill Registry

统一管理技能资产，包含：

- 技能元数据：名称、类型、适用范围、状态、所属 org、默认版本。
- 技能主体：instruction、knowledge references、tool policy、process rules、evaluation policy。
- 技能版本：版本号、草稿/已发布/已归档状态、变更说明、发布人、发布时间。
- 技能绑定：绑定到 robot、workgroup、agent assistant、workflow。

建议新增模块优先落在 `modules/ai`，避免把技能定义分散到多个业务模块。

#### 2. Failure Record Pipeline

统一收集和存储失败信号。这里的“失败”不等于模型报错，而是指低质量服务结果。核心来源包括：

- 用户继续追问同类问题。
- 用户触发转人工。
- 人工坐席未采用 AI 建议或大幅改写 AI 建议。
- 工具调用失败、超时、无结果或结果误读。
- 低满意度、点踩、投诉。
- 机器人未命中知识库且使用默认回复。

失败记录要保留原始上下文、分类结果、严重度和关联技能版本。

#### 3. Skill Diagnostician

对失败样本做聚合分析，输出技能诊断报告。诊断器不直接改线上技能，只负责回答三个问题：

- 哪类失败最集中。
- 失败主要归因于技能的哪个部分。
- 哪些修改最有可能带来收益。

建议第一阶段只支持四大一级分类：

- Knowledge
- Tool
- Clarification
- Style

后续再细分为二级原因，例如 `KNOWLEDGE_MISSING`、`TOOL_NOT_INVOKED`、`CLARIFICATION_UNDERASKED`、`STYLE_TOO_VERBOSE`。

#### 4. Skill Optimizer

根据诊断报告生成技能修订草案。优化器不直接操作数据库中的“已发布版本”，而是：

- 拉取当前生效技能版本。
- 生成拟修改 section 和建议内容。
- 输出新草稿版本。
- 交给人工审核。

第一阶段只允许修改：

- instruction sections
- clarification policy
- tool usage notes
- references 索引与知识摘要

不允许自动修改：

- 后端业务代码
- 权限配置
- 真实工具接口定义
- 租户级运行时安全策略

#### 5. Skill Ops Console

在管理后台提供技能运营视图：

- 技能列表与搜索。
- 技能版本历史。
- 版本 diff。
- 失败分类统计。
- 诊断报告查看。
- 草稿审核与发布。
- 技能与 robot/workgroup 绑定关系。

## Data Model

### SkillEntity

建议新增：

- uid
- orgUid
- name
- code
- type
- scopeType
- scopeUid
- status
- defaultVersionUid
- description

说明：

- `type` 可区分客服机器人技能、坐席助手技能、工作流助手技能。
- `scopeType/scopeUid` 用于表达租户级、工作组级、机器人级覆盖关系。

### SkillVersionEntity

建议新增：

- uid
- skillUid
- version
- status
- contentJson
- instructionMarkdown
- referencesSnapshotJson
- toolPolicyJson
- processPolicyJson
- evaluationPolicyJson
- sourceType
- sourceReportUid
- createdBy
- publishedBy
- publishedAt
- changelog

说明：

- `contentJson` 用于结构化存储完整技能定义。
- `instructionMarkdown` 方便后台直接编辑和 diff。
- `referencesSnapshotJson` 保存当时引用的 FAQ、文档、工单摘要快照，避免后续知识变化导致版本不可复现。

### SkillBindingEntity

建议新增：

- uid
- orgUid
- skillUid
- versionUid
- targetType
- targetUid
- enabled

说明：

- `targetType` 可取 `ROBOT`、`WORKGROUP`、`ASSISTANT`、`WORKFLOW`。

### SkillFailureRecordEntity

建议新增：

- uid
- orgUid
- threadUid
- messageUid
- skillUid
- skillVersionUid
- robotUid
- workgroupUid
- category
- subcategory
- severity
- triggerType
- rawContextJson
- toolTraceJson
- agentActionJson
- humanActionJson
- userFeedbackJson
- diagnosed
- createdAt

说明：

- `triggerType` 记录失败来源，如 `TRANSFER_TO_AGENT`、`USER_DOWNVOTE`、`HUMAN_REWRITE`、`TOOL_ERROR`。
- `rawContextJson` 保存脱敏后的对话片段、FAQ 命中、引用来源和模型回答。

### SkillDiagnosisReportEntity

建议新增：

- uid
- orgUid
- skillUid
- versionUid
- windowStart
- windowEnd
- sampleCount
- summaryJson
- recommendationsMarkdown
- status

### SkillOptimizationDraftEntity

建议新增：

- uid
- orgUid
- skillUid
- baseVersionUid
- diagnosisReportUid
- proposedVersionUid
- reviewStatus
- reviewComment
- reviewerUid

## Runtime Integration

### Existing Runtime Path

现有主链路保持不变：

- `modules/service` 负责访客接待、工作组路由和机器人/人工切换。
- `modules/ai` 负责知识库查询、上下文拼接、LLM 调用与默认回复。

### New Runtime Hooks

在不破坏主链路的前提下新增以下埋点：

#### Before Answer

- 记录当前绑定的 skill/version。
- 记录 FAQ 命中数、KB source、是否走默认回复。

#### During Answer

- 记录模型名、provider、prompt mode、tool trace。
- 记录是否启用知识库、是否命中 KB。

#### After Answer

- 记录用户是否继续追问。
- 记录是否转人工。
- 记录人工是否引用或重写 AI 建议。
- 记录满意度反馈。

这些埋点第一阶段可以落在 `modules/ai` 和 `modules/service` 的现有服务中，通过事件或异步消息写入失败记录表，避免阻塞主请求。

## Diagnosis Flow

### Input

- 指定时间窗口内的 SkillFailureRecord。
- 当前技能版本。
- 该技能关联的 FAQ、references、tool policy。

### Processing

1. 按 category / subcategory / severity 聚合。
2. 提取高频代表样本。
3. 生成诊断摘要，明确“问题发生在哪里”。
4. 输出建议改动 section 列表。

### Output

- 一份面向后台审核的诊断报告。
- 一份面向优化器的机器可解析优化计划。

建议第一阶段由后台定时任务触发，执行周期可以是每天或每周，按技能维度生成报告。

## Optimization Flow

### Draft Generation

优化器基于以下输入生成新草稿：

- base skill version
- diagnosis report
- selected failure samples
- allowed editable sections

### Review and Publish

后台审核流程建议为：

1. 生成草稿版本。
2. 展示版本 diff。
3. 管理员确认是否发布。
4. 发布后更新 SkillBinding 中的 versionUid。
5. 保留旧版本回滚能力。

### Safety Constraints

- 只允许修改声明为可编辑的技能 section。
- 发布动作必须带 reviewer 和 changelog。
- 所有版本变更必须可回溯到 diagnosis report 或人工创建来源。

## Backend Module Split

### modules/ai

建议承载：

- SkillEntity / SkillVersionEntity / SkillBindingEntity
- Skill runtime resolve service
- Skill diagnoser / optimizer service
- 技能版本发布逻辑

### modules/service

建议承载：

- AI 服务结果埋点
- 转人工、人工接管、人工改写等事件
- 与消息反馈、会话状态相关的失败触发器

### modules/kbase

建议承载：

- FAQ / references / workflow 配置与技能绑定解析
- 工单摘要、FAQ 快照、知识引用快照的生成入口

### starter

建议承载：

- 定时任务注册
- 可选异步处理器配置
- 审计日志和发布事件监听

## Admin Console Changes

### New Pages

- 技能管理列表页
- 技能详情页
- 技能版本页
- 诊断报告页
- 优化草稿审核页

### Existing Pages to Extend

- Robot settings 增加 skill 绑定。
- Workgroup settings 增加默认 skill / 覆盖 skill。
- FAQ / KBase 页面增加“加入技能 references”动作。
- 质检页面增加“由技能问题导致”的失败视图。

## Rollout Plan

### Phase 1: Observe

- 补齐结构化失败记录。
- 将 AI 建议采纳、转人工、低满意度和 KB 空命中统一进失败流水。
- 提供报表，不做技能自动改写。

### Phase 2: Assetize

- 引入 Skill / SkillVersion / SkillBinding。
- 把现有机器人 prompt、FAQ 绑定、澄清规则迁移到技能资产。
- 提供后台版本管理和绑定关系。

### Phase 3: Diagnose

- 上线定时诊断任务。
- 输出结构化诊断报告。
- 引入代表样本和分类趋势视图。

### Phase 4: Optimize

- 自动生成草稿版本。
- 后台审核发布。
- 支持灰度、对照和回滚。

## Metrics

建议以技能版本为中心监控：

- 首次解决率
- 转人工率
- 人工改写率
- 用户追问率
- 低满意度率
- KB 空命中率
- 工具调用失败率

这些指标都应支持按 org、workgroup、robot、skill version 维度过滤。

## Risks

### Risk 1: Failure Record 噪声过大

如果触发条件过宽，失败记录会淹没有效信号。缓解方式：

- 先只接入少数高价值触发器。
- 建立 severity 和 dedupe 规则。

### Risk 2: 优化器过度修改

如果草稿生成不受约束，可能破坏已有正确行为。缓解方式：

- 限制可编辑 section。
- 强制 diff 审核。
- 支持一键回滚。

### Risk 3: 多租户知识泄漏

失败样本和技能 references 都可能包含租户敏感信息。缓解方式：

- 所有技能、样本、报告严格按 orgUid 隔离。
- 诊断输入默认做脱敏。

### Risk 4: 与现有配置重复

如果 Skill 和 RobotSettings / WorkgroupSettings 职责不清，会形成新的配置分叉。缓解方式：

- 明确技能负责“如何回答与如何处理”。
- 现有设置负责“在哪里启用、绑定到谁、运行时开关”。

## Open Questions

- Skill 的第一版结构是否需要完全 JSON 化，还是 Markdown + JSON 混合即可。
- 工具策略是否需要独立成 references/tools.json 风格结构。
- 人工改写数据如何高质量提取，是否需要在坐席端引入显式“采用 AI 建议”动作。
- 技能是否需要支持行业模板市场。
- 诊断报告是否要接入已有质检模块统一展示。

## Next Steps

1. 先实现 Phase 1 的 Failure Record 模型与采集点。
2. 明确 SkillEntity / SkillVersionEntity 的字段定义和绑定关系。
3. 在后台做最小版技能列表页和版本页。
4. 再评估诊断与优化任务的具体执行方式。