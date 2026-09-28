# Spring Boot 4.1 / Spring AI 2.0 / Flowable 8 / springdoc 3 综合升级规划

> 日期：2026-07-31
> 状态：**执行中，Spring Boot 4 基线编译已打通**
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)
> 前置规划：[docs/plans/2026-07-27-remove-spring-ai-alibaba-deps.md](./2026-07-27-remove-spring-ai-alibaba-deps.md)
> 目标：先形成一份可执行、可回滚、可分阶段验收的升级方案，并在实施过程中持续回写执行状态，覆盖 bytedesk-private `main` 主线初始化、当前 `bytedesk-3.x` 内容同步、参考 `bytedesk-4.x` 进行版本升级，以及 Spring Boot 4.1.0、Spring AI 2.0.0、Flowable 8.0.0、springdoc-openapi 3.0.3、Elasticsearch Docker 镜像同步升级。

## 0. 当前执行状态（2026-07-31 10:19）

### 0.1 阶段状态快照

| 阶段 | 当前状态 | 说明 |
| ------ | ------ | ------ |
| 阶段 0：基线同步 | ✅ 已完成 | `bytedesk-main` 已完成 `bytedesk-3.x` 基线同步，且已形成独立基线提交 `18ba5b110a chore: sync bytedesk-3.x baseline into main` |
| 阶段 1：Boot 4 预清理 | ✅ 已完成 | `package-info` nullability 已迁到 JSpecify/NullMarked，Boot 4 兼容性预清理已形成提交 `07b997a94e` 与 `c50492f529` |
| 阶段 2：Spring AI 2.0 | ⏳ 未开始 | 当前仍保持 `spring-ai.version=1.1.2`，尚未进入 `MoonshotChatModel` 等高风险改造 |
| 阶段 3：Boot 4.1 + springdoc 3 | 🚧 部分完成 | 根 POM 已切到 Spring Boot `4.1.0`，并已打通 starter 聚合编译；`springdoc.version` 仍是 `2.8.8`，启动态与 Swagger 回归未做 |
| 阶段 4：ES 9.x / Docker | ⏳ 未开始 | Docker、IK、Kibana、Logstash 仍保持 8.18.x 基线 |
| 阶段 5：Flowable 8 | ⏳ 未开始 | `flowable.version` 仍是 `7.2.0` |
| 阶段 6：全量回归 | ⏳ 未开始 | 尚未做启动、健康检查、Swagger、AI、知识库与流程端到端验证 |

### 0.2 当前已验证实现

截至本次更新，`bytedesk-main` 中已完成并验证的实现主要集中在 Spring Boot 4 基线兼容层：

1. 根 POM 已切到 `spring-boot-starter-parent 4.1.0`，并补齐 `jspecify.version`、`spring-retry.version` 等兼容属性。
2. `modules/core`、`modules/call` 已完成 `netty-all` → Netty 子模块显式依赖迁移。
3. 多个模块的健康检查实现已迁到 `org.springframework.boot.health.contributor` 包路径。
4. `modules/kbase` 已完成 Spring Batch 6 兼容修复，以及 Elasticsearch 低层客户端到 Rest5Client 的迁移。
5. `modules/ai` 当前仍停留在 Spring AI `1.1.2`，但已补齐旧版 `ElasticsearchVectorStore` 所需的 `org.elasticsearch.client:elasticsearch-rest-client:8.18.8` 过渡依赖。
6. `starter/pom.xml` 中的数据源连接池 Starter 已同步从 `druid-spring-boot-3-starter` 切换为 `druid-spring-boot-4-starter`，版本保持 `1.2.28` 不变。
7. `enterprise/core`、`enterprise/call`、`starter` 层的 Boot 4 包位移与签名兼容点已完成当前一轮修复。

### 0.3 当前验证结果与未完成项

已执行验证命令：

```bash
env JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home ./starter/mvnw -f pom.xml -pl starter -am -DskipTests compile
```

当前结果：`BUILD SUCCESS`，starter 聚合反应堆 `41/41` 模块已编译通过。

当前仍未完成的事项：

1. 尚未启动 `starter` 做运行态验证。
2. 尚未引入 `spring-boot-properties-migrator` 做配置属性迁移扫描。
3. 尚未切换 `springdoc.version -> 3.0.3`。
4. 尚未启动 Spring AI 2.0 改造。
5. 尚未启动 Elasticsearch 9.x / Docker 与 Flowable 8 升级。

补充说明：

1. Druid Starter 的 Boot 4 坐标切换已完成，但这并不等价于运行态问题全部关闭；仍需继续通过启动日志确认是否还有第三方自动配置或旧安装产物残留。

当前观察项：

1. 编译过程中存在 `artemis-jakarta-server` groupId 已迁移的上游警告，暂不阻塞编译，但应在后续依赖清理时一并处理。

---

## 1. 背景结论

### 1.1 当前仓库真实版本

以根 [pom.xml](../../pom.xml) 为准，当前代码库实际版本为：

| 组件 | 当前版本 | 目标版本 | 说明 |
| ------ | ------ | ------ | ------ |
| Spring Boot | `3.5.16` | `4.1.0` | 根父 POM |
| Spring AI | `1.1.2` | `2.0.0` | TODO 中写的是 `1.1.8`，但仓库当前实际仍是 `1.1.2` |
| Flowable | `7.2.0` | `8.0.0` | 根版本属性，主要集中在工单流程模块 |
| springdoc-openapi | `2.8.8` | `3.0.3` | 多个聚合 POM 共用根属性 |
| Elasticsearch 镜像 | `8.18.0` | `9.x` | Docker compose 与 IK 插件均绑定 `8.18.0` |

### 1.2 已确认的前置事实

1. `spring-ai-alibaba 1.1.2.2` 已经从主链依赖中停用，`DashScope Chat/Embedding` 也已迁移到自有适配层，这一步的目的就是解除 Spring Boot 3.x / Spring AI 1.x 的耦合阻塞。
2. 现有规划已经明确：如果升级到 Spring Boot 4.x，则 Elasticsearch 服务端不能继续停留在 8.x，需要同步规划到 9.x。
3. `Flowable` 的使用不是“只升版本即可”，当前 [modules/ticket/pom.xml](../../modules/ticket/pom.xml) 中直接引入了 `flowable-spring-boot-starter`、`flowable-engine`、`flowable-dmn-*`、`flowable-cmmn-*` 等一整组依赖，并且业务代码中直接使用了 `RepositoryService`、`TaskService`、`CmmnTaskService`。
4. `springdoc-openapi` 当前分散在 `modules/channels/control/enterprise/plugins/projects/starter` 等聚合或启动模块中，属于跨模块统一升级，不应只改一个 POM。

