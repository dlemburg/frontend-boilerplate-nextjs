import { parseActionRouteParams } from '../util/util';

export const useParseActionRouteParams = <T>(): T => {
  const params = parseActionRouteParams((window.location.search as any) || {}) as any;

  return params || {};
};

export default useParseActionRouteParams;
