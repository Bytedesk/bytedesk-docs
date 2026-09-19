# 角色权限管理 — UX 重设计规划文档

> 日期：2026-07-30
> 状态：**待确认**
> 关联：`frontend/apps/admin/src/components/Role/`、`frontend/apps/admin/src/pages/Dashboard/Super/Role/`、`frontend/apps/admin/src/pages/Dashboard/Team/Role/`
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md) 第 32 行
> 核心痛点：「权限太多，为用户添加权限操作过于复杂」

---

## 1. 现状分析

### 1.1 数据规模

| 指标 | 数值 |
| ------ | ------ |
| 权限模块数（`PERMISSION_MODULE`） | **133 个** |
| 操作类型（`PERMISSION_ACTION`） | 5 种（READ / CREATE / UPDATE / DELETE / EXPORT） |
| 理论最大权限数 | **665 条** |
| 实际后端注册的权限数 | 估计 **400~500 条** |

### 1.2 当前 UX 流程

```mermaid
flowchart LR
    A[用户进入角色权限页] --> B[左侧 RoleList 选择角色]
    B --> C[右侧 RoleAuthority 展示权限表格]
    C --> D{要添加权限?}
    D -->|是| E[点击"更多"下拉 → "添加角色权限"]
    E --> F[AddRoleAuthoritiesDrawer 打开]
    F --> G[搜索或翻页浏览 400+ 条权限]
    G --> H[逐条勾选 Checkbox]
    H --> I[确认]
    D -->|否| J[逐条点击删除按钮]
```

### 1.3 核心痛点

#### 痛点 1：权限粒度过细，认知负荷极高

- 133 个模块 × 最多 5 种操作 = 用户在 400+ 条列表中挑选
- 典型场景：管理员想给"客服"角色添加"工单管理"相关权限，需要手动勾选 `TICKET_READ`、`TICKET_CREATE`、`TICKET_UPDATE`、`TICKET_DELETE`、`TICKET_EXPORT`、`TICKET_SETTINGS_READ`、`PROCESS_READ` 等 10+ 条权限
- **缺乏模块级批量操作**：无法一键勾选"TICKET 模块全部权限"

#### 痛点 2：操作入口分散、不可发现

- "添加权限""删除权限""导入/导出""重置权限"全部收在"更多"下拉按钮中
- 新用户需要探索才能发现核心操作
- 批量删除必须先勾选行，再点"更多"→"删除角色权限"，路径过长

#### 痛点 3：平铺列表，缺乏视觉层次

- 权限表格是纯平铺的 ProTable，按模块名字母排序
- 没有按功能区域分组（如：客服模块 / AI模块 / 工单模块 / 知识库模块）
- 用户难以从业务视角理解权限结构

#### 痛点 4：搜索依赖精确匹配

- 搜索是本地字符串匹配，用户需要知道权限的大致名称
- 无法按"业务场景"搜索（如搜索"客服"应返回 AGENT、WORKGROUP、QUEUE 等相关权限）

#### 痛点 5：VIP 权限静默隐藏

- 非 superUser 时，VIP 不足的权限在角色权限表中直接不显示
- 在添加抽屉中显示但禁用，提示不够友好
- 管理员不知道"为什么有些权限看不到"

#### 痛点 6：缺乏引导和预设

- 无角色模板（如"客服专员""知识库管理员""工单处理员"）
- 无"从其他角色复制权限"功能
- 无"推荐权限组合"

#### 痛点 7：代码层面

- `RoleAuthority.tsx` ~1170 行，职责过多
- Store 双轨（`currentRole` / `currentRolePlatform`）导致约 30% 代码冗余
- 搜索时需要全量拉取权限（最多 200 页 × 200 条），有性能风险

### 1.4 现有实现约束

结合当前代码，首版规划必须遵守以下现实约束：

| 约束 | 当前代码依据 | 规划含义 |
| ------ | ------------- | --------- |
| 角色权限展示依赖 `queryRoleByUid` 返回完整 `authorities[]` | `RoleAuthority.request()` 每次 reload 都重新拉取角色详情 | 新 UI 首版仍应以“角色详情”为单一真相来源，不要额外维护第三份权限缓存 |
| 当前后端提供的是 `addRoleAuthorities` / `removeRoleAuthorities` / `resetRoleAuthorities` / `updateRole(authorityUids)` | `apis/core/role.ts` | 支持增量与整包替换，但不适合高频逐次点击后立即多次写接口 |
| `updateRole` 同时承担“角色信息更新”和“整包权限替换” | `RoleList.handleUpdateRole()` 与 `RoleAuthority.replaceRoleAuthorities()` 共用 | 首版要避免把权限编辑和角色基础信息编辑混成一个交互流 |
| 平台端与组织端共用组件，但状态分为 `currentRolePlatform` / `currentRole` 两套 | `stores/core/role.ts` | 新组件必须继续兼容 `superUser=true/false` 两种模式，不能只考虑平台版 |
| 组织端存在 VIP 等级门控 | `canUseAuthorityByVip()`、`canAssignAuthorityByVip()` | 新 UI 不能继续“静默隐藏”核心差异，必须显式解释“不可用”原因 |
| 现有导入/导出、重置、系统角色锁定逻辑已比较完整 | `RoleAuthority.tsx` | 这些能力应平移复用，不要在首版为了简化而牺牲管理员能力 |

