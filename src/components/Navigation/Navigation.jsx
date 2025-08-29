import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import {
  faCalendar,
  faFilm,
  faFire,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import TrailerPreview from '@/components/TrailerPreview/TrailerPreview';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Navigation({ isOnPc, isOpenNav, setIsOpenNav }) {
  const [trailerPreviews, setTrailerPreviews] = useState([]);

  const topItems = [
    {
      to: '/',
      icon: faHouse,
      title: 'Home',
    },
    {
      to: '/favourites',
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
    {
      to: '/cart',
      icon: faShoppingCart,
      title: 'Cart',
    },
  ];

  useEffect(() => {
    async function getPopularMovieTrailers(numberOfTrailers) {
      const popularRes = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const popularData = await popularRes.json();

      const trailers = [];

      for (let movie of popularData.results.slice(0, numberOfTrailers)) {
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        const videoData = await videoRes.json();

        const trailer = videoData.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );

        if (trailer) {
          trailers.push({
            id: movie.id,
            title: movie.title,
            year: movie.release_date.slice(0, 4),
            rating: movie.vote_average.toFixed(1),
            backdropSrc: `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`,
            trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
            trailerKey: trailer.key,
          });
        }
      }

      setTrailerPreviews(trailers);
    }

    getPopularMovieTrailers(5);
  }, []);

  return (
    isOpenNav && (
      <div
        className={styles.navOverlay}
        onClick={isOnPc ? undefined : () => setIsOpenNav(false)}
      >
        <nav className={styles.navigation}>
          <div className={styles.itemSet}>
            {topItems
              .filter((item) => !(isOnPc && item.to === '/cart'))
              .map((item) => (
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
            <ul
              className={styles.trailerList}
              onClick={(e) => e.stopPropagation()}
            >
              {trailerPreviews.map((preview) => (
                <li className={styles.trailerItem} key={preview.id}>
                  <TrailerPreview
                    trailerKey={preview.trailerKey}
                    title={preview.title}
                    year={preview.year}
                    backdropSrc={preview.backdropSrc}
                    rating={preview.rating}
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    )
  );
}

export default Navigation;
