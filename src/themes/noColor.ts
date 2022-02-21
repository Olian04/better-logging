import chalk from 'chalk';
import { Theme } from '../lib/interfaces/theme';

const identity = chalk;

export const theme: Theme = {
  base: identity,
  type: {
    log: identity,
    info: identity,
    warn: identity,
    error: identity,
    debug: identity,
  }
};
