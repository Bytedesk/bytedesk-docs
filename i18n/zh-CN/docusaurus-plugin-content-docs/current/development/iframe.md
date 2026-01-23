---
sidebar_label: 第三方业务系统对接
sidebar_position: 42
---

# 第三方业务系统对接（Iframe）

本页介绍如何在微语客服系统中，通过 Iframe 将您的业务系统页面嵌入到客服工作台，帮助客服在同一界面查看用户资料、订单、工单、CRM 等信息。

## 适用场景

- 客服侧边栏打开 CRM/订单/会员中心页面
- 通过用户标识（`visitorUid`）自动定位当前会话对应的业务用户
- 减少客服在多个系统间来回切换

## 对接效果

完成配置后：

1. 管理后台新增一条 Iframe 对接配置
2. 客服工作台在会话右侧面板展示该页面
3. 系统会自动在 URL 上追加当前访客标识 `visitorUid`

## 配置步骤（管理后台）

1. 进入管理后台的“第三方业务系统对接 / Iframe”配置入口
2. 点击“添加Tab”
3. 填写：名称、嵌入 URL 等信息（按后台提示）
4. 保存后刷新客服工作台即可看到入口

![iframe_admin_add](/img/iframe/iframe_admin_add.png)

## 示例：添加一个演示页面

示例 URL：`https://www.baidu.com/`

![iframe_admin_add_baidu](/img/iframe/iframe_admin_add_baidu.png)

## 客服端展示

客服工作台会在会话右侧面板加载该 Iframe 页面：

![iframe_agent_rightpanel](/img/iframe/iframe_agent_rightpanel.png)

## URL 参数追加规则（非常重要）

系统会在嵌入 URL 上自动追加参数 `visitorUid`，用于标识当前访客/用户。

- 若原 URL 没有查询参数：使用 `?visitorUid=...`
	- 例：`https://example.com/page` → `https://example.com/page?visitorUid=1832567980425344`
- 若原 URL 已有查询参数：使用 `&visitorUid=...`
	- 例：`https://example.com/page?from=weiyu` → `https://example.com/page?from=weiyu&visitorUid=1832567980425344`

> `visitorUid` 如何传入（前端组件/H5 链接等）请参考：[访客端/用户端用户信息对接](./userinfo.md)

## 最佳实践

- 建议使用您自有业务系统页面进行嵌入，并在服务端通过 `visitorUid` 查询并展示用户信息
- 不要在 URL 中携带敏感信息（如手机号、证件号、Token 等）
- 建议全站使用 HTTPS

## 常见问题

### 1）页面空白/无法加载

很多网站会禁止被嵌入 Iframe（安全策略限制），浏览器控制台可能出现：

- `Refused to display ... in a frame because it set 'X-Frame-Options' to 'deny'`
- `Content-Security-Policy: frame-ancestors ...`

解决思路：

- 优先嵌入您自有域名页面
- 在您页面的响应头中放开允许嵌入（按您的安全规范配置 `CSP frame-ancestors` 或 `X-Frame-Options`）

### 2）如何传更多业务参数？

Iframe 默认只会自动追加 `visitorUid`。如需更多业务信息，建议由您页面在服务端通过 `visitorUid` 查询后展示；或者在您的 URL 中自行拼接固定参数（例如 `from=weiyu`），系统会在其后追加 `visitorUid`。
