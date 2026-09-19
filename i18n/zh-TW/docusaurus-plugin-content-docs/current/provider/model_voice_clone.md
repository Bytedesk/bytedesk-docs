---
sidebar_label: 語音克隆
sidebar_position: 29
---

# 語音克隆

微語客服系統支援語音克隆（Voice Clone）能力，包含**語音複刻**與**語音設計**兩種方式。管理員可上傳音訊樣本複製既有音色，也可透過文字描述生成全新音色，用於客服播報、AI 語音互動、電話客服等場景。

## 一、語音克隆可以解決什麼問題

- **個人化品牌音色**：企業可使用真人錄音複刻專屬品牌聲音，統一對外服務形象
- **AI 語音互動**：為 AI 客服、語音機器人、電話座席提供自訂音色輸出
- **無障礙與多場景覆蓋**：適配不同語言、不同風格需求，提升用戶體驗
- **音色管理與溯源**：每次複刻／設計操作均儲存本地記錄，便於管理和排查

## 二、兩種建立方式

| 方式 | 說明 | 輸入 | 適用場景 |
| ---- | ---- | ---- | -------- |
| **語音複刻** | 上傳現成音訊樣本，AI 複製音色 | 音訊檔案／音訊 URL／瀏覽器錄音 | 已有真人錄音，需要複刻特定音色 |
| **語音設計** | 用自然語言描述聲音特質，AI 生成音色 | 文字描述 + 預覽文本 | 無現成音訊，需要快速生成特定風格音色 |

### 語音複刻的三種音訊來源

1. **上傳音訊檔案**：在管理後台直接上傳 WAV、MP3、M4A 等格式的音訊檔案
2. **手動填寫 URL**：填寫公網可存取的音訊檔案連結
3. **朗讀錄音**：系統提供提示文本，管理員在瀏覽器中即時錄音，錄音完成後自動上傳並回填到表單

## 三、支援的目標模型

### 語音複刻模型

| 模型 ID | 系列 | 說明 |
| ------- | ---- | ---- |
| `qwen-audio-3.0-tts-plus` | Qwen-Audio-TTS | 高品質音訊複刻 |
| `qwen-audio-3.0-tts-flash` | Qwen-Audio-TTS | 低延遲音訊複刻 |
| `cosyvoice-v3.5-plus` | CosyVoice | 最新高品質複刻 |
| `cosyvoice-v3.5-flash` | CosyVoice | 快速複刻 |
| `cosyvoice-v3-plus` | CosyVoice | 高品質複刻 |
| `cosyvoice-v3-flash` | CosyVoice | 快速複刻 |
| `cosyvoice-v2` | CosyVoice | 相容舊版 |
| `cosyvoice-v1` | CosyVoice | 相容舊版 |
| `qwen3-tts-vc-2026-01-22` | Qwen-TTS | Qwen 系列語音複刻 |

### 語音設計模型

| 模型 ID | 系列 | 說明 |
| ------- | ---- | ---- |
| `cosyvoice-v3.5-plus` | CosyVoice | 最新高品質語音設計 |
| `cosyvoice-v3.5-flash` | CosyVoice | 快速語音設計 |
| `cosyvoice-v3-plus` | CosyVoice | 高品質語音設計 |
| `cosyvoice-v3-flash` | CosyVoice | 快速語音設計 |
| `qwen3-tts-vd-2026-01-26` | Qwen-TTS | Qwen 系列語音設計 |

## 四、管理後台功能介紹

### 1. 語音克隆列表

在 AI 客服管理 → 智慧體頁面中，切換到「語音克隆」頁籤，可查看當前組織下所有語音複刻／設計操作記錄。列表以 ProTable 形式展示，包含以下欄位：

- **音色名稱**：使用者自訂的名稱
- **建立方式**：語音複刻 或 語音設計
- **目標模型**：選擇的目標合成模型
- **音色 ID**：阿里雲返回的遠端音色標識
- **狀態**：PENDING（待處理）／DEPLOYING（審核中）／OK（可用）／UNDEPLOYED（審核未通過）／FAILED（失敗）

支援的操作：
- 按音色名稱、建立方式、狀態、模型篩選
- 查看詳情（開啟 Drawer）
- 刪除記錄（同時刪除遠端阿里雲音色）

