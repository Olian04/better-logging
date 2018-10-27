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

const defaultConfig = {
  format: ctx => `${ctx.time24} ${ctx.type} ${ctx.msg}`,
  logLevels: {
    debug: 4,
    log: 3,
    info: 2,
    line: 1,
    warn: 1,
    error: 0
  },
  typeColors: (Color) => ({
    debug: Color.Cyan,
    log: Color.Dark_Gray,
    info: Color.White,
    warn: Color.Yellow,
    error: Color.Light_Red
  })
}
const eventListeners = {
  onLogEmitted: []
}
const emitEvent = (event, ...args) => {
  eventListeners[event].forEach(cb => cb(...args));
}
const prepareEvents = (events = []) => {
  events.forEach(ev => Object.keys(ev).forEach(k => {
    eventListeners[k] = [...(eventListeners[k] || []), ev[k]];
  }));
}
const prepareConfig = (options) => {
  const {events, ...userConfig} = options;
  prepareEvents(events);
  const config = {...defaultConfig, ...userConfig}; // fill any empty options with their defaults
  config.logLevels = {...defaultConfig.logLevels, ...userConfig.logLevels}; // needs to handle nested object individually
  config.typeColors = (Color) => ({...defaultConfig.typeColors(Color), ...(userConfig.typeColors ? userConfig.typeColors(Color) : {})}); // type of options.typeColors is a functions that takes a Color object and returns the same structure as defaultsOptions.typeColors
  return config;
}
const betterLogging = (() => {
  const { log, info, warn, error, debug } = console;
  const nativeImplementations = { log, info, warn, error, debug }; // TODO: Look up if this extra step is needed, i think i need to dereference the functions.... but do i? 
  return (hostObj, options = {}) => {
    const config = prepareConfig(options);
    const typeColors = config.typeColors(Color); // type of options.typeColors is a functions that takes a Color object and returns the same structure as defaultsOptions.typeColors
    hostObj.color = Color;
    hostObj.loglevel = 3;
    Object.keys(typeColors).forEach(key => {
      const stampColor = typeColors[key];
      hostObj[key] = (...args) => {
        if (hostObj.loglevel >= config.logLevels[key]) {
          const log = config.format({
            msg: (args || []).join(' '),
            time24: TIME(),
            type: STAMP(stampColor+key+Color.RESET)
          });
          nativeImplementations[key](log);
          emitEvent('onLogEmitted', log);
        }
      }
    });
    hostObj['line'] = (...args) => {
      if (hostObj.loglevel >= config.logLevels['line']) {
        const log = (args || []).join(' ');
        nativeImplementations.log(log);
        emitEvent('onLogEmitted', log);
      }
    }
    return true; // Used in TS as a type check
  }
})();

module.exports = betterLogging;
module.exports.default = betterLogging;
