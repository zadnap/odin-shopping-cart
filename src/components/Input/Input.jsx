import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Input({
  icon = faSearch,
  type = 'text',
  value,
  placeholder,
  onChange,
}) {
  return (
    <div className={styles.inputContainer}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <input
        type={type}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