### 1.3 本次规划的控制性判断

本次升级不能按 TODO 顺序逐项“直接抬版本”。更稳妥的路线应为：

1. 先完成 Spring Boot 4 / Spring Framework 7 兼容性预清理。
2. 再推进 Spring AI 2.0 与 springdoc 3.0.3 这类强依赖 Spring Boot 4 的框架升级。
3. 等平台主链稳定后，再单独处理 Flowable 8.0.0 这类业务流程引擎升级。
4. Elasticsearch 9.x 与 IK 插件、Kibana、Logstash 升级必须作为同一批基础设施变更规划，不能遗漏。

---

## 2. 升级目标与非目标

### 2.1 目标

1. 输出一条明确的升级执行顺序，避免把 5 类高风险变更混成一次提交。
2. 识别 Java 编译层、Spring Bean 装配层、运行时配置层、Docker 基础设施层的关键断点。
3. 给出每个阶段的验证命令、回滚点和风险门禁。
4. 把 ES 镜像升级范围写清楚，包括 `elasticsearch`、`logstash`、`kibana`、IK 插件和向量索引回归。
5. 明确 `bytedesk-3.x`、`bytedesk-private/main`、`bytedesk-4.x` 三者在本次升级中的职责边界，避免把“初始化主线”和“实施升级”混为一步。

### 2.2 非目标

1. 本文档不直接执行版本升级。
2. 本文档不处理与本次升级无关的业务重构。
3. 本文档不承诺一次性完成所有旧 API 重写，而是先拆成可验证阶段。
4. 本文档不建议把 `bytedesk-4.x` 整体 merge 到 `main`；`bytedesk-4.x` 仅作为升级参考来源，而不是直接替换来源。

### 2.3 仓库与分支策略

本次升级不是直接在当前工作目录上“就地升版本”，而是采用三份代码基线分工：

| 基线 | 路径 / 分支 | 职责 | 本次操作原则 |
| ------ | ------ | ------ | ------ |
| 当前稳定线 | 当前仓库 `bytedesk-3x` / `bytedesk-3.x` | 3.x 长期维护线，保留 Spring Boot 3.x / Spring AI 1.x | 作为功能基线来源；本次不直接升到 4.x |
| 新主线工作区 | `/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main` / `main` | 未来 4.x 主线承载仓库 | 先同步成当前 3.x 功能基线，再在其上实施升级 |
| 参考线 | `bytedesk-private` 的 `bytedesk-4.x` | 已有 4.x 升级经验与局部实现来源 | 只按主题参考和摘取，不直接整体 merge 覆盖 |

控制原则：

1. `bytedesk-3.x` 继续保持 3.x 技术栈，不承担本次框架升级落地。
2. `main` 必须先回到“功能上等价于当前 3.x”的干净起点，再做 4.x 升级，避免旧 `main` 历史残留与升级变更交叉污染。
3. `bytedesk-4.x` 的价值是减少探索成本，但任何参考代码都必须按当前 `main` 上的真实文件结构重新落地和验证，不能把它当成可直接合并的目标分支。

### 2.4 主线初始化策略

用户要求的第一步不是改 Java 依赖，而是先把 `main` 主线准备成可升级的工作底座。推荐拆成两个动作，而不是一把梭：

#### A. 创建 `bytedesk-main` 工作区

1. 在 `/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main` 克隆 `bytedesk-private` 的 `main` 分支。
2. 只保留目标仓库自己的 `.git` 元数据与远程配置，不沿用当前仓库 `.git`。
3. 克隆后先记录 `main` 当前 HEAD commit，作为“同步前回滚点”。

#### B. 用 `bytedesk-3.x` 覆盖同步 `main`

目标不是“挑拣部分模块”，而是先让 `main` 的工作树尽量对齐当前 `bytedesk-3.x`，形成统一的升级出发点。

建议原则：

1. 同步范围以当前仓库受 Git 管理的业务源码、构建文件、前端、文档、部署文件为主。
2. 保留目标仓库的 `.git`、本地 secrets、IDE 临时文件和目标侧私有未纳管文件。
3. 在真正覆盖前先做 dry-run，确认不会误删目标仓库必须保留但当前仓库不存在的私有文件。
4. 完成覆盖后，`main` 先提交一个“仅同步 3.x 基线、不含 4.x 升级”的独立提交，作为后续所有升级批次的共同父提交。

这一动作的本质是：先把 `main` 还原成“当前真实业务基线”，再在这个基线上做框架升级，而不是在一个历史不明、文件可能漂移的旧 `main` 上直接抬版本。

#### C. 建议同步口径

为了避免把本地构建产物、未跟踪临时文件或机器私有配置误带入 `main`，建议阶段 0 采用“Git 跟踪文件快照”作为同步来源，而不是直接把当前工作目录整体 `rsync` 过去。

推荐口径：

1. 当前 `bytedesk-3.x` 源仓库必须先确认 `git status --short`；如果存在未提交修改，需要先决定这些修改是否属于 3.x 基线。
2. 使用 `git archive` 或等价方式从当前 `bytedesk-3.x` HEAD 生成一份只包含 Git 跟踪文件的临时快照。
3. 将该快照同步到 `/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main`，使用 `--delete` 删除旧 `main` 中已不属于 3.x 基线的文件，但必须排除目标仓库 `.git`。
4. 同步后在 `bytedesk-main` 中执行 `git status --short`，人工确认删除、新增、修改是否符合“main 覆盖为 3.x 基线”的预期。
5. 只有状态确认无误后，才提交 `chore: sync bytedesk-3.x baseline into main`。

不建议直接同步的内容：

1. `.git/`、`.idea/`、`.vscode/` 等本地 IDE 状态。
2. `target/`、`node_modules/`、`dist/`、`build/`、`.turbo/`、`coverage/` 等构建产物。
3. 未被 Git 跟踪的 `.env*`、本地日志、临时导出文件。