### 2. 語音複刻 Modal

點擊列表上方「語音複刻」按鈕，填寫以下資訊：

| 欄位 | 說明 | 必填 |
| ---- | ---- | ---- |
| 音色名稱 | 自訂名稱，如「溫柔客服女聲」 | ✅ |
| 目標模型 | 從下拉列表中選擇目標模型 | ✅ |
| 音訊來源 | 上傳檔案／手動填寫 URL／朗讀錄音 | ✅（三選一） |

音訊要求：
- 支援格式：WAV（16bit）、MP3、M4A
- 建議時長：10~20 秒
- 最長時長：60 秒
- 檔案大小：≤ 10 MB

### 3. 朗讀錄音 Modal

在語音複刻中選擇「朗讀錄音」，系統會彈出錄音視窗：

- 展示預設朗讀文本（中／日文），引導使用者錄製
- 點擊「開始錄音」請求麥克風權限，即時顯示計時和音量電平
- 建議錄製 10~20 秒，最長 60 秒自動停止
- 錄製完成後支援試聽和重新錄製
- 確認後自動上傳錄音檔案，回填到語音複刻表單的音訊 URL 欄位
- 若瀏覽器不支援錄音，提供「上傳音訊檔案」降級路徑

### 4. 語音設計 Modal

點擊列表上方「語音設計」按鈕，填寫以下資訊：

| 欄位 | 說明 | 必填 |
| ---- | ---- | ---- |
| 音色名稱 | 自訂名稱，如「沉穩男播音」 | ✅ |
| 目標模型 | 從下拉列表中選擇目標模型 | ✅ |
| 聲音描述 | 用自然語言描述期望的聲音特質 | ✅ |
| 預覽文本 | 用於生成預覽音訊的文本 | ❌ |
| 音色前綴 | 阿里雲音色名稱前綴 | ❌ |

聲音描述建議參考模板：

- **客服風格**：溫柔自然的女聲，帶有親和力，語速適中，適合客服場景
- **播報風格**：沉穩大氣的男聲，富有磁性，語速平穩，適合新聞播報場景
- **甜美風格**：甜美可愛的女聲，略帶撒嬌語氣，適合娛樂互動場景

注意事項：
- CosyVoice 模型聲音描述限制 500 字元
- Qwen-TTS 模型聲音描述限制 2048 字元

### 5. 音色詳情 Drawer

點擊列表操作列的「詳情」按鈕，開啟側邊抽屜，可查看：

- 基本資訊：音色名稱、建立方式、目標模型、狀態、建立時間
- 遠端資訊：voiceId、voiceName
- 音訊資訊：audioUrl（語音複刻）、voicePrompt（語音設計）
- 預覽音訊：voicePrompt 生成的預覽音訊可直接播放
- 遠端操作：查詢遠端狀態、更新音色（重新上傳音訊）、刪除遠端音色

## 五、權限控制

語音克隆功能的權限模組為 `VOICE_CLONE`，包含以下子權限：

| 權限 | 說明 | 適用介面 |
| ---- | ---- | -------- |
| `VOICE_CLONE_READ` | 查看 | 查詢列表、遠端音色查詢 |
| `VOICE_CLONE_CREATE` | 建立 | 語音複刻、語音設計 |
| `VOICE_CLONE_UPDATE` | 更新 | 更新音色 |
| `VOICE_CLONE_DELETE` | 刪除 | 刪除記錄、刪除遠端音色 |
| `VOICE_CLONE_EXPORT` | 匯出 | Excel 匯出 |

僅具備相應權限且在 Enterprise／Platform 版本中，AI 智慧體頁面才會顯示「語音克隆」頁籤。

## 六、API 端點一覽

