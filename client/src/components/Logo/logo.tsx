import Link from 'next/link';
import Image from 'next/image';

import logoPic from 'public/logo.png';
import cls from './logo.module.css';

interface Props {
  href: string;
  small?: boolean;
}

export const Logo: React.FC<Props> = ({ href, small }) => {
  return (
    <Link href={href} passHref>
      <a className={small ? cls.linkSmall : cls.link}>
        <Image src={logoPic} alt="Logo" />
      </a>
    </Link>
  );
};
