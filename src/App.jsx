import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

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
    </div>
  );
}

export default App;
