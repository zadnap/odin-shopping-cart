import styles from './Home.module.scss';
import Showcase from '@/components/Showcase/Showcase';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [genreId, setGenreId] = useState(28);
  const [genres, setGenres] = useState(null);
  const [movies, setMovies] = useState(null);
  const [showcaseMovie, setShowcaseMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

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

        setShowcaseMovie({
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
    fetchMovie();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [genreId]);

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
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
            year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
            rating: movie.vote_average?.toFixed(1) ?? 'N/A',
            posterSrc:
              movie.poster_path &&
              `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          };
        });

        setMovies(mappedMovies);
        setTotalPages(data.total_pages);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMovies();
  }, [genreId, page]);

  const onPrev = () => {
    setPage((prev) => prev - 1);
  };

  const onNext = () => {
    setPage((prev) => prev + 1);
  };

  const onJump = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <section className={styles.home}>
      {errorMessage ? (
        <ErrorMessage message={error.message} />
      ) : showcaseMovie && genres && movies ? (
        <>
          <Showcase movie={showcaseMovie} />
          <section className={styles.movieList}>
            <GenreFilter
              currentId={genreId}
              onChangeGenreId={setGenreId}
              genres={genres}
            />
            <FilteredMovieList movies={movies} />
            <MoviePagination
              page={page}
              totalPages={totalPages}
              onPrev={onPrev}
              onNext={onNext}
              onJump={onJump}
            />
          </section>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Home;