### 1.5 结论：首版不建议“每次勾选即保存”

虽然“即时保存”看起来更轻，但结合现有接口和权限规模，首版更稳妥的策略应为：

1. 用户在右侧权限树中勾选/取消时，仅更新本地草稿态。
2. 顶部固定显示“有未保存变更”。
3. 用户点击“保存变更”后，再统一调用一次整包替换接口。
4. 用户点击“放弃变更”则回退到服务端最新角色权限。

原因：

- 避免用户连续勾选 10~30 项时产生 10~30 次写请求。
- 避免增量接口的时序问题导致状态闪烁或误回滚。
- 更符合“批量配置权限”的管理员操作心智。
- 与现有“导入后统一确认”“重置后统一确认”的交互模式更一致。

---

## 2. 业内最佳实践参考

### 2.1 参考系统及借鉴点

| 产品 | 核心借鉴点 |
| ------ | ----------- |
| **AWS IAM** | 可视化权限摘要（JSON / 表格双视图）、策略模拟器、权限推荐 |
| **GitHub / GitLab** | 预设角色模板（Owner/Maintainer/Developer/Reporter）、权限继承、保护分支规则 |
| **Notion** | 按工作区/页面层级的权限继承树、成员/访客分组 |
| **Figma** | 文件和团队两级权限、view/edit 简明切换 |
| **Salesforce** | 角色层级树、权限集（Permission Set）作为增量授权、Profile 作为基础授权 |
| **Zendesk** | 自定义角色 + 预设角色、按功能区域（Tickets/People/Channels）分组 |
| **Jira** | 权限方案（Permission Scheme）可复用、按项目隔离 |
| **飞书** | 管理员角色预设（超级管理员/子管理员）、子管理员按功能模块授权、模块级开关 |
| **钉钉** | 子管理员按模块授权、审批/考勤/智能人事等按应用粒度分配 |
| **1Password / Bitwarden** | 集合（Collection）概念，先分组再授权 |

### 2.2 共性设计原则

1. **先分组再授权** — 权限按业务域分组，支持按组批量勾选
2. **预设 + 自定义** — 提供开箱即用的角色模板，也支持细粒度自定义
3. **两级粒度** — 默认展示粗粒度（模块级），展开后可精细调整（操作级）
4. **所见即所得** — 授权后能预览角色的菜单/功能访问范围
5. **可复制/可导出** — 支持从已有角色复制权限，支持导入导出
6. **变更审计** — 权限变更可追溯

---

## 3. 重设计方案

### 3.1 设计目标

| # | 目标 | 衡量标准 |
| --- | ------ | --------- |
| 1 | 添加权限操作 ≤ 3 步 | 从进入页面到完成权限分配不超过 3 次点击/交互 |
| 2 | 支持批量模块级授权 | 一键勾选某个模块的全部 5 种操作 |
| 3 | 提供角色预设模板 | 至少 5 种常见业务角色模板 |
| 4 | 权限按业务域分组 | 可见的分组层级，支持折叠/展开 |
| 5 | 保留精确搜索 | 支持按权限名/模块名/业务场景搜索 |
| 6 | 保持管理员可控感 | 首版支持保存前预览与撤销，不强制即时落库 |

### 3.2 新 UX 布局

