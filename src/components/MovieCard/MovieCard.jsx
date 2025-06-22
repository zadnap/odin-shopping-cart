import styles from './MovieCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function MovieCard({ posterSrc, title, year, rating, id }) {
  return (
    <Link to={`/movies/${id}`} className={styles.movieCard}>
      <img
        className={styles.poster}
        src={posterSrc}
        alt={`${title}'s poster`}
      />
      <div className={styles.movieInfo}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.movieMeta}>
          <p className={styles.year}>{year} &middot;</p>
          <p className={styles.rating}>
            <FontAwesomeIcon icon={faStar} /> {rating}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
