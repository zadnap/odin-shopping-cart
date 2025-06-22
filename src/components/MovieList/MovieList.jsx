import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.scss';

function MovieList({ movies }) {
  return (
    <section className={styles.movieList}>
      <ul className={styles.listGrid}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <MovieCard {...movie} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MovieList;
