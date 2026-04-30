import { useEffect, useState } from 'react';
import { getMoviesByGenre } from '@/services/movie.api.js';

export default function useMoviesByGenre(genreId, page) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMoviesByGenre(genreId, page);

        setMovies(data.movies);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId, page]);

  return { movies, totalPages, loading, error };
}
