import { useReducer } from 'react';
import { useEffect } from 'react';
import { parseQueryParams } from '../util/query-params-util';
import { getModalActionKey, getModalRouteActionValue, RouteAction, parseActionRouteParams } from '../util/util';
import useModal from './use-modal';

type Action = { type: 'NOTIFY_ROUTE_ACTION_MODAL_LISTENER'; payload: string };
type UseRouteActionState = {
  action: string | null;
  type: string | null;
};

type UseRouteActionCallbackArgs = UseRouteActionState & {
  params: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseRouteActionCallback = (args: UseRouteActionCallbackArgs) => any;

export const useRouteAction = (callback: UseRouteActionCallback): void => {
  const [ui] = useModal();
  const { action: routeAction } = parseQueryParams(window.location.search) || {};

  /** using dispatch here to have current ref of 'callback' */
  const reducer = (state: UseRouteActionState, action: Action): UseRouteActionState => {
    switch (action.type) {
      case 'NOTIFY_ROUTE_ACTION_MODAL_LISTENER': {
        const payload = {
          action: getModalRouteActionValue(action.payload),
          type: RouteAction.MODAL_TYPE,
          params: parseActionRouteParams(window.location.search),
        };

        callback && callback(payload);
        return payload;
      }
      default:
        return { action: null, type: null };
    }
  };
  const [state, dispatch] = useReducer<React.Reducer<UseRouteActionState, Action>>(reducer, {
    action: null,
    type: null,
  });

  useEffect(() => {
    if (routeAction && state.action !== routeAction) {
      if (routeAction.includes(getModalActionKey()) && !ui.isOpen && !ui.isRouteActionChanging) {
        dispatch({
          type: 'NOTIFY_ROUTE_ACTION_MODAL_LISTENER',
          payload: Array.isArray(routeAction) ? routeAction.join(',') : routeAction,
        });
      }
      /**
       * ...more potential non-modal actions here...
       */
    }
  }, [routeAction, ui.isOpen, ui.isRouteActionChanging, state.action]);
};

export default useRouteAction;
