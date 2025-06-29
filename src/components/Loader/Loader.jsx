import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Loader.module.scss';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

function Loader() {
  return (
    <div
      className={styles.loader}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.loadingCircle}>
        <FontAwesomeIcon className={styles.icon} icon={faVideo} />
      </div>
      <p className={styles.message}>Just a moment</p>
    </div>
  );
}

export default Loader;
