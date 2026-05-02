import { refreshToken, signOutUser } from './auth.api';

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshPromise = null;

const fetchClient = async (url, options = {}) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshTokenValue = localStorage.getItem('refresh_token');
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...(options.headers || {}),
    },
  };

  let response = await fetch(`${API_URL}${url}`, config);

  if (
    response.status === 401 &&
    !url.includes('/auth/refresh') &&
    refreshTokenValue
  ) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken();
      }

      await refreshPromise;
    } catch {
      signOutUser();
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }

    const newAccessToken = localStorage.getItem('access_token');

    if (!newAccessToken) {
      signOutUser();
      return;
    }

    response = await fetch(`${API_URL}${url}`, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
};

export const fetchJSON = async (url, options = {}) => {
  const res = await fetchClient(url, options);

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok || (data && data.success === false)) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
