import { LogFunctionMap } from './logFunctionMap';
import { LogFunction } from '../types/logFunction';

export interface DecoratedInstance extends LogFunctionMap {
  line: LogFunction;
  logLevel: number;
}
