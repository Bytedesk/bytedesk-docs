# TicketBasicSettings 提示语字段使用与移除规划

## 当前状态

截至 2026-07-30，本规划对应的代码收缩已经完成，当前状态如下：

- 已完成：后端删除 `agentTimeoutTip`、`visitorTimeoutTip` 字段及 DTO / 映射透传
- 已完成：前端 admin 设置表单删除两个字段
- 已完成：`admin` / `callAdmin` / `meetAdmin` / `qualityAdmin` 的类型定义已同步删除两个字段
- 已完成：上述管理端 locale 源文件中的对应文案 key 已删除
- 已完成：Liquibase 迁移已新增，删除数据库列 `agent_timeout_tip`、`visitor_timeout_tip`
- 已完成：Maven 编译验证通过 (`modules/ticket -am compile` — BUILD SUCCESS，264 源文件)
- 未完成：Liquibase 实际升级 / 前端构建级验证
- 说明：`frontend/apps/admin/src/.umi*` 中仍可见旧字段命中，属于生成缓存文件，未手工修改

## 目的

梳理 `TicketBasicSettings` 中四个提示语字段的实际使用情况，并据此给出可执行的字段收缩方案。

涉及字段：

- `accessTip`
- `closeTip`
- `agentTimeoutTip`
- `visitorTimeoutTip`

对应入口：

- 后端实体：`modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_basic/TicketBasicSettingsEntity.java`
- 前端组件：`frontend/apps/admin/src/pages/Dashboard/Ticket/Settings/components/TicketBasicSettings.tsx`

## 结论概览

| 字段 | 后端是否持久化 | 前端是否可编辑 | 是否有运行时消费逻辑 | 当前结论 |
| --- | --- | --- | --- | --- |
| `accessTip` | 是 | 是 | 是 | 保留 |
| `closeTip` | 是 | 是 | 是，但触发范围有限 | 保留 |
| `agentTimeoutTip` | 否 | 否 | 否 | 已删除 |
| `visitorTimeoutTip` | 否 | 否 | 否 | 已删除 |

## 当前使用情况

### 后端设置链路

四个字段当前都已经接入以下配置链路：

- `TicketBasicSettingsEntity`
- `TicketBasicSettingsRequest`
- `TicketBasicSettingsResponse`
- `TicketSettingsRestService`

也就是说，它们都支持：

- 配置保存
- 草稿复制 / 发布复制
- 响应回传

### `accessTip` 的实际运行时用途

文件：`modules/ticket/src/main/java/com/bytedesk/ticket/routing_strategy/TicketThreadRoutingStrategy.java`

实际作用：

1. 工单线程状态仍为 `NEW` 时执行 `handleTicketThreadNew(...)`
2. 读取 `basicSettings.getAccessTip()`
3. 若为空则兜底为默认接入提示语
4. 构造 `WelcomeContent`
5. 将线程状态切到 `CHATTING`
6. 发送结构化 welcome 消息给访客

结论：

- `accessTip` 已经真实参与运行时消息发送，不能按“未使用字段”处理。

### `closeTip` 的实际运行时用途

文件：`modules/ticket/src/main/java/com/bytedesk/ticket/routing_strategy/TicketThreadRoutingStrategy.java`

实际作用：

1. 当工单关联线程状态为 `CLOSED` 时读取 `basicSettings.getCloseTip()`
2. 调用 `getTicketThreadMessageReadOnly(thread, closeTip)`
3. 若没有历史消息，则用 `closeTip` 构造 `AGENT_CLOSED` 系统消息
4. 若 `closeTip` 为空，则使用默认关闭提示语兜底

结论：

- `closeTip` 已经真实参与已关闭会话的只读提示逻辑，不能删除。

### `agentTimeoutTip` 与 `visitorTimeoutTip` 的实际状态

全仓库检索结果显示，这两个字段目前只存在于：

- 实体字段
- 请求 DTO
- 响应 DTO
- 设置服务中的复制 / 回写 / 回传逻辑
- 前端类型定义
- 前端设置表单
- 多语言文案

未发现任何运行时消费点：

- 无定时任务读取
- 无线程超时逻辑读取
- 无消息发送逻辑读取
- 无 SLA 触发逻辑读取
- 无任何直接 `getAgentTimeoutTip()` / `getVisitorTimeoutTip()` 的业务执行路径

结论：

- 这两个字段当前属于“已建模但未启用”的死配置面。

## 当前文案与代码行为差异

有一个需要保留记录的实现差异：

- 前端说明文案中有“如留空则不主动发送”的表达。

但当前后端真实行为是：

- `accessTip` 为空时，后端会回退为默认接入提示语并发送
- `closeTip` 为空时，后端会回退为默认关闭提示语

