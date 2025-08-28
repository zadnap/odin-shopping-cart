import styles from './Upcoming.module.scss';
import { useEffect, useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import MoviePagination from '@/components/MoviePagination/MoviePagination';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      setUpcomingMovies(null);

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      const data = await response.json();
      const movieResult = data.results.map((movie) => ({
        id: movie.id,
        posterSrc: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
        title: movie.title,
        year: movie.release_date.slice(0, 4),
        rating: movie.vote_average.toFixed(1),
      }));

      setTotalPages(data.total_pages);
      setUpcomingMovies(movieResult);
    };

    fetchUpcomingMovies();
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
    <section className={styles.upcoming}>
      <h2 className={styles.title}>Upcoming</h2>
      {upcomingMovies ? (
        <FilteredMovieList movies={upcomingMovies} />
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

export default Upcoming;
