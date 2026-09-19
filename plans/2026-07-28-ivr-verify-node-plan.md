# IVRBuilder 验证节点 — 规划文档

> 日期：2026-07-28
> 状态：**已实现**（代码已落地，后端编译/测试通过，前端构建通过；仅工作包 H 文档与运维说明待补充）
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md) 第 34-35 行

---

## 0. 当前现状速览

| 组件 | 状态 | 说明 |
| --- | --- | --- |
| 前端 `IVRBuilder` 节点类型 | ✅ 已包含 `verify` 节点 | 支持双输出端口（verifySuccess / verifyFailure） |
| 前端 `http` 节点 | ✅ 已可配置接口调用与播报模板 | 是验证节点最直接的实现参考 |
| 后端 `IvrMenuHttapiController` | ✅ 已支持 `verify` 类型与 `::verify::` 阶段 token 解析 | 多步收号通过 contextJson 跨回调保持状态 |
| 后端 `IvrExecutionStep` | ✅ 已扩展 `contextJson` / `failureReason` / `outcome` 字段 | 不影响其他节点原有签名 |
| `IvrRecordEntity` | ✅ 已新增 `contextJson` TEXT 列 | 多步验证状态在 HTTAPI 回调间持久化 |
| Liquibase 迁移目录 | ✅ `260728_add_ivr_record_context_json.xml` 已创建并加入 master | — |
| 默认密码验证 demo | ✅ 已改为真实 `verify` 节点 | 替代原有 keyboard 模拟逻辑 |

### 0.1 控制性结论

本次规划必须先补齐 **多步验证状态承载能力**，再新增 `verify` 节点。否则前端节点即使保存成功，后端也无法跨多次 HTTAPI 回调记住“第一步已输入的账号/手机号”和“当前是第几步采集”。

---

## 1. 概述

在 IVRBuilder 中新增"验证节点"，支持来电用户在 IVR 流程中进行身份验证，验证通过后可自动查询客户信息并播报。目标场景：

- **账号 + 密码验证**：用户输入账号和密码，系统调用后端接口校验身份
- **手机号 + 验证码验证**：用户输入手机号和短信验证码，系统校验后确认身份
- **验证通过后查询客户信息**：自动调用客户信息接口，播报账户余额/积分/状态等

---

## 1.1 范围校准

### 本期纳入范围

- 前端：新增 `verify` 节点类型，包含完整的拖拽、渲染、属性编辑能力
- 前端：节点支持双输出端口（验证成功 → 继续流程 / 验证失败 → 转人工或重试）
- 后端：`IvrMenuHttapiController` 中新增 `verify` 节点的运行时执行逻辑
- 后端：新建 `IvrVerifyNodeService`，封装验证 API 调用 + 客户信息查询
- 后端：预留扩展点，支持未来通过 ExtensionSettings 配置自定义验证 API

### 本期不纳入范围

- 短信验证码的实际发送（由业务方自行实现验证 API，IVR 只负责调用）
- 验证码倒计时 / 重发机制（这些属于业务 API 层面，不在 IVR 节点内实现）
- 人脸识别 / 声纹验证等高级验证方式（可在后续扩展 `verifyType` 枚举）
- 数字人 / 视频验证

### 结论

首版实现一个可配置的验证节点，通过 HTTP 调用外部验证 API，支持成功/失败双分支路由，并在 IVR 运行时补齐多轮收号状态闭环。

---

## 2. 现状分析

### 2.1 现有密码验证演示

| 组件 | 状态 | 说明 |
| --- | --- | --- |
| 前端 demo schema `createPasswordVerificationDemoSchema()` | ✅ 已改为 `verify` 节点 | 使用 `verifySuccess` / `verifyFailure` 端口 |
| 后端 demo schema `buildDefaultPasswordVerificationIvrWorkflowSchemaJson()` | ✅ 已改为 `verify` 节点 | 对接 `/visitor/api/v1/ivr/demo/verify` |
| 专用 workflow UID `df_ivr_password_verification_wf_uid` | ✅ 存在 | - |
| 专用分机号 `5005` | ✅ 存在 | `BytedeskConsts.DEFAULT_IVR_PASSWORD_VERIFICATION_EXTENSION_NUMBER` |
| 真实验证逻辑 | ✅ 已实现 | `IvrVerifyNodeService` + demo API 在 `IvrDemoHttpController` 中 |

