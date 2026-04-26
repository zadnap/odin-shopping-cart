import { createContext, useEffect, useState } from 'react';
import { signInUser, signUpUser } from '@/services/auth.api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        username: decoded.username,
      });
    } catch {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  const signIn = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signInUser(data);

      if (res?.access_token) {
        localStorage.setItem('accessToken', res.access_token);

        if (res.user) {
          setUser(res.user);
        } else {
          setUser({});
        }
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
