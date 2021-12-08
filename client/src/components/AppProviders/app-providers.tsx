import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import en from 'antd/lib/locale/en_GB';
import fr from 'antd/lib/locale/fr_FR';
import { useRouter } from 'next/router';

import { Language, messages } from './messages';
import { AuthProvider } from './auth-provider';
import { store, persistor } from 'src/store';

const antdLocales = {
  en,
  fr,
}

export const AppProviders = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const locale = router.locale as Language;
  const antdLocale = antdLocales[locale] || en;
  const intlMessages = messages[locale];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={antdLocale}>
          <IntlProvider messages={intlMessages} locale={locale} defaultLocale="en">
            <AuthProvider>
              {children}
            </AuthProvider>
          </IntlProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};
