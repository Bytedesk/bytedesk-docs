// 反馈服务配置
// 此文件用于在浏览器环境中设置反馈服务的配置项

export interface FeedbackConfig {
  formspreeId?: string;
  githubToken?: string;
  githubRepo?: string;
  feedbackApi?: string;
}

/**
 * 初始化反馈服务配置
 * 在应用启动时调用此函数来设置全局配置
 */
export function initFeedbackConfig(config: FeedbackConfig): void {
  if (typeof window !== 'undefined') {
    window.__FORMSPREE_ID__ = config.formspreeId;
    window.__GITHUB_TOKEN__ = config.githubToken;
    window.__GITHUB_REPO__ = config.githubRepo;
    window.__FEEDBACK_API__ = config.feedbackApi;
  }
}

/**
 * 获取当前配置
 */
export function getFeedbackConfig(): FeedbackConfig {
  if (typeof window === 'undefined') {
    return {};
  }
  
  return {
    formspreeId: window.__FORMSPREE_ID__,
    githubToken: window.__GITHUB_TOKEN__,
    githubRepo: window.__GITHUB_REPO__,
    feedbackApi: window.__FEEDBACK_API__
  };
}

// 默认配置（可以根据环境变量或配置文件设置）
const defaultConfig: FeedbackConfig = {
  // 在这里设置默认值，或者从其他地方获取配置
  githubRepo: 'bytedesk/bytedesk',
  // formspreeId: 'YOUR_FORMSPREE_ID',
  // githubToken: 'YOUR_GITHUB_TOKEN',
  // feedbackApi: 'YOUR_API_ENDPOINT'
};

// 自动初始化默认配置
if (typeof window !== 'undefined') {
  initFeedbackConfig(defaultConfig);
}
