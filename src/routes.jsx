import App from './App';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Movie from './pages/Movie/Movie';
import Trending from './pages/Trending/Trending';
import Upcoming from './pages/Upcoming/Upcoming';
import Trailers from './pages/Trailers/Trailers';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/movie/:id',
        element: <Movie />,
      },
      {
        path: `/trailers`,
        element: <Trailers />,
      },
      {
        path: '/upcoming',
        element: <Upcoming />,
      },
      {
        path: '/trending',
        element: <Trending />,
      },
    ],
  },
];

export default routes;
