# 工单可见性控制 — 规划文档

> 日期：2026-07-27
> 最后修订：2026-07-30
> 状态：**规划中（待确认）**
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)

## 修订记录

| 日期 | 修订内容 |
| ---- | -------- |
| 2026-07-27 | 初始版本：`DEPARTMENT_ONLY` 模式基于工单 `departmentUid` 匹配 |
| 2026-07-30 | **重大修订**：`DEPARTMENT_ONLY` → `SPECIFIED_DEPARTMENTS`，改为白名单制，不依赖工单 `departmentUid`，支持管理员选择部门列表 |
| 2026-07-30 | 复核现有代码：确认后端与前端已有 `DEPARTMENT_ONLY` 旧实现，后续工作应按“迁移旧实现”执行，而不是从零新增 |
| 2026-07-30 | **作用范围扩展**：可见性控制从仅内部工单扩展为同时覆盖内部工单（`type=INTERNAL`）和外部工单（`type=EXTERNAL`）；外部访客始终可查看自己创建的工单（创建人豁免），内部成员也可查看自己创建的工单；除此之外一律按 `TicketVisibilitySettingsEntity` 中的可见性配置过滤 |

---

## 1. 概述

在 `TicketSettingsEntity` 的可见性子设置基础上，迁移现有部门可见性语义，用于控制工单的可见性范围：

- **公司内部可见**（默认）：组织内所有成员都能查看和操作所有工单；
- **指定部门可见**：管理员选择若干个部门（`DepartmentEntity`），只有属于这些部门的成员（即 `UserEntity` → `MemberEntity.deptUid` 在所选部门列表中）才能查看和操作工单；**不依赖工单本身的 `departmentUid`**；
- **根据工单分类分配公司或部门可见**：精细到每个工单分类，指定该分类下的工单对公司内所有人可见还是仅指定部门可见。

核心目标：当设置为"指定部门可见"时，管理员显式指定哪些部门可以访问工单，实现精确的部门间数据隔离。用户的访问权限由其 `MemberEntity.deptUid` 是否属于被授权的部门列表决定，而非由工单本身的 `departmentUid` 决定。

> **作用范围**：可见性控制**同时覆盖内部工单（`type=INTERNAL`）和外部工单（`type=EXTERNAL`）**。但两类工单**并不是共用同一条 `TicketSettingsEntity` / `TicketVisibilitySettingsEntity` 配置**，而是继续沿用现有“按 `type` 分开维护工单设置”的模型：
>
> - **内部工单设置**：`TicketSettingsEntity.type=INTERNAL` 对应的 `visibilitySettings`
> - **外部工单设置**：`TicketSettingsEntity.type=EXTERNAL` 对应的 `visibilitySettings`
>
> 两类工单的可见性规则结构一致，但配置实例彼此独立；同时保留各自的创建人豁免语义：
>
> - **外部工单**：创建该工单的访客（`userUid` 对应的 `UserEntity`，通常 `type=VISITOR`）始终可查看自己创建的工单；
> - **内部工单**：创建该工单的内部成员（`userUid` 对应的 `UserEntity`，当前创建/更新校验期望 `type=MEMBER`）始终可查看自己创建的工单。
>
> 除此之外，无论内部工单还是外部工单，**一律按可见性配置过滤**。也就是说，即使某工单是外部工单，如果管理员配置了 `SPECIFIED_DEPARTMENTS` 且当前查询的成员不在白名单中，该成员仍然看不到不属于自己创建的工单。

---

## 2. 核心需求拆解

### 2.1 可见性模式

| 模式 | 含义 | 适用场景 |
| ---- | ---- | -------- |
| `ORG_WIDE` | 组织内全员可见，无部门隔离 | 小型团队、不需要部门隔离的组织 |
| `SPECIFIED_DEPARTMENTS` | 仅指定部门成员可见，管理员选择授权部门列表 | 多部门共用一套系统，需要精确控制哪些部门可以访问 |
| `CATEGORY_BASED` | 按工单分类各自指定可见范围 | 不同业务线有不同隔离需求 |

### 2.2 字段设计

#### TicketVisibilitySettingsEntity（子设置）

| 字段 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| `content` | TicketVisibilitySettingsData | 空规则 | JSON 转换字段，保存 mode、departmentUids 与 categoryRules |

#### TicketVisibilitySettingsData

| 字段 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| `mode` | String | `ORG_WIDE` | 可见性模式枚举 |
| `departmentUids` | `List<String>` | `[]` | 当 mode=SPECIFIED_DEPARTMENTS 时，被授权可见的部门 uid 列表 |
| `categoryRules` | `List<TicketVisibilityCategoryRuleData>` | `[]` | 当 mode=CATEGORY_BASED 时的分类规则列表 |

> **关键设计决策**：`SPECIFIED_DEPARTMENTS` 模式下的可见性判断**不依赖工单本身的 `departmentUid`**，而是基于管理员配置的 `departmentUids` 白名单。只有 `MemberEntity.deptUid` 在此白名单中的用户才能看到工单。这与旧设计（根据工单所属部门自动匹配）有本质区别——新设计中工单可能没有 `departmentUid`，但有权限的用户依然能看到。

#### 分类规则（TicketVisibilityCategoryRuleData）

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `categoryUid` | String | 工单分类 uid |
| `visibility` | String | 该分类的可见性：`ORG_WIDE` 或 `SPECIFIED_DEPARTMENTS` |
| `departmentUids` | `List<String>` | 当该分类 visibility=`SPECIFIED_DEPARTMENTS` 时，该分类单独授权的部门 uid 列表 |

> **分类规则设计决策**：
>
> - `mode=SPECIFIED_DEPARTMENTS` 时，使用顶层 `departmentUids` 作为整套工单设置的全局白名单；
> - `mode=CATEGORY_BASED` 时，是否可见由每条 `categoryRules[].departmentUids` 单独决定，而不是复用顶层 `departmentUids`；
> - 这样可以做到“故障报修”只给运维部可见，“人事申请”只给人事部可见，避免不同分类共用同一份部门白名单导致表达能力不足。

#### 归一化与安全校验规则

为避免草稿与发布态之间残留无效字段，`normalize()` 与保存/发布校验建议遵循以下规则：

1. `mode=ORG_WIDE`：清空顶层 `departmentUids`，同时清空 `categoryRules`；
2. `mode=SPECIFIED_DEPARTMENTS`：要求顶层 `departmentUids` 非空，并清空 `categoryRules`；
3. `mode=CATEGORY_BASED`：清空顶层 `departmentUids`，仅保留 `categoryRules`；
4. `categoryRules[i].visibility=ORG_WIDE`：强制清空该条规则的 `departmentUids`；
5. `categoryRules[i].visibility=SPECIFIED_DEPARTMENTS`：要求该条规则自己的 `departmentUids` 非空；
6. 若发布时命中“需要部门白名单但部门列表为空”，则后端拒绝发布，避免出现“配置看起来已开启，实际普通成员全部不可见”的误操作。

### 2.3 权限行为矩阵

| 可见性模式 | 用户部门 / 工单部门 | 是否可见 |
| ---------- | ------------------ | -------- |
| ORG_WIDE | 任意 | ✅ 可查看 |
| SPECIFIED_DEPARTMENTS | A 部门（在白名单中）/ 任意工单 | ✅ 可查看 |
| SPECIFIED_DEPARTMENTS | B 部门（不在白名单中）/ 任意工单 | ❌ 不可查看 |
| SPECIFIED_DEPARTMENTS | 任意部门 / 工单未分配部门 | ❌ 不可查看（除非用户部门在白名单中） |
| CATEGORY_BASED | A 部门（在白名单中）/ 任意工单 | 按该工单分类规则 |
| CATEGORY_BASED | B 部门（不在白名单中）/ 任意工单 | 按该工单分类规则 |
| CATEGORY_BASED | 任意部门 / 工单未分配部门 | ✅ 可查看（兜底） |