如果 `secrets/` 或其他敏感目录在当前仓库中是 Git 跟踪内容，则它属于本次同步口径的一部分；如果只是本地未跟踪目录，则不得因为目录存在于工作区就自动同步到 `main`。

#### D. 阶段 0 命令草案

后续执行时建议按以下命令草案推进；真正执行前仍需根据远程仓库 URL 和本地目录是否已存在做一次确认。

```bash
# 1. 克隆 main 工作区（如果目录已存在，则先检查它是否是正确 remote + main 分支）
git clone -b main git@github.com:Bytedesk/bytedesk-private.git /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main

# 2. 记录 main 同步前回滚点
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main rev-parse HEAD

# 3. 在当前 bytedesk-3.x 源仓库确认基线状态
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x status --short
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x rev-parse HEAD

# 4. 生成只包含 Git 跟踪文件的 3.x 快照
rm -rf /tmp/bytedesk-3x-baseline
mkdir -p /tmp/bytedesk-3x-baseline
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x archive --format=tar HEAD | tar -x -C /tmp/bytedesk-3x-baseline

# 5. dry-run 预览覆盖结果
rsync -av --delete --dry-run --exclude='.git' /tmp/bytedesk-3x-baseline/ /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main/

# 6. 确认 dry-run 无误后执行真实同步
rsync -av --delete --exclude='.git' /tmp/bytedesk-3x-baseline/ /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main/

# 7. 在 bytedesk-main 中复核变更并提交纯基线同步
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main status --short
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main add .
git -C /Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main commit -m "chore: sync bytedesk-3.x baseline into main"
```

注意：阶段 0 的提交只允许包含“3.x 基线同步”结果，不允许顺手加入 Spring Boot 4、Spring AI 2、ES 9 或 Flowable 8 的任何升级修改。

### 2.5 `bytedesk-4.x` 的正确使用方式

`bytedesk-4.x` 应被当作“升级参考库”，而不是“直接合并的答案库”。推荐按主题拆读：

1. 依赖与 BOM 变化：`pom.xml`、各模块 `pom.xml`。
2. Spring AI 2 适配：`modules/ai`、`enterprise/ai`、`modules/kbase`。
3. Boot 4 / Spring 7 配置迁移：自动配置、properties、nullness、starter。
4. ES 9 / Docker：`deploy/docker/**`、文档与脚本。
5. Flowable 8：`modules/ticket` 及其流程配置。

不建议直接执行的动作：

1. 直接把 `bytedesk-4.x` merge 到 `main`。
2. 大规模 cherry-pick 多个升级提交而不先对照当前 `main` 同步基线。
3. 把 `bytedesk-4.x` 中已经删改过的业务逻辑当成无条件真值覆盖当前主线。

---

## 3. 受影响范围

### 3.1 Maven 版本与依赖入口

| 范围 | 主要文件 | 影响 |
| ------ | ------ | ------ |
| 根版本属性 | [pom.xml](../../pom.xml) | Spring Boot / Spring AI / Flowable / springdoc 根版本统一入口 |
| Spring AI 依赖 | [modules/ai/pom.xml](../../modules/ai/pom.xml)、[modules/kbase/pom.xml](../../modules/kbase/pom.xml)、[enterprise/ai/pom.xml](../../enterprise/ai/pom.xml)、[enterprise/core/pom.xml](../../enterprise/core/pom.xml)、[channels/douyin/pom.xml](../../channels/douyin/pom.xml) | 模型接入、RAG、向量库、AI 业务模块 |
| Spring Data Elasticsearch 依赖 | [modules/pom.xml](../../modules/pom.xml)、[starter/pom.xml](../../starter/pom.xml)、[enterprise/call/pom.xml](../../enterprise/call/pom.xml) | ES 客户端与向量检索运行期 |
| springdoc 依赖 | [modules/pom.xml](../../modules/pom.xml)、[starter/pom.xml](../../starter/pom.xml)、[channels/pom.xml](../../channels/pom.xml)、[control/pom.xml](../../control/pom.xml)、[enterprise/pom.xml](../../enterprise/pom.xml)、[plugins/pom.xml](../../plugins/pom.xml)、[projects/pom.xml](../../projects/pom.xml) | OpenAPI 文档与 Swagger UI |
| Flowable 依赖 | [modules/ticket/pom.xml](../../modules/ticket/pom.xml) | 流程引擎、DMN、CMMN、任务处理 |

### 3.2 业务代码热点

| 主题 | 主要代码面 | 风险点 |
| ------ | ------ | ------ |
| Spring Boot 4 / Spring 7 | 全仓 Spring Bean、配置属性绑定、自动配置、包级 nullness、已废弃 API | 编译失败、Bean 装配差异、配置项失效 |
| Spring AI 2 | `modules/ai`、`modules/kbase`、`enterprise/ai` | API 改名、Advisor/Tool/Observation 契约变化、starter 坐标变化 |
| Flowable 8 | `modules/ticket/src/main/java/com/bytedesk/ticket/**` | `TaskService` / `RepositoryService` / `SpringProcessEngineConfiguration` 相关 API 与自动配置兼容 |
| springdoc 3 | `starter` 和各聚合模块的 OpenAPI 依赖声明 | Swagger UI 路径、注解包、Starter artifact 变化 |
| Elasticsearch 9 | `deploy/docker/**`、知识库索引、向量检索、IK 分词 | 客户端与服务端大版本不匹配、索引兼容、插件版本断裂 |

### 3.3 Docker 与基础设施落点

当前 ES 相关镜像与插件主要出现在：

1. [deploy/docker/compose-base.yaml](../../deploy/docker/compose-base.yaml)
2. [deploy/docker/one/docker-compose.yaml](../../deploy/docker/one/docker-compose.yaml)
3. [deploy/docker/one/docker-compose-all.yaml](../../deploy/docker/one/docker-compose-all.yaml)
4. [deploy/docker/one/docker-compose-noai.yaml](../../deploy/docker/one/docker-compose-noai.yaml)
5. [deploy/docker/one/docker-compose-ollama.yaml](../../deploy/docker/one/docker-compose-ollama.yaml)
6. [deploy/docker/one/docker-compose-rabbitmq.yaml](../../deploy/docker/one/docker-compose-rabbitmq.yaml)
7. [docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/deploy/depend/elasticsearch.md](../../docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/deploy/depend/elasticsearch.md)
8. [docs/docs/ops-monitoring/log-monitor.md](../../docs/docs/ops-monitoring/log-monitor.md)
9. [docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/ops-monitoring/log-monitor.md](../../docs/i18n/zh-CN/docusaurus-plugin-content-docs/current/ops-monitoring/log-monitor.md)
10. [docs/i18n/zh-TW/docusaurus-plugin-content-docs/current/ops-monitoring/log-monitor.md](../../docs/i18n/zh-TW/docusaurus-plugin-content-docs/current/ops-monitoring/log-monitor.md)

