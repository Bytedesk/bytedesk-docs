# 自动会话小结 & 自动质检 — 规划文档

> 日期：2026-07-28
> 状态：**待确认**
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)

---

## 1. 概述

会话结束后，系统应根据配置自动执行两类后处理任务：

| 任务 | 说明 | 当前状态 |
| ---- | ---- | -------- |
| **自动建工单** | 会话自动关闭时，根据规则自动创建工单 | ✅ 已在 `TicketSettingsEntity.TicketAutoCreateSettingsEntity` 实现 |
| **自动会话小结** | 会话结束时，自动调用 LLM 生成会话摘要 | ⚠️ `SummarySettingsEntity` 已存在于 `BaseSettingsEntity`，前端也已在 `TabRobotAssistant` 中提供配置，但目前仅在 `IS_DEBUG` 场景暴露，且与意图/情绪混合 |
| **自动质检** | 会话结束时，自动对会话内容进行质量检查 | ⚠️ 企业版已有 `QualityPlanEntity` / `QualityRuleEntity` / `QualityAutoCheckService`，但尚未在 Robot/Agent/Workgroup Settings 中做“按模板绑定质检方案” |

本规划的目标：

1. 保留并正式化 `SummarySettingsEntity`（自动会话小结）的管理入口，从调试态配置改为正式配置项
2. 在 `BaseSettingsEntity` 中新增 **`AutoQualityCheckSettingsEntity`** 子配置，用于绑定现有质检方案，而不是重复定义质检规则
3. 同步在 admin 管理后台的 **RobotSettings、AgentSettings、WorkgroupSettings** 三个页面中添加对应的前端配置 Tab/组件
4. 明确后续执行链路如何消费这些配置，避免形成“可配置但运行时完全不生效”的孤岛字段

---

## 2. 现状分析

### 2.1 现有 SummarySettingsEntity（自动会话小结）

**文件：** `modules/kbase/src/main/java/com/bytedesk/kbase/settings_summary/SummarySettingsEntity.java`

| 字段 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| `name` | String | — | 设置名称 |
| `description` | String | — | 设置描述 |
| `robotUid` | String | — | 关联的 LLM 机器人 uid |
| `defaultTemplate` | Boolean | false | 是否默认模板 |
| `enabled` | Boolean | false | 是否启用 |
| `executionTiming` | String | `THREAD_END` | 执行时机：`ON_MESSAGE` / `THREAD_END` |
| `triggerScope` | String | `VISITOR_ONLY` | 触发范围（ON_MESSAGE 时生效） |
| `triggerEveryNMessages` | Integer | 1 | 每隔 N 条消息触发（ON_MESSAGE 时） |
| `triggerCooldownSeconds` | Integer | 0 | 冷却时间秒（ON_MESSAGE 时） |
| `triggerCooldownOnly` | Boolean | false | 是否仅按时间冷却 |

补充现状：

- 后端 `RobotSettingsRestService`、`AgentSettingsRestService`、`WorkgroupSettingsRestService` 已处理 `summarySettings` 的 create / update / publish 流程；
- 前端三个设置页均已通过 `TabRobotAssistant` 传入 `summarySettings` 与 `onSummarySettingsChange`；
- `QueueMemberEntity` 已存在 `threadSummaryResult`、`summaryLastTriggeredAt`、`summarized` 等会话小结运行结果字段；
- 企业版 `RobotAgentEventListener` 已监听 `ThreadCloseEvent`，并通过 `resolveSettingsForThread(thread)` 解析 Robot / Workgroup / Agent 的 published settings 后消费 `summarySettings`；
- 但该入口目前被 `IS_DEBUG` 限制，并且与 `intentionSettings`、`emotionSettings` 聚合在同一个“智能体”Tab 内，不适合做正式的“会话结束后自动小结”配置入口。

**结论：** `SummarySettingsEntity` 的后端模型、保存链路、会话关闭执行入口均已存在。本次规划的核心不是“新建小结实体”，而是**将现有小结配置从调试入口拆分/提升为正式配置入口，并明确运行时只消费已发布配置**。

### 2.2 自动质检现状与缺口

仓库中已存在完整的企业版质检域模型：

- `enterprise/service/.../quality_plan/QualityPlanEntity.java`
- `enterprise/service/.../quality_rule/QualityRuleEntity.java`
- `enterprise/service/.../quality_check/QualityCheckEntity.java`
- `enterprise/service/.../quality_check/QualityAutoCheckService.java`
- admin 前端已有“质检方案管理”“质检结果”“手动质检”等页面

