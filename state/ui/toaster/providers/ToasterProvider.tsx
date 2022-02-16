import React, { useReducer, useCallback } from 'react';
import Toaster from '../components';
import { OpenToasterDispatchPayload, UseToasterState, ToasterVariant, TransitionDirection } from '../types';

type Action = { type: 'OPEN_TOASTER'; payload: OpenToasterDispatchPayload } | { type: 'CLOSE_TOASTER' };

const getDefaultModalState = (): UseToasterState => ({
  isOpen: false,
  body: '',
  transitionDirection: TransitionDirection.LEFT,
  variant: ToasterVariant.SUCCESS,
  onClose: () => undefined,
});

const modalReducer = (state: UseToasterState, action: Action): UseToasterState => {
  switch (action.type) {
    case 'OPEN_TOASTER':
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };
    case 'CLOSE_TOASTER':
      return getDefaultModalState();
    default:
      return getDefaultModalState();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ToasterContext = React.createContext<any>(null);

export const ToasterProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer<React.Reducer<UseToasterState, Action>>(modalReducer, getDefaultModalState());

  const openToaster = useCallback(
    (payload: OpenToasterDispatchPayload): void => {
      dispatch({
        type: 'OPEN_TOASTER',
        payload,
      });
    },
    [dispatch]
  );

  const closeToaster = useCallback((): void => {
    dispatch({ type: 'CLOSE_TOASTER' });
  }, [dispatch]);

  return (
    <ToasterContext.Provider
      value={[
        state,
        {
          openToaster,
          closeToaster,
        },
      ]}
    >
      {state.isOpen && <Toaster {...state}>{state.body}</Toaster>}
      {props.children}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;
