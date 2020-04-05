/**
 * This really should be its own library.
 * I always end up writing this piece of code in my projects....
 */
export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? (T[P] extends Function ? T[P] : DeepPartial<T[P]>) : T[P];
};