> **核心逻辑**：`SPECIFIED_DEPARTMENTS` 模式下，可见性由 `departmentUids` 白名单控制。用户的 `MemberEntity.deptUid` 必须在白名单中才能查看工单。**不依赖工单本身的 `departmentUid`**。
> 兜底规则：工单 `departmentUid` 为空时，在 `ORG_WIDE` 和 `CATEGORY_BASED`（未配置分类）模式下视为全员可见；在 `SPECIFIED_DEPARTMENTS` 模式下仍需白名单校验。已分配了 `assignee`（受理人）的工单，受理人始终可见自己负责的工单，不受可见性限制。

### 2.4 特殊豁免

- **受理人豁免**：工单的当前受理人（`assignee.uid`）始终可以查看和操作自己负责的工单
- **创建人豁免**：工单的创建人/上报人始终可以查看自己创建的工单
  - 对于**内部工单**（`type=INTERNAL`）：创建人通常是组织内成员（当前创建/更新校验期望 `UserEntity.type=MEMBER`），可直接通过 `userUid` 判断
  - 对于**外部工单**（`type=EXTERNAL`）：创建人通常是访客（`UserEntity.type=VISITOR`），也可通过 `userUid` 判断——访客在 `visitor` 前端或通过 API 查询工单列表时，只能看到自己创建的工单；而组织成员从 `desktop` / `admin` 查询外部工单时，仍需继续受 `type=EXTERNAL` 对应可见性配置限制
  - 实现层面统一使用 `ticket.userUid == currentUserUid` 判断，不需要区分内部/外部
- **平台/超级管理员豁免**：`superUser=true` 的超级管理员不受部门隔离限制
- **组织管理员豁免**：具备本组织管理员角色/权限的用户不受本组织内部门隔离限制
- **白名单为空时的行为**：`SPECIFIED_DEPARTMENTS` 模式下，如果 `departmentUids` 为空列表，则只有特殊豁免用户（管理员/受理人/创建人）可以查看工单，普通成员一律不可见

> **外部工单与可见性设置的关系**：外部工单同样遵守 `TicketVisibilitySettingsEntity` 的配置。举例说明：
>
> - 若可见性设为 `ORG_WIDE`：组织内所有成员可查看全部外部工单，访客仅可查看自己创建的外部工单；
> - 若可见性设为 `SPECIFIED_DEPARTMENTS` 且选择了 A 部门：只有 A 部门成员可查看外部工单列表，B 部门成员看不到任何外部工单（包括自己未创建的）；但访客仍可查看自己创建的外部工单；
> - 若可见性设为 `CATEGORY_BASED`：按每条分类规则执行，与内部工单逻辑一致。
>
> 这意味着：外部工单不再默认全员可见。管理员可以通过可见性设置精确控制哪些部门能查看和操作外部工单。

### 2.5 当前代码影响范围（已复核）

本次调整不是纯新增功能。当前代码中已经存在一版 `DEPARTMENT_ONLY` 可见性实现，后续执行时需要做迁移替换，避免新旧语义混用。

#### 后端已存在的旧实现

| 文件 | 当前问题 | 迁移要求 |
| ---- | -------- | -------- |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_visibility/TicketVisibilityModeEnum.java` | 枚举仍包含 `DEPARTMENT_ONLY` | 改为 `SPECIFIED_DEPARTMENTS`，并考虑历史 JSON 旧值兼容 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_visibility/TicketVisibilitySettingsData.java` | 仅保存 `mode` 与 `categoryRules`，没有顶层 `departmentUids` | 新增 `departmentUids`，`normalize()` 负责去重、清理无效字段与旧值转换 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_visibility/TicketVisibilityCategoryRuleData.java` | 分类规则只有 `categoryUid` / `visibility` | 新增规则级 `departmentUids`，支持每个分类独立白名单 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_visibility/TicketVisibilitySettingsRequest.java` / `TicketVisibilitySettingsResponse.java` | 对外 DTO 没有 `departmentUids` | 顶层与分类规则 request/response 都需补齐 `departmentUids` |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_visibility/TicketVisibilityCategoryRuleRequest.java` / `TicketVisibilityCategoryRuleResponse.java` | 分类规则 DTO 没有部门列表 | 增加分类规则自己的 `departmentUids` 回显与保存 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_visibility/TicketVisibilitySettingsEntity.java` | `applyRequest()` 只映射分类规则的 `categoryUid` / `visibility` | 同步映射顶层与分类级 `departmentUids`，保存前执行 normalize/validate |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings/TicketSettingsRestService.java` | `copyVisibilitySettingsData()` / `mapVisibilitySettings()` 只复制和回显旧字段 | 同步复制、发布、回显新字段，并在发布路径做空白名单校验 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRequest.java` | 已有 `visibilityRestricted`、`visibilityMode`、`visibilityCurrentUserDepartmentUid` 等临时字段；`visibilityRestrictedCategoryUids` 是平铺的受限分类 uid 列表，不携带各部门白名单 | 后续优先迁移为内部 `TicketVisibilityContext`；过渡期需新增 `Map<String, Set<String>> visibilityCategoryAuthorizedDepartments` 替代旧的 `List<String> visibilityRestrictedCategoryUids`；`visibilityCurrentUserDepartmentUid` 仍保留（供 CATEGORY_BASED specification 内使用），但不再用于 `SPECIFIED_DEPARTMENTS` 模式 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRestService.java` | `enrichVisibilityContext()` / `canViewTicket()` 仍按 `DEPARTMENT_ONLY` 与工单 `departmentUid` 判断；`canViewTicket()` 中存在“工单未分配部门则全员可见”的旧兜底；`resolveVisibilitySettingsData()` 当前默认固定读取 `INTERNAL` 配置，未按 `request.type` 区分内外部设置 | 改为按当前用户 `MemberEntity.deptUid` 是否命中设置中的白名单判断；删除 `if (!hasText(ticket.getDepartmentUid())) return true` 旧兜底；同时把默认设置解析改为 **type-aware**：内部工单读取 `INTERNAL` 设置，外部工单读取 `EXTERNAL` 设置 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketSpecification.java` | `appendVisibilityPredicates()` 使用 `sameDepartment`、`noDepartmentAssigned` 等旧语义 | 移除“工单未分配部门则全员可见”的旧部门兜底，改为基于已计算上下文拼接谓词 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRestService.java` | `update()` / `delete()` / `deleteByUid()` / `deleteByVisitor()` 当前不保证先做可见性检查，存在用户能操作不可见工单的风险 | 在修改/删除前统一调用可见性检查；visitor 删除入口必须先按当前访客身份确认 `ticket.userUid == currentUserUid`，不能只依赖请求里的 uid |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketService.java` / `TicketController.java` / `TicketRestControllerVisitor.java` | `queryWorkflowActions()` / `executeWorkflowAction()` / `queryTicketActivityHistory()` 以及 `TicketController` 中旧兼容动作入口按 uid/processInstanceId 直接查询流程与任务，不必然经过 `TicketRestService.queryByUid()` | 所有流程动作、历史查询、旧兼容动作入口在读取流程或执行任务前都必须复用同一套 `checkTicketVisibility()`，确保不可见工单不能查看历史、查看可执行动作或执行状态流转 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRestService.java` | `resolveReporterUid()` 当前优先信任 `request.getReporterUid()`，再回退到 `request.getReporter().getUid()`；visitor 场景下前端可能传入其他用户的 uid | visitor 入口需先按当前认证访客身份覆盖 `request.userUid` / `request.reporterUid`；`resolveReporterUid()` 内部改为 visitor 时强制返回 `currentVisitorUid`，不信任前端传参 |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketRestService.java` | `filterVisiblePage()` 用于 `queryByThreadTopic`、`queryByVisitorThreadUid`、`queryByVisitorThreadTopic`，但这些方法调用前未执行 `enrichVisibilityContext()` | 确保 `filterVisiblePage` 调用前已通过 `enrichVisibilityContext` 或等效方法准备好可见性上下文 |

#### 前端已存在的旧实现

