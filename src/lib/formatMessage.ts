import safeStringify from 'fast-safe-stringify';
import { Color } from './types/color';
import { Config } from './config';
import { LogType } from './types/logType';
import { MessageConstructionStrategy } from './enums/messageConstructionStrategy';

const constructFormattingContext = (logType: LogType, config: Config, message: string) => {
  const typeColor = config.color.type[logType];
  const STAMP = (innerContent: string, innerColor: Color = config.color.base) => {
    const stamp = config.formatStamp(innerColor(innerContent))
    return config.color.base(stamp);
  }
  return ({
    msg: message,
    type: STAMP(logType, typeColor),
    time24: STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })),
    time12: STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })),
    date: STAMP(new Date().toLocaleString('en-UK', { year: 'numeric', month: 'numeric', day: 'numeric' })),
    unix: STAMP('' + new Date().valueOf()),
    STAMP: (content: string | number, color?: Color) => STAMP(`${content}`, color),
  });
};

const constructMessage = (strategy: MessageConstructionStrategy, args: unknown[]): [string, unknown[]] => {
  const processArgument =  (arg: unknown): string => {
    if (typeof arg === 'object') {
      return safeStringify(arg);
    }
    return `${arg}`;
  };

  if (strategy === MessageConstructionStrategy.NONE) {
    return ['', args];
  }
  if (strategy === MessageConstructionStrategy.FIRST) {
    const [ first, ...rest ] = args;
    return [processArgument(first), rest];
  }
  if (strategy === MessageConstructionStrategy.ALL) {
    return [args.map(processArgument).join(' '), []];
  }
  throw new Error(`Unknown MessageConstructionStrategy: ${strategy}`);
};

export const formatMessage = (logType: LogType, config: Config, args: unknown[]): [string, unknown[]] => {
  const [rawMessage, remainingArgs] = constructMessage(config.messageConstructionStrategy, args);
  const formattingContext = constructFormattingContext(logType, config, rawMessage);
  const formattedMessage = config.format(formattingContext);
  return [formattedMessage, remainingArgs];
}
