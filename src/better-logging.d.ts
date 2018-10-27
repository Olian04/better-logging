declare global {
  interface Console extends BetterLogging {}
}

export interface BetterLogging {
  debug(msg: string): void;
  log(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  line(msg?: string): void;
  loglevel: number;
  color: Colors;
}

export interface Colors {
  Black: '\033[0;30m',
  Blue: '\033[0;34m',
  Green: '\033[0;32m',
  Cyan: '\033[0;36m',
  Red: '\033[0;31m',
  Purple: '\033[0;35m',
  Brown: '\033[0;33m',
  Gray: '\033[0;37m',
  Dark_Gray: '\033[1;30m',
  Light_Blue: '\033[1;34m',
  Light_Green: '\033[1;32m',
  Light_Cyan: '\033[1;36m',
  Light_Red: '\033[1;31m',
  Light_Purple: '\033[1;35m',
  Yellow: '\033[1;33m',
  White: '\033[1;37m',
  RESET: '\033[0m'
}

export interface LoggerCTX {
  msg: string;
  time24: string;
  type: string;
}

export default function betterLogging<T>(hostObj: T, options?: {
  format?: (ctx: LoggerCTX) => string, 
  logLevels?: {
    debug?: number;
    log?: number;
    info?: number;
    line?: number;
    warn?: number;
    error?: number;
  },
  typeColors?: (color: Colors) => {
    debug?: string;
    log?: string;
    info?: string;
    line?: string;
    warn?: string;
    error?: string;
  },
  events: {
    onLogEmitted?: (log: string) => void,
  }[]
}): hostObj is T & BetterLogging