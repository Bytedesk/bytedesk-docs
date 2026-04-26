---
sidebar_label: Skills
sidebar_position: 12
---

# Skills技能

微语已经具备面向 AI 工作流的 Skills 基础能力。Skills 可以理解为一类可复用的能力包，用来封装任务说明、流程知识和辅助资源，让 AI 或 agent 在处理某类任务时更加稳定、可复用、可维护。

这类 Skills 既适合开发人员和运维人员理解系统能力边界，也适合产品、实施、售前等非技术人员从功能层面理解“微语为什么可以把一类 AI 工作流做成可重复使用的能力”。

## 一、微语中的 Skills 是什么

在当前项目中，Skills 已经以资源包形式存在于运行时资源目录中，并通过多个 `SKILL.md` 文件组织文档处理、规划、设计、编码、测试、文档生成等不同类型的 AI 工作流能力。

本页所说的 Skills，重点指 AI 与 agent 工作流中的技能包，不是客服组织分配中“技能标签”那一类业务字段。

可以把它理解为：

- Prompt 的工程化封装
- AI 工作流的标准化说明书
- 某一类任务的可复用知识模块

简单说，模型本身决定“会不会推理”，而 Skills 决定“遇到某类任务时，应该按什么方法做”。

## 二、当前已有基础

目前仓库中已经包含：

- 多个内置 Skills 资源目录
- 多类 `SKILL.md` 示例包
- Skills 元数据解析与入库同步能力
- 支持配置外部 Skills 目录并同步加载
- 管理后台中查看平台级 Skills 列表的能力

这说明 Skills 已经是微语 AI 产品能力的一部分，而不是单纯停留在概念层。

当前内置 Skills 目录中，已经可以看到这类示例资源：

- `brainstorming`
- `doc-coauthoring`
- `frontend-design`
- `mcp-builder`
- `pptx`
- `docx`
- `webapp-testing`
- `test-driven-development`

这些目录本身就体现了微语当前对 AI 工作流的支持方向，不局限于问答，也包括规划、实现、验证、文档和多模态内容处理。

## 三、当前系统中是如何工作的

从当前实现来看，微语已经完成了 Skills 的基础闭环：

### 1. 内置 Skills 自动发现

系统会扫描运行时资源目录中的 Skills，当前默认模式为：

```text
starter/src/main/resources/skills/*/SKILL.md
```

也就是说，每个 Skills 资源包以一个独立目录存在，目录内至少包含一个 `SKILL.md` 文件。

### 2. 外部 Skills 可配置接入

除了内置 Skills，系统还支持通过配置项加载外部目录中的 Skills：

```properties
bytedesk.ai.skill.external-directory=/data/bytedesk/skills
```

外部目录约定结构为：

```text
<external-root>/<skill-directory>/SKILL.md
```

这对运维非常重要，因为它意味着：

- 可以把自定义 skill 放在代码仓库之外管理
- 可以按环境差异加载不同 skill 集合
- 可以在不改动内置资源目录的情况下扩展平台能力

### 3. 解析方式

当前实现会读取 `SKILL.md` 顶部 frontmatter 中的关键字段，重点包括：

- `name`
- `description`

例如：

```md
---
name: brainstorming
description: 用于在实现前澄清目标与方案
---
```

如果 `name` 未填写，系统会回退使用目录名作为 Skills 名称。

### 4. 同步到平台数据表

解析完成后，系统会将 Skills 同步到 `SkillEntity`，并写入平台级数据：

- `name`：来自 `SKILL.md`
- `description`：来自 `SKILL.md`
- `source`：区分 `INTERNAL` 或 `EXTERNAL`
- `level`：当前按 `PLATFORM` 平台级管理
- `platform`：当前归属微语平台

这说明微语中的 Skills 已经不只是“文件夹里的 Markdown”，而是已经被纳入系统平台能力资产。

### 5. 管理后台可查看

当前管理后台已经可以在超级管理相关页面中按平台级列表查看 Skills，展示字段包括：

- UID
- 名称
- 描述
- 类型
- 来源
- 层级
- 平台
- 创建时间
- 更新时间

其中 `source` 会区分内置 Skills 和外部 Skills，这对运维排查配置来源、对开发确认能力来源都很有帮助。

## 四、Skills 能解决什么问题

Skills 特别适合解决以下问题：

- 规范 AI 助手处理某类任务的方法
- 将领域知识打包为可重复使用的能力
- 减少不同场景下重复写 prompt 的成本
- 让 agent 的行为更加模块化和易于维护

结合微语当前实现，Skills 更适合承载以下能力：

