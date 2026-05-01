import getAuthHeaders from '../utils/getAuthHeaders';

const API_URL = import.meta.env.VITE_API_URL;

export async function getFavourites(page) {
  const response = await fetch(`${API_URL}/user/favourites?page=${page}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch favourites');
  }

  return data;
}

export async function addToFavourites(movieId) {
  const response = await fetch(`${API_URL}/user/favourites`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    method: 'POST',
    body: JSON.stringify({
      movie_id: movieId,
    }),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to add to favourites');
  }

  return data;
}

export async function deleteFromFavourites(movieId) {
  const response = await fetch(`${API_URL}/user/favourites`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    method: 'DELETE',
    body: JSON.stringify({
      movie_id: movieId,
    }),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to delete from favourites');
  }

  return data;
}

export async function checkFavourite(movieId) {
  const response = await fetch(`${API_URL}/user/favourites/${movieId}`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to check favourite');
  }

  return data;
}

export async function onboard(genres, movies) {
  const response = await fetch(`${API_URL}/user/onboarding`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    method: 'POST',
    body: JSON.stringify({
      genres,
      movies,
    }),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to onboard');
  }

  return data;
}
