---
title: MCP服務
description: 透過 Model Context Protocol 向第三方智慧體開放微語能力
sidebar_position: 6
---

## 概述

MCP服務用於將微語伺服器能力開放給第三方智慧體和MCP客戶端。啟用後，外部工具可以透過標準MCP協議連接微語伺服器，發現可用工具，並在權限允許範圍內查詢客服、知識庫、工單、訂單、呼叫中心等業務資料。

目前實作處於第一期：已接入Spring AI MCP Server，支援註冊既有Spring AI `@Tool`，預設只開放唯讀查詢類工具，並透過Bearer Token保護MCP入口。

## 啟用方式

MCP預設關閉。需要外部智慧體接入時，在獨立MCP設定檔中開啟：

```properties
spring.ai.mcp.server.enabled=true
bytedesk.ai.mcp.auth.bearer-token=${BYTEDESK_MCP_BEARER_TOKEN}
```

本機預設連接埠為`9003`，MCP客戶端連接位址：

```text
http://127.0.0.1:9003/sse
```

請求需要攜帶：

```http
Authorization: Bearer <token>
```

如果啟用MCP但未設定`bytedesk.ai.mcp.auth.bearer-token`，服務會拒絕MCP請求，避免誤暴露介面。

## 設定檔

MCP設定已從AI批次設定中拆分到獨立檔案：

- `starter/src/main/resources/properties/local/75-mcp.properties`
- `starter/src/main/resources/properties/noai/75-mcp.properties`
- `starter/src/main/resources/properties/open/75-mcp.properties`
- `starter/src/main/resources/properties/prod/75-mcp.properties`

## 工具開放策略

預設掃描`com.bytedesk`套件下既有的`@Tool`，但只開放查詢類工具：

```properties
bytedesk.ai.mcp.tools.enabled=true
bytedesk.ai.mcp.tools.read-only=true
bytedesk.ai.mcp.tools.include-packages=com.bytedesk
bytedesk.ai.mcp.tools.allow-names=
bytedesk.ai.mcp.tools.deny-names=
bytedesk.ai.mcp.tools.read-only-include-pattern=.*(Query|Search|Find|Get|List|Count).*
bytedesk.ai.mcp.tools.exclude-pattern=.*(Create|Update|Delete|Remove|Cancel|Change|Optimize|Reset|Score|Set|Send).*
```

`allow-names`為空時表示允許所有通過套件名稱、唯讀規則和排除規則篩選後的工具；填寫後只暴露名單中的工具。`deny-names`用於緊急屏蔽指定工具。

## 安全建議

- 預設保持MCP關閉。
- 初期保持`read-only=true`。
- Bearer Token必須透過環境變數或外部設定注入，不要提交到程式碼倉庫。
- 寫入操作必須先接入權限控制、審批和稽核。
- 工具回應中不要返回密碼、Token、License、內部設定等敏感欄位。

## 後續規劃

第二期會補充工具白名單、權限控制、審批、稽核和後台管理能力，讓管理員可以查看、啟停和稽核MCP工具。

第三期會補充語義型業務工具，例如查詢客戶檔案、檢索知識庫、查詢工單、查詢訂單、建立會話摘要、查詢通話記錄等，讓第三方智慧體可以更自然地呼叫微語完成業務操作。
