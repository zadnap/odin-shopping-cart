import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MovieDetail.module.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {
  faPlay,
  faHeart,
  faCartPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function MovieDetail({ movie }) {
  const {
    title,
    posterSrc,
    backdropSrc,
    certification,
    releaseDate,
    duration,
    overview,
    genres,
    rating,
    languages,
    directors,
    writers,
    trailerKey,
    rent,
  } = movie;
  const [isOpenModal, setIsOpenModal] = useState(false);

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
              {genres.map((genre) => (
                <span key={genre.id} className={styles.tag}>
                  {genre.name}
                </span>
              ))}
            </p>
          </li>
          {directors.length > 0 && (
            <li className={styles.item}>
              <h2 className={styles.title}>Directors</h2>
              <p className={styles.description}>
                {directors.map((director) => (
                  <span key={director} className={styles.tag}>
                    {director}
                  </span>
                ))}
              </p>
            </li>
          )}
          {writers.length > 0 && (
            <li className={styles.item}>
              <h2 className={styles.title}>Story</h2>
              <p className={styles.description}>
                {writers.map((writer) => (
                  <span key={writer} className={styles.tag}>
                    {writer}
                  </span>
                ))}
              </p>
            </li>
          )}
          <li className={styles.item}>
            <h2 className={styles.title}>Language</h2>
            <p className={styles.description}>
              {languages.map((lang) => (
                <span key={lang.id} className={styles.tag}>
                  {lang.name}
                </span>
              ))}
            </p>
          </li>
        </ul>
        <div className={styles.buttonGroup}>
          <Button>
            <FontAwesomeIcon icon={faCartPlus} /> Rent: ${rent}
          </Button>
          <Button>
            <FontAwesomeIcon icon={faHeart} /> Add to Favourites
          </Button>
          <Button onClick={() => setIsOpenModal(true)}>
            <FontAwesomeIcon icon={faPlay} /> Play trailer
          </Button>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          title={`${title}'s trailer`}
          onClose={() => setIsOpenModal(false)}
        >
          <VideoPlayer videoKey={trailerKey} movieTitle={title} />
        </Modal>
      )}
    </article>
  );
}

export default MovieDetail;
