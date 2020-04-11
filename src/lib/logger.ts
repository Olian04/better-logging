import { LogFunctionMap  } from './interfaces/logFunctionMap';
import { DecoratedInstance } from './interfaces/decoratedInstance';
import { decorateObject } from './decorateObject';
import { PartialConfig, resolveConfig } from './config';

export class LoggerContext {
  private implementation: LogFunctionMap;
  constructor(implementation: LogFunctionMap) {
    /*
     We need to dereference the implementation object.
     Since we would end up in an infinite loop if
     the implementation object and the decorate target
     was the same object. As in the default usecase:

     const CustomInstance = (implementation) => {
       const instance = new LoggerContext(implementation);
       return instance.decorate.bind(instance);
     }
     const betterLogging = CustomInstance(console);
     betterLogging(console);
     console.log();

     Callstack (not really, but it hammers home the point):
          access         ::   call
     -> console.log :: console.log()
      -> implementation.log :: console.log()
       -> implementation.log :: console.log()
        -> implementation.log :: console.log()
         -> implementation.log :: console.log()
          ...
    */
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
