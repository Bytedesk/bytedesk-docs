import React from 'react';
import { BytedeskReact } from 'bytedesk-web/react';
import { BytedeskConfig } from 'bytedesk-web';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  // 获取当前语言
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  // 根据不同语言设置不同的问候语
  // let greetingTitle = 'Hello, how can I help you?';
  // if (currentLocale === 'zh-CN') {
  //   greetingTitle = '您好，有什么可以帮您的？';
  // } else if (currentLocale === 'zh-TW') {
  //   greetingTitle = '您好，有什麼可以幫您的？';
  // }
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
  const currentTexts = texts[currentLocale as keyof typeof texts] || texts.en

  // 配置客服组件
  const config: BytedeskConfig = {
    placement: 'bottom-right',
    autoPopup: false,
    inviteConfig: {
      show: false,
      text: currentTexts.inviteText,
      // icon: '👋',
      // acceptText: currentTexts.acceptText,
      // rejectText: currentTexts.rejectText,
    },
    marginBottom: 20,
    marginSide: 20,
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: currentTexts.bubbleTitle, // 使用根据语言设置的问候语
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
      {children}
      <BytedeskReact {...config} onInit={handleInit} />
    </>
  );
}
