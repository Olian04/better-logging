import { ArgumentFormatter } from './extensions/core/argument-formatter/types';
import { EventSystem } from './extensions/core/event-system/types';
import { LineMethod } from './extensions/core/line-method/types';
import { LogLevel } from './extensions/core/loglevel/types';
import { MethodOverride } from './extensions/core/method-override/types';

declare global {
  interface Console extends 
    ArgumentFormatter,
    EventSystem,
    LineMethod, 
    LogLevel, 
    MethodOverride
    { }
}

interface IExtension {
  name: string;
  dependencies: string[];
  create(config: object): void;
  install(app: object, hostObj: object): void;
  finalize(app: object, hostObj: object): void;
}

interface IConfig {
  use: IExtension[];
  [key: string]: any;
}

type BetterLogging = (hostObj: object, config?: Partial<IConfig>) => void;
type CustomLoggerInstance = (instanceExtensions?: IExtension[]) => BetterLogging;

export const CustomInstance: CustomLoggerInstance;
export const betterLogging: BetterLogging;
export default betterLogging;
