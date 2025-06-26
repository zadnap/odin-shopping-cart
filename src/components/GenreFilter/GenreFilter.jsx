import styles from './GenreFilter.module.scss';
import Button from '@/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function GenreFilter({ genres, currentId, onChangeGenreId }) {
  const currentIndex = genres.findIndex((item) => item.id === currentId);

  const handleViewPrevGenre = () => {
    onChangeGenreId(genres[currentIndex - 1].id);
  };
  const handleViewNextGenre = () => {
    onChangeGenreId(genres[currentIndex + 1].id);
  };

  return (
    <div className={styles.genreFilter}>
      <ul className={styles.tagList}>
        {genres.map((genre) => (
          <li key={genre.id} className={styles.tag}>
            <Button
              onClick={() => onChangeGenreId(genre.id)}
              active={genre.id === currentId}
              aria-pressed={genre.id === currentId}
            >
              {genre.name}
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles.navigator}>
        <Button
          onClick={handleViewPrevGenre}
          disabled={currentIndex === 0}
          aria-label="View Previous Genre"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          onClick={handleViewNextGenre}
          disabled={currentIndex === genres.length - 1}
          aria-label="View Next Genre"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
}

export default GenreFilter;
