import { KeyboardEvent, useCallback, useEffect, useState } from 'react';

type TabIndex = number;
type TabIndexDispatch = {
  setTabIndexOnKeyUp: (event: KeyboardEvent) => void;
  setTabIndex: (value: number) => void;
};
type UseTabIndex = [TabIndex, TabIndexDispatch];

const useTabIndex = (): UseTabIndex => {
  const [tabIndex, setTabIndex] = useState(-1);

  const setTabIndexOnKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setTabIndex(0);
      }
    },
    [setTabIndex]
  );

  useEffect(() => {
    return () => setTabIndex(-1);
  }, [setTabIndex]);

  return [tabIndex, { setTabIndexOnKeyUp, setTabIndex }];
};

export default useTabIndex;
