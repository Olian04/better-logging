import fs from 'fs';
import path from 'path';
import { LogFunctionMap } from './interfaces/logFunctionMap';
import { DecoratedInstance } from './interfaces/decoratedInstance';
import { LogType } from './types/logType';
import { LogFunction } from './types/logFunction';
import { Config }  from './config';
import { formatMessage } from './formatMessage';
import { writeLogToFile }  from './writeToFile';

export const decorateObject = <T extends object>(target: T, implementation: LogFunctionMap, config: Config): T & DecoratedInstance => {
  const targetObject = target as T & DecoratedInstance;
  targetObject.logLevel = 3;

  if (config.saveToFile !== null) {
    const dirPath = path.parse(config.saveToFile).dir;
    if (dirPath !== '') {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  const funcFactory = (type: LogType): LogFunction => (msg: string, ...args: unknown[]) => {
    const [message, remainingArgs] = formatMessage(type, config, [msg, ...args]);

    if (config.saveToFile !== null) {
      writeLogToFile(config.saveToFile, message, remainingArgs);
    }

    if (targetObject.logLevel < config.logLevels[type]) {
      // Don't emit a log if the logLevel is lower than the configured logLevel for the current type
      return;
    }
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