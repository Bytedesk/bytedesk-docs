// React 配置和错误处理
import React from 'react';

// 添加全局错误处理
if (typeof window !== 'undefined') {
  // 捕获未处理的 Promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // 防止默认的错误处理行为
    event.preventDefault();
  });

  // 捕获全局 JavaScript 错误
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // 如果是搜索相关的错误，记录但不阻止默认行为
    if (event.error && event.error.message && event.error.message.includes('search')) {
      console.warn('Search-related error detected, but continuing...');
    }
  });

  // 添加 React 开发工具支持
  if (process.env.NODE_ENV === 'development') {
    // 在开发模式下添加额外的调试信息
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // 过滤掉一些常见的 React 警告，这些通常不会影响功能
      const message = args.join(' ');
      if (
        message.includes('Warning: ReactDOM.render is no longer supported') ||
        message.includes('Warning: componentWillReceiveProps has been renamed') ||
        message.includes('Warning: componentWillUpdate has been renamed')
      ) {
        return;
      }
      originalConsoleError.apply(console, args);
    };
  }
}

// 导出空的默认组件，这个文件主要用于副作用
export default function ReactConfig() {
  return null;
} 