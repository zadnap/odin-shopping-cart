import MovieCard from '@/components/MovieCard/MovieCard';
import Button from '@/components/Button/Button';
import styles from './MovieList.module.scss';

function MovieList({ movies }) {
  return (
    <section className={styles.movieList}>
      <ul className={styles.tagList}>
        <li className={styles.tag}>
          <Button>Trending</Button>
        </li>
        <li className={styles.tag}>
          <Button>Adventure</Button>
        </li>
        <li className={styles.tag}>
          <Button>Action</Button>
        </li>
        <li className={styles.tag}>
          <Button>Comedy</Button>
        </li>
        <li className={styles.tag}>
          <Button>Crime</Button>
        </li>
        <li className={styles.tag}>
          <Button>Drama</Button>
        </li>
        <li className={styles.tag}>
          <Button>Fantasy</Button>
        </li>
      </ul>
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
