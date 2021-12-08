import { FC } from 'react';
import { Layout, Menu, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container, Logo, MessageKey, Msg } from 'src/components';
import { AvatarMenu } from '../AvatarMenu';
import { MobileMenu } from '../MobileMenu';
import { LanguageSelect } from '../LanguageSelect';
import cls from './header.module.css';

interface MenuLink {
  key: MessageKey,
  link: string,
}

const menuLinks: MenuLink[] = [
  { key: 'menuAthletes', link: '/' },
  { key: 'menuNews', link: '/news' },
];

export const Header: FC<{isLogged?: boolean}> = ({ isLogged }) => {
  const router = useRouter();

  const selectedMenuKeys = menuLinks
    .filter(menu => menu.link === '/'
      ? router.pathname === '/'
      : router.pathname.includes(menu.link),
    )
    .map(menu => menu.link);

  console.log({ selectedMenuKeys });

  return (
    <Container>
      <Layout.Header className={cls.header}>
        <div className={cls.headerLeft}>
          <Logo href="/" />
          <LanguageSelect />
        </div>
        <Menu mode="horizontal" className={cls.menu} selectedKeys={selectedMenuKeys}>
          {menuLinks.map(menuLink => (
            <Menu.Item key={menuLink.link} className={cls.menuItem}>
              <Link href={menuLink.link} passHref>
                <a className={cls.menuLink}>
                  <Msg id={menuLink.key} />
                </a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className={cls.headerRight}>
          {isLogged && (
            <div className={cls.avatarMenu}>
              <AvatarMenu />
            </div>
          )}
          {!isLogged && (
            <Button className={cls.btnLogin}>
              <Msg id="btnLogin" />
            </Button>
          )}
          <div className={cls.mobileMenu}>
            <MobileMenu />
          </div>
        </div>
      </Layout.Header>
    </Container>
  );
};
