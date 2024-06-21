import { useEffect, RefObject } from 'react';

const useAutoFocus = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
};

export default useAutoFocus;
