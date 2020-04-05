import { LogFunctionMap  } from './interfaces/logFunctionMap';
import { DecoratedInstance } from './interfaces/decoratedInstance';
import { decorateObject } from './decorateObject';
import { PartialConfig, resolveConfig } from './config';

export class LoggerContext {
  private implementation: LogFunctionMap;
  constructor(implementation: LogFunctionMap) {
    this.implementation = {
      log: implementation.log,
      info: implementation.info,
      warn: implementation.warn,
      error: implementation.error,
      debug: implementation.debug,
    };
  }
  decorate<T extends object>(target: T, config: PartialConfig = {}): target is (T & DecoratedInstance) {
    const patchedConfig = resolveConfig(config);
    decorateObject(target, this.implementation, patchedConfig);
    return true;
  }
}