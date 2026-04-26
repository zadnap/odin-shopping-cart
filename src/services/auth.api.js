const API_URL = import.meta.env.VITE_API_URL;

export const signUpUser = async ({
  username,
  password,
  passwordConfirmation,
}) => {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Sign up failed');
  }

  return res.json();
};

export const signInUser = async ({ username, password }) => {
  const res = await fetch(`${API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Sign in failed');
  }

  return res.json();
};
