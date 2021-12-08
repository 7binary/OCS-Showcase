import { AxiosError } from 'axios';

export const axiosErrorToString = (err: AxiosError): string => {
  let message: string;

  if (err.response) {
    // Request made and server responded
    if (Array.isArray(err.response?.data?.message)) {
      message = err.response.data.message[0] || err.toString();
    } else {
      message = err.response.data.message || err.toString();
    }
  } else if (err.request) {
    // The request was made but no response was received
    message = 'Something is wrong with your network.'
      + ' Please check your connection and try again later.';
  } else {
    // Something happened in setting up the request that triggered an Error
    message = err.message || err.toString();
  }

  return message;
};
