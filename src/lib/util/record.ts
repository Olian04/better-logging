/**
 * This really should be its own library.
 * I always end up writing this piece of code in my projects....
 */
export class Record<T extends Record<T>> {
  constructor(e: T) {
    Object.keys(e).forEach((k) => {
      // @ts-ignore
      this[k] = e[k];
    });
  }
}