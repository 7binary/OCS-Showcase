import { PropsWithChildren } from 'react';
import cx from 'classnames';

import cls from './container.module.css';

export type ContainerSize = 'lg' | 'md' | 'sm';

interface Props {
  size?: ContainerSize;
}

export const Container = ({ children, size = 'md' }: PropsWithChildren<Props>) => {
  return (
    <div className={cx(cls.box, cls[size])}>
      {children}
    </div>
  );
};
