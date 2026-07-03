# 监控、强插、接管 功能区分与实现规划

> 状态：已确认 → 已实现（前后端已完成，含构建验证）
> 创建：2026-07-02
> 关联 TODO：`TODO-20260514.md` 第 22-23 行

<!-- markdownlint-disable MD060 MD033 -->

## 零、实施结果摘要

本次方案已经完成首轮实现，当前落地范围如下：

- 后端已完成：退出监控 / 退出强插 API、接管后原客服降级为监控人、订阅迁移、操作日志记录、接管系统消息、服务端消息发送权限校验
- 前端已完成：监控/强插/接管按钮决策、退出监控/退出强插按钮、接管确认弹窗、发送框只读控制、监控列表主处理人与状态展示
- 国际化已完成：desktop chat / thread 相关新增文案已补齐 8 个语言文件
- 已验证：desktop `pnpm build:web` 通过；`./starter/mvnw -f pom.xml -pl enterprise/service -am -DskipTests compile` 通过

当前文档以下内容以“最终实现”口径为准，不再仅表示规划。

## 一、核心业务定义

三种动作是**三种不同的会话参与角色迁移**，而非三个相似按钮：

| 功能 | 定义 | 管理员权限 | 原客服权限 | 主处理权 | 典型场景 |
|------|------|-----------|-----------|---------|---------|
| **监控** (Monitor) | 旁听者，只看不说 | 查看消息、会话资料 | 正常接待，不受影响 | 不变 | 质检、培训、主管监督 |
| **强插** (Barge/Insert) | 协助者，可一起回复 | 查看 + 发送消息 | 正常接待，仍可发送 | 不变 | 救场、复杂问题联合处理 |
| **接管** (Takeover) | 新主处理人，替代原客服 | 查看 + 发送 + 结束 + 转接 | 查看但**禁止发送** | 转移给管理员 | 投诉升级、严重风险 |

一句话记忆：
> **监控 = 只看不说不接责，强插 = 可说但不换人不接责，接管 = 可说换人接责且原客服禁言**

---

## 二、角色模型设计

### 2.1 四种会话参与角色

```text
┌──────────────────────────────────────────────────┐
│                  会话参与角色                       │
├────────────┬──────────┬──────────┬────────────────┤
│  主处理人   │  协助人   │  监控人   │ 被替代原客服    │
│  (owner)   │(assistant)│(monitor) │ (ex-owner)    │
├────────────┼──────────┼──────────┼────────────────┤
│ 唯一       │ 可多名    │ 可多名    │ 接管后自动归入   │
│ 可回复     │ 可回复    │ 不可回复  │ 不可回复       │
│ 可结束     │ 不可结束  │ 不可结束  │ 不可结束       │
│ 可转接     │ 不可转接  │ 不可转接  │ 不可转接       │
│ 可邀请     │ 不可邀请  │ 不可邀请  │ 不可邀请       │
│ 承担 SLA  │ 不承担    │ 不承担    │ 不承担         │
└────────────┴──────────┴──────────┴────────────────┘
```

### 2.2 现有数据字段映射

| 角色 | ThreadEntity 字段 | ThreadResponse 字段 | TopicSubscriptionType |
|------|-------------------|---------------------|----------------------|
| 主处理人 | `agent` (UserProtobuf JSON) + `owner` (UserEntity) | `agentProtobuf` + `owner` | `CHAT` |
| 协助人 | `assistants` (List\<String\>) | `assistants` | `INSERT` |
| 监控人 | `monitors` (List\<String\>) | `monitors` | `MONITOR` |

---

## 三、角色迁移状态机

