//@ts-check
const {
  useArgumentFormatter,
  useEventSystem,
  useLoglevel,
  useMethodOverride,
  useLineMethod,
} = require("./extensions/core");

const LoggerInstance = (instanceExtensions = []) => (hostObj, config = {}) => {
  const app = {};
  const extensions = [...instanceExtensions, ...(config.use || [])];

  extensions
    .map(using => {
      // Create extensions
      using.create(config);
      return using;
    })
    .map((using, i) => {
      // Resolve dependencies
      using.dependencies.forEach(dep => {
        const depLoadPosition = extensions.findIndex(ext => ext.name === dep);
        if (depLoadPosition < 0) {
          // TODO: This could be automatically resolved in some cases. 
          throw new Error(`"${using.name}" requires extension "${dep}" to be loaded`);
        } else if (depLoadPosition > i) {
          throw new Error(`"${using.name}" requires extension "${dep}" to be loaded prior to it self`);
        } else if (depLoadPosition === i) {
          throw new Error(`"${using.name}" can not depend on it self`);
        }
      });
      return using;
    })
    .map(using => {
      // Install extensions
      using.install(app, hostObj);
      return using;
    })
    .map(using => {
      // Finalize extensions
      using.finalize(app, hostObj);
      return using;
    });
};

const defaultInstance = LoggerInstance([
  useEventSystem(),
  useArgumentFormatter(),
  useLoglevel(),
  useLineMethod(),
  useMethodOverride({
    type: 'log',
    implementationKey: 'log',
    defaultTypeColor: '\033[1;30m'
  }),
  useMethodOverride({
    type: 'info',
    implementationKey: 'info',
    defaultTypeColor: '\033[1;37m'
  }),
  useMethodOverride({
    type: 'warn',
    implementationKey: 'warn',
    defaultTypeColor: '\033[1;33m'
  }),
  useMethodOverride({
    type: 'error',
    implementationKey: 'error',
    defaultTypeColor: '\033[1;31m'
  }),
  useMethodOverride({
    type: 'debug',
    implementationKey: 'debug',
    defaultTypeColor: '\033[0;36m'
  }),
]);

module.exports = defaultInstance; // require('better-logging')(...)
module.exports.default = defaultInstance;  // import betterLogging from 'better-logging';
module.exports.betterLogging = defaultInstance; // import { betterLogging } from 'better-logging';

module.exports.CustomInstance = LoggerInstance;