| 文件 | 当前问题 | 迁移要求 |
| ---- | -------- | -------- |
| `frontend/apps/admin/src/@types/ticket/ticket_settings.d.ts` | `VisibilityMode` 仍是 `ORG_WIDE / DEPARTMENT_ONLY / CATEGORY_BASED`，且无`departmentUids` | 改为 `SPECIFIED_DEPARTMENTS`，并补齐顶层和分类规则的 `departmentUids?: string[]` |
| `frontend/apps/admin/src/pages/Dashboard/Ticket/Settings/components/TicketVisibilitySettings.tsx` | Radio / Select / summary 仍使用 `DEPARTMENT_ONLY`，没有部门多选 | 迁移为 `SPECIFIED_DEPARTMENTS`，复用部门接口展示多选 `DepartmentEntity` |
| `frontend/apps/admin/src/pages/Dashboard/Ticket/Settings/index.tsx` | `sanitizeVisibilitySettings()` 只接受并写回 `DEPARTMENT_ONLY`，会丢弃新部门白名单 | 保存 payload 时按模式清理字段、保留部门列表，并拦截空白名单发布 |
| `frontend/apps/admin/src/apis/team/department.ts` | 已有 `queryDepartmentsByOrg()` | 可复用该接口加载部门列表，无需新增部门 API |
| `frontend/apps/admin/src/.umi*` | 生成文件中也有旧值 | 不手工修改，源文件迁移后由构建重新生成 |

> 后续执行代码修改时，应优先从这些文件开始做最小闭环：先让数据结构能保存和回显 `departmentUids`，再迁移运行时过滤，最后迁移前端交互与保存清洗逻辑。

---

## 3. 数据模型设计

### 3.1 调整已有实体：`TicketVisibilitySettingsEntity`

为对齐现有 `TicketCategorySettingsEntity`，可见性设置建议采用“实体 + typed data + AttributeConverter”的模式，而不是在实体上直接裸存 `String categoryRules`。

```java
@Entity
@Table(name = "bytedesk_ticket_visibility_settings")
public class TicketVisibilitySettingsEntity extends BaseEntity {

    @Builder.Default
    @Convert(converter = TicketVisibilitySettingsConverter.class)
    @Column(length = 4096)
    private TicketVisibilitySettingsData content = TicketVisibilitySettingsData.builder().build();
}
```

现有结构需同步调整：

- `TicketVisibilitySettingsData`：包含 `mode`、`departmentUids` 与 `categoryRules`，提供 `normalize()`，默认 `mode=ORG_WIDE`，`departmentUids=[]`；
- `TicketVisibilityCategoryRuleData`：包含 `categoryUid`、`visibility` 与 `departmentUids`，其中 `departmentUids` 仅在 `visibility=SPECIFIED_DEPARTMENTS` 时生效；
- `TicketVisibilitySettingsConverter`：参考 `TicketCategorySettingsConverter`，用 Jackson 在 JSON 字符串与 `TicketVisibilitySettingsData` 间转换。

`normalize()` 建议同时负责：去重 `departmentUids`、去重 `categoryRules`、按 mode 清理无效字段、按 rule visibility 清理无效字段。

### 3.2 调整枚举：`TicketVisibilityModeEnum`

```java
public enum TicketVisibilityModeEnum {
    ORG_WIDE,                // 公司内部全部可见
    SPECIFIED_DEPARTMENTS,   // 指定部门可见（白名单制）
    CATEGORY_BASED           // 根据工单分类分配可见性
}
```

> **枚举旧值兼容策略**：现有数据库 `content` JSON 中可能存在 `"mode": "DEPARTMENT_ONLY"` 的旧值。由于 `TicketVisibilitySettingsData.resolveMode()` 已经对未知枚举值兜底为 `ORG_WIDE`（`catch (IllegalArgumentException)` 分支），删除 `DEPARTMENT_ONLY` 枚举值后旧数据会自动降级为 `ORG_WIDE`，不会导致反序列化崩溃。建议发布后在管理后台提示管理员重新配置可见性，同时提供一份升级说明。分类规则中的 `"visibility": "DEPARTMENT_ONLY"` 同理，会被 `resolveRuleVisibility()` 降级为 `ORG_WIDE`。

### 3.3 `normalize()` 更新要点

当前 `TicketVisibilitySettingsData.normalize()` 仅做 `mode` 解析和 `categoryRules` 去重。迁移后需补充：

1. **按 mode 清理字段**：`ORG_WIDE` → 清空 `departmentUids` + `categoryRules`；`SPECIFIED_DEPARTMENTS` → 清空 `categoryRules`；`CATEGORY_BASED` → 清空顶层 `departmentUids`；
2. **按规则 visibility 清理字段**：`categoryRules[i].visibility == ORG_WIDE` → 清空该规则的 `departmentUids`；
3. **空白名单校验不放在 normalize 中**：`normalize()` 只做字段清理和去重，不做“空白名单拒绝”——后者应放在保存/发布的前端和后端校验层。

同时 `resolveCategoryVisibility()` 返回 `TicketVisibilityModeEnum` 时需同步：不再检查 `DEPARTMENT_ONLY`，改为检查 `SPECIFIED_DEPARTMENTS`。该方法当前只返回分类的 visibility mode 字符串，若未来 `CATEGORY_BASED` 模式下需要获取分类级 `departmentUids`，建议新增 `resolveCategoryDepartmentUids()` 方法而非修改现有方法签名。

### 3.3 `TicketSettingsEntity` 字段复核

```java
// 已发布版本
@ManyToOne(fetch = FetchType.LAZY, optional = true,
    cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
private TicketVisibilitySettingsEntity visibilitySettings;

// 草稿版本
@ManyToOne(fetch = FetchType.LAZY, optional = true,
    cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
private TicketVisibilitySettingsEntity draftVisibilitySettings;
```

### 3.4 调整 Request/Response DTO

`TicketVisibilitySettingsRequest` / `TicketVisibilitySettingsResponse`，对外直接暴露 `mode`、`departmentUids` 与 `categoryRules`，不要把内部 `content` 字段暴露给前端。

其中建议结构如下：

```java
class TicketVisibilitySettingsRequest {
    private String mode;
    private List<String> departmentUids; // mode=SPECIFIED_DEPARTMENTS 时使用
    private List<TicketVisibilityCategoryRuleRequest> categoryRules; // mode=CATEGORY_BASED 时使用
}

class TicketVisibilityCategoryRuleRequest {
    private String categoryUid;
    private String visibility;
    private List<String> departmentUids; // visibility=SPECIFIED_DEPARTMENTS 时使用
}
```

### 3.5 `TicketSettingsRequest` / `TicketSettingsResponse` 字段复核

```java
// 请求
private TicketVisibilitySettingsRequest visibilitySettings;

// 响应
private TicketVisibilitySettingsResponse visibilitySettings;
private TicketVisibilitySettingsResponse draftVisibilitySettings;
```

---

## 4. 数据库变更（Liquibase）

当前仓库中已存在 `starter/src/main/resources/db/changelog/migration/260727_add_ticket_visibility_settings.xml`，并已在 `starter/src/main/resources/db/changelog/master.xml` 中 include。后续执行时应先复核该 changelog 是否已经在目标环境执行，再决定是否只需调整 JSON 内容兼容逻辑。

本次 `SPECIFIED_DEPARTMENTS` 改造主要新增 JSON 字段 `departmentUids`，理论上不需要新增关系表或外键字段；但需确认 `content` 的 `VARCHAR(4096)` 是否足够保存多个分类与多个部门 uid。若预计部门/分类数量较大，应考虑把 `content` 扩容为 `TEXT` 或数据库对应的大文本类型。

