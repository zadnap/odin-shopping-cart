import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

function NavItem({ to, icon, children }) {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`${styles.navItem} ${
        location.pathname === to ? styles.active : ''
      }`}
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      {children}
    </Link>
  );
}

export default NavItem;
