import { createContext, useEffect, useState } from 'react';
import { signInUser, signUpUser } from '@/services/auth.api';
import { getMe } from '@/services/user.api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await getMe();
        setUser(me.data);
      } catch {
        localStorage.removeItem('accessToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signInUser(data);

      if (res?.access_token) {
        localStorage.setItem('accessToken', res.access_token);

        const me = await getMe();
        setUser(me.data);
      }

      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signUpUser(data);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const refreshUser = async () => {
    const me = await getMe();
    setUser(me.data);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signIn, signUp, signOut, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
