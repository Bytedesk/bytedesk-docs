---
sidebar_label: MCP
sidebar_position: 10
---

# MCP

微語已經具備與 MCP（Model Context Protocol，模型上下文協議）相關的技術基礎。MCP 的價值在於，讓 AI agent 與外部工具、資源和服務之間透過統一協議進行互通，而不是依賴大量一次性的客製化整合。

## 一、微語目前的 MCP 基礎

從目前倉庫可以確認，專案已包含：

- enterprise AI 模組中的 MCP client/server 依賴
- Spring AI MCP client/server 配置項
- Swagger 中的 MCP Server 管理介面分組
- 後續對外開放微語 MCP 能力的規劃

這說明 MCP 在微語中已具備程式碼與配置基礎，不只是未來設想。

## 二、MCP 適合解決什麼問題

MCP 適用於以下方向：

- 將微語業務能力開放給外部 AI agent 調用
- 讓微語內部 AI 工作流接入外部 MCP Server
- 用統一協議交換 tools、prompts 與 resources
- 降低微語與 agent 生態之間的客製整合成本

## 三、目前配置方向

專案中已存在 Spring AI MCP 相關配置，例如：

- `spring.ai.mcp.client.enabled`
- `spring.ai.mcp.server.enable`
- `spring.ai.mcp.server.type`
- `spring.ai.mcp.server.stdio`

這意味著微語已朝著「既能作為 MCP Client，也能作為 MCP Server」的架構方向在布局。

## 四、與其它能力頁的關係

- [工具](./tools) 關注 AI 工作流內部可呼叫的執行能力。
- [技能](./skills) 關注可複用的工作流知識與能力包。
- MCP 則更偏向微語與外部 agent 生態之間的協議互通層。

## 五、總結

微語已擁有較明確的 MCP 技術基礎。隨著這部分能力持續完善，MCP 會成為微語對外開放 AI 能力、接入外部 agent 生態以及建構標準化智慧工作流的重要路徑。
