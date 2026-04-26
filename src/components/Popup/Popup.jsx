import Button from '../Button/Button';
import styles from './Popup.module.scss';

const Popup = ({ isOpen, title, content, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
      data-testid="popup-overlay"
    >
      <div
        className={styles.popup}
        onClick={(e) => e.stopPropagation()}
        data-testid="popup-content"
      >
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.content}>{content}</div>
        <div className={styles.actions}>
          <Button outline onClick={onCancel}>
            Cancel
          </Button>
          <Button accent onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