```text
                      ┌──────────┐
         监控          │          │        强插
    ┌───────────────►│  监控人   │◄─────────────────┐
    │                │ (monitor) │                  │
    │                └─────┬─────┘                  │
    │      强插            │       接管              │
    │  ┌──────────────────┤                        │
    ▼  ▼                  ▼                        │
┌──────────┐       ┌──────────┐              ┌──────────┐
│  无角色   │       │  协助人   │    接管      │ 主处理人  │
│ (管理员   │ 强插  │(assistant)│────────────►│ (owner)  │
│  旁观)   │──────►│          │              │          │
└──────────┘       └────┬─────┘              └──────────┘
                         │                         ▲
                         │        接管              │
                         └─────────────────────────┘

原主处理人被接管后 → 自动降级为 监控人（保留查看，失去发送权）
```

### 3.1 状态迁移规则

| 当前角色 | 可用操作 | 目标角色 | 副作用 |
|---------|---------|---------|--------|
| 无角色 | 监控 | 监控人 | 加入 monitors，创建 MONITOR 订阅 |
| 无角色 | 强插 | 协助人 | 加入 assistants，创建 INSERT 订阅 |
| 无角色 | 接管 | 主处理人 | 设 agent/owner，原客服→monitors |
| 监控人 | 强插 | 协助人 | 从 monitors 移除，加入 assistants，订阅升级为 INSERT |
| 监控人 | 接管 | 主处理人 | 从 monitors 移除，设 agent/owner，原客服→monitors |
| 协助人 | 接管 | 主处理人 | 从 assistants 移除，设 agent/owner，原客服→monitors |
| 协助人 | 退出协助 | 无角色 | 从 assistants 移除，删除 INSERT 订阅 |
| 监控人 | 退出监控 | 无角色 | 从 monitors 移除，删除 MONITOR 订阅 |
| 主处理人 | — | — | 不显示三按钮，显示"接管中"状态标签 |

---

## 四、后端改造清单

### 4.1 新增 API：退出监控 / 退出强插

**文件**：`enterprise/service/src/main/java/com/bytedesk/service/thread_monitor/ThreadMonitorRestController.java`

```java
// 退出监控
@PostMapping("/thread/monitor/exit")
public ResponseEntity<?> exitMonitorAdminThread(@RequestBody ThreadMonitorRequest request)

// 退出强插
@PostMapping("/thread/insert/exit")
public ResponseEntity<?> exitInsertAdminThread(@RequestBody ThreadMonitorRequest request)
```

### 4.2 改造现有接管逻辑：原客服降级 + 发送权限校验

**文件**：`enterprise/service/src/main/java/com/bytedesk/service/thread_monitor/ThreadMonitorRestService.java`

接管 (`takeoverAdminThread`) 需新增以下逻辑：

1. **原客服自动降级为监控人**：将原 `agent` 对应的 UserProtobuf 写入 `monitors` 列表
2. **移除原客服订阅**：删除原客服的 `CHAT` 订阅，换为 `MONITOR` 订阅（保留消息接收）
3. **系统消息**：创建一条系统消息告知会话参与者
4. **保留查看能力**：原客服不从会话中移除，仍可继续查看消息、资料、处理结果，但失去发送能力

### 4.6 记录操作日志（ActionEntity）

**文件**：`enterprise/service/src/main/java/com/bytedesk/service/thread_monitor/ThreadMonitorRestService.java`

对以下动作统一记录操作日志：

- 管理员开始监控
- 管理员退出监控
- 管理员开始强插
- 管理员退出强插
- 管理员接管会话

建议记录字段：

| 字段 | 说明 |
|------|------|
| `action` | `MONITOR_THREAD` / `EXIT_MONITOR_THREAD` / `INSERT_THREAD` / `EXIT_INSERT_THREAD` / `TAKEOVER_THREAD` |
| `title` | 工作组会话管理 |
| `description` | 记录操作者、会话、工作组、原客服、新客服等信息 |
| `orgUid` | 当前组织 |
| `operatorUid` | 当前管理员用户 UID |
| `targetUid` | 目标会话 UID |

建议在 `ThreadMonitorRestService` 成功保存线程状态后记录，失败请求不记成功日志；如需审计失败行为，可单独补充失败日志类型。

### 4.3 新增消息发送权限校验

