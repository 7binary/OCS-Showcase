import { IntlProvider } from 'react-intl';
import React from 'react';

import { messages } from './messages';

export const intl = (component: JSX.Element) => {
  return (
    <IntlProvider
      locale="en"
      messages={messages['en']}
    >
      {React.cloneElement(component)}
    </IntlProvider>
  );
};
