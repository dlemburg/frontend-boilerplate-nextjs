import { useEffect, useRef, useState } from 'react';

const useFocus = (dependancies: any[] = []) => {
  const ref = useRef();
  const [focusRef, setFocusRef] = useState<React.MutableRefObject<any>>();

  useEffect(() => {
    if (ref) setFocusRef(ref);
    if (focusRef) {
      focusRef.current?.focus();
    }
  }, [setFocusRef, focusRef, ...dependancies]);

  return [focusRef, setFocusRef];
};

export default useFocus;
