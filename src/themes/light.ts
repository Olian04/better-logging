import chalk from 'chalk';
import { Theme } from '../lib/interfaces/theme';

export const theme: Theme = {
  base: chalk.whiteBright,
  type: {
    log: chalk.white,
    info: chalk.whiteBright,
    warn: chalk.yellowBright,
    error: chalk.redBright,
    debug: chalk.cyan,
  },
};
