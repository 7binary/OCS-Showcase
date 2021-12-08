import { AppProps } from 'next/app';
import Head from 'next/head';

import { AppProviders, AppLayout, LayoutType } from 'src/components';
import 'src/styles/global.css';

type AppPropsWithLayout = AppProps & {Component: {layout?: string}};

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const layout = Component.layout as LayoutType | undefined;

  return (
    <AppProviders>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="16x16" href="/favicon/apple-touch-icon-16x16.png" />
        <link rel="apple-touch-icon" sizes="32x32" href="/favicon/apple-touch-icon-32x32.png" />
        <link rel="apple-touch-icon" sizes="310x310" href="/favicon/apple-touch-icon-310x310.png" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/favicon/apple.png" />
        <meta name="msapplication-TileImage" content="/favicon/ms.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Olympic Athletes</title>
        <meta name="description" content="Olympic Athletes" />
      </Head>

      <AppLayout layout={layout}>
        <Component {...pageProps} />
      </AppLayout>
    </AppProviders>
  );
};

export default MainApp;
