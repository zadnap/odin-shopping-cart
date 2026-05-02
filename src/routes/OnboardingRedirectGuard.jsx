import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Loader from '../components/Loader/Loader';

const OnboardingRedirectGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (user && !user.is_onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default OnboardingRedirectGuard;
