# better-node-logging
Logger is a temp name.

Designed to overwrite the default console.log, console.info, console.warn & console.error method calls.
```ts
// Default
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-node-logging
require('better-node-logging')(console, { /* Optional */
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
