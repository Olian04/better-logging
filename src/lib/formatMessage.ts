import safeStringify from 'fast-safe-stringify';
import { Color } from './types/color';
import { Config } from './config';
import { LogType } from './types/logType';
import { MessageConstructionStrategy } from './enums/messageConstructionStrategy';
import { FormattingContext } from './interfaces/formattingContext';

const constructFormattingContext = (
  logType: LogType,
  config: Config,
  message: string
): FormattingContext => {
  const typeColor = config.color.type[logType];
  const date = new Date();
  const isoDate = date.toISOString();

  const STAMP = (
    innerContent: string,
    innerColor: Color = config.color.base
  ) => {
    const stamp = config.formatStamp(innerColor(innerContent));
    return config.color.base(stamp);
  };

  return {
    msg: message,
    type: STAMP(logType, typeColor),
    date: STAMP(isoDate.substring(0, isoDate.indexOf('T'))),
    time: STAMP(
      isoDate.substring(isoDate.indexOf('T') + 1, isoDate.indexOf('Z'))
    ),
    unix: STAMP('' + date.valueOf()),
    STAMP: (content: string | number, color?: Color) =>
      STAMP(`${content}`, color),
  };
};

const constructMessage = (
  strategy: MessageConstructionStrategy,
  args: unknown[]
): [string, unknown[]] => {
  const processArgument = (arg: unknown): string => {
    if (typeof arg === 'object') {
      return safeStringify(arg);
    }
    return `${arg}`;
  };

  if (strategy === MessageConstructionStrategy.NONE) {
    return ['', args];
  }
  if (strategy === MessageConstructionStrategy.FIRST) {
    const [first, ...rest] = args;
    return [processArgument(first), rest];
  }
  if (strategy === MessageConstructionStrategy.ALL) {
    return [args.map(processArgument).join(' '), []];
  }
  throw new Error(`Unknown MessageConstructionStrategy: ${strategy}`);
};

export const formatMessage = (
  logType: LogType,
  config: Config,
  args: unknown[]
): [string, unknown[]] => {
  const [rawMessage, remainingArgs] = constructMessage(
    config.messageConstructionStrategy,
    args
  );
  const formattingContext = constructFormattingContext(
    logType,
    config,
    rawMessage
  );
  const formattedMessage = config.format(formattingContext);
  return [formattedMessage, remainingArgs];
};
