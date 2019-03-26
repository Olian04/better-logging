//@ts-check
module.exports = () => ({
  name: "core-loglevel",
  dependencies: ["core-event-system"],
  logLevel: 0,
  create(config) {
    this.logLevel = config.loglevel || 3;
  },
  install(app, hostObj) {
    Object.defineProperty(hostObj, "loglevel", {
      get: () => this.logLevel,
      set: value => {
        const old = this.logLevel;
        this.logLevel = value;
        app.emit("onLoglevelChange", {
          old: old,
          new: this.logLevel
        });
      }
    });
  },
  finalize(app, hostObj) {}
});
