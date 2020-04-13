import { Color } from '../types/color';

export interface Theme {
  readonly base: Color,
  readonly type: {
    readonly debug: Color,
    readonly info: Color,
    readonly log: Color,
    readonly error: Color,
    readonly warn: Color,
  }
}