//@ts-check
module.exports = ({type, implementationKey }) => ({
  name: `core-${type}-override`,
  dependencies: ["core-argument-formatter", "core-event-system", "core-loglevel", "core-line-method", 'core-ansii-color'],
  nativeImplementation: null,
  create(config) {},
  install(app, hostObj) {
    this.nativeImplementation = hostObj[implementationKey];
    hostObj[implementationKey] = (...args) => {
      const msg = app.format(type, app.color.type[type], args);
      this.nativeImplementation(msg);
      app.emit("logEmitted", { type, msg, args });
    };
  },
  finalize(app, hostObj) {}
});
