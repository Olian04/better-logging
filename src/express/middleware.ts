import { DecoratedInstance } from '../lib/interfaces/decoratedInstance';
import { Color } from '../lib/types/color';
import { DefaultConfig } from '../lib/config';
import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

interface IMiddlewareConfigProperty {
  show?: boolean;
  color?: Color;
}
interface IConfig {
  ip: IMiddlewareConfigProperty;
  path: IMiddlewareConfigProperty;
  body: IMiddlewareConfigProperty;
  header: IMiddlewareConfigProperty;
}

const useValueOrFallback = <T extends object, K extends keyof T, F extends T[K]>(obj: T, key: K, fallback: F) =>
  obj ? obj[key] || fallback : fallback;

export const expressMiddleware = (hostObj: DecoratedInstance, config: Partial<IConfig> = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (hostObj === undefined || hostObj.line === undefined) {
      throw new Error('BetterLogging.expressMiddleware requires an object decorated by betterLogging as its first argument.');
    }
    const ip = {
      show: useValueOrFallback(config.ip, 'show', true),
      color: useValueOrFallback(config.ip, 'color', DefaultConfig.color.base),
      value: useValueOrFallback(req, 'ip', ''),
    }
    const path = {
      show: useValueOrFallback(config.path, 'show', true),
      color: useValueOrFallback(config.path, 'color', chalk.reset),
      value: useValueOrFallback(req, 'path', ''),
    }
    const body = {
      show: useValueOrFallback(config.body, 'show', false),
      color: useValueOrFallback(config.body, 'color', chalk.reset),
      value: useValueOrFallback(req, 'body', ''),
    }
    const header = {
      show: useValueOrFallback(config.header, 'show', false),
      color: useValueOrFallback(config.header, 'color', chalk.reset),
      value: useValueOrFallback(req, 'headers', undefined),
    }
    hostObj.info(
      [ip, path, body, header]
        .map(obj => !obj.show ? '' : obj.color(`${
          typeof obj.value === 'object'
            ? JSON.stringify(obj.value)
            : obj.value
        }`))
        .join(' ')
    );
    next();
  };