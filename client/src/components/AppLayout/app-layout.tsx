import { FC, PropsWithChildren } from 'react';

import { selectUser, useSelector } from 'src/store';
import { Header } from './Header';
import cls from './app-layout.module.css';
import { Footer } from './Footer';

export enum LayoutType {
  AUTO = 'auto',
  LANDING = 'landing',
  LOGGED = 'logged',
}

interface Props {
  layout?: LayoutType;
}

export const AppLayout: FC<PropsWithChildren<Props>> = ({ children, layout }) => {
  const user = useSelector(selectUser);

  if (!layout || layout === LayoutType.AUTO) {
    layout = user ? LayoutType.LOGGED : LayoutType.LANDING;
  }

  const isLogged = layout === LayoutType.LOGGED;

  return (
    <div>
      <Header isLogged={isLogged} />
      <div className={cls.wrapper}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
