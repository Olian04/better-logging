const chalk = require('chalk').default;
const { copyIfFound } = require('../../../helpers');

//@ts-check
module.exports = () => ({
  name: 'core-ansii-color',
  dependencies: [],
  color: {
    RESET: chalk.reset,
    base: chalk.gray,
    type: {
      debug: chalk.cyan,
      info: chalk.gray,
      log: chalk.whiteBright,
      error: chalk.yellowBright,
      warn: chalk.blue,
    }
  },
  create(config) {    
    copyIfFound(this, config, 'color', 'base');
    copyIfFound(this, config, 'color', 'type', 'log');
    copyIfFound(this, config, 'color', 'type', 'info');
    copyIfFound(this, config, 'color', 'type', 'error');
    copyIfFound(this, config, 'color', 'type', 'warn');
    copyIfFound(this, config, 'color', 'type', 'debug');
  },
  install(app, hostObj) {
    app.color = this.color;
  },
  finalize(app, hostObj) {}
});