```xml
<!-- starter/src/main/resources/db/changelog/migration/260727_add_ticket_visibility_settings.xml -->
<databaseChangeLog>

    <changeSet id="260727_add_ticket_visibility_settings_table" author="jackning">
        <preConditions onFail="MARK_RAN">
            <not>
                <tableExists tableName="bytedesk_ticket_visibility_settings"/>
            </not>
        </preConditions>
        <createTable tableName="bytedesk_ticket_visibility_settings">
            <column name="id" type="bigint" autoIncrement="true">
                <constraints primaryKey="true" primaryKeyName="pk_bytedesk_ticket_visibility_settings" nullable="false"/>
            </column>
            <column name="uuid" type="VARCHAR(64)">
                <constraints nullable="false"/>
            </column>
            <column name="version" type="BIGINT"/>
            <column name="created_at" type="TIMESTAMP"/>
            <column name="updated_at" type="TIMESTAMP"/>
            <column name="is_deleted" type="BOOLEAN" defaultValueBoolean="false"/>
            <column name="org_uid" type="VARCHAR(64)"/>
            <column name="user_uid" type="VARCHAR(64)"/>
            <column name="level_type" type="VARCHAR(32)" defaultValue="ORGANIZATION"/>
            <column name="platform_type" type="VARCHAR(32)" defaultValue="BYTEDESK"/>
            <column name="content" type="VARCHAR(4096)" defaultValue="{}"/>
        </createTable>
        <addUniqueConstraint tableName="bytedesk_ticket_visibility_settings" columnNames="uuid" constraintName="uk_ticket_visibility_settings_uuid"/>
    </changeSet>

    <changeSet id="260727_add_ticket_visibility_settings_fk_columns" author="jackning">
        <preConditions onFail="MARK_RAN">
            <tableExists tableName="bytedesk_ticket_settings"/>
        </preConditions>
        <addColumn tableName="bytedesk_ticket_settings">
            <column name="visibility_settings_id" type="bigint"/>
            <column name="draft_visibility_settings_id" type="bigint"/>
        </addColumn>
    </changeSet>

    <changeSet id="260727_add_ticket_visibility_settings_foreign_keys" author="jackning">
        <preConditions onFail="MARK_RAN">
            <and>
                <tableExists tableName="bytedesk_ticket_visibility_settings"/>
                <tableExists tableName="bytedesk_ticket_settings"/>
            </and>
        </preConditions>
        <addForeignKeyConstraint
            baseTableName="bytedesk_ticket_settings"
            baseColumnNames="visibility_settings_id"
            constraintName="fk_ticket_settings_visibility_settings"
            referencedTableName="bytedesk_ticket_visibility_settings"
            referencedColumnNames="id"/>
        <addForeignKeyConstraint
            baseTableName="bytedesk_ticket_settings"
            baseColumnNames="draft_visibility_settings_id"
            constraintName="fk_ticket_settings_draft_visibility_settings"
            referencedTableName="bytedesk_ticket_visibility_settings"
            referencedColumnNames="id"/>
    </changeSet>

</databaseChangeLog>
```

并在 `starter/src/main/resources/db/changelog/master.xml` 中 include。

---

## 5. 运行时过滤实现

### 5.1 作用范围

**同时覆盖内部工单（`type=INTERNAL`）和外部工单（`type=EXTERNAL`）。** 但内外部工单继续沿用现有的 **type 维度分开设置**：`TicketSettingsEntity.type=INTERNAL` 和 `TicketSettingsEntity.type=EXTERNAL` 各自持有自己的 `visibilitySettings`。两套配置结构一致，但配置值互不共享；同时保留各自的创建人豁免语义：

- **内部工单**：组织内成员（当前创建/更新校验期望 `UserEntity.type=MEMBER`）通过 `desktop` / `admin` 查询内部工单列表时，受 `type=INTERNAL` 对应设置的可见性配置约束。创建人（`userUid`）始终可查看自己创建的工单。
- **外部工单**：访客（`UserEntity.type=VISITOR`）通过 `visitor` 前端查询工单列表时，**始终只能看到自己创建的外部工单**（`userUid == currentVisitorUid`），这是外部工单的天然隔离边界。组织内成员通过 `desktop` / `admin` 查询外部工单列表时，受 `type=EXTERNAL` 对应设置的可见性配置约束（`ORG_WIDE`、`SPECIFIED_DEPARTMENTS`、`CATEGORY_BASED`）。

> **总结**：
>
> - **访客侧（visitor 前端）**：外部工单天然按 `userUid` 隔离，访客仅看自己创建的，不需要额外的部门可见性判断；但后端仍应从当前访客身份强制写入/覆盖 `userUid` 过滤条件，**不能只信任前端传入的 `reporterUid`/`userUid`**。
> - **组织成员侧（desktop / admin）**：无论查询内部工单还是外部工单，都需叠加可见性配置过滤；其中内部工单读取 `type=INTERNAL` 的设置，外部工单读取 `type=EXTERNAL` 的设置。
> **对外部工单 + `SPECIFIED_DEPARTMENTS` 的语义说明**：
>
> 外部工单本身没有 `departmentUid`（或者说 `departmentUid` 为空），`SPECIFIED_DEPARTMENTS` 不依赖工单 `departmentUid` 判断，而是基于当前查询用户的 `MemberEntity.deptUid` 是否在白名单中。因此这个组合完全可以正常工作：如果当前用户所在部门在白名单中，则可以看到所有外部工单；如果不在，则只能看到自己创建的外部工单（创建人豁免）。
> **与当前代码的差距说明**：现有 `TicketRestControllerVisitor.queryByVisitorUid()` 直接复用 `ticketRestService.queryByUser(request)`，而 `queryByUser()` 当前会优先信任请求中的 `reporterUid` / `reporter.uid` 并写入 `userUid`。因此后续实现不能只在前端传正确参数，必须在 visitor 控制器或 service 入口处，用当前认证访客身份强制覆盖 `request.userUid` / `request.reporterUid`，再进入通用查询逻辑。

### 5.2 入口点

运行时过滤的控制入口应放在 `TicketRestService.createSpecification()` 之前或之内完成，而不是把全部逻辑直接塞进当前静态的 `TicketSpecification.search()`。

原因：

- 当前 `TicketSpecification.search(request, authService)` 是静态工厂方法，只接收 `request` 与 `authService`；
- 当前 `TicketSpecification` 无法直接访问 `MemberRepository`、`TicketSettingsRestService` 等依赖；
- 当前可见性模式依赖 `TicketSettings`，而 `TicketSpecification` 本身并不持有该上下文。

因此更稳妥的首版实现路径是：

1. 在 `TicketRestService.createSpecification(request)` 中先解析当前请求对应的 `TicketSettings.visibilitySettings`；
2. 在 service 层补齐当前用户部门、可见性模式、顶层白名单、分类规则白名单等运行时上下文；
3. 将这些已解析条件写入内部 `TicketVisibilityContext`，或在过渡期复用现有 `TicketRequest` 临时字段；
4. 最终由 `TicketSpecification` 仅负责拼接谓词，不负责再访问额外 repository/service。

> **实现建议**：优先新增 `TicketVisibilityContext`，而不是继续往 `TicketRequest` 塞临时字段。这样运行时权限上下文不会污染对外请求 DTO，也更便于复用到 `queryByUid` 等单条校验方法。
> **`filterVisiblePage` 前置条件**：当前 `queryByThreadTopic`、`queryByVisitorThreadUid`、`queryByVisitorThreadTopic` 直接执行 JPA 查询后用 `filterVisiblePage(this::canViewTicket)` 做二次过滤，但调用前未执行 `enrichVisibilityContext()`。迁移后需确保这些方法在进入 `filterVisiblePage` 前已完成上下文准备，否则 `canViewTicket` 内的 `resolveVisibilitySettingsData` 可能读取不到正确的 type-specific 设置。

`TicketRequest` 中已有的关键参数：

- `request.getOrgUid()` — 组织隔离（已有）
- `request.getDepartmentUid()` — 指定部门查询（已有，精确匹配）
- `request.getType()` — 工单类型，继承自 `BaseRequest`（已有）

新增过滤逻辑不修改这些已有字段的含义，而是**额外增加一组谓词**。

> **注意**：`TicketRestService` 中除了 `queryByOrg` / `queryByUser`（走 `createSpecification()`），还有以下绕过 specification 的查询方法，也需要可见性保护：
>
> - `queryByUid` — 直接 `findByUid`
> - `queryByThreadUid` — 直接 `findFirstByOrgUidAndThreadUidOrderByCreatedAtDesc`
> - `queryByThreadTopic` — 直接 `findByOrgUidAndThreadTopic`
> - `queryByVisitorThreadUid` — 直接 `findByOrgUidAndVisitorThreadUid`
> - `queryByVisitorThreadTopic` — 直接 `findByOrgUidAndVisitorThreadTopic`
> - `countStatus` 等统计方法
> - `update` / `delete` / `deleteByVisitor` 等修改入口
> - `queryWorkflowActions` / `executeWorkflowAction` / `queryTicketActivityHistory` / 旧兼容工作流动作入口
>
> 这些方法需内外部工单统一做可见性检查：如果当前用户无权限（不在白名单中、非创建人、非受理人、非管理员），则抛出 `NotFoundException` 或返回空结果。外部访客只能查看和操作 `userUid` 匹配的工单。
> **查看 vs 操作边界**：可见性检查是“是否能触达该工单”的第一道门槛，不替代现有角色权限、流程任务 assignee 校验、动作合法性校验。后续实现应遵循：先做可见性检查，再做业务动作权限检查；不可见时统一返回“工单不存在”，避免泄露工单是否存在。

