# 线上 OOM 治理与 ServiceStatistic 性能优化规划

> 状态：✅ 第一批 + 第二批已完成，待部署验证  
> 创建：2026-08-03  
> 最后更新：2026-08-03 08:12  
> 触发事件：2026-08-03 03:30 线上服务器 `java.lang.OutOfMemoryError: Java heap space` 导致服务 DOWN  
> 线上规模：约 1500 个组织  
> 关联模块：`modules/core`、`modules/service`、`enterprise/service`、`enterprise/ticket`  
> 监控方式：Spring Boot Admin（`spring-boot-admin-starter-client`），Monitor Server 位于 `https://monitor.weiyuai.cn`

## 0. 背景

### 0.1 事件回顾

2026-08-03 03:30:00，Quartz 定时任务 `HalfHourJob` 触发 `ServiceStatisticEventListener` → `ServiceStatisticService.calculateTodayStatistics()`，该方法遍历所有组织（organizations）、工作组（workgroups）、客服（agents）、机器人（robots），对每个 scope 调用 `calculateStatistic()` → `aggregateStatisticRows()` → `loadQueueMemberStatisticRowsSlice()`，执行以下 JPQL 查询：

```sql
SELECT ... FROM QueueMemberEntity qm JOIN qm.thread t
WHERE qm.orgUid = :orgUid AND qm.deleted = false
AND qm.createdAt >= :startTime AND qm.createdAt <= :endTime
```

在遍历到约 03:30:58 时，JVM 堆内存耗尽，抛出 `java.lang.OutOfMemoryError: Java heap space`，引发级联雪崩：

- ActiveMQ Artemis 连接超时
- Quartz 调度器无法获取下一个 trigger
- JMS 消息监听器全部失败
- Druid 连接池回收异常
- Elasticsearch 健康检查失败
- 飞书 WebSocket 断开

进程 PID 未变（1862492），未完全崩溃但功能严重退化。

需要注意：当前 `deploy/docker/compose-app-bytedesk.yaml` 中默认关闭了 actuator Web 暴露和 health endpoint：

```yaml
MANAGEMENT_ENDPOINTS_ENABLED_BY_DEFAULT: "false"
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_EXCLUDE: '*'
MANAGEMENT_ENDPOINT_HEALTH_ENABLED: "false"
MANAGEMENT_SERVER_PORT: -1
```

因此线上 monitor 报警的具体探测方式需要单独确认：它可能检查业务端口、HTTP 页面、外部 nginx、Spring Boot Admin，或容器进程状态。OOM 是本次日志中的确定性根因，但监控链路也需要补齐，否则后续可能无法提前发现堆内存逼近上限。

### 0.2 根因分析

| 维度 | 分析 |
| ------ | ------ |
| **直接原因** | `calculateTodayStatistics()` 在单次 Quartz 任务中串行遍历所有 scope。每个 scope 都会新建一个 `StatisticAggregation`，因此问题不是跨 scope 持续持有 `QueueMemberStatisticRow`，而是单个大 scope 在统计过程中积累了过大的 `scopedThreadUids` 集合，并在后续质量指标阶段继续放大内存和查询压力 |
| **核心瓶颈** | `calculateTodayStatistics()` 对 **4 类实体**（organization / workgroup / agent / robot）做当日全量扫描；scope 总数增加后，总执行时间和总内存压力线性上升，而 organization 级别 scope 最容易成为单次 OOM 的触发点 |
| **次要因素** | `STATISTIC_BATCH_SIZE=1000` 对大组织偏大；`updateQualityMetrics()` 会基于 `scopedThreadUids` 先批量查询 ratings，再逐个 `threadUid` 调用 transfer count，形成明显的 `1 + N + N` 查询放大 |
| **查询特征** | 当前 Repository 查询使用 DTO 投影 `new QueueMemberStatisticRow(...)`，不会把完整实体图全部挂入持久化上下文，但单批结果、字符串 UID 集合和后续多轮 count 查询仍会显著占用堆内存与连接池资源 |
| **缺乏保护** | 无 scope 级别失败隔离、无任务限流/分段、无 OOM 后快速失败策略、无针对该任务的专用监控 |

### 0.3 受影响代码文件

