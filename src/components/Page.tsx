import { PropsWithChildren } from 'react';
import { useLocation } from 'wouter';
import { Drawer } from 'antd';
import { useSettings } from '../store';
import { menuItems } from '../routes';
import { MenuIcon } from '../icons/Menu';
import styles from './Page.module.scss';

export const PageHeader = () => {
  const [title, set] = useSettings(({ appTitle, setSettings }) => [appTitle, setSettings]);
  const onOpenDrawer = () => set({ menuOpen: true });

  return (
    <nav className={styles.header}>
      <i className={styles.icon} onClick={onOpenDrawer}>
        <MenuIcon />
      </i>
      <label className={styles.title}>
        {title}
      </label>
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
  const [, setLocation] = useLocation();
  const [isOpen, set] = useSettings(({ menuOpen, setSettings }) => [menuOpen, setSettings]);

  const closeMenu = () => set({ menuOpen: !isOpen });
  const navigate = (route: string) => {
    setLocation(route);
    closeMenu();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={closeMenu}
      placement="left"
      width="70%"
    >
      <nav className={styles.sideMenu}>
        {
          menuItems.map(({ name, route }) => (
            <p key={name} className={styles.menuItem} onClick={() => navigate(route)}>
              {name}
            </p>
          ))
        }
      </nav>
    </Drawer>
  );
};

