import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { ScrollRestoration } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const isOnPc = window.innerWidth >= 1024;
  const [isOpenNav, setIsOpenNav] = useState(isOnPc);

  return (
    <div className={styles.app}>
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
    </div>
  );
}

export default App;
