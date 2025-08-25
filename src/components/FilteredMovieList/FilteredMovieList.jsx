import styles from './FilteredMovieList.module.scss';
import MovieCard from '@/components/MovieCard/MovieCard';

function FilteredMovieList({ movies, lastMovieRef }) {
  return (
    <ul className={styles.filteredMovieList}>
      {movies.map((movie, index) => (
        <li
          key={movie.id}
          className={styles.movieItem}
          ref={index === movies.length - 1 ? lastMovieRef : null}
        >
          <MovieCard {...movie} />
        </li>
      ))}
    </ul>
  );
}

export default FilteredMovieList;
