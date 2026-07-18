# 访客端 Ping 超时问题保守版实施规划

> 日期：2026-07-14
> 状态：✅ 全部完成
> 范围：visitor 前端 + service/core 后端最小必要改造
> 目标：先止血，再消除核心慢查询；不在首批实施中引入高复杂度一致性改造

## 1. 目标

本次采用保守实施路线，只做低风险、收益明确、易验证、易回滚的改造，优先解决访客端 `/visitor/api/v1/ping` 间歇性超时问题。

本规划的目标分两层：

1. 先降低 ping 请求量和前端请求堆积风险，尽快缓解用户侧超时弹窗。
2. 再收敛后端未读数查询路径，移除 ping 核心链路中的重查询与模糊匹配。

本规划明确不追求一次性完成“最优架构”，而是优先完成一条可灰度、可验证、可回滚的稳定修复路径。

## 1.1 当前实施进展

截至 2026-07-15，已完成以下落地与验证：

1. 已完成前端 ping 调度改造：STOMP 正常连接时跳过 HTTP ping，固定周期轮询改为串行调度，默认间隔调整为 30 秒，ping 使用独立短超时。
2. 已完成后端未读数查询第一版收敛：新增 `threadTopic` 精确查询路径，`/ping` 与 `/message/unread` 优先按当前会话 topic 进行精确查询与清理，同时保留旧调用方式兼容。
3. 已完成静态验证：visitor 前端 TypeScript 校验通过，`modules/core` 定向编译通过。
4. 已完成基础运行态验证：`/actuator/health` 正常，使用真实访客初始化与建会话后，带 `threadTopic` 的 `/visitor/api/v1/ping` 与 `/visitor/api/v1/message/unread` 调用返回 200；不带 `threadTopic` 的旧调用方式同样返回 200。
5. 已完成浏览器侧联调验证：使用 `http://127.0.0.1:9006/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn` 挂载聊天页，页面可正常建立会话并收到欢迎消息；连续观察 35 秒，浏览器资源记录中 `/visitor/api/v1/ping` 与 `/visitor/api/v1/message/unread` 请求数均为 0，符合 STOMP 常连时跳过 HTTP 心跳的预期；额外观察 5 秒未发现前端 console error 或 page error。
6. 已完成断连兜底验证：在浏览器侧人为阻断 `ws://127.0.0.1:9003/stomp` 后，机器人会话本身仍保持“不发 ping”的原有逻辑；触发“转人工客服”进入人工会话后，页面在 35 秒观察窗口内发出一次 `GET /visitor/api/v1/ping`，请求中包含 `threadTopic=org/workgroup/df_wg_uid/...`，说明 STOMP 断连后 HTTP ping 兜底链路已正常接管。
7. 已完成断连未读补偿联调：在同一人工会话中，由客服端页面向访客发送一条文本消息后，访客页在下一轮断连轮询窗口内先发起 `GET /visitor/api/v1/ping`，随后发起 `GET /visitor/api/v1/message/unread?clearUnread=true&orgUid=df_org_uid&threadTopic=org/workgroup/df_wg_uid/...`，说明“断连期间产生未读消息”的补偿链路已按预期触发。
8. 已补充客服端浏览器联调兼容修复：`frontend/apps/desktop` 中 Electron 注入对象访问增加空值保护，避免 `http://127.0.0.1:9005/agent/chat#/chat` 在非 Electron 浏览器联调时因 `window.electronAPI` 缺失而直接崩溃。
9. 已完成本地小规模并发验证：基于真实访客会话分别对 `ping` 与 `message/unread/count` 的精确路径和旧兼容路径做 `ab` 压测；在 `n=400,c=40` 条件下，`ping` 精确路径均值约 `23.3ms`、旧路径约 `29.0ms`，`message/unread/count` 精确路径均值约 `13.6ms`、旧路径约 `16.1ms`，四组测试均为 `0 failed requests`。该结果说明 `threadTopic` 精确查询在并发上来后仍有稳定收益，但 `ping` 本身的主要成本已不只来自未读计数链路。
10. 已完成访客心跳链路根因定位与代码修正：`/visitor/api/v1/ping` 仍会在每次请求中调用 `visitorRestService.updateStatus(uid, ONLINE)`；原实现仅执行 `status` 更新，既会形成高频重复写库，也不会可靠刷新离线扫描依赖的 `updatedAt`。现已在 `modules/service` 中完成修复：`VisitorEntity` 新增 `Long heartbeatAtMillis`（epoch 毫秒）字段，`updateStatus` 中对于重复 `ONLINE` 心跳按 60 秒节流，比较与写入均使用 `System.currentTimeMillis()`，零时区依赖、跨数据库兼容。
11. ✅ 已完成 heartbeat 节流运行态验证：两次紧接 ping 探针证实，第一次写 `heartbeat_at_millis` 从 NULL→epoch 值，第二次（60s 内）`heartbeat_at_millis` 不变且 `version`/`updated_at` 未因本方法产生增量写入。

