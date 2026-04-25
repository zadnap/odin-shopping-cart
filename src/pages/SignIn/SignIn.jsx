import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import logo from '@/assets/logo.png';
import styles from './SignIn.module.scss';

const SignIn = () => {
  return (
    <section className={styles.signIn}>
      <form action="">
        <p className={styles.brandName}>
          CineMatch
          <img className={styles.appLogo} src={logo} alt="" />
        </p>
        <h1>Sign In</h1>

        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <Input id="username" placeholder="Username" type="text" />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <Input id="password" placeholder="Password" type="password" />
        </div>

        <p className={styles.error}>Warning here</p>

        <Button accent type="submit" className={styles.submitBtn}>
          Sign In
        </Button>
      </form>

      <p className={styles.authSwitch}>
        <span className={styles.text}>Don't have an account?</span>{' '}
        <Link to="/auth/sign-up" className={styles.linkText}>
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
