---
sidebar_label: 订单信息对接
sidebar_position: 2
---

# 业务系统订单信息对接

## 重要概念

- `shopUid`：来自业务系统的店铺唯一 uid，订单通过 `OrderEntity.shopUid` 关联所属店铺；`shopUid` 仅在组织内唯一、跨组织不保证唯一。
- `orgUid`：微语组织的唯一标识。一个组织下可拥有多个店铺，订单同时携带 `orgUid` 与 `shopUid` 标识所属组织与所属店铺；平台默认组织 `df_org_uid` 为聚合特例，查订单时可省略 `shopUid`。`orgUid` 无需自行构造，可通过[店铺信息对接](./shop_open.md)接口按 `shopUid` 获取：调用 `POST /api/v1/shop/open/onboard` 返回的 `shopList[].orgUid`，或 `GET /api/v1/shop/open/binding?shopUid=xxx` 返回的 `shop.orgUid`，均对应该 `shopUid` 所属组织。
- `visitorUid`：来自业务系统的用户唯一 uid。访客端聊天页通过 URL 参数 `visitorUid` 传入，订单中的 `visitorUid` 与之对应同一业务用户；客服桌面端右侧「订单信息」面板展示订单时，正是按此 `visitorUid` 过滤。
- 微语内部各实体另有系统自动生成的记录 `uid` 字段，与上述业务 uid 不同，对接时请勿混用。

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

订单信息传递请参考 [订单信息](../integration/order_info.md)

## 概述

订单管理接口由 `OrderRestController` 提供，基础路径为：

- `/api/v1/order`

当前支持的能力：

- 管理端分页查询
- 管理端按 uid 查询详情
- 管理端创建、更新、删除
- 按访客查询订单
- Excel 模板导出
- Excel 批量导入
- 演示数据初始化

## 鉴权说明

先登录获取 accessToken：

- `POST /auth/v1/login`
- `Content-Type: application/json`

```json
{
 "username": "admin@email.com",
 "password": "your_password",
 "channel": "FLUTTER",
 "platform": "BYTEDESK"
}
```

成功后从响应体中取 `data.accessToken`，后续请求头携带：

```http
Authorization: Bearer {accessToken}
```

说明：

- 当前 `OrderRestController` 中未显式声明 `@PreAuthorize`。
- 实际访问控制仍以系统整体安全配置为准。

## 通用请求约定

订单请求对象继承 `BaseRequest`，常用公共字段如下：

- `uid`：系统记录 uid
- `orgUid`：组织 uid，来源见上方「重要概念」（通过[店铺信息对接](./shop_open.md)按 `shopUid` 获取）
- `userUid`：用户 uid
- `type`：业务类型（`BaseRequest` 通用字段，非订单专有）
- `pageNumber`：页码，从 `0` 开始
- `pageSize`：分页大小，默认 `10`
- `sortBy`：排序字段
- `sortDirection`：`asc` 或 `desc`
- `searchText`：搜索关键字
- `startAt`：起始时间，ISO-8601
- `endAt`：结束时间，ISO-8601

订单特有字段如下：

- `orderUid`：订单业务唯一标识；微语按 `orderUid + orgUid` 幂等处理，重复创建时会更新已有订单
- `navigateToPath`：微信小程序订单详情跳转路径
- `title`：订单标题
- `description`：订单描述
- `state`：内部状态字段
- `time`：下单时间，字符串格式
- `status`：订单状态
- `statusText`：状态文案
- `orderTitle`：订单中商品快照标题
- `orderImage`：订单中商品快照图片
- `orderDescription`：订单中商品快照描述
- `orderPrice`：订单中商品快照价格
- `orderUrl`：订单中商品快照链接
- `orderTagList`：订单中商品快照标签列表
- `orderExtra`：订单中商品快照扩展信息
- `orderQuantity`：订单中商品快照数量
- `totalAmount`：订单总金额
- `shippingName`：收货人（请求中为扁平字段，直接传入）
- `shippingPhone`：收货电话（扁平字段）
- `shippingAddress`：收货地址（扁平字段）
- `paymentMethod`：支付方式
- `extra`：订单扩展信息
- `visitorUid`：业务系统用户唯一 uid
- `shopUid`：业务系统店铺唯一 uid