已确认当前基线为：

- `elasticsearch:8.18.0`
- `logstash:8.18.0`
- `kibana:8.18.0`（位于 `deploy/docker/compose-base.yaml`）
- IK 插件 ZIP：`elasticsearch-analysis-ik-8.18.0.zip`

Docker 落点需要按文件区别处理：

| 文件 | 当前需要升级的组件 |
| ------ | ------ |
| [deploy/docker/compose-base.yaml](../../deploy/docker/compose-base.yaml) | Elasticsearch、IK 插件、Logstash、Kibana |
| [deploy/docker/one/docker-compose.yaml](../../deploy/docker/one/docker-compose.yaml) | Elasticsearch、IK 插件 |
| [deploy/docker/one/docker-compose-all.yaml](../../deploy/docker/one/docker-compose-all.yaml) | Elasticsearch、IK 插件 |
| [deploy/docker/one/docker-compose-noai.yaml](../../deploy/docker/one/docker-compose-noai.yaml) | Elasticsearch、IK 插件 |
| [deploy/docker/one/docker-compose-ollama.yaml](../../deploy/docker/one/docker-compose-ollama.yaml) | Elasticsearch、IK 插件 |
| [deploy/docker/one/docker-compose-rabbitmq.yaml](../../deploy/docker/one/docker-compose-rabbitmq.yaml) | Elasticsearch、IK 插件 |

### 3.4 现有同步脚本复用边界

仓库中已有的同步脚本可以作为思路参考，但**不应直接拿来做本次 `main` 主线初始化**：

1. [cicd/scripts/sync-to-bytedesk.sh](../../cicd/scripts/sync-to-bytedesk.sh) 当前目标仓库是开源仓库 `open/bytedesk`，且存在明确排除项，如 `starter/pom.xml`、`application-local.properties` 等；这不符合本次“先完整对齐 3.x 基线再升级”的目标。
2. [cicd/scripts/auto_sync_and_commit.sh](../../cicd/scripts/auto_sync_and_commit.sh) 带自动 `git add/commit/push` 逻辑，目标路径也不是 `bytedesk-main`，不适合用于首次主线初始化。
3. 本次更合适的方式是：单独面向 `bytedesk-main` 设计一次性的 dry-run 同步流程，先镜像文件，再人工确认 `git status`，最后提交基线同步 commit。

### 3.5 主线初始化防误删门禁

阶段 0 覆盖同步具有删除旧 `main` 文件的能力，因此必须设置硬门禁：

1. 如果 `/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main` 已存在但不是 Git 仓库，停止执行，改为人工确认是否备份或更换目录。
2. 如果 `bytedesk-main` 已存在且 `git status --short` 非空，停止执行，先确认这些修改是否需要保留。
3. 如果 `bytedesk-main` 当前分支不是 `main`，停止执行，先切回 `main` 或重新克隆。
4. 如果 `bytedesk-main` remote 不是 `Bytedesk/bytedesk-private`，停止执行，避免同步到错误仓库。
5. `rsync --delete --dry-run` 的删除列表必须人工扫一遍；如果出现不应删除的私有文件，先调整同步口径，不直接执行真实同步。
6. 纯基线同步 commit 完成前不执行 `git push`；先完成编译和关键冒烟后再推送远程。

---

## 4. 官方升级线索摘要

### 4.1 Spring Boot 4.0/4.1 迁移要点（已核实）

根据 Spring Boot 4 迁移指南实际内容，与本项目直接相关的控制项如下：

1. **先升级到最新 3.5.x**：项目当前已经是 `3.5.16`，满足“从最新 3.5.x 起跳”的前提。
2. **Java 17+ 要求**：项目使用 Java 21，满足条件。
3. **Spring Framework 7 + Jakarta EE 11 + Servlet 6.1 基线**：若存在直接管理的 Servlet/Jakarta 依赖，需要与 Boot 4 管理版本对齐。
4. **Boot 3.x 废弃 API 已移除**：阶段 1 必须先清理 3.x 已废弃方法、属性和配置模式，否则升级后会集中编译失败。
5. **配置属性迁移**：升级阶段建议临时加入 `spring-boot-properties-migrator`（`runtime` scope），启动时输出被重命名/移除的配置属性，修完后移除该依赖。
6. **Undertow 支持移除**：已扫描本项目只使用 Tomcat + Jetty，没有 Undertow starter，暂不受影响。
7. **`javax.*` → `jakarta.*`**：已扫描到的 `javax.*` import 均为 JDK 标准库包（`javax.sql`、`javax.crypto`、`javax.net.ssl`、`javax.imageio`、`javax.xml`、`javax.sound`），不是 Jakarta EE 旧包，无需迁移。

### 4.2 Spring AI 2.0.0 破坏性变更（已核实）

根据 Spring AI `upgrade-notes`，以下变化会直接影响本项目：

| 变更 | 官方含义 | 本项目影响 |
| ------ | ------ | ------ |
| `spring-ai-advisors-vector-store` 重命名为 `spring-ai-vector-store-advisor` | artifact 坐标变化 | [modules/ai/pom.xml](../../modules/ai/pom.xml) 需要同步改依赖 |
| `internalToolExecutionEnabled` 移除 | Provider `ChatOptions` 不再支持内部工具执行开关 | `MoonshotChatOptions`、`MoonshotChatModel`、`SpringAIToolsController` 需删除相关字段/调用 |
| `ToolExecutionEligibilityPredicate` 移除 | 工具执行判断迁移到 `ToolCallingAdvisor` 的 `ToolExecutionEligibilityChecker` | `MoonshotChatModel` 是最高风险改造点 |
| `ChatModel` 内部 tool execution loop 移除 | 直接调用 `ChatModel.call/stream` 不再自动执行工具调用 | 依赖工具自动执行的逻辑需要切到 `ChatClient + ToolCallingAdvisor`，或手动使用 `ToolCallingManager` |
| `streamToolCallResponses` 移除 | 不再支持 advisor builder 上流式输出中间工具响应 | 本项目未使用，已排除 |
| `SpringBeanToolCallbackResolver` / `toolNames()` 移除 | 不再按 bean name 隐式解析 Function/Supplier/Consumer 工具 | 本项目未使用，已排除 |
| `Advisor.DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER` 从 `+1000` 调整到 `+200` | Memory advisor 默认顺序变化 | `BookingAssistantService`、`SpringAIToolsController` 需复查记忆顺序和 tool-call 历史写入行为 |

