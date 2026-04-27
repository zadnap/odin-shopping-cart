const API_URL = import.meta.env.VITE_API_URL;

export async function getUpcomingMovies(page) {
  const response = await fetch(`${API_URL}/movies/upcoming?page=${page}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch');
  }

  return data;
}
