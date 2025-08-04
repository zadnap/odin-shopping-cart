import styles from './Upcoming.module.scss';
import { useEffect, useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const data = await response.json();
      const movieResult = data.results.map((movie) => ({
        id: movie.id,
        posterSrc: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        title: movie.title,
        year: movie.release_date.slice(0, 4),
        rating: movie.vote_average.toFixed(1),
      }));

      setUpcomingMovies(movieResult);
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <section className={styles.upcoming}>
      <h2 className={styles.title}>Upcoming</h2>
      {upcomingMovies ? (
        <FilteredMovieList movies={upcomingMovies} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Upcoming;