此外，项目自有 `BytedeskDashScopeChatModel`、`BytedeskDashScopeEmbeddingModel` 必须重新按 Spring AI 2.0 的 `ChatModel` / `EmbeddingModel` 接口编译验证。

### 4.3 springdoc-openapi 3.0.3 升级要点

根据 `springdoc-openapi` 的 Spring Boot 4 分支说明：

1. Spring Boot 4 需要使用 springdoc 的 Boot 4 对应产物线。
2. 主要 Starter 仍是 `springdoc-openapi-starter-webmvc-ui` 和 `springdoc-openapi-starter-webmvc-api` 这类 artifact，但版本线需要切到 3.0.x。
3. Swagger UI 默认访问路径仍需回归确认 `swagger-ui.html` 与 `/v3/api-docs` 是否保持现有行为。

### 4.4 Flowable 8 升级要点

Flowable 官方 Spring Boot 集成文档表明，本项目当前使用的是深度整合方式，而不是边缘可选插件。因此升级到 8.0.0 时必须把它视为“流程引擎子系统升级”：

1. 先验证 `flowable-spring-boot-starter` 8.0.0 与 Spring Boot 4.1 的官方兼容性。
2. 再验证 `engine / dmn / cmmn / ldap configurator` 整组依赖是否仍需全部保留。
3. 最后才进入业务代码级回归：流程部署、任务签收、任务转派、SLA 定时器、评论记录、流程可视化定义等。

### 4.5 代码级影响分析（2026-07-31 全仓扫描结果）

经 Explore agent 对全仓 Java/POM/YAML 文件的系统扫描，以下是确认受影响的具体文件和风险等级：

#### 🔴 高风险：Spring AI 2.0 自定义 ChatModel/EmbeddingModel

| 文件 | 规模 | 核心风险 |
| ------ | ------ | ------ |
| `modules/ai/.../moonshot/api/MoonshotChatModel.java` | ~550 行 | 大量使用 `ToolCallingManager`、`ToolExecutionEligibilityPredicate`、`internalToolExecutionEnabled`，自维护 tool-call 循环。Spring AI 2.0 中这些 API 全部移除或变更。**这是本次升级中风险最高的单个文件**。 |
| `modules/ai/.../dashscope/BytedeskDashScopeChatModel.java` | 自定义 ChatModel | `ChatModel.call()` / `stream()` 接口签名可能变化。依赖 `dashscope-sdk-java` 侧无 Spring AI 版本耦合。 |
| `modules/ai/.../dashscope/BytedeskDashScopeEmbeddingModel.java` | 自定义 EmbeddingModel | `EmbeddingModel` 接口契约可能变化。 |

#### ⚠️ 中风险：ToolCallingManager 消费者链

以下 13 个文件通过 `ObjectProvider<ChatModel>` 或直接引用 `ToolCallingManager`：

| 类别 | 文件 |
| ------ | ------ |
| 直接依赖 ToolCallingManager | `SpringAIMoonshotChatConfig.java`、`SpringAIMoonshotService.java`、`SpringAIToolsController.java` |
| 消费 ChatModel Bean | `AlibabaAgentsService.java`、`AlibabaMemoryService.java`、`AlibabaStructOutputService.java`、`AlibabaWeatherService.java`、`BuilderAiService.java`、`BookingAssistantService.java`、`SpringAIToolsController.java`、`VoiceAgentService.java`、`ProcessAiService.java`、`ChatModelInfoService.java` |

说明：以上 Alibaba* 类已被注释停用，`VoiceAgentService` 为正式语音坐席保留。实际需要关注的是 `BookingAssistantService`、`ProcessAiService`、`ChatModelInfoService` 等活跃消费者。

#### ⚠️ 中风险：ChatMemory / MessageChatMemoryAdvisor

| 文件 | 影响 |
| ------ | ------ |
| `enterprise/ai/.../open_booking/BookingAssistantService.java` | 使用 `MessageWindowChatMemory` + `MessageChatMemoryAdvisor` |
| `enterprise/ai/.../utils/SpringAIToolsController.java` | 手动 ChatMemory 管理 |

Spring AI 2.0 中 `DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER` 从 +1000 变为 +200，且 `ToolCallingAdvisor` 默认不再把 tool-call 消息写入 ChatMemory。

#### 🟡 低风险：Flowable 8 引擎配置

| 文件 | 影响 |
| ------ | ------ |
| `modules/ticket/.../config/FlowableConfig.java` | 使用 `EngineConfigurationConfigurer<SpringProcessEngineConfiguration>` 模式配置 6 种引擎 |
| `modules/ticket/.../service/TicketCaseService.java` | 使用 `CmmnTaskService` |

#### 🟢 已确认安全

| 检查项 | 结论 |
| ------ | ------ |
| `javax.*` 导入（54 处） | 全部为 JDK 标准库包，非 Jakarta EE 旧包。**无需迁移**。 |
| Undertow 使用 | **无**。仅使用 Tomcat + Jetty。 |
| `streamToolCallResponses` | **未使用**。 |
| `SpringBeanToolCallbackResolver` | **未使用**。 |
| Kibana Docker 镜像 | 已使用，`deploy/docker/compose-base.yaml` 中存在 `bytedesk-kibana:8.18.0`，需要随 ES/Logstash 同步升级。 |

---

## 5. 核心风险判断

### 5.1 风险矩阵（已更新）

