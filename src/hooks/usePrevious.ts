import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T) => {
  const previous = useRef(value);
  
  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
};