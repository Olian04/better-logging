import chalk from 'chalk';
import { Theme } from '../lib/interfaces/theme';

export const theme: Theme = {
  base: chalk.greenBright,
  type: {
    log: chalk.greenBright,
    info: chalk.whiteBright,
    warn: chalk.yellowBright,
    error: chalk.redBright,
    debug: chalk.cyan,
  }
}