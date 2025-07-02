import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MovieDetail.module.scss';
import Button from '@/components/Button/Button';
import {
  faPlay,
  faHeart,
  faCartPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

function MovieDetail({
  title,
  posterSrc,
  backdropSrc,
  certification,
  releaseDate,
  duration,
  overview,
  genres,
  rating,
  language,
  directors,
  writers,
  rent,
}) {
  return (
    <article
      className={styles.movieDetail}
      style={{
        backgroundImage: `url(${backdropSrc})`,
      }}
    >
      <img
        className={styles.poster}
        src={posterSrc}
        alt={`${title}'s poster`}
      />
      <div className={styles.info}>
        <div className={styles.generalInfo}>
          <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.rating}>
              <FontAwesomeIcon icon={faStar} /> <span>{rating}</span>
            </div>
          </div>
          <p className={styles.movieMeta}>
            <span className={styles.certification}>{certification}</span>{' '}
            &middot; {releaseDate} &middot; {duration}
          </p>
        </div>
        <ul className={styles.detailList}>
          <li className={styles.item}>
            <h2 className={styles.title}>Overview</h2>
            <p className={styles.description}>{overview}</p>
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Genres</h2>
            <p className={styles.description}>
              {genres &&
                genres.map((genre) => (
                  <span key={genre.id} className={styles.tag}>
                    {genre.name}
                  </span>
                ))}
            </p>
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Directors</h2>
            <p className={styles.description}>
              {directors &&
                directors.map((director) => (
                  <span key={director} className={styles.tag}>
                    {director}
                  </span>
                ))}
            </p>
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Writers</h2>
            <p className={styles.description}>
              {writers &&
                writers.map((writer) => (
                  <span key={writer} className={styles.tag}>
                    {writer}
                  </span>
                ))}
            </p>
          </li>
          <li className={styles.item}>
            <h2 className={styles.title}>Language</h2>
            <p className={styles.description}>{language}</p>
          </li>
        </ul>
        <div className={styles.buttonGroup}>
          <Button>
            <FontAwesomeIcon icon={faCartPlus} /> Rent: {rent}
          </Button>
          <Button>
            <FontAwesomeIcon icon={faHeart} /> Add to Favourites
          </Button>
          <Button>
            <FontAwesomeIcon icon={faPlay} /> Play trailer
          </Button>
        </div>
      </div>
    </article>
  );
}

export default MovieDetail;
