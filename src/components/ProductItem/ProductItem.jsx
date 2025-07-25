import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ProductItem.module.scss';
import Button from '@/components/Button/Button';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ProductItem({
  id,
  title,
  rating,
  year,
  certification,
  backdropSrc,
  rent,
}) {
  return (
    <article className={styles.productItem}>
      <img
        className={styles.backdrop}
        src={backdropSrc}
        alt={`${title}'s backdrop`}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <Link to={`/movie/${id}`} className={styles.title} role="heading">
            {title}
          </Link>
          <div className={styles.movieMeta}>
            <p className={styles.tag}>{certification}</p> |
            <p className={styles.year}>{year}</p> |{' '}
            <p className={styles.rating}>
              <FontAwesomeIcon icon={faStar} /> <span>{rating}</span>
            </p>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Button square>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
        <p className={styles.rent}>${rent}</p>
      </div>
    </article>
  );
}

export default ProductItem;
