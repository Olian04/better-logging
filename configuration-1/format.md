# format

It can sometimes be useful to define your own logging style, for those occasions you can overwrite the default formatting function:

```javascript
const chalk = require('chalk');
require('better-logging')(console, {
  format: ctx => `${ctx.time24} ${ctx.time12} ${ctx.date} ${ctx.type} ${ctx.unix} ${ctx.STAMP('lel', chalk.blue)} ${ctx.msg}`
});

console.debug('foo'); //  [11:44:40] [11:44:40 AM] [2/2/2019] [debug] [1549104280572] [lel] foo
console.log('foo'); //    [11:44:40] [11:44:40 AM] [2/2/2019] [log] [1549104280574] [lel] foo
console.info('foo'); //   [11:44:40] [11:44:40 AM] [2/2/2019] [info] [1549104280577] [lel] foo
console.warn('foo'); //   [11:44:40] [11:44:40 AM] [2/2/2019] [warn] [1549104280579] [lel] foo
console.error('foo'); //  [11:44:40] [11:44:40 AM] [2/2/2019] [error] [1549104280580] [lel] foo
```

