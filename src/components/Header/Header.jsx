import styles from './Header.module.scss';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faMagnifyingGlass,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Popup from '../Popup/Popup';

function Header({ isOpenNav, setIsOpenNav }) {
  const { user, signOut } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [isShowPopup, setIsShowPopup] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleConfirmSignOut = () => {
    signOut();
    setIsShowPopup(false);
  };

  return (
    <header className={styles.header} role="banner">
      <Link className={styles.logo} to="/">
        <img className={styles.logoImage} src={logo} alt="Homepage" />
        <span className={styles.title}>CineMatch</span>
      </Link>
      <form role="search" className={styles.searchForm} onSubmit={handleSearch}>
        <label htmlFor="header-search" className="sr-only">
          Search for Movies
        </label>
        <Input
          icon={faMagnifyingGlass}
          placeholder="Search..."
          id="header-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div className={styles.buttonGroup}>
        <Button
          className={styles.menu}
          aria-label="Open Navigation Menu"
          aria-expanded={isOpenNav}
          aria-controls="primary-navigation"
          onClick={() => setIsOpenNav((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        {!user ? (
          <>
            <Link
              to="/auth/sign-up"
              className={`${styles.authBtn} ${styles.signUpBtn}`}
            >
              Sign Up
            </Link>
            <Link
              to="/auth/sign-in"
              className={`${styles.authBtn} ${styles.signInBtn}`}
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            <span className={styles.username}>@{user.username}</span>
            <Button
              onClick={() => setIsShowPopup(true)}
              outline
              className={`${styles.authBtn} ${styles.signOutBtn}`}
              aria-label="Sign out"
            >
              <FontAwesomeIcon icon={faSignOut} />
            </Button>
          </>
        )}
      </div>

      <Popup
        isOpen={isShowPopup}
        title="Sign Out"
        content="Are you sure to sign out of CineMatch?"
        onConfirm={handleConfirmSignOut}
        onCancel={() => setIsShowPopup(false)}
      />
    </header>
  );
}

export default Header;
