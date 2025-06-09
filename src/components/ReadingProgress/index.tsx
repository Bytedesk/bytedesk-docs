import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

/**
 * 阅读进度指示器组件，显示用户阅读文档的进度
 */
export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // 计算滚动进度的函数
    const calculateScrollProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
        
      const scrolled = (scrollTop / height) * 100;
      setWidth(scrolled);
    };

    // 添加滚动事件监听
    window.addEventListener('scroll', calculateScrollProgress);
    
    // 初始计算一次
    calculateScrollProgress();
    
    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);

  return (
    <div className={styles.progressContainer}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
