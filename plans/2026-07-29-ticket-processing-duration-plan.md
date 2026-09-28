# 工单处理时长显示规划

> 创建日期：2026-07-29  
> 状态：已完成  
> 关联 TODO：`TODO-2026.md` 第 32 行（已标记 [x]）

## 一、需求概述

在 desktop 客服端 `TicketInternalSteps` 工单流转过程组件中，增加显示工单处理时长，让客服直观了解工单从创建到当前，或到解决/关闭节点，已经历的总时长。

方案贴近后端 `TicketResponse -> TicketConvertUtils -> TicketRestService` 与前端 desktop `TICKET.TicketResponse` 的真实实现链路，不新增数据库字段，仅通过后端实时计算 + DTO 返回 + 前端展示实现。

## 二、现状分析

### 2.1 后端现有字段

| 实体 | 字段 | 类型 | 说明 |
| ---- | ---- | ---- | ---- |
| `BaseEntity` | `createdAt` | `ZonedDateTime` | 工单创建时间，自动填充 `@CreatedDate` |
| `TicketEntity` | `resolvedTime` | `ZonedDateTime` | 工单解决时间，状态进入 `RESOLVED` 时设置 |
| `TicketEntity` | `closedTime` | `ZonedDateTime` | 工单关闭时间，状态进入 `CLOSED` / `VERIFIED_OK` 时设置 |
| `TicketHistoryActivityResponse` | `durationInMillis` | `Long` | 单个 BPMN 活动节点的耗时，由 Flowable 历史接口提供 |
| `TicketSlaRecordEntity` | `durationMinutes` | `Long` | SLA 规则时限，不是工单实际处理时长 |

### 2.2 关键发现

- `TicketEntity` 中没有持久化的“处理时长”字段，当前时长均为即时计算。
- 现有统计侧已有类似口径，示例：`TicketStatisticService` 使用 `Duration.between(ticket.getCreatedAt(), ticket.getResolvedTime())` 计算解决时长。
- `TicketResponse` 目前没有 `processingDuration` 之类字段。
- desktop 前端的 `TICKET.TicketResponse` 是手写类型声明，位于 `frontend/apps/desktop/src/@types/ticket/ticket.d.ts`。后端 DTO 增加字段后，前端类型也必须同步补充。
- `TicketHistoryActivityResponse.durationInMillis` 是流程活动节点耗时，不是工单整体处理时长，不能直接拿来展示在 Steps 顶部。
- `queryByUid()` 与 `queryByThreadUid()` 最终都调用 `TicketConvertUtils.convertToResponse()`，因此如果把处理时长计算放进转换层，则普通工单与 thread 工单都会自动拿到该字段，无需新增接口。

### 2.3 前端现有组件

`TicketInternalSteps.tsx` 当前行为：

- 已通过 `queryTicketHistoryActivity` 拉取活动历史记录。
- 使用 `Steps` 组件垂直展示每个活动节点。
- 每个节点展示处理人、处理时间、备注。
- 支持普通工单和 thread 工单两种数据入口。
- 当前未展示工单总体处理时长。

## 三、方案设计

### 3.1 总体策略

采用不新增数据库字段的轻量方案：后端实时计算 + DTO 返回 + 前端展示。

- 在 `TicketResponse` 中新增 `processingDuration` 字段，单位为秒。
- 在 `TicketConvertUtils.convertToResponse()` 中统一计算。
- 前端 `TicketInternalSteps` 直接读取并格式化展示。
- 不新增单独 API，不改表结构，不引入迁移脚本。

### 3.2 处理时长口径

“处理时长”需要先统一业务含义，否则后续实现容易出现偏差。

首版建议采用下面的优先级：

1. `resolvedTime` 存在：使用 `createdAt -> resolvedTime`
2. `resolvedTime` 不存在但 `closedTime` 存在：使用 `createdAt -> closedTime`
3. 两者都不存在：使用 `createdAt -> 当前时间`

原因如下：

- `resolvedTime` 更接近“问题被处理完成”的时间点。
- `closedTime` 可能晚于 `resolvedTime`，包含“等待客户确认/验证”的停留时间。
- 如果直接优先 `closedTime`，会把确认等待时间也计入“处理时长”，不利于体现客服处理效率。

因此首版推荐语义是：优先显示处理完成耗时，其次回退关闭耗时，再次回退进行中累计时长。

### 3.3 后端改动

#### 3.3.1 `TicketResponse.java`

新增字段：

```java
/**
 * 工单处理时长（秒）
 * 优先级：resolvedTime > closedTime > now
 */
private Long processingDuration;
```

#### 3.3.2 `TicketConvertUtils.java`

建议在 `convertToResponse()` 中调用一个私有工具方法，避免后续复制相同逻辑。

