import { useEffect } from 'react';

export const useOnMount = (onMount: CallableFunction) =>
  useEffect(() => {
    const cleanUp = onMount?.();

    if (typeof cleanUp === 'function') {
      return cleanUp;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);