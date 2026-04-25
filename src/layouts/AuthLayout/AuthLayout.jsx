import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

const AuthLayout = () => {
  return (
    <section className={styles.authLayout}>
      <div className={styles.authOverlay}>
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
