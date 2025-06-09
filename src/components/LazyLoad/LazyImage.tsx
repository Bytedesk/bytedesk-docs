import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  placeholder?: string;
}

/**
 * 延迟加载图片组件，提升页面性能
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg=='
}: LazyImageProps): JSX.Element {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    // 观察器配置
    const observerOptions = {
      root: null, // 使用视口作为根
      rootMargin: '0px',
      threshold: 0.1 // 当图片有10%进入视口时加载
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 当图片进入视口
        if (entry.isIntersecting) {
          // 设置真实图片src
          setImageSrc(src);
          // 取消观察
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 开始观察
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // 清理观察器
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        width: width,
        height: height,
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.5,
      }}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
