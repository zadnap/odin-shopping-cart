import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import logo from '@/assets/logo.png';

function Logo() {
  return (
    <Link className={styles.logo} to="/">
      <img className={styles.logoImage} src={logo} alt="Homepage" />
      <h1 className={styles.title}>Cinemart</h1>
    </Link>
  );
}

export default Logo;
