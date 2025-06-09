/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-06 21:22:08
 * @LastEditors: jack ning github@bytedesk.com
 * @LastEditTime: 2025-05-05 14:36:05
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import clsx from 'clsx';
import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
// import { ChatFloat } from "bytedesk-react";

import styles from './index.module.css';
// import React from 'react';
// import { FormattedMessage } from 'react-intl';
import Translate, { translate } from '@docusaurus/Translate';
// import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';

function HomepageHeader() {
  // const { siteConfig } = useDocusaurusContext();
  // const {title, tagline} = siteConfig;
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {/* {siteConfig.title} */}
          <Translate id="homepage.title" />
        </Heading>
        <p className="hero__subtitle">
          {/* {siteConfig.tagline} */}
          <Translate id="homepage.tagline" />
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="docs/intro">
            <Translate id="homepage.quickstart"/> - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({ id: 'homepage.title', message: 'ByteDesk' })}
      description={translate({ id: 'homepage.description', message: 'ByteDesk Description' })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      {/* <ChatFloat
        chatUrl="https://kf.weiyuai.cn/chat?org=df_org_uid&t=1&sid=df_wg_uid&"
      /> */}
    </Layout>
  );
}