### 2.2 现有 HTTP 节点（参考实现）

`http` 节点是可复用度最高的参考实现：

| 维度 | http 节点 | verify 节点（新） |
| --- | --- | --- |
| 端口 | 单输入 + 单输出 | 单输入 + **双输出**（success / failure） |
| 数据字段 | apiUrl, httpMethod, requestBody, responseTemplate, failurePrompt, timeoutMs | 继承上述字段，额外增加 verifyType, 分步采集提示文本, customerApiUrl, customerInfoTemplate, maxRetries |
| 前端表单 | PropertyDrawer 中 HTTP 卡片 | 新增验证专属卡片 |
| 后端执行 | `IvrHttpNodeService.execute()` → 返回播报文本列表 | `IvrVerifyNodeService.execute()` → 返回播报文本 + 成功/失败状态 |
| 运行时路由 | 始终走 defaultOutput | 按 API 返回结果走 successOutput 或 failureOutput |

### 2.3 现有运行时架构

IVR 运行时链路（`IvrMenuHttapiController`）：

```text
FreeSWITCH httapi 回调
    → queryByExtensionNumberForHttapi(extensionNumber, uuid, callerIdNumber, nodeId, digits)
        → resolveExecutionStep()
            ├── 首次（nodeId 为空）→ resolveInitialStep()
            │     线性推进 start → text → http → ... 直到命中 keyboard/transfer/end
            │
            └── 收号后（nodeId + digits）→ resolveFromNode()
                  匹配 keyboard option → resolveLinearStep() 继续推进
```

**关键约束**：当前运行时"线性推进"模式下，节点之间不传递上下文（如前面收集的 digits）。每个节点只知道自己的 `data` 和全局变量（`extensionNumber`, `callerIdNumber`, `uuid`）。

### 2.4 当前方案缺口

当前代码基线下，验证节点要落地还差 3 个关键能力：

1. `IvrMenuHttapiController.resolveFromNode()` 当前会先按 `nodeId` 查真实节点，若直接传入 `{nodeId}:step1` 这类伪节点 id，会立即查找失败。
2. `IvrRecordEntity` 当前没有 `contextJson`、`step`、`retryCount` 之类字段，无法跨请求保存采集阶段与已输入值。
3. 当前数据库迁移规范是走 `starter/src/main/resources/db/changelog/migration/`，并由 `starter/src/main/resources/db/changelog/master.xml` include，因此如果要给 `IvrRecordEntity` 增字段，规划中必须同时包含新 migration 与 master include，不应只写 Java 实体修改。
4. `IvrExecutionStep` 当前没有"选择输出端口"语义，verify 节点成功/失败需要控制器额外判断后调用 `findNextNodeId`。

---

## 3. 设计方案

### 3.1 节点数据模型

```typescript
// verify 节点 data 结构
interface IvrVerifyNodeData {
  title: string;                    // 节点标题，默认 "身份验证"
  content: string;                  // 播报提示文案
  description: string;              // 节点描述
  
  // 验证模式
  verifyType: 'account' | 'phone_sms';  // 账号密码 / 手机验证码
  
  // 分步采集提示（account 模式）
  accountPrompt: string;            // "请输入账号，按 # 结束"
  passwordPrompt: string;           // "请输入密码，按 # 结束"
  
  // 分步采集提示（phone_sms 模式）
  phonePrompt: string;              // "请输入手机号码，按 # 结束"
  codePrompt: string;               // "请输入短信验证码，按 # 结束"
  
  // 验证 API
  verifyApiUrl: string;             // 验证接口地址
  verifyHttpMethod: 'GET' | 'POST'; // 请求方法
  verifyRequestBody: string;        // POST 请求体模板
  verifyTimeoutMs: number;          // 超时（毫秒）
  
  // 成功分支
  successPrompt: string;            // "验证成功"
  customerApiUrl: string;           // 客户信息查询接口（可选）
  customerHttpMethod: 'GET' | 'POST';
  customerRequestBody: string;
  customerInfoTemplate: string;     // "您的账户余额为 ${balance} 元"
  customerTimeoutMs: number;
  
  // 失败分支
  failurePrompt: string;            // "验证失败，请重试"
  maxRetries: number;               // 最大重试次数，默认 3
}
```