| 风险 | 级别 | 原因 | 控制策略 |
| ------ | ------ | ------ | ------ |
| **MoonshotChatModel 大量使用 Spring AI 1.x 内部 API** | 🔴 最高 | 550 行代码依赖 `ToolCallingManager`、`ToolExecutionEligibilityPredicate`、`internalToolExecutionEnabled`，这些在 2.0 中全部移除 | 阶段 2 优先重写此类，参考官方迁移指南中的手动 loop 模式 |
| Spring Boot 4 与 Spring AI 2 同时升级导致定位困难 | 🔴 高 | 两者都改框架契约 | 分阶段提交，先平台编译，再 AI 编译，再运行 |
| Flowable 8 影响工单主流程 | 🔴 高 | 流程服务大量直接调用 API | 把 Flowable 单独放到后置阶段 |
| ES 客户端与服务端主版本不匹配 | 🔴 高 | Spring Data Elasticsearch 大版本强耦合 | 将 ES 9 升级作为平台门禁，不允许遗漏 |
| Spring AI 2 下自定义 DashScope 适配层接口失配 | 🔴 高 | 当前为项目自维护适配层 | 优先做 `modules/ai` 聚焦编译与最小单测 |
| springdoc 3 Swagger 文档回归异常 | 🟡 中 | 文档路由和 starter 版本线变化 | 启动后做 `/v3/api-docs` 和 `/swagger-ui.html` 冒烟 |
| 配置属性静默失效 | 🟡 中 | Boot 4 可能移除旧属性或放宽/收紧绑定规则 | 加入 `spring-boot-properties-migrator` 并在启动日志验证 |
| ChatMemory / MessageChatMemoryAdvisor 优先级变化 | 🟡 中 | DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER +1000 → +200 | 阶段 2 中复查 `BookingAssistantService` 和 `SpringAIToolsController` |
| `javax.*` → `jakarta.*` 迁移 | 🟢 已排除 | 54 处 import 均为 JDK 标准库，无 Jakarta EE 旧包 | 无需操作 |
| Undertow 移除 | 🟢 无影响 | 项目只用 Tomcat + Jetty | 无需操作 |

### 5.2 不建议的一次性方案

不建议在一个提交里同时做以下动作：

1. 根父 POM 升到 Boot 4.1.0
2. Spring AI 升到 2.0.0
3. Flowable 升到 8.0.0
4. springdoc 升到 3.0.3
5. Docker ES 升到 9.x

原因很直接：一旦编译或启动失败，无法快速区分是平台层、AI 层、流程层还是基础设施层引起。

---

## 6. 建议实施顺序

### 阶段 0：基线冻结与升级分支准备

目标：在正式改动前，把当前可工作的基线、验证命令和回滚点记录清楚。

建议动作：

1. 在 `/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main` 克隆 `bytedesk-private` 的 `main` 分支，并记录同步前 HEAD。
2. 将当前 `bytedesk-3.x` 工作树内容覆盖同步到 `bytedesk-main`，但保留目标仓库 `.git` 与未纳管本地私有文件。
3. 在 `bytedesk-main` 上执行一次“仅 3.x 基线同步”的独立提交，例如 `chore: sync bytedesk-3.x baseline into main`。
4. 固化当前 Maven 编译基线：`modules/ai`、`modules/kbase`、`modules/ticket`、`starter`。
5. 固化当前运行基线：本地 `starter` 启动、Swagger、知识库检索、工单流程、AI 对话。
6. 确认 Docker ES 现状和索引数据备份方案。
7. 确认 `bytedesk-4.x` 可访问，并整理出仅供参考的主题清单：依赖升级、Spring AI 适配、ES/Docker、Flowable。

验收：

1. `bytedesk-main` 已存在，且其工作树已和当前 `bytedesk-3.x` 基线对齐。
2. `main` 上已有一个纯基线同步 commit，后续升级可在该提交之后分批展开。
3. 升级前能稳定复现当前成功构建与关键功能冒烟。

### 阶段 1：Spring Boot 4 预清理

目标：在不改目标大版本前，先消掉已知兼容性噪音，降低主升级面的噪音。

建议动作：

1. 扫描并清理 Spring 7 / Boot 4 下已废弃或已移除 API（重点：自动配置注册方式、过时属性绑定注解）。
2. 复查 `package-info.java`、Nullness 注解、框架推荐替代方式。
3. 复查自定义自动配置和配置属性类，确保没有依赖过时注册方式。
4. 保持此阶段不引入 Flowable 8 和 ES 9，避免变量过多。
5. **已验证可跳过**：`javax.*` → `jakarta.*` 迁移（54 处 import 均为 JDK 标准库，无 Jakarta EE 旧包）。

验收：在当前 Boot 3.5.16 下仍可编译通过，且清理结果可独立提交。

### 阶段 2：Spring AI 2.0 适配

目标：先把 AI 子系统切到 2.0 接口面，再与 Boot 4.1 汇合。

建议动作：

1. 统一根属性 `spring-ai.version -> 2.0.0`。
2. 逐个校验 `modules/ai` 与 `modules/kbase` 的 Spring AI artifacts 是否存在坐标变化。
3. **优先修复 `MoonshotChatModel`**（最高风险项，~550 行）：
   - 移除 `internalToolExecutionEnabled` 调用 → 删除相关 setter/getter/builder 代码。
   - 移除 `ToolExecutionEligibilityPredicate` → 替换为 `ToolExecutionEligibilityChecker`。
   - 移除 ChatModel 内部 tool-call 循环 → 改用 `ToolCallingManager` 手动驱动（Spring AI 2.0 提供了官方迁移示例）。
   - `MoonshotChatOptions` 中删除相关字段和 builder 方法。
4. 修复自定义适配层：
   - `BytedeskDashScopeChatModel` → 复查 `ChatModel.call()` / `stream()` 接口签名。
   - `BytedeskDashScopeEmbeddingModel` → 复查 `EmbeddingModel` 接口契约。
   - `ChatResponseMetadata` / usage mapping 复查。
5. 修复 `ToolCallingManager` 消费者：
   - `SpringAIMoonshotChatConfig.java` → 适配新的 ToolCallingManager API。
   - `SpringAIMoonshotService.java` → 同上。
   - `SpringAIToolsController.java` → 移除旧 API 调用，适配新 Tool 注册方式。
6. 复查 `ChatMemory` / `MessageChatMemoryAdvisor`：
   - `BookingAssistantService.java` → 检查 advisor 优先级。
   - `SpringAIToolsController.java` → 手动 memory 管理复查。
7. 改 artifact 坐标：`modules/ai/pom.xml` 中 `spring-ai-advisors-vector-store` → `spring-ai-vector-store-advisor`。
8. 对 `enterprise/ai`、`enterprise/core`、`channels/douyin` 等二级依赖模块做聚焦编译。

