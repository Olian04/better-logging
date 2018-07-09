
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
  debug: msg => `[debug] ${msg}`,
  log: msg => `[log] ${msg}`,
  info: msg => `[info] ${msg}`,
  warn: msg => `[warning] ${msg}`,
  error: msg => `[error] ${msg}`
});

console.debug('foo'); //  [debug] foo
console.log('foo'); //    [log] foo
console.info('foo'); //   [info] foo
console.warn('foo'); //   [warning] foo
console.error('foo'); //  [error] foo
 
console.loglevel // A number between 0(none) and 4(debug), default: 3
```


Better-logging calls the default implementation in the background.

```ts
require('better-logging')(console);
console.info('Hello World');
// Is exactly equal to
console.info('[info] Hello World')
```


better-logging can bind it self to any object, not just the console

```ts
let better = {};
require('better-logging')(better);
better.debug('foo'); //  [debug] foo
better.log('foo') //     [log] foo
better.info('foo'); //   [info] foo
better.warn('foo'); //   [warning] foo
better.error('foo'); //  [error] foo
better.loglevel = 0;
```


## Planned
* Add time stamps to default options

## Resources
* Colors in browser https://stackoverflow.com/questions/7505623/colors-in-javascript-console
* Lots more console APIs to go throu: https://nodejs.org/api/console.html#console_console_debug_data_args

