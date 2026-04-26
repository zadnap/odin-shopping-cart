import App from '../App';
import Home from '../pages/Home/Home';
import Movie from '../pages/Movie/Movie';
import Trending from '../pages/Trending/Trending';
import Upcoming from '../pages/Upcoming/Upcoming';
import Trailers from '../pages/Trailers/Trailers';
import Favourites from '../pages/Favourites/Favourites';
import Search from '../pages/Search/Search';
import Error from '../pages/Error/Error';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { Navigate } from 'react-router-dom';
import Onboarding from '../pages/Onboarding/Onboarding';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'movie/:id', element: <Movie /> },
          { path: 'trailers', element: <Trailers /> },
          { path: 'upcoming', element: <Upcoming /> },
          { path: 'trending', element: <Trending /> },
          {
            path: 'favourites',
            element: (
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            ),
          },
          { path: 'search', element: <Search /> },
        ],
      },
      {
        path: 'auth',
        element: (
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        ),
        children: [
          { index: true, element: <Navigate to="sign-in" replace /> },
          { path: 'sign-in', element: <SignIn /> },
          { path: 'sign-up', element: <SignUp /> },
        ],
      },
      {
        path: 'onboarding',
        element: <Onboarding />,
      },
    ],
  },
];

export default routes;