### 5.3 过滤流程

> 可见性控制对 `type=INTERNAL` 和 `type=EXTERNAL` 均生效。访客侧查询外部工单天然按 `userUid` 隔离（仅看自己创建的），在查询入口处就能完成过滤，不需要额外叠加可见性配置；组织成员侧查询内外部工单列表都需叠加可见性配置。

```text
TicketRestService.createSpecification(request)
    │
    ├── 0. 若当前用户是访客（UserEntity.type=VISITOR）：
    │       └── 直接添加 userUid = currentUserUid 条件，跳过可见性配置逻辑
    │       （访客天然只能看到自己创建的工单，不需要再叠加部门可见性）
    │
    ├── 1. 读取当前 orgUid + request.type 对应的默认 TicketSettings
    │       └── 获取 published visibilitySettings（查询列表按线上已发布规则执行）
    │       └── 注意：必须按 request.type 分别读取 INTERNAL / EXTERNAL 对应的设置
    │
    ├── 2. 通过 MemberRepository 获取当前用户的 deptUid
    │
    ├── 3. 解析 visibility mode
    │       ├── mode=ORG_WIDE → 不添加额外部门限制
    │       ├── mode=SPECIFIED_DEPARTMENTS → 检查用户 deptUid 是否在 departmentUids 白名单中
    │       └── mode=CATEGORY_BASED → 按每条分类规则中的 departmentUids 决定是否可见
    │
    └── 4. 将已解析的可见性上下文传给 TicketSpecification
            ├── OR: 当前用户是平台/组织管理员（管理员豁免）
            ├── OR: assignee.uid = 当前用户 uid（受理人豁免）
            ├── OR: userUid = 当前用户 uid（创建人豁免，覆盖内部成员和外部访客）
            ├── OR: 用户 deptUid 在当前模式对应的授权部门白名单中
            └── 最终与原有查询条件 AND 组合
```

> **与旧设计的核心区别**：旧设计中 `DEPARTMENT_ONLY` 依赖工单的 `departmentUid` 字段进行匹配（即工单属于哪个部门，该部门成员可看）；新设计中 `SPECIFIED_DEPARTMENTS` **不依赖**工单的 `departmentUid`，而是基于管理员配置的 `departmentUids` 白名单。这使得：
>
> 1. 工单无需预先分配到部门即可实现部门级访问控制
> 2. 多个部门可以同时被授权查看同一批工单
> 3. 权限配置更灵活，管理员可随时调整授权部门列表而不影响工单数据

### 5.4 获取当前用户的部门

当前 `UserEntity` 与 `DepartmentEntity` 通过 `MemberEntity` 间接关联：

```text
DepartmentEntity ──(deptUid 字符串)──▶ MemberEntity ◀──(@ManyToOne user)──▶ UserEntity
```

- `MemberEntity.deptUid` 是普通字符串（非 FK），存储成员所属部门 uid
- `MemberEntity.user` 是 `@ManyToOne` 指向 `UserEntity`
- `MemberRepository.findByUser_UidAndOrgUidAndDeletedFalse(userUid, orgUid)` 可按用户查找其成员记录

获取当前用户的部门 uid 路径：

```java
// 在 TicketRestService.createSpecification(...) 中获取当前用户部门
String currentUserUid = authService.getCurrentUser().getUid();
String orgUid = request.getOrgUid(); // 请求中已携带

// 查询当前用户在该组织的成员记录
Optional<MemberEntity> memberOpt = memberRepository
    .findByUser_UidAndOrgUidAndDeletedFalse(currentUserUid, orgUid);

// 提取部门 uid
String userDeptUid = memberOpt.map(MemberEntity::getDeptUid).orElse(null);
Set<String> userDepartmentUids = userDeptUid != null ? Set.of(userDeptUid) : Set.of();
```

> 注意：当前 `MemberEntity` 的 `deptUid` 是单值（一个成员只属于一个部门），因此 `userDepartmentUids` 最多一个元素。如果未来需要多部门归属，需要先扩展 `MemberEntity`。

### 5.5 部门匹配谓词

获取到当前用户 `deptUid` 后，首版建议把“用户是否命中部门白名单”的判断尽量放在 service 层提前算好，而不是继续把白名单列表错误地套到工单 `departmentUid` 字段上。

原因：

1. `SPECIFIED_DEPARTMENTS` 模式的设计目标就是**不依赖工单本身的 `departmentUid`**；
2. 如果继续写成 `root.get("departmentUid").in(authorizedDepartmentUids)`，会与前文设计目标冲突，并把模型又退回“工单属于哪个部门谁可见”的旧逻辑；
3. 当前模式更适合表达为“当前用户是否具备查看本批工单的资格”。

因此建议拆成两层：

```java
// service 层先算出当前用户是否在白名单内
boolean inSpecifiedDepartments = authorizedDepartmentUids.contains(currentUserDeptUid);

// specification 层：基于上下文决定是否需要追加豁免谓词
// basePredicate = 现有的 orgUid、type、status 等基础条件 AND 后的结果
if (!isAdmin && !inSpecifiedDepartments) {
    // 仍保留受理人/创建人豁免，避免把自己负责或自己创建的工单也挡掉
    Predicate privilegedPredicate = criteriaBuilder.or(
        criteriaBuilder.like(root.get("assignee"), "%\"uid\":\"" + currentUserUid + "\"%"),
        criteriaBuilder.equal(root.get("userUid"), currentUserUid)
    );
    predicates.add(privilegedPredicate);
}
// 管理员或已在白名单中的用户：不追加额外限制，等同于 ORG_WIDE
```

> **注意**：`SPECIFIED_DEPARTMENTS` 模式下不再使用“工单未分配部门则全员可见”的旧兜底。未分配部门的工单是否可见，取决于当前用户是否在白名单中，或是否命中管理员/受理人/创建人豁免。

说明：

- `reporter` 当前存储为 JSON 字符串，而真正稳定可索引的创建人字段是 `userUid`；首版建议以 `userUid` 作为创建人豁免判断，不依赖 `reporter.uid`；
- `isAdmin` 不建议在 specification 内动态推导，建议由 service 层提前判断，如果是管理员则直接不追加可见性谓词；
- 平台管理员可优先使用 `UserEntity.isSuperUser()` / `UserDetailsImpl.superUser` 判断；组织管理员不要使用实体 `level_type` 判断，需基于当前认证用户的 authorities、`RolePermissions.ROLE_ADMIN` 对应角色，或现有权限服务能力判断。

### 5.5.1 `enrichVisibilityContext` 迁移要点

当前 `TicketRestService.enrichVisibilityContext()` 中 `visibilityRestrictedCategoryUids` 是一个平铺的 `List<String>`——它只收集 visibility 为 `DEPARTMENT_ONLY` 的分类 uid，然后在 `TicketSpecification.appendVisibilityPredicates()` 中用"工单属于这些分类 + sameDepartment/noDepartmentAssigned"做旧语义过滤。

迁移到新模型后，`enrichVisibilityContext` 需要改为：

