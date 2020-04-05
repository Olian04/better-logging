/**
 * This really should be its own library.
 * I always end up writing this piece of code in my projects....
 */
type Func = (...args: any[]) => any;
export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? (T[P] extends Func ? T[P] : DeepPartial<T[P]>) : T[P];
};