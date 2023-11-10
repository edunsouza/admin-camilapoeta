export const shallowEqual = <T extends object>(a: T, b: T) => {
  const keys = [...Object.keys(a), ...Object.keys(b)];
  for (const k of keys) {
    if (a[k as keyof T] !== b[k as keyof T]) {
      return false;
    }
  }
  return true;
};

export const getDefinedKeys = <T extends object>(a: T) => {
  const draft = { ...a };
  (Object.keys(draft) as (keyof T)[]).forEach(k => draft[k] === undefined && delete draft[k]);
  return draft;
};

export const getChanges = <T extends object>(original: T, draft: T) => {
  const updates: Partial<T> = {};
  Object.keys(draft).forEach(key => {
    if (original[key as keyof T] !== draft[key as keyof T]) {
      updates[key as keyof T] = draft[key as keyof T]
    }
  });
  return updates;
}