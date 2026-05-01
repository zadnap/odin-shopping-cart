import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Loader from '../components/Loader/Loader';

const OnboardingGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (user.is_onboarded) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OnboardingGuard;
