/* eslint-disable @typescript-eslint/no-var-requires */
// 
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Link to="docs/modules/team">{translate({ id: 'homepage.feature.im.title', message: 'Team Chat', })}</Link>,
    Svg: require('@site/static/img/features/team-chat.svg').default,
    description: (
      <>
        {translate({id: 'homepage.feature.im.description', message: 'Team Chat'})}
      </>
    ),
  },
  {
    title: <Link to="docs/modules/service">{translate({ id: 'homepage.feature.cs.title', message: 'Customer Service', })}</Link>,
    Svg: require('@site/static/img/features/customer-service.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.cs.description', message: 'OmniChannel Customer Service' })}
      </>
    ),
  },
  {
    title: <Link to="docs/modules/ai">{translate({ id: 'homepage.feature.ai.title', message: 'AI Assistant', })}</Link>,
    Svg: require('@site/static/img/features/ai-assistant.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.ai.description', message: 'AI Assistant' })}
      </>
    ),
  },
  {
    title: <Link to="docs/modules/kbase">{translate({ id: 'homepage.feature.helpcenter.title', message: 'Help Center', })}</Link>,
    Svg: require('@site/static/img/features/help-center.svg').default,
    description: (
      <>
        {
          translate({ id: 'homepage.feature.helpcenter.description', message: 'Help Center', })
        }
      </>
    ),
  },
  {
    title: <Link to="docs/modules/voc">{translate({ id: 'homepage.feature.voc.title', message: 'Voice Of Customer', })}</Link>,
    Svg: require('@site/static/img/features/voice-of-customer.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.voc.description', message: 'Voice Of Customer' })}
      </>
    ),
  },
  {
    title: <Link to="docs/modules/ticket">{translate({ id: 'homepage.feature.ticket.title', message: 'Ticket System', })}</Link>,
    Svg: require('@site/static/img/features/ticket-system.svg').default,
    description: (
      <>
        {
          translate({id: 'homepage.feature.ticket.description', message: 'Ticket System'})
        }
      </>
    ),
  },
  {
    title: <Link to="docs/modules/workflow">{translate({ id: 'homepage.feature.workflow.title', message: 'Workflow', })}</Link>,
    Svg: require('@site/static/img/features/workflow.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.workflow.description', message: 'Workflow' })}
      </>
    ),
  },
  {
    title: <Link to="docs/plugins/freeswitch">{translate({ id: 'homepage.feature.callcenter.title', message: 'Call Center', })}</Link>,
    Svg: require('@site/static/img/features/call-center.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.callcenter.description', message: 'Call Center' })}
      </>
    ),
  },
  {
    title: <Link to="docs/plugins/webrtc">{translate({ id: 'homepage.feature.videocs.title', message: 'Video Customer Service', })}</Link>,
    Svg: require('@site/static/img/features/video-customer-service.svg').default,
    description: (
      <>
        {translate({ id: 'homepage.feature.videocs.description', message: 'Video Customer Service' })}
      </>
    ),
  },
  // {
  //   title: <Link to="docs/plugins/jitsi">{translate({ id: 'homepage.feature.conference.title', message: 'Video Conference', })}</Link>,
  //   Svg: require('@site/static/img/features/video-conference.svg').default,
  //   description: (
  //     <>
  //       {translate({ id: 'homepage.feature.conference.description', message: 'Video Conference' })}
  //     </>
  //   ),
  // },
  // {
  //   title: <Link to="docs/modules/forum">{translate({ id: 'homepage.feature.project.title', message: 'Project Management', })}</Link>,
  //   Svg: require('@site/static/img/features/project-management.svg').default,
  //   description: (
  //     <>
  //       {translate({ id: 'homepage.feature.project.description', message: 'Project Management' })}
  //     </>
  //   ),
  // },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
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
