import styles from './Header.module.scss';
import Logo from '@/components/Logo/Logo';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Input placeholder="Movies, series, shows..." />
      <Button aria-label="View Shopping Cart">
        <FontAwesomeIcon icon={faCartShopping} />
      </Button>
    </header>
  );
}

export default Header;
