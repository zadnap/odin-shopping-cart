import styles from './Trending.module.scss';
import { useEffect, useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Trending() {
  const [trendingMovies, setTrendingMovies] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const data = await response.json();
      const movieResult = data.results.map((movie) => ({
        id: movie.id,
        posterSrc: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        title: movie.title,
        year: movie.release_date.slice(0, 4),
        rating: movie.vote_average.toFixed(1),
      }));

      setTrendingMovies(movieResult);
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className={styles.trending}>
      <h2 className={styles.title}>Trending</h2>
      {trendingMovies ? (
        <FilteredMovieList movies={trendingMovies} />
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Trending;
