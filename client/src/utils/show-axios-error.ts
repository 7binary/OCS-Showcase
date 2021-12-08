import { message } from 'antd';
import { AxiosError } from 'axios';

import { axiosErrorToString } from './axios-error-to-string';

export const showAxiosError = (err: AxiosError) => {
  message.error(axiosErrorToString(err), 8);
};
