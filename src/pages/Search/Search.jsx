import styles from './Search.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import { useEffect, useState } from 'react';
import useSearchMovie from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading, error } = useSearchMovie(query, page);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <section className={styles.search}>
      <h2 className={styles.title}>Results for: {query}</h2>
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

export default Search;
