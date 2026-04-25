import { useState } from 'react';
import styles from './MainLayout.module.scss';
import { ScrollRestoration } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

const MainLayout = () => {
  const isOnPc = window.innerWidth >= 1024;
  const [isOpenNav, setIsOpenNav] = useState(isOnPc);

  return (
    <section className={styles.mainLayout}>
      <Header isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      <div className={styles.body}>
        <Navigation
          isOnPc={isOnPc}
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
