import { Color } from '../types/color';

export interface FormattingContext {
  msg: string;
  time: string;
  type: string;
  date: string;
  unix: string;
  STAMP: (content: string | number, color?: Color) => string;
}
