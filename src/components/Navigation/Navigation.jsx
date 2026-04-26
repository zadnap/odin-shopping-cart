import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import {
  faCalendar,
  faFilm,
  faFire,
  faHeart,
  faRightToBracket,
  faSignOut,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import NavItem from '../NavItem/NavItem';
import styles from './Navigation.module.scss';
import TrailerPreview from '@/components/TrailerPreview/TrailerPreview';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from '../Popup/Popup';
import usePopup from '../../hooks/usePopup';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Navigation({ isOnPc, isOpenNav, setIsOpenNav }) {
  const { user, signOut } = useAuth();
  const [trailerPreviews, setTrailerPreviews] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { showPopup, hidePopup } = usePopup();

  const handleSignOut = () => {
    showPopup({
      title: 'Sign Out',
      content: 'Are you sure to sign out of CineMatch?',
      onConfirm: () => {
        signOut();
        hidePopup();
      },
      onCancel: hidePopup,
    });
  };

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
  ];
  const filteredItems = topItems.filter((item) => {
    if (item.to === '/favourites' && !user) return false;
    return true;
  });

  useEffect(() => {
    const getPopularMovieTrailers = async (numberOfTrailers) => {
      try {
        const popularRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        if (!popularRes.ok) {
          throw new Error(
            `Failed to fetch popular movies: ${popularRes.status} ${popularRes.statusText}`
          );
        }

        const popularData = await popularRes.json();

        if (!popularData.results || !Array.isArray(popularData.results)) {
          throw new Error('Popular movies response format invalid');
        }

        const trailers = [];

        for (let movie of popularData.results.slice(0, numberOfTrailers)) {
          try {
            const videoRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
            );

            if (!videoRes.ok) {
              throw new Error(
                `Failed to fetch videos for movie ID ${movie.id}`
              );
            }

            const videoData = await videoRes.json();

            if (!videoData.results) continue;

            const trailer = videoData.results.find(
              (v) => v.type === 'Trailer' && v.site === 'YouTube'
            );

            if (trailer) {
              trailers.push({
                id: movie.id,
                title: movie.title ?? 'Untitled',
                year: movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : 'N/A',
                rating: movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : 'N/A',
                backdropSrc: movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`
                  : null,
                trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
                trailerKey: trailer.key,
              });
            }
          } catch (movieError) {
            console.warn(
              `Skipping movie ID ${movie.id} due to error:`,
              movieError
            );
          }
        }

        setTrailerPreviews(trailers);
      } catch (error) {
        setErrorMessage(
          error.message || 'Something went wrong while fetching trailers'
        );
      }
    };

    getPopularMovieTrailers(5);
  }, []);

  return (
    isOpenNav && (
      <div
        className={styles.navOverlay}
        onClick={isOnPc ? undefined : () => setIsOpenNav(false)}
      >
        <nav className={styles.navigation}>
          {!isOnPc && (
            <div className={styles.itemSet}>
              {user ? (
                <li className={styles.userAction}>
                  <div className={styles.username}>@{user.username}</div>
                  <Button
                    outline
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSignOut();
                    }}
                    className={styles.signOutBtn}
                    aria-label="Sign out"
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                  </Button>
                </li>
              ) : (
                <>
                  <li>
                    <NavItem icon={faRightToBracket} to="/auth/sign-in">
                      Sign In
                    </NavItem>
                  </li>
                  <li>
                    <NavItem icon={faUserPlus} to="auth/sign-up">
                      Sign Up
                    </NavItem>
                  </li>
                </>
              )}
            </div>
          )}
          <div className={styles.itemSet}>
            {filteredItems.map((item) => (
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
              {errorMessage ? (
                <ErrorMessage message={errorMessage} />
              ) : trailerPreviews ? (
                trailerPreviews.map((preview) => (
                  <li className={styles.trailerItem} key={preview.id}>
                    <TrailerPreview
                      trailerKey={preview.trailerKey}
                      title={preview.title}
                      year={preview.year}
                      backdropSrc={preview.backdropSrc}
                      rating={preview.rating}
                    />
                  </li>
                ))
              ) : (
                <Loader />
              )}
            </ul>
          </div>
        </nav>
      </div>
    )
  );
}

export default Navigation;
