import chalk from 'chalk';
import { useValueOrFallback } from '@olian/typescript-helpers';
import { DecoratedInstance } from '../lib/interfaces/decoratedInstance';
import { LogFunction } from '../lib/types/logFunction';
import { Color } from '../lib/types/color';
import { ConfigCache } from '../lib/configCache';

export interface IMiddlewareConfigProperty {
  order?: number;
  show?: boolean;
  color?: Color;
}
export interface IConfig {
  method: IMiddlewareConfigProperty;
  ip: IMiddlewareConfigProperty;
  path: IMiddlewareConfigProperty;
  body: IMiddlewareConfigProperty;
  header: IMiddlewareConfigProperty;
}

interface IExpressRequest {
  ip: string;
  path: string;
  body: string;
  method: string;
  headers: object;
}

export const expressMiddleware = (
  hostObjOrLogFunction: DecoratedInstance | LogFunction,
  config: Partial<IConfig> = {}
) => {
  const logFunction =
    typeof hostObjOrLogFunction === 'function'
      ? hostObjOrLogFunction
      : hostObjOrLogFunction?.info;

  const betterLoggingConfig = ConfigCache.getConfig(logFunction);

  if (logFunction === undefined || betterLoggingConfig === null) {
    throw new Error(
      'BetterLogging.expressMiddleware requires its first argument to be either an object decorated by betterLogging, or a logging function that belongs to an object decorated by betterLogging.'
    );
  }

  const { color } = betterLoggingConfig;

  return (
    req: IExpressRequest,
    res: unknown,
    next: (...args: unknown[]) => unknown
  ) => {
    const method = {
      order: useValueOrFallback(config.method, 'order', 1),
      show: useValueOrFallback(config.method, 'show', true),
      color: useValueOrFallback(config.method, 'color', color.base),
      value: useValueOrFallback(req, 'method', ''),
    };
    const ip = {
      order: useValueOrFallback(config.ip, 'order', 2),
      show: useValueOrFallback(config.ip, 'show', true),
      color: useValueOrFallback(config.ip, 'color', color.base),
      value: useValueOrFallback(req, 'ip', ''),
    };
    const path = {
      order: useValueOrFallback(config.path, 'order', 3),
      show: useValueOrFallback(config.path, 'show', true),
      color: useValueOrFallback(config.path, 'color', chalk.reset),
      value: useValueOrFallback(req, 'path', ''),
    };
    const body = {
      order: useValueOrFallback(config.body, 'order', 4),
      show: useValueOrFallback(config.body, 'show', false),
      color: useValueOrFallback(config.body, 'color', chalk.reset),
      value: useValueOrFallback(req, 'body', ''),
    };
    const header = {
      order: useValueOrFallback(config.header, 'order', 5),
      show: useValueOrFallback(config.header, 'show', false),
      color: useValueOrFallback(config.header, 'color', chalk.reset),
      value: useValueOrFallback(req, 'headers', {}),
    };
    logFunction(
      [method, ip, path, body, header]
        .filter((a) => a.show)
        .sort((a, b) => a.order - b.order)
        .map((obj) =>
          obj.color(
            `${
              typeof obj.value === 'object'
                ? JSON.stringify(obj.value)
                : obj.value
            }`
          )
        )
        .filter((v) => v.length > 0)
        .join(' ')
    );
    next();
  };
};
