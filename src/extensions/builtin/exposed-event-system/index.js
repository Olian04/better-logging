//@ts-check
module.exports = () => ({
  name: 'builtin-exposed-event-system',
  dependencies: [ 'core-event-system' ],
  create(config) {},
  install(app, hostObject) {
    hostObject.on = app.on;
    hostObject.off = app.off;
    hostObject.emit = app.emit;
  },
  finalize(app, hostObject) {}
});
