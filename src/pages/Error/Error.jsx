import { Link } from 'react-router-dom';
import styles from './Error.module.scss';
import errorAstronaut from '@/assets/error-astronaut.jpg';

function Error() {
  return (
    <section className={styles.error}>
      <img className={styles.illustration} src={errorAstronaut} alt="" />
      <div className={styles.content}>
        <h1 className={styles.title}>Error 404: Page not found!</h1>
        <p className={styles.desc}>
          We've looked everywhere but couldn't find the page you were looking
          for.
        </p>
        <p className={styles.redirect}>
          Go to{' '}
          <Link to="/" className={styles.link}>
            Home Page
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Error;
