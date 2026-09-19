---
sidebar_label: Voice Clone
sidebar_position: 29
---

# Voice Clone

Bytedesk supports Voice Clone capabilities, including **Voice Cloning** and **Voice Design**. Administrators can upload audio samples to replicate existing voices, or describe desired voice characteristics in natural language to generate brand-new voices — all usable in customer service playback, AI voice interactions, and phone-based support scenarios.

## What Voice Clone Solves

- **Brand Voice Customization**: Clone real human voices to create consistent brand identity across service channels
- **AI Voice Interaction**: Provide custom voice output for AI agents, voice bots, and phone agents
- **Multi-Scenario Coverage**: Adapt to different languages and voice styles to improve user experience
- **Voice Management & Traceability**: Every cloning/design operation is saved as a local record for easy management and troubleshooting

## Two Creation Modes

| Mode | Description | Input | Use Case |
| ---- | ----------- | ----- | -------- |
| **Voice Cloning** | Upload audio samples, AI replicates the voice | Audio file / Audio URL / Browser recording | You have a real human recording and want to replicate a specific voice |
| **Voice Design** | Describe voice characteristics in natural language, AI generates the voice | Text description + preview text | No existing audio, need to quickly generate a specific voice style |

### Three Audio Input Methods for Voice Cloning

1. **Upload Audio File**: Directly upload WAV, MP3, or M4A files in the admin console
2. **Manual URL Entry**: Provide a publicly accessible audio file URL
3. **Live Recording**: The system provides prompt text; administrators record in the browser, and the recording is automatically uploaded and filled into the form

## Supported Target Models

### Voice Cloning Models

| Model ID | Family | Description |
| -------- | ------ | ----------- |
| `qwen-audio-3.0-tts-plus` | Qwen-Audio-TTS | High-quality audio cloning |
| `qwen-audio-3.0-tts-flash` | Qwen-Audio-TTS | Low-latency audio cloning |
| `cosyvoice-v3.5-plus` | CosyVoice | Latest high-quality cloning |
| `cosyvoice-v3.5-flash` | CosyVoice | Fast cloning |
| `cosyvoice-v3-plus` | CosyVoice | High-quality cloning |
| `cosyvoice-v3-flash` | CosyVoice | Fast cloning |
| `cosyvoice-v2` | CosyVoice | Legacy compatibility |
| `cosyvoice-v1` | CosyVoice | Legacy compatibility |
| `qwen3-tts-vc-2026-01-22` | Qwen-TTS | Qwen series voice cloning |

### Voice Design Models

| Model ID | Family | Description |
| -------- | ------ | ----------- |
| `cosyvoice-v3.5-plus` | CosyVoice | Latest high-quality voice design |
| `cosyvoice-v3.5-flash` | CosyVoice | Fast voice design |
| `cosyvoice-v3-plus` | CosyVoice | High-quality voice design |
| `cosyvoice-v3-flash` | CosyVoice | Fast voice design |
| `qwen3-tts-vd-2026-01-26` | Qwen-TTS | Qwen series voice design |

## Admin Console Features

### 1. Voice Clone List

Navigate to AI Agent Management → Agent page and switch to the "Voice Clone" tab to view all voice cloning/design records for the current organization. The list is displayed as a ProTable with the following columns:

- **Name**: User-defined voice name
- **Clone Type**: Voice Cloning or Voice Design
- **Target Model**: Selected target synthesis model
- **Voice ID**: Remote voice identifier returned by Alibaba Cloud
- **Status**: PENDING / DEPLOYING / OK / UNDEPLOYED / FAILED

Supported operations:
- Filter by name, clone type, status, and model
- View details (opens Drawer)
- Delete record (also deletes the remote Alibaba Cloud voice)

### 2. Voice Clone Modal

Click the "Voice Clone" button above the list and fill in the following:

| Field | Description | Required |
| ----- | ----------- | -------- |
| Voice Name | Custom name, e.g. "Gentle Female Agent" | ✅ |
| Target Model | Select from dropdown | ✅ |
| Audio Source | Upload file / Manual URL / Live recording | ✅ (choose one) |

Audio requirements:
- Supported formats: WAV (16bit), MP3, M4A
- Recommended duration: 10–20 seconds
- Maximum duration: 60 seconds
- Maximum file size: ≤ 10 MB

### 3. Live Recording Modal

When selecting "Live Recording" in the Voice Clone modal, a recording window opens:

- Displays preset prompt text (Chinese/Japanese) to guide the user
- Click "Start Recording" to request microphone permission, with real-time timer and volume level display
- Recommended recording length: 10–20 seconds; automatically stops at 60 seconds
- After recording: preview playback and re-record options available
- On confirmation, the recording is automatically uploaded and filled into the Voice Clone form's audio URL field
- If the browser does not support recording, a fallback to file upload is provided

### 4. Voice Design Modal

Click the "Voice Design" button above the list and fill in:

| Field | Description | Required |
| ----- | ----------- | -------- |
| Voice Name | Custom name, e.g. "Deep Male Announcer" | ✅ |
| Target Model | Select from dropdown | ✅ |
| Voice Prompt | Describe the desired voice in natural language | ✅ |
| Preview Text | Text used to generate a preview audio | ❌ |
| Prefix | Alibaba Cloud voice name prefix | ❌ |

Voice description templates are available:

- **Customer Service Style**: Gentle and natural female voice, warm and approachable, moderate pace, suitable for customer service
- **Broadcast Style**: Deep and authoritative male voice, resonant, steady pace, suitable for news broadcasting
- **Sweet Style**: Sweet and cute female voice, slightly playful, suitable for entertainment interactions

