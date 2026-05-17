import styles from './MovieList.module.scss';
import { useSearchParams } from 'react-router-dom';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '../MoviePagination/MoviePagination';
import useGenres from '../../hooks/useGenres';
import useMoviesByGenre from '../../hooks/useMoviesByGenre';

function MovieList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const currentGenreId = parseInt(searchParams.get('genre_id') || '28', 10);

  const { genres, loading: genreLoading, error: genreError } = useGenres();
  const {
    movies,
    totalPages,
    loading: movieLoading,
    error: movieError,
  } = useMoviesByGenre(currentGenreId, page);

  const handleGenreChange = (newGenreParam) => {
    const nextGenreId = Array.isArray(newGenreParam)
      ? newGenreParam[0]
      : newGenreParam;

    searchParams.set('genre_id', nextGenreId);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPageNum) => {
    searchParams.set('page', newPageNum);
    setSearchParams(searchParams);
  };

  return (
    <section className={styles.movieList}>
      {genreError && <ErrorMessage message={genreError} />}
      {!genreLoading && !genreError && (
        <GenreFilter
          currentId={currentGenreId}
          onChangeGenreId={handleGenreChange}
          genres={genres}
        />
      )}
      {movieLoading && <Loader />}
      {movieError && <ErrorMessage message={movieError} />}
      {!movieLoading && !movieError && (
        <>
          <FilteredMovieList movies={movies} />
          <MoviePagination
            page={page}
            totalPages={totalPages}
            onPrev={() => handlePageChange(page - 1)}
            onNext={() => handlePageChange(page + 1)}
            onJump={(pageNum) => handlePageChange(pageNum)}
          />
        </>
      )}
    </section>
  );
}

export default MovieList;
