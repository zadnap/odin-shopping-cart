import styles from './Onboarding.module.scss';
import useGenres from '@/hooks/useGenres';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';

const StepGenres = ({ selectedGenres, onToggle }) => {
  const { genres, loading: genreLoading, error: genreError } = useGenres();

  return (
    <div className={styles.genreGrid}>
      {genreLoading && <Loader className={styles.gridFallback} />}
      {genreError && (
        <ErrorMessage message={genreError} className={styles.gridFallback} />
      )}
      {!genreLoading &&
        !genreError &&
        genres.map((genre) => (
          <button
            key={genre.id}
            className={`${styles.genreCard} ${selectedGenres.includes(genre.id) ? styles.active : ''}`}
            onClick={() => onToggle(genre.id)}
          >
            {genre.name}
          </button>
        ))}
    </div>
  );
};

export default StepGenres;
