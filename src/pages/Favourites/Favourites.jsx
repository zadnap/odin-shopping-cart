import styles from './Favourites.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Favourites() {
  const [favouriteMovies, setFavouriteMovies] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const favouriteIds = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favouriteIds.length === 0) {
      setFavouriteMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const movies = await Promise.all(
          favouriteIds.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return {
              posterSrc:
                data.poster_path &&
                `https://image.tmdb.org/t/p/w342${data.poster_path}`,
              title: data.title,
              year: data.release_date.slice(0, 4),
              rating: data.vote_average.toFixed(1),
              id: data.id,
            };
          })
        );

        setFavouriteMovies(movies);
      } catch (error) {
        setErrorMessage(error.message);
        setFavouriteMovies([]);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className={styles.favoursites}>
      <h2 className={styles.title}>Favourites</h2>
      {errorMessage && <ErrorMessage message={errorMessage} />}

      {!errorMessage && favouriteMovies === null && <Loader />}

      {!errorMessage &&
        favouriteMovies &&
        (favouriteMovies.length > 0 ? (
          <FilteredMovieList movies={favouriteMovies} />
        ) : (
          <ErrorMessage message="Your favourite list is empty" />
        ))}
    </section>
  );
}

export default Favourites;