```java
if (entity.getCreatedAt() == null) {
    ticketResponse.setProcessingDuration(null);
} else if (entity.getResolvedTime() != null) {
    ticketResponse.setProcessingDuration(
        Duration.between(entity.getCreatedAt(), entity.getResolvedTime()).getSeconds()
    );
} else if (entity.getClosedTime() != null) {
    ticketResponse.setProcessingDuration(
        Duration.between(entity.getCreatedAt(), entity.getClosedTime()).getSeconds()
    );
} else {
    ticketResponse.setProcessingDuration(
        Duration.between(entity.getCreatedAt(), ZonedDateTime.now()).getSeconds()
    );
}
```

建议实际实现时抽成：

```java
private Long resolveProcessingDurationSeconds(TicketEntity entity)
```

这样后续若 ticket 列表、详情、通知等也要复用该口径，只需要维护一个方法。

#### 3.3.3 返回链路说明

当前以下路径都会复用 `TicketConvertUtils.convertToResponse()`：

- `queryByUid()`
- `queryByThreadUid()`
- 工单创建、更新、关闭、解决等 service 返回

因此本次不需要新增“查询处理时长”的独立接口。

### 3.4 前端改动

#### 3.4.1 desktop 类型声明同步

前端实现前需先补：

```ts
// frontend/apps/desktop/src/@types/ticket/ticket.d.ts
processingDuration?: number;
```

否则 `TicketInternalSteps` 使用该字段时会先在 TypeScript 编译阶段报错。

#### 3.4.2 `TicketInternalSteps.tsx`

建议先统一组件内的实际工单对象：

```ts
const effectiveTicket = ticket || currentTicket;
const effectiveTicketUid = effectiveTicket?.uid;
```

然后在标题区域展示：

```tsx
<div style={{ marginTop: 8, fontSize: 14, color: '#666' }}>
  {intl.formatMessage({ id: 'ticket.processing.duration', defaultMessage: '处理时长' })}：
  {formatDuration(effectiveTicket?.processingDuration, intl)}
</div>
```

当前组件同时支持外部传入 `ticket` 与从 store 读取 `currentTicket`。如果只读取 `currentTicket?.processingDuration`，会遗漏直接传入 `ticket` 的场景。

#### 3.4.3 时长格式化函数

建议复用 desktop 现有国际化风格，不直接在本组件硬编码中文单位。

参考目标：

```ts
const formatDuration = (seconds?: number, intl: IntlShape): string => {
  if (seconds == null || seconds < 0) return '-';

  const totalSeconds = Math.max(0, Math.floor(seconds));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainSeconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) {
    parts.push(intl.formatMessage({ id: 'common.duration.days', defaultMessage: '{days}天' }, { days }));
  }
  if (hours > 0) {
    parts.push(intl.formatMessage({ id: 'common.duration.hours', defaultMessage: '{hours}小时' }, { hours }));
  }
  if (minutes > 0) {
    parts.push(intl.formatMessage({ id: 'common.duration.minutes', defaultMessage: '{minutes}分钟' }, { minutes }));
  }
  if (parts.length === 0) {
    parts.push(intl.formatMessage({ id: 'common.duration.seconds', defaultMessage: '{seconds}秒' }, { seconds: remainSeconds }));
  }
  return parts.join('');
};
```

### 3.5 i18n 文案

新增工单标题 key：

| Key | 中文（zh-CN） | 英文（en-US） |
| ---- | ---- | ---- |
| `ticket.processing.duration` | 处理时长 | Processing Duration |

优先复用已有公共时长 key：

- `common.duration.seconds`
- `common.duration.minutes`
- `common.duration.minutes.seconds`

经检查，desktop 语言包中 8 个 locale 目前已经存在 `common.duration.seconds`、`common.duration.minutes`、`common.duration.minutes.seconds`，但尚未发现 `common.duration.days`、`common.duration.hours`。如果格式化函数要显示“天/小时”，需要同步补充：

- `common.duration.days`
- `common.duration.hours`

需同步检查并补齐的文件范围：

- `frontend/apps/desktop/src/locales/zh-CN/ticket.ts`
- `frontend/apps/desktop/src/locales/en-US/ticket.ts`
- `frontend/apps/desktop/src/locales/zh-TW/ticket.ts`
- `frontend/apps/desktop/src/locales/ja-JP/ticket.ts`
- `frontend/apps/desktop/src/locales/ms-MY/ticket.ts`
- `frontend/apps/desktop/src/locales/vi-VN/ticket.ts`
- `frontend/apps/desktop/src/locales/es-ES/ticket.ts`
- `frontend/apps/desktop/src/locales/fr-FR/ticket.ts`

如果补充 `common.duration.days`、`common.duration.hours`，也需要同步覆盖对应 8 个 `common.ts` 文件，避免英文、西语、法语语言包缺 key 后回退到默认中文文案。

### 3.6 数据来源与展示路径

`TicketInternalSteps` 当前有两种取数路径：

1. 普通工单：由父组件或其他 tab 先写入 `currentTicket`
2. thread 工单：进入 Steps tab 后通过 `queryTicketByThreadUid` 自行拉取并写入 `currentTicket`

由于两条路径最终都使用 `TicketResponse`，只要后端 DTO 增加 `processingDuration`，两条路径都可以共享展示逻辑。