### 3.2 节点端口设计

verify 节点有 **1 个输入端口 + 2 个输出端口**：

| 端口 ID | 方向 | 用途 |
| --- | --- | --- |
| `defaultInput` | 输入 | 流程入口 |
| `verifySuccess` | 输出 | 验证成功 → 继续后续流程（如播报客户信息） |
| `verifyFailure` | 输出 | 验证失败 → 转人工 / 重试验证 / 挂断 |

> 这与现有的 `condition`/`keyboard` 节点类似（它们也只有输入端口，输出端口由 options/conditions 动态创建）。

### 3.2.1 success/failure 端口落地方式

为降低对 FlowGram 端口模型的侵入，首版不引入完全动态列表，而是给 `verify` 节点定义两个固定输出端口：

- `verifySuccess`
- `verifyFailure`

这样前端、schema、后端的边解析都更简单，运行时只需根据验证结果选择 `findNextNodeId(edges, verifyNodeId, portId)`。

前端渲染上，建议参考 `keyboard` 和 `ChatBuilder` 里的自定义端口写法，在 `NodeRender` 中输出两个带 `data-port-id` / `data-port-type="output"` / `data-port-location="right"` 的 DOM 节点：

```tsx
<div data-port-id="verifySuccess" data-port-type="output" data-port-location="right" />
<div data-port-id="verifyFailure" data-port-type="output" data-port-location="right" />
```

`getDefaultPorts('verify')` 只注册输入端口，两个输出端口交给节点内部 DOM 暴露，避免和 FlowGram 默认端口重复。

### 3.3 前端交互流程

```text
用户从 PaletteSider 拖拽 "验证节点" 到画布
    → createNodeByType('verify', position) 创建默认数据
    → 节点渲染为双输出端口（绿色 success / 红色 failure）
    → 点击节点 → PropertyDrawer 显示验证专属表单：
        ├── 验证模式选择（Radio: 账号密码 / 手机验证码）
        ├── 分步采集提示文本（随模式切换动态显示）
        ├── 验证接口配置卡片（apiUrl, httpMethod, requestBody, timeoutMs）
        ├── 验证成功配置卡片（successPrompt, customerApiUrl, customerInfoTemplate）
        └── 验证失败配置卡片（failurePrompt, maxRetries）
    → 用户连线 success → 播报节点 / failure → 转人工节点
    → 保存时 schema 中的 verify 节点包含完整配置
```

### 3.4 后端运行时流程

在 `IvrMenuHttapiController` 中，`verify` 节点的执行需要**多步交互**：

```text
用户来电进入 verify 节点
    │
    ▼
Step 1: 播报 content 提示 → 播报 accountPrompt/phonePrompt
    → 指示 FreeSWITCH 收号（digits = 账号/手机号）
    │
    ▼ (FreeSWITCH 回调，digits=账号)
Step 2: 保存 digits 到上下文 → 播报 passwordPrompt/codePrompt
    → 指示 FreeSWITCH 收号（digits = 密码/验证码）
    │
    ▼ (FreeSWITCH 回调，digits=密码/验证码)
Step 3: 组装完整凭证 → 调用 verifyApiUrl
    ├── 成功 → 播报 successPrompt
    │         → （可选）调用 customerApiUrl → 播报 customerInfoTemplate
    │         → 返回 success 信号 → 路由到 verifySuccess 端口目标节点
    │
    └── 失败 → retryCount < maxRetries？
              ├── 是 → 播报 failurePrompt + "请重新输入" → 回到 Step 1
              └── 否 → 返回 failure 信号 → 路由到 verifyFailure 端口目标节点
```

