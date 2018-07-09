
# better-logging
Javascript comes with 4 different logging types by default. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experiance and is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any integrated functionality in browsers or other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefullness of the default logging methods.


Demo fiddle: https://jsfiddle.net/s70q43jg/137/

```ts
// Default in node.js
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-logging
require('better-logging')(console, { /* Optional */
  log: msg => `[log] ${msg}`,
  info: msg => `[info] ${msg}`,
  warn: msg => `[warning] ${msg}`,
  error: msg => `[error] ${msg}`
});

console.log('foo'); //    \grey[log]\reset foo
console.info('foo'); //   \grey[info]\reset foo
console.warn('foo'); //   \yellow[warning]\reset foo
console.error('foo'); //  \red[error]\reset foo
 
console.loglevel // A number between 0(error) and 3(log)
```


Better-logging calls the default implementation in the background.

```ts
require('better-logging')(console);
console.info('Hello World');
// Is exactly equal to
console.info('\grey[info]\reset Hello World')
```


better-logging can bind it self to any object, not just the console

```ts
let better = {};
require('better-logging')(better);
better.log('foo') //     \grey[log]\reset foo
better.info('foo'); //   \grey[info]\reset foo
better.warn('foo'); //   \yellow[warning]\reset foo
better.error('foo'); //  \red[error]\reset foo
```


## Planned
* Add time stamps to default options

## Resources
*  https://stackoverflow.com/questions/7505623/colors-in-javascript-console

