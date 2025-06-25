import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import ZoomableImage from './ZoomableImage';

/**
 * 图片转换组件 - 自动将普通Markdown图片转换为可点击放大的ZoomableImage组件
 * 这个组件会在客户端运行时将标准Markdown图片语法转换为可交互的组件
 */
export default function ImageConverter() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    // 转换标准的Markdown图片为交互式图片
    const convertStandardImages = () => {
      // 查找所有标准图片（不在watermarked-image容器中）
      // 特别注意：必须捕获所有包含在 article 内的图片，因为这是 Docusaurus 放置内容的容器
      const images = document.querySelectorAll('article img, .markdown img, .theme-doc-markdown img, img:not(.watermarked-image img):not(.navbar__logo)');
      
      console.log("找到图片数量:", images.length);
      
      images.forEach(img => {
        // 跳过已经处理过的、导航栏中的、页脚中的、代码块中的图片以及链接中的图片
        if (img.closest('.navbar') || 
            img.closest('.footer') || 
            img.closest('.theme-code-block') || 
            img.closest('a') ||
            img.classList.contains('processed-image') ||
            img.closest('.watermarked-image')) {
          return;
        }
        
        console.log("处理图片:", img.src);

        // 标记这个图片已被处理
        img.classList.add('processed-image');
        
        // 排除SVG和特殊图片
        if (img.src.endsWith('.svg') || 
            img.classList.contains('special-image') || 
            (img.width && img.width < 50)) { // 忽略非常小的图标
          return;
        }
        
        console.log('Converting image:', img.src); // 调试日志

        // 为图片创建包装元素，并应用水印样式
        const parent = img.parentNode;
        if (parent && parent.nodeName !== 'DIV' && !parent.classList.contains('watermarked-image')) {
          // 保存原始属性
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || '';
          const width = img.style.width || img.width;
          const className = img.className;
          
          // 创建容器元素
          const wrapper = document.createElement('div');
          wrapper.className = 'watermarked-image';
          wrapper.style.cursor = 'zoom-in';
          wrapper.style.position = 'relative';
          wrapper.style.display = 'inline-block';
          wrapper.style.maxWidth = '100%';
          
          // 添加点击事件
          wrapper.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'image-zoom-modal';
            modal.style.position = 'fixed';
            modal.style.zIndex = '9999';
            modal.style.paddingTop = '50px';
            modal.style.left = '0';
            modal.style.top = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.display = 'flex';
            modal.style.flexDirection = 'column';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.overflow = 'auto';
            
            // 添加关闭按钮
            const closeBtn = document.createElement('span');
            closeBtn.innerText = '×';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '15px';
            closeBtn.style.right = '35px';
            closeBtn.style.color = '#f1f1f1';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.fontWeight = 'bold';
            closeBtn.style.cursor = 'pointer';
            
            // 创建大图预览
            const modalContent = document.createElement('div');
            modalContent.className = 'watermarked-image image-modal-content';
            
            const modalImg = document.createElement('img');
            modalImg.src = src;
            modalImg.alt = alt;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '80vh';
            modalImg.style.display = 'block';
            modalImg.style.margin = 'auto';
            
            // 添加图片说明
            const caption = document.createElement('div');
            caption.innerText = alt;
            caption.style.margin = 'auto';
            caption.style.display = 'block';
            caption.style.width = '80%';
            caption.style.maxWidth = '700px';
            caption.style.textAlign = 'center';
            caption.style.color = '#ccc';
            caption.style.padding = '10px 0';
            
            // 组装模态框
            modalContent.appendChild(modalImg);
            modal.appendChild(closeBtn);
            modal.appendChild(modalContent);
            modal.appendChild(caption);
            
            // 点击关闭
            modal.addEventListener('click', () => {
              document.body.removeChild(modal);
            });
            
            document.body.appendChild(modal);
          });
          
          // 替换原始图片
          parent.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
      });
    };

    // 初次执行
    convertStandardImages();
    
    // 监听自定义事件，强制处理图片
    document.addEventListener('convert-images', convertStandardImages);
    
    // 监听DOM变化，处理动态加载的内容
    const observer = new MutationObserver(mutations => {
      let shouldProcess = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          shouldProcess = true;
        }
      });
      
      if (shouldProcess) {
        setTimeout(convertStandardImages, 500); // 增加延时，确保DOM完全加载
      }
    });
    
    // 开始监听
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 清理函数
    return () => {
      observer.disconnect();
      document.removeEventListener('convert-images', convertStandardImages);
    };
  }, []);

  return null;
}
