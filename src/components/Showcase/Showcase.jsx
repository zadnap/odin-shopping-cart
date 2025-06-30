import styles from './Showcase.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Showcase() {
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, genresRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
          ),
        ]);

        if (!movieRes.ok || !genresRes.ok)
          throw new Error(
            (movieRes.status === 404
              ? 'Could not find popular movies. '
              : 'Something went wrong while fetching movie data. ') +
              'Please try again later.'
          );

        const movieData = await movieRes.json();
        const genresData = await genresRes.json();

        const result = movieData.results[0];
        const genreList = genresData.genres;

        setMovie({
          id: result.id,
          title: result.title,
          desc: result.overview,
          tags: [
            result.release_date.slice(0, 4),
            ...result.genre_ids
              .map((id) => genreList.find((g) => g.id === id)?.name)
              .filter(Boolean),
          ],
          backdropSrc: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMovie();
  }, []);

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
              <Link className={styles.seeMore} to={`/movies/${movie.id}`}>
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