## 返回结构

接口统一返回 `JsonResult`：

```json
{
 "message": "success",
 "code": 200,
 "data": {}
}
```

失败时通常返回：

```json
{
 "message": "具体错误信息",
 "code": 500,
 "data": false
}
```

分页接口中，`data` 为 Spring Data `Page` 对象。

补充说明：

- `OrderResponse` 中还包含一组旧版兼容的 `goods*` 响应字段（`goodsUid`、`goodsTitle`、`goodsImage` 等），由订单中的 `order*` 商品快照字段映射而来；它们仅用于响应兼容，创建/更新订单时无需传入。
- 响应中的 `visitorNickname`、`visitorAvatar` 为服务端根据 `visitorUid` 关联访客资料后附加的展示字段。

## visitorUid 与 uid 区别

- `VisitorEntity.uid`：微语系统内部自动生成的访客记录 uid
- `VisitorEntity.visitorUid`：外部业务系统传入的业务用户唯一 uid

接入第三方订单系统时：

- 创建/更新订单请把业务系统用户标识传入 `visitorUid` 字段，不要误传微语系统内部 `uid`。
- 访客端聊天页通过 URL 参数 `visitorUid` 传入同一业务用户标识；desktop 与 visitor 查询订单时均按该 `visitorUid` 过滤，确保两端看到同一用户的订单。

## 前端消费场景（desktop / visitor）

订单数据在微语前端按业务用户 `visitorUid` 消费：

- 客服桌面端右侧「订单信息」面板：
  - 调用 `GET /api/v1/order/query/visitorUid`，按 `orgUid + visitorUid + shopUid` 查询当前会话访客的订单。
  - 面板使用的 `visitorUid` 由服务端会话用户解析而来（会话用户 uid → 访客资料 → 业务 `visitorUid`），与访客端 URL 传入的 `visitorUid` 对应同一业务用户。
  - 面板顶部需选择店铺（`shopUid`），即按「组织 + 店铺 + 用户」维度过滤。
- 访客端订单选择器：
  - 调用 `GET /visitor/api/v1/order/query/visitor`；普通业务组织必传 `orgUid + visitorUid + shopUid`。
  - 平台默认组织（`df_org_uid`）允许不传 `shopUid`，此时跨店铺查询该访客的订单。
- 对比：商品信息在 desktop 与 visitor 均按「组织 + 店铺」查询、不按 `visitorUid` 过滤，详见[商品信息对接](./goods_open.md)。

## 管理端接口

### 1. 按组织分页查询订单

- `GET /api/v1/order/query/org`

常用查询参数：

- `orgUid`：必填
- `pageNumber`：可选，默认 `0`
- `pageSize`：可选，默认 `10`
- `searchText`：可选
- `visitorUid`：可选
- `shopUid`：可选
- `status`：可选

示例：

```http
GET /api/v1/order/query/org?orgUid=org_xxx&status=paid&pageNumber=0&pageSize=20
Authorization: Bearer {accessToken}
```

### 2. 按当前用户分页查询订单

- `GET /api/v1/order/query`

常用查询参数：

- `orgUid`
- `userUid`
- `pageNumber`
- `pageSize`
- `searchText`

### 3. 按 uid 查询订单详情

- `GET /api/v1/order/query/uid`

查询参数：

- `uid`：必填
- `orgUid`：建议传入

### 4. 创建订单

- `POST /api/v1/order/create`
- `Content-Type: application/json`

请求体示例：

```json
{
 "orgUid": "org_xxx",
 "shopUid": "shop_xxx",
 "title": "订单：iPhone 16 Pro",
 "description": "第三方系统同步",
 "time": "2026-02-05 10:20:00",
 "status": "paid",
 "statusText": "已支付",
 "totalAmount": 8999,
 "paymentMethod": "微信支付",
 "orderUid": "sku_001",
 "orderTitle": "iPhone 16 Pro",
 "orderImage": "https://example.com/iphone.png",
 "orderDescription": "512G 黑色",
 "orderPrice": 8999,
 "orderUrl": "https://example.com/p/sku_001",
 "orderTagList": ["手机", "苹果"],
 "orderQuantity": 1,
 "visitorUid": "external_user_1001",
 "shippingName": "张三",
 "shippingPhone": "13800000000",
 "shippingAddress": "上海市浦东新区某路 88 号"
}
```

