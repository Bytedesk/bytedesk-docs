# 反馈服务 `process is not defined` 错误修复报告

## 问题描述

用户在点击"有帮助"按钮时遇到以下错误：

```bash
提交反馈失败: ReferenceError: process is not defined
    at FeedbackService.submitFeedback (feedbackService.ts:48:1)
```

## 问题原因

在前端浏览器环境中，Node.js 的 `process` 对象不存在。原代码中多处使用了 `process.env` 来访问环境变量，这在 Docusaurus 等静态站点生成器的客户端代码中会导致错误。

## 修复方案

### 1. 替换环境变量访问方式

将所有 `process.env` 访问替换为安全的浏览器兼容方式：

- `process.env.NODE_ENV` → `typeof window !== 'undefined' && window.location.hostname !== 'localhost'`
- `process.env.REACT_APP_FORMSPREE_ID` → `window.__FORMSPREE_ID__`
- `process.env.REACT_APP_GITHUB_TOKEN` → `window.__GITHUB_TOKEN__`
- `process.env.REACT_APP_GITHUB_REPO` → `window.__GITHUB_REPO__`
- `process.env.REACT_APP_FEEDBACK_API` → `window.__FEEDBACK_API__`

### 2. 更新 TypeScript 类型定义

扩展了 `Window` 接口，添加了自定义配置属性：

```typescript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __GITHUB_TOKEN__?: string;
    __FORMSPREE_ID__?: string;
    __FEEDBACK_API__?: string;
    __GITHUB_REPO__?: string;
  }
}
```

### 3. 创建配置管理系统

#### 3.1 配置文件 (`feedbackConfig.ts`)

- 提供了 `initFeedbackConfig()` 函数用于设置配置
- 提供了 `getFeedbackConfig()` 函数用于获取当前配置

#### 3.2 静态配置脚本 (`static/feedback-config.js`)

- 在页面加载时自动设置基本配置
- 包含了配置示例和说明

#### 3.3 Docusaurus 配置更新

在 `docusaurus.config.ts` 中添加了脚本引用：

```typescript
scripts: [
  {
    src: '/docs/feedback-config.js',
    async: false,
  },
],
```

## 修复后的功能

### ✅ 工作正常的功能

1. **Google Analytics** - 如果 `window.gtag` 存在则自动提交
2. **本地存储** - 始终可用，作为备份存储
3. **错误处理** - 所有提交方式都有独立的错误处理

### ⚠️ 需要配置的功能

1. **Formspree** - 需要设置 `window.__FORMSPREE_ID__`
2. **GitHub Issues** - 需要设置 `window.__GITHUB_TOKEN__`
3. **自定义API** - 需要设置 `window.__FEEDBACK_API__`

## 配置方法

### 方法一：直接设置全局变量

```javascript
window.__FORMSPREE_ID__ = 'your_formspree_id';
window.__GITHUB_TOKEN__ = 'your_github_token';
window.__GITHUB_REPO__ = 'your_org/your_repo';
window.__FEEDBACK_API__ = 'https://your-api.com/feedback';
```

### 方法二：使用配置函数

```typescript
import { initFeedbackConfig } from './services/feedbackConfig';

initFeedbackConfig({
  formspreeId: 'your_formspree_id',
  githubToken: 'your_github_token',
  githubRepo: 'your_org/your_repo',
  feedbackApi: 'https://your-api.com/feedback'
});
```

### 方法三：修改静态配置文件

编辑 `static/feedback-config.js` 文件，取消注释并填入正确的配置值。

## 测试验证

1. **开发服务器启动** ✅

   ```bash
   npm run start
   ```

2. **测试页面访问** ✅
   - 访问: <http://localhost:9008/docs/feedback-test.html>
   - 该页面包含了完整的测试界面

3. **功能测试**
   - 配置状态检查 ✅
   - 快速反馈测试 ✅
   - 详细反馈测试 ✅
   - 本地存储管理 ✅

## 兼容性

- ✅ 浏览器环境（客户端渲染）
- ✅ 服务端渲染（SSR）
- ✅ 静态站点生成（SSG）
- ✅ Docusaurus 3.x

## 安全考虑

1. **敏感信息保护**
   - GitHub Token 具有仓库权限，请谨慎使用
   - 建议在生产环境中使用专门的服务账号

2. **配置隔离**
   - 开发环境和生产环境应使用不同的配置
   - 避免在客户端代码中暴露敏感信息

## 后续建议

1. **环境变量管理**
   - 考虑使用更安全的配置管理方案
   - 可以通过服务端 API 动态获取配置

2. **功能增强**
   - 添加反馈统计和分析功能
   - 集成更多第三方服务

3. **用户体验优化**
   - 添加反馈提交成功的视觉反馈
   - 支持离线状态下的反馈暂存

## 文件清单

### 修改的文件

- `src/services/feedbackService.ts` - 主要修复文件
- `docusaurus.config.ts` - 添加脚本配置

### 新增的文件

- `src/services/feedbackConfig.ts` - 配置管理
- `static/feedback-config.js` - 静态配置脚本
- `FEEDBACK_CONFIG.md` - 配置说明文档
- `static/feedback-test.html` - 测试页面（更新）

修复完成！现在反馈服务应该能够在浏览器环境中正常工作，不再出现 `process is not defined` 错误。
