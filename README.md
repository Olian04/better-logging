
# better-logging
Javascript comes by default with 5 different standardised logging types. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experiance and is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any integrated functionality in browsers or other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefullness of the default logging methods.


Demo fiddle: https://jsfiddle.net/s70q43jg/137/

```ts
// Default in node.js
console.debug('foo'); //  foo
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-logging
require('better-logging')(console, { /* Optional */
  debug: msg => `[${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}] [debug] ${msg}`,
  log: msg => `[${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}] [log] ${msg}`,
  info: msg => `[${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}] [info] ${msg}`,
  warn: msg => `[${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}] [warning] ${msg}`,
  error: msg => `[${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}] [error] ${msg}`
});

console.debug('foo'); //  [11:46:35] [debug] foo
console.log('foo'); //    [11:46:35] [log] foo
console.info('foo'); //   [11:46:35] [info] foo
console.warn('foo'); //   [11:46:35] [warning] foo
console.error('foo'); //  [11:46:35] [error] foo
 
console.loglevel // A number between 0(none) and 4(debug), default: 3
```


Better-logging calls the default implementation in the background.

```ts
require('better-logging')(console);
console.info('Hello World');
// Is exactly equal to
console.info('[11:46:35] [info] Hello World')
```


better-logging can bind it self to any object, not just the console

```ts
let better = {};
require('better-logging')(better);
better.debug('foo'); //  [11:46:35] [debug] foo
better.log('foo') //     [11:46:35] [log] foo
better.info('foo'); //   [11:46:35] [info] foo
better.warn('foo'); //   [11:46:35] [warning] foo
better.error('foo'); //  [11:46:35] [error] foo
better.loglevel = 0;
```


## Planned
* Add time stamps to default options

## Resources
* Colors in browser https://stackoverflow.com/questions/7505623/colors-in-javascript-console
* Lots more console APIs to go throu: https://nodejs.org/api/console.html#console_console_debug_data_args

