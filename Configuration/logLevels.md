Some times the default log levels might not fit your needs, in those cases you can redefine the log levels to anything you like.

```js
require('better-logging')(console, {
  logLevels: {
    debug: 0,
    error: 10,
    info: 10,
    line: 10,
    log: 10,
    warn: 10,
  }
});

console.debug('foo'); //  [11:46:35] [debug] foo
console.log('foo'); //    wont print
console.info('foo'); //   wont print
console.warn('foo'); //   wont print
console.error('foo'); //  wont print
console.line('foo'); //   wont print
```
