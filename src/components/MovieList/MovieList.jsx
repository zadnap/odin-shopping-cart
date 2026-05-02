import styles from './MovieList.module.scss';
import { useEffect, useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import GenreFilter from '@/components/GenreFilter/GenreFilter';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '../MoviePagination/MoviePagination';
import useGenres from '../../hooks/useGenres';
import useMoviesByGenres from '../../hooks/useMoviesByGenres';

function MovieList() {
  const [genreIds, setGenreIds] = useState([28]);
  const [page, setPage] = useState(1);
  const { genres, loading: genreLoading, error: genreError } = useGenres();
  const {
    movies,
    totalPages,
    loading: movieLoading,
    error: movieError,
  } = useMoviesByGenres(genreIds, page);

  useEffect(() => {
    setPage(1);
  }, [genreIds]);

  return (
    <section className={styles.movieList}>
      {genreError && <ErrorMessage message={genreError} />}
      {!genreLoading && !genreError && (
        <GenreFilter
          currentId={genreIds[0]}
          onChangeGenreId={setGenreIds}
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
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
            onJump={(pageNum) => setPage(pageNum)}
          />
        </>
      )}
    </section>
  );
}

export default MovieList;
