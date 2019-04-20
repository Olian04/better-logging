import { EventSystemConfig } from './extensions/core/event-system/types';
import { LineMethod } from './extensions/core/line-method/types';
import { LogLevel } from './extensions/core/loglevel/types';

declare global {
  interface Console extends 
    LineMethod, 
    LogLevel
    { }
}

interface IConfig extends EventSystemConfig {
  use: IExtension[];
}

interface IExtension {
  name: string;
  dependencies: string[];
  create(config: object): void;
  install(app: object, hostObj: object): void;
  finalize(app: object, hostObj: object): void;
}

type BetterLogging = (hostObj: object, config?: Partial<IConfig>) => void;
type CustomLoggerInstance = (instanceExtensions?: IExtension[]) => BetterLogging;

export const CustomInstance: CustomLoggerInstance;
export const betterLogging: BetterLogging;
export default betterLogging;