| 文件 | 路径 | 说明 |
| ------ | ------ | ------ |
| 客服统计服务 | `enterprise/service/.../service_statistic/ServiceStatisticService.java` | 🔴 OOM 发生源 |
| 工单统计服务 | `enterprise/ticket/.../ticket_statistic/TicketStatisticService.java` | 🔴 同模式，同监听 `HalfHourJob`，潜在 OOM |
| 质检统计服务 | `enterprise/service/.../quality_statistic/QualityStatisticService.java` | 🟠 同模式，但仅 REST 触发，不在 `HalfHourJob` 路径上 |
| 客服统计监听器 | `enterprise/service/.../service_statistic/ServiceStatisticEventListener.java` | 监听 `QuartzHalfHourEvent` |
| 工单统计监听器 | `enterprise/ticket/.../ticket_statistic/TicketStatisticEventListener.java` | 监听 `QuartzHalfHourEvent` |
| Quartz 半点半 Job | `modules/core/.../quartz/job/QuartzHalfHourJob.java` | 事件发布源 |
| QueueMember Repository | `modules/service/.../queue_member/QueueMemberRepository.java` | 统计查询 |
| Quartz 配置 | `modules/core/.../quartz/QuartzConfig.java` | 定时调度配置 |

### 0.4 `HalfHourJob` 影响面排查结果

经代码核查，`QuartzHalfHourEvent` 被以下 listener 监听：

| Listener | 是否有实际逻辑 | 是否存在 OOM 风险 |
| ---------- | ---------------- | ------------------- |
| `ServiceStatisticEventListener` | ✅ 调用 `calculateTodayStatistics()` 遍历 4 类实体 | 🔴 已确认 OOM |
| `TicketStatisticEventListener` | ✅ 调用 `calculateTodayStatistics()` 遍历组织+部门+客服 | 🔴 同模式，`findAll()` 未过滤 `deleted`，潜在 OOM |
| `QualityStatisticEventListener` | ❌ 空类，不监听任何事件 | 无 |
| 渠道 listeners（douyin/shop/wechat/social 等 ~18 个） | ❌ handler 全部为空或仅注释 | 无 |

**结论**：第一批改造必须同时覆盖 `ServiceStatisticService` 和 `TicketStatisticService`，两者都在 `HalfHourJob` 路径上，代码模式一致。

### 0.5 监控链路确认

线上 monitor 使用 Spring Boot Admin 实现：

- Client 端：`starter/pom.xml` 引入 `spring-boot-admin-starter-client`
- prod 配置：`starter/src/main/resources/properties/prod/51-jpa-web-actuator.properties` 已启用 SBA client，注册到 `https://monitor.weiyuai.cn`
- Monitor 3:30 报警的原因：应用因 OOM 导致 heap 占满、GC 停顿、线程阻塞，SBA 健康检查超时无法响应，判定为 DOWN

⚠️ **配置矛盾**：`deploy/docker/compose-app-bytedesk.yaml` 中 actuator 默认全禁用且 SBA client 注释掉，与 prod properties 配置冲突。如线上使用 Docker 部署，SBA 可能无法正常采集指标。需确认线上实际部署方式（裸机 vs Docker）。

---

## 1. 优化步骤

### 阶段一：紧急止血（上线前必须完成）

#### 1.1 JVM 堆内存扩容

**范围**：部署配置 / 启动脚本  
**优先级**：🔴 P0 - 立即执行

- 将 `-Xmx` 从当前值上调至合理水平（建议 ≥ 4G，根据线上实际数据量评估）
- 同时建议显式设置 `-Xms` 与 `-Xmx` 一致，避免堆 resize 的 GC 开销
- 增加 `-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path/to/dumps`，便于后续分析

实际落点：

| 运行方式 | 当前入口 | 建议落点 |
| ---------- | ---------- | ---------- |
| Docker 镜像 | `starter/Dockerfile`：`ENTRYPOINT ["java","-jar","app.jar"]` | 优先在 compose 环境变量中增加 `JAVA_TOOL_OPTIONS`，Java 会自动读取；如要支持 `JAVA_OPTS`，需把 ENTRYPOINT 改为 shell 形式 |
| Docker Compose | `deploy/docker/compose-app-bytedesk.yaml` | 在 `bytedesk.environment` 下增加 `JAVA_TOOL_OPTIONS` |
| 裸机脚本 | `scripts/start.sh`、`scripts/restart.sh`、`cicd/start.sh`、`cicd/restart.sh` | 将 `java -jar` 改为 `java ${JAVA_OPTS:-} -jar`，并在环境中注入 `JAVA_OPTS` |

