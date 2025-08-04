import styles from './Cart.module.scss';
import ProductItem from '@/components/ProductItem/ProductItem';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faBitcoin,
  faCcMastercard,
  faPaypal,
  faStripeS,
} from '@fortawesome/free-brands-svg-icons';

function Cart({ items = [] }) {
  const sumOfRent = items.reduce((acc, curr) => acc + curr.rent, 0);
  const summary = [
    {
      title: 'Rent',
      value: sumOfRent.toFixed(2),
      isPositive: true,
    },
    {
      title: 'VAT',
      value: (sumOfRent * 0.1).toFixed(2),
      isPositive: true,
    },
    {
      title: 'Discount',
      value: 0,
      isPositive: false,
    },
  ];
  const paymentMethods = [
    {
      name: 'Paypal',
      icon: faPaypal,
    },
    {
      name: 'Stripe',
      icon: faStripeS,
    },
    {
      name: 'Mastercard',
      icon: faCcMastercard,
    },
    {
      name: 'Bitcoin',
      icon: faBitcoin,
    },
  ];

  return (
    <section className={styles.cart}>
      <div className={styles.cartListContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Movie ({items.length})</h1>
          <h1 className={styles.title}>Rent</h1>
        </div>
        <ul className={styles.cartList}>
          {items.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))}
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
            {' '}
            <FontAwesomeIcon icon={faArrowLeft} /> Go back to homepage
          </Link>
        </div>
      </div>
      <CheckoutForm summary={summary} paymentMethods={paymentMethods} />
    </section>
  );
}

export default Cart;
