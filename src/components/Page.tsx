import { PropsWithChildren } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Drawer, Typography } from 'antd';
import { useSettings, setMenuOpen } from '../store/settings';
import { menuItems } from '../routes';
import { MenuIcon } from '../icons';
import styles from './Page.module.scss';

export const PageHeader = () => {
  const title = useSettings(({ appTitle }) => appTitle);
  const onOpenDrawer = () => setMenuOpen(true);

  return (
    <nav className={styles.header}>
      <i className={styles.icon} onClick={onOpenDrawer}>
        <MenuIcon />
      </i>
      <Typography.Title className={styles.title}>
        {title}
      </Typography.Title>
    </nav>
  );
};

export const PageBody = ({ noPadding, children }: PropsWithChildren<{ noPadding?: boolean }>) => {
  return (
    <main className={`${styles.body} ${noPadding ? '' : styles.padding}`}>
      {children}
    </main>
  );
};

export const SideMenu = () => {
  const isOpen = useSettings(({ menuOpen }) => menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={closeMenu}
      placement="left"
      width="70%"
    >
      <nav className={styles.sideMenu}>
        {menuItems.map(({ name, route }) => (
          <MenuItem key={name} path={route} onClick={closeMenu}>
            {name}
          </MenuItem>
        ))}
      </nav>
    </Drawer>
  );
};

const MenuItem = ({ path, onClick, children }: PropsWithChildren<{ path: string, onClick: () => void }>) => {
  const [, setLocation] = useLocation();
  const [isActive] = useRoute(path);

  const navigate = () => {
    setLocation(path);
    onClick();
  };

  return (
    <Typography.Paragraph className={`${styles.menuItem} ${isActive ? styles.active : ''}`} onClick={navigate}>
      {children}
    </Typography.Paragraph>
  );
};