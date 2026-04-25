import styles from './Button.module.scss';

function Button({
  round,
  square,
  outline,
  active,
  disabled,
  onClick,
  children,
  className,
  ...props
}) {
  return (
    <button
      className={`
        ${styles.button} 
        ${round ? styles.round : ' '}
        ${outline ? styles.outline : ' '}
        ${square ? styles.square : ' '}
        ${active ? styles.active : ' '}
        ${className}
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