```text
┌──────────────────────────────────────────────────────────────────────┐
│  Tab: 角色权限 | 全部权限 | 全部角色                                    │
├───────────────┬──────────────────────────────────────────────────────┤
│  左侧 260px   │  右侧（内容区）                                        │
│               │                                                      │
│  ┌──────────┐ │  ┌──────────────────────────────────────────────┐    │
│  │ 角色列表  │ │  │ 角色名称：客服专员          [编辑] [复制角色]  │    │
│  │          │ │  │ ──────────────────────────────────────────── │    │
│  │ ○ 管理员  │ │  │                                              │    │
│  │ ● 客服专员│ │  │  🔍 搜索权限...          [从模板创建] [导入]  │    │
│  │ ○ 质检员  │ │  │                                              │    │
│  │ ○ ...    │ │  │  ▼ 客服模块 (6/10)                  [全选]   │    │
│  │          │ │  │    ├─ ☑ 读取客服 (AGENT_READ)                │    │
│  │ [+ 新建] │ │  │    ├─ ☑ 更新客服 (AGENT_UPDATE)              │    │
│  │          │ │  │    ├─ ☐ 创建客服 (AGENT_CREATE)              │    │
│  └──────────┘ │  │    └─ ...                                    │    │
│               │  │                                              │    │
│               │  │  ▼ 工作组模块 (4/5)                 [全选]    │    │
│               │  │    └─ ...                                    │    │
│               │  │                                              │    │
│               │  │  ▼ 工单模块 (0/10)                  [全选]    │    │
│               │  │    └─ ...                                    │    │
│               │  │                                              │    │
│               │  │  ▼ 知识库模块 (0/20)                [全选]    │    │
│               │  │    └─ ...                                    │    │
│               │  │                                              │    │
│               │  │  [重置为默认]  [导出JSON]                     │    │
│               │  └──────────────────────────────────────────────┘    │
└───────────────┴──────────────────────────────────────────────────────┘
```

### 3.3 核心交互变更

#### 变更 1：从「平铺表格 + 抽屉勾选」→「分组树 + 内联勾选」

**现状**：权限在独立抽屉中用 Checkbox 逐条勾选，确认后才生效
**改为**：权限直接在右侧区域按业务域分组展示，勾选先进入本地草稿，点击“保存变更”后统一提交。

**优势**：

- 无需打开额外抽屉，减少步骤
- 分组折叠，降低信息密度
- 模块级"全选"按钮，一键批量操作
- 批量勾选时不触发高频写接口

#### 变更 2：权限分组体系

将 133 个模块归类为约 **10~12 个业务域**：

| 业务域 | 模块数 | 理论权限数 |
| -------- | -------- | ----------- |
| 🏢 组织与成员 | 9 | ~45 |
| 💬 在线客服 | 32 | ~160 |
| 🎫 工单管理 | 3 | ~15 |
| 📚 知识库 | 17 | ~85 |
| 🤖 AI 与机器人 | 10 | ~50 |
| 📊 数据分析 | 4 | ~20 |
| ✅ 质检管理 | 6 | ~30 |
| 🔀 工作流 | 5 | ~25 |
| 🔊 呼叫中心 | 2 | ~10 |
| 📝 CRM | 6 | ~30 |
| 🔧 系统设置 | 32 | ~160 |
| 📮 其他 | 7 | ~35 |

> 分组包含共计 **133 个模块**，理论最大权限约 665 条。不同模块实际注册的后端操作可能会有差异，以上为按 5 种操作的上限估计。
> 分组定义放在前端常量中，后端权限数据增加 `category` 字段（长期）或前端映射（首期）

#### 变更 3：三级权限粒度

| 级别 | 展示 | 操作 | 适用场景 |
| ------ | ------ | ------ | --------- |
| **L1：模块组** | 业务域标题行 | 一键全选/取消该组所有权限 | 快速赋予整个功能域 |
| **L2：模块** | 模块名 + 操作行 | 单独勾选模块的 READ/CREATE/UPDATE/DELETE/EXPORT | 精确到模块粒度 |
| **L3：操作** | 单个 Checkbox | 勾选单个操作 | 最细粒度控制 |

默认展示 L1+L2，展开模块可见 L3。L2 的 checkbox 为三态（全选/部分选/未选）。

#### 变更 4：角色模板/预设

新增"从模板创建角色"或"应用模板权限"功能：

| 模板名 | 适用场景 | 预设权限 |
| -------- | --------- | --------- |
| 🔧 超级管理员 | 平台/组织最高权限 | 全部权限 |
| 💬 客服专员 | 日常接待访客 | 会话管理 + 快捷回复 + 客户查询 |
| 🎫 工单处理员 | 处理工单流转 | 工单 CRUD + 流程查看 + 客户查询 |
| 📚 知识库管理员 | 维护知识库内容 | 知识库全部 + 文章管理 + FAQ |
| 🤖 AI 配置员 | 管理机器人和 AI 设置 | 机器人设置 + LLM + Prompt + TTS/ASR |
| 👀 只读观察员 | 查看数据不做修改 | 全部模块 READ |
| ✅ 质检员 | 质检会话和工单 | 质检全部 + 会话/工单 READ |

同时补充一个比“模板”更贴近当前使用习惯的能力：

- **从现有角色复制权限**：管理员选择“复制自某角色”，系统将来源角色的权限装载到当前草稿中，再由用户做少量增减。

该能力优先级应高于复杂模板体系，因为在实际企业场景里，很多自定义角色只是“在已有角色基础上微调 2~5 项权限”。

