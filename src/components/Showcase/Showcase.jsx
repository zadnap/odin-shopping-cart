import styles from './Showcase.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

function Showcase({ movie }) {
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className={styles.showcaseContainer}>
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : movie ? (
        <article
          className={styles.showcase}
          style={{
            backgroundImage: `url(${movie.backdropSrc})`,
          }}
        >
          <ul className={styles.tagList}>
            {movie.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
          <div className={styles.movieInfo}>
            <h1 className={styles.title}>{movie.title}</h1>
            <p className={styles.desc}>
              <span className={styles.clampText}>{movie.desc}</span>{' '}
              <Link className={styles.seeMore} to={`/movie/${movie.id}`}>
                See more
              </Link>
            </p>
          </div>
        </article>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Showcase;
