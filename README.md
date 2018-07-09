# better-logging
Better-logging is designed to be a drop in replacement for the default logging methods.<br>
Since better-logging only decorates the default logging methods you wont lose any integrated functionality in browsers or other tooling. 

```ts
// Default
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-node-logging
require('better-logging')(console, { /* Optional */
  log: msg => msg,
  info: msg => `\grey[info]\reset ${msg}`,
  warn: msg => `\yellow[warning]\reset ${msg}`,
  error: msg => `\red[error]\reset ${msg}`
});

console.log('foo'); //    foo
console.info('foo'); //   \grey[info]\reset foo
console.warn('foo'); //   \yellow[warning]\reset foo
console.error('foo'); //  \red[error]\reset foo
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
better.log('foo') //     foo
better.info('foo'); //   \grey[info]\reset foo
better.warn('foo'); //   \yellow[warning]\reset foo
better.error('foo'); //  \red[error]\reset foo
```

## Planned
* Add time stamps to default options


## Resources
* https://stackoverflow.com/questions/7505623/colors-in-javascript-console
