import styles from './Button.module.scss';

function Button({
  round,
  square,
  active,
  disabled,
  onClick,
  children,
  ...props
}) {
  return (
    <button
      className={`
        ${styles.button} 
        ${round ? styles.round : ' '}
        ${square ? styles.square : ' '}
        ${active ? styles.active : ''}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
