export const shallowEqual = <T extends object>(a: T, b: T) => {
  const keys = [...Object.keys(a), ...Object.keys(b)];
  for (const k of keys) {
    if (a[k as keyof T] !== b[k as keyof T]) {
      return false;
    }
  }
  return true;
};