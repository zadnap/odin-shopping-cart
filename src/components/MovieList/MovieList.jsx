import styles from './MovieList.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieList() {
  const [genreId, setGenreId] = useState(28);
  const [genres, setGenres] = useState(null);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok) {
          throw new Error(
            (response.status === 404
              ? 'Could not find a list of genre. '
              : 'Something went wrong while fetching genre data. ') +
              'Please try again later.'
          );
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchGenres();
  }, []);

  const fetchMovies = useCallback(
    async (pageNum) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNum}`
        );

        if (!response.ok) {
          throw new Error(
            (response.status === 404
              ? 'Could not find movies of this genre. '
              : 'Something went wrong while fetching movie data. ') +
              'Please try again later.'
          );
        }

        const data = await response.json();

        const mappedMovies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
          rating: movie.vote_average?.toFixed(1) ?? 'N/A',
          posterSrc: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        }));

        setMovies((prev) =>
          pageNum === 1 ? mappedMovies : [...prev, ...mappedMovies]
        );
        setHasMore(data.page < data.total_pages);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
    [genreId]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1);
  }, [genreId, fetchMovies]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page, fetchMovies]);

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

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
          <FilteredMovieList movies={movies} lastMovieRef={lastMovieRef} />
          {loading && <Loader />}
        </>
      )}
    </section>
  );
}

export default MovieList;
