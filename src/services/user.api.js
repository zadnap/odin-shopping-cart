import getAuthHeaders from '../utils/getAuthHeaders';

const API_URL = import.meta.env.VITE_API_URL;

export async function getFavourites(page) {
  const response = await fetch(`${API_URL}/user/favourites?page=${page}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to fetch');
  }

  return data;
}
