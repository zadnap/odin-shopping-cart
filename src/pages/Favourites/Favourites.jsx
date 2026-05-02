import styles from './Favourites.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import { useState } from 'react';
import useFavourites from '../../hooks/useFavourites';
import MoviePagination from '../../components/MoviePagination/MoviePagination';

function Favourites() {
  const [page, setPage] = useState(1);
  const { favourites, totalPages, loading, error } = useFavourites(page);

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
          {totalPages > 1 && (
            <MoviePagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((prev) => prev - 1)}
              onNext={() => setPage((prev) => prev + 1)}
              onJump={(pageNum) => setPage(pageNum)}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Favourites;
