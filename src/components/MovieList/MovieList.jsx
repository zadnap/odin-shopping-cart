import MovieCard from '@/components/MovieCard/MovieCard';
import Button from '@/components/Button/Button';
import styles from './MovieList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function MovieList({ movies }) {
  return (
    <section className={styles.movieList}>
      <div className={styles.genreFilter}>
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
          <li className={styles.tag}>
            <Button>Fantasy</Button>
          </li>
          <li className={styles.tag}>
            <Button>Fantasy</Button>
          </li>
          <li className={styles.tag}>
            <Button>Fantasy</Button>
          </li>
          <li className={styles.tag}>
            <Button>Fantasy</Button>
          </li>
          <li className={styles.tag}>
            <Button>Fantasy</Button>
          </li>
          <li className={styles.tag}>
            <Button>Fantasy</Button>
          </li>
        </ul>
        <div className={styles.navigator}>
          <Button>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
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
