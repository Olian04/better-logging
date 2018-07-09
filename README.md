
# better-logging

Better-logging is designed to be a drop in replacement for the default logging methods.
Since better-logging only decorates the default logging methods you wont lose any integrated functionality in browsers or other tooling.

Demo fiddle: https://jsfiddle.net/s70q43jg/135/

```ts
// Default
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-logging
require('better-logging')(console);

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

