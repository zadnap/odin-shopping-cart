import styles from './Favourites.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

function Favourites() {
  const favourtiteMovies = [];

  return (
    <section className={styles.favoursites}>
      <h2 className={styles.title}>Favourites</h2>
      {favourtiteMovies ? (
        favourtiteMovies.length > 0 ? (
          <FilteredMovieList movies={favourtiteMovies} />
        ) : (
          <ErrorMessage message="Your favourite list is empty" />
        )
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Favourites;
