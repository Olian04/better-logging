import { LogFunctionMap  } from './interfaces/logFunctionMap';
import { DecoratedInstance } from './interfaces/decoratedInstance';
import { decorateObject } from './decorateObject';
import { PartialConfig, resolveConfig } from './config';
import { FileSystem } from './interfaces/fileSystem';

export class LoggerContext {
  private implementation: LogFunctionMap;
  constructor(
    implementation: LogFunctionMap | LogFunctionMap[],
    private fs: FileSystem,
  ) {
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

    const implementationArray = [implementation].flatMap(v => v)
      .map(impl => ({
        // Dereference implementation objects
        log: impl.log,
        info: impl.info,
        warn: impl.warn,
        error: impl.error,
        debug: impl.debug,
      }));

    const handler = (type: keyof LogFunctionMap) => (...args: unknown[]) => {
      implementationArray.forEach(impl => {
        const func = impl[type];
        func(...args);
      });
    };

    this.implementation = {
        log: handler('log'),
        info: handler('info'),
        warn: handler('warn'),
        error: handler('error'),
        debug: handler('debug'),
    };
  }
  decorate<T extends object>(target: T, config: PartialConfig = {}): target is (T & DecoratedInstance) {
    const patchedConfig = resolveConfig(config);
    decorateObject(target, this.implementation, this.fs, patchedConfig);
    return true;
  }
}
