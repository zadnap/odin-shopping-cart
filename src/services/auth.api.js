import { fetchJSON } from './fetchClient';

export const refreshToken = () =>
  fetchJSON(`/auth/refresh`, { method: 'POST' });

export const signUpUser = ({ username, password, passwordConfirmation }) =>
  fetchJSON(`/auth/sign-up`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

export const signInUser = ({ username, password }) =>
  fetchJSON(`/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const signOutUser = () =>
  fetchJSON(`/auth/sign-out`, {
    method: 'POST',
  });
