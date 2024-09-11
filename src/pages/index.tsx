import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { ChatFloat } from "bytedesk-react";

import styles from './index.module.css';
// import React from 'react';
// import { FormattedMessage } from 'react-intl';
import Translate, { translate } from '@docusaurus/Translate';

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
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({ id: 'homepage.title', message: 'ByteDesk' })}
      description={translate({ id: 'homepage.description', message: 'ByteDesk Description' })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <ChatFloat
        chatUrl="https://kf.weiyuai.cn/chat?org=df_org_uid&t=1&sid=df_wg_uid&"
      />
    </Layout>
  );
}
