import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.body}>
        <Navigation />
        <main className={styles.outletContainer}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  );
}

export default App;
