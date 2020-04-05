import { LogFunction } from '../types/logFunction';

export interface LogFunctionMap {
  log: LogFunction;
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
}