#### 变更 5：操作入口重设计

**现状**：全部收在"更多"下拉
**改为**：

```text
┌──────────────────────────────────────────────────────┐
│  [从模板创建 ▼]   [导入 ▼]   [导出]   [重置为默认]   │
│                             覆盖导入                  │
│                             合并导入                  │
└──────────────────────────────────────────────────────┘
```

- "添加权限"不再需要单独按钮——直接在权限树中勾选
- "删除权限"不再需要单独按钮——直接在权限树中取消勾选
- "从模板创建"替代手动的逐条勾选
- "重置为默认"仅 superUser 可见

#### 变更 6：搜索增强

**现状**：纯字符串匹配
**改为**：

- 支持按权限名称、模块名、业务域名搜索
- 搜索结果高亮匹配的模块组并自动展开
- 搜索时输入联想（autocomplete）
- 支持"业务场景"标签搜索（如搜索"客服"返回所有客服相关权限）

#### 变更 7：权限预览面板

在权限分配区域顶部，显示当前角色已授权模块数的汇总：

```text
角色权限摘要：已授权 8 个业务域 / 45 条权限
```

同时增加两个状态提示：

- `未保存变更：+12 / -3`
- `不可用权限：6 项（当前组织 VIP 等级不足）`

#### 变更 8：显式展示“不可用”而不是“看不见”

现状中组织端会把部分 VIP 权限直接过滤掉，用户会误以为系统没有该权限。新方案首版建议改为：

- 默认展示全部权限分组。
- VIP 不满足的权限以禁用态显示。
- 在模块或业务域层级展示“需会员等级 X”提示。
- 保留一个“仅看可分配权限”的筛选开关，避免视图过密。

### 3.4 去掉/精简的功能

| 功能 | 决策 | 原因 |
| ------ | ------ | ------ |
| "更多"下拉菜单 | **去掉** | 操作入口扁平化到工具栏 |
| AuthorityDrawer（编辑单个权限） | **保留在"全部权限"Tab** | 与角色赋权无关，属于权限元数据管理 |
| 表格分页 | **去掉** | 改为分组树 + 虚拟滚动，无需翻页 |
| 表格列（UID/值/描述/VIP/时间） | **精简** | 权限赋权场景不需要这些列，移到 Tooltip 或二级详情 |
| 逐行删除按钮 | **去掉** | 改为在权限树中取消勾选 |

### 3.5 首版交互建议

为兼顾效率与可控性，首版建议采用以下交互：

1. 左侧继续保留 `RoleList`，只做轻量增强。
2. 右侧替换为“权限树 + 顶部工具栏 + 底部保存区”。
3. 勾选行为先写本地草稿，不立即落库。
4. 页面底部或右下角固定显示：`放弃变更`、`保存变更`。
5. 角色切换前如有未保存变更，弹窗提醒。
6. 系统角色继续禁止修改，但要在页面头部明确展示“系统角色，只读”。

这比“纯即时保存”更接近企业后台真实使用习惯，也更容易灰度上线。

---

## 4. 实现方案

### 4.1 技术架构

```text
┌──────────────────────────────────────────────────────┐
│  pages/Dashboard/{Super,Team}/Role/index.tsx          │
│  (布局容器，不变)                                       │
├───────────────┬──────────────────────────────────────┤
│  RoleList     │  RolePermissionPanel (新组件)          │
│  (保留，微调)  │  ┌────────────────────────────────┐   │
│               │  │ PermissionToolbar (新)           │   │
│               │  │ - 搜索框                         │   │
│               │  │ - 模板下拉 [从模板创建]           │   │
│               │  │ - 复制自现有角色                  │   │
│               │  │ - 导入/导出/重置                  │   │
│               │  ├────────────────────────────────┤   │
│               │  │ PermissionGroupTree (新)         │   │
│               │  │ - 业务域分组                     │   │
│               │  │ - 模块级三态 checkbox            │   │
│               │  │ - 操作级 checkbox (展开)         │   │
│               │  │ - 虚拟滚动                      │   │
│               │  └────────────────────────────────┘   │
│               │  │ PermissionFooterBar (新)         │   │
│               │  │ - 变更摘要                       │   │
│               │  │ - 放弃 / 保存                    │   │
│               │  └────────────────────────────────┘   │
│               └──────────────────────────────────────┘ │
├──────────────────────────────────────────────────────┤
│  stores/core/role.ts  (保留，方法不变)                  │
│  apis/core/role.ts    (保留，API 不变)                  │
│  utils/permissionGroups.ts (新增)                     │
│  - 权限分组映射 (module → group)                       │
│  - 角色模板定义                                       │
│  - 搜索增强逻辑                                       │
└──────────────────────────────────────────────────────┘
```

