// import React, { useEffect } from 'react';
// import { useColorMode } from '@docusaurus/theme-common';
// import WatermarkInjector from '@site/src/components/WatermarkInjector';
// import ImageConverter from '@site/src/components/ImageConverter';
// import '@site/src/css/watermark.css';

// export default function Root({ children }) {
//   // 在页面加载后，确保组件正确初始化
//   useEffect(() => {
//     // 强制应用水印样式
//     const style = document.createElement('style');
//     style.innerHTML = `
//       /* 确保水印样式能被应用到所有图片 */
//       article img, .markdown img, .theme-doc-markdown img {
//         max-width: 100%;
//         cursor: pointer;
//       }
//     `;
//     document.head.appendChild(style);
    
//     // 确保动态生成的内容也能被处理
//     const runEnhancers = () => {
//       setTimeout(() => {
//         console.log('Enhancing images with watermark and zoom functionality...');
//         // 手动触发 WatermarkInjector 和 ImageConverter 的处理
//         const watermarkEvent = new CustomEvent('watermark-images');
//         const convertEvent = new CustomEvent('convert-images');
//         document.dispatchEvent(watermarkEvent);
//         document.dispatchEvent(convertEvent);
//       }, 1000); // 增加延迟时间，确保 DOM 完全加载
//     };
    
//     // 在首次加载和路由变化时运行
//     runEnhancers();
    
//     // 监听路由变化（Docusaurus 页面切换）
//     const observer = new MutationObserver(() => {
//       runEnhancers();
//     });
    
//     // 监听文档变化
//     observer.observe(document.documentElement, { 
//       childList: true,
//       subtree: true 
//     });
    
//     return () => observer.disconnect();
//   }, []);
  
//   return (
//     <>
//       {children}
//       <WatermarkInjector />
//       <ImageConverter />
//     </>
//   );
// }
