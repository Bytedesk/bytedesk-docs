---
sidebar_label: 管理端订单信息对接
sidebar_position: 6
---

# 管理端订单信息对接

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

订单信息传递请参考 [订单信息](./order_info.md)

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
- `orgUid`：组织 uid
- `userUid`：用户 uid
- `pageNumber`：页码，从 `0` 开始
- `pageSize`：分页大小，默认 `10`
- `sortBy`：排序字段
- `sortDirection`：`asc` 或 `desc`
- `searchText`：搜索关键字
- `startAt`：起始时间，ISO-8601
- `endAt`：结束时间，ISO-8601

订单特有字段如下：

- `title`：订单标题
- `description`：订单描述
- `price`：价格字段
- `state`：内部状态字段
- `time`：下单时间，字符串格式
- `status`：订单状态
- `statusText`：状态文案
- `orderUid`：商品 uid
- `orderTitle`：商品标题
- `orderImage`：商品图片
- `orderDescription`：商品描述
- `orderPrice`：商品价格
- `orderUrl`：商品链接
- `orderTagList`：商品标签列表
- `orderExtra`：商品扩展信息
- `orderQuantity`：商品数量
- `totalAmount`：订单总金额
- `shippingName`：收货人
- `shippingPhone`：收货电话
- `shippingAddress`：收货地址
- `paymentMethod`：支付方式
- `extra`：订单扩展信息
- `visitorUid`：外部访客 uid
- `visitorDbUid`：访客数据库 uid
- `shopUid`：店铺 uid
- `shopDbUid`：店铺数据库 uid

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

## visitorUid 与 uid 区别

- `VisitorEntity.uid`：系统内部自动生成 uid
- `VisitorEntity.visitorUid`：外部业务系统传入 uid

接入第三方订单系统时，请传入外部 uid 到 `visitorUid` 字段。

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

## 接入建议

- 订单时间字段 `time` 当前在请求对象中为字符串，建议调用方统一传 `yyyy-MM-dd HH:mm:ss`。
- 如果业务侧商品信息比较完整，建议同时传 `orderImage`、`orderDescription`、`orderUrl` 和 `orderTagList`，便于前端侧边栏完整展示。
- `visitorUid` 应始终使用第三方业务系统的用户标识，不要误传客服系统内部 `uid`。