### 4.2 实施阶段

#### 阶段 0：分组与交互 Spike（预计 0.5~1.0d）

- [ ] 校准 `PERMISSION_MODULE` 到业务域的最终映射，避免首版分组错误
- [ ] 对真实权限数据抽样，验证是否存在无法按 `MODULE_ACTION` 正确解析的例外值
- [ ] 明确“草稿态批量保存”与“即时保存”两种技术路径，首版确认采用草稿态
- [ ] 验证组织端 VIP 不足权限是否允许显示为禁用态而非继续过滤隐藏

#### 阶段 1：基础设施（预计 2.0d）

- [ ] 创建 `utils/permissionGroups.ts`：权限→业务域分组映射 + 角色模板定义
- [ ] 创建 `PermissionGroupTree` 组件：分组树 + 三级 checkbox
- [ ] 创建 `PermissionToolbar` 组件：搜索 + 模板/复制角色/导入/导出/重置
- [ ] 创建 `PermissionFooterBar` 组件：变更摘要 + 放弃/保存
- [ ] 创建 `RolePermissionPanel` 容器组件：组合 Toolbar + GroupTree + FooterBar
- [ ] 后端 API：无需改动（权限数据、角色分配接口不变）

#### 阶段 2：核心交互（预计 2.5d）

- [ ] 替换 `RoleAuthority` → `RolePermissionPanel`（保留 `RoleAuthority` 作为可回退方案）
- [ ] 实现模块级三态 checkbox（全选/部分选/未选）
- [ ] 实现草稿态权限编辑（本地勾选 → 计算 diff → 点击保存后统一提交）
- [ ] 实现权限搜索增强（分组匹配 + 高亮 + 自动展开）
- [ ] 实现角色模板应用功能
- [ ] 实现“从现有角色复制权限”功能
- [ ] 实现角色切换前的未保存变更拦截

#### 阶段 3：保留的 Tab 适配（预计 1.0d）

- [ ] "全部权限" Tab 保留 `AuthoritiesTable`（不受影响）
- [ ] "全部角色" Tab 保留 `RoleTable`（不受影响）
- [ ] `RoleModel` 仅负责角色基础信息，不耦合权限编辑

#### 阶段 4：过渡与清理（预计 1.0d）

- [ ] 同时保留新旧两种模式，通过 URL 参数或 feature flag 切换
- [ ] 收集用户反馈后，移除旧 `RoleAuthority` 组件

### 4.3 向后兼容

- 后端 API 完全不变，只改前端交互
- `AddRoleAuthoritiesDrawer` 暂时保留，作为兜底方案
- Store 和 API 层零改动
- 可在 `localStorage` 中加开关，支持灰度切换新旧 UI
- 导入/导出 JSON 格式保持不变，避免影响已有备份文件
- 平台版与组织版继续复用同一套组件，通过 `superUser` 控制行为差异

### 4.4 风险与缓解

| 风险 | 缓解措施 |
| ------ | --------- |
| 400+ 条权限一次性渲染性能 | 虚拟滚动 + 默认折叠非活跃分组 |
| 草稿与服务端状态不一致 | 保存前重新拉取一次角色详情或基于最新快照比对，再执行整包提交 |
| 分组定义与后端实际权限不同步 | 权限不在分组中的显示在"其他"分组，定期巡检 |
| 用户习惯变更阻力 | 保留旧 UI 作为可切换方案，新 UI 默认开启 |
| 角色切换导致草稿丢失 | 增加未保存变更提醒弹窗 |
| VIP 权限展示过多造成噪音 | 提供“仅看可分配”筛选开关 |

### 4.5 API 适配策略

首版前端建议优先采用以下接口组合：

1. 进入角色页或切换角色时：`queryRoleByUid()` 拉取完整角色详情。
2. 展示权限候选集时：`queryAuthoritiesByOrg()` 拉取权限列表。
3. 用户保存草稿时：统一走 `updateRole({ uid, authorityUids })` 做整包替换。
4. 导入权限时：继续沿用现有“匹配后整包替换/合并”的逻辑。
5. 重置权限时：继续走 `resetRoleAuthorities()`。

这样做的原因是：

- 与现有导入逻辑一致，风险更低。
- 能直接表达“当前角色的目标权限集合”。
- 避免逐项勾选时频繁调用 `addRoleAuthorities` / `removeRoleAuthorities`。

---

## 5. 权限分组详细定义

### 5.1 分组结构

