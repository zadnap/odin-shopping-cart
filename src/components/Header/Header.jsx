import styles from './Header.module.scss';
import Input from '@/components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className={styles.header} role="banner">
      <Link className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="Homepage" />
        <span className={styles.title}>Cinemart</span>
      </Link>
      <form role="search" className={styles.searchForm} onSubmit={handleSearch}>
        <label htmlFor="header-search" className="sr-only">
          Search Movies
        </label>
        <Input
          placeholder="Movies, series, shows..."
          id="header-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <Link
        className={styles.cartLink}
        to="/cart"
        aria-label="View Shopping Cart"
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </Link>
    </header>
  );
}

export default Header;
