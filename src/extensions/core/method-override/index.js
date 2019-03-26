//@ts-check
module.exports = ({type, implementationKey, defaultTypeColor}) => ({
  name: `core-${type}-override`,
  dependencies: ["core-argument-formatter", "core-event-system", "core-loglevel", "core-line-method"],
  nativeImplementation: null,
  typeColor: '',
  create(config) {
    this.typeColor = defaultTypeColor;
  },
  install(app, hostObj) {
    this.nativeImplementation = hostObj[implementationKey];
    hostObj[implementationKey] = (...args) => {
      const msg = app.format(type, this.typeColor, args);
      this.nativeImplementation(msg);
      app.emit("logEmitted", { type, msg, args });
    };
  },
  finalize(app, hostObj) {}
});
