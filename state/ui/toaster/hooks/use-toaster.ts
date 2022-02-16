import { useContext } from 'react';
import { ToasterContext } from '../providers/ToasterProvider';
import { UseToaster } from '../types';

export const useToaster = (): UseToaster => {
  const [state, dispatch] = useContext(ToasterContext);

  return [state, dispatch];
};

export default useToaster;