推荐 Docker 配置：

```yaml
JAVA_TOOL_OPTIONS: >-
    -Xms4g -Xmx4g
    -XX:+UseG1GC
    -XX:MaxGCPauseMillis=200
    -XX:+HeapDumpOnOutOfMemoryError
    -XX:HeapDumpPath=/app/logs/heapdumps
    -XX:+ExitOnOutOfMemoryError
```

`ExitOnOutOfMemoryError` 只应在确认有进程守护后启用：Docker 需要 `restart` 策略；裸机需要 `scripts/watchdog.sh`、systemd 或其他 supervisor 能自动拉起进程。

#### 1.2 HalfHourJob 添加运行失败兜底与更清晰日志

**范围**：`modules/core/src/main/java/com/bytedesk/core/quartz/job/QuartzHalfHourJob.java`  
**优先级**：🔴 P0 - 立即执行

当前 `executeInternal` 中未捕获普通运行时异常，日志上下文也不够集中。这里可以增加 job 级别日志和普通异常兜底，但需要明确：**`catch (Exception)` 不能拦住 `OutOfMemoryError`，因此它不是 OOM 根治手段，只是减少一般性失败对调度线程的影响。**

建议修改为：

```java
@Override
protected void executeInternal(JobExecutionContext context) {
    try {
        quartzEventPublisher.publishQuartzHalfHourEvent();
    } catch (Exception e) {
        log.error("HalfHourJob execution failed, will retry next schedule", e);
    }
}
```

补充说明：

- 不建议以捕获 `Throwable` 的方式“吞掉” OOM
- OOM 场景应依赖负载削减、JVM 参数和进程重启策略解决

#### 1.3 两个统计服务增加 scope 级别异常隔离

**范围**：`ServiceStatisticService.java` + `TicketStatisticService.java`  
**优先级**：🔴 P0 - 立即执行

当前两个 `handleQuartzHalfHourEvent` 只是转发调用，真正需要改的是各自 `calculateTodayStatistics()` 内部的循环。目标是让单个 scope 的数据库异常、数据异常不阻断后续 scope 的统计。

补充说明：

- 该隔离主要覆盖普通异常，不应声称能兜住 OOM
- 每个 scope 失败时需要打印 `type`、`orgUid`、`workgroupUid`、`agentUid`、`robotUid`，便于后续快速定位脏数据或热点组织
- `TicketStatisticService` 额外注意：当前使用 `findAll()` 而非 `findByDeletedFalse()`，建议同步修正

---

### 阶段二：核心优化（本周内完成）

#### 2.1 `calculateTodayStatistics()` 先改为分段串行执行，再评估是否异步化

**范围**：`ServiceStatisticService.java`  
**优先级**：🟠 P1

**方案 A（推荐）**：分段串行执行 + 单段可中断 + 每段完成即释放引用

```text
calculateTodayStatistics()
    ├── calculateOrganizationStatistics(organizations)
    ├── calculateWorkgroupStatistics(workgroups)
    ├── calculateAgentStatistics(agents)
    └── calculateRobotStatistics(robots)
```

每段内部再按固定窗口分批处理，例如每 50 或 100 个 scope 记录一次进度、释放局部列表引用，并为 organization 级统计单独做限流。这样先把峰值内存和单次任务时长压下来，改动面最小。

**方案 B**（备选）：将 4 类实体遍历拆成独立异步任务

只有在确认单任务内存峰值已经受控后，才考虑 `@Async` + `ThreadPoolTaskExecutor`。否则并发执行 4 类重任务，很可能把当前 OOM 风险放大成更早、更频繁的 OOM。

明确不采用的做法：

- 不把 `System.gc()` 作为治理手段写入实施方案
- 不在未完成压测前直接并发化这类重查询任务

#### 2.2 缩减 `STATISTIC_BATCH_SIZE`

**范围**：`ServiceStatisticService.java`  
**优先级**：🟠 P1

将 `STATISTIC_BATCH_SIZE` 从 1000 缩减到 200~500，减少单次查询加载到内存的对象数量。当前查询是 DTO 投影，不是完整实体抓取，但单批 1000 条记录依然会带来较高的对象分配和字符串保留成本。

#### 2.3 `StatisticAggregation.scopedThreadUids` 内存优化

