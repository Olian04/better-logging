# better-logging

![](images/output.png)

Javascript comes by default with different standardized logging types. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experience of any node application, it is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any functionality provided by other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefulness of the default logging methods.

> The entire module is < 3kb in size and has no dependencies

__Install:__ [`npm i better-logging`](https://www.npmjs.com/package/better-logging)

---

```js
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
```js
require('better-logging')(console);
console.info('Hello World');
// Is the same as
console.info('[11:46:35] [info] Hello World')
```

It can sometimes be useful to define your own logging style, for those occasions you can overwrite the default formatting function:
```js
require('better-logging')(console, {
  format: ctx => `${ctx.type} ${ctx.time24} ${ctx.msg}`
});

console.log('foo'); //    [log] [11:46:35] foo
console.info('foo'); //   [info] [11:46:35] foo
console.warn('foo'); //  [warn] [11:46:35] foo
console.error('foo'); //  [error] [11:46:35] foo
```

It can also sometimes be useful to be able to react to a log being emitted.
```js
require('better-logging')(console, {
  onLogEmitted: log => {
    // A log just got emitted!
  }
});
```

Some times the default loglevels might not fit your needs, in those cases you can redefine the loglevels to anything you like.
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
console.warn('foo'); //  wont print
console.error('foo'); //  wont print
console.line('foo'); //   wont print
```

It's finally time to for the most important option of them all... typeColors!
```js
require('better-logging')(console, {
    typeColors: Color => ({
        debug: Color.Light_Purple,
        info: Color.Light_Purple,
        log: Color.Light_Purple,
        error: Color.Blue,
        warn: Color.Blue,
    })
});
// The type color decides the color of the word inside the "ctx.type" stamp.
// By default the text "info" in this stamp, [info], is white, but now it can be any color you want (or that your terminal supports) :)
// The Color object passed to the typeColors function is the same object as console.color will be after the decoration.
```

## Typescript support

```ts
// When decorating the console, this is all you need to do.
require('better-logging').default(console);
console.log('Hello!') // [11:46:35] [log] Hello!
```

## Decorate any object

Support for decoration of arbitrary objects is considered experimental, this is due to problems with typescript support. If you intend to use better-logging purely with javascript or dont care about type support, then everything should work just fine out of the box. However if you intend to use better-logging with typescript then you should be aware that the types for the console object are hardcoded and will show up on the console object even if you chose not to decorate it. This means that `console.line('foo')` will look ok to typescript, but will fail during runtime.

```js
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

```ts
// When decorating an arbitrary object we need to trick the type system into thinking that better-logging might infact fail to decorate our object.
const better = {}; // due to some "strange" behavior with the typescript type system this has to be CONST.
if (!require('better-logging').default(better)) throw 'This will never happen';
better.log('Hello!') // [11:46:35] [log] Hello!
```
