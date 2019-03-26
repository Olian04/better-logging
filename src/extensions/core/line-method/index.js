//@ts-check
module.exports = () => ({
  name: `core-line-method`,
  dependencies: ["core-argument-formatter", "core-event-system", "core-loglevel"],
  nativeImplementation: null,
  create(config) {},
  install(app, hostObj) {
    this.nativeImplementation = hostObj.log;
    hostObj.line = (...args) => {
      const msg = app.preprocessArgs(args);
      this.nativeImplementation(msg);
      app.emit("logEmitted", { type: 'line', msg, args });
    };
  },
  finalize(app, hostObj) {}
});
