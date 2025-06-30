import styles from './App.module.scss';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

function App() {
  return (
    <div className={styles.app}>
      <MemoryRouter>
        <Header />
        <div className={styles.body}>
          <Navigation />
          <div className={styles.outlet}></div>
        </div>
      </MemoryRouter>
    </div>
  );
}

export default App;
