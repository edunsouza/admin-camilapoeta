export const debounce = (fn: CallableFunction, timeout = 300) => {
  let timer: number;
  return (...args: unknown[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), timeout);
  };
};