- 任务处理规范：比如先收集上下文，再规划，再执行，再验证
- 场景化知识：比如文档共创、测试驱动开发、前端设计、文档生成
- 多步骤工作流：比如读取资料、提炼结构、生成输出、校验结果
- 平台经验沉淀：把团队反复验证有效的方法沉淀为可复用能力包

对于非技术人员，可以把 Skills 理解为“AI 的岗位 SOP 包”。

对于开发人员，可以把 Skills 理解为“围绕某类任务沉淀的结构化 prompt + 说明文档 + 辅助资源”。

对于运维人员，可以把 Skills 理解为“平台可以加载和管理的一类 AI 能力资源目录”。

## 五、面向不同角色怎么理解

### 对开发人员

开发最关心的是如何新增和维护 Skills。

当前推荐理解方式是：

- 一个 Skills 资源包对应一个独立目录
- 入口文件是 `SKILL.md`
- `SKILL.md` 中至少要维护清晰的 `name` 和 `description`
- Skills 目录名需要稳定，因为系统会基于目录名生成稳定 UID
- Skills 更适合描述“处理方法”，而不是堆一大段零散 prompt

如果你准备新增一类 agent 能力，优先考虑是否应该先抽象为一个 Skills 资源包，而不是把逻辑直接写死在某个提示词里。

### 对运维人员

运维最关心的是如何部署、扩展和排障。

当前可以重点关注：

- 内置 Skills 来自运行时资源目录
- 外部 Skills 可通过配置目录挂载
- Skills 同步后可在后台区分 `INTERNAL` / `EXTERNAL`
- 外部目录结构不符合约定时，系统不会正确识别
- `SKILL.md` 中缺少有效 `name` / `description` 时，不会被正常同步为完整 Skills 数据

这意味着在部署时，可以把 Skills 作为一类可配置资源来管理，而不一定每次都通过改代码发布。

### 对产品、实施、售前等非技术人员

你不一定需要关心代码细节，但可以把 Skills 理解为：

- 微语把某类 AI 能力做成“标准模块”的方式
- 不同 Skills 对应不同任务处理方法
- 未来可逐步扩展为平台可配置、可管理、可开放的 AI 能力资产

因此，当你向客户介绍时，可以用更容易理解的话来表达：

“模型负责生成，Skills 负责让生成过程有方法、有规范、有经验沉淀。”

## 六、开发与运维接入示例

### 内置 Skills 目录示例

```text
starter/src/main/resources/skills/
  brainstorming/
    SKILL.md
  doc-coauthoring/
    SKILL.md
  webapp-testing/
    SKILL.md
```

### 外部 Skills 目录示例

```text
/data/bytedesk/skills/
  order-helper/
    SKILL.md
  ops-diagnosis/
    SKILL.md
```

### 最小 SKILL.md 示例

```md
---
name: ops-diagnosis
description: 用于引导 AI 按步骤排查部署、配置和运行时问题
---

# Ops Diagnosis

这里可以继续补充该 Skills 资源包的使用说明、约束、流程和注意事项。
```

## 七、当前能力边界

为了避免误解，也需要明确当前版本的边界：

- 当前已完成的是 Skills 的发现、解析、同步和后台查看基础能力
- 当前解析重点仍以 `name` 和 `description` 为主
- 当前后台更偏向“查看平台 Skills 列表”，还不是完整的在线编辑器
- 管理后台直接管理 Skills 文件内容、读写回文件、对外开放调用等能力，仍在后续规划中

因此，当前阶段更适合把 Skills 看作“已接入平台的能力资产元数据管理 + 运行时资源组织机制”，而不是已经完全产品化的在线 Skills 市场。

## 八、与其它能力页的关系

- [工具](./tools) 偏向实际可调用的执行能力。
- [MCP](./mcp) 偏向和外部 agent 生态对接的标准协议层。
- [文本模型指南](./model_text) 则是驱动技能执行的模型推理层。

如果用一句话区分：

- 模型决定“能不能推理”
- 工具决定“能不能执行”
- MCP 决定“能不能标准化连接外部生态”
- Skills 决定“遇到某类任务时应该怎么做”

## 九、总结

Skills 提供的是微语 AI 工作流中的可复用知识层。它帮助微语把一次性的 prompt 组织方式，逐步演进为结构化、可维护、可扩展的 AI 能力体系。

从当前实现来看，微语已经具备了以下基础：

- 有内置 Skills 资源目录
- 有外部 Skills 目录扩展能力
- 有 `SKILL.md` 元数据解析能力
- 有同步到平台实体的能力
- 有后台查看 Skills 列表的能力

对开发来说，它是 AI 能力模块化的基础。

对运维来说，它是可配置、可扩展的运行时资源。

对非技术人员来说，它代表微语已经在把 AI 能力从“单次提示词”升级为“可沉淀、可复用、可管理的平台能力”。