其中：

- `QualityPlanEntity` 已包含 `type`、`enabled`、`autoCheckEnabled`、`baseScore`、`passScore`、`samplingStrategy`、`samplingValue` 等核心质检控制参数；
- `QualityAutoCheckService` 当前会在会话关闭后，根据 `thread.type` 自动选择当前组织下**第一个** `autoCheckEnabled=true` 的方案执行质检；
- 企业版 `QualityCheckEventListener` 已监听 `ThreadCloseEvent` 并调用 `QualityAutoCheckService.checkClosedThread(thread)`；
- 当前这条自动质检链路**尚未感知 RobotSettings / AgentSettings / WorkgroupSettings 模板级配置**。

**结论：** 本次不应再新造一套“质检维度/评分/规则”字段；更合理的做法是新增一个轻量配置实体，只负责：

- 是否启用模板级自动质检；
- 绑定哪个 `QualityPlanEntity.uid`；
- 预留少量模板级过滤开关。

### 2.3 参考模式：TicketAutoCreateSettingsEntity

**文件：** `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_auto_create/TicketAutoCreateSettingsEntity.java`

已有的自动建单子配置提供了良好的参考模式：

- 独立 `@Entity` + 继承 `BaseEntity`
- 在父实体中通过 `@ManyToOne(cascade={PERSIST,MERGE,REMOVE})` 嵌入
- 发布/草稿双份模式（`xxxSettings` + `draftXxxSettings`）
- `fromRequest` / `applyRequest` 静态工厂方法
- 对应 Request/Response DTO
- 前端独立组件（如 `TicketAutoCreateSettings.tsx`），带 `ensureDefaults` 默认值填充

---

## 3. 数据模型设计

### 3.1 新增实体：`AutoQualityCheckSettingsEntity`

**模块：** `modules/kbase`（与 `SummarySettingsEntity` 同级，建议放在 `modules/kbase/settings_quality_check/`）

命名上建议采用 `AutoQualityCheckSettingsEntity`，避免与企业版已有的结果实体 `QualityCheckEntity` 混淆。

```java
@Entity
@Table(name = "bytedesk_kbase_settings_quality_check")
public class AutoQualityCheckSettingsEntity extends BaseEntity {

    // 设置名称
    private String name;

    // 设置描述
    private String description;

    // 是否启用自动质检
    @Builder.Default
    private Boolean enabled = false;

    // 绑定企业版质检方案 UID
    // 对应 enterprise/service/quality_plan/QualityPlanEntity.uid
    private String qualityPlanUid;

    // 是否为默认设置模板
    @Builder.Default
    private Boolean defaultTemplate = false;

    // 执行时机（默认 THREAD_END - 会话结束时）
    @Builder.Default
    private String executionTiming = ExecutionTimingConsts.THREAD_END;

    // 是否仅对人工客服参与的会话执行质检
    @Builder.Default
    private Boolean agentOnly = false;

    // 是否跳过已质检会话
    @Builder.Default
    private Boolean skipIfQualityChecked = true;
}
```

  设计说明：

- `qualityPlanUid` 负责复用现有企业版质检方案、规则、抽检、评分能力；
- `executionTiming` 现阶段仍固定支持 `THREAD_END`，保留字段是为了与 SummarySettings 风格一致；
- `agentOnly` 与 `skipIfQualityChecked` 仅做模板级补充，不重复承载 `QualityPlanEntity` 里已有的评分/抽检/启停职责；
- 如果后续需要更细的运行过滤条件，优先加“是否纯机器人会话允许质检”“是否仅超时关闭时质检”这类**执行过滤开关**，而不是把质检规则内容回灌到 BaseSettings。

### 3.2 BaseSettingsEntity 变更

**文件：** `modules/kbase/src/main/java/com/bytedesk/kbase/settings/BaseSettingsEntity.java`

新增字段：

```java
// ===== 自动质检设置（已发布） =====
@ManyToOne(fetch = FetchType.LAZY, optional = true,
    cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
private AutoQualityCheckSettingsEntity qualityCheckSettings;

// ===== 自动质检设置（草稿） =====
@ManyToOne(fetch = FetchType.LAZY, optional = true,
    cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
private AutoQualityCheckSettingsEntity draftQualityCheckSettings;
```

