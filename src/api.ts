import { LoggerContext } from './lib/logger';
import { DecoratedInstance } from './lib/interfaces/decoratedInstance';
import { LogFunctionMap } from './lib/interfaces/logFunctionMap';

export { expressMiddleware } from './express/middleware';

declare global {
  interface Console extends DecoratedInstance {}
}

export const CustomInstance = (implementation: LogFunctionMap) => {
  const instance = new LoggerContext(implementation);
  return instance.decorate.bind(instance) as typeof instance.decorate;
}

export default CustomInstance(console);

