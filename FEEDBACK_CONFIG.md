# 反馈服务配置说明

## 问题解决

修复了在浏览器环境中 `process is not defined` 的错误。原因是在前端浏览器环境中无法访问 Node.js 的 `process` 对象。

## 配置方法

### 方法一：使用配置文件（推荐）

1. 在应用启动时导入并配置反馈服务：

```typescript
import { initFeedbackConfig } from './services/feedbackConfig';

// 在应用启动时配置
initFeedbackConfig({
  formspreeId: 'your_formspree_id',
  githubToken: 'your_github_token', // 可选
  githubRepo: 'your_org/your_repo', // 可选
  feedbackApi: 'https://your-api.com/feedback' // 可选
});
```

### 方法二：直接设置全局变量

在 HTML 页面或应用启动时设置：

```javascript
window.__FORMSPREE_ID__ = 'your_formspree_id';
window.__GITHUB_TOKEN__ = 'your_github_token'; // 可选
window.__GITHUB_REPO__ = 'your_org/your_repo'; // 可选
window.__FEEDBACK_API__ = 'https://your-api.com/feedback'; // 可选
```

### 方法三：在 Docusaurus 中配置

在 `docusaurus.config.ts` 中添加自定义脚本：

```typescript
export default {
  // ... 其他配置
  scripts: [
    {
      src: '/feedback-config.js',
      async: false,
    },
  ],
};
```

然后在 `static/feedback-config.js` 中：

```javascript
window.__FORMSPREE_ID__ = 'your_formspree_id';
// 其他配置...
```

## 服务说明

修复后的反馈服务现在支持以下功能：

1. **Google Analytics** - 自动发送事件（如果 gtag 已配置）
2. **Formspree** - 需要配置 `formspreeId`
3. **本地存储** - 始终可用，作为备份
4. **自定义API** - 仅在非 localhost 环境下调用
5. **GitHub Issues** - 需要配置 `githubToken`

## 获取配置 ID

### Formspree

1. 访问 [formspree.io](https://formspree.io)
2. 注册账号并创建表单
3. 获取表单 ID（格式：`xxxxxxxxx`）

### GitHub Token

1. 访问 GitHub Settings > Developer settings > Personal access tokens
2. 创建新的 token，授予 `repo` 权限
3. 复制生成的 token

## 安全注意事项

- GitHub Token 具有敏感权限，请谨慎使用
- 建议在生产环境中使用专门的服务账号
- 考虑使用服务端 API 代理来隐藏敏感信息

## 使用示例

```typescript
import feedbackService from './services/feedbackService';

// 提交反馈
await feedbackService.submitFeedback({
  type: 'positive',
  comment: '这个文档很有帮助！',
  url: window.location.href,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  docTitle: document.title
});
```
