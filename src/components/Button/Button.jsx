import styles from './Button.module.scss';

function Button({
  type = 'button',
  accent,
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
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
