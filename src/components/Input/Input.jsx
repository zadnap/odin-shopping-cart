import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Input({
  id,
  icon = faSearch,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  ...props
}) {
  return (
    <div className={styles.inputContainer}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <input
        id={id}
        type={type}
        className={styles.input}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
