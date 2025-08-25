import styles from './Trending.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  const fetchTrendingMovies = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const data = await response.json();
      const movieResult = data.results.map((movie) => ({
        id: movie.id,
        posterSrc: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        title: movie.title,
        year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
        rating: movie.vote_average?.toFixed(1) ?? 'N/A',
      }));

      setTrendingMovies((prev) =>
        pageNum === 1 ? movieResult : [...prev, ...movieResult]
      );

      setHasMore(data.page < data.total_pages);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingMovies(page);
  }, [page, fetchTrendingMovies]);

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
    <section className={styles.trending}>
      <h2 className={styles.title}>Trending</h2>
      <FilteredMovieList movies={trendingMovies} lastMovieRef={lastMovieRef} />
      {loading && <Loader />}
    </section>
  );
}

export default Trending;