### 5. 更新订单

- `POST /api/v1/order/update`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "order_xxx",
 "orgUid": "org_xxx",
 "status": "completed",
 "statusText": "已完成",
 "paymentMethod": "微信支付",
 "totalAmount": 8999
}
```

### 6. 删除订单

- `POST /api/v1/order/delete`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "order_xxx",
 "orgUid": "org_xxx"
}
```

### 7. 按访客查询订单

- `GET /api/v1/order/query/visitorUid`

查询参数：

- `orgUid`：必填
- `visitorUid`：必填，外部业务用户 uid
- `shopUid`：可选
- `pageNumber`：可选，默认 `0`
- `pageSize`：可选，默认 `20`

示例：

```http
GET /api/v1/order/query/visitorUid?orgUid=org_xxx&visitorUid=external_user_1001&pageNumber=0&pageSize=20
Authorization: Bearer {accessToken}
```

该接口通常用于 desktop 右侧订单面板加载当前会话访客的最新订单信息。

### 8. 导出订单 Excel

- `GET /api/v1/order/export`

常用查询参数：

- `orgUid`：必填
- `exportAll`：可选
- 其他筛选参数与查询接口一致

返回说明：

- 成功时返回 Excel 文件流
- 文件名格式类似 `order-20260313123000.xlsx`

当前 Excel 列包含：

- 订单标题
- 订单描述
- 下单时间
- 订单状态
- 状态文案
- 总金额
- 支付方式
- 商品UID
- 商品标题
- 商品价格
- 访客UID
- 创建时间

### 9. 导入订单 Excel

- `POST /api/v1/order/import?orgUid={orgUid}`
- `Content-Type: multipart/form-data`

表单字段：

- `file`：Excel 文件，必填
- `orgUid`：组织 uid，作为 query 参数传入

curl 示例：

```bash
curl -X POST "{host}/api/v1/order/import?orgUid=org_xxx" \
 -H "Authorization: Bearer {accessToken}" \
 -F "file=@orders.xlsx"
```

### 10. 初始化演示订单数据

- `POST /api/v1/order/init/demo?orgUid={orgUid}`

说明：

- 用于重新生成组织下的演示订单数据。
- 建议仅在开发、测试、演示环境使用。

## 数据时效性说明

- 订单查询接口返回的是微语本地数据。
- 若部署配置了第三方业务系统同步组件，按访客查询（desktop 右侧面板、访客端订单选择器）会在查询前尝试增量同步第三方订单数据；同步受节流窗口与失败回退影响，不保证与第三方系统实时一致。

## 第三方订单同步写入规则

- 同步第三方订单到微语时，以「已绑定的店铺」为锚点：`orgUid` 取该店铺所属组织的 `orgUid`（可通过[店铺信息对接](./shop_open.md)的 `onboard`/`binding` 接口获取），`shopUid` 取该店铺的业务 `shopUid`；`visitorUid` 取业务系统的用户唯一标识。
- 订单创建按 `orderUid + orgUid` 幂等：已存在则更新，不存在则创建。
- 组织内存在多个店铺时，同步方必须明确店铺（`shopUid`）；仅当组织内只有一个店铺时才可不传 `shopUid` 回退到唯一店铺。

## 接入建议

- 订单时间字段 `time` 当前在请求对象中为字符串，建议调用方统一传 `yyyy-MM-dd HH:mm:ss`。
- 如果业务侧商品信息比较完整，建议同时传 `orderImage`、`orderDescription`、`orderUrl` 和 `orderTagList`，便于前端侧边栏完整展示。
- `visitorUid` 应始终使用第三方业务系统的用户标识，不要误传客服系统内部 `uid`。
