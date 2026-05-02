import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Button({
  type = 'button',
  accent,
  round,
  square,
  outline,
  active,
  disabled,
  loading,
  loadingText = 'Processing...',
  onClick,
  children,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        ${styles.button} 
        ${round ? styles.round : ' '}
        ${accent ? styles.accent : ' '}
        ${outline ? styles.outline : ' '}
        ${square ? styles.square : ' '}
        ${active ? styles.active : ' '}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className={styles.loading} aria-label="Loading">
          <FontAwesomeIcon icon={faSpinner} />
          <span>{loadingText}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