## 1.2 最终文件变更清单

| 文件 | 类别 | 改动要点 |
| --- | --- | --- |
| `frontend/apps/visitor/src/pages/Chat/index.tsx` | 前端 | STOMP 在线跳过 HTTP ping / `setInterval`→`setTimeout` / 30s 周期 / 独立超时 |
| `frontend/apps/visitor/src/apis/core/message.ts` | 前端 | `sendPingMessage` 增加 `threadTopic` 参数 |
| `frontend/apps/visitor/src/pages/Chat/components/MessageRenderer.tsx` | 前端 | queue 完成后传递 `threadTopic` |
| `frontend/apps/desktop/src/hooks/useElectronApi.ts` | 前端 | 浏览器环境守卫 |
| `frontend/apps/desktop/src/utils/electronApiUtils.ts` | 前端 | `hasElectronApi()` |
| `frontend/apps/remote/src/hooks/useElectronApi.ts` | 前端 | 浏览器环境守卫 |
| `frontend/apps/remote/src/utils/electronApiUtils.ts` | 前端 | `hasElectronApi()` |
| `modules/core/.../MessageUnreadRequest.java` | 后端 | 新增 `threadTopic` 字段 |
| `modules/core/.../MessageUnreadRepository.java` | 后端 | exact `threadTopic` count/query/clear |
| `modules/core/.../MessageUnreadRestService.java` | 后端 | `threadTopic` 非空时走精确路径 |
| `modules/service/.../VisitorEntity.java` | 后端 | 新增 `Long heartbeatAtMillis`（epoch 毫秒） |
| `modules/service/.../VisitorRestService.java` | 后端 | `updateStatus` 60s heartbeat 节流，`System.currentTimeMillis()` 比较 |
| `modules/service/.../VisitorRepository.java` | 后端 | 恢复原始状态，零 MySQL 方言依赖 |

## 2. 当前问题判断

结合当前代码，问题主要集中在两层。

### 2.1 前端轮询模型会放大后端慢请求

当前访客端轮询逻辑位于：

[frontend/apps/visitor/src/pages/Chat/index.tsx](../../frontend/apps/visitor/src/pages/Chat/index.tsx)

现状特征：

1. 使用 `setInterval(async () => ...)` 固定周期轮询。
2. 前一次请求未结束时，下一次轮询仍会发起。
3. ping 返回未读数大于 0 时，还会继续调用未读明细接口。
4. 当前轮询周期为 10 秒，频率偏高。

这意味着一旦后端查询变慢，浏览器端会出现请求积压，进而放大超时概率。

### 2.2 后端 ping 查询路径过重

当前后端关键代码位于：

[modules/service/src/main/java/com/bytedesk/service/visitor/VisitorRestControllerVisitor.java](../../modules/service/src/main/java/com/bytedesk/service/visitor/VisitorRestControllerVisitor.java)

[modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadRestService.java](../../modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadRestService.java)

[modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadSpecification.java](../../modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadSpecification.java)

现状特征：

1. `/ping` 每次都会执行访客状态更新。
2. `/ping` 获取未读数时，当前实现通过分页查询实体后再取 `totalElements`。
3. 未读查询条件中包含前导 `%` 的模糊匹配，难以有效命中常规索引。
4. 未读明细查询与未读数查询复用了相同的查询思路。

这条链路决定了：即使前端不积压，只要数据量和并发上来，ping 仍然容易成为热点慢接口。

## 3. 实施原则

1. 先做低风险止血，不直接上 Redis 计数器等高一致性复杂度方案。
2. 首批实施避免扩大业务边界，只围绕 ping、未读数与访客状态保活做收敛。
3. 每一步都要求能单独上线、单独验证、单独回滚。
4. 优先保留现有接口契约，减少前后端联动成本。
5. 首批不引入大范围重构，不同时改造多条无关链路。

## 4. 本次建议实施范围

保守版只覆盖两个阶段。

### 4.1 第一阶段：前端止血

目标：减少 ping 请求量、消除前端堆积效应、降低用户侧超时弹窗。

建议改动：

1. 长连接正常时跳过 HTTP ping。
   复用现有 `stompIsConnected()` 能力，STOMP 正常时不再发起兜底 ping。

2. 将 `setInterval` 改为串行 `setTimeout` 递归调度。
   上一轮 ping 全部完成后，再安排下一轮，避免请求重叠。

3. 将轮询周期由 10 秒调整为 30 秒。
   仅在长连接断开或不稳定时作为 HTTP 兜底。

