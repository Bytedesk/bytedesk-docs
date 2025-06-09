import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';

// 默认布局根组件，可用于添加全局 Head 标签和聊天组件
export default function Root({children}) {
  const {siteConfig, i18n} = useDocusaurusContext();
  const url = siteConfig.url;
  const currentLocale = i18n.currentLocale;

  // 多语言文本配置
  const texts = {
    'en': {
      inviteText: 'Hello, how can I help you?',
      bubbleTitle: 'Need help?',
      bubbleSubtitle: 'Click to chat with me',
      acceptText: 'Accept',
      rejectText: 'Reject',
      locale: 'en'
    },
    'zh-CN': {
      inviteText: '您好，请问有什么可以帮您？',
      bubbleTitle: '需要帮助吗？',
      bubbleSubtitle: '点击与客服对话',
      acceptText: '开始会话',
      rejectText: '稍后再说',
      locale: 'zh-cn'
    },
    'zh-TW': {
      inviteText: '您好，請問有什麼可以幫您？',
      bubbleTitle: '需要幫助嗎？',
      bubbleSubtitle: '點擊與客服對話',
      acceptText: '開始會話',
      rejectText: '稍後再說',
      locale: 'zh-tw'
    }
  }
  // 获取当前语言的文本，如果没有则使用英文作为默认语言
  const currentTexts = texts[currentLocale] || texts.en

  // 配置客服组件
  const config = {
    placement: 'bottom-right',
    autoPopup: false,
    inviteConfig: {
      show: false,
      text: currentTexts.inviteText,
    },
    marginBottom: 20,
    marginSide: 20,
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: currentTexts.bubbleTitle,
      subtitle: currentTexts.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
    },
    chatConfig: {
      org: 'df_org_uid',  // 替换为你的组织ID
      t: "1",
      sid: 'df_wg_uid'    // 替换为你的SID
    },
    locale: currentTexts.locale,
  };

  const handleInit = () => {
    console.log('BytedeskReact initialized with locale:', currentLocale);
  };
  
  return (
    <>
      <Head>
        {/* 基本内容安全策略 */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            default-src 'self' ${url} *.weiyuai.cn;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' ${url} *.weiyuai.cn cdn.npmmirror.com;
            style-src 'self' 'unsafe-inline' ${url} *.weiyuai.cn fonts.googleapis.com cdn.npmmirror.com;
            img-src 'self' data: ${url} *.weiyuai.cn *.npmmirror.com;
            font-src 'self' ${url} *.weiyuai.cn fonts.gstatic.com data:;
            connect-src 'self' ${url} *.weiyuai.cn;
            frame-src 'self' ${url} *.weiyuai.cn;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
          `}
        />
        {/* 添加X-Frame-Options头以防止点击劫持 */}
        <meta
          httpEquiv="X-Frame-Options"
          content="SAMEORIGIN"
        />
        {/* 添加X-Content-Type-Options头以防止MIME类型嗅探 */}
        <meta
          httpEquiv="X-Content-Type-Options"
          content="nosniff"
        />
        {/* 添加Referrer-Policy头以控制Referrer信息 */}
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
      </Head>
      {children}
      <BytedeskReact {...config} onInit={handleInit} />
    </>
  );
}