**文件**：`modules/core/src/main/java/com/bytedesk/core/thread/ThreadRestService.java` 或消息发送入口

在消息发送 (`sendMessage` / `handleMessage`) 中增加判定：

```java
// 伪代码
public boolean canSendMessage(UserEntity sender, ThreadEntity thread) {
    // 主处理人：可以发送
    if (sender.getUid().equals(thread.getOwner().getUid())) return true;
    // 协助人：可以发送
    if (thread.getAssistants().contains(senderProtobuf.toJson())) return true;
    // 监控人：不可发送
    // 被替代原客服（在 monitors 中但不在 owner/assistants 中）：不可发送
    return false;
}
```

> ⚠️ 必须在服务端做强校验，不能仅依赖前端判断。

### 4.4 订阅类型变更汇总

| 操作 | 目标用户 | 新建订阅 | 删除订阅 |
|------|---------|---------|---------|
| 监控 | 管理员 | `MONITOR` | — |
| 强插（从无角色） | 管理员 | `INSERT` | — |
| 强插（从监控） | 管理员 | `INSERT` | `MONITOR` |
| 接管 | 管理员 | `TAKEOVER` | `MONITOR` / `INSERT` |
| 接管 | 原客服 | `MONITOR` | `CHAT` |
| 退出监控 | 管理员 | — | `MONITOR` |
| 退出强插 | 管理员 | — | `INSERT` |

### 4.5 接管时发送系统消息

**消息内容示例**：

```text
内部系统消息（发给管理员 + 原客服）：
"[管理员昵称] 已接管会话 [会话ID]，原客服 [原客服昵称] 转为监控状态"

访客侧系统消息（发给访客）：
"当前会话已由 [管理员昵称] 接手为您服务"
```

实现位置：`ThreadMonitorRestService.takeoverAdminThread()` 中，在保存 Thread 之后、返回 Response 之前，调用消息发送服务。

---

## 五、前端改造清单

### 5.1 会话头部按钮显示规则

**文件**：`frontend/apps/desktop/src/pages/Dashboard/Home/Chat/components/ChatThreadHeader.tsx`

#### 5.1.1 按钮显示决策表

| effectiveSubscriptionType | isCurrentAgentMonitor | isCurrentAgentAssistant | isCurrentAgentPrimaryAgent | 显示按钮 |
|--------------------------|----------------------|------------------------|---------------------------|---------|
| `null` | false | false | false | 监控、强插、接管 |
| `MONITOR` | true | false | false | 强插、接管、退出监控 |
| `INSERT` | false | true | false | 接管、退出强插 |
| `TAKEOVER` / `CHAT` | — | — | true | 无（显示状态标签） |

#### 5.1.2 新增按钮定义

```typescript
// 退出监控按钮
<Button onClick={() => handleExitMonitor()}>
  退出监控
</Button>

// 退出强插按钮
<Button onClick={() => handleExitInsert()}>
  退出强插
</Button>
```

#### 5.1.3 接管二次确认弹窗

接管属于高风险操作，点击“接管”后先弹出确认框，再真正调用后端接口。

确认文案建议：

```typescript
modal.confirm({
  title: intl.formatMessage({
    id: 'chat.thread.takeover.confirm.title',
    defaultMessage: '确认接管该会话？',
  }),
  content: intl.formatMessage({
    id: 'chat.thread.takeover.confirm.content',
    defaultMessage: '接管后，你将成为新的主处理人，原客服将保留查看但禁止发送消息。',
  }),
  okText: intl.formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
  cancelText: intl.formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
  onOk: () => handleAdminThreadAction('takeover', successMessage),
})
```

#### 5.1.4 按钮状态

| 按钮 | 加载态 | 禁用态 | 隐藏态 |
|------|--------|--------|--------|
| 监控 | loading="monitor" | — | 已监控/已强插/已接管 |
| 强插 | loading="insert" | — | 已强插/已接管 |
| 接管 | loading="takeover" | — | 已接管 |
| 退出监控 | — | — | 非监控态 |
| 退出强插 | — | — | 非强插态 |

