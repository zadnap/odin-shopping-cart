import { useParams, useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [searchResults, setSearchResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setSearchResults(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=en-US`
        );

        if (!response.ok) {
          throw new Error(
            (response.status === 404
              ? `Could not find movies named ${query}`
              : 'Something went wrong while fetching movie data. ') +
              'Please try again later.'
          );
        }

        const data = await response.json();

        const mappedMovies = data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
            rating: movie.vote_average?.toFixed(1) ?? 'N/A',
            posterSrc: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          };
        });

        if (mappedMovies.length === 0)
          throw new Error(`Could not find movies named ${query}`);
        else setSearchResults(mappedMovies);
        setTotalPages(data.total_pages);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMovies();
  }, [query, page]);

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
    <section className={styles.search}>
      <h2 className={styles.title}>Results for: {query}</h2>
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : searchResults ? (
        <FilteredMovieList movies={searchResults} />
      ) : (
        <Loader />
      )}
      <MoviePagination
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        onJump={onJump}
      />
    </section>
  );
}

export default Search;
