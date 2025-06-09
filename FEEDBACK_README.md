# 文档反馈系统

文档反馈系统已成功集成到 Bytedesk 文档网站中，用于收集用户对文档质量的反馈。

## 功能特点

- 👍👎 简单的二元反馈机制
- 💬 可选的文字评论功能
- 📊 多渠道数据收集
- 🔒 本地备份存储
- 📈 管理员反馈数据查看

## 数据收集渠道

### 1. 本地存储 (默认启用)

- 自动将反馈数据保存到浏览器 localStorage
- 最多保存 100 条最新反馈
- 可通过管理页面查看和导出

### 2. Google Analytics 4 (可选)

- 如果网站已配置 GA4，会自动发送反馈事件
- 事件名称: `feedback_submit`
- 包含页面URL、反馈类型、评论等信息

### 3. Formspree (推荐)

- 免费的表单服务，无需后端开发
- 自动发送邮件通知
- 需要注册并配置表单ID

### 4. 自定义API (可选)

- 如果有自己的后端服务
- 支持发送到任意 API 端点

### 5. GitHub Issues (可选)

- 自动将反馈创建为 GitHub Issues
- 适合开源项目收集反馈

## 配置说明

### 快速开始

1. **复制配置文件**

   ```bash
   cp .env.feedback .env.local
   ```

2. **配置 Formspree (推荐)**
   - 访问 [Formspree](https://formspree.io/) 注册账号
   - 创建新表单，获取表单ID
   - 在 `.env.local` 中设置:

     ```
     REACT_APP_FORMSPREE_ID=your_form_id
     ```

3. **重启开发服务器**

   ```bash
   npm run dev
   ```

### 高级配置

#### GitHub Issues 集成

```bash
# 在 .env.local 中配置
REACT_APP_GITHUB_TOKEN=your_personal_access_token
REACT_APP_GITHUB_REPO=your_username/your_repo
```

#### 自定义API端点

```bash
# 在 .env.local 中配置
REACT_APP_FEEDBACK_API=https://api.yourdomain.com/feedback
```

## 使用说明

### 用户端

- 文档页面底部会自动显示反馈组件
- 用户可以点击"有帮助"或"需改进"
- 点击"需改进"时会显示评论框
- 提交后显示感谢信息

### 管理员端

- 访问 `/feedback-admin` 查看反馈数据
- 支持按类型筛选 (全部/正面/改进)
- 可以导出反馈数据为 JSON 格式
- 可以清除本地存储的反馈数据

## API 说明

### 反馈数据结构

```typescript
interface FeedbackData {
  type: 'positive' | 'negative';  // 反馈类型
  comment: string;                // 用户评论
  url: string;                    // 页面URL
  timestamp: string;              // ISO时间戳
  userAgent: string;              // 浏览器信息
  docTitle?: string;              // 文档标题
}
```

### 自定义API端点

如果要实现自己的反馈收集API，请参考以下接口：

```http
POST /api/feedback
Content-Type: application/json

{
  "type": "positive",
  "comment": "这篇文档很有帮助！",
  "url": "https://docs.example.com/getting-started",
  "timestamp": "2025-05-30T10:30:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "docTitle": "快速开始"
}
```

## 部署注意事项

### 环境变量

- 开发环境: `.env.local`
- 生产环境: 通过 CI/CD 系统设置环境变量

### 隐私保护

- 不收集用户个人身份信息
- 只收集必要的技术信息 (URL、User Agent)
- 遵循 GDPR 和其他隐私法规

### 性能考虑

- 反馈提交是异步的，不会阻塞页面
- 本地存储限制为 100 条记录
- 网络错误不会影响用户体验

## 故障排除

### 常见问题

1. **反馈按钮不显示**
   - 检查组件是否正确集成到 DocItem Footer
   - 确认没有 CSS 冲突

2. **数据提交失败**
   - 检查网络连接
   - 验证环境变量配置
   - 查看浏览器控制台错误信息

3. **Formspree 配置问题**
   - 确认表单ID正确
   - 检查 Formspree 账号是否激活
   - 验证域名白名单设置

### 调试模式

在浏览器控制台中查看详细日志：

```javascript
// 查看本地存储的反馈数据
console.log(JSON.parse(localStorage.getItem('doc_feedbacks') || '[]'));

// 手动触发反馈提交测试
feedbackService.submitFeedback({
  type: 'positive',
  comment: '测试反馈',
  url: window.location.href,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  docTitle: document.title
});
```

## 扩展功能

### 1. 评分系统

可以扩展为 1-5 星评分系统：

```typescript
interface RatingFeedback extends FeedbackData {
  rating: number; // 1-5 星
}
```

### 2. 分类标签

添加反馈分类功能：

```typescript
interface CategorizedFeedback extends FeedbackData {
  category: 'content' | 'navigation' | 'design' | 'technical';
}
```

### 3. 用户识别

可以添加可选的用户标识：

```typescript
interface UserFeedback extends FeedbackData {
  userId?: string;
  userEmail?: string;
}
```

## 贡献

欢迎提交 Issue 和 Pull Request 来改进反馈系统！

## 许可证

本反馈系统遵循项目主许可证。
