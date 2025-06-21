import styles from './Button.module.scss';

function Button({ round, square, onClick, children }) {
  return (
    <button
      className={`${styles.button} ${round ? styles.round : ''} ${
        square ? styles.square : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