**关键技术方案：**

1. **分步收号协议**：继续复用 `IvrExecutionStep.collect()`，但 `nextNodeId` 不能直接伪造为未知节点 id；需要先在控制器中约定并解析类似 `{nodeId}::verify::account`、`{nodeId}::verify::password` 的阶段 token。
2. **上下文暂存**：为 `IvrRecordEntity` 新增 `contextJson` 字段（TEXT 类型），保存已输入账号/手机号、当前阶段、重试次数等。
3. **成功/失败路由**：verify 节点执行完毕后，不是直接"返回 success 信号"，而是明确解析 `verifySuccess` / `verifyFailure` 对应边，得到真实目标节点 id。
4. **双输出协议**：`IvrVerifyNodeService` 返回时通过 `Map` 标注 `ivrVerifyOutcome=success|failure`，控制器通过 `findNextNodeId(edges, nodeId, portId)` 拿到真实下一跳。

### 3.5 推荐状态协议

建议不要把多步验证状态分散在多个字段里，而是统一放入 `contextJson`。首版结构建议如下：

```json
{
    "nodeType": "verify",
    "verifyStep": "account",
    "verifyType": "account",
    "account": "13800138000",
    "password": null,
    "phone": null,
    "code": null,
    "retryCount": 1
}
```

配套协议：

- `nextNodeId={nodeId}::verify::account`：下一轮收账号/手机号
- `nextNodeId={nodeId}::verify::password`：下一轮收密码/验证码
- `nextNodeId={nodeId}::verify::submit`：进入接口校验阶段

> `deploy/freeswitch/conf/dialplan/default/5005-ivr-workflow.xml` 等现有 IVR dialplan 已经通过 `ivr_next_node_id` 回传下一节点，因此阶段 token 可以继续走现有通道，不需要首版修改 FreeSWITCH XML；但测试时必须验证 `::` 这类字符在变量传递和 URL 参数中能被正确编码/回传。

控制器收到 `nodeId` 后：

1. 先判断是否为 `verify` 阶段 token
2. 若是，则拆出真实 `nodeId` + 当前阶段
3. 再查真实节点，并从 `IvrRecordEntity.contextJson` 恢复上下文

### 3.6 首版约束

为避免首期复杂度失控，首版建议明确限制：

- 仅支持 DTMF 数字输入，不支持字母账号/复杂密码
- 账号/手机号/验证码/服务密码均按数字串处理
- 验证通过后的客户信息查询先做成“可选第二次 HTTP 调用”，不做通用脚本编排
- 不在首版支持同一验证节点内发送短信验证码，只负责校验已经下发的验证码

### 3.7 IvrExecutionStep 扩展（仅影响 verify 链路）

`IvrExecutionStep` 目前通过 `channelVariables` 传递附加信息（如 decisionResult、queueUid）。首版不改 record 签名，而是复用 `channelVariables` 传递：

```java
IvrExecutionStep.collect(prompts, nextNodeId) // 现有方法，不变
IvrExecutionStep.transfer(prompts, app, data, 
    Map.of("ivr_verify_outcome", "success", ...), ...) // channelVariables 加 outcome
```

控制器在收到 verify 完成结果后：

1. 从 `channelVariables` 读取 `ivr_verify_outcome`
2. `String portId = "success".equals(outcome) ? "verifySuccess" : "verifyFailure"`
3. `String targetId = findNextNodeId(edges, verifyNodeId, portId)`
4. `return resolveLinearStep(nodes, edges, ..., targetId, ...)`

