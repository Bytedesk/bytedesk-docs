import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import WatermarkInjector from '@site/src/components/WatermarkInjector';
import '@site/src/css/watermark.css';

export default function Root({ children }) {
  return (
    <>
      {children}
      <WatermarkInjector />
    </>
  );
}
