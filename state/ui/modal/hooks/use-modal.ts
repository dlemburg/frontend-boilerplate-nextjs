import { useContext } from 'react';
import { UseModal } from '..';
import { ModalContext } from '../providers';

export const useModal = (): UseModal => {
  const [state, dispatch] = useContext(ModalContext);

  return [state, dispatch];
};

export default useModal;
