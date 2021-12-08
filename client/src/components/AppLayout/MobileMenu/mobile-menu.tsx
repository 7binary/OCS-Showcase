import { useState } from 'react';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
import {
  SnippetsOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  KeyOutlined,
} from '@ant-design/icons';

import { selectUser, useSelector } from 'src/store';
import { MessageKey, Msg } from 'src/components';
import cls from './mobile-menu.module.css';

interface MenuLink {
  key: MessageKey,
  link: string,
  icon: JSX.Element,
}

const mainMenu: MenuLink[] = [
  { key: 'menuAthletes', link: '/', icon: <HomeOutlined className={cls.menuIcon} /> },
  { key: 'menuNews', link: '/news', icon: <SnippetsOutlined className={cls.menuIcon} /> },
];

const userMenu: MenuLink[] = [
  ...mainMenu,
  { key: 'menuLogout', link: '/logout', icon: <LogoutOutlined className={cls.menuIcon} /> },
];

export const MobileMenu = () => {
  const user = useSelector(selectUser);
  const [menuDrawer, setMenuDrawer] = useState(false);
  const showMenuDrawer = () => setMenuDrawer(true);
  const hideMenuDrawer = () => setMenuDrawer(false);
  const menu = user ? userMenu : mainMenu;

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showMenuDrawer}
        icon={<MenuOutlined className={cls.anchorIcon} />}
        className={cls.anchorBtn}
      />

      <Drawer placement="right" onClose={hideMenuDrawer} width={300} visible={menuDrawer}>
        <div className={cls.menu}>
          {menu.map(menuLink => (
            <div key={menuLink.key} className={cls.menuItem}>
              <Link href={menuLink.link} passHref>
                <a className={cls.menuLink} onClick={hideMenuDrawer}>
                  <Button type="text" icon={menuLink.icon} className={cls.menuBtn}>
                    <Msg id={menuLink.key} />
                  </Button>
                </a>
              </Link>
            </div>
          ))}
          {!user && (
            <div className={cls.menuItem}>
              <div className={cls.menuLink} onClick={hideMenuDrawer}>
                <Button
                  type="text"
                  icon={<KeyOutlined className={cls.menuIcon} />}
                  className={cls.menuBtn}
                >
                  <Msg id="btnLogin" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};
