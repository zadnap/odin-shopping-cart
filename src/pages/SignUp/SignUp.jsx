import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import logo from '@/assets/logo.png';
import styles from './SignUp.module.scss';

const SignUp = () => {
  return (
    <section className={styles.signUp}>
      <form action="">
        <p className={styles.brandName}>
          CineMatch
          <img className={styles.appLogo} src={logo} alt="" />
        </p>
        <h1>Sign Up</h1>

        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <Input id="username" placeholder="Username" type="text" />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <Input id="password" placeholder="Password" type="password" />
        </div>

        <div className={styles.formField}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <Input
            id="confirm-password"
            placeholder="Confirm Password"
            type="password"
          />
        </div>

        <p className={styles.error}>Warning here</p>

        <Button accent type="submit" className={styles.submitBtn}>
          Sign Up
        </Button>
      </form>

      <p className={styles.authSwitch}>
        <span className={styles.text}>Already have an account?</span>{' '}
        <Link to="/auth/sign-in" className={styles.linkText}>
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
