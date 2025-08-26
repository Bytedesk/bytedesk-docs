import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BytedeskReact } from 'bytedesk-web/react';
import '@site/src/css/watermark.css';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import { useUltimateDropdownFix } from '@site/src/hooks/useUltimateDropdownFix.js';
// import { BytedeskConfig } from 'bytedesk-web';

// 默认布局根组件，可用于添加全局 Head 标签和聊天组件
export default function Root({children}) {
  const {siteConfig, i18n} = useDocusaurusContext();
  const url = siteConfig.url;
  const currentLocale = i18n.currentLocale;

  // 使用超强力导航栏下拉菜单修复 hook
  useUltimateDropdownFix();

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
    placement: 'bottom-left',
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

  // 全局图片点击放大功能
  useEffect(() => {
    // 创建模态框样式
    const modalStyles = `
      .global-image-modal {
        position: fixed;
        z-index: 9999;
        padding-top: 50px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: auto;
      }
      .global-image-modal-content {
        margin: auto;
        display: block;
        max-width: 90%;
        max-height: 80vh;
        position: relative;
      }
      .global-image-modal-caption {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: auto;
      }
      .global-image-modal-close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
      }
      .global-image-modal-close:hover {
        color: #bbb;
      }
      @media only screen and (max-width: 700px) {
        .global-image-modal-content {
          max-width: 100%;
        }
      }
      /* 图片宽度限制样式 */
      .img-width-limited {
        max-width: 100%;
        height: auto;
      }
    `;

    // 添加样式到页面
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    // 为所有图片添加点击事件
    const addImageClickHandlers = () => {
      const images = document.querySelectorAll('img:not(.global-image-modal-content img):not(.navbar__logo):not(.navbar .navbar__brand img):not(.navbar .navbar__logo):not(.navbar img[src*="logo"])');
      
      images.forEach(img => {
        // 跳过已经处理过的图片
        if (img.dataset.globalZoomHandled) return;
        
        // 标记为已处理
        img.dataset.globalZoomHandled = 'true';
        
        // 处理图片宽度限制
        const handleImageWidth = (imageElement) => {
          // 检查是否有宽度属性
          const widthAttr = imageElement.getAttribute('width');
          const styleWidth = imageElement.style.width;
          
          // 为所有图片应用宽度限制样式，确保不会超出屏幕
          imageElement.classList.add('img-width-limited');
          
          if (widthAttr || styleWidth) {
            // 如果设置了具体的宽度值，直接应用
            if (widthAttr) {
              imageElement.style.maxWidth = `${widthAttr}px`;
            } else if (styleWidth) {
              // 处理样式中的宽度值
              const widthValue = styleWidth.replace(/[^\d]/g, '');
              if (widthValue) {
                imageElement.style.maxWidth = `${widthValue}px`;
              }
            }
          }
        };
        
        // 应用宽度限制
        handleImageWidth(img);
        
        // 为图片添加水印类名，确保正常显示时也有水印
        // 检查图片是否已经有父容器应用了水印样式
        let parentContainer = img.parentElement;
        let watermarkedContainer = null;
        
        // 向上查找已经应用水印样式的父容器
        while (parentContainer && parentContainer !== document.body) {
          if (parentContainer.classList.contains('watermarked-image')) {
            watermarkedContainer = parentContainer;
            break;
          }
          parentContainer = parentContainer.parentElement;
        }
        
        // 如果没有找到水印容器，为图片创建一个包装器
        if (!watermarkedContainer) {
          const wrapper = document.createElement('div');
          wrapper.className = 'watermarked-image';
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
        
        // 添加点击事件
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // 检查是否已经有模态框存在，如果有则先关闭
          const existingModal = document.querySelector('.global-image-modal');
          if (existingModal) {
            existingModal.remove();
            document.body.style.overflow = '';
            return;
          }
          
          const modal = document.createElement('div');
          modal.className = 'global-image-modal';
          
          const closeBtn = document.createElement('span');
          closeBtn.className = 'global-image-modal-close';
          closeBtn.innerHTML = '&times;';
          
          const modalContent = document.createElement('div');
          modalContent.className = 'watermarked-image image-modal-content';
          
          const modalImg = document.createElement('img');
          modalImg.className = 'global-image-modal-content';
          modalImg.src = img.src;
          modalImg.alt = img.alt || '';
          
          const caption = document.createElement('div');
          caption.className = 'global-image-modal-caption';
          caption.textContent = img.alt || '';
          
          modalContent.appendChild(modalImg);
          modal.appendChild(closeBtn);
          modal.appendChild(modalContent);
          modal.appendChild(caption);
          
          document.body.appendChild(modal);
          document.body.style.overflow = 'hidden';
          
          // 关闭事件
          const closeModal = () => {
            try {
              if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
              }
            } catch (error) {
              console.warn('Failed to remove modal:', error);
            }
            document.body.style.overflow = '';
            // 移除事件监听器
            document.removeEventListener('keydown', handleEsc);
          };
          
          closeBtn.addEventListener('click', closeModal);
          modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === modalImg) {
              closeModal();
            }
          });
          
          // ESC键关闭
          const handleEsc = (e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          };
          document.addEventListener('keydown', handleEsc);
        });
        
        // 添加鼠标样式
        img.style.cursor = 'zoom-in';
      });
    };

    // 初始执行
    addImageClickHandlers();

    // 监听DOM变化，处理动态加载的图片
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });
      
      if (shouldCheck) {
        // 延迟执行，确保DOM完全渲染
        setTimeout(addImageClickHandlers, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 清理函数
    return () => {
      observer.disconnect();
      try {
        if (styleSheet.parentNode) {
          styleSheet.parentNode.removeChild(styleSheet);
        }
      } catch (error) {
        console.warn('Failed to remove styleSheet:', error);
      }
    };
  }, []);
  
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
