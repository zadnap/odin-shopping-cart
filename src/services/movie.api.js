import getAuthHeaders from '../utils/getAuthHeaders';

const API_URL = import.meta.env.VITE_API_URL;

export async function getUpcomingMovies(page) {
  const response = await fetch(`${API_URL}/movies/upcoming?page=${page}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function getTrendingMovies(page) {
  const response = await fetch(`${API_URL}/movies/trending?page=${page}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function getPreviewTrailers(limit) {
  const response = await fetch(`${API_URL}/movies/trailers?limit=${limit}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function getMovieDetail(id) {
  const response = await fetch(`${API_URL}/movies/detail/${id}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function getAllGenres() {
  const response = await fetch(`${API_URL}/movies/genres`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function getMovieByGenre(id, page) {
  const response = await fetch(`${API_URL}/movies/genres/${id}?page=${page}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function getFeaturedMovie() {
  const response = await fetch(`${API_URL}/movies/featured`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}

export async function searchMovie(query, page) {
  const response = await fetch(
    `${API_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}
