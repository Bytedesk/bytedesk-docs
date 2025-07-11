import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import type {Props} from '@theme/Layout';
import ReadingProgress from '../../components/ReadingProgress';
import BackToTop from '../../components/BackToTop';
import {useLocation} from '@docusaurus/router';

// 判断是否为文档页面
function isDocPage(pathname: string): boolean {
  return pathname.includes('/docs/');
}

export default function Layout(props: Props): JSX.Element {
  const location = useLocation();
  const showProgress = isDocPage(location.pathname);

  return (
    <>
      {/* 仅在文档页面显示进度条 */}
      {showProgress && <ReadingProgress />}
      {/* 返回顶部按钮 - 在所有页面显示 */}
      <BackToTop />
      <OriginalLayout {...props} />
    </>
  );
}
