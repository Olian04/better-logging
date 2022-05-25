import { Config } from './config';
import { DecoratedInstance } from './interfaces/decoratedInstance';
import { LogFunction } from './types/logFunction';

const configs = new WeakMap<LogFunction, Config>();

const setConfig = (key: DecoratedInstance | LogFunction, config: Config) => {
  if (typeof key === 'function') {
    configs.set(key, config);
    return;
  }
  const { debug, error, info, line, log, warn } = key;
  setConfig(debug, config);
  setConfig(error, config);
  setConfig(info, config);
  setConfig(line, config);
  setConfig(log, config);
  setConfig(warn, config);
};

const getConfig = (key: DecoratedInstance | LogFunction): Config | null => {
  if (typeof key === 'function') {
    return configs.get(key) ?? null;
  }
  return configs.get(key.info) ?? null;
};

export const ConfigCache = { setConfig, getConfig };