**范围**：`ServiceStatisticService.java`  
**优先级**：🟡 P2

当前 `scopedThreadUids` 是 `HashSet<String>`，在大 organization scope 上会明显膨胀。统计完成后的 `updateQualityMetrics` 才用到它去查 rating/transfer。优化方向：

- `updateQualityMetrics` 中 rating 查询已经有 `THREAD_UID_BATCH_SIZE=500` 的分批逻辑，但传入的 `aggregation.scopedThreadUids` 仍然是全量 set
- transfer 统计当前是对每个 `threadUid` 分别执行两次 count，需要优先收敛成按 scope 聚合的 repository 查询
- 改为让 rating/transfer 查询直接基于 `orgUid + scope + timeRange` 聚合，尽量不再依赖全量 `threadUid` 集合

建议拆成两步实施：

1. 先把 transfer 的逐条 count 改为 repository 聚合查询，因为当前每个 thread 至少 2 次 count，收益最大。
2. 再把 rating 统计从 `threadUid IN (...)` 改为按 scope 聚合，逐步移除 `scopedThreadUids` 对质量指标的强依赖。

#### 2.4 Repository 查询优化

**范围**：`QueueMemberRepository.java`  
**优先级**：🟡 P2

确认线上 `bytedesk_service_queue_member` 表在 `(org_uid, is_deleted, created_at)` 上有复合索引。如果没有，统计查询会对大表产生高扫描成本，并进一步拖长事务、放大连接池占用和 JVM 堆压力。

本项目使用 Liquibase，新增索引应通过新的 migration XML 落地，并在 `starter/src/main/resources/db/changelog/master.xml` 中 include，避免直接修改历史 changeset。

建议索引 DDL：

```sql
CREATE INDEX idx_qm_org_deleted_created 
ON bytedesk_service_queue_member (org_uid, is_deleted, created_at);
```

建议迁移文件：

```text
starter/src/main/resources/db/changelog/migration/260803_add_queue_member_statistic_indexes.xml
```

候选索引：

- organization 统计：`(org_uid, is_deleted, created_at)`
- workgroup 统计：`(org_uid, workgroup_queue_id, is_deleted, created_at)` 或按实际列名调整
- agent 统计：`(org_uid, agent_queue_id, is_deleted, created_at)` 或按实际列名调整
- robot 统计：`(org_uid, robot_queue_id, is_deleted, created_at)` 或按实际列名调整

索引列名必须以实体映射和实际表结构为准，上线前使用 `EXPLAIN` 验证命中情况。

---

### 阶段三：架构加固（下个迭代）

#### 3.1 统计预计算 / 增量更新

**范围**：新模块或 `ServiceStatisticService` 重构  
**优先级**：🟢 P3

当前每次 `HalfHourJob` 触发都全量重新计算当日统计。更好的做法：

- 用一张 `service_statistic_delta` 表记录每个 scope 的增量变化
- `HalfHourJob` 只计算增量并 merge 到主统计表
- 仅在 `Daily0Job`（每日 0 点）做一次全量对账

#### 3.2 增加监控指标

**范围**：`ServiceStatisticService.java` + 监控系统  
**优先级**：🟢 P3

在 `calculateTodayStatistics` 方法中增加 Micrometer metrics：

```java
@Timed(value = "service.statistic.calculate.duration", 
       extraTags = {"scope", type})
@Counted(value = "service.statistic.calculate.count")
```

暴露以下指标供 Prometheus / Grafana 告警：

- `service_statistic_calculate_duration_seconds`：按 scope 类型统计耗时
- `service_statistic_calculate_total`：每次统计的 scope 总数
- JVM heap usage 在统计期间的波动

#### 3.3 线上 JVM 参数规范化

**范围**：Dockerfile / 部署脚本  
**优先级**：🟢 P3

统一线上 JVM 参数：

```text
-Xms4g -Xmx4g
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/logs/
-XX:+ExitOnOutOfMemoryError
```

`+ExitOnOutOfMemoryError` 可配合进程管理（systemd/k8s）实现自动重启，比半死不活的状态更容易恢复。

#### 3.4 监控链路补齐

**范围**：`deploy/docker/compose-app-bytedesk.yaml` / 运维监控  
**优先级**：🟢 P3

当前 compose 默认关闭 actuator health。如果线上 monitor 依赖 actuator，需要明确打开受控的 health endpoint；如果 monitor 只检查业务端口，则需要补充 JVM heap、GC、线程池、数据库连接池等指标，否则只能在服务不可用后报警。

