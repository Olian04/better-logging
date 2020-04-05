import { LogFunctionMap } from './interfaces/logFunctionMap';
import { DecoratedInstance } from './interfaces/decoratedInstance';
import { LogType } from './types/logType';
import { LogFunction } from './types/logFunction';
import { Config }  from './config';
import { formatMessage } from './formatMessage';

export const decorateObject = <T extends object>(target: T, implementation: LogFunctionMap, config: Config): T & DecoratedInstance => {
  const targetObject = target as T & DecoratedInstance;
  targetObject.logLevel = 3;

  const funcFactory = (type: LogType): LogFunction => (msg: string, ...args: unknown[]) => {
    if (targetObject.logLevel < config.logLevels[type]) {
      // Don't emit a log if the logLevel is lower than the configured logLevel for the current type
      return;
    }
    const [message, remainingArgs] = formatMessage(type, config, [msg, ...args]);
    implementation[type](message, ...remainingArgs);
  };

  targetObject.log  = funcFactory('log');
  targetObject.debug  = funcFactory('debug');
  targetObject.error  = funcFactory('error');
  targetObject.info  = funcFactory('info');
  targetObject.warn  = funcFactory('warn');
  targetObject.line = (msg: string, ...args: unknown[]) => {
    if (targetObject.logLevel < config.logLevels.line) {
      // Don't emit a log if the logLevel is lower than the configured logLevel for "line"
      return;
    }
    implementation.log(msg, ...args);
  };

  return targetObject;
}