import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ProductItem.module.scss';
import Button from '@/components/Button/Button';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import fallbackPoster from '@/assets/fallback-poster.jpg';

function ProductItem({
  id,
  title,
  rating,
  year,
  certification,
  backdropSrc,
  rent,
  rents,
  setRents,
}) {
  const handleCancelRenting = () => {
    const updatedRents = rents.filter((rentItem) => rentItem.id !== id);
    setRents(updatedRents);

    const storedIds = JSON.parse(localStorage.getItem('rents')) || [];
    const updatedIds = storedIds.filter((storedId) => storedId !== id);
    localStorage.setItem('rents', JSON.stringify(updatedIds));
  };

  return (
    <article className={styles.productItem}>
      <img
        className={styles.backdrop}
        src={backdropSrc || fallbackPoster}
        alt={`${title}'s backdrop`}
      />
      <div className={styles.info}>
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
      <div className={styles.actions}>
        <Button
          square
          onClick={handleCancelRenting}
          className={styles.removeButton}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <p className={styles.rent}>${rent}</p>
      </div>
    </article>
  );
}

export default ProductItem;