```java
private void enrichVisibilityContext(TicketRequest request) {
    // 1. 访客用户天然按 userUid 隔离，不需要叠加部门可见性配置
    if (isVisitorUser(currentUser)) {
        request.setVisibilityRestricted(false);
        // 访客查询必须在服务端强制追加/覆盖 userUid = currentUserUid，不能仅依赖前端传参
        return;
    }

    // 2. 管理员豁免：直接标记 unrestricted
    if (currentUser.isSuperUser() || hasOrgAdminRole(currentUser)) {
        request.setVisibilityOrgAdmin(true);
        request.setVisibilityRestricted(false);
        return;
    }

    // 3. 获取当前用户部门
    String userDeptUid = memberRepository
        .findByUser_UidAndOrgUidAndDeletedFalse(currentUser.getUid(), orgUid)
        .map(MemberEntity::getDeptUid).orElse(null);

    // 4. 加载已发布的 visibilitySettings（严格按 request.type 读取 INTERNAL / EXTERNAL 对应配置）
    TicketVisibilitySettingsData data = resolveVisibilitySettingsData(request);

    // 5. SPECIFIED_DEPARTMENTS 模式：
    //    直接判断当前用户 deptUid 是否在顶层 departmentUids 白名单中；
    //    如果不在白名单中，标记 restricted=true 且 authorizedDepartmentUids 为空，
    //    让 specification 只保留豁免谓词（含创建人豁免 userUid == currentUserUid）
    if (SPECIFIED_DEPARTMENTS.name().equals(data.getMode())) {
        Set<String> authorized = new HashSet<>(data.getDepartmentUids());
        boolean inWhitelist = userDeptUid != null && authorized.contains(userDeptUid);
        request.setVisibilityRestricted(!inWhitelist);
        request.setVisibilityMode(data.getMode());
        return;
    }

    // 6. CATEGORY_BASED 模式：
    //    将 categoryRules 解析为 Map<categoryUid, Set<departmentUid>>，
    //    不再使用旧的平铺 visibilityRestrictedCategoryUids
    if (CATEGORY_BASED.name().equals(data.getMode())) {
        Map<String, Set<String>> categoryDeptMap = new LinkedHashMap<>();
        for (TicketVisibilityCategoryRuleData rule : data.getCategoryRules()) {
            if (SPECIFIED_DEPARTMENTS.name().equals(rule.getVisibility())
                    && rule.getDepartmentUids() != null) {
                categoryDeptMap.put(rule.getCategoryUid(),
                    new HashSet<>(rule.getDepartmentUids()));
            }
        }
        // 过渡期暂存到 request（后续迁移到 TicketVisibilityContext）
        request.setVisibilityCategoryAuthorizedDepartments(categoryDeptMap);
        request.setVisibilityMode(data.getMode());
        request.setVisibilityRestricted(!categoryDeptMap.isEmpty());
        return;
    }

    // 7. ORG_WIDE：不限制
    request.setVisibilityRestricted(false);
}
```

> **关键变化**：
>
> - 旧逻辑 `request.setVisibilityRestrictedCategoryUids(flatList)` 被替换为 `Map<String, Set<String>>`；
> - `SPECIFIED_DEPARTMENTS` 模式下直接判断白名单命中，不再进 specification 做旧语义拼接；
> - `CATEGORY_BASED` 模式下 specification 拿到的是分类→部门白名单映射，按 ticket 的 `categoryUid` 查表判断，而不是平铺受限分类列表。

### 5.6 CATEGORY_BASED 分类兜底

当 `mode=CATEGORY_BASED` 时：

- 在 `categoryRules` 中已配置的分类，按其规则（`ORG_WIDE` 或 `SPECIFIED_DEPARTMENTS`）执行；
- **未配置的分类回退到 `ORG_WIDE`**（组织内全员可见），即与 mode 默认值一致。

处理逻辑：按工单的 `categoryUid` 在 `categoryRules` JSON 中查找对应规则；命中则用规则的 `visibility`，未命中则视为 `ORG_WIDE`。

首版建议不要把"按每条 Ticket 的 categoryUid 动态解析 JSON 再在 SQL 层分流"直接压进一条复杂 JPA 谓词里，而应采用更稳妥的方式：

1. service 层先把 `categoryRules` 解析成 `Map<String, Set<String>> categoryAuthorizedDepartments`，键为 `categoryUid`，值为该分类单独授权的部门白名单；
2. 先按工单 `categoryUid` 命中规则，再决定当前用户是否可见：
    - 命中 `ORG_WIDE` 规则，直接放行；
    - 命中 `SPECIFIED_DEPARTMENTS` 规则，仅当当前用户 `deptUid` 在该分类自己的 `departmentUids` 中时放行；
    - 命中 `SPECIFIED_DEPARTMENTS` 规则但 `departmentUids` 为空，按安全优先处理为“仅豁免用户可见”，同时发布阶段应尽量提前拦截这种配置；
    - 未命中任何分类规则，按 `ORG_WIDE` 放行；
3. specification 中应表达为“当前工单分类是否允许当前用户查看”，而不是把所有分类的部门白名单揉成一组全局条件；
4. 如首版 JPA 表达过于复杂，可退一步拆成两段 specification 再 `or` 组合，而不是在 SQL 层做 JSON 解析。

> **首版取舍建议**：如果 `CATEGORY_BASED` 在 JPA 谓词层实现过重，可以首版先在列表查询上做“粗过滤 + 应用层二次过滤”，同时对 `queryByUid` 等单条接口做严格校验。等后续确认数据量后，再决定是否下沉到更细的 SQL/JPA 级别优化。

---

## 6. 后端实现步骤

### Step 1: 数据模型层（迁移旧实现）

| 任务 | 文件 | 说明 |
| ---- | ---- | ---- |
| 1.1 | `TicketVisibilityModeEnum.java` | 将旧 `DEPARTMENT_ONLY` 迁移为 `SPECIFIED_DEPARTMENTS`，并定义历史旧值兼容策略 |
| 1.2 | `TicketVisibilitySettingsData.java` / `TicketVisibilityCategoryRuleData.java` | 在现有 typed JSON 数据结构中新增顶层与分类级 `departmentUids` |
| 1.3 | `TicketVisibilitySettingsConverter.java` | 保留现有 AttributeConverter，并确保反序列化旧 JSON 时能 normalize 到安全默认值 |
| 1.4 | `TicketVisibilitySettingsEntity.java` | 更新 `fromRequest/applyRequest`，完整映射 `departmentUids` 并执行 normalize/validate |
| 1.5 | `TicketVisibilitySettingsRequest.java` / `TicketVisibilityCategoryRuleRequest.java` | 新增请求 DTO 字段 `departmentUids` |
| 1.6 | `TicketVisibilitySettingsResponse.java` / `TicketVisibilityCategoryRuleResponse.java` | 新增响应 DTO 字段 `departmentUids`，保证草稿与发布态可回显 |

### Step 2: TicketSettings 集成

| 任务 | 文件 | 说明 |
| ---- | ---- | ---- |
| 2.1 | `TicketSettingsEntity.java` | 复核现有 visibilitySettings / draftVisibilitySettings 字段是否无需库表调整 |
| 2.2 | `TicketSettingsRequest.java` | 确认 visibilitySettings 请求结构透传新字段 |
| 2.3 | `TicketSettingsResponse.java` | 确认 visibilitySettings / draftVisibilitySettings 响应结构回显新字段 |
| 2.4 | `TicketSettingsRestService.java` | 更新创建/更新/发布/复制/回显逻辑，发布时拒绝空白名单配置 |
| 2.5 | `TicketSettingsRestService.java` | 明确保存草稿允许临时不完整，但发布必须通过完整性校验 |

### Step 3: 运行时过滤

