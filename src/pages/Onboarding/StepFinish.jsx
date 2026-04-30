import styles from './Onboarding.module.scss';
import logo from '@/assets/logo.png';

const StepFinish = ({ selectedGenres, selectedMovies }) => {
  const genreCount = selectedGenres.length;
  const movieCount = selectedMovies.length;

  const genreText = genreCount === 1 ? 'genre' : 'genres';
  const movieText = movieCount === 1 ? 'movie' : 'movies';

  return (
    <div className={styles.finishBox}>
      <img className={styles.appLogo} src={logo} alt="CineMatch's logo" />
      <p>
        Almost there! We're fine-tuning your recommendations based on your
        interest in {genreCount} {genreText} and {movieCount} {movieText}.
      </p>
    </div>
  );
};

export default StepFinish;