4. 为 ping 类接口使用更短的超时策略。
   心跳兜底接口不应占用 20 秒等待时间，首批建议使用独立超时配置。

5. 保持现有接口出参与业务行为不变。
   第一阶段不修改 `/ping` 接口协议，避免同时引入前后端协议变更。

### 4.2 第二阶段：后端最小必要收敛

目标：消除 `/ping` 核心链路中的重查询实现，避免继续依赖实体分页 + 模糊匹配统计未读数。

建议改动：

1. 为未读数统计补充专用 count 查询路径。
   不再通过 `queryByOrg(...).getTotalElements()` 获取数量。

2. 采用保守版后端路线：先做“精确 count + 必要索引”，暂不引入 Redis 计数器。

3. 首批后端建议优先采用过渡路线，而不是一次性上高侵入改表方案。
   即：优先通过 thread 精确定位后再 count，或者引入最小范围 schema 补充，经评审确认后再定最终技术实现。

4. 同步检查未读明细查询是否仍复用高成本条件。
   避免出现 ping count 变快，但 unread detail 仍是慢查询的半修复状态。

5. 保持 `/visitor/api/v1/ping` 对前端返回结构不变。

## 5. 本次明确不纳入首批实施的内容

以下内容有价值，但不纳入保守版第一批改造：

1. 不在首批中引入 Redis 未读计数器。
2. 不在首批中大范围重构消息未读模型。
3. 不在首批中同步改造所有历史查询接口。
4. 不在首批中扩展到更大范围的会话状态、消息状态重构。
5. 不在首批中默认引入复杂的降级一致性逻辑。

## 6. 关于访客在线状态的处理策略

访客在线状态逻辑当前存在独立风险，但保守版处理建议分步进行。

### 6.1 当前判断

当前离线扫描代码位于：

[modules/service/src/main/java/com/bytedesk/service/visitor/VisitorEventListener.java](../../modules/service/src/main/java/com/bytedesk/service/visitor/VisitorEventListener.java)

当前状态更新代码位于：

[modules/service/src/main/java/com/bytedesk/service/visitor/VisitorRepository.java](../../modules/service/src/main/java/com/bytedesk/service/visitor/VisitorRepository.java)

由于状态更新走的是 JPQL `update`，它不天然等同于一次实体保存，因此基于 `updatedAt` 的离线判断存在误判风险。进一步检查发现，原实现只更新 `status`，不会显式刷新 `updatedAt`；同时 `/ping` 会在每次请求中无条件执行一次 `ONLINE` 写入，这既增加了 `ping` 的剩余写库成本，也放大了在线状态误判风险。

### 6.2 保守版建议

首批不直接切 Redis 心跳模型，但当前已在代码层补入一版最小修复：

1. `ONLINE` 心跳写库改为显式刷新 `updatedAt`。
2. 对重复 `ONLINE` 心跳增加 60 秒节流，避免每次 `/ping` 都执行同质写入。

在此基础上，仍建议把更大范围的心跳模型调整列入紧邻后续项：

1. 先完成当前修复版本的运行态验证，确认 `updatedAt` 可随心跳刷新，且 `ping` 写库频率明显下降。
2. 再单独评审是否引入 Redis 心跳键模型。
3. 若后续真实流量仍显示写库成本偏高，再考虑把 visitor 心跳与在线状态判断进一步从数据库热路径剥离。

该项是否纳入首批实施，建议在最终评审时单独确认。

## 7. 分阶段实施步骤

### 阶段一：前端低风险止血

涉及位置：

[frontend/apps/visitor/src/pages/Chat/index.tsx](../../frontend/apps/visitor/src/pages/Chat/index.tsx)

[frontend/apps/visitor/src/apis/core/message.ts](../../frontend/apps/visitor/src/apis/core/message.ts)

实施内容：

1. 在轮询前判断 STOMP 是否已连接。
2. 将固定周期轮询改为串行递归调度。
3. 统一封装 ping 调度退出条件，避免组件卸载后继续触发。
4. 下调 ping 频率。
5. 为 ping 请求增加独立超时配置能力。

验收标准：

1. STOMP 正常连接期间，不再持续触发 `/visitor/api/v1/ping`。
2. 后端人为注入慢响应时，前端不会出现轮询重叠积压。
3. 聊天页正常收发消息、未读补偿、会话关闭提示不回归。

### 阶段二：后端查询路径收敛

涉及位置：

[modules/service/src/main/java/com/bytedesk/service/visitor/VisitorRestControllerVisitor.java](../../modules/service/src/main/java/com/bytedesk/service/visitor/VisitorRestControllerVisitor.java)

[modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadRestService.java](../../modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadRestService.java)

[modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadRepository.java](../../modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadRepository.java)

[modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadEntity.java](../../modules/core/src/main/java/com/bytedesk/core/message_unread/MessageUnreadEntity.java)

实施内容：

1. 增加未读数专用 repository 查询，不再走实体分页统计。
2. 将 ping 使用的未读数查询改为专用 count 路径。
3. 对未读明细查询的筛选方式进行最小必要修正，避免继续沿用高成本条件。
4. 评估并补充最小必要索引。
5. 若采用 schema 变更方案，则补充 Liquibase migration，并限定改造范围仅服务于本问题。

验收标准：

1. `/visitor/api/v1/ping` 在常规数据量下响应明显下降。
2. 未读数查询不再触发实体分页映射。
3. 未读明细链路与 count 链路不再共享同一条高成本模糊查询路径。
4. 前端对返回数据无感知，无需配套业务逻辑改写。

## 8. 技术决策建议

本规划建议采用以下保守决策。

### 8.1 前端部分

1. 必做：STOMP 在线时跳过 ping。
2. 必做：`setInterval` 改串行调度。
3. 必做：降频到更保守的轮询周期。
4. 建议做：为 ping 指定短超时。

### 8.2 后端部分

1. 必做：把未读数统计从分页实体查询中拆出来。
2. 必做：避免 ping 继续依赖前导模糊匹配计数。
3. 建议做：补最小必要索引。
4. 暂缓：Redis 未读计数器。
5. 暂缓：大范围未读模型重构。

### 8.3 在线状态部分

1. 本次先记录为高优先级相邻问题。
2. 是否纳入首批，同发布窗口一起确认。
3. 若不纳入首批，不阻塞 ping 性能修复上线。

## 9. 回滚策略

保守版必须保证每阶段都可以独立回滚。

### 9.1 前端回滚

1. 若新轮询策略引起消息补偿异常，可直接回退到旧轮询逻辑。
2. 前端改动不涉及数据结构迁移，回滚成本低。

### 9.2 后端回滚

1. 若仅新增 repository 查询与服务层切换，可通过代码回滚恢复旧逻辑。
2. 若新增索引，可保留索引不回滚代码，通常不影响运行。
3. 若新增字段或 migration，则必须准备对应 rollback 脚本或明确采用向前兼容发布。

## 10. 验证方案

### 10.1 功能验证

1. 访客进入聊天页，STOMP 正常建立连接。
2. STOMP 正常时不触发高频 ping。
3. 手动断开 STOMP 后，HTTP ping 能作为兜底继续工作。
4. 有未读消息时仍能正常拉取未读明细。
5. 会话关闭、客服离线、机器人会话等分支不回归。

### 10.2 性能验证

1. 对比改造前后 `/visitor/api/v1/ping` 平均响应时长。
2. 观察改造前后 ping 请求次数。
3. 观察改造前后慢 SQL 或 JPA 热点调用。
4. 观察浏览器端是否还有轮询重叠。

### 10.3 回归验证

1. 访客发消息与接收消息正常。
2. 未读补偿链路正常。
3. 聊天页切换、关闭、重开后无残留定时任务。
4. 工具栏、留言、工单等聊天页现有能力不受影响。

## 11. 风险与控制

### 11.1 前端风险

风险：STOMP 状态判断不准确，导致 ping 触发不足或过度。

控制：

1. 将 HTTP ping 明确定位为断连兜底，不与 STOMP 常态能力重复。
2. 保留足够保守的重试与恢复策略。

### 11.2 后端风险

风险：只优化 count，没有同步处理 unread detail，导致局部收益不完整。

控制：

1. 本次评审明确将 unread detail 一并纳入检查。
2. 不接受只改 ping count、放任下一跳继续慢查询的半修复方案。

### 11.3 数据库风险

风险：若采用 schema 变更，需评估加索引与回填成本。

控制：

1. 首批优先选择最小侵入方案。
2. 如需 migration，必须提供发布窗口与回滚预案。

## 12. 待确认事项

以下事项确认后再进入实施：

1. 首批是否只做“前端止血 + 后端 count 收敛”。
2. 后端阶段二采用“最小侵入过渡方案”还是“直接补 visitor 维度字段”。
3. 本次是否顺带修复访客在线状态误判问题。
4. 若涉及 schema 变更，是否允许在本次窗口执行 Liquibase migration。

## 13. 建议结论

建议按以下顺序推进：

1. 先确认本规划。
2. 先实施阶段一前端止血。
3. 再实施阶段二后端查询收敛。
4. 访客在线状态问题作为紧邻后续项，视发布窗口决定是否并入。

这条路线的优点是：

1. 收益快。
2. 风险可控。
3. 不需要一开始就引入高复杂度一致性方案。
4. 便于在真实流量下逐步验证每一步收益。
