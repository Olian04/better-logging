const { copyIfFound } = require('../../../helpers');

//@ts-check
module.exports = () => ({
  name: "core-loglevel",
  dependencies: ["core-event-system"],
  logLevel: 3,
  create(config) {
    copyIfFound(this, config, 'loglevel');
  },
  install(app, hostObj) {
    Object.defineProperty(hostObj, "loglevel", {
      get: () => this.logLevel,
      set: value => {
        const old = this.logLevel;
        this.logLevel = value;
        app.emit("loglevelChange", {
          old: old,
          new: this.logLevel
        });
      }
    });
  },
  finalize(app, hostObj) {}
});
