import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import {
  faCalendar,
  faFilm,
  faFire,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import TrailerPreview from '../TrailerPreview/TrailerPreview';

function Navigation() {
  const topItems = [
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
      <div className={styles.itemSet}>
        {topItems.map((item) => (
          <li key={item.to}>
            <NavItem icon={item.icon} to={item.to}>
              {item.title}
            </NavItem>
          </li>
        ))}
      </div>
      <div className={styles.itemSet}>
        <NavItem icon={faFilm} to="/trailers">
          Watching Trailers
        </NavItem>
        <TrailerPreview
          title="League of Legends: Arcane"
          duration="3:30"
          backdropSrc="https://image.tmdb.org/t/p/original/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg"
          rating={8.6}
        />
        <TrailerPreview
          title="Cyberpunk: Edgerunner"
          duration="4:19"
          backdropSrc="https://image.tmdb.org/t/p/original/gLlemMoIN4vbKvZvOWInWGxeQNL.jpg"
          rating={9.1}
        />
        <TrailerPreview
          title="Avatar: The Way of Water"
          duration="3:20"
          backdropSrc="https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg"
          rating={7.9}
        />
      </div>
    </nav>
  );
}

export default Navigation;
