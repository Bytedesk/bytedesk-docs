import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface SearchWrapperProps {
  children: React.ReactNode;
}

/**
 * 搜索功能包装器，用于隔离搜索相关的错误
 */
export default function SearchWrapper({ children }: SearchWrapperProps): JSX.Element {
  return (
    <ErrorBoundary
      fallback={
        <div style={{
          padding: '8px 12px',
          border: '1px solid #e1e5e9',
          borderRadius: '4px',
          backgroundColor: '#f8f9fa',
          color: '#6c757d',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>🔍</span>
          <span>搜索功能暂时不可用</span>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
} 