因此本轮虽然不改 `accessTip` / `closeTip` 行为，但后续若继续清理设置语义，应同步修正文案或增加显式开关。

## 背景

基于以上使用情况，本轮只讨论“删除当前确实未使用的字段”，不顺带改变 `accessTip` / `closeTip` 的行为。

当前字段状态：

- `accessTip`：已投入运行时使用
- `closeTip`：已投入运行时使用
- `agentTimeoutTip`：仅配置透传，未投入运行时使用
- `visitorTimeoutTip`：仅配置透传，未投入运行时使用

本规划只讨论“删除当前确实未使用的字段”，不在本轮顺带改变 `accessTip` / `closeTip` 的行为。

## 目标

删除以下两个当前未投入运行时逻辑的字段，减少设置项、接口字段、前端表单和多语言文案噪音：

- `agentTimeoutTip`
- `visitorTimeoutTip`

同时保留以下字段：

- `accessTip`
- `closeTip`

## 删除决策依据

### 保留字段

#### `accessTip`

已在工单线程路由中实际使用：

- 文件：`modules/ticket/src/main/java/com/bytedesk/ticket/routing_strategy/TicketThreadRoutingStrategy.java`
- 作用：工单线程 `NEW -> CHATTING` 时生成 welcome 消息并发送给访客

#### `closeTip`

已在已关闭工单会话只读返回中实际使用：

- 文件：`modules/ticket/src/main/java/com/bytedesk/ticket/routing_strategy/TicketThreadRoutingStrategy.java`
- 作用：当线程已关闭且无历史消息时，作为关闭提示系统消息返回

### 已删除字段

#### `agentTimeoutTip`

当前仅存在于配置链路与前端展示链路：

- 实体字段
- 请求 DTO
- 响应 DTO
- 设置服务中的复制/回写/回传逻辑
- 前端类型定义
- 前端设置表单
- 多语言文案

未发现任何运行时消费点：

- 无定时任务读取
- 无线程超时逻辑读取
- 无消息发送逻辑读取
- 无 SLA 触发逻辑读取

#### `visitorTimeoutTip`

状态与 `agentTimeoutTip` 一致：

- 只进入配置链路
- 未进入任何运行时业务链路

因此，这两个字段被判定为“预留但未启用”的死配置面，并已在本轮完成收缩。

## 实施结果

## 后端

### 1. 实体与 DTO

已修改：

- `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_basic/TicketBasicSettingsEntity.java`
- `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_basic/TicketBasicSettingsRequest.java`
- `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings_basic/TicketBasicSettingsResponse.java`

已完成：

- 删除 `agentTimeoutTip`
- 删除 `visitorTimeoutTip`
- 删除 `fromRequest(...)` 中与这两个字段相关的默认值兜底逻辑

### 2. 设置透传服务

已修改：

- `modules/ticket/src/main/java/com/bytedesk/ticket/ticket_settings/TicketSettingsRestService.java`

已完成：

- 删除 `request -> entity` 的两个字段回写
- 删除 `source -> target` 的两个字段复制
- 删除 `entity -> response` 的两个字段映射

### 3. 运行时逻辑

本轮未修改：

- `TicketThreadRoutingStrategy`

原因：

- 运行时只直接使用 `accessTip` 和 `closeTip`
- 待删除的两个字段没有运行时代码依赖

## 前端

### 1. Admin 设置页源码

已修改：

- `frontend/apps/admin/src/pages/Dashboard/Ticket/Settings/components/TicketBasicSettings.tsx`
- `frontend/apps/admin/src/pages/Dashboard/Ticket/Settings/index.tsx`

已完成：

- 删除两个 `TextArea` 表单项
- 删除 `translatedSettings` 中对应字段
- 删除 `ensureBasicDefaults(...)` 中对应默认值
- 删除草稿编辑链路中的这两个字段

### 2. Ticket 设置类型定义

已修改：

- `frontend/apps/admin/src/@types/ticket/ticket_settings.d.ts`
- `frontend/apps/callAdmin/src/@types/ticket/ticket_settings.d.ts`
- `frontend/apps/meetAdmin/src/@types/ticket/ticket_settings.d.ts`
- `frontend/apps/qualityAdmin/src/@types/ticket/ticket_settings.d.ts`

实施说明：

- 这几个管理端 app 都保留了自己的 `ticket_settings.d.ts`
- 即便当前 UI 入口主要在 admin，也需要同步删除字段，避免多端类型漂移

### 3. 多语言文案

已修改的主要源文件：

