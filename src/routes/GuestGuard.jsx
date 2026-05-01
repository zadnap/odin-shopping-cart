import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestGuard;
