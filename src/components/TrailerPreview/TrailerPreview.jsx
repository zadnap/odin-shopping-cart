import styles from './TrailerPreview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

function TrailerPreview({ trailerKey, title, year, rating, backdropSrc }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button
        className={styles.trailerPreview}
        style={{ backgroundImage: `url(${backdropSrc})` }}
        onClick={() => setIsOpenModal(true)}
        aria-labelledby="trailer-preview"
      >
        <h3 className={styles.title} id="trailer-preview">
          {title}
        </h3>
        <div className={styles.info}>
          <p className={styles.year}>
            <span className="sr-only">Year: </span>
            {year}
          </p>
          <p className={styles.rating}>
            <span className="sr-only">Rating: </span>
            <FontAwesomeIcon
              icon={faStar}
              aria-hidden="true"
              data-testid="star-icon"
            />{' '}
            {rating}
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
      {isOpenModal && (
        <Modal
          title={`${title}'s trailer`}
          onClose={() => setIsOpenModal(false)}
        >
          <VideoPlayer videoKey={trailerKey} movieTitle={title} />
        </Modal>
      )}
    </>
  );
}

export default TrailerPreview;