| 任务 | 文件 | 说明 |
| ---- | ---- | ---- |
| 3.1 | 新增 `TicketVisibilityContext` | 承载运行时可见性上下文，避免污染 `TicketRequest` 对外 DTO。建议包含字段：`boolean restricted`、`String mode`、`boolean orgAdmin`、`String currentUserUid`、`String currentUserDeptUid`、`Set<String> authorizedDepartmentUids`（顶层白名单）、`Map<String, Set<String>> categoryAuthorizedDepartments`（分类 uid → 部门白名单） |
| 3.2 | `TicketRestControllerVisitor.java` / `TicketRestService.java` | 在 visitor 入口先基于当前认证访客身份强制覆盖 `request.userUid` / `request.reporterUid`，再进入通用查询逻辑；在 `createSpecification(request)` 中按 `request.type` 读取已发布 visibilitySettings，查询当前用户部门，判定管理员豁免，并为 visitor 请求保留创建人隔离，再组装运行时上下文 |
| 3.3 | `TicketSpecification.java` | 基于已计算好的上下文拼接谓词，不直接依赖 repository/service。组织成员侧谓词中始终包含 `userUid == currentUserUid`（创建人豁免）；visitor 侧则在进入 specification 前就先强制绑定 `userUid == currentUserUid` |
| 3.4 | `TicketRestService.java` | 对 `queryByUid` / `queryByThreadUid` / `queryByThreadTopic` / `queryByVisitorThreadUid` / `queryByVisitorThreadTopic` 等绕过 specification 的方法，在返回前做可见性检查（同时覆盖内部和外部工单） |
| 3.5 | `TicketRestService.java` | 确保 `countStatus` 与列表查询使用同一套可见性条件，避免统计数字泄露不可见工单数量（内外部工单统计均需过滤）。当前 `countStatus` 在 `visibilityRestricted=false` 时走直接 count 查询（`countByOrgUidAndStatusAndDeletedFalse` 等），此回落路径需叠加与列表一致的可见性过滤 |
| 3.6 | `TicketSpecification.java` | 删除旧 `DEPARTMENT_ONLY` 分支中的 `sameDepartment` / `noDepartmentAssigned` 逻辑，避免工单 `departmentUid` 重新影响可见性 |
| 3.7 | `TicketRestService.resolveVisibilitySettingsData()` | 当前默认固定回落到 `findDefaultByOrgUidAndType(..., INTERNAL)`，后续需改为按 `request.type` 回落，避免外部工单错误套用内部工单可见性设置 |
| 3.8 | `TicketRestService.update/delete` | 在更新、删除、访客删除前调用同一套 `checkTicketVisibility()`；visitor 删除需额外保证当前访客就是创建人 |
| 3.9 | `TicketService` / `TicketController` | 在工作流动作查询、动作执行、活动历史查询、旧兼容动作入口前做可见性检查；可见性通过后再执行流程任务 assignee / actionKey / 状态流转校验 |
| 3.10 | `TicketRestService.resolveReporterUid()` | visitor 场景强制返回当前认证访客 uid，不信任前端传参；非 visitor 场景保持现有回退逻辑 |
| 3.11 | `TicketRestService.filterVisiblePage()` 调用点 | 确保 `queryByThreadTopic`、`queryByVisitorThreadUid`、`queryByVisitorThreadTopic` 在调用 `filterVisiblePage` 前先完成 `enrichVisibilityContext` |

### Step 4: 数据库

| 任务 | 文件 | 说明 |
| ---- | ---- | ---- |
| 4.1 | `260727_add_ticket_visibility_settings.xml` | 复核已存在 changelog 是否覆盖目标环境；如需扩容 `content`，追加新 changeset |
| 4.2 | `master.xml` | 确认已 include 现有 changelog，避免重复 include |
| 4.3 | 数据迁移脚本/兼容转换逻辑 | 处理历史 `DEPARTMENT_ONLY` / 旧分类规则值的迁移或降级 |

### Step 5: 前端管理端

| 任务 | 文件 | 说明 |
| ---- | ---- | ---- |
| 5.1 | `ticket_settings.d.ts` | 迁移 VisibilitySettings 类型（含 `departmentUids` 字段） |
| 5.2 | `TicketVisibilitySettings.tsx` | 迁移现有组件：Radio.Group 选择模式 + 当选择"指定部门可见"时展示部门选择器（多选 `DepartmentEntity` 列表）+ 当选择 `CATEGORY_BASED` 时在每一条分类规则中支持切换 `ORG_WIDE` / `SPECIFIED_DEPARTMENTS` 并展示该分类自己的部门多选选择器 |
| 5.3 | `index.tsx` | 更新现有"可见性"标签页的 sanitize/build payload 逻辑，保留新字段 |
| 5.4 | `zh-CN/ticket.ts` / `ja-JP/ticket.ts` | i18n 文案 |
| 5.5 | `TicketVisibilitySettings.tsx` / 相关 store | 模式切换时同步清理无效字段，发布前对空白名单做前端校验并提示用户 |
| 5.6 | 相关常量 / 类型 / 兼容转换 | 将现有前端中的 `DEPARTMENT_ONLY` 枚举值、文案 key、序列化值统一迁移到 `SPECIFIED_DEPARTMENTS` |
| 5.7 | `apis/team/department.ts` / `stores/team/department` | 复用现有部门查询能力加载 `DepartmentEntity` 列表，不新增后端接口 |

---

## 7. 推荐默认业务规则

### 7.1 默认值

| 参数 | 默认值 | 说明 |
| ---- | ------ | ---- |
| `mode` | `ORG_WIDE` | 兼容现有行为，不破坏现有用户的数据访问 |
| `departmentUids` | `[]` | 空数组，mode=SPECIFIED_DEPARTMENTS 时由管理员手动选择部门 |
| `categoryRules` | `[]` | 空数组，mode=CATEGORY_BASED 时才需配置 |

### 7.2 行为规则

1. **向后兼容**：默认 `ORG_WIDE`，与当前行为完全一致，不影响现有用户
2. **指定部门可见**：`SPECIFIED_DEPARTMENTS` 模式下，只有 `MemberEntity.deptUid` 在 `departmentUids` 白名单中的用户可以看到工单。**不依赖工单本身的 `departmentUid`**
3. **白名单为空时**：如果 `departmentUids` 为空列表，则普通成员无法看到任何工单（只有管理员/受理人/创建人可豁免）
4. **受理人始终可见**：已分配受理人的工单，受理人不受可见性限制
5. **管理员豁免**：平台超级管理员和组织管理员可查看所有工单，维持管理运维能力；实现时分别使用 `superUser` 与角色/权限判断，不使用工单或设置实体的 `level_type` 字段推导管理员身份
6. **不因前端筛选而放宽权限**：即使用户请求已指定 `departmentUid`，也仍需叠加可见性过滤；前端筛选条件只能缩小结果集，不能绕过权限边界

---

## 8. 工作量估算

| 阶段 | 内容 | 预估 |
| ---- | ---- | ---- |
| Phase 1 | 数据模型 + 枚举 + DTO | 0.5d |
| Phase 2 | TicketSettings 集成（保存/发布/回显） | 0.5d |
| Phase 3 | 运行时过滤（列表 specification + 单条查询/统计/操作入口检查，覆盖内外部工单） | 1.25d |
| Phase 4 | 历史数据兼容与迁移处理 | 0.25d |
| Phase 5 | Liquibase / 发布脚本调整 | 0.25d |
| Phase 6 | 前端管理页（可见性 tab + 模式切换校验） | 0.75d |
| **合计** | | **约 3.5d** |

---

## 9. 决定事项（已确认）

1. **部门成员关系**：`DepartmentEntity` → `MemberEntity.deptUid`（字符串） → `MemberEntity.user`（@ManyToOne → `UserEntity`）。通过 `MemberRepository.findByUser_UidAndOrgUidAndDeletedFalse()` 获取当前用户的 `deptUid`。当前一个成员只属于一个部门。
2. **外部工单 vs 内部工单**：可见性控制同时覆盖内部工单和外部工单，但两者分别读取各自 `type` 对应的 `TicketSettingsEntity.visibilitySettings`。外部访客天然按 `userUid` 隔离（仅看自己创建的），组织成员查询外部工单时同样需要叠加 `EXTERNAL` 设置中的可见性配置。
3. **CATEGORY_BASED 兜底**：未在 `categoryRules` 中配置的分类回退到 `ORG_WIDE`（组织可见），与 mode 默认值一致。
4. **前端分类选择器**：复用现有分类列表接口，继续在现有组件（`TicketVisibilitySettings.tsx`）中迁移实现。
5. **指定部门可见不依赖工单 departmentUid**：`SPECIFIED_DEPARTMENTS` 模式下，可见性由管理员配置的 `departmentUids` 白名单 + 用户 `MemberEntity.deptUid` 决定，**与工单本身的 `departmentUid` 无关**。这使工单无需预先分配部门即可实现访问控制。
6. **旧值无法无损自动迁移**：历史 `DEPARTMENT_ONLY` 语义依赖工单自己的 `departmentUid`，无法直接推导出新的显式 `departmentUids` 白名单，因此需要单独的兼容/迁移策略。

---

## 10. 风险与边界

