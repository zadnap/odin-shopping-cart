import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faCalendar, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';

function Navigation() {
  const navList = [
    {
      to: '/',
      icon: faHouse,
      title: 'Home',
    },
    {
      to: '/favourtites',
      icon: faHeart,
      title: 'Favourites',
    },
    {
      to: '/upcoming',
      icon: faCalendar,
      title: 'Coming Soon',
    },
    {
      to: '/trending',
      icon: faFire,
      title: 'Trending',
    },
  ];

  return (
    <nav className={styles.navigation}>
      {navList.map((item) => (
        <li key={item.to}>
          <NavItem icon={item.icon} to={item.to}>
            {item.title}
          </NavItem>
        </li>
      ))}
    </nav>
  );
}

export default Navigation;
