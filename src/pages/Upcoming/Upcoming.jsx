import styles from './Upcoming.module.scss';
import { useSearchParams } from 'react-router-dom';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useUpcomingMovies from '../../hooks/useUpcomingMovies';

function Upcoming() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { movies, totalPages, loading, error } = useUpcomingMovies(page);

  const handlePageChange = (newPageNum) => {
    searchParams.set('page', newPageNum);
    setSearchParams(searchParams);
  };

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
            onPrev={() => handlePageChange(page - 1)}
            onNext={() => handlePageChange(page + 1)}
            onJump={(pageNum) => handlePageChange(pageNum)}
          />
        </>
      )}
    </section>
  );
}

export default Upcoming;
