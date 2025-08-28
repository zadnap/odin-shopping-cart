import App from './App';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Movie from './pages/Movie/Movie';
import Trending from './pages/Trending/Trending';
import Upcoming from './pages/Upcoming/Upcoming';
import Trailers from './pages/Trailers/Trailers';
import Favourites from './pages/Favourites/Favourites';
import Search from './pages/Search/Search';
import Error from './pages/Error/Error';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/movie/:id', element: <Movie /> },
      { path: `/trailers`, element: <Trailers /> },
      { path: '/upcoming', element: <Upcoming /> },
      { path: '/trending', element: <Trending /> },
      { path: '/favourites', element: <Favourites /> },
      { path: '/search', element: <Search /> },
    ],
  },
];

export default routes;
