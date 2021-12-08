import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MessageKey } from 'src/components/AppProviders';

interface Props {
  id: MessageKey;
}

export const Msg: React.FC<Props> = ({ id }) => {
  return (
    <FormattedMessage id={id} values={{ br: <br /> }} />
  );
};
