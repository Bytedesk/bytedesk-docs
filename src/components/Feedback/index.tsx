/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import feedbackService from '../../services/feedbackService';
import type { FeedbackData } from '../../services/feedbackService';
import styles from './styles.module.css';

/**
 * 文档页面反馈组件，用于收集用户对文档质量的评价
 */
export default function Feedback(): JSX.Element {
  // 反馈状态管理
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  // 处理反馈提交
  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedbackType(type);
    
    if (type === 'positive') {
      // 直接提交积极反馈
      submitFeedback(type, '');
    } else {
      // 显示评论框以收集更多信息
      setIsCommentVisible(true);
    }
  };

  // 提交反馈信息
  const submitFeedback = async (type: 'positive' | 'negative', comment: string) => {
    const feedbackData: FeedbackData = {
      type,
      comment,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      docTitle: document.title,
    };

    try {
      await feedbackService.submitFeedback(feedbackData);
      console.log('反馈已成功提交到多个渠道');
    } catch (error) {
      console.error('提交反馈失败:', error);
    }

    // 显示感谢信息
    setFeedbackSubmitted(true);
    setIsCommentVisible(false);
  };

  // 提交评论
  const handleCommentSubmit = () => {
    submitFeedback(feedbackType, comment);
  };

  // 取消评论
  const handleCancel = () => {
    setFeedbackType(null);
    setIsCommentVisible(false);
    setComment('');
  };

  // 已提交反馈后显示感谢信息
  if (feedbackSubmitted) {
    return (
      <div className={styles.feedbackContainer}>
        <p className={styles.thankYouMessage}>
          谢谢您的反馈！
        </p>
      </div>
    );
  }

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackQuestion}>
        <p>这页文档对您有帮助吗？</p>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.feedbackButton} ${styles.positive}`}
            onClick={() => handleFeedback('positive')}
          >
            有帮助 👍
          </button>
          <button
            className={`${styles.feedbackButton} ${styles.negative}`}
            onClick={() => handleFeedback('negative')}
          >
            需改进 👎
          </button>
        </div>
      </div>

      {isCommentVisible && (
        <div className={styles.commentSection}>
          <textarea
            className={styles.commentInput}
            placeholder="请告诉我们如何改进这篇文档..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={styles.commentActions}>
            <button
              className={styles.submitButton}
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
            >
              提交
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
