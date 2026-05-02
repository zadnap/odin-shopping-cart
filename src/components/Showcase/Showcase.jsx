import styles from './Showcase.module.scss';
import { Link } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import useFeaturedMovie from '../../hooks/useFeatureMovie';

function Showcase() {
  const { movie, loading, error } = useFeaturedMovie();

  return (
    <div className={styles.showcaseContainer}>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
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
      )}
    </div>
  );
}

export default Showcase;