## 四、影响范围

| 层级 | 文件 | 改动类型 |
| ---- | ---- | ---- |
| 后端 | `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/TicketResponse.java` | 新增字段 |
| 后端 | `modules/ticket/src/main/java/com/bytedesk/ticket/utils/TicketConvertUtils.java` | 新增计算逻辑 |
| 前端 | `frontend/apps/desktop/src/@types/ticket/ticket.d.ts` | 新增类型字段 |
| 前端 | `frontend/apps/desktop/src/pages/Dashboard/Ticket/components/TicketInternalSteps.tsx` | 新增时长展示 |
| 前端 | `frontend/apps/desktop/src/locales/*/ticket.ts` | 8 个语言包新增 i18n key |
| 前端 | `frontend/apps/desktop/src/locales/*/common.ts` | 8 个语言包补充 `days` / `hours` 公共时长单位 key |

## 五、风险与注意

1. 如果业务真正想看的是“创建到最终关闭的总历时”，而不是“问题被处理完成所花时间”，则口径要改为优先 `closedTime`。当前规划默认优先体现处理效率，所以优先 `resolvedTime`。
2. 进行中的工单，`processingDuration` 是接口返回时刻的瞬时值，不会自动跳秒更新。
3. `createdAt`、`resolvedTime`、`closedTime` 都是 `ZonedDateTime`，`Duration.between()` 可直接使用。
4. 需防御极端情况下 `createdAt` 为空。
5. 若只改 Java DTO、漏改 desktop `ticket.d.ts`，前端会直接报类型错误。
6. 进行中工单每次转换都调用一次 `now()`，但该开销很小，首版可接受。

## 六、实施顺序建议

1. 后端 `TicketResponse` 增加 `processingDuration`
2. 后端 `TicketConvertUtils` 增加统一计算逻辑
3. 前端 desktop `ticket.d.ts` 同步新增字段
4. `TicketInternalSteps.tsx` 增加展示与格式化
5. 8 个 locale 的 ticket/common 文案补齐
6. 验证普通工单与 thread 工单两条路径行为一致

## 七、验收标准

1. desktop 打开 `TicketInternalSteps` 后，顶部可看到“处理时长”。
2. 普通工单进入 Steps tab 时可以显示处理时长。
3. thread 工单首次进入 Steps tab，即使未先打开 Details，也可以显示处理时长。
4. `RESOLVED` 工单显示值固定为 `createdAt -> resolvedTime`。
5. `CLOSED` / `VERIFIED_OK` 工单若已有 `resolvedTime`，显示值仍优先以 `resolvedTime` 为终点。
6. 进行中工单显示 `createdAt -> 当前返回时刻` 的累计时长。
7. 前端 TypeScript 编译不会因 `processingDuration` 缺少声明而报错。
8. 切换 zh-CN、en-US、zh-TW、ja-JP、ms-MY、vi-VN、es-ES、fr-FR 时，处理时长标签与天/小时/分钟/秒单位不出现缺失 key。

## 八、后续可优化方向

- 前端增加定时刷新，让进行中工单时长自动更新。
- 在 ticket 列表、详情、统计页面复用同一处理时长口径。
- 增加“关闭总历时”与“处理完成耗时”双指标，避免单一字段承载两种语义。
- 后续若引入暂停/挂起时长，可再补“净处理时长”口径。## 九、实施记录

> 实施日期：2026-07-29

### 9.1 后端

- `TicketResponse.java`：新增 `private Long processingDuration;`，字段注释说明优先级口径
- `TicketConvertUtils.java`：
  - 在 `convertToResponse()` 末尾调用 `resolveProcessingDurationSeconds(entity)` 填充 DTO
  - 新增 `private static Long resolveProcessingDurationSeconds(TicketEntity entity)`：
    - `entity == null || entity.getCreatedAt() == null` → `null`
    - `resolvedTime` 存在 → `createdAt → resolvedTime`
    - 否则 `closedTime` 存在 → `createdAt → closedTime`
    - 否则 → `createdAt → ZonedDateTime.now()`
    - 返回 `Math.max(0L, Duration.between(...).getSeconds())`

### 9.2 前端

- `ticket.d.ts`：新增 `processingDuration?: number`
- `TicketInternalSteps.tsx`：
  - 统一工单来源：`effectiveTicket = ticket || currentTicket`
  - 新增 `formatDuration(seconds?, intlShape?)` 本地格式化函数，使用 `react-intl` 动态单位
  - 标题区域新增 `ticket.processing.duration` 标签 + `formatDuration` 展示
- `ticket.ts`（8 个 locale）：新增 `ticket.processing.duration`
- `common.ts`（8 个 locale）：新增 `common.duration.days` / `common.duration.hours`

### 9.3 验证

- 编辑器诊断：后端 2 个 Java 文件 + 前端 18 个文件均无错误
- 前端 TypeScript 编译：`pnpm exec tsc --noEmit` 通过
- 后端 Maven 编译：跳过（用户未执行终端命令）
