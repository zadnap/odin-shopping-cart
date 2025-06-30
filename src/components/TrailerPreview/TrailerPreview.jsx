import styles from './TrailerPreview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

function TrailerPreview({ title, year, rating, backdropSrc }) {
  return (
    <button
      className={styles.trailerPreview}
      style={{ backgroundImage: `url(${backdropSrc})` }}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.info}>
        <p className={styles.year} aria-label="Year">
          {year}
        </p>
        <p className={styles.rating} aria-label="Rating">
          <FontAwesomeIcon icon={faStar} data-testid="star-icon" /> {rating}
        </p>
      </div>
      <div className={styles.playBtn}>
        <FontAwesomeIcon
          icon={faPlay}
          className={styles.icon}
          data-testid="play-icon"
        />
      </div>
    </button>
  );
}

export default TrailerPreview;