这样不影响其他节点的 `IvrExecutionStep` 签名，也不需要在 `IvrRecordEntity` 或 `recordExecution` 中额外传递 outcome。

---

## 4. 实施工作包

### 工作包 A：前端 — 类型与配置（config.tsx + types.ts）

**文件**：`frontend/apps/workflow/src/pages/Dashboard/IVRBuilder/types.ts`

- [x] A1. `IvrNodeType` 联合类型新增 `'verify'`

**文件**：`frontend/apps/workflow/src/pages/Dashboard/IVRBuilder/config.tsx`

- [x] A2. `IVR_PALETTE_ITEMS` 新增 verify 条目（图标：`SafetyOutlined`，颜色：`#fa8c16` orange）
- [x] A3. `createNodeByType` 新增 `'verify'` case，返回默认数据
- [x] A4. `normalizeNodeData` 新增 `'verify'` case，标准化所有字段
- [x] A5. `getDefaultPorts` 新增 `'verify'` case → 仅 `defaultInput`（输出端口动态创建）
- [x] A6. `nodeRegistries` 新增 `'verify'` 条目
- [x] A7. `NODE_STYLE_MAP` 新增 `'verify'` 的 light/dark 主题
- [x] A8. `getNodeDisplayType` / `getNodeDisplayTypeI18n` 新增 `'verify'` case
- [x] A9. `getIvrPaletteItems` 新增 verify 条目
- [x] A10. 新增 `VERIFY_SUCCESS_PORT_ID` / `VERIFY_FAILURE_PORT_ID` 常量，避免前后端硬编码不一致

**文件**：`frontend/apps/workflow/src/pages/Dashboard/IVRBuilder/index.tsx`

- [x] A11. `handleCanvasDrop` 允许列表新增 `'verify'`
- [x] A12. `form.setFieldsValue` 中新增 verify 字段回填

**文件**：`frontend/apps/workflow/src/pages/Dashboard/IVRBuilder/components/NodeRender.tsx`

- [x] A13. 新增 verify 节点的渲染逻辑（显示验证模式标签、success/failure 端口）
- [x] A14. success/failure 端口使用 `data-port-id` 暴露固定输出端口，样式复用 `ivr-node-option-port` 或新增轻量样式

**文件**：`frontend/apps/workflow/src/pages/Dashboard/IVRBuilder/components/PropertyDrawer.tsx`

- [x] A15. 新增 `Radio`、必要时新增 `Select` 等 Ant Design 组件导入
- [x] A16. 新增 verify 节点属性编辑卡片：
  - 验证模式选择（Radio）
  - 分步采集提示文本（根据模式动态显示）
  - 验证 API 配置
  - API 成功判定协议说明（Tooltip 提示：优先读 `success=true`，其次看 HTTP 200）
  - 客户信息查询配置
  - 重试次数
  - PropertyDrawer 中 verify 内容 label 与现有 http 类似但文案区分开

### 工作包 B：前端 — 国际化

**文件**：`frontend/apps/workflow/src/locales/zh-CN/ivrBuilder.ts` 及对应 `en-US`、`ja-JP` 文件

- [x] B1. 新增 verify 节点相关的 i18n key（zh-CN / en-US / zh-TW 三套文案已完成）

### 工作包 C：后端 — 运行时执行

**文件**：`enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java`

- [x] C1. `resolveInitialStep` 中新增 `"verify"` 类型处理 → 委托给 `IvrVerifyNodeService`
- [x] C2. `resolveLinearStep` 中新增 `"verify"` 类型处理
- [x] C3. `resolveFromNode` 先解析 verify 阶段 token，再恢复真实节点 id 与当前阶段
- [x] C4. 支持 verify 节点的分步收号（通过 `nextNodeId` 阶段协议区分采集阶段）
- [x] C5. `recordExecution()` 写入 `contextJson`，并在阶段 token 场景下保存真实节点 id 与原始阶段 token
- [x] C6. `extractNodeContent()` 新增 `"verify"` 类型到允许提取内容的节点列表