```typescript
// utils/permissionGroups.ts

interface PermissionGroup {
  key: string;           // 分组唯一标识
  label: string;         // 显示名称 (i18n key)
  icon?: string;         // 图标 (可选)
  modules: string[];     // 包含的 PERMISSION_MODULE 值
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    key: 'org',
    label: 'i18n.permission.group.org',
    modules: ['USER', 'MEMBER', 'DEPARTMENT', 'GROUP', 'ORGANIZATION', 'ORGANIZATION_APPLY', 'TAG', 'ROLE', 'TOKEN'],
  },
  {
    key: 'service',
    label: 'i18n.permission.group.service',
    modules: ['AGENT', 'AGENT_SEAT', 'AGENT_SETTINGS', 'AGENT_STATUS', 'AGENT_STATUS_SETTING',
              'WORKGROUP', 'WORKGROUP_SETTINGS', 'WORKGROUP_ROUTING',
              'QUEUE', 'QUEUE_MEMBER', 'UNIFIED', 'UNIFIED_SETTINGS',
              'VISITOR', 'VISITOR_THREAD', 'CUSTOMER',
              'THREAD', 'MESSAGE',
              'THREAD_INVITE', 'THREAD_TRANSFER', 'THREAD_RATING', 'THREAD_SUMMARY',
              'THREAD_INTENTION', 'THREAD_EMOTION',
              'MESSAGE_TEMPLATE', 'MESSAGE_CORRECTION', 'MESSAGE_FEEDBACK',
              'MESSAGE_UNANSWERED', 'MESSAGE_LEAVE', 'MESSAGE_RATING', 'MESSAGE_PARSED',
              'CHANNEL_APP', 'HOLIDAY'],
  },
  {
    key: 'ticket',
    label: 'i18n.permission.group.ticket',
    modules: ['TICKET', 'TICKET_SETTINGS', 'PROCESS'],
  },
  {
    key: 'kbase',
    label: 'i18n.permission.group.kbase',
    modules: ['KBASE', 'ARTICLE', 'ARTICLE_ARCHIVE', 'BLOG', 'MATERIAL', 'TABOO', 'TABOO_MESSAGE',
              'QUICK_REPLY', 'QUICK_BUTTON', 'AUTO_REPLY_KEYWORD', 'AUTO_REPLY_FIXED',
              'WEBSITE', 'FILE', 'CHUNK', 'TEXT', 'FAQ', 'WEBPAGE'],
  },
  {
    key: 'ai',
    label: 'i18n.permission.group.ai',
    modules: ['ROBOT', 'ROBOT_SETTINGS', 'ROBOTTHREAD', 'LLM_PROVIDER', 'PROMPT',
              'TTS', 'ASR', 'ASR_HOTWORD', 'OCR', 'VOICE_CLONE'],
  },
  {
    key: 'workflow',
    label: 'i18n.permission.group.workflow',
    modules: ['WORKFLOW', 'WORKFLOW_SETTINGS', 'WORKFLOW_LOG', 'WORKFLOW_NODE', 'WORKFLOW_EDGE'],
  },
  {
    key: 'quality',
    label: 'i18n.permission.group.quality',
    modules: ['QUALITY_CHECK', 'QUALITY_PLAN', 'QUALITY_RULE', 'QUALITY_TASK', 'QUALITY_APPEAL', 'QUALITY_STATISTIC'],
  },
  {
    key: 'call',
    label: 'i18n.permission.group.call',
    modules: ['WEBRTC', 'VOICEMAIL'],
  },
  {
    key: 'crm',
    label: 'i18n.permission.group.crm',
    modules: ['LEAD', 'OPPORTUNITY', 'PRODUCT', 'CONTRACT', 'TENDER', 'CUSTOMER_COMPANY'],
  },
  {
    key: 'statistic',
    label: 'i18n.permission.group.statistic',
    modules: ['SERVICE_STATISTIC', 'TICKET_STATISTIC', 'AI_STATISTIC', 'CALL_STATISTIC'],
  },
  {
    key: 'settings',
    label: 'i18n.permission.group.settings',
    modules: ['SETTINGS', 'AUTHORITY', 'WEBHOOK', 'WEBHOOK_MESSAGE', 'UPLOAD',
              'NOTIFICATION', 'TOPIC_SUBSCRIPTION', 'NOTICE', 'ANNOUNCEMENT',
              'ACTION', 'CONNECTION', 'PUSH', 'FORM', 'FORM_RESULT',
              'EMAIL', 'EMAIL_TEMPLATE', 'EMAIL_PUSH', 'EMAILMESSAGE',
              'SMSPROVIDER', 'SMSTEMPLATE', 'SMS_PUSH',
              'CALENDAR', 'TASK', 'TASK_LIST', 'QUARTZ_TASK', 'FAVORITE',
              'ASSISTANT', 'BLACK', 'CATEGORY', 'CITY',
              'BOOKING', 'CONSUMER'],
  },
  {
    key: 'other',
    label: 'i18n.permission.group.other',
    modules: ['SHOP', 'GOODS', 'ORDER', 'FEEDBACK', 'COMPLAINT', 'OPINION', 'VOC_COMMENT'],
  },
];
```

