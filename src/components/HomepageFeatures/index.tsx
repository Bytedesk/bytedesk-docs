/*
 * @Author: jack ning github@bytedesk.com
 * @Date: 2024-05-05 13:49:10
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-08-06 18:21:00
 * @FilePath: /docs-ts/src/components/HomepageFeatures/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.im.title',
      message: '企业IM',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {
          translate({
            id: 'homepage.feature.im.description'
            , message: '支持即时通讯、聊天、群聊、文件传输、视频通话、语音通话等'
          })
        }
      </>
    ),
  },
  {
    title: '在线客服',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        支持人工客服、知识库、客服机器人等.
      </>
    ),
  },
  {
    title: 'AI助手',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        支持国内、国外主流大模型，如ChatGPT、Bing、OpenAI、智谱、文心一言、通义千问等.
      </>
    ),
  },
  {
    title: '知识库',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        知识库AI问答.
      </>
    ),
  },
  {
    title: '帮助中心',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        帮助中心.
      </>
    ),
  },
  {
    title: translate({
      id: 'homepage.feature.ticket.title',
      message: '工单系统',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {
          translate({
            id: 'homepage.feature.ticket.description'
            , message: '工单系统等'
          })
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