推荐检查项：

- monitor 3:30 报警的探测目标是什么 URL/端口
- 是否有 JVM heap 使用率、GC pause、Druid active connection、Quartz job duration 指标
- 是否需要暴露单独的只读健康检查端点，而不是依赖业务页面

---

## 2. 影响范围评估

| 变更 | 影响模块 | 风险 | 回滚方案 |
| ------ | ---------- | ------ | ---------- |
| JVM 参数调整 | 部署配置 | 低，只增加资源 | 恢复原启动参数 |
| HalfHourJob 异常兜底 | `modules/core` | 极低，只增加 try-catch | revert 单文件 |
| Scope 级别异常隔离 | `enterprise/service` | 低，局部改动 | revert 单文件 |
| 分段串行执行 | `enterprise/service` | 低到中，改变任务组织方式但不改变统计口径 | revert 单文件 |
| 异步执行拆分 | `enterprise/service` | 中到高，需新建线程池配置且可能放大堆压力 | revert + 清理配置 |
| STATISTIC_BATCH_SIZE 缩减 | `enterprise/service` | 低，纯参数调整 | 改回原值 |
| Repository 查询优化 | `modules/service` | 中，可能影响统计口径与 SQL 计划 | revert 单文件 |
| Liquibase 索引迁移 | `starter` | 中，需关注大表建索引耗时和锁表风险 | 新增反向 changeset 或手工 drop index |
| 统计预计算 | `enterprise/service` + 新表 | 高，架构级改动 | 需完整回滚方案 |

---

## 3. 验证方式

1. **本地验证**：构造大量组织 + queue_member 数据，触发 `HalfHourJob`，通过 JVisualVM / JFR 观察堆内存曲线
2. **预发环境**：部署后在预发环境观察 2~3 个半点半周期，确认无 OOM 且统计结果正确
3. **线上灰度**：先只上线阶段一的止血改动，观察 24 小时；再上线阶段二
4. **回归测试**：确认 `ServiceStatisticRestController.queryByDate` API 返回结果与优化前一致
5. **慢查询检查**：对统计相关 SQL 做执行计划核查，确认索引命中且没有异常放大的 count 查询

---

## 4. 验收标准

- 半点任务连续运行 48 小时，无新的 `java.lang.OutOfMemoryError: Java heap space`
- 单次 `HalfHourJob` 执行完成时间稳定低于 30 分钟，不与下一轮调度重叠
- organization 级别最大热点租户执行期间，JVM heap 使用率不再持续逼近上限
- 统计结果与优化前抽样比对一致，允许的差异仅限历史脏数据清理带来的重复记录修正
- 单个 scope 失败时，其余 scope 仍继续执行，且日志可直接定位失败 scope

---

## 5. 推荐执行顺序

1. 先上线部署层止血项：`-Xms/-Xmx`、heap dump、OOM 退出策略
2. 再做代码层最小改动：Job 日志兜底、scope 级异常隔离、降低 batch size
3. 然后收敛 `updateQualityMetrics()` 的 `threadUid` 依赖和 transfer 逐条 count 查询
4. 最后在压测数据上评估是否还需要异步化或增量统计重构

---

## 6. 第一批实施清单

第一批只做止血和低风险减压，不改变统计口径。

| 编号 | 任务 | 文件 | 验证 |
| ------ | ------ | ------ | ------ |
| T1 | 为 `HalfHourJob` 增加开始/结束/耗时日志和普通异常兜底 | `modules/core/.../quartz/job/QuartzHalfHourJob.java` | `./starter/mvnw -f pom.xml -pl modules/core -am -DskipTests compile` |
| T2 | `ServiceStatisticService.calculateTodayStatistics()` 四类 scope 循环增加单 scope try-catch 和进度日志 | `enterprise/service/.../service_statistic/ServiceStatisticService.java` | `./starter/mvnw -f pom.xml -pl enterprise/service -am -DskipTests compile` |
| T2b | `TicketStatisticService.calculateTodayStatistics()` 同步增加 scope 级异常隔离，并将 `findAll()` 改为 `findByDeletedFalse()` | `enterprise/ticket/.../ticket_statistic/TicketStatisticService.java` | `./starter/mvnw -f pom.xml -pl enterprise/ticket -am -DskipTests compile` |
| T3 | `ServiceStatisticService.STATISTIC_BATCH_SIZE` 从 1000 调低到 300 或配置化 | 同 T2 | 统计接口抽样对比 |
| T4 | 裸机脚本支持 `JAVA_OPTS`，Docker 侧补充 `JAVA_TOOL_OPTIONS` 示例 | `scripts/start.sh`、`scripts/restart.sh`、`cicd/start.sh`、`cicd/restart.sh`、`deploy/docker/compose-app-bytedesk.yaml` | 启动日志确认 JVM 参数生效 |
| T5 | 新增 queue member 统计查询索引 Liquibase migration | `starter/src/main/resources/db/changelog/migration/*.xml`、`master.xml` | 本地/预发 Liquibase 启动通过，`EXPLAIN` 命中索引 |