**新建文件**：`enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrVerifyNodeService.java`

- [x] C7. 实现 `executeVerifyNode(JsonNode node, String extensionNumber, String callerIdNumber, String uuid, String collectedDigits, String stage, String baseUrl, String contextJson)`
  - 解析节点配置
  - 分步采集：primary 收账号/手机号 → secondary 收密码/验证码 → submit 调验证 API
  - 验证 API 调用（自建 HttpClient，模板/JSON 扁平化逻辑已内置）
  - 成功 → 调客户信息 API → 返回成功 + 播报文本
  - 失败 → 判断重试 → 返回失败或重试
- [x] C8. 模板变量支持：`${callerIdNumber}`, `${extensionNumber}`, `${uuid}`, `${account}`, `${password}`, `${phone}`, `${code}`
- [x] C9. 从 `verifySuccess` / `verifyFailure` 端口解析真实下一跳节点（控制器端 `findNextNodeId`）
- [x] C10. 明确 API 成功判定协议：优先读取 `success=true`，否则读取 `code=200`；失败时读取 `message` 作为失败播报补充

#### IvrExecutionStep 扩展

当前 `IvrExecutionStep` 没有"选择输出端口"字段。verify 节点需要控制器在执行完验证后知道走 success 还是 failure 边。建议新增工厂方法：

- [x] C11. 实际采用 `VerifyExecutionResult.outcome()` + `IvrExecutionStep.withPromptsAndContext()` 传递 outcome，控制器由 `buildVerifyStep` 统一做完 `findNextNodeId(edges, verifyNodeId, portId)` 后再 `resolveLinearStep`（含 `orgUid` 透传）

> **实现偏差**：规划建议用 `channelVariables`，实际落地时 `IvrExecutionStep` 新增了 `contextJson`/`failureReason`/`outcome` 字段和 `withPromptsAndContext()` 工厂方法，配合 `VerifyExecutionResult.outcome()` 实现双端口路由，比 `channelVariables` 更显式。

### 工作包 D：后端 — 数据记录

**文件**：`enterprise/call/src/main/java/com/bytedesk/call/ivr_record/IvrRecordEntity.java`

- [x] D1. 为 `IvrRecordEntity` 新增 `contextJson` 字段，用于暂存 verify 节点中间状态
  - 字段定义：`@Column(name = "context_json", columnDefinition = "TEXT")`
- [x] D2. 更新 `IvrRecordRequest` / `IvrRecordResponse` / `IvrRecordRestService.upsertSystemIvrRecord()` 透传 `contextJson`
- [x] D3. 更新 `IvrRecordRestService.mergeFromRequest()` 与 `handleOptimisticLockingFailureException()`，避免并发 upsert 时丢失 `contextJson`
- [x] D4. 更新 `convertToResponse()`，将 `contextJson` 输出到响应中

**文件**：`starter/src/main/resources/db/changelog/migration/260728_add_ivr_record_context_json.xml`

- [x] D5. 新增 Liquibase migration，为 `bytedesk_call_ivr_record` 增加 `context_json TEXT` 列
- [x] D6. 变更集需按仓库现有规则做 `tableExists + not columnExists` 判断，避免重复执行失败

**文件**：`starter/src/main/resources/db/changelog/master.xml`

- [x] D7. include `db/changelog/migration/260728_add_ivr_record_context_json.xml`

### 工作包 E：演示 schema 更新

**文件**：`frontend/apps/workflow/src/pages/Dashboard/IVRBuilder/config.tsx`

- [x] E1. 更新 `createPasswordVerificationDemoSchema()`，使用新的 `verify` 节点替代现有的 keyboard 模拟逻辑

**文件**：`modules/core/src/main/java/com/bytedesk/core/workflow/WorkflowInitData.java`

- [x] E2. 更新 `buildDefaultPasswordVerificationIvrWorkflowSchemaJson()`，使用 `verify` 节点

### 工作包 F：验证 API 示例

**新建文件**：`enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrVerifyDemoController.java`

