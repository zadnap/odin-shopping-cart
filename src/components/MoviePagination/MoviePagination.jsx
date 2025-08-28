import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MoviePagination.module.scss';
import Button from '@/components/Button/Button';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function MoviePagination({ page, totalPages, onPrev, onNext, onJump }) {
  const [inputValue, setInputValue] = useState(page);

  useEffect(() => {
    setInputValue(page);
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(inputValue);
    if (num >= 1 && num <= totalPages) {
      onJump(num);
    } else {
      setInputValue(page);
    }
  };

  return (
    <div className={styles.moviePagination}>
      <Button
        square
        aria-label="View previous page"
        onClick={onPrev}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <form onSubmit={handleSubmit} className={styles.pageInputForm}>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.pageInput}
        />
        <span className={styles.pageTotal}> / {totalPages}</span>
      </form>

      <Button
        square
        aria-label="View next page"
        onClick={onNext}
        disabled={page === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}

export default MoviePagination;
