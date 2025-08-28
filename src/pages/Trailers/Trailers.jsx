import { useEffect, useState } from 'react';
import styles from './Trailers.module.scss';
import TrailerPreview from '@/components/TrailerPreview/TrailerPreview';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import MoviePagination from '@/components/MoviePagination/MoviePagination';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Trailers() {
  const [trailers, setTrailers] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrailers = async () => {
      setTrailers(null);

      try {
        const popularRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const popularData = await popularRes.json();
        const movies = popularData.results;

        const trailerResult = await Promise.all(
          movies.map(async (movie) => {
            const videoRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
            );
            const videoData = await videoRes.json();
            const trailer = videoData.results.find(
              (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
            );

            if (!trailer) return null;

            return {
              title: movie.title,
              trailerKey: trailer.key,
              year: movie.release_date?.slice(0, 4) ?? 'N/A',
              rating: movie.vote_average?.toFixed(1) ?? 'N/A',
              backdropSrc: movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : null,
            };
          })
        );

        const validTrailers = trailerResult.filter((t) => t !== null);

        setTrailers(validTrailers);
        setTotalPages(popularData.total_pages);
      } catch (error) {
        console.error('Failed to fetch trailers:', error);
        setTrailers([]);
      }
    };

    fetchTrailers();
  }, [page]);

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
    <section className={styles.trailers}>
      {trailers ? (
        trailers.length > 0 ? (
          <ul className={styles.trailerList}>
            {trailers.map((trailer) => (
              <li key={trailer.key} className={styles.item}>
                <TrailerPreview {...trailer} />
              </li>
            ))}
          </ul>
        ) : (
          <ErrorMessage message="No trailer available" />
        )
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

export default Trailers;
