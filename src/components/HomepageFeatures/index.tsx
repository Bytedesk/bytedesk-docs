/*
 * @Author: jack ning github@bytedesk.com
 * @Date: 2024-05-05 13:49:10
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-08-07 12:11:28
 * @FilePath: /docs-ts/src/components/HomepageFeatures/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Link to="docs/intro">{translate({ id: 'homepage.feature.im.title', message: 'Team Chat', })}</Link>,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {translate({id: 'homepage.feature.im.description', message: 'Team Chat'})}
      </>
    ),
  },
  {
    title: <Link to="docs/intro">{translate({ id: 'homepage.feature.cs.title', message: 'Customer Service', })}</Link>,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.cs.description', message: 'OmniChannel Customer Service' })}
      </>
    ),
  },
  {
    title: <Link to="docs/intro">{translate({ id: 'homepage.feature.ai.title', message: 'AI Asistant', })}</Link>,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.ai.description', message: 'OmniChannel Customer Service' })}
      </>
    ),
  },
  {
    title: <Link to="docs/intro">{translate({ id: 'homepage.feature.kb.title', message: 'Knowledge Base', })}</Link>,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.kb.description', message: 'Knowledge Base' })}
      </>
    ),
  },
  {
    title: <Link to="docs/intro">{translate({ id: 'homepage.feature.helpcenter.title', message: 'Help Center', })}</Link>,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        {
          translate({ id: 'homepage.feature.helpcenter.description', message: 'Help Center', })
        }
      </>
    ),
  },
  {
    title: <Link to="docs/intro">{translate({ id: 'homepage.feature.ticket.title', message: 'Ticket System', })}</Link>,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {
          translate({id: 'homepage.feature.ticket.description', message: 'Ticket System'})
        }
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
