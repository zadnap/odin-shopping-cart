import styles from './ErrorMessage.module.scss';
import errorFace from '@/assets/error-face.png';

function ErrorMessage({ message, className = '' }) {
  return (
    <div role="alert" className={`${styles.errorMessage} ${className}`}>
      <img className={styles.errorImage} src={errorFace} alt="" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
