import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { ScrollRestoration } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isOpenNav, setIsOpenNav] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    setIsOpenNav(mediaQuery.matches);

    const handleResize = (e) => {
      setIsOpenNav(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <div className={styles.app}>
      <Header isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      <div className={styles.body}>
        <Navigation isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
        <main className={styles.outletContainer}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  );
}

export default App;
