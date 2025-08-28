import styles from './Trending.module.scss';
import { useEffect, useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import MoviePagination from '@/components/MoviePagination/MoviePagination';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Trending() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setTrendingMovies(null);

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      const data = await response.json();
      const movieResult = data.results.map((movie) => ({
        id: movie.id,
        posterSrc:
          movie.poster_path &&
          `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
        title: movie.title,
        year: movie.release_date.slice(0, 4),
        rating: movie.vote_average.toFixed(1),
      }));

      setTrendingMovies(movieResult);
      setTotalPages(data.total_pages);
    };

    fetchTrendingMovies();
  }, [page]);

  const onPrev = () => {
    setPage((prev) => prev - 1);
  };

  const onNext = () => {
    setPage((prev) => prev + 1);
  };

  const onJump = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <section className={styles.trending}>
      <h2 className={styles.title}>Trending</h2>
      {trendingMovies ? (
        <FilteredMovieList movies={trendingMovies} />
      ) : (
        <Loader />
      )}
      <MoviePagination
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        onJump={onJump}
      />
    </section>
  );
}

export default Trending;
