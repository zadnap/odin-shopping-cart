import styles from './FilteredMovieList.module.scss';
import MovieCard from '@/components/MovieCard/MovieCard';

function FilteredMovieList({ movies }) {
  return (
    <ul className={styles.filteredMovieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <MovieCard {...movie} />
        </li>
      ))}
    </ul>
  );
}

export default FilteredMovieList;
