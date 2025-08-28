import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import ProductItem from '@/components/ProductItem/ProductItem';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faBitcoin,
  faCcMastercard,
  faPaypal,
  faStripeS,
} from '@fortawesome/free-brands-svg-icons';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Cart() {
  const [rents, setRents] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [summary, setSummary] = useState([]);

  const paymentMethods = [
    { name: 'Paypal', icon: faPaypal },
    { name: 'Stripe', icon: faStripeS },
    { name: 'Mastercard', icon: faCcMastercard },
    { name: 'Bitcoin', icon: faBitcoin },
  ];

  useEffect(() => {
    const rentIds = JSON.parse(localStorage.getItem('rents')) || [];

    if (rentIds.length === 0) {
      setRents([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const movies = await Promise.all(
          rentIds.map(async (id) => {
            const [detailsRes, releaseRes] = await Promise.all([
              fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
              ),
              fetch(
                `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
              ),
            ]);

            if (!detailsRes.ok)
              throw new Error(`HTTP error! Status: ${detailsRes.status}`);
            if (!releaseRes.ok)
              throw new Error(`HTTP error! Status: ${releaseRes.status}`);

            const data = await detailsRes.json();
            const releaseData = await releaseRes.json();

            const usRelease = releaseData.results.find(
              (r) => r.iso_3166_1 === 'US'
            );
            const certification =
              usRelease?.release_dates.find((r) => r.certification)
                ?.certification || 'NR';

            return {
              backdropSrc: `https://image.tmdb.org/t/p/w185${data.backdrop_path}`,
              title: data.title,
              year: data.release_date.slice(0, 4),
              rating: data.vote_average.toFixed(1),
              id: data.id,
              rent: 4.99,
              certification,
            };
          })
        );

        setRents(movies);
      } catch (error) {
        setErrorMessage(error.message);
        setRents([]);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!rents) return;

    const sumOfRent = rents.reduce((acc, curr) => acc + curr.rent, 0);
    setSummary([
      { title: 'Rent', value: sumOfRent, isPositive: true },
      { title: 'VAT', value: sumOfRent * 0.1, isPositive: true },
      { title: 'Discount', value: 0, isPositive: false },
    ]);
  }, [rents]);

  return (
    <section className={styles.cart}>
      <div className={styles.cartListContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Movie ({rents?.length})</h1>
          <h1 className={styles.title}>Rent</h1>
        </div>
        <ul className={styles.cartList}>
          {errorMessage ? (
            <ErrorMessage message={errorMessage} />
          ) : rents ? (
            rents.map((item) => (
              <ProductItem
                key={item.id}
                rents={rents}
                setRents={setRents}
                {...item}
              />
            ))
          ) : (
            <Loader />
          )}
        </ul>
        <div className={styles.footer}>
          <p className={styles.supportText}>
            No movies match your search? View{' '}
            <Link to="/trending" className={styles.supportLink}>
              Trending
            </Link>{' '}
            now
          </p>
          <Link to="/" className={styles.backToHomepage}>
            <FontAwesomeIcon icon={faArrowLeft} /> Go back to homepage
          </Link>
        </div>
      </div>
      <CheckoutForm summary={summary} paymentMethods={paymentMethods} />
    </section>
  );
}

export default Cart;
