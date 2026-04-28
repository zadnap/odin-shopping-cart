import styles from './Trending.module.scss';
import { useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import useTrendingMovies from '../../hooks/useTrendingMovies';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Trending() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading, error } = useTrendingMovies(page);

  return (
    <section className={styles.trending}>
      <h2 className={styles.title}>Trending</h2>
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

export default Trending;
