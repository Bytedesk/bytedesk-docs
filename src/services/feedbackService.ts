// 反馈数据收集服务
import './feedbackConfig'; // 确保配置被加载

export interface FeedbackData {
  type: 'positive' | 'negative';
  comment: string;
  url: string;
  timestamp: string;
  userAgent: string;
  docTitle?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __GITHUB_TOKEN__?: string;
    __FORMSPREE_ID__?: string;
    __FEEDBACK_API__?: string;
    __GITHUB_REPO__?: string;
  }
}

export class FeedbackService {
  private static instance: FeedbackService;

  static getInstance(): FeedbackService {
    if (!FeedbackService.instance) {
      FeedbackService.instance = new FeedbackService();
    }
    return FeedbackService.instance;
  }

  /**
   * 提交反馈到多个渠道
   */
  async submitFeedback(data: FeedbackData): Promise<void> {
    console.log('提交反馈:', data);

    const promises: Promise<void>[] = [];

    // 1. Google Analytics (如果已配置)
    promises.push(this.submitToGoogleAnalytics(data));

    // 2. Formspree (免费表单服务)
    promises.push(this.submitToFormspree(data));

    // 3. 本地存储备份
    promises.push(this.saveToLocalStorage(data));

    // 4. 可选: 自定义API
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      promises.push(this.submitToCustomAPI(data));
    }

    // 5. 可选: GitHub Issues (如果配置了)
    const githubToken = typeof window !== 'undefined' ? 
      window.__GITHUB_TOKEN__ : undefined;
    if (githubToken) {
      promises.push(this.submitToGitHub(data));
    }

    try {
      await Promise.allSettled(promises);
      console.log('反馈提交成功');
    } catch (error) {
      console.error('反馈提交过程中出现错误:', error);
    }
  }

  /**
   * 提交到 Google Analytics
   */
  private async submitToGoogleAnalytics(data: FeedbackData): Promise<void> {
    return new Promise((resolve) => {
      try {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'feedback_submit', {
            event_category: 'documentation',
            event_label: data.type,
            value: data.type === 'positive' ? 1 : 0,
            custom_parameters: {
              page_url: data.url,
              feedback_comment: data.comment,
              doc_title: data.docTitle
            }
          });
        }
        resolve();
      } catch (error) {
        console.warn('Google Analytics 提交失败:', error);
        resolve(); // 不阻断其他提交方式
      }
    });
  }

  /**
   * 提交到 Formspree (需要注册账号获取表单ID)
   */
  private async submitToFormspree(data: FeedbackData): Promise<void> {
    const FORMSPREE_ID = typeof window !== 'undefined' ? 
      window.__FORMSPREE_ID__ : undefined;
    
    if (!FORMSPREE_ID) {
      console.warn('Formspree ID 未配置');
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `文档反馈 - ${data.type}`,
          message: data.comment,
          url: data.url,
          type: data.type,
          timestamp: data.timestamp,
          docTitle: data.docTitle
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree 提交失败: ${response.status}`);
      }
    } catch (error) {
      console.warn('Formspree 提交失败:', error);
    }
  }

  /**
   * 保存到本地存储作为备份
   */
  private async saveToLocalStorage(data: FeedbackData): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      
      const existingFeedbacks = JSON.parse(localStorage.getItem('doc_feedbacks') || '[]');
      existingFeedbacks.push(data);
      
      // 只保留最近100条反馈
      if (existingFeedbacks.length > 100) {
        existingFeedbacks.splice(0, existingFeedbacks.length - 100);
      }
      
      localStorage.setItem('doc_feedbacks', JSON.stringify(existingFeedbacks));
    } catch (error) {
      console.warn('本地存储保存失败:', error);
    }
  }

  /**
   * 提交到自定义API (如果有Bytedesk后端服务)
   */
  private async submitToCustomAPI(data: FeedbackData): Promise<void> {
    const API_ENDPOINT = typeof window !== 'undefined' ? 
      window.__FEEDBACK_API__ : undefined;
    
    if (!API_ENDPOINT) {
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API 提交失败: ${response.status}`);
      }
    } catch (error) {
      console.warn('自定义API提交失败:', error);
    }
  }

  /**
   * 创建GitHub Issue (需要配置GitHub Token)
   */
  private async submitToGitHub(data: FeedbackData): Promise<void> {
    const GITHUB_TOKEN = typeof window !== 'undefined' ? 
      window.__GITHUB_TOKEN__ : undefined;
    const GITHUB_REPO = typeof window !== 'undefined' ? 
      window.__GITHUB_REPO__ || 'bytedesk/bytedesk' : 'bytedesk/bytedesk';

    if (!GITHUB_TOKEN) {
      console.warn('GitHub Token 未配置');
      return;
    }

    try {
      const issueTitle = `[文档反馈] ${data.type === 'positive' ? '👍 正面' : '👎 改进'} - ${data.docTitle || '文档页面'}`;
      const issueBody = `
## 反馈信息

**反馈类型**: ${data.type === 'positive' ? '👍 有帮助' : '👎 需改进'}
**页面URL**: ${data.url}
**反馈时间**: ${data.timestamp}

## 用户评论

${data.comment || '无具体评论'}

## 技术信息

- User Agent: ${data.userAgent}
- 文档标题: ${data.docTitle || 'N/A'}

---
*此Issue由文档反馈系统自动创建*
      `;

      const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: ['documentation', 'feedback', data.type === 'positive' ? 'positive' : 'improvement']
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API 错误: ${response.status}`);
      }

      console.log('GitHub Issue 创建成功');
    } catch (error) {
      console.warn('GitHub Issue 创建失败:', error);
    }
  }

  /**
   * 获取本地存储的反馈数据 (用于管理员查看)
   */
  getLocalFeedbacks(): FeedbackData[] {
    try {
      if (typeof window === 'undefined') return [];
      return JSON.parse(localStorage.getItem('doc_feedbacks') || '[]');
    } catch {
      return [];
    }
  }

  /**
   * 清除本地反馈数据
   */
  clearLocalFeedbacks(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('doc_feedbacks');
  }

  /**
   * 导出反馈数据为JSON
   */
  exportFeedbacksAsJSON(): string {
    const feedbacks = this.getLocalFeedbacks();
    return JSON.stringify(feedbacks, null, 2);
  }

  /**
   * 导出反馈数据为CSV
   */
  exportFeedbacksAsCSV(): string {
    const feedbacks = this.getLocalFeedbacks();
    if (feedbacks.length === 0) return '';

    const headers = ['类型', '评论', 'URL', '时间', '用户代理', '文档标题'];
    const csvRows = [headers.join(',')];

    feedbacks.forEach(feedback => {
      const row = [
        feedback.type,
        `"${feedback.comment.replace(/"/g, '""')}"`, // 转义双引号
        feedback.url,
        feedback.timestamp,
        `"${feedback.userAgent.replace(/"/g, '""')}"`,
        feedback.docTitle || ''
      ];
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }
}

const feedbackService = FeedbackService.getInstance();
export default feedbackService;