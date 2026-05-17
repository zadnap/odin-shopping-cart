import styles from './Search.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import useSearchMovie from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query');
  const { movies, totalPages, loading, error } = useSearchMovie(query, page);

  const handlePageChange = (newPageNum) => {
    searchParams.set('page', newPageNum);
    setSearchParams(searchParams);
  };

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
            onPrev={() => handlePageChange(page - 1)}
            onNext={() => handlePageChange(page + 1)}
            onJump={(pageNum) => handlePageChange(pageNum)}
          />
        </>
      )}
    </section>
  );
}

export default Search;
