import { LoggerContext } from './lib/logger';
import { DecoratedInstance } from './lib/interfaces/decoratedInstance';
import { LogFunctionMap } from './lib/interfaces/logFunctionMap';

export * as Theme from './themes';
export { MessageConstructionStrategy } from './lib/enums/messageConstructionStrategy';
export { expressMiddleware } from './express';

declare global {
  interface Console extends DecoratedInstance {}
}

export const CustomInstance = (implementation: LogFunctionMap | LogFunctionMap[]) => {
  const instance = new LoggerContext(implementation);
  return instance.decorate.bind(instance) as typeof instance.decorate;
}

export const betterLogging =  CustomInstance(console);
export default betterLogging;