验收：

1. `modules/ai` 编译通过（含 `MoonshotChatModel`）。
2. `modules/kbase` 编译通过。
3. 至少 `BytedeskDashScopeChatModelTest` 单测通过。
4. `enterprise/ai` 编译通过。

### 阶段 3：Spring Boot 4.1.0 + springdoc 3.0.3

目标：完成平台主升级，并把 OpenAPI 文档链路恢复到可运行状态。

建议动作：

1. 根父 POM 切到 `spring-boot-starter-parent 4.1.0`。
2. 根属性 `springdoc.version -> 3.0.3`。
3. 统一复查以下模块的 springdoc 依赖是否仍为可用 starter：
   - `modules`
   - `starter`
   - `channels`
   - `control`
   - `enterprise`
   - `plugins`
   - `projects`
4. 在 `starter/pom.xml` 中加入 `spring-boot-properties-migrator`（`runtime` scope），启动后根据诊断日志调整配置属性，验证完成后移除该依赖。
5. 启动后回归：
   - `/v3/api-docs`
   - `/v3/api-docs.yaml`
   - `/swagger-ui.html`
6. 同步复核 Boot 4 周边 starter 坐标迁移是否完整，其中包括 `druid-spring-boot-3-starter -> druid-spring-boot-4-starter`，版本保持 `1.2.28` 不变。

验收：

1. `starter` 能编译并启动。
2. Swagger 文档可访问。
3. 主要 Spring MVC 控制器无明显启动装配失败。

### 阶段 4：Elasticsearch 9.x 与 Docker 基础设施升级

目标：匹配 Boot 4 / Spring Data Elasticsearch 新版本要求，避免客户端-服务端主版本错位。

建议动作：

1. 按实际 compose 落点升级对应组件：
   - 所有目标 compose：`elasticsearch` 镜像（当前 `8.18.0` → `9.x`）与 IK 插件。
   - 仅 `deploy/docker/compose-base.yaml`：`logstash`、`kibana` 镜像（当前 `8.18.0` → `9.x`）。
2. 把 IK 插件 ZIP 与自动安装脚本从 `8.18.0` 改为目标 `9.x` 兼容版本。
3. 升级前做索引快照或等价备份。
4. 同步更新 ELK 监控文档中所有 8.18 链接与 `bytedesk-kibana` 启动说明。
5. 对知识库全文索引、向量索引、IK 分词、索引重建接口进行回归。

重点说明：当前仓库文档和 compose 显式写死了 `elasticsearch-analysis-ik-8.18.0.zip`，这意味着 ES 9 升级不是单改镜像标签，必须同时改插件下载地址、缓存文件名、安装 entrypoint 和文档说明。

验收：

1. ES 容器可启动。
2. IK 插件成功加载。
3. Logstash 能正常写入 ES。
4. Kibana 能正常连接 ES 并打开 Discover。
5. 知识库索引创建、重建、检索正常。

### 阶段 5：Flowable 8.0.0

目标：把流程引擎升级放到平台稳定之后，单独处理业务流程兼容。

建议动作：

1. 根属性 `flowable.version -> 8.0.0`。
2. 仅先聚焦 [modules/ticket/pom.xml](../../modules/ticket/pom.xml) 与 `modules/ticket` 编译。
3. 逐步回归以下能力：
   - 流程定义部署
   - 发起流程
   - 待办查询
   - 签收/转派/完成任务
   - SLA 任务与定时器
   - 评论与处理记录
   - 工单自动分配与审批流相关逻辑
4. 必要时先做“版本兼容性 spike”，确认 8.0.0 下是否仍需 `flowable-engine`、`flowable-engine-common` 等显式依赖。

验收：

1. `modules/ticket` 编译通过。
2. 至少一条真实工单流程能从创建走到处理完成。
3. 关键服务如 `TicketService`、`TicketAssignmentService`、`TicketSLAService` 冒烟通过。

### 阶段 6：全量回归与文档收尾

目标：完成最终整体验证，并同步项目文档。

建议动作：

1. 更新部署文档、依赖说明文档和升级记录。
2. 运行重点模块编译与最小回归测试。
3. 补充一份升级结果说明，记录破坏性变更和后续观察项。

---

## 7. 推荐验证清单

### 7.0 阶段 0 基线同步验证

阶段 0 完成后，先不要进入版本升级，必须完成以下验证：

1. `bytedesk-main` 当前分支为 `main`。
2. `bytedesk-main` 最近一条提交是纯基线同步提交，提交信息建议为 `chore: sync bytedesk-3.x baseline into main`。
3. `bytedesk-main` 工作区干净：`git status --short` 无输出。
4. `bytedesk-main` 中根 [pom.xml](../../pom.xml) 仍保持 Spring Boot `3.5.16`、Spring AI `1.1.2`、Flowable `7.2.0`、springdoc `2.8.8`，证明阶段 0 未提前混入升级修改。
5. 在 `bytedesk-main` 中执行与当前仓库相同的 Maven 编译基线，确认纯同步后仍可构建。
6. 记录 `bytedesk-main` 的基线同步 commit hash，作为阶段 1 之后所有升级批次的回滚锚点。

### 7.1 编译验证

建议至少覆盖：

1. `./starter/mvnw -f pom.xml -pl modules/ai -am -DskipTests compile`
2. `./starter/mvnw -f pom.xml -pl modules/kbase -am -DskipTests compile`
3. `./starter/mvnw -f pom.xml -pl modules/ticket -am -DskipTests compile`
4. `./starter/mvnw -f pom.xml -pl starter -am -DskipTests compile`

建议在实际升级实施时固定使用 Java 21，例如：

```bash
env JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home ./starter/mvnw -f pom.xml -pl modules/ai -am -DskipTests compile
env JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home ./starter/mvnw -f pom.xml -pl modules/kbase -am -DskipTests compile
env JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home ./starter/mvnw -f pom.xml -pl modules/ticket -am -DskipTests compile
env JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home ./starter/mvnw -f pom.xml -pl starter -am -DskipTests compile
```

### 7.2 运行冒烟

建议至少覆盖：

1. `starter` 本地启动
2. Swagger UI 可访问
3. AI 对话接口可返回
4. 知识库检索可用
5. 工单流程创建与流转可用

