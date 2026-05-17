import styles from './Favourites.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import useFavourites from '../../hooks/useFavourites';
import MoviePagination from '../../components/MoviePagination/MoviePagination';

function Favourites() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { favourites, totalPages, loading, error } = useFavourites(page);

  const handlePageChange = (newPageNum) => {
    searchParams.set('page', newPageNum);
    setSearchParams(searchParams);
  };

  return (
    <section className={styles.favoursites}>
      <h2 className={styles.title}>Favourites</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && favourites.length === 0 && (
        <ErrorMessage message="Your favourite list is empty" />
      )}
      {!loading && !error && (
        <>
          <FilteredMovieList movies={favourites} />
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

export default Favourites;
