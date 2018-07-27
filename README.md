# better-logging

![](images/output.png)

Javascript comes by default with different standardized logging types. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experience of any node application, it is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any functionality provided by other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefulness of the default logging methods.

> The entire module is < 2kb in size and has no dependancies

__Install:__ [`npm i better-logging`](https://www.npmjs.com/package/better-logging)

---

```ts
// Default in node.js
console.debug('foo'); //  foo
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-logging
require('better-logging')(console);

console.debug('foo'); //  [11:46:35] [debug] foo
console.log('foo'); //    [11:46:35] [log] foo
console.info('foo'); //   [11:46:35] [info] foo
console.warn('foo'); //   [11:46:35] [warning] foo
console.error('foo'); //  [11:46:35] [error] foo
console.line('foo'); //   foo
 
console.loglevel /**
 * debug: 4
 * log: 3
 * info: 2
 * warn: 1
 * error: 0
 * line: 1
 * turn off all logging: -1
 * default: 3
 */
console.color['ColorName']/**
color = {
  Black: '\033[0;30m',
  Blue: '\033[0;34m',
  Green: '\033[0;32m',
  Cyan: '\033[0;36m',
  Red: '\033[0;31m',
  Purple: '\033[0;35m',
  Brown: '\033[0;33m',
  Gray: '\033[0;37m',
  Dark_Gray: '\033[1;30m',
  Light_Blue: '\033[1;34m',
  Light_Green: '\033[1;32m',
  Light_Cyan: '\033[1;36m',
  Light_Red: '\033[1;31m',
  Light_Purple: '\033[1;35m',
  Yellow: '\033[1;33m',
  White: '\033[1;37m',
  RESET: '\033[0m'
}
*/
```


Better-logging calls the default implementation in the background.

```ts
require('better-logging')(console);
console.info('Hello World');
// Is the same as
console.info('[11:46:35] [info] Hello World')
```


Better-logging can decorate any object, not just the console

```ts
let better = {};
require('better-logging')(better);
better.debug('foo'); //  [11:46:35] [debug] foo
better.log('foo') //     [11:46:35] [log] foo
better.info('foo'); //   [11:46:35] [info] foo
better.warn('foo'); //   [11:46:35] [warning] foo
better.error('foo'); //  [11:46:35] [error] foo
better.line('foo'); //   foo
better.loglevel = 0;
```

It can sometimes be usefull to define your own logging style, for those occations you can overwrite the default formatting functions:
```ts
require('better-logging')(console, {
  log: msg => msg,
  info: msg => `{info} ${msg}`,
  warn: msg => `myApp/warn/${msg}`
});

console.log('foo'); //    foo
console.info('foo'); //   {info} foo
console.warn('foo'); //   myApp/warn/foo
console.error('foo'); //  [11:46:35] [error] foo
```

## Typescript support

```ts
// When decorating the console, this is all you need to do.
require('../src/better-logging').default(console);
```

```ts
// When decorating an arbitrary object we need to trick the type system into thinking that better-logging might infact fail to decorate our object.
let better = {};
if (!require('../src/better-logging').default(better)) throw 'This will never happen';

```
