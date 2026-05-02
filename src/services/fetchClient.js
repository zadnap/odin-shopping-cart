import { refreshToken } from './auth.api';

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshPromise = null;

export const fetchClient = async (url, options = {}) => {
  const { skipAuthRefresh, ...rest } = options;
  const config = {
    ...rest,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(rest.headers || {}),
    },
  };

  let response = await fetch(`${API_URL}${url}`, config);

  if (
    response.status === 401 &&
    !skipAuthRefresh &&
    !url.includes('/auth/refresh')
  ) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken();
      }

      await refreshPromise;
    } catch {
      window.location.href = '/auth/sign-in';
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }

    response = await fetch(`${API_URL}${url}`, config);
  }

  return response;
};

export const fetchJSON = async (url, options = {}) => {
  const res = await fetchClient(url, options);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