1. **性能**：`SPECIFIED_DEPARTMENTS` 模式下，顶层白名单判断主要发生在 service 层，对列表查询本身几乎不增加额外 SQL 复杂度；真正较重的仍是受理人豁免里的 `assignee` JSON LIKE，以及 `CATEGORY_BASED` 模式下可能出现的分类级二次过滤。首版不建议为 `assignee` 普通字符串列新增索引，因为 JSON LIKE 很难有效利用普通索引；长期建议把受理人 uid 规范化为独立列。
2. **与现有部门筛选的关系**：当前 `TicketRequest.departmentUid` 是精确匹配筛选。该筛选只能收窄结果集，不能替代可见性过滤；实现时必须先保留原筛选，再叠加可见性约束，防止用户通过手工传参查询其他部门数据。
3. **CATEGORY_BASED 的 JPA 复杂度**：如果直接在一条 specification 中表达"部分分类需要部门隔离、部分分类组织可见"过于复杂，首版可以拆为两个 specification 分支组合，优先保证正确性与可维护性。
4. **不改变现有 API 契约**：新增的可见性过滤对 API 调用方透明，不新增必填参数，不修改返回结构；如需新增运行时上下文字段，应避免暴露为外部 API 入参，优先用服务层内部对象承载。
5. **TicketSpecification 中的 `root.get("type")`**：`TicketEntity.type` 通过 `@Column(name = "ticket_type")` 映射，JPA Criteria 使用实体字段名 `type` 而非数据库列名，因此 specification 中 `root.get("type")` 引用正确。
6. **绕过 specification 的查询**：`queryByUid` / `queryByThreadUid` 等单条查询不经过 `createSpecification()`，需单独实现可见性检查逻辑，建议抽取为公共方法 `checkTicketVisibility(ticket, currentUser)`，对内外部工单统一做权限检查。外部访客只能查看 `userUid` 匹配的工单；组织成员则按工单 `type` 对应的可见性配置判断。
7. **visitor 端入参不能信任**：当前 visitor 前端查询会显式传 `reporterUid` / `userUid`，但正式落地时后端不能依赖前端入参做隔离，必须从当前登录访客身份或会话上下文中强制覆盖为 `currentUserUid`，否则存在越权枚举他人工单的风险。
8. **白名单为空的边界**：`SPECIFIED_DEPARTMENTS` 模式下 `departmentUids` 为空时，普通成员无法看到任何工单。管理员需确保至少选择一个部门后再发布，前端应做校验提示。
9. **操作入口泄露风险**：列表过滤成功不代表系统安全，`update/delete/workflow/history` 等入口如果只按 uid/processInstanceId 查询，仍可能泄露不可见工单或允许越权操作。首版必须把可见性检查抽成公共方法并覆盖所有工单读写入口。
10. **历史数据迁移风险**：如果数据库里已经存在 `DEPARTMENT_ONLY` 或分类规则里的旧值 `DEPARTMENT_ONLY`，由于新模型改为显式白名单，无法从旧配置中可靠推导出应该授权哪些部门。安全优先的建议是：
    - 发布升级前扫描并统计旧值配置；
    - 升级后先将旧值按 `ORG_WIDE` 降级处理，避免误伤业务；
    - 同时在管理后台提示管理员重新配置“指定部门可见”；
    - 如果业务更偏安全而非可用性，也可以反过来采取“禁止继续使用，必须补齐部门后才能发布”的强约束策略，但这需要上线前业务确认。

---

## 11. 验收清单

1. 新建组织或旧组织默认 `mode=ORG_WIDE`，内部工单列表结果与当前行为一致。
2. `mode=SPECIFIED_DEPARTMENTS` 时，选择了 A 部门，A 部门普通成员可看到内部工单。
3. `mode=SPECIFIED_DEPARTMENTS` 时，选择了 A 部门，B 部门（不在白名单中）普通成员看不到内部工单。
4. `mode=SPECIFIED_DEPARTMENTS` 时，`departmentUids` 白名单为空，普通成员看不到任何内部工单，管理员/受理人/创建人可豁免。
5. `mode=SPECIFIED_DEPARTMENTS` 时，工单受理人即使不在白名单部门中也能看到自己负责的工单。
6. 工单创建人可看到自己创建的工单（不受白名单限制）。
7. 超级管理员和组织管理员可看到本组织所有工单（不受白名单限制）。
8. 用户手工传入其他部门的 `departmentUid` 时，返回结果仍受可见性约束，不能越权看到其他部门工单。
9. `mode=CATEGORY_BASED` 时，配置为 `SPECIFIED_DEPARTMENTS` 的分类按白名单隔离；未配置分类和 `categoryUid` 为空的工单按 `ORG_WIDE` 放行。
10. 前端保存草稿后，列表查询仍使用已发布设置；点击发布后，新可见性规则才影响查询结果。
11. 通过 `queryByUid` 按 uid 查询其他部门内部工单时，非管理员且不在白名单中的普通成员收到"工单不存在"错误。
12. 通过 `queryByThreadUid` / `queryByThreadTopic` / `queryByVisitorThreadTopic` 查询其他部门工单时，非管理员且不在白名单中的普通成员无法越权访问。
13. 前端选择"指定部门可见"时，正确展示部门多选选择器，能加载并选择 `DepartmentEntity` 列表，保存后 `departmentUids` 正确持久化。
14. 前端从 `ORG_WIDE` 或 `CATEGORY_BASED` 切换到 `SPECIFIED_DEPARTMENTS` 时，必须重新选择部门；从 `SPECIFIED_DEPARTMENTS` 切走后，顶层 `departmentUids` 不再残留进最终发布数据。
15. 前端在 `CATEGORY_BASED` 中为分类 A 选择部门 X、为分类 B 选择部门 Y 后，A 部门成员只能看到分类 A 的工单，B 部门成员只能看到分类 B 的工单。
16. 若某条分类规则选择 `SPECIFIED_DEPARTMENTS` 但未选择任何部门，发布被前后端校验拦截，不能产生不完整配置。
17. 如果存在历史 `DEPARTMENT_ONLY` 配置，升级后系统按照预定迁移策略执行，并且管理员可以明确识别哪些配置需要手工补录新的部门白名单。

### 11.1 外部工单验收（新增）

 1. **访客查询外部工单**：访客在 visitor 前端或通过 API 查询工单列表时，始终只能看到自己创建的工单（`userUid == currentVisitorUid`），不能看到其他访客创建的工单。
 2. **访客查询单条工单**：访客通过 `queryByUid` 查询不属于自己的外部工单时，返回"工单不存在"错误，不能越权查看。
 3. **组织成员查询外部工单 — ORG_WIDE**：可见性设为 `ORG_WIDE` 时，组织内任意成员可查看所有外部工单。
 4. **组织成员查询外部工单 — SPECIFIED_DEPARTMENTS**：可见性设为 `SPECIFIED_DEPARTMENTS` 且选择 A 部门时，A 部门成员可查看所有外部工单（即便这些工单是不同访客创建的），B 部门成员看不到任何外部工单（除非自己创建了某条外部工单，则创建人豁免生效）。
 5. **组织成员查询外部工单 — CATEGORY_BASED**：按每条分类规则独立执行，与内部工单逻辑一致。
 6. **外部工单与内部工单分别按 type 配置生效**：`type=INTERNAL` 的可见性设置只影响内部工单，`type=EXTERNAL` 的可见性设置只影响外部工单；两者结构一致但配置值独立，不会互相污染。
 7. **visitor 端服务端强制绑定创建人**：即使前端手工篡改 `reporterUid` / `userUid` 请求参数，visitor 端查询结果仍只能返回当前访客自己创建的工单。
 8. **不可见工单不能更新或删除**：非管理员、非受理人、非创建人且不在授权部门白名单中的用户，即使知道工单 uid，也不能调用 `update` / `delete` / `deleteByVisitor` 修改或删除该工单。
 9. **不可见工单不能查看流程历史**：非授权用户通过 `history/activity` 查询不可见工单时，返回“工单不存在”或空结果，不能泄露流程节点、处理人或评论信息。
10. **不可见工单不能执行流程动作**：非授权用户通过 `workflow/actions` 或 `workflow/action` 查询/执行不可见工单动作时被拒绝；可见性通过后，仍继续执行原有流程任务 assignee 与动作合法性校验。
