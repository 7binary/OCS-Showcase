import { Container, Msg, UnderDevelopment, useTranslate } from 'src/components';
import Head from 'next/head';
import { Typography } from 'antd';

const NewsPage = () => {
  const t = useTranslate();

  return (
    <>
      <Head>
        <title>{t('menuNews')} | OCS</title>
        <meta name="description" content="News of OCS" />
      </Head>
      <Container>
        <Typography.Title level={1}>{t('menuNews')}</Typography.Title>
        <UnderDevelopment />
      </Container>
    </>
  );
};

export default NewsPage;
