//@ts-check
module.exports = () => ({
  name: "core-argument-formatter",
  dependencies: [],
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
    // FIXME: Remove the tmp object. Maybe they should be its own extension? "ansi-color"?
    const tmp = {
      RESET: '\033[0m',
      stampColor: '\033[1;30m'
    }
    app.STAMP = (innerContent, innerColor = tmp.RESET) => `${tmp.stampColor}[${innerColor}${innerContent}${tmp.stampColor}]${tmp.RESET}`;
    app.preprocessArgs = (args) => args.map(this.argPreprocessor).join(' ');
    app.format = (type, typeColor, args = []) => this.format({
      msg: app.preprocessArgs(args),
      time24: app.STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }), tmp.stampColor),
      time12: app.STAMP(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }), tmp.stampColor),
      type: app.STAMP(type, typeColor),
      date: app.STAMP(new Date().toLocaleString('en-UK', { year: 'numeric', month: 'numeric', day: 'numeric', hour12: true }), tmp.stampColor),
      unix: app.STAMP(new Date().valueOf(), tmp.stampColor),
      STAMP: app.STAMP
    }); 
  },
  finalize(app, hostObj) {}
});