> **注意：** `summarySettings` / `draftSummarySettings` 已存在于 `BaseSettingsEntity`，无需新增。

### 3.3 BaseSettingsRequest / BaseSettingsResponse 同步变更

除 `BaseSettingsEntity` 外，还需要同步更新：

- `modules/kbase/.../BaseSettingsRequest.java`
- `modules/kbase/.../BaseSettingsResponse.java`

新增：

```java
private AutoQualityCheckSettingsRequest qualityCheckSettings;
```

以及：

```java
private AutoQualityCheckSettingsResponse qualityCheckSettings;
private AutoQualityCheckSettingsResponse draftQualityCheckSettings;
```

### 3.4 继承关系确认

```text
BaseEntity
  └── BaseSettingsEntity (@MappedSuperclass)
        ├── summarySettings / draftSummarySettings           ✅ 已存在
        ├── qualityCheckSettings / draftQualityCheckSettings  🆕 新增（绑定质检方案）
        ├── serviceSettings / draftServiceSettings
        ├── triggerSettings / draftTriggerSettings
        ├── inviteSettings / draftInviteSettings
        ├── intentionSettings / draftIntentionSettings
        ├── emotionSettings / draftEmotionSettings
        ├── ...其他现有字段...
        │
        ├── RobotSettingsEntity    (extends BaseSettingsEntity)
        ├── AgentSettingsEntity    (extends BaseSettingsEntity)
        └── WorkgroupSettingsEntity(extends BaseSettingsEntity)
```

---

## 4. 后端实现步骤

### 阶段 A：新增 AutoQualityCheckSettings 子模块

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| A1 | `modules/kbase/src/main/java/com/bytedesk/kbase/settings_quality_check/AutoQualityCheckSettingsEntity.java` | 新建实体类 |
| A2 | `modules/kbase/src/main/java/com/bytedesk/kbase/settings_quality_check/AutoQualityCheckSettingsRequest.java` | 新建请求 DTO |
| A3 | `modules/kbase/src/main/java/com/bytedesk/kbase/settings_quality_check/AutoQualityCheckSettingsResponse.java` | 新建响应 DTO |
| A4 | `.../AutoQualityCheckSettingsEntity.fromRequest / applyRequest` | 对齐已有子设置模式 |

### 阶段 B：修改 BaseSettingsEntity

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| B1 | `modules/kbase/src/main/java/com/bytedesk/kbase/settings/BaseSettingsEntity.java` | 新增 `qualityCheckSettings` + `draftQualityCheckSettings` 字段 |
| B2 | `modules/kbase/src/main/java/com/bytedesk/kbase/settings/BaseSettingsRequest.java` | 新增 `qualityCheckSettings` 请求字段 |
| B3 | `modules/kbase/src/main/java/com/bytedesk/kbase/settings/BaseSettingsResponse.java` | 新增 published/draft 响应字段 |

### 阶段 C：更新 RobotSettings / AgentSettings / WorkgroupSettings 的 Service 层

| 步骤 | 文件 | 说明 |
| ---- | ---- | ---- |
| C1 | `modules/ai/.../RobotSettingsRestService.java` | 在 create/update/publish/default-init 流程中处理 qualityCheckSettings |
| C2 | `modules/service/.../AgentSettingsRestService.java` | 同上 |
| C3 | `modules/service/.../WorkgroupSettingsRestService.java` | 同上 |
| C4 | 各 Settings Response 转换逻辑 | 确保 published/draft 都能回传前端 |

### 阶段 D：执行链路消费设计

当前 `QualityAutoCheckService` 是按组织 + 线程类型去找“第一个启用自动质检的方案”，并不知道具体线程来自哪个 RobotSettings / AgentSettings / WorkgroupSettings 模板。

因此后续实现时应增强现有执行链路，而不是新增第二套监听器：

1. `QualityCheckEventListener` 继续监听 `ThreadCloseEvent` 并调用 `QualityAutoCheckService.checkClosedThread(thread)`；
2. 在 `QualityAutoCheckService` 内新增/注入一个线程设置解析器，逻辑参考 `RobotAgentEventListener.resolveSettingsForThread(thread)`；
3. 会话结束时，先拿到对应线程关联的 published settings 模板；
4. 若模板的 `qualityCheckSettings.enabled=true` 且配置了 `qualityPlanUid`，优先使用该方案；
5. 若模板未配置，再回退到当前全局组织级 `findFirstByOrgUidAndTypeAndAutoCheckEnabledTrue...` 逻辑；
6. 若质检方案与线程类型不匹配（如机器人线程绑定了在线客服方案），则拒绝保存或在运行时跳过并记录日志。

