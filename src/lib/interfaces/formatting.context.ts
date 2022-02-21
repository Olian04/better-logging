import { Color } from '../types/color';

export interface FormattingContext {
  msg: string;
  time24: string;
  time12: string;
  type: string;
  date: string;
  unix: string;
  STAMP: (content: string | number, color?: Color) => string;
}
