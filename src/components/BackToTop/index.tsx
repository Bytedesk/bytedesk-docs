import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';

export default function BackToTop(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件，控制按钮显示/隐藏
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示按钮
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // 清理事件监听器
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 如果不可见，不渲染组件
  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={styles.backToTop}
      onClick={scrollToTop}
      aria-label="返回顶部"
      title="返回顶部"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18,15 12,9 6,15" />
      </svg>
    </button>
  );
} 