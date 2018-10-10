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

const STAMP = (inner) => `${Color.Dark_Gray}[${Color.RESET}${inner}${Color.Dark_Gray}]${Color.RESET}`;
const TIME = () => STAMP(`${Color.Dark_Gray}${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}${Color.RESET}`);

const defaultOptions = {
  format: ctx => `${ctx.time24} ${ctx.type} ${ctx.msg}`,
  onLogEmitted: log => {}
}
const betterLogging = (() => {
  const { log, info, warn, error, debug } = console;
  return (hostObj, options = {}) => {
    options = {...defaultOptions, ...options}; // fill any empty options with their defaults
    hostObj.color = Color;
    hostObj.loglevel = 3;
    const methods =  ({
      debug: {
        logLevel: 4, 
        nativeImplementation: debug, 
        stampColor: Color.Cyan
      },
      log: {
        logLevel: 3, 
        nativeImplementation: log, 
        stampColor: Color.Dark_Gray
      },
      info: {
        logLevel: 2, 
        nativeImplementation: info, 
        stampColor: Color.White
      },
      warn: {
        logLevel: 1, 
        nativeImplementation: warn, 
        stampColor: Color.Yellow
      },
      error: {
        logLevel: 0, 
        nativeImplementation: error, 
        stampColor: Color.Light_Red
      }
    });
    Object.keys(methods).forEach(key => {
      const { logLevel, nativeImplementation, stampColor } = methods[key];
      hostObj[key] = (...args) => {
        if (hostObj.loglevel >= logLevel) {
          const log = options.format({
            msg: (args || []).join(' '),
            time24: TIME(),
            type: STAMP(stampColor+key+Color.RESET)
          });
          nativeImplementation(log);
          options.onLogEmitted(log);
        }
      }
    });
    const line = {
      logLevel: 1, 
      nativeImplementation: log
    }
    hostObj['line'] = (...args) => {
      if (hostObj.loglevel >= line.logLevel) {
        const log = (args || []).join(' ');
        line.nativeImplementation(log);
        options.onLogEmitted(log);
      }
    }
    return true; // Used in TS as a type check
  }
})();

module.exports = betterLogging;
module.exports.default = betterLogging;
