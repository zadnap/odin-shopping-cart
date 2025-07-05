import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Modal.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

function Modal({ title, onClose, children }) {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <section
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className={styles.header}>
          <h1 id="modal-title" className={styles.title}>
            {title}
          </h1>
          <button
            className={styles.closeModal}
            onClick={onClose}
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </section>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
