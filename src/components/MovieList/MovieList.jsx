import styles from './MovieList.module.scss';
import { useEffect, useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieList() {
  const [genreId, setGenreId] = useState(28);
  const [genres, setGenres] = useState(null);
  const [movies, setMovies] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok)
          throw new Error(
            (response.status === 404
              ? 'Could not find a list of genre. '
              : 'Something went wrong while fetching genre data. ') +
              'Please try again later.'
          );

        const data = await response.json();

        setGenres(data.genres);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        );

        if (!response.ok)
          throw new Error(
            (response.status === 404
              ? 'Could not find movies of this genre. '
              : 'Something went wrong while fetching movie data. ') +
              'Please try again later.'
          );

        const data = await response.json();

        const mappedMovies = data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            year: movie.release_date.slice(0, 4),
            rating: movie.vote_average.toFixed(1),
            posterSrc: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          };
        });

        setMovies(mappedMovies);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMovies();
  }, [genreId]);

  return (
    <section className={styles.movieList}>
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          {genres && (
            <GenreFilter
              currentId={genreId}
              onChangeGenreId={setGenreId}
              genres={genres}
            />
          )}
          {movies ? <FilteredMovieList movies={movies} /> : <Loader />}
        </>
      )}
    </section>
  );
}

export default MovieList;