### 7.3 Docker / ES 冒烟

建议至少覆盖：

1. ES 容器启动成功
2. `/_cat/plugins` 能看到 `analysis-ik`
3. 索引升级或重建接口成功
4. 一次实际中文分词查询成功

### 7.4 每阶段退出门禁

每个阶段结束前，都需要满足以下门禁，才允许进入下一阶段：

| 阶段 | 必须满足的退出条件 |
| ------ | ------ |
| 阶段 0 | `main` 纯 3.x 基线同步 commit 已完成；工作区干净；未引入任何 4.x 版本变更 |
| 阶段 1 | 预清理提交在 Boot 3.5.16 下可编译；没有混入 Spring AI 2 / ES 9 / Flowable 8 修改 |
| 阶段 2 | `modules/ai`、`modules/kbase`、`enterprise/ai` 编译通过；Spring AI 2 相关测试通过；无 spring-ai-alibaba 运行时依赖回流 |
| 阶段 3 | `starter` 可编译并启动；`spring-boot-properties-migrator` 发现的问题已处理；验证完成后 migrator 已移除 |
| 阶段 4 | ES 9、IK、Logstash、Kibana 同步升级并可启动；知识库索引创建/重建/检索正常；已有索引有备份或可重建方案 |
| 阶段 5 | `modules/ticket` 编译通过；至少一条工单流程完成端到端冒烟；Flowable 8 行为差异已记录 |

任何阶段如果只完成“代码能编译”但未满足该阶段的业务或基础设施门禁，不能进入下一阶段。

---

## 8. 回滚策略

### 8.1 回滚原则

每一阶段都必须保证“可单独回滚”，不能只依赖最终大回退。

### 8.2 建议回滚点

1. `阶段 1` 预清理单独提交，可无风险回滚。
2. `阶段 2` Spring AI 2.0 单独提交，若自定义适配层异常，可先回退 AI 子系统，不影响其他模块。
3. `阶段 3` Boot 4.1 + springdoc 3 单独提交，若启动失败，回退到 Boot 3.5.16。
4. `阶段 4` ES 9.x 升级前必须先做快照，确保镜像与索引都可恢复。
5. `阶段 5` Flowable 8 单独提交，若流程行为异常，可仅回退工单流程引擎层。

### 8.3 仓库级回滚点

由于这次升级明确发生在 `bytedesk-private/main`，回滚点除了技术阶段，还应包含仓库阶段：

1. `main` 克隆完成后，记录“同步前原始 main HEAD”。如果发现当前主线初始化策略有误，可直接回到该 commit。
2. `bytedesk-3.x` 覆盖同步完成后，保留一个“纯 3.x 基线同步”提交；这是后续所有升级批次的统一回退锚点。
3. 每个升级批次独立提交，不将 Boot 4、Spring AI 2、ES 9、Flowable 8 混成一个 commit。
4. 若 `bytedesk-4.x` 参考变更引入问题，优先回退对应主题提交，不回退整个 `main` 同步基线。

### 8.4 提交与推送原则

1. 阶段 0 的基线同步提交可以先只提交到本地 `bytedesk-main`，完成编译验证后再推送远程 `main`。
2. 后续升级阶段建议每个阶段至少一个独立 commit；如果某阶段跨度过大，可继续拆成“依赖版本修改”“编译修复”“运行配置修复”“文档更新”等小 commit。
3. 每个 commit message 必须能反映变更边界，例如：
   - `chore: sync bytedesk-3.x baseline into main`
   - `chore: prepare spring boot 4 compatibility cleanup`
   - `feat: migrate spring ai integrations to 2.0`
   - `chore: upgrade spring boot and springdoc`
   - `chore: upgrade elasticsearch docker stack to 9.x`
   - `feat: upgrade flowable engine to 8.0`
4. 禁止在同一个 commit 中同时包含“框架升级”和“不相关业务重构”。如果执行中发现必须顺手修业务 bug，应单独提交并在提交说明中标记原因。
5. 推送远程 `main` 前必须再次确认：工作区干净、最近提交边界正确、关键编译验证已通过、没有误删目标仓库必须保留的文件。

---

## 9. 建议最终落地节奏

建议不要做“一次升级全部完成”，而是拆成以下 5 个实施批次：

1. 批次 A：`main` 仓库初始化，完成 `bytedesk-3.x` → `main` 基线同步提交。
2. 批次 B：Spring Boot 4 预清理。
3. 批次 C：Spring AI 2.0 + 自定义 DashScope 适配层修复。
4. 批次 D：Spring Boot 4.1.0 + springdoc 3.0.3 + ES 9.x。
5. 批次 E：Flowable 8.0.0 + 工单流程专项回归。

这样做的原因是：

1. 先把“仓库主线准备”与“技术升级”解耦，避免一开始就在错误基线上改代码。
2. 每批都有清晰责任边界。
3. 每批都能独立编译验证。
4. 出问题时能快速定位和回滚。

---

## 10. 已确认事项

在正式执行升级前，关键决策已确认如下：

1. 是否接受“Flowable 8 不与 Boot 4 同一个提交批次”，改为后置专项升级。答：接受
2. 是否接受“Spring AI 当前真实起点按 1.1.2 处理”，而不是按 TODO 中的 1.1.8 处理。 答：接受
3. 是否接受“Boot 4 升级时同步升级 ES 9.x、IK 插件、Logstash/Kibana”，而不是只改 Java 依赖。答：接受
4. 是否接受先在 `/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-main` 克隆 `main`，并先提交一个“纯 3.x 基线同步 commit”，再开始升级。答：接受
5. 是否接受 `bytedesk-4.x` 仅作为参考分支，不直接 merge 到 `main`。答：接受
6. 是否需要我在下一步先做“阶段 0 + 阶段 1”的实际升级实施，而继续把 Flowable 8 留到后一批。答：需要

---

## 11. 参考资料

1. Spring Boot 4.0 Migration Guide  
   `https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide`
2. Spring AI Upgrade Notes  
   `https://docs.spring.io/spring-ai/reference/upgrade-notes.html`
3. springdoc-openapi Spring Boot 4 分支  
   `https://github.com/springdoc/springdoc-openapi/tree/spring-boot-4`
4. Flowable Spring Boot 集成文档  
   `https://www.flowable.com/open-source/docs/bpmn/ch05a-Spring-Boot`
