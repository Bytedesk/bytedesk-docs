---
sidebar_label: 客服状态日志
sidebar_position: 3
---

# 客服状态日志

## 功能概述

客服状态日志是微语客服系统中的重要监控工具，用于记录和跟踪所有客服人员的在线状态变化。通过客服状态日志，管理员可以全面了解客服团队的工作状态、在线时长以及状态变更的时间点，有助于考勤管理、工作量分析和客服资源的合理调配。

## 状态类型说明

客服状态日志记录了客服在系统中的三种主要状态：

| 状态类型 | 颜色标识 | 说明 |
| --- | --- | --- |
| 在线 (AVAILABLE) | 绿色 | 客服正常在线，可以接待访客 |
| 忙碌 (BUSY) | 橙色 | 客服处于忙碌状态，暂时不接受新的会话分配 |
| 离线 (OFFLINE) | 红色 | 客服已离线，无法接待访客 |

## 数据字段说明

客服状态日志页面展示了以下关键信息：

| 字段名称 | 说明 |
| --- | --- |
| 客服昵称 | 客服人员的名称或昵称 |
| 状态 | 客服当前或历史的在线状态（在线、忙碌或离线） |
| 更新时间 | 状态变更的具体时间点 |

## 使用方法

### 查看状态日志

1. 访问客服状态日志页面，系统默认显示最近的状态变更记录
2. 使用页面顶部的搜索框，可按客服昵称进行筛选
3. 点击表格头部可按更新时间进行排序，方便查看特定时间段的状态变更

### 数据导出

系统支持将客服状态日志导出为Excel文件，便于进行进一步的数据分析：

1. 设置所需的筛选条件（如有）
2. 点击"导出"按钮
3. 系统将根据当前的筛选条件，生成并下载Excel格式的状态日志报表

## 应用场景

客服状态日志在以下场景中具有重要价值：

### 考勤管理

- **上下班时间监控**：通过状态变更记录，准确掌握客服的实际上线和下线时间
- **工作时长统计**：结合状态日志数据，计算客服的有效工作时长
- **异常行为分析**：发现频繁切换状态或长时间保持某状态的异常情况

### 资源调配

- **高峰期人力分析**：了解不同时段的在线客服数量，合理安排人员排班
- **客服负载均衡**：根据"忙碌"状态的分布，评估客服工作负载是否均衡
- **团队容量评估**：分析客服状态分布，评估当前团队规模是否满足业务需求

### 绩效评估

- **工作效率分析**：结合在线时长和会话量，评估客服的工作效率
- **状态合规性**：检查客服状态使用是否符合企业规定（如不合理使用"忙碌"状态）
- **团队对比分析**：对比不同团队或客服的状态分布，发现最佳实践

## 最佳实践

1. **定期审查状态日志**：建议每周或每月定期审查状态日志，了解团队整体工作状态
2. **关注状态变化趋势**：对比不同时期的状态分布，发现团队工作状态的长期趋势
3. **结合其他数据分析**：将状态日志与会话量、满意度等数据结合分析，全面评估客服表现
4. **制定明确的状态使用规范**：明确规定各状态的适用场景，避免客服不当使用状态设置
5. **技术与管理相结合**：将技术监控与人员管理相结合，合理利用状态日志数据改进团队管理
