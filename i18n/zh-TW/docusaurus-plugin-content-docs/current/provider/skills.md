---
sidebar_label: 技能
sidebar_position: 12
---

# 技能

微語已經具備面向 AI 工作流的 Skills 基礎能力。Skills 可以理解為一類可複用的能力包，用來封裝任務說明、流程知識與輔助資源，讓 AI 或 agent 在處理某類任務時更加穩定、可複用、可維護。

這類 Skills 既適合開發人員與運維人員理解系統能力邊界，也適合產品、實施、售前等非技術人員從功能層面理解「微語為什麼可以把一類 AI 工作流做成可重複使用的能力」。

## 一、微語中的 Skills 是什麼

在目前專案中，Skills 已經以資源包形式存在於執行時資源目錄中，並透過多個 `SKILL.md` 檔案組織文件處理、規劃、設計、編碼、測試、文件產出等不同類型的 AI 工作流能力。

本頁所說的 Skills，重點指 AI 與 agent 工作流中的技能包，不是客服組織分配中「技能標籤」那一類業務欄位。

可以把它理解為：

- Prompt 的工程化封裝
- AI 工作流的標準化說明書
- 某一類任務的可複用知識模組

簡單來說，模型本身決定「會不會推理」，而 Skills 決定「遇到某類任務時，應該用什麼方法做」。

## 二、目前已有基礎

目前倉庫中已包含：

- 多個內建 Skills 資源目錄
- 多類 `SKILL.md` 示例包
- Skills 中繼資料解析與入庫同步能力
- 支援設定外部 Skills 目錄並同步載入
- 管理後台中查看平台級 Skills 清單的能力

這說明 Skills 已經是微語 AI 產品能力的一部分，而不是只停留在概念層。

目前內建的 Skills 目錄中，已經可以看到這類示例資源：

- `brainstorming`
- `doc-coauthoring`
- `frontend-design`
- `mcp-builder`
- `pptx`
- `docx`
- `webapp-testing`
- `test-driven-development`

這些目錄本身就反映出微語目前對 AI 工作流的支援方向，不只問答，也包括規劃、實作、驗證、文件與多模態內容處理。

## 三、目前系統中是如何運作的

從目前實作來看，微語已經完成了 Skills 的基礎閉環。

### 1. 內建 Skills 自動發現

系統會掃描執行時資源目錄中的 Skills，目前預設模式相當於：

```text
starter/src/main/resources/skills/*/SKILL.md
```

也就是說，每個 Skills 資源包以一個獨立目錄存在，且目錄內至少包含一個 `SKILL.md` 檔案。

### 2. 外部 Skills 可透過設定掛載

除了內建 Skills，系統也支援透過設定載入外部目錄中的 Skills：

```properties
bytedesk.ai.skill.external-directory=/data/bytedesk/skills
```

外部目錄約定結構為：

```text
<external-root>/<skill-directory>/SKILL.md
```

這對運維很重要，因為代表：

- 可以把自訂 skill 放在程式碼倉庫之外管理
- 可以依不同環境載入不同 skill 集合
- 可以在不改動內建資源目錄的情況下擴充平台能力

### 3. 目前解析方式

目前實作會讀取 `SKILL.md` 頂部 frontmatter 中的關鍵欄位，重點包括：

- `name`
- `description`

例如：

```md
---
name: brainstorming
description: 用於引導 AI 在實作前先釐清目標與方案選項
---
```

如果 `name` 未填寫，系統會回退使用目錄名稱作為 Skills 名稱。

### 4. 同步到平台資料實體

解析完成後，系統會將 Skills 同步到 `SkillEntity`，並寫入平台級資料：

- `name`
- `description`
- `source`，區分 `INTERNAL` 或 `EXTERNAL`
- `level`，目前按 `PLATFORM` 平台級管理
- `platform`，目前歸屬微語平台

這代表 Skills 已經不只是資料夾裡的 Markdown，而是已被納入平台能力資產。

### 5. 管理後台可查看

目前管理後台已可在超級管理相關頁面中按平台級清單查看 Skills，展示欄位包括：

- UID
- 名稱
- 描述
- 類型
- 來源
- 層級
- 平台
- 建立時間
- 更新時間

其中 `source` 會區分內建 Skills 與外部 Skills，對運維排查來源以及開發確認能力來源都很有幫助。

## 四、Skills 能解決什麼問題

Skills 特別適合解決以下問題：

- 規範 AI 助手處理某類任務的方法
- 將領域知識打包為可重複使用的能力
- 減少不同場景下重複撰寫 prompt 的成本
- 讓 agent 的行為更加模組化與易於維護

結合微語目前的實作，Skills 更適合承載以下能力：