建议的 settings 解析优先级：

| thread.type | 优先解析对象 | Settings 类型 | 质检方案类型 |
| ----------- | ------------ | ------------- | ------------ |
| `ROBOT` | `thread.robot.uid` | `RobotSettingsEntity` | `BOT` |
| `WORKGROUP` | `thread.workgroup.uid` | `WorkgroupSettingsEntity` | `ONLINE_SERVICE` |
| `AGENT` | `thread.agent.uid` | `AgentSettingsEntity` | `ONLINE_SERVICE` |
| `UNIFIED` | 依次尝试 robot / workgroup / agent | 对应 Settings | 按实际解析结果决定 |

> 注意：运行时应消费 published settings；`draft*Settings` 仅供后台编辑和调试预览，未发布配置不应影响线上会话。
> 本次用户要求仍以规划为主，但文档必须把这条消费链路说明清楚，否则后续只落配置层会变成无效字段。

### 阶段 E：自动会话小结运行链路核对与补齐

自动会话小结已有配置实体、结果落点和企业版事件监听器。后续实现重点是复核现有链路并补齐正式入口后的验证项：

1. 确认 `RobotAgentEventListener.resolveSettingsForThread(thread)` 对 Robot / Workgroup / Agent / Unified 类型的解析覆盖是否足够；
2. 确认后台新增正式 Tab 后，仍只修改 `draftSummarySettings`，发布后才进入 `summarySettings`；
3. 会话结束时，`RobotAgentEventListener` 继续消费 published `summarySettings`；
4. 若 `summarySettings.robotUid` 为空，则继续使用现有默认小结机器人兜底逻辑；
5. 结果继续写回 `QueueMemberEntity.threadSummaryResult` 与 `summarized` 等现有字段，不新增第二套小结结果表。

---

## 5. 前端实现步骤

### 5.1 自动会话小结 UI 方案

现状是 `frontend/apps/admin/src/components/Advanced/TabRobotAssistant.tsx` 已包含三个子页：

- intention
- emotion
- summary

因此自动会话小结有两种可选实现：

1. **方案 A：复用 `TabRobotAssistant`，仅正式暴露其中的 `summary` 子页**
2. **方案 B：拆出独立 `TabAutoSummary.tsx`，只保留 summary 相关字段**

本规划建议采用 **方案 B**，原因：

- “自动会话小结”是明确的会话结束后处理动作，语义上独立；
- 避免继续把小结配置埋在调试态的“智能体”综合页中；
- 更方便后续给 Agent / Workgroup / Robot 三类模板展示不同说明文案。

**建议文件：** `frontend/apps/admin/src/components/Advanced/TabAutoSummary.tsx`

```text
Props 接口：
{
  summarySettings: {
    live?: SETTINGS.SummarySettingsResponse | null;
    draft?: SETTINGS.SummarySettingsResponse | null;
  };
  onSummarySettingsChange: (patch: Partial<SETTINGS.SummarySettingsRequest>) => void;
}
```

**UI 布局**：

- 启用开关
- 执行时机（默认/只支持 `THREAD_END`，先不开放 `ON_MESSAGE` 给正式入口）
- 绑定摘要智能体（Robot 下拉选择器）
- 可选展示只读说明：当前后处理摘要会在会话结束后触发

> 说明：虽然 `SummarySettingsEntity` 支持 `ON_MESSAGE`，但本需求明确是“会话结束之后”。正式入口首版建议只开放 `THREAD_END`，避免把实时摘要能力也一并放进来，扩大范围。

### 5.2 新增 Tab 组件：`TabQualityCheck`（自动质检）

**文件：** `frontend/apps/admin/src/components/Advanced/TabQualityCheck.tsx`

```text
Props 接口：
{
  qualityCheckSettings: {
    live?: SETTINGS.AutoQualityCheckSettingsResponse | null;
    draft?: SETTINGS.AutoQualityCheckSettingsResponse | null;
  };
  onQualityCheckSettingsChange: (patch: Partial<SETTINGS.AutoQualityCheckSettingsRequest>) => void;
}
```

**UI 布局**：

- 启用开关
- 选择质检方案（`QualityPlanEntity` 下拉选择器）
- 仅显示与当前模板匹配的方案类型：
  - RobotSettings → `BOT`
  - AgentSettings / WorkgroupSettings → `ONLINE_SERVICE`
- 是否仅质检人工客服参与会话（Switch）
- 已质检则跳过（Switch）

> 不再在此页配置评分维度、及格分、规则等，这些继续由质检方案管理页维护。

### 5.3 修改 RobotSettings 页面

**文件：** `frontend/apps/admin/src/pages/Dashboard/Ai/Robot/settings/index.tsx`

| 变更 | 说明 |
| ---- | ---- |
| 小结入口调整 | 保留现有 `IS_DEBUG` 下的 `TabRobotAssistant`，新增正式 `TabAutoSummary`。复用 `patchRobotSummarySettings`（第118行） |
| 新增 `patchRobotQualityCheckSettings` | 新增 patch 回调，并在 `tabItems` useMemo deps 中加入 |
| 新增 sanitize 函数 | `sanitizeQualityCheckSettings`（新增）；`sanitizeSummarySettings` 已存在于第454行 |
| 在 `tabItems` 中新增 Tab | 添加"自动会话小结"（`TabAutoSummary`），与 robotAssistant 并存 |
| 在 `tabItems` 中新增 Tab | 添加"自动质检"（`TabQualityCheck`），用 `isEnterpriseOrPlatformEdition()` 包裹 |
| 在 `handleSave` 请求中新增 | `qualityCheckSettings`；`summarySettings` 已在第541行 |

### 5.4 修改 AgentSettings 页面

**文件：** `frontend/apps/admin/src/pages/Dashboard/Service/Agent/settings/index.tsx`

| 变更 | 说明 |
| ---- | ---- |
| 小结入口调整 | 保留现有 `IS_DEBUG` 下的 `TabRobotAssistant`，新增正式 `TabAutoSummary`。复用 `patchAgentSummarySettings`（第180行） |
| 新增 `patchAgentQualityCheckSettings` | 新增 patch 回调，并在 `tabItems` useMemo deps 中加入 |
| 新增 sanitize 函数 | `sanitizeQualityCheckSettings`（新增）；`sanitizeSummarySettings` 已存在于第523行 |
| 在 `tabItems` 中新增 Tab | 添加"自动会话小结"（`TabAutoSummary`），与 robotAssistant 并存 |
| 在 `tabItems` 中新增 Tab | 添加"自动质检"（`TabQualityCheck`），用 `isEnterpriseOrPlatformEdition()` 包裹 |
| 在 `handleSave` 请求中新增 | `qualityCheckSettings`；`summarySettings` 已在第624行 |

### 5.5 修改 WorkgroupSettings 页面

**文件：** `frontend/apps/admin/src/pages/Dashboard/Service/Workgroup/settings/index.tsx`

| 变更 | 说明 |
| ---- | ---- |
| 小结入口调整 | 保留现有 `IS_DEBUG && showRobotSettingsTabs` 下的 `TabRobotAssistant`，新增正式 `TabAutoSummary`。复用 `patchWorkgroupSummarySettings`（第185行） |
| 新增 `patchWorkgroupQualityCheckSettings` | 新增 patch 回调，并在 `tabItems` useMemo deps 中加入 |
| 新增 sanitize 函数 | `sanitizeQualityCheckSettings`（新增）；`sanitizeSummarySettings` 已存在于第658行 |
| 在 `tabItems` 中新增 Tab | 添加"自动会话小结"（`TabAutoSummary`），与 robotAssistant 并存 |
| 在 `tabItems` 中新增 Tab | 添加"自动质检"（`TabQualityCheck`），用 `isEnterpriseOrPlatformEdition()` 包裹 |
| 在 `handleSave` 请求中新增 | `qualityCheckSettings`；`summarySettings` 已在第814行（merge 模式） |

### 5.6 TypeScript 类型定义

**文件：** 各 `types/services/settings.d.ts` 或类似类型文件

```typescript
// 现有
namespace SETTINGS {
  interface SummarySettingsRequest { ... }
  interface SummarySettingsResponse { ... }
}

// 新增
namespace SETTINGS {
  interface AutoQualityCheckSettingsRequest {
    name?: string;
    description?: string;
    enabled?: boolean;
    qualityPlanUid?: string | null;
    defaultTemplate?: boolean;
    executionTiming?: string;
    agentOnly?: boolean;
    skipIfQualityChecked?: boolean;
  }
  interface AutoQualityCheckSettingsResponse extends AutoQualityCheckSettingsRequest {}
}
```

---

## 6. Tab 位置建议

### RobotSettings 页面 Tab 顺序

```text
欢迎语 | 提示信息 | 展示设置 | 服务设置 | 智能体 | 输入联想 | Rate
| 询前问卷 | Toolbar | Right | Trigger | Tools | Popup
| 🆕 自动会话小结 | 🆕 自动质检
```

> 建议放在 `Tools` 或 `Popup` 之后。`自动会话小结` 可在正式版本直接展示；`自动质检` 建议使用 `isEnterpriseOrPlatformEdition()` 包裹，因为质检方案域位于 enterprise 模块。

### AgentSettings 页面 Tab 顺序

```text
欢迎语 | 提示信息 | 服务设置 | 输入联想 | Rate | 询前问卷
| 留言设置 | 排队设置 | 工作时段 | 坐席状态 | WebRTC
| 智能体 | Toolbar | QuickReply | Right | Trigger | Popup
| 🆕 自动会话小结 | 🆕 自动质检
```

> 建议放在 `robotAssistant` 之后、`toolbar` 之前，或放在最后。`自动质检` 继续受企业版能力控制。

### WorkgroupSettings 页面 Tab 顺序

```text
提示信息 | 服务设置 | 输入联想 | Rate | 机器人
| 智能体 | 转人工 | 询前问卷 | 留言设置 | 排队设置
| 工作时段 | Toolbar | WebRTC | Right | Trigger | Route | Popup
| 🆕 自动会话小结 | 🆕 自动质检
```

> 建议放在最后。`自动质检` 继续受企业版能力控制。

---

## 7. 风险与注意事项

1. **Summary 不是全新能力**：它已经存在于 `TabRobotAssistant` 与三个 RestService 中，规划和实现时不要重复造轮子，也不要误删调试场景下 intention/emotion 的已有能力。

2. **Draft/Publish 一致性**：新增的 `qualityCheckSettings` 必须遵循现有的 draft/publish 模式，前端 patch 操作修改 draft，保存/发布时才推进到 published。

3. **企业版依赖**：`QualityPlanEntity`、`QualityRuleEntity`、`QualityAutoCheckService` 位于 `enterprise/service`。因此 `自动质检` 配置虽然可以放在 `BaseSettingsEntity`，但运行能力和前端选项源依赖企业版模块存在。

4. **不要平行复制质检规则**：如果把 `checkDimensions`、`passScore`、`samplingStrategy` 等再放一份到 `BaseSettingsEntity`，会与 `QualityPlanEntity` 产生双写和优先级冲突，后期极难维护。

5. **质检执行链路需增强而非重建**：当前 `QualityCheckEventListener` 已监听会话关闭事件，真正落地时应增强 `QualityAutoCheckService` 的模板级方案解析，而不是新增第二套事件监听器。

6. **自动会话小结执行链路已存在但需验证**：当前已确认 `RobotAgentEventListener` 消费 published `summarySettings`，实施时重点验证正式 Tab 保存/发布后是否能被该监听器正确消费。

7. **正式入口只开放 `THREAD_END`**：`SummarySettingsEntity` 虽支持 `ON_MESSAGE`，但本需求聚焦“会话结束后”，建议首版正式配置仅支持 `THREAD_END`，否则需求面会被无意放大。

8. **前端类型与国际化**：需要同步补充 `SETTINGS.AutoQualityCheckSettings*` 类型以及 `zh-CN`、`en-US`、`ja-JP` 等 locale 文案。

9. **模块位置**：`AutoQualityCheckSettingsEntity` 仍建议放在 `modules/kbase`，因为它属于 `BaseSettingsEntity` 的共用子设置；但其字段只保存“绑定关系”，不承载 enterprise 质检结果模型。

10. **TabRobotAssistant 保留不删**：三个 Settings 页现有的 `IS_DEBUG ? [TabRobotAssistant]` 应原样保留；新 Tab（`TabAutoSummary` / `TabQualityCheck`）是新增入口，不与现有调试入口冲突。

11. **RobotSettings tabItems deps 既有遗漏**：当前 `tabItems` 的 useMemo deps 中缺少 `patchRobotSummarySettings`，新增 `patchRobotQualityCheckSettings` 时一并补上，避免因 deps 不完整导致 stale closure 问题。

