import { useState, useMemo } from 'react';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { selectUser, useSelector } from 'src/store';
import { MessageKey, useTranslate } from 'src/components';
import cls from './avatar-menu.module.css';

interface MenuItem {
  key?: MessageKey,
  link?: string,
  isDivider?: boolean,
}

const menuItems: MenuItem[] = [
  { key: 'menuProfile', link: '/' },
  { isDivider: true },
  { key: 'menuLogout', link: '/logout' },
];

export const AvatarMenu = () => {
  const t = useTranslate();
  const [visible, setVisible] = useState(false);
  const user = useSelector(selectUser);

  const closeMenu = () => setVisible(false);
  const menuWidget = useMemo(() => (
    <Menu>
      {menuItems.map((menuItem, i) => {
        if (menuItem.isDivider) {
          return <Menu.Divider key={i} />;
        }
        return (
          <Menu.Item onClick={closeMenu} key={menuItem.key}>
            <Link href={menuItem.link!} passHref>
              <a className={cls.link}>{t(menuItem.key!)}</a>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  ), [t]);

  if (!user) {
    return null;
  }

  return (
    <Dropdown
      overlay={menuWidget}
      onVisibleChange={setVisible}
      visible={visible}
    >
      <div className={cls.avabox}>
        <div className={cls.avatar}>
          {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
        </div>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <CaretDownOutlined />
        </a>
      </div>
    </Dropdown>
  );
};
