import { PropsWithChildren, useEffect } from 'react';
import { selectToken, useActions, useSelector } from 'src/store';

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const token = useSelector(selectToken);
  const { registerHttpRetry, loadUser } = useActions();

  useEffect(() => {
    registerHttpRetry();

    if (token) {
      (async () => {
        loadUser();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>{children}</>);
};
