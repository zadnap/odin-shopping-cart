import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Trailers.module.scss';
import TrailerPreview from '@/components/TrailerPreview/TrailerPreview';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Trailers() {
  const [trailers, setTrailers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  const fetchTrailers = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const popularRes = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );
      const popularData = await popularRes.json();

      const movies = popularData.results;

      // Fetch trailers for each movie
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
            id: movie.id,
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

      setTrailers((prev) =>
        pageNum === 1 ? validTrailers : [...prev, ...validTrailers]
      );

      setHasMore(popularData.page < popularData.total_pages);
    } catch (error) {
      console.error('Failed to fetch trailers:', error);
      if (pageNum === 1) setTrailers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch when page changes
  useEffect(() => {
    fetchTrailers(page);
  }, [page, fetchTrailers]);

  // Infinite scroll observer
  const lastTrailerRef = useCallback(
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
    <section className={styles.trailers}>
      <ul className={styles.trailerList}>
        {trailers.map((trailer, index) => (
          <li
            key={trailer.trailerKey}
            className={styles.item}
            ref={index === trailers.length - 1 ? lastTrailerRef : null}
          >
            <TrailerPreview {...trailer} />
          </li>
        ))}
      </ul>
      {loading && <Loader />}
    </section>
  );
}

export default Trailers;
