import React, { useReducer, useCallback, useEffect, useMemo } from 'react';
import { DraggableProps } from 'react-draggable';
import {
  makeActionRouteParams,
  getActionKey,
  makeModalRouteAction,
  getModalActionKey,
  RouteParams,
} from '../util/route-util';
import SlideModal from '../SlideModal';
import BaseModal from '../BaseModal';
import {
  ModalVariant,
  OpenModalPayload,
  ModalOptions,
  ModalProviderProps,
  UseModalState,
  OpenModalDispatchPayload,
} from '..';

type Action =
  | { type: 'OPEN_MODAL'; payload: OpenModalDispatchPayload }
  | { type: 'OPEN_DRAGGABLE_MODAL'; payload: OpenModalDispatchPayload }
  | { type: 'OPEN_HALF_SLIDE_MODAL'; payload: OpenModalDispatchPayload }
  | { type: 'OPEN_FULL_SLIDE_MODAL'; payload: OpenModalDispatchPayload }
  | { type: 'ROUTE_ACTION_CHANGING'; payload: boolean }
  | { type: 'PERSIST_ROUTE_WHEN_MODAL_OPENED'; payload: string }
  | { type: 'CLOSE_MODAL' };

const getModal = (variant: ModalVariant | null): React.FC<any> => {
  switch (variant) {
    case ModalVariant.DEFAULT:
      return BaseModal;
    case ModalVariant.HALF_SLIDE:
    case ModalVariant.FULL_SLIDE:
      return SlideModal;
    default:
      throw new Error(`Modal Variant not found <${variant}>`);
  }
};

const getDefaultModalOptions = (): ModalOptions => ({
  closeOnBackdropClick: false,
  draggable: false,
  draggableOptions: {} as DraggableProps,
});

const getDefaultModalState = (): UseModalState => ({
  isOpen: false,
  isRouteActionChanging: false,
  routeAction: null,
  routeWhenModalOpened: null,
  body: null,
  variant: ModalVariant.DEFAULT,
  options: getDefaultModalOptions(),
  titleText: '',
  Title: undefined,
  CloseButton: undefined,
});

const resolvePayload = (
  payload: OpenModalDispatchPayload,
  mixinOptions = {} as ModalOptions
): OpenModalDispatchPayload => {
  const { options = {}, ...updates } = payload;
  const modalOptions = {
    ...getDefaultModalOptions(),
    ...mixinOptions,
    ...options,
  };

  return { ...updates, options: modalOptions };
};

const modalReducer = (state: UseModalState, action: Action): UseModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        ...resolvePayload(action.payload),
        variant: ModalVariant.DEFAULT,
        isOpen: true,
      };
    case 'OPEN_DRAGGABLE_MODAL':
      return {
        ...state,
        ...resolvePayload(action.payload, { draggable: true }),
        variant: ModalVariant.DEFAULT,
        isOpen: true,
      };
    case 'OPEN_HALF_SLIDE_MODAL':
      return {
        ...state,
        ...resolvePayload(action.payload),
        variant: ModalVariant.HALF_SLIDE,
        isOpen: true,
      };
    case 'OPEN_FULL_SLIDE_MODAL':
      return {
        ...state,
        ...resolvePayload(action.payload),
        variant: ModalVariant.FULL_SLIDE,
        isOpen: true,
      };
    case 'ROUTE_ACTION_CHANGING':
      return {
        ...state,
        isRouteActionChanging: action.payload,
      };
    case 'PERSIST_ROUTE_WHEN_MODAL_OPENED':
      return {
        ...state,
        routeWhenModalOpened: action.payload,
      };
    case 'CLOSE_MODAL':
      return getDefaultModalState();
    default:
      return getDefaultModalState();
  }
};