| 方法 | 路徑 | 權限 | 說明 |
| ---- | ---- | ---- | ---- |
| GET | `/api/v1/voice_clone/query/org` | READ | 按組織查詢記錄 |
| GET | `/api/v1/voice_clone/query/user` | READ | 按使用者查詢記錄 |
| GET | `/api/v1/voice_clone/query/uid` | READ | 按 UID 查詢單筆 |
| POST | `/api/v1/voice_clone/create` | CREATE | 手動建立記錄 |
| POST | `/api/v1/voice_clone/update` | UPDATE | 手動更新記錄 |
| POST | `/api/v1/voice_clone/delete` | DELETE | 手動刪除記錄 |
| GET | `/api/v1/voice_clone/export` | EXPORT | Excel 匯出 |
| POST | `/api/v1/voice_clone/clone` | CREATE | 語音複刻 |
| POST | `/api/v1/voice_clone/design` | CREATE | 語音設計 |
| POST | `/api/v1/voice_clone/voices` | READ | 遠端音色列表 |
| POST | `/api/v1/voice_clone/voice/detail` | READ | 遠端音色詳情 |
| POST | `/api/v1/voice_clone/voice/update` | UPDATE | 遠端音色更新 |
| POST | `/api/v1/voice_clone/voice/delete` | DELETE | 遠端音色刪除 |

## 七、配置說明

語音克隆能力基於阿里雲百煉 DashScope 平台提供。使用前需在 `application.properties` 中配置以下參數：

```properties
# DashScope API Key（沿用現有 TTS 配置）
spring.ai.dashscope.audio.synthesis.api-key=sk-xxxxxxxxxxxx

# 阿里雲百煉 WorkspaceId（用於語音複刻／設計介面）
bytedesk.ai.dashscope.workspace-id=ws-xxxxxxxxxxxx

# 可選：區域配置（預設 cn-beijing）
bytedesk.ai.dashscope.region=cn-beijing

# 可選：自訂語音克隆端點（優先級最高）
# bytedesk.ai.dashscope.voice-clone.endpoint=https://custom.endpoint.com
```

## 八、技術實現

語音克隆模組位於 `enterprise/ai` 模組，核心類別：

| 類別 | 職責 |
| --- | --- |
| `VoiceCloneEntity` | JPA 實體，儲存本地操作記錄 |
| `VoiceCloneController` | 執行型 API（clone / design / remote ops） |
| `VoiceCloneRestController` | CRUD 型 API（query / create / update / delete / export） |
| `VoiceCloneService` | 核心業務邏輯，模型族路由與本地回寫 |
| `AliyunVoiceCloneClient` | 阿里雲 DashScope HTTP API 客戶端 |
| `VoiceCloneApiResponse` | 阿里雲 API 回應正規化 DTO |
| `VoiceCloneTypeEnum` | CLONE / DESIGN 列舉 |
| `VoiceCloneStatusEnum` | PENDING / DEPLOYING / OK / UNDEPLOYED / FAILED 列舉 |

### 模型族路由

後端根據 `targetModel` 自動判斷模型族，無需前端感知：

| 前綴 | 模型族 | 建立請求 |
| ---- | ------ | -------- |
| `qwen-audio-` | Qwen-Audio-TTS | `voice-enrollment/create_voice` + URL |
| `cosyvoice-` | CosyVoice | `voice-enrollment/create_voice` + URL 或 voice_prompt |
| `qwen3-tts-vc-` | Qwen-TTS 語音複刻 | `qwen-voice-enrollment/create` + Base64 data URI |
| `qwen3-tts-vd-` | Qwen-TTS 語音設計 | `qwen-voice-design/create` + voice_prompt |

### 刪除語意

刪除音色時遵循「先遠端後本地」策略：
1. 先調用阿里雲刪除介面刪除遠端音色
2. 遠端刪除成功後再刪除本地記錄
3. 若遠端已不存在（404），視為成功，正常刪除本地記錄
4. 遠端刪除失敗時保留本地記錄並記錄錯誤資訊

## 連結

- [阿里雲語音複刻](https://help.aliyun.com/zh/model-studio/voice-cloning-user-guide)
- [阿里雲語音設計](https://help.aliyun.com/zh/model-studio/voice-design-user-guide)
- [阿里雲語音複刻 HTTP API 參考](https://help.aliyun.com/zh/model-studio/voice-clone-design-http-api)
- [阿里雲語音複刻 Java SDK 參考](https://help.aliyun.com/zh/model-studio/voice-clone-java-sdk)
- [阿里雲 SSML 與 LaTeX](https://help.aliyun.com/zh/model-studio/ssml-latex-user-guide)