第二批再处理 `updateQualityMetrics()` 的查询重构，因为它会触及统计口径，需要单独抽样核对。

---

## 7. 待确认事项（已确认）

- [x] ~~线上当前 JVM `-Xmx` 具体值是多少？~~ → **先忽略，优先修改代码**
- [x] ~~线上组织数量？~~ → **约 1500 个组织**（量级较大，`findAll()` 返回 1500 条 + 每个组织各自统计，总负载可观）
- [x] ~~是否接受“先串行分段、后评估异步化”的实施顺序？~~ → **接受**
- [x] ~~是否需要同时检查是否还有其他 listener 复用了同一套统计路径？~~ → **已检查**，发现 `TicketStatisticService` 同样监听 `HalfHourJob` 且代码模式一致，已纳入第一批改造（T2b）
- [x] ~~线上 monitor 的探测目标是什么？~~ → **Spring Boot Admin**，prod 配置已启用 SBA client，注册到 `https://monitor.weiyuai.cn`；3:30 报警因应用 OOM 后健康检查超时

## 8. 第一批执行结果（2026-08-03 08:04）

### 编译验证

```text
./starter/mvnw -f pom.xml -pl modules/core,enterprise/service,enterprise/ticket -am -DskipTests compile
结果: BUILD SUCCESS (19 modules, 38s)
```

### 改动文件清单

| 文件 | 改动类型 | 状态 |
| ------ | ---------- | ------ |
| `modules/core/.../quartz/job/QuartzHalfHourJob.java` | 修改：启用 @Slf4j、增加 try-catch 兜底、耗时日志 | ✅ 编译通过 |
| `enterprise/service/.../service_statistic/ServiceStatisticService.java` | 修改：STATISTIC_BATCH_SIZE 1000→300、4 类 scope try-catch + 进度日志 | ✅ 编译通过 |
| `enterprise/ticket/.../ticket_statistic/TicketStatisticService.java` | 修改：3 类 scope try-catch + 进度日志、findAll→findByDeletedFalse | ✅ 编译通过 |
| `scripts/start.sh`、`scripts/restart.sh` | 修改：`java -jar` → `java ${JAVA_OPTS:-} -jar` | ✅ |
| `cicd/start.sh`、`cicd/restart.sh` | 修改：同上 | ✅ |
| `starter/.../db/changelog/migration/260803_add_queue_member_statistic_indexes.xml` | 新增：4 个统计查询索引 | ✅ XML 结构正确 |
| `starter/.../db/changelog/master.xml` | 修改：include 新迁移文件 | ✅ |

### 未覆盖项

- Docker compose 的 `JAVA_TOOL_OPTIONS` 示例未直接修改（需要在具体部署 compose 文件中按需添加）
- `DepartmentRepository` 暂无 `findByDeletedFalse()`，TicketStatistic 中 department 循环仍用 `findAll()` 但已加 try-catch 隔离

### Prod 配置确认（2026-08-03）

线上使用 `application-prod.properties` + `properties/prod/*.properties`，关键配置如下：

| 配置项 | 值 | 说明 |
| -------- | ----- | ------ |
| SBA Monitor | `https://monitor.weiyuai.cn` | 3:30 DOWN 报警来源 |
| Actuator | `exposure.include=*`，health/metrics/prometheus 全开 | Prod 未禁用（与 docker compose 默认不同） |
| Druid | `max-active=50` | OOM 时连接池可能全部卡死 |
| Quartz | `threadCount=5`，`isClustered=true` | HalfHourJob 在其中一条线程串行执行 |
| JMS Cache | `cache.enabled=false` | OOM 时 JMS Session 创建/销毁最先报错 |
| JPA ddl-auto | `update` | Hibernate 自动更新 schema；索引需靠 Liquibase 显式创建 |
| JVM -Xmx | properties 中无显式设置 | 依赖启动脚本 `JAVA_OPTS` 或 Docker `JAVA_TOOL_OPTIONS` |

