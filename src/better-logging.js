// @ts-check
///<reference path="./better-logging.d.ts"/>

const Color = {
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

const TIME = () => STAMP(`${Color.Dark_Gray}${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}${Color.RESET}`);
const STAMP = (inner) => `${Color.Dark_Gray}[${Color.RESET}${inner}${Color.Dark_Gray}]${Color.RESET}`;

const betterLogging = (() => {
  const { log, info, warn, error, debug } = console;
  return (hostObj, format = {}) => {
    format = {
      none: msg => msg,
      debug: msg => `${TIME()} ${STAMP(Color.Cyan+'debug'+Color.RESET)} ${msg}`,
      log: msg => `${TIME()} ${STAMP(Color.Dark_Gray+'log'+Color.RESET)} ${msg}`,
      info: msg => `${TIME()} ${STAMP(Color.White+'info'+Color.RESET)} ${msg}`,
      warn: msg => `${TIME()} ${STAMP(Color.Yellow+'warning'+Color.RESET)} ${msg}`,
      error: msg => `${TIME()} ${STAMP(Color.Light_Red+'error'+Color.RESET)} ${msg}`,
      ...format
    };
    hostObj.color = Color;
    hostObj.loglevel = 3;
    [
      { key: 'line', level: 1, func: log, format: format.none },
      { key: 'debug', level: 4, func: debug, format: format.debug },
      { key: 'log', level: 3, func: log, format: format.log },
      { key: 'info', level: 2, func: info, format: format.info },
      { key: 'warn', level: 1, func: warn, format: format.warn },
      { key: 'error', level: 0, func: error, format: format.error }
    ].forEach(({key, level, func, format}) => {
      hostObj[key] = (...args) => {
        if (hostObj.loglevel >= level) {
          func(format((args || []).join(' ')));
        }
      }
    });
    return true; // Used in TS as a type check
  }
})();

module.exports = betterLogging;
