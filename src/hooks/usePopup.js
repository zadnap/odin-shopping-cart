import { useContext } from 'react';
import { PopupContext } from '../contexts/PopupContext';

const usePopup = () => {
  return useContext(PopupContext);
};

export default usePopup;
