import chalk from 'chalk';
import { Theme } from '../lib/interfaces/theme';

export const theme: Theme = {
  base: chalk.gray,
  type: {
    log: chalk.gray,
    info: chalk.whiteBright,
    warn: chalk.yellowBright,
    error: chalk.redBright,
    debug: chalk.cyan,
  },
};