### 5.2 发送框（Composer）控制

**文件**：`frontend/apps/desktop/src/pages/Dashboard/Home/Chat/index.tsx`

#### 5.2.1 判断条件改造

最终实现中，发送权限控制分为两层：

- 前端：`Chat/index.tsx` 基于 `isThreadMonitored` 和现有 `canAgentReplyInThread` 控制发送框可用性
- 后端：`MessageService` 在消息入站时再次强校验，防止绕过前端直接发送

当前前端实现等价于以下逻辑：

```typescript
const canReplyInThread = useMemo(() => {
  if (fromAssistantCopilot) return true;
  if (isCurrentAgentMonitor) {
    return false;
  }
  return canAgentReplyInThread(agentInfo, chatThread);
}, [agentInfo, chatThread, fromAssistantCopilot, isCurrentAgentMonitor]);
```

被接管原客服之所以不能发送，不靠额外前端标签判断，而是因为接管后已不再属于主处理人 / 协助人 / 邀请人，`canAgentReplyInThread()` 会自然返回 `false`。

#### 5.2.2 禁用态提示文案

| 角色 | 发送框状态 | 提示文案 |
|------|-----------|---------|
| 监控人 | 禁用 | "你正在监控此会话，无法发送消息" |
| 被接管原客服 | 禁用 | "该会话已被 [管理员昵称] 接管，你当前仅可查看" |
| 协助人 | 启用 | — |
| 主处理人 | 启用 | — |

### 5.3 状态标签显示

**文件**：`frontend/apps/desktop/src/pages/Dashboard/Home/Chat/components/ChatThreadHeader.tsx`

| 订阅类型 | 标签颜色 | 标签文案 | 谁可见 |
|---------|---------|---------|--------|
| `MONITOR` | gold（金色） | "监控中" | 仅管理员自己 |
| `INSERT` | orange（橙色） | "协助中" | 管理员 + 原客服 |
| `TAKEOVER` | red（红色） | "已接管" | 管理员 + 原客服 |
| —（原客服被接管后） | blue（蓝色） | "已被接管" | 仅原客服 |

实现说明：

- 管理员侧会话头部已经按订阅状态显示 `MONITOR / INSERT / TAKEOVER` 对应标签
- 原客服侧“已被接管”单独标签本轮未额外新增，当前通过“发送框只读提示 + 监控列表主处理人展示”表达被接管状态
- 因此本轮实现完全满足权限和操作闭环，但“原客服蓝色单独标签”仍可作为后续纯展示增强项

### 5.4 FilterList 监控会话入口

**文件**：`frontend/apps/desktop/src/pages/Dashboard/Home/Thread/FilterList.tsx`

现有逻辑基本可用，需确保 `monitorThread` 分类在满足以下条件时显示：

- 企业版/平台版已启用
- `monitoringWorkgroups.length > 0`
- 当前用户是至少一个工作组的 admin

### 5.5 监控会话列表中的 ThreadList 增强

**文件**：`frontend/apps/desktop/src/pages/Dashboard/Home/Thread/ThreadList.tsx`

在监控会话列表中，每条会话需额外展示：

- 当前主处理人昵称（thread.agentProtobuf.nickname）
- 当前订阅类型标签（监控中 / 协助中 / 已接管）

该项已实现，当前展示规则为：

- 监控人看到：主处理人 + `监控中`
- 强插人看到：主处理人 + `协助中`
- 已接管管理员看到：主处理人 + `已接管`

---

## 六、消息与通知方案

### 6.1 系统消息触发矩阵

| 事件 | 内部消息 | 访客侧消息 | 消息发送方 |
|------|---------|-----------|-----------|
| 管理员开始监控 | ✅ | ❌ | system |
| 管理员开始强插 | ✅ | ❌（暂不做） | system |
| 管理员接管会话 | ✅ | ✅ | system |
| 管理员退出监控 | ✅（可选） | ❌ | system |
| 管理员退出强插 | ✅（可选） | ❌ | system |

