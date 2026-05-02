import { createContext, useEffect, useState } from 'react';
import { signInUser, signUpUser, signOutUser } from '@/services/auth.api';
import { getMe } from '@/services/user.api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const me = await getMe({ skipAuthRefresh: true });
        setUser(me.data);
      } catch {
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

      await signInUser(data);

      const me = await getMe();
      setUser(me.data);
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

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);

      await signOutUser();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
