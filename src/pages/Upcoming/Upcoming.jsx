import styles from './Upcoming.module.scss';
import { useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useUpcomingMovies from '../../hooks/useUpcomingMovies';

function Upcoming() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading, error } = useUpcomingMovies(page);

  return (
    <section className={styles.upcoming}>
      <h2 className={styles.title}>Upcoming</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <FilteredMovieList movies={movies} />
          <MoviePagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
            onJump={(pageNum) => setPage(pageNum)}
          />
        </>
      )}
    </section>
  );
}

export default Upcoming;