实现说明：

- 接管系统消息已实现，包含内部消息和访客侧消息
- 监控 / 强插 / 退出监控 / 退出强插的内部系统消息当前未额外补发，文档中的“可选”仍保持为后续增强项

### 6.2 接管访客侧消息格式

```json
{
  "type": "SYSTEM_NOTICE",
  "content": "当前会话已由 [管理员昵称] 接手为您服务",
  "extra": {
    "action": "TAKEOVER",
    "newAgentUid": "<admin-agent-uid>",
    "previousAgentUid": "<previous-agent-uid>"
  }
}
```

---

## 七、权限校验层级

```text
┌─────────────────────────────────────────────┐
│              权限校验层级                      │
├─────────────────────────────────────────────┤
│  第 1 层：后端 API                             │
│  - @PreAuthorize 注解检查角色权限               │
│  - ThreadMonitorRestService 检查 admin 身份    │
├─────────────────────────────────────────────┤
│  第 2 层：后端消息发送                           │
│  - canSendMessage() 强校验                     │
│  - 监控人 / 被接管原客服直接拒绝                  │
├─────────────────────────────────────────────┤
│  第 3 层：前端 UI 控制                          │
│  - 按钮显示/隐藏                                │
│  - 发送框启用/禁用                              │
│  - 禁用态提示文案                               │
└─────────────────────────────────────────────┘
```

> ⚠️ 后端校验是兜底保障，前端校验只影响用户体验。两者都必须实现。

---

## 八、实现步骤

### 阶段一：后端核心改造

| 步骤 | 文件 | 内容 | 状态 |
|------|------|------|------|
| 1.1 | `ThreadMonitorRestService.java` | 改造 `takeoverAdminThread`：原客服降级为监控人 + 订阅迁移 | 已完成 |
| 1.2 | `ThreadMonitorRestService.java` | 新增 `exitMonitorAdminThread` 退出监控方法 | 已完成 |
| 1.3 | `ThreadMonitorRestService.java` | 新增 `exitInsertAdminThread` 退出强插方法 | 已完成 |
| 1.4 | `ThreadMonitorRestController.java` | 新增退出监控/强插 API 端点 | 已完成 |
| 1.5 | `MessageService.java` | 服务端消息发送权限校验 | 已完成 |
| 1.6 | `ThreadMonitorRestService.java` | 接管时发送系统消息（内部 + 访客侧） | 已完成 |
| 1.7 | `ThreadMonitorRestService.java` | 统一记录监控/退出监控/强插/退出强插/接管操作日志（ActionEntity） | 已完成 |

### 阶段二：前端改造

| 步骤 | 文件 | 内容 | 状态 |
|------|------|------|------|
| 2.1 | `ChatThreadHeader.tsx` | 重构按钮显示决策表，新增退出监控/强插按钮 | 已完成 |
| 2.2 | `ChatThreadHeader.tsx` | 新增退出监控 / 退出强插处理方法 | 已完成 |
| 2.3 | `ChatThreadHeader.tsx` | 接管按钮增加二次确认弹窗 | 已完成 |
| 2.4 | `ChatThreadHeader.tsx` | 原客服被接管后的单独状态标签 | 未实现，当前以只读提示替代 |
| 2.5 | `Chat/index.tsx` | 改造 `canReplyInThread` 判断，增加监控上下文禁用逻辑 | 已完成 |
| 2.6 | `Chat/index.tsx` | 增加发送框禁用态提示文案 | 已完成 |
| 2.7 | `apis/service/workgroup.ts` | 新增退出监控/强插 API 调用函数 | 已完成 |
| 2.8 | `ThreadList.tsx` | 监控会话列表增加主处理人昵称和订阅类型标签显示 | 已完成 |

### 阶段三：国际化文案