Notes:
- CosyVoice models: voice prompt limited to 500 characters
- Qwen-TTS models: voice prompt limited to 2048 characters

### 5. Voice Detail Drawer

Click "Details" in the list to open a side drawer showing:

- Basic info: name, clone type, target model, status, creation time
- Remote info: voiceId, voiceName
- Audio info: audioUrl (voice cloning) or voicePrompt (voice design)
- Preview audio: playback of generated preview audio
- Remote operations: query remote status, update voice (re-upload audio), delete remote voice

## Permissions

The Voice Clone feature uses the `VOICE_CLONE` permission module with the following sub-permissions:

| Permission | Description | Applicable APIs |
| ---------- | ----------- | --------------- |
| `VOICE_CLONE_READ` | View | List query, remote voice query |
| `VOICE_CLONE_CREATE` | Create | Voice cloning, voice design |
| `VOICE_CLONE_UPDATE` | Update | Update voice |
| `VOICE_CLONE_DELETE` | Delete | Delete record, delete remote voice |
| `VOICE_CLONE_EXPORT` | Export | Excel export |

The "Voice Clone" tab only appears in the AI Agent page when the user has the appropriate permissions and is using the Enterprise or Platform edition.

## API Endpoints

| Method | Path | Permission | Description |
| ------ | ---- | ---------- | ----------- |
| GET | `/api/v1/voice_clone/query/org` | READ | Query records by organization |
| GET | `/api/v1/voice_clone/query/user` | READ | Query records by user |
| GET | `/api/v1/voice_clone/query/uid` | READ | Query single record by UID |
| POST | `/api/v1/voice_clone/create` | CREATE | Create record manually |
| POST | `/api/v1/voice_clone/update` | UPDATE | Update record manually |
| POST | `/api/v1/voice_clone/delete` | DELETE | Delete record manually |
| GET | `/api/v1/voice_clone/export` | EXPORT | Excel export |
| POST | `/api/v1/voice_clone/clone` | CREATE | Voice cloning |
| POST | `/api/v1/voice_clone/design` | CREATE | Voice design |
| POST | `/api/v1/voice_clone/voices` | READ | Remote voice list |
| POST | `/api/v1/voice_clone/voice/detail` | READ | Remote voice detail |
| POST | `/api/v1/voice_clone/voice/update` | UPDATE | Remote voice update |
| POST | `/api/v1/voice_clone/voice/delete` | DELETE | Remote voice deletion |

## Configuration

Voice Clone relies on the Alibaba Cloud Model Studio (DashScope) platform. Configure the following in `application.properties`:

```properties
# DashScope API Key (reuses existing TTS configuration)
spring.ai.dashscope.audio.synthesis.api-key=sk-xxxxxxxxxxxx

# Alibaba Cloud Model Studio WorkspaceId
bytedesk.ai.dashscope.workspace-id=ws-xxxxxxxxxxxx

# Optional: region (default cn-beijing)
bytedesk.ai.dashscope.region=cn-beijing

# Optional: custom voice clone endpoint (highest priority)
# bytedesk.ai.dashscope.voice-clone.endpoint=https://custom.endpoint.com
```

## Technical Implementation

The Voice Clone module resides in the `enterprise/ai` module. Key classes:

| Class | Responsibility |
| ----- | -------------- |
| `VoiceCloneEntity` | JPA entity for local operation records |
| `VoiceCloneController` | Execution APIs (clone / design / remote ops) |
| `VoiceCloneRestController` | CRUD APIs (query / create / update / delete / export) |
| `VoiceCloneService` | Core business logic, model family routing & local write-back |
| `AliyunVoiceCloneClient` | Alibaba Cloud DashScope HTTP API client |
| `VoiceCloneApiResponse` | Normalized API response DTO |
| `VoiceCloneTypeEnum` | CLONE / DESIGN enum |
| `VoiceCloneStatusEnum` | PENDING / DEPLOYING / OK / UNDEPLOYED / FAILED enum |

### Model Family Routing

The backend automatically determines the model family based on `targetModel` — no frontend awareness needed:

| Prefix | Model Family | Create Request |
| ------ | ------------ | -------------- |
| `qwen-audio-` | Qwen-Audio-TTS | `voice-enrollment/create_voice` + URL |
| `cosyvoice-` | CosyVoice | `voice-enrollment/create_voice` + URL or voice_prompt |
| `qwen3-tts-vc-` | Qwen-TTS Voice Clone | `qwen-voice-enrollment/create` + Base64 data URI |
| `qwen3-tts-vd-` | Qwen-TTS Voice Design | `qwen-voice-design/create` + voice_prompt |

### Deletion Semantics

Voice deletion follows a "remote-first, local-second" strategy:
1. Call the Alibaba Cloud API to delete the remote voice first
2. Only delete the local record after successful remote deletion
3. If the remote voice no longer exists (404), treat it as success and delete the local record
4. If remote deletion fails, keep the local record and record the error message

## References

- [Alibaba Cloud Voice Cloning Guide](https://help.aliyun.com/zh/model-studio/voice-cloning-user-guide)
- [Alibaba Cloud Voice Design Guide](https://help.aliyun.com/zh/model-studio/voice-design-user-guide)
- [Alibaba Cloud Voice Clone HTTP API Reference](https://help.aliyun.com/zh/model-studio/voice-clone-design-http-api)
- [Alibaba Cloud Voice Clone Java SDK Reference](https://help.aliyun.com/zh/model-studio/voice-clone-java-sdk)
- [Alibaba Cloud SSML & LaTeX](https://help.aliyun.com/zh/model-studio/ssml-latex-user-guide)
