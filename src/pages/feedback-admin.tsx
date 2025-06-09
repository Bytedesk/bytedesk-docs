import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import feedbackService from '../services/feedbackService';
import type { FeedbackData } from '../services/feedbackService';

export default function FeedbackAdmin(): JSX.Element {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative'>('all');

  const loadFeedbacks = () => {
    const localFeedbacks = feedbackService.getLocalFeedbacks();
    setFeedbacks(localFeedbacks);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const clearFeedbacks = () => {
    if (confirm('确定要清除所有本地反馈数据吗？')) {
      feedbackService.clearLocalFeedbacks();
      setFeedbacks([]);
    }
  };

  const exportFeedbacks = () => {
    const dataStr = JSON.stringify(feedbacks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `feedback-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    filter === 'all' || feedback.type === filter
  );

  const positiveCount = feedbacks.filter(f => f.type === 'positive').length;
  const negativeCount = feedbacks.filter(f => f.type === 'negative').length;

  return (
    <Layout title="反馈数据管理" description="查看和管理用户反馈数据">
      <div style={{ padding: '2rem' }}>
        <h1>反馈数据管理</h1>
        
        {/* 统计信息 */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            background: '#f0f9ff', 
            padding: '1rem', 
            borderRadius: '8px',
            flex: 1
          }}>
            <h3>总反馈数</h3>
            <p style={{ fontSize: '2rem', margin: 0 }}>{feedbacks.length}</p>
          </div>
          <div style={{ 
            background: '#f0fdf4', 
            padding: '1rem', 
            borderRadius: '8px',
            flex: 1
          }}>
            <h3>正面反馈</h3>
            <p style={{ fontSize: '2rem', margin: 0, color: '#16a34a' }}>
              {positiveCount} ({feedbacks.length > 0 ? Math.round(positiveCount / feedbacks.length * 100) : 0}%)
            </p>
          </div>
          <div style={{ 
            background: '#fef2f2', 
            padding: '1rem', 
            borderRadius: '8px',
            flex: 1
          }}>
            <h3>改进建议</h3>
            <p style={{ fontSize: '2rem', margin: 0, color: '#dc2626' }}>
              {negativeCount} ({feedbacks.length > 0 ? Math.round(negativeCount / feedbacks.length * 100) : 0}%)
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              background: filter === 'all' ? '#3b82f6' : '#e5e7eb',
              color: filter === 'all' ? 'white' : '#374151',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('positive')}
            style={{
              background: filter === 'positive' ? '#16a34a' : '#e5e7eb',
              color: filter === 'positive' ? 'white' : '#374151',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            正面反馈
          </button>
          <button
            onClick={() => setFilter('negative')}
            style={{
              background: filter === 'negative' ? '#dc2626' : '#e5e7eb',
              color: filter === 'negative' ? 'white' : '#374151',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            改进建议
          </button>
          <button
            onClick={exportFeedbacks}
            style={{
              background: '#059669',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            导出数据
          </button>
          <button
            onClick={clearFeedbacks}
            style={{
              background: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            清除数据
          </button>
        </div>

        {/* 反馈列表 */}
        <div>
          {filteredFeedbacks.length === 0 ? (
            <p>暂无反馈数据</p>
          ) : (
            filteredFeedbacks.map((feedback, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  background: feedback.type === 'positive' ? '#f0fdf4' : '#fef2f2'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: feedback.type === 'positive' ? '#16a34a' : '#dc2626',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {feedback.type === 'positive' ? '👍 有帮助' : '👎 需改进'}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {new Date(feedback.timestamp).toLocaleString('zh-CN')}
                  </span>
                </div>
                
                <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>
                  页面: <a href={feedback.url} target="_blank" rel="noopener noreferrer">
                    {feedback.docTitle || feedback.url}
                  </a>
                </p>
                
                {feedback.comment && (
                  <div style={{ 
                    background: 'white', 
                    padding: '0.75rem', 
                    borderRadius: '4px',
                    margin: '0.5rem 0'
                  }}>
                    <strong>用户评论:</strong>
                    <p style={{ margin: '0.5rem 0 0 0' }}>{feedback.comment}</p>
                  </div>
                )}
                
                <details style={{ marginTop: '0.5rem' }}>
                  <summary style={{ cursor: 'pointer', color: '#6b7280' }}>技术信息</summary>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    <p>URL: {feedback.url}</p>
                    <p>User Agent: {feedback.userAgent}</p>
                    <p>时间戳: {feedback.timestamp}</p>
                  </div>
                </details>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
