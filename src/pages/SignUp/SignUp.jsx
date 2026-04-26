import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import logo from '@/assets/logo.png';
import styles from './SignUp.module.scss';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, loading, error } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const isPasswordMatch = form.password === form.passwordConfirmation;
  const formError = !isPasswordMatch ? 'Password does not match' : error;
  const buttonDisabled =
    !form.username ||
    !form.password ||
    !form.passwordConfirmation ||
    loading ||
    !isPasswordMatch;

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch) return;

    const res = await signUp(form);

    if (res) {
      navigate('/auth/sign-in', {
        state: { message: 'Account created successfully, you can sign in now' },
      });
    }
  };

  return (
    <section className={styles.signUp}>
      <form onSubmit={handleSubmit}>
        <p className={styles.brandName}>
          CineMatch
          <img className={styles.appLogo} src={logo} alt="" />
        </p>
        <h1>Sign Up</h1>

        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <Input
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
          />
        </div>

        {formError && <p className={styles.error}>{formError}</p>}

        <Button
          accent
          type="submit"
          className={styles.submitBtn}
          disabled={buttonDisabled}
          loading={loading}
        >
          Sign Up
        </Button>

        <p className={styles.authSwitch}>
          <span className={styles.text}>Already have an account?</span>{' '}
          <Link to="/auth/sign-in" className={styles.linkText}>
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
