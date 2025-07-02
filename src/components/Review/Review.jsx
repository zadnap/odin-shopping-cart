import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Review.module.scss';
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';

function Review({ profileImageSrc, name, releaseDate, rating, detail }) {
  return (
    <section className={styles.review}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reviews</h1>
        <div className={styles.navigator}>
          <Button square aria-label="View Previous Review Article">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button square aria-label="View Next Review Article">
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
      <article className={styles.reviewArticle}>
        <div className={styles.info}>
          <img
            className={styles.profileImage}
            src={profileImageSrc}
            alt={`${name}'s profile image`}
          />
          <div className={styles.authorInfo}>
            <h2 className={styles.name}>A review by {name}</h2>
            <p className={styles.releaseDate}>{releaseDate}</p>
          </div>
          <div className={styles.rating}>
            <FontAwesomeIcon icon={faStar} /> <span>{rating}%</span>
          </div>
        </div>
        <p className={styles.detail}>{detail}</p>
      </article>
    </section>
  );
}

export default Review;