**结论**：SBA monitor 配置矛盾已排除——prod 并非用 docker compose 的禁用配置，而是完整的 actuator + SBA client 注册。后续部署时只需在启动脚本中注入 `JAVA_OPTS` 即可调整堆大小。

---

## 9. 后续待办（第二批及以后）

### 第二批执行结果（2026-08-03 08:12）

#### 已完成

| 编号 | 任务 | 结论 |
| ------ | ------ | ------ |
| B1 | 收敛 `ServiceStatisticService.updateQualityMetrics()` 的 `threadUid` 依赖和 transfer 逐条 count 查询 | ✅ 已完成，见下方详情 |
| B2 | 评估 `TicketStatisticService` 是否存在类似的 N+1 查询问题 | ✅ 已评估，见下方详情 |
| B3 | 确认线上实际部署方式 | ✅ 已确认 |

#### 待评估（P3，需压测数据）

| 编号 | 任务 | 结论 |
| ------ | ------ | ------ |
| B4 | 评估 `QualityStatisticService` 内存压力 | 不在 HalfHourJob 路径上，仅 REST 手动触发，内存风险低，暂不处理 |
| B5 | 压测评估是否需要异步化或增量统计 | 需部署第一批+第二批后观察线上数据再决定 |

#### B1 详情：updateQualityMetrics N+1 消除

**改动文件**：

| 文件 | 改动 |
| ------ | ------ |
| `enterprise/service/.../thread_transfer/ThreadTransferRepository.java` | 新增 `countByOrgUidAndDeletedFalseAndCreatedAtBetween` 和 `countByOrgUidAndStatusAndDeletedFalseAndCreatedAtBetween` 两个聚合方法 |
| `enterprise/service/.../thread_rating/ThreadRatingRepository.java` | 新增 `findByOrgUidAndDeletedFalseAndCreatedAtBetween`、`countByOrgUidAndDeletedFalseAndCreatedAtBetween`、`countByOrgUidAndDeletedFalseAndScoreGreaterThanEqualAndCreatedAtBetween` 三个聚合方法 |
| `enterprise/service/.../service_statistic/ServiceStatisticService.java` | `updateQualityMetrics` 重写：从 `1+N+N` 查询改为 `4` 次常数查询 |

**优化效果**：

对于 1500 个组织、每个组织平均 100 个 thread 的场景：

| 指标 | 优化前 | 优化后 |
| ------ | -------- | -------- |
| rating 查询次数 | 每 scope 加载全量 rating 实体到内存 | 每 scope 2 次 count 查询（总数 + 满意数） |
| transfer 查询次数 | 每 scope `2 × threadUid数` 次 LIKE 查询 | 每 scope 2 次 count 查询 |
| 内存占用 | 全量 `ThreadRatingEntity` + 全量 `scopedThreadUids` | 无实体加载，仅 count 结果 |
| 精度 | 精确到 threadUid（但 Containing 是 LIKE，精度本身有限） | 精确到 orgUid+timeRange（对 organization 级别完全等价） |

#### B2 详情：TicketStatisticService 评估

**结论**：TicketStatisticService 不需要第二批改造，原因：

1. 没有 transfer 的逐条 count N+1 问题（不引用 ThreadTransferRepository）
2. `findRatingsByThreadUids` 使用分批 IN 查询（`THREAD_UID_BATCH_SIZE` 分批），内存压力比 ServiceStatistic 小
3. 计算 `averageRating` 需要实际加载评分数据，不能简单用 count 替代
4. `STATISTIC_BATCH_SIZE = 500`，比 ServiceStatistic 原来的 1000 小
5. 已在第一批加了 scope 级异常隔离

如果未来需要优化，可添加 `avg(score)` 聚合查询方法，但属于 P3 范畴。

#### 编译验证（第二批）

```text
./starter/mvnw -f pom.xml -pl enterprise/service,enterprise/ticket -am -DskipTests compile
结果: BUILD SUCCESS (19 modules, 43s)
```
