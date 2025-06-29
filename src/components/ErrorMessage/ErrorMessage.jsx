import styles from './ErrorMessage.module.scss';
import errorIllustration from '@/assets/error-illustration.png';

function ErrorMessage({ message }) {
  return (
    <div role="alert" className={styles.errorMessage}>
      <img className={styles.errorImage} src={errorIllustration} alt="" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
