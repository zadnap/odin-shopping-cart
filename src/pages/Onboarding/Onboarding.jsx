import { useState } from 'react';
import styles from './Onboarding.module.scss';
import Button from '../../components/Button/Button';
import logo from '@/assets/logo.png';

const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
];

const SEED_MOVIES = [
  {
    id: 1,
    title: 'Inception',
    poster:
      'https://th.bing.com/th/id/OIP.SDLkOsgAz_CfDHY-4YhjaQHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    genre_ids: [878, 28],
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster:
      'https://th.bing.com/th/id/OIP.LDEPxqWgLlrq9DlAVrfXkwHaLH?w=199&h=298&c=7&r=0&o=5&dpr=2&pid=1.7',
    genre_ids: [28, 80],
  },
  {
    id: 3,
    title: 'Toy Story',
    poster:
      'https://th.bing.com/th/id/OIP.vxE-VXts45pdgIhGkAlZswHaEK?w=300&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
    genre_ids: [16, 35],
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleMovie = (id) => {
    setSelectedMovies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    const userData = {
      genres: selectedGenres,
      movies: selectedMovies,
    };
    console.log('Sending data to Flask server:', userData);
  };

  return (
    <main className={styles.onboarding}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.currentStep}>Step {step} of 3</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <h1>
            {step === 1
              ? 'Which genres do you like?'
              : step === 2
                ? 'Pick movies you have seen'
                : 'Excellent!'}
          </h1>
          {step < 3 && (
            <p className={styles.instruction}>
              Please select at least 3 to continue
            </p>
          )}
        </header>

        <section className={styles.content}>
          {step === 1 && (
            <div className={styles.genreGrid}>
              {GENRES.map((genre) => (
                <button
                  key={genre.id}
                  className={`${styles.genreCard} ${selectedGenres.includes(genre.id) ? styles.active : ''}`}
                  onClick={() => toggleGenre(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className={styles.movieGrid}>
              {SEED_MOVIES.map((movie) => (
                <div
                  key={movie.id}
                  className={`${styles.movieCard} ${selectedMovies.includes(movie.id) ? styles.selected : ''}`}
                  onClick={() => toggleMovie(movie.id)}
                >
                  <img src={movie.poster} alt={movie.title} />
                  <span>{movie.title}</span>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className={styles.finishBox}>
              <img
                className={styles.appLogo}
                src={logo}
                alt="CineMatch's logo"
              />
              <p>
                Almost there! We're fine-tuning your recommendations based on
                your interest in {selectedGenres.length} genres and{' '}
                {selectedMovies.length} movies.
              </p>
            </div>
          )}
        </section>

        <footer className={styles.actions}>
          {step > 1 && (
            <Button
              className={styles.backBtn}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}

          {step < 3 ? (
            <Button
              disabled={
                step === 1
                  ? selectedGenres.length < 3
                  : selectedMovies.length < 3
              }
              onClick={() => setStep(step + 1)}
              accent
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleFinish} accent>
              Start Exploring
            </Button>
          )}
        </footer>
      </div>
    </main>
  );
};

export default Onboarding;