- [x] F1. 提供演示用验证 API（`POST /visitor/api/v1/ivr/demo/verify`），接受 account/phone + password/code，返回模拟结果

> **实现偏差**：演示 API 未新建文件，而是加在现有 `IvrDemoHttpController` 中（复用同一 controller 前缀）。

**演示 API 返回协议**：

```json
// 成功
{"success":true,"customer":{"name":"演示用户","balance":"1580.50","level":"VIP"}}
// 失败
{"success":false,"message":"密码错误"}
```

### 工作包 G：验证与回归

#### 后端验证

- [x] G1. 为 `IvrVerifyNodeService` 增加单元测试（`IvrVerifyNodeServiceTest`，5 个用例：primary 提示、短信模式收号、失败重试、成功后客户模板播报）
- [x] G2. 为 `IvrMenuHttapiController` 增加集成测试（新增 3 个用例：首次收号、成功分支带 orgUid、失败分支转留言）
- [ ] G3. 验证 `::verify::` 阶段 token 在 `ivr_next_node_id` 变量、HTTAPI URL 参数和日志记录中均不会被截断（单元测试已验证 token 解析，实机 FreeSWITCH 验证待做）
- [x] G4. 验证 `findNextNodeId(edges, verifyNodeId, "verifySuccess")` 和 `findNextNodeId(edges, verifyNodeId, "verifyFailure")` 能正确解析边（控制器测试已覆盖）

#### 前端验证

- [x] G5. 前端 `pnpm build` 通过（TypeScript + Vite 集成层验证通过），交互层验证待做
- [x] G6. `createPasswordVerificationDemoSchema()` 改为 verify 节点后前端构建通过

### 工作包 H：文档与运维说明

- [ ] H1. 在开发说明中补充验证节点 API 返回协议示例
- [ ] H2. 在排障说明中补充 `IvrRecordEntity.contextJson`、`ivr_next_node_id`、`digits` 的查看方式
- [ ] H3. 明确验证节点不记录明文密码到普通业务日志；如需保存，只允许保存脱敏信息
- [ ] H4. 在 API 文档中补充 `POST /visitor/api/v1/ivr/demo/verify` 的 Swagger/OpenAPI 注解

---

## 5. 数据流示例

### 5.1 账号密码验证流程

```text
用户拨打 5005
    → IVR 加载 workflow → 线性推进到 verify 节点
    → Step 1: 播报 "请输入账号，按 # 结束" → 收号 → 用户输入 "13800138000#"
    → Step 2: 播报 "请输入密码，按 # 结束" → 收号 → 用户输入 "123456#"
    → Step 3: POST /visitor/api/v1/ivr/demo/verify
              body: {"account":"13800138000","password":"123456","callerIdNumber":"013311156272"}
    → 成功响应: {"success":true,"customer":{"name":"张三","balance":"1580.50"}}
    → 播报 "验证成功。张三，您的账户余额为 1580.50 元。"
    → 路由到 success 端口 → 继续后续流程（返回主菜单/挂断）
```

### 5.2 手机验证码验证流程

```text
用户拨打 5005
    → Step 1: 播报 "请输入手机号码，按 # 结束" → 收号 → 用户输入 "13800138000#"
    → Step 2: 播报 "请输入短信验证码，按 # 结束" → 收号 → 用户输入 "882931#"
    → Step 3: POST /api/verify-sms
              body: {"phone":"13800138000","code":"882931"}
    → 失败响应: {"success":false,"message":"验证码错误"}
    → 重试 (1/3): 播报 "验证码错误，请重新输入" → 回到 Step 2
    → ...
    → 3 次失败后 → 路由到 failure 端口 → 转人工坐席
```

---

## 6. 风险与注意事项