- `frontend/apps/admin/src/locales/*/ticket.ts`
- `frontend/apps/callAdmin/src/locales/*/ticket.ts`
- `frontend/apps/meetAdmin/src/locales/*/ticket.ts`
- `frontend/apps/qualityAdmin/src/locales/*/ticket.ts`

已完成：

- 删除 `ticket.settings.basic.agentTimeoutTip*` 相关 key
- 删除 `ticket.settings.basic.visitorTimeoutTip*` 相关 key

说明：

- `dist/`、`.umi/`、`.umi-production/`、`.umi-test/` 中的命中均属于构建产物或生成文件，不作为手工修改源。

## 数据库与迁移结果

当前已确认并已完成的情况：

- 仓库迁移目录实际位于 `starter/src/main/resources/db/changelog/migration`
- 已新增迁移文件：`starter/src/main/resources/db/changelog/migration/260730_drop_ticket_basic_settings_unused_timeout_tips.xml`
- 已在 `starter/src/main/resources/db/changelog/master.xml` 中注册该迁移

迁移内容：

- 删除 `bytedesk_ticket_basic_settings.agent_timeout_tip`
- 删除 `bytedesk_ticket_basic_settings.visitor_timeout_tip`
- 两个 `changeSet` 均带 `tableExists + columnExists` 前置条件，支持幂等执行

当前仍未完成的部分：

- 尚未执行实际 Liquibase 升级验证
- 尚未通过应用启动验证迁移在目标数据库上顺利执行

## 推荐实施顺序

1. 删除后端 DTO 与 `TicketSettingsRestService` 对两个字段的透传。已完成。
2. 删除 `TicketBasicSettingsEntity` 中的两个字段及默认值兜底。已完成。
3. 删除 admin 设置页表单与默认值处理。已完成。
4. 删除多端 `ticket_settings.d.ts` 中两个字段。已完成。
5. 删除多端 locale 中对应 key。已完已完成，BUILD SUCCESS
6. 编译验证 `modules/ticket`。待执行。
7. 如前端环境允许，再做 admin 侧类型或构建验证。部分完成，仅完成编辑器诊断，未执行构建。
8. 最后决定是否补数据库 drop-column 迁移。已完成。

## 验证点

### 后端验证

- `./starter/mvnw -f pom.xml -pl modules/ticket -am -DskipTests compile`

当前状态：已执行，BUILD SUCCESS（264 源文件，无编译错误）。

目的：

- 确认实体、DTO、设置服务、路由引用没有残留编译错误

### 前端验证

优先验证：

- Admin 相关 TypeScript 错误检查

验证重点：

- `TicketBasicSettings.tsx`
- `Ticket/Settings/index.tsx`
- `@types/ticket/ticket_settings.d.ts`

当前状态：

- 已完成相关源码文件编辑器错误检查
- 未执行 `pnpm build`、`pnpm lint` 或完整 TypeScript 构建验证

说明：

- 多个管理端 app 共享相似类型与 locale 结构，删除字段后要特别注意是否还有未同步的引用

## 风险与注意事项

### 1. 不能误删 `accessTip` / `closeTip`

这两个字段仍然有实际业务用途，删除会直接影响工单线程提示行为。

### 2. 不能只删 admin 前端

虽然直接编辑入口主要在 admin，但类型与文案在 `callAdmin`、`meetAdmin`、`qualityAdmin` 也存在副本；只删一个 app 会留下编译或类型不一致风险。

### 3. 数据库迁移已补，但尚未执行升级验证

本轮已经补充 drop-column 迁移，但还没有在实际数据库上执行升级验证，因此仍需一次启动或 Liquibase 执行确认。

### 4. 文档要同步更新

删除后应同步更新已有说明文档，避免仍然写着这两个字段“预留待用”。

## 本轮最终状态

本轮已删除：

- `agentTimeoutTip`
- `visitorTimeoutTip`

本轮已保留：

- `accessTip`
- `closeTip`

本轮暂未处理：

- `accessTip` / `closeTip` 是否允许留空不发送
- 基于 SLA/超时机制重新引入 timeout 提示语
- Maven / 前端构建 / 数据库升级级别的最终可执行验证

## 已完成的代码变更范围

本轮已完成修改的范围：

- `modules/ticket/**/TicketBasicSettings*.java`
- `modules/ticket/**/TicketSettingsRestService.java`
- `frontend/apps/admin/src/pages/Dashboard/Ticket/Settings/**`
- `frontend/apps/*Admin/src/@types/ticket/ticket_settings.d.ts`
- `frontend/apps/*Admin/src/locales/*/ticket.ts`
- `starter/src/main/resources/db/changelog/migration/260730_drop_ticket_basic_settings_unused_timeout_tips.xml`
- `starter/src/main/resources/db/changelog/master.xml`
