---
slug: paradedb-postgresql-upgrade
title: 微语默认 PostgreSQL 镜像升级为 ParadeDB 0.25.9
authors: jackning
tags: [bytedesk, PostgreSQL, ParadeDB, Docker, Upgrade]
---

微语已在 `deploy/docker/compose/compose-postgresql.yaml` 中将默认 PostgreSQL 镜像从原生 `postgres:17` 切换为 `paradedb/paradedb:0.25.9`。这次更新的目标很明确：在保持 PostgreSQL 协议与生态兼容的前提下，为知识库、工单、消息和 AI 检索场景引入更强的全文检索与分析能力。

本文说明这次切换带来的变化、为什么选择 ParadeDB，以及本地开发和升级时需要注意的兼容点。

<!-- truncate -->

## 这次更新了什么

目前默认配置已经改为：

```yaml
image: paradedb/paradedb:0.25.9
```

同时保留了原生 PostgreSQL 镜像注释，方便需要纯 PostgreSQL 环境的团队自行切回：

```yaml
# image: postgres:17
```

除了镜像本身，这次还同步调整了两个关键细节：

- 数据卷挂载路径改为 `/var/lib/postgresql`
- PostgreSQL 数据卷名称调整为 `bytedesk_postgresql_data18`

这两个调整并不是格式清理，而是为了兼容 ParadeDB 当前基于 PostgreSQL 18 的镜像布局，避免沿用旧 PG17/更早镜像的数据目录约定后导致容器拒绝启动。

## 为什么从 PostgreSQL 切到 ParadeDB

ParadeDB 本质上仍然是 PostgreSQL 发行版，但额外内置了适合搜索与分析场景的增强能力。对微语来说，这比“数据库一套、搜索引擎再单独部署一套”的方式更轻量。

这次切换主要基于以下考虑：

- 微语的知识库、FAQ、工单和消息天然存在全文检索需求
- AI 检索增强场景需要更强的文本召回与排序能力
- 本地开发、演示环境和中小规模部署更希望减少 Elasticsearch 这类额外组件依赖
- 保持 PostgreSQL 兼容协议，能降低应用侧改造成本

ParadeDB 提供的 `pg_search` 能力适合这类场景，尤其是基于 BM25 的全文检索、向量检索和混合检索能力，和微语当前的知识库与 AI 能力方向比较一致。

## 对微语有什么直接价值

对使用 PostgreSQL 部署微语的团队，这次更新最直接的价值有三点：

### 1. 搜索能力更贴近业务场景

客服知识库、FAQ、历史消息、工单标题与内容都更适合走数据库内的全文检索能力，而不是只依赖模糊匹配或额外维护独立搜索系统。

### 2. 部署结构更简单

在需要 PostgreSQL 的场景里，ParadeDB 让团队可以先把检索能力放进数据库层验证，减少“先上搜索集群再做业务联调”的前置成本。

### 3. 为 AI 检索增强预留基础设施空间

微语已经在知识库和 AI 场景中逐步引入向量检索、检索增强和多阶段召回。默认镜像改为 ParadeDB，可以让后续 PostgreSQL 技术栈上的 AI 检索能力扩展更自然。

## 兼容性说明

这次切换不是替换数据库协议，应用层仍按 PostgreSQL 使用。也就是说：

- Spring Boot 数据源配置方式不变
- JDBC 驱动与 PostgreSQL 方言不变
- 现有 PostgreSQL 工具链与运维方式基本不变

但有两个升级注意事项必须明确。

### 1. ParadeDB 0.25.9 默认基于 PostgreSQL 18

`paradedb/paradedb:0.25.9` 不是 PG17 变体，而是默认基于 PostgreSQL 18。若你的环境明确要求 PG17，需要改用 ParadeDB 对应的 PG17 标签，而不是直接假设 `0.25.9` 等同于 PG17。

### 2. PG18+ 的数据目录挂载方式不同

旧的 PostgreSQL Docker 使用中，很多项目会把数据卷挂到：

```yaml
/var/lib/postgresql/data
```

但 PG18+ 系列镜像要求挂载到：

```yaml
/var/lib/postgresql
```

如果继续沿用旧路径，容器可能因为识别到不兼容的数据目录布局而无法正常启动。这也是这次 compose 文件里同步修改卷挂载路径的原因。

## 如何切换与使用

如果你使用仓库内的 Docker 脚本，可以直接执行：

```bash
cd deploy/docker
./switch-db.sh postgresql
```

应用侧再配合本地 profile 使用：

```properties
bytedesk.datasource.active=postgresql
```

对于本地开发，微语已经按这个组合完成了启动验证：

- 默认 PostgreSQL compose 使用 ParadeDB 0.25.9
- 本地 `starter` 以 PostgreSQL 数据源成功启动
- 兼容修复已覆盖 PostgreSQL 下暴露出的 Liquibase/JPA 命名与迁移问题

## 升级建议

如果你当前已经在使用旧 PostgreSQL 容器或旧数据卷，建议按下面顺序处理：

1. 先确认是否需要保留旧数据卷
2. 如果是从旧 PG17 风格目录迁移，避免直接复用旧挂载路径
3. 为 ParadeDB 18 基线使用新的数据卷名称，避免与旧卷混用
4. 完成容器切换后，再启动微语应用做一次数据库迁移校验

如果你是全新本地环境，直接使用当前 compose 配置即可。

## 总结

这次更新将微语默认 PostgreSQL 镜像切换到 `paradedb/paradedb:0.25.9`，核心目的是在保持 PostgreSQL 兼容性的同时，给知识库、工单、消息和 AI 检索场景提供更强的默认搜索基础设施。

如果你计划用 PostgreSQL 承载微语，并希望后续进一步增强全文检索、混合检索或 AI 检索能力，这个默认配置会比原生 PostgreSQL 更合适。

## 相关链接

- [ParadeDB GitHub](https://github.com/paradedb/paradedb)
- [ParadeDB Docker Hub Tags](https://hub.docker.com/r/paradedb/paradedb/tags)
- [PostgreSQL PG18 数据目录调整说明](https://github.com/docker-library/postgres/pull/1259)