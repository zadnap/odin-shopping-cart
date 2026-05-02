import { useState } from 'react';
import styles from './MainLayout.module.scss';
import { ScrollRestoration } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

const MainLayout = () => {
  const isOnTablet = window.innerWidth >= 768;
  const [isOpenNav, setIsOpenNav] = useState(isOnTablet);

  return (
    <section className={styles.mainLayout}>
      <Header isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      <div className={styles.body}>
        <Navigation
          isOnTablet={isOnTablet}
          isOpenNav={isOpenNav}
          setIsOpenNav={setIsOpenNav}
        />
        <main className={styles.outletContainer}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </section>
  );
};

export default MainLayout;