/**
 * UseModal should be used to control modal state and UI display
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ModalContext = React.createContext<any>([]);

export const ModalProvider: React.FC<ModalProviderProps> = (props) => {
  const [state, dispatch] = useReducer<React.Reducer<UseModalState, Action>>(modalReducer, getDefaultModalState());
  const CloseButton = useMemo(() => {
    if (state.CloseButton === null) return null;

    return state.CloseButton ?? props.CloseButton;
  }, [state.CloseButton, props.CloseButton]);

  const Title = useMemo(() => {
    if (state.Title === null) return null;

    return state.Title ?? props.Title;
  }, [state.Title, props.Title]);
  const Modal = useMemo(() => getModal(state.variant), [state.variant]);

  const getRoute = useCallback((routeAction: string | null, routeParams: RouteParams = {}): string => {
    let route = window.location.href;

    if (routeAction && !window.location.search.includes(routeAction)) {
      route = `${window.location.pathname}${makeActionRouteParams({
        locationSearch: window.location.search,
        action: routeAction,
        routeParams,
        actionKeyFn: makeModalRouteAction,
        actionParamKeyFn: getActionKey,
      })}`;
    }

    return route;
  }, []);

  const maybeNavigate = useCallback((route: string) => {
    if (route !== window.location.href) window.history.replaceState(null, document.title, route);
  }, []);

  const openModal = useCallback(
    ({ routeAction = null, routeParams, ...payload }: OpenModalPayload): void => {
      const route = getRoute(routeAction, routeParams);

      dispatch({
        type: 'OPEN_MODAL',
        payload: { ...payload, routeAction, routeWhenModalOpened: route },
      });

      maybeNavigate(route);
    },
    [maybeNavigate, dispatch, getRoute]
  );

  const openHalfSlideModal = ({ routeAction = null, routeParams, ...payload }: OpenModalPayload): void => {
    const route = getRoute(routeAction, routeParams);

    dispatch({
      type: 'OPEN_HALF_SLIDE_MODAL',
      payload: { ...payload, routeAction, routeWhenModalOpened: route },
    });

    maybeNavigate(route);
  };

  const openFullSlideModal = ({ routeAction = null, routeParams, ...payload }: OpenModalPayload): void => {
    const route = getRoute(routeAction, routeParams);

    dispatch({
      type: 'OPEN_FULL_SLIDE_MODAL',
      payload: { ...payload, routeAction, routeWhenModalOpened: route },
    });

    maybeNavigate(route);
  };

  const openDraggableModal = useCallback(
    ({ routeAction = null, routeParams, ...payload }: OpenModalDispatchPayload): void => {
      const route = getRoute(routeAction, routeParams);

      dispatch({
        type: 'OPEN_DRAGGABLE_MODAL',
        payload: { ...payload, routeAction, routeWhenModalOpened: route },
      });

      maybeNavigate(route);
    },
    [maybeNavigate, dispatch, getRoute]
  );

  const closeModal = useCallback((): void => {
    if (state.handleOnClose) {
      state.handleOnClose();
    }

    if (window.location.search.includes(getModalActionKey())) {
      dispatch({ type: 'ROUTE_ACTION_CHANGING', payload: true });
      window.history.replaceState(
        null,
        document.title,
        `${window.location.pathname}${makeActionRouteParams({
          locationSearch: window.location.search,
        })}`
      );
      dispatch({ type: 'ROUTE_ACTION_CHANGING', payload: false });
    }
    dispatch({ type: 'CLOSE_MODAL' });

    if (state.handleAfterClose) {
      state.handleAfterClose();
    }
  }, [state, dispatch]);

  useEffect(() => {
    // const unsubscribe = history.listen(() => {
    if (state.isOpen && window.location.href !== state.routeWhenModalOpened) {
      closeModal();
    }
    // });
    return () => {
      // unsubscribe();
    };
  }, [state.routeWhenModalOpened, state.isOpen, closeModal]);

  return (
    <ModalContext.Provider
      value={[
        state,
        {
          openModal,
          openFullSlideModal,
          openHalfSlideModal,
          openDraggableModal,
          closeModal,
        },
      ]}
    >
      {state.isOpen && (
        <Modal
          open={true}
          onClose={closeModal}
          variant={state.variant}
          options={state.options}
          getPaperStyles={state.getPaperStyles}
          getContainerStyles={state.getContainerStyles}
          titleText={state.titleText}
          Title={Title}
          CloseButton={CloseButton}
          ariaLabel={state?.ariaLabel}
        >
          {state.body}
        </Modal>
      )}
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
