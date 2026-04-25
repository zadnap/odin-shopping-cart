import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

const AuthLayout = () => {
  return (
    <section className={styles.authLayout}>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