### 5.2 角色模板定义

```typescript
interface RoleTemplate {
  key: string;
  label: string;
  description: string;
  icon: string;
  presetModules: string[];     // 模块名（自动赋予该模块下 5 种操作）
  presetPermissions: string[]; // 精确权限值（用于覆盖默认操作）
  operationFilter?: string[];  // 可选：限定仅生成部分操作，如 READ
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    key: 'super_admin',
    label: 'i18n.role.template.super_admin',
    description: 'i18n.role.template.super_admin.desc',
    icon: '👑',
    presetModules: [],     // 全模块
    presetPermissions: [], // 全权限
  },
  {
    key: 'agent',
    label: 'i18n.role.template.agent',
    description: 'i18n.role.template.agent.desc',
    icon: '💬',
    presetModules: ['AGENT', 'THREAD', 'MESSAGE', 'VISITOR', 'CUSTOMER', 'QUICK_REPLY', 'QUICK_BUTTON'],
    presetPermissions: ['AGENT_READ', 'AGENT_UPDATE',
                        'THREAD_READ', 'THREAD_UPDATE', 'MESSAGE_READ',
                        'VISITOR_READ', 'VISITOR_THREAD_READ',
                        'CUSTOMER_READ', 'CUSTOMER_UPDATE',
                        'QUICK_REPLY_READ', 'QUICK_BUTTON_READ',
                        'TICKET_READ', 'TICKET_CREATE'],
  },
  {
    key: 'ticket_processor',
    label: 'i18n.role.template.ticket_processor',
    description: 'i18n.role.template.ticket_processor.desc',
    icon: '🎫',
    presetModules: ['TICKET', 'PROCESS'],
    presetPermissions: ['CUSTOMER_READ', 'THREAD_READ', 'MESSAGE_READ'],
  },
  {
    key: 'kbase_admin',
    label: 'i18n.role.template.kbase_admin',
    description: 'i18n.role.template.kbase_admin.desc',
    icon: '📚',
    presetModules: ['KBASE', 'ARTICLE', 'FAQ', 'BLOG', 'MATERIAL', 'FILE', 'CATEGORY'],
    presetPermissions: [],
  },
  {
    key: 'ai_configurator',
    label: 'i18n.role.template.ai_configurator',
    description: 'i18n.role.template.ai_configurator.desc',
    icon: '🤖',
    presetModules: ['ROBOT', 'ROBOT_SETTINGS', 'LLM_PROVIDER', 'PROMPT'],
    presetPermissions: ['TTS_READ', 'ASR_READ', 'ASR_HOTWORD_READ', 'VOICE_CLONE_READ'],
  },
  {
    key: 'viewer',
    label: 'i18n.role.template.viewer',
    description: 'i18n.role.template.viewer.desc',
    icon: '👀',
    presetModules: [],  // 所有模块
    presetPermissions: [],
    operationFilter: ['READ'],  // 仅赋予 READ 操作
  },
  {
    key: 'quality_inspector',
    label: 'i18n.role.template.quality_inspector',
    description: 'i18n.role.template.quality_inspector.desc',
    icon: '✅',
    presetModules: ['QUALITY_CHECK', 'QUALITY_PLAN', 'QUALITY_RULE', 'QUALITY_TASK'],
    presetPermissions: ['THREAD_READ', 'TICKET_READ', 'MESSAGE_READ', 'QUALITY_APPEAL_READ', 'QUALITY_STATISTIC_READ'],
  },
];
```

---

## 6. 新旧对比总结

| 维度 | 现状 | 新方案 |
| ------ | ------ | -------- |
| 添加权限步骤 | 打开抽屉 → 搜索 → 翻页 → 逐条勾选 → 确认（5+ 步） | 在分组树中直接勾选（1 步） |
| 批量操作 | 逐行勾选 → 更多 → 删除（3 步） | 模块组级全选/取消（1 步） |
| 权限发现 | 400+ 条平铺列表 | 12 个业务域分组 + 折叠 |
| 新手引导 | 无 | 7 种角色模板一键应用 |
| 操作入口 | "更多"下拉 | 工具栏扁平展示 |
| 搜索能力 | 字符串匹配 | 分组匹配 + 自动展开 + 联想 |
| 角色复制 | 不支持 | 支持从已有角色复制权限 |

---

## 7. 需要新增的 i18n Keys

以下为实施时需要新增的国际化 key（分布在 `locales/zh-CN/role.ts` 等文件中）。`PERMISSION_MODULE` 中已有的权限名称/操作翻译不需要改动。

