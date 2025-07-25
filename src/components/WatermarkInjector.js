import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * 图片水印组件 - 自动为网站中所有图片添加水印
 * 通过 DOM 操作将所有 img 元素包装在带水印的 div 中
 */
export default function WatermarkInjector() {
  React.useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    // 为所有图片添加水印
    const addWatermarkToImages = () => {
      // 选择所有未处理的图片（不包含已经在 watermarked-image 内的图片）
      // 特别关注 article 标签内的图片，这是 Docusaurus 放置文档内容的主要容器
      const images = document.querySelectorAll('article img, .markdown img, .theme-doc-markdown img, img:not(.watermarked-image img):not(.navbar__logo)');
      
      console.log("WatermarkInjector 找到图片数量:", images.length);
      
      images.forEach(img => {
        // 跳过导航栏、页脚中的图片以及已处理的图片
        if (img.closest('.navbar') || img.closest('.footer') || 
            img.closest('.theme-code-block') || img.closest('a') ||
            img.classList.contains('watermark-processed')) {
          return;
        }
        
        console.log("WatermarkInjector 处理图片:", img.src);
        
        // 标记图片已处理
        img.classList.add('watermark-processed');
        
        // 创建包装器元素
        const wrapper = document.createElement('div');
        wrapper.className = 'watermarked-image';
        
        // 将图片包装在 div 中
        if (img.parentNode) {
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
      });
    };

    // 执行一次
    addWatermarkToImages();
    
    // 创建 MutationObserver 来处理动态加载的图片
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          addWatermarkToImages();
        }
      });
    });
    
    // 监听整个文档的变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 清理函数
    return () => observer.disconnect();
  }, []);

  return null;
}
