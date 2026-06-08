---
sidebar_label: 管理端商品信息对接
sidebar_position: 8
---

# 管理端商品信息对接

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换 [licenseKey](../development/license.md)
:::

## 概述

商品管理接口由 `GoodsRestController` 提供，管理端基础路径为：

- `/api/v1/goods`

当前支持的能力：

- 管理端分页查询
- 管理端按 uid 查询详情
- 管理端创建、更新、删除
- Excel 模板导出
- Excel 批量导入
- 演示数据初始化
- 访客侧匿名按组织查询

## 鉴权说明

先调用登录接口获取 accessToken：

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

成功后从响应体中取 `data.accessToken`，后续管理端接口在请求头携带：

```http
Authorization: Bearer {accessToken}
```

说明：

- 当前 `GoodsRestController` 中未显式添加 `@PreAuthorize` 注解。
- 实际可访问性仍取决于全局安全配置、登录态和网关策略。
- 访客侧匿名查询接口位于 `/visitor/api/v1/goods`，通常不走管理端 Bearer Token。

## 通用请求约定

商品请求对象继承 `BaseRequest`，常用公共字段如下：

- `uid`：系统记录 uid
- `orgUid`：组织 uid
- `userUid`：用户 uid
- `type`：业务类型
- `pageNumber`：页码，从 `0` 开始
- `pageSize`：分页大小，默认 `10`
- `sortBy`：排序字段，默认按更新时间排序
- `sortDirection`：`asc` 或 `desc`，默认降序
- `searchText`：搜索关键字
- `startAt`：起始时间，ISO-8601
- `endAt`：结束时间，ISO-8601

商品特有字段如下：

- `goodsUid`：业务商品 uid
- `shopUid`：店铺 uid
- `shopDbUid`：店铺数据库 uid
- `title`：商品标题
- `image`：商品图片 URL
- `description`：商品描述
- `price`：商品价格
- `url`：商品详情链接
- `tagList`：标签数组
- `extra`：扩展 JSON 或文本
- `quantity`：数量

## 通用返回结构

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

分页查询时，`data` 为 Spring Data `Page` 结构，通常包含：

- `content`
- `totalElements`
- `totalPages`
- `size`
- `number`

## 管理端接口

### 1. 按组织分页查询商品

- `GET /api/v1/goods/query/org`

常用查询参数：

- `orgUid`：必填
- `pageNumber`：可选，默认 `0`
- `pageSize`：可选，默认 `10`
- `searchText`：可选
- `sortBy`：可选
- `sortDirection`：可选
- `shopUid`：可选

示例：

```http
GET /api/v1/goods/query/org?orgUid=org_xxx&pageNumber=0&pageSize=20&shopUid=shop_xxx
Authorization: Bearer {accessToken}
```

### 2. 按当前用户分页查询商品

- `GET /api/v1/goods/query`

常用查询参数：

- `orgUid`：建议传入
- `userUid`：按需要传入
- `pageNumber`
- `pageSize`
- `searchText`

### 3. 按 uid 查询商品详情

- `GET /api/v1/goods/query/uid`

查询参数：

- `uid`：系统记录 uid，推荐使用
- `orgUid`：建议传入，用于组织隔离

示例：

```http
GET /api/v1/goods/query/uid?uid=good_xxx&orgUid=org_xxx
Authorization: Bearer {accessToken}
```

### 4. 创建商品

- `POST /api/v1/goods/create`
- `Content-Type: application/json`

请求体示例：

```json
{
 "orgUid": "org_xxx",
 "shopUid": "shop_xxx",
 "goodsUid": "sku_001",
 "title": "iPhone 16 Pro",
 "image": "https://example.com/iphone.png",
 "description": "512G 黑色",
 "price": 8999,
 "url": "https://example.com/p/sku_001",
 "tagList": ["手机", "苹果"],
 "extra": "{\"source\":\"erp\"}",
 "quantity": 1
}
```

说明：

- 控制器接收的是 `GoodsRequest`。
- 当前管理端创建接口请求体中没有 `visitorUid` 字段，和旧文档写法不同。

### 5. 更新商品

- `POST /api/v1/goods/update`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "good_xxx",
 "orgUid": "org_xxx",
 "title": "iPhone 16 Pro 1TB",
 "price": 9999,
 "quantity": 2,
 "tagList": ["手机", "苹果", "旗舰"]
}
```

### 6. 删除商品

- `POST /api/v1/goods/delete`
- `Content-Type: application/json`

请求体示例：

```json
{
 "uid": "good_xxx",
 "orgUid": "org_xxx"
}
```

### 7. 导出商品 Excel

- `GET /api/v1/goods/export`

常用查询参数：

- `orgUid`：必填
- `exportAll`：可选，是否导出全部
- 其他筛选参数与查询接口一致

示例：

```http
GET /api/v1/goods/export?orgUid=org_xxx&exportAll=true
Authorization: Bearer {accessToken}
```

返回说明：

- 成功时返回 Excel 文件流
- 文件名格式类似 `goods-20260313123000.xlsx`

Excel 列定义与导入模板一致，当前包含：

- 商品标题
- 商品图片
- 商品描述
- 商品价格
- 商品链接
- 商品标签(逗号分隔)
- 扩展信息
- 数量
- 创建时间

### 8. 导入商品 Excel

- `POST /api/v1/goods/import?orgUid={orgUid}`
- `Content-Type: multipart/form-data`

表单字段：

- `file`：Excel 文件，必填
- `orgUid`：组织 uid，作为 query 参数传入

curl 示例：

```bash
curl -X POST "{host}/api/v1/goods/import?orgUid=org_xxx" \
 -H "Authorization: Bearer {accessToken}" \
 -F "file=@goods.xlsx"
```

导入成功时，`data` 返回导入后的商品列表。

### 9. 初始化演示商品数据

- `POST /api/v1/goods/init/demo?orgUid={orgUid}`

说明：

- 用于重新生成组织下演示商品数据。
- 适合开发、演示或初始化测试环境使用。

## 访客侧接口

### 按组织匿名查询商品

- `GET /visitor/api/v1/goods/query/org`

查询参数：

- `orgUid`：必填
- `pageNumber`：可选
- `pageSize`：可选

说明：

- 该接口由 `GoodsVisitorRestController` 提供。
- 当前逻辑会校验 `orgUid` 是否为空；为空时返回 `orgUid required`。

## 对接建议

- 管理端文档中原先的 `GET /api/v1/goods/query/visitorUid` 在当前控制器实现中未开放，不建议按该路径集成。
- 如果需要按访客维度做商品展示，请确认前端实际调用的是访客端接口还是其他聚合服务接口。
- `tagList` 为数组字段，而 Excel 中使用逗号分隔字符串，两者导入导出格式不同。
- 时间类公共字段建议统一传 ISO-8601，例如 `2026-03-13T10:20:00Z`。