---

## 8. 预估工时

| 模块 | 内容 | 估时 |
| ---- | ---- | ---- |
| 后端 - 实体层 | AutoQualityCheckSettingsEntity + Request + Response | 0.5h |
| 后端 - BaseSettings 基类 | Entity/Request/Response 新增字段 | 0.5h |
| 后端 - Service 层 | Robot/Agent/Workgroup Settings Service 各 + DTO | 1.5h |
| 前端 - 共享组件 | TabAutoSummary + TabQualityCheck | 1.5h |
| 前端 - 页面集成 | RobotSettings + AgentSettings + WorkgroupSettings | 1.5h |
| 前端 - 类型定义 | TypeScript 类型补充 | 0.25h |
| 国际化 | zh-CN / en-US / ja-JP 翻译 | 0.5h |
| 执行链路适配（后续） | Summary / Quality 的线程 settings 解析与优先级统一 | 1.5h - 3.0h |
| **合计** | | **≈ 6h（仅配置层） / 7.5h-9h（含最小执行链路）** |

---

## 9. 验证与验收清单

后续实现完成后，至少需要覆盖以下验证：

### 9.1 后端编译验证

```bash
env JAVA_HOME=/Users/ningjinpeng/.jdk/jdk-21.0.8/jdk-21.0.8+9/Contents/Home \
  ./starter/mvnw -f pom.xml -pl modules/kbase,modules/ai,modules/service,enterprise/ai,enterprise/service -am -DskipTests compile
```

如果只改配置层，至少编译：

- `modules/kbase`
- `modules/ai`
- `modules/service`

如果补齐自动质检执行链路，还必须编译：

- `enterprise/service`
- `enterprise/ai`

### 9.2 保存/发布链路验证

- RobotSettings / AgentSettings / WorkgroupSettings 中修改“自动会话小结”后，只应写入 `draftSummarySettings`；发布后才同步到 `summarySettings`。
- RobotSettings / AgentSettings / WorkgroupSettings 中修改“自动质检”后，只应写入 `draftQualityCheckSettings`；发布后才同步到 `qualityCheckSettings`。
- 保存成功后 reload，右侧 Tab 继续展示最新 draft 数据，不回退到旧 store 数据。

### 9.3 自动会话小结运行验证

- 发布 `summarySettings.enabled=true`、`executionTiming=THREAD_END` 后关闭会话。
- `RobotAgentEventListener.onThreadCloseEvent` 应消费 published settings。
- `QueueMemberEntity.summarized=true`，`threadSummaryResult` 有结构化 JSON。
- 未发布 draft 修改不应影响线上会话小结。

### 9.4 自动质检运行验证

- 发布 `qualityCheckSettings.enabled=true` 且绑定 `qualityPlanUid` 后关闭会话。
- `QualityAutoCheckService` 应优先使用模板绑定的 `qualityPlanUid`。
- 未绑定模板级质检方案时，保留现有组织级自动质检方案兜底逻辑。
- 已质检会话在 `skipIfQualityChecked=true` 时不重复生成质检结果。

### 9.5 前端验证

- `frontend/apps/admin` 类型检查或构建不应出现 `SETTINGS.AutoQualityCheckSettings*` 类型缺失。
- 三个 Settings 页面 Tab 切换、保存、发布、重置均正常。
- `自动质检` Tab 在非企业/平台版下不显示或禁用，取决于最终确认的产品策略。

---

## 10. 确认清单

请在确认后回复，我将按以下顺序实施：

- [ ] **确认 1**：自动质检配置是否采用“轻量绑定方案”的 `AutoQualityCheckSettingsEntity`，而不是重复存一套评分维度/规则字段？
- [ ] **确认 2**：自动会话小结正式入口是否只开放 `THREAD_END`，暂不开放 `ON_MESSAGE`？
- [ ] **确认 3**：小结配置是否要从 `TabRobotAssistant` 中拆成单独正式 Tab？
- [ ] **确认 4**：自动质检绑定的是现有企业版 `QualityPlanEntity`，这是否符合你的预期？
- [ ] **确认 5**：`自动质检` Tab 是否仅在 `isEnterpriseOrPlatformEdition()` 下显示？
- [ ] **确认 6**：本轮后续实现是否只做**配置层**，还是顺手补齐最小执行链路（模板级方案优先，组织级方案兜底）？