```typescript
// 业务域分组名称
"i18n.permission.group.org"           // 组织与成员
"i18n.permission.group.service"       // 在线客服
"i18n.permission.group.ticket"        // 工单管理
"i18n.permission.group.kbase"         // 知识库
"i18n.permission.group.ai"            // AI 与机器人
"i18n.permission.group.workflow"      // 工作流
"i18n.permission.group.quality"       // 质检管理
"i18n.permission.group.call"          // 呼叫中心
"i18n.permission.group.crm"           // CRM
"i18n.permission.group.statistic"     // 数据分析
"i18n.permission.group.settings"      // 系统设置
"i18n.permission.group.other"         // 其他

// 角色模板
"i18n.role.template.super_admin"       // 超级管理员
"i18n.role.template.agent"             // 客服专员
"i18n.role.template.ticket_processor"  // 工单处理员
"i18n.role.template.kbase_admin"       // 知识库管理员
"i18n.role.template.ai_configurator"   // AI 配置员
"i18n.role.template.viewer"            // 只读观察员
"i18n.role.template.quality_inspector" // 质检员
// 每个模板还需对应的 .desc key

// 新增 UI 文案
"role.permission.summary"             // 角色权限摘要
"role.permission.unsaved"             // 未保存变更
"role.permission.unavailable.vip"     // 不可用：当前组织 VIP 等级不足
"role.permission.vipRequired"         // 需会员等级 {level}
"role.permission.filter.availableOnly" // 仅看可分配权限
"role.permission.discard"             // 放弃变更
"role.permission.save"                // 保存变更
"role.permission.copyFrom"            // 复制自
"role.permission.copy.selectRole"     // 选择来源角色
"role.permission.selectAll"           // 全选
"role.permission.deselectAll"         // 取消全选
"role.permission.changes.added"       // +{count}
"role.permission.changes.removed"     // -{count}
"role.permission.unsaved.leave"       // 有未保存的权限变更，确定要切换角色？
"role.system.readonly"                // 系统角色，只读
```

### 翻译工作量

- 中文（zh-CN）：约 **30 条**新增 key → 约 2 小时
- 英文（en-US）：约 **30 条**新增 key → 约 2 小时
- 日文（ja-JP）：约 **30 条**新增 key → 约 2 小时
- 繁体中文（zh-TW）：约 **30 条**新增 key → 约 2 小时

---

## 8. 本规划不包含（明确边界）

以下内容**不在首版范围内**，避免实施时范围蔓延：

- ❌ 后端 API 修改（权限分组字段、批量分配接口等）
- ❌ 后端权限模型变更（如新增 PermissionSet / Profile 概念）
- ❌ 权限依赖关系/互斥规则的前端校验
- ❌ 权限变更审计日志的可视化
- ❌ 权限模拟器（"以某角色身份预览菜单"）
- ❌ 移动端/响应式适配的额外优化
- ❌ "全部权限" Tab 的交互重设计
- ❌ 全局搜索（跨所有角色的权限搜索）

这些可以作为后续迭代的候选需求。

---

## 9. 验收标准

规划确认后，代码实施阶段建议以以下标准验收：

1. 选择一个角色后，用户能在同一屏内完成权限查看、搜索、分组勾选、保存。
2. 给“客服专员”新增一整组工单权限时，不再需要打开独立抽屉逐条翻页勾选。
3. 用户能清楚看见哪些权限因 VIP 不足而不可分配，而不是完全不可见。
4. 用户修改多项权限后，能在保存前看到变更摘要并选择放弃。
5. 新 UI 在平台版与组织版都可正常工作，且不影响“全部权限”“全部角色”两个 Tab。
6. 导入/导出/重置/system role 锁定能力不回退。
7. 大量权限场景下滚动、搜索与展开操作保持可接受性能。

---

## 10. 确认清单

请确认以下设计决策：

- [ ] **权限分组方案**：12 个业务域划分是否合理？是否有需要调整的归类？
- [ ] **三级粒度**：模块组 → 模块 → 操作，是否需要更简化为两级（模块组 → 模块）？
- [ ] **保存策略**：是否同意首版改为“草稿态批量保存”，而不是“每次勾选即保存”？
- [ ] **角色模板**：7 种模板是否满足需求？是否还有其他常见角色场景？
- [ ] **复制角色**：是否同意把“从现有角色复制权限”列为比模板更高的优先级？
- [ ] **向后兼容**：是否接受先做新 UI，保留旧 UI 作为灰度切换？
- [ ] **"全部权限"和"全部角色" Tab**：这两个 Tab 是否保持不变？
- [ ] **实施优先级**：阶段 0→1→2→3→4 的顺序是否合理？
