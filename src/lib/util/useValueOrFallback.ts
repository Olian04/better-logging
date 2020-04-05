export const useValueOrFallback = <T extends object, K extends keyof T, F extends T[K]>(obj: T, key: K, fallback: F) =>
  obj ? (key in obj ? obj[key] : fallback) : fallback;
