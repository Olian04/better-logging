//@ts-check
module.exports = () => ({
  name: 'core-argument-formatter',
  dependencies: [ 'core-ansii-color' ],
  format:  ctx => `${ctx.time24} ${ctx.type} ${ctx.msg}`,
  argPreprocessor: arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }
    return arg;
  },
  create(config) {

  },
  install(app, hostObj) {
    app.STAMP = (innerContent, innerColor = app.color.RESET) => app.color.base('[') + innerColor(innerContent) + app.color.base(']');
    app.preprocessArgs = (args) => args.map(this.argPreprocessor).join(' ');
    app.format = (type, typeColor, args = []) => this.format({
      msg: app.preprocessArgs(args),
      time24: app.STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }), app.color.base),
      time12: app.STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }), app.color.base),
      type: app.STAMP(type, typeColor),
      date: app.STAMP(new Date().toLocaleString('en-UK', { year: 'numeric', month: 'numeric', day: 'numeric', hour12: true }), app.color.base),
      unix: app.STAMP(new Date().valueOf(), app.color.base),
      STAMP: app.STAMP
    }); 
  },
  finalize(app, hostObj) {}
});