| 风险 | 缓解措施 |
| --- | --- |
| DTMF 收号无法区分字母/特殊字符（仅支持 0-9、*、#） | verify 节点的账号/密码只支持纯数字输入；若需字母密码，可在二期通过语音识别（ASR）采集 |
| FreeSWITCH 的 `read` 最大收号长度有限制 | 默认 16 位，足够覆盖手机号和短密码；配置中注明限制 |
| 分步收号的中间状态需要在多次 FreeSWITCH 回调间保持 | 使用 `IvrRecordEntity.contextJson` 暂存上下文，并通过 Liquibase 增列 |
| verify 节点的双输出端口是新的端口模式 | 复用现有 `keyboard`/`condition` 的动态端口机制，只需新增 2 个固定的 portId |
| `nextNodeId` 现有语义是“真实下一节点”，引入阶段 token 可能影响现有日志与统计 | 在文档和代码中明确 `::verify::` 前缀协议，并在统计口径里识别这类 token 不是实际业务节点 |
| 验证 API 失败后可能出现重复提交 | 通过 `uuid + verifyStep + retryCount` 做幂等控制，必要时在 `contextJson` 中记录最近一次提交标记 |
| 密码/验证码出现在日志或数据库中带来安全风险 | `contextJson` 中仅短暂保存当前通话所需状态，普通日志禁止输出明文密码/验证码；展示层只显示脱敏值 |
| migration 文件被创建但未加入 master | D7 单独列为必做项，避免本地编译通过但数据库未变更 |
| `IvrRecordEntity.contextJson` 字段若定义为 `@Lob`（MySQL → `LONGTEXT`）会浪费存储 | 建议用 `@Column(name = "context_json", columnDefinition = "TEXT")`，Verify 节点的状态 JSON 不会超过几 KB |

---

## 7. 推荐实施顺序

1. 先补后端状态承载与 Liquibase 变更
2. 再补控制器的阶段 token 解析
3. 然后实现 `IvrVerifyNodeService`
4. 最后补前端节点与默认 demo schema

原因：如果先做前端节点，现阶段保存出来的 schema 仍无法被运行时正确执行，验证链路会停在第二次 HTTAPI 回调。

---

## 8. 工时估算

| 工作包 | 内容 | 预估工时 |
| --- | --- | --- |
| A | 前端类型与配置 | 1.0d |
| B | 国际化 | 0.3d |
| C | 后端运行时 | 2.0d |
| D | 数据记录 + Liquibase | 0.5d |
| E | 演示 schema | 0.2d |
| F | 演示 API | 0.2d |
| G | 测试与回归 | 0.5d |
| H | 文档与运维说明 | 0.3d |
| **合计** | - | **5.0d** |

---

## 9. 验收标准

首版完成后至少满足：

1. ✅ IVRBuilder 画布可拖入 `verify` 节点，并能分别连接成功/失败两条线。（前端构建通过，`handleCanvasDrop` 已放开 `verify` 类型）
2. ✅ 保存 workflow 后刷新页面，`verify` 节点字段和连线不丢失。（`normalizeNodeData` / `normalizeSchema` 已覆盖 verify 类型）
3. ⬜ 拨打默认密码验证 IVR 分机 `5005`，可完成账号/密码两步收号。（待实机 FreeSWITCH 环境验证）
4. ✅ 验证 API 返回成功时，播报成功提示，并沿 `verifySuccess` 进入下一节点。（控制器测试覆盖）
5. ✅ 验证 API 返回失败且未超过重试次数时，可重新收号；超过后沿 `verifyFailure` 进入下一节点。（控制器 + service 测试覆盖）
6. ✅ `bytedesk_call_ivr_record.context_json` 能看到当前通话验证状态，但日志不输出明文密码/验证码。（`contextJson` 字段已落地，重试时 `clearSensitiveValues()` 清空密码/验证码）
7. ✅ `./starter/mvnw -f pom.xml -pl enterprise/call -am -DskipTests compile` 通过。（BUILD SUCCESS）

---

> **实施完成日期：2026-07-28**
> **待办项**：工作包 H（文档与运维说明），验收标准第 3 条（实机 FreeSWITCH 验证）。
