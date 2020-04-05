import chalk from 'chalk';
import { Record } from './util/record';
import { DeepPartial } from './util/deepPartial';
import { FormattingContext } from './interfaces/formatting.context';
import { MessageConstructionStrategy } from './enums/messageConstructionStrategy';
import { Color } from './types/color';

export class Config extends Record<Config> {
  public readonly messageConstructionStrategy: MessageConstructionStrategy;
  public readonly format: (ctx: FormattingContext) => string;
  public readonly logLevels: {
    readonly debug: number;
    readonly log: number;
    readonly info: number;
    readonly line: number;
    readonly warn: number;
    readonly error: number;
  };
  public readonly color: {
    readonly base: Color,
    readonly type: {
      readonly debug: Color,
      readonly info: Color,
      readonly log: Color,
      readonly error: Color,
      readonly warn: Color,
    }
  };
}

export type PartialConfig = DeepPartial<Config>;

export const DefaultConfig = new Config({
  messageConstructionStrategy: MessageConstructionStrategy.ALL,
  format: ctx => `${ctx.time24} ${ctx.type} ${ctx.msg}`,
  logLevels: {
    debug: 4,
    log: 3,
    info: 2,
    line: 1,
    warn: 1,
    error: 0
  },
  color: {
    base: chalk.gray,
    type: {
      debug: chalk.cyan,
      info: chalk.gray,
      log: chalk.whiteBright,
      error: chalk.yellowBright,
      warn: chalk.blue,
    }
  }
});

export const resolveConfig = (config: PartialConfig) => new Config({
  messageConstructionStrategy: config.messageConstructionStrategy || DefaultConfig.messageConstructionStrategy,
  format: config.format || DefaultConfig.format,
  color: !config.color ?  DefaultConfig.color : {
    base: config.color.base || DefaultConfig.color.base,
    type: {
      debug: config.color.type.debug || DefaultConfig.color.type.debug,
      error: config.color.type.error || DefaultConfig.color.type.error,
      info: config.color.type.info || DefaultConfig.color.type.info,
      log: config.color.type.log || DefaultConfig.color.type.log,
      warn: config.color.type.warn || DefaultConfig.color.type.warn,
    }
  },
  logLevels: !config.logLevels ? DefaultConfig.logLevels : {
    debug: config.logLevels.debug || DefaultConfig.logLevels.debug,
    error: config.logLevels.error || DefaultConfig.logLevels.error,
    info: config.logLevels.info || DefaultConfig.logLevels.info,
    log: config.logLevels.log || DefaultConfig.logLevels.log,
    warn: config.logLevels.warn || DefaultConfig.logLevels.warn,
    line: config.logLevels.line || DefaultConfig.logLevels.line,
  }
});
