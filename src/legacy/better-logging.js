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
  STAMP_COLOR: '',
  RESET: '\033[0m'
}

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
  typeColors: Color => ({
    debug: Color.Cyan,
    log: Color.Dark_Gray,
    info: Color.White,
    warn: Color.Yellow,
    error: Color.Light_Red
  }),
  stampColor: Color => Color.Dark_Gray,
  argProcessor: arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }
    return arg;
  }
}

const emitEvent = (eventListeners, event, ...args) => {
  eventListeners[event].forEach(cb => cb(...args));
}

const prepareEvents = (eventListeners, events = []) => {
  events.forEach(ev => Object.keys(ev).forEach(k => {
    eventListeners[k] = [...(eventListeners[k] || []), ev[k]];
  }));
}

const prepareConfig = (options, eventListeners) => {
  const {events, ...userConfig} = options;
  prepareEvents(eventListeners, events);
  const config = {...defaultConfig, ...userConfig}; // fill any empty options with their defaults
  config.logLevels = {...defaultConfig.logLevels, ...userConfig.logLevels}; // needs to handle nested object individually
  config.typeColors = (Color) => ({...defaultConfig.typeColors(Color), ...(userConfig.typeColors ? userConfig.typeColors(Color) : {})}); // type of options.typeColors is a functions that takes a Color object and returns the same structure as defaultsOptions.typeColors
  return config;
}

const betterLogging_internal = ({ log, info, warn, error, debug }) => {
  const nativeImplementations = { log, info, warn, error, debug }; // TODO: Look up if this extra step is needed, i think i need to dereference the functions.... but do i? 
  
  return (hostObj, options = {}) => {
    const eventListeners = {
      onLogEmitted: [],
      onLoglevelChanged: [],
    }
    const config = prepareConfig(options, eventListeners);
    const typeColors = config.typeColors(Color); // type of options.typeColors is a functions that takes a Color object and returns the same structure as defaultsOptions.typeColors
    const stampColor = config.stampColor(Color);
    hostObj.color = Color;
    hostObj.color.STAMP_COLOR = stampColor; // used in middleware

    let loglevel = 3;
    Object.defineProperty(hostObj, 'loglevel', { 
      set: (value) => {
        loglevel  = value;
        emitEvent(eventListeners, 'onLoglevelChanged', loglevel);
      },
      get: () => loglevel
    });


    const STAMP = (innerContent, innerColor = Color.RESET) => `${stampColor}[${innerColor}${innerContent}${stampColor}]${Color.RESET}`;

    Object.keys(typeColors).forEach(key => {
      hostObj[key] = (...args) => {
        if (hostObj.loglevel >= config.logLevels[key]) {
          const log = config.format({
            msg: (args || []).map(config.argProcessor).join(' '),
            time24: STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }), stampColor),
            time12: STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }), stampColor),
            type: STAMP(key, typeColors[key]),
            date: STAMP(new Date().toLocaleString('en-UK', { year: 'numeric', month: 'numeric', day: 'numeric', hour12: true }), stampColor),
            unix: STAMP(new Date().valueOf(), stampColor),
            STAMP: STAMP
          });
          nativeImplementations[key](log);
          emitEvent(eventListeners, 'onLogEmitted', log);
        }
      }
    });

    hostObj['line'] = (...args) => {
      if (hostObj.loglevel >= config.logLevels['line']) {
        const log = (args || []).map(config.argProcessor).join(' ');
        nativeImplementations.log(log);
        emitEvent(eventListeners, 'onLogEmitted', log);
      }
    }

    return true; // Used in TS as a type guard
  }
}

const betterLogging = betterLogging_internal(console);

module.exports = betterLogging;
module.exports.default = betterLogging;
module.exports.CustomInstance = betterLogging_internal;

module.exports.expressMiddleware = (hostObj, config = {}) => (req, res, next) => {
  if (hostObj === undefined || hostObj.line === undefined) {
    throw new Error('betterLogging#expressMiddleware requires an object decorated by betterLogging as its first argument.');
  }
  const useValueOrFallback = (obj, key, fallback) => obj ? obj[key] || fallback : fallback;
  const ip = {
    show: useValueOrFallback(config.ip, 'show', true),
    color: useValueOrFallback(config.ip, 'color', hostObj.color.STAMP_COLOR),
    value: req.ip || ''
  }
  const path = {
    show: useValueOrFallback(config.path, 'show', true),
    color: useValueOrFallback(config.path, 'color', hostObj.color.RESET),
    value: req.path || ''
  }
  const body = {
    show: useValueOrFallback(config.body, 'show', false),
    color: useValueOrFallback(config.body, 'color', hostObj.color.RESET),
    value:  req.body || ''
  }
  const header = {
    show: useValueOrFallback(config.header, 'show', false),
    color: useValueOrFallback(config.header, 'color', hostObj.color.RESET),
    value: req.headers || ''
  }
  hostObj.info(
    [ip, path, body, header]
      .map(obj => obj.show 
        ? `${obj.color}${
          typeof obj.value === 'object'
            ? JSON.stringify(obj.value)
            : obj.value 
        }${hostObj.color.RESET}` 
        : '')
      .join(' ')
  );
  next();
};
