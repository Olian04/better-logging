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
    .map(extension => {
      // Create extensions
      extension.create(config);
      return extension;
    })
    .map((extension, i) => {
      // Resolve dependencies
      extension.dependencies.forEach(dep => {
        const depLoadPosition = extensions.findIndex(ext => ext.name === dep);
        if (depLoadPosition < 0) {
          // TODO: This could be automatically resolved in some cases. 
          throw new Error(`"${extension.name}" requires extension "${dep}" to be loaded`);
        } else if (depLoadPosition > i) {
          throw new Error(`"${extension.name}" requires extension "${dep}" to be loaded prior to it self`);
        } else if (depLoadPosition === i) {
          throw new Error(`"${extension.name}" can not depend on it self`);
        }
      });
      return extension;
    })
    .map(extension => {
      // Install extensions
      extension.install(app, hostObj);
      return extension;
    })
    .map(extension => {
      // Finalize extensions
      extension.finalize(app, hostObj);
      return extension;
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