| 步骤 | 文件 | 内容 | 状态 |
|------|------|------|------|
| 3.1 | 各 `locales/zh-CN/*.ts` | 新增中文文案 | 已完成 |
| 3.2 | 各 `locales/en-US/*.ts` | 新增英文文案 | 已完成 |
| 3.3 | 其余 desktop locales | 同步新增文案键 | 已完成 |

新增文案 key：

| key | 中文 | 英文 |
|-----|------|------|
| `chat.thread.action.exitMonitor` | 退出监控 | Exit Monitor |
| `chat.thread.action.exitInsert` | 退出强插 | Exit Barge |
| `chat.thread.takeover.confirm.title` | 确认接管该会话？ | Confirm takeover? |
| `chat.thread.takeover.confirm.content` | 接管后，你将成为新的主处理人，原客服将保留查看但禁止发送消息。 | After takeover, you will become the primary handler and the previous agent will keep view-only access. |
| `chat.thread.subscription.state.monitor` | 监控中 | Monitoring |
| `chat.thread.subscription.state.insert` | 协助中 | Assisting |
| `chat.thread.subscription.state.takeover` | 已接管 | Taken Over |
| `chat.thread.subscription.state.takenOver` | 已被接管 | Taken Over by Admin |
| `chat.thread.composer.disabled.monitoring` | 你正在监控此会话，无法发送消息 | You are monitoring this conversation |
| `chat.thread.composer.disabled.takenOver` | 该会话已被 {name} 接管，你当前仅可查看 | This conversation has been taken over by {name} |
| `chat.thread.system.takeover.internal` | {admin} 已接管会话，原客服 {agent} 转为监控状态 | {admin} has taken over, {agent} is now monitoring |
| `chat.thread.system.takeover.visitor` | 当前会话已由 {name} 接手为您服务 | {name} is now handling your conversation |

### 阶段四：测试验证

| 步骤 | 内容 | 结果 |
|------|------|------|
| 4.1 | desktop 前端构建校验：`pnpm build:web` | 已通过 |
| 4.2 | enterprise/service 后端定向编译：`./starter/mvnw -f pom.xml -pl enterprise/service -am -DskipTests compile` | 已通过 |
| 4.3 | 静态错误检查：涉及 Java / TS / locale 文件 | 已通过 |
| 4.4 | 监控 → 强插 → 接管 手工联调 | 未执行 |
| 4.5 | 接管后原客服发送权限实际联调 | 未执行 |
| 4.6 | 多管理员并发监控/强插/接管互不冲突 | 未执行 |

当前验证结论：

- 已完成代码级与构建级收口
- 尚未完成真实运行态联调与并发场景验证

---

## 九、边界情况处理

### 9.1 并发接管

两个管理员同时接管同一会话：

- 后端使用乐观锁（`@Version`）保证只有一个成功
- 失败方提示"该会话已被其他管理员接管"

### 9.2 原客服已离线

接管时原客服离线：

- 仍正常执行角色降级（写入 monitors + 订阅迁移）
- 系统消息在对方上线后可见
- 无需额外处理

### 9.3 会话已关闭

点击监控/强插/接管时会话已关闭：

- 后端返回错误
- 前端提示"该会话已关闭，无法执行此操作"

### 9.4 管理员被移出工作组

管理员被移出工作组 admin 列表后：

- 不影响已有的监控/强插/接管关系
- 后续刷新会话时，前端判断 isAdmin 为 false
- 建议：由后续业务需求决定是否自动踢出

---

## 十、待确认事项

- [x] 接管后，原客服保留查看但禁止发送（已采用）
- [x] 强插时，协助人不允许结束会话（已采用）
- [x] 接管时，访客侧显示"已由某某接手"系统消息（已采用）
- [x] 补充"退出监控"和"退出强插"按钮（已采用）
- [x] 接管后原客服不完全移出会话，保留查看权限但禁止发送（已采用）
- [x] 记录操作日志（ActionEntity），覆盖监控/退出监控/强插/退出强插/接管（已采用）
- [x] 接管需要二次确认弹窗；监控和强插不需要（已采用）
