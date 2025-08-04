import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Review.module.scss';
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

function Review({ numberOfReview, currentReview, onNext, onPrev }) {
  return (
    <section className={styles.review}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reviews ({numberOfReview})</h1>
        {numberOfReview > 0 && (
          <div className={styles.navigator}>
            <Button
              square
              aria-label="View Previous Review Article"
              onClick={onPrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button
              square
              aria-label="View Next Review Article"
              onClick={onNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        )}
      </div>
      {numberOfReview > 0 ? (
        <article className={styles.reviewArticle}>
          <div className={styles.info}>
            <img
              className={styles.profileImage}
              src={currentReview.profileImage}
              alt={`${currentReview.author}'s profile image`}
            />
            <div className={styles.authorInfo}>
              <h2 className={styles.name}>
                A review by {currentReview.author}
              </h2>
              <p className={styles.releaseDate}>{currentReview.releaseDate}</p>
            </div>
            <div className={styles.rating}>
              <FontAwesomeIcon icon={faStar} />{' '}
              <span>{currentReview.rating}%</span>
            </div>
          </div>
          <p
            className={styles.detail}
            dangerouslySetInnerHTML={{ __html: currentReview.detail }}
          />
        </article>
      ) : (
        <ErrorMessage message="This movie has not received any reviews yet" />
      )}
    </section>
  );
}

export default Review;