- 任務處理規範，例如先收集上下文，再規劃，再執行，再驗證
- 場景化知識，例如文件共創、測試驅動開發、前端設計、文件生成
- 多步驟工作流，例如讀取輸入、整理結構、產出結果、校驗內容
- 團隊長期沉澱的方法論，而不是每次重新寫 prompt

對非技術人員而言，可以把 Skills 理解為「AI 的崗位 SOP 套件」。

對開發人員而言，可以把 Skills 理解為「圍繞某類任務沉澱的結構化 prompt 與工作流說明」。

對運維人員而言，可以把 Skills 理解為「平台可載入、可查看、可擴充的一類執行時能力資源」。

## 五、面向不同角色怎麼理解

### 對開發人員

開發最關心的是如何新增與維護 Skills。

目前建議的理解方式是：

- 一個 Skills 資源包對應一個獨立目錄
- 入口檔案是 `SKILL.md`
- `SKILL.md` 至少要維護清楚的 `name` 與 `description`
- Skills 目錄名需要保持穩定，因為平台會基於目錄名產生穩定 UID
- Skills 更適合描述「處理方法」，而不是堆一大段零散 prompt

如果你準備新增一類 agent 能力，通常應先判斷是否應抽象成一個 Skills 資源包，而不是把邏輯直接寫死在單一提示詞裡。

### 對運維人員

運維最關心的是部署、擴充與排障。

目前可重點關注：

- 內建 Skills 來自執行時資源目錄
- 外部 Skills 可透過設定目錄掛載
- 同步後可在後台區分 `INTERNAL` / `EXTERNAL`
- 若外部目錄結構不符合約定，系統不會正確識別
- 若 `SKILL.md` 缺少有效中繼資料，同步出的平台資料會不完整

這代表在部署時，可以把 Skills 當成一類可設定的執行時資源管理，而不一定每次都要靠改程式重新發布。

### 對產品、實施、售前等非技術人員

你不一定需要關心程式細節，但可以從功能角度理解為：

- 微語把某類 AI 能力做成「標準模組」的方法
- 不同 Skills 對應不同任務處理方法
- 未來可逐步擴展成平台可設定、可管理、可重複利用的 AI 能力資產

因此對外介紹時，可以用更容易理解的方式表達：

「模型負責生成，Skills 負責讓生成過程有方法、有結構、有經驗沉澱。」

## 六、開發與運維接入示例

### 內建 Skills 目錄示例

```text
starter/src/main/resources/skills/
  brainstorming/
    SKILL.md
  doc-coauthoring/
    SKILL.md
  webapp-testing/
    SKILL.md
```

### 外部 Skills 目錄示例

```text
/data/bytedesk/skills/
  order-helper/
    SKILL.md
  ops-diagnosis/
    SKILL.md
```

### 最小 `SKILL.md` 示例

```md
---
name: ops-diagnosis
description: 用於引導 AI 逐步排查部署、設定與執行時問題
---

# Ops Diagnosis

這裡可以再補充該 Skills 資源包的使用說明、限制條件、流程與注意事項。
```

## 七、目前能力邊界

為了避免誤解，也要明確目前版本的邊界：

- 當前已完成的是 Skills 的發現、解析、同步與後台查看基礎能力
- 目前解析重點仍以 `name` 與 `description` 等核心欄位為主
- 目前後台更偏向「查看平台 Skills 清單」，還不是完整的線上編輯器
- 直接在線管理 Skills 檔案內容、寫回 `SKILL.md`、對外更完整開放等能力，仍屬後續規劃

因此，現階段更適合把 Skills 理解為「已接入平台的 AI 能力資產中繼資料管理 + 執行時資源組織機制」，而不是已完全產品化的 Skills 市場。

## 八、與其它能力頁的關係

- [工具](./tools) 偏向實際可呼叫的執行能力。
- [MCP](./mcp) 偏向和外部 agent 生態對接的標準協議層。
- [文本模型指南](./model_text) 則是驅動技能執行的模型推理層。

如果用一句話區分：

- 模型決定「能不能推理」
- 工具決定「能不能執行」
- MCP 決定「能不能以標準方式連接外部生態」
- Skills 決定「遇到某類任務時應該怎麼做」

## 九、總結

Skills 提供的是微語 AI 工作流中的可複用知識層。它幫助微語把一次性的 prompt 組織方式，逐步演進為結構化、可維護、可擴展的 AI 能力體系。

從目前實作來看，微語已經具備以下基礎：

- 有內建 Skills 資源目錄
- 有外部 Skills 目錄擴充能力
- 有 `SKILL.md` 中繼資料解析能力
- 有同步到平台實體的能力
- 有後台查看 Skills 清單的能力

對開發而言，這是 AI 能力模組化的基礎。

對運維而言，這是可設定、可擴充的執行時資源。

對非技術人員而言，這代表微語已經在把 AI 能力從「一次性提示詞」升級為「可沉澱、可重複利用、可管理的平台能力資產」。
