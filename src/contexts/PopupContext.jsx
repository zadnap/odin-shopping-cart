import { createContext, useState } from 'react';
import Popup from '../components/Popup/Popup';

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    content: '',
    onConfirm: null,
    onCancel: null,
  });

  const showPopup = ({ title, content, onConfirm, onCancel }) => {
    setPopup({
      isOpen: true,
      title,
      content,
      onConfirm,
      onCancel,
    });
  };

  const hidePopup = () => {
    setPopup((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <PopupContext.Provider value={{ popup, showPopup, hidePopup }}>
      {children}
      <Popup
        isOpen={popup.isOpen}
        title={popup.title}
        content={popup.content}
        onConfirm={popup.onConfirm}
        onCancel={popup.onCancel}
      />
    </PopupContext.Provider>
  );
};

export { PopupContext, PopupProvider };
