
[![NPM Version](https://img.shields.io/npm/v/better-logging.svg)](https://www.npmjs.com/package/better-logging)
![Supported Types](https://img.shields.io/npm/types/better-logging.svg)
[![NPM Downloads](https://img.shields.io/npm/dt/better-logging.svg)](https://www.npmjs.com/package/better-logging)
[![Build Status Master](https://img.shields.io/github/workflow/status/olian04/better-logging/Node.js%20CI/master?label=build%20%28master%29)](https://github.com/Olian04/better-logging/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster+event%3Apush)
[![Build Status Dev](https://img.shields.io/github/workflow/status/olian04/better-logging/Node.js%20CI/dev?label=build%20%28dev%29)](https://github.com/Olian04/better-logging/actions?query=workflow%3A%22Node.js+CI%22+branch%3Adev+event%3Apush)
![LICENSE](https://img.shields.io/npm/l/better-logging.svg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging?ref=badge_shield)

# better-logging

![](images/output.png)

Javascript comes by default with different standardized logging types. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experience of any node application, it is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any functionality provided by other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefulness of the default logging methods.

__Install:__ [`npm i better-logging`](https://www.npmjs.com/package/better-logging)

_Upgrading from major version 3 to major version 4? See the [upgrade guide](./guides/upgrading-from-3.x-to-4.x.md)._

__Help me help you:__ <br>
<a href="https://www.buymeacoffee.com/olian04" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

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
console.warn('foo'); //   [11:46:35] [warn] foo
console.error('foo'); //  [11:46:35] [error] foo
console.line('foo'); //   foo

console.logLevel /**
 * debug: 4
 * log: 3
 * info: 2
 * warn: 1
 * error: 0
 * line: 1
 * turn off all logging: -1
 * default: 3
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

You might also want to keep log from previous runs, all you need to do is tell better-logging where you want to store the logs:

```js
require('better-logging')(console, {
  saveToFile: `${Date.now()}.log`,
});

console.logLevel = 3;

console.debug('foo'); // won't log to console, but will be saved in 1594897100267.log
console.log('foo'); //     logged to console & saved in 1594897100267.log
console.info('foo'); //    logged to console & saved in 1594897100267.log
console.warn('foo'); //  logged to console & saved in 1594897100267.log
console.error('foo'); //  logged to console & saved in 1594897100267.log
console.line('foo'); //    logged to console, but "line" is never saved in logs
```

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

It's finally time for the most important option of them all... colors!

```js
const chalk = require('chalk');
require('better-logging')(console, {
    color: {
      base: chalk.greenBright,
      type: {
        debug: chalk.magentaBright,
        info: chalk.magentaBright,
        log: chalk.magentaBright,
        error: chalk.blue,
        warn: chalk.blue,
      }
    },
});
// The type color decides the color of the word inside the "ctx.type" stamp.
// By default the text "info" in this stamp, [info], is white, but now it can be any color you want (or that your terminal supports) :)
```

There are also some predefined color themes that you can use if you don't want to write your own.

```js
const { Theme } = betterLogging;
betterLogging(console, {
  color: Theme.dark
});

// Theme.dark // default
// Theme.light
// Theme.green
```

Sometimes you might not want all log arguments to be formatted and converted into a string. For these cases you can change the message construction strategy by passing a `MessageConstructionStrategy` enum in the configuration object.

```js
const { MessageConstructionStrategy } = betterLogging;
betterLogging(console, {
  messageConstructionStrategy: MessageConstructionStrategy.ALL,
});
```

__Strategies:__

* ALL _(default)_: Will consume all arguments and format them as a single string. <br> `log(1, 2, 3) => impl.log(format('1 2 3'), ...[])`
* FIRST: Will consume just the first argument and format it as a string, it will then spread the rest of the arguments into the implementation call. <br> `log(1, 2, 3) => impl.log(format('1'), ...[2, 3])`
* NONE : Won't format any arguments, HOWEVER the format function will be called with an empty string as the message. <br> `log(1, 2, 3) => impl.log(format(''), ...[1, 2, 3])`

## Express middleware

I've found that i keep writing the same middleware function (for logging incoming requests) over and over again whenever i start a new project, so i decided to include it in the library from the get-go. (Don't be alarmed, its very small, it won't add that much to your bundle if you don't use express).

```js
const betterLogging = require('better-logging');
const app = require('express')();

// Init betterLogging
betterLogging(console);
// Setup middleware
app.use(betterLogging.expressMiddleware(console));

app.listen(8080);
```

__Default config:__

```js
app.use(betterLogging.expressMiddleware(console, {
  method: {
    show: true,
    color: chalk.grey,
    order: 1,
  },
  ip: {
    show: true,
    color: chalk.grey,
    order: 2,
  },
  path: {
    show: true,
    color: chalk.reset
    order: 3,
  },
  body: {
    show: false,
    color: chalk.reset
    order: 4,
  },
  header: {
    show: false,
    color: chalk.reset
    order: 5,
  }
}));
```

## Typescript support

```ts
// using import
import betterLogging from 'better-logging';
betterLogging(console);
console.log('Hello!') // [11:46:35] [log] Hello!
```

```ts
// using require
require('better-logging').default(console);
console.log('Hello!') // [11:46:35] [log] Hello!
```

## Decorate any object

Support for decoration of arbitrary objects is considered experimental, this is due to problems with typescript support. If you intend to use better-logging purely with javascript or dont care about type support, then everything should work just fine out of the box. However if you intend to use better-logging with typescript then you should be aware that the types for the console object are hardcoded and will show up on the console object even if you chose not to decorate it. This means that `console.line('foo')` will look ok to typescript, but will fail during runtime.

```js
const better = {};
require('better-logging')(better);
better.debug('foo'); //  [11:46:35] [debug] foo
better.log('foo') //     [11:46:35] [log] foo
better.info('foo'); //   [11:46:35] [info] foo
better.warn('foo'); //   [11:46:35] [warning] foo
better.error('foo'); //  [11:46:35] [error] foo
better.line('foo'); //   foo
better.logLevel = 0;
```

```ts
// When decorating an arbitrary object we need to trick the type system into thinking that better-logging might infact fail to decorate our object.
const better = {}; // due to some "strange" behavior with the typescript type system this has to be CONST.
if (!require('better-logging').default(better)) throw 'This will never happen';
better.log('Hello!') // [11:46:35] [log] Hello!
```

## Custom Instance

First of all, the custom instance was designed to be used internally to make TDD easier to implement. However some advanced users might find the need to overwrite the default behavior of better-logging on a more detailed level than the current api allows. The custom instance will not log anything to the console, but will instead call the corresponding method on the implementation object. For example, calling `better.info('Hi!')` will call `implementationObj.info('[11:46:35] [info] Hi!')`. The `msg` parameter of these functions will be the fully formatted string that usually ends up logged to the terminal, and the `args` array is the arguments that was NOT formatted (determined by the message construction strategy).

```js
const { CustomInstance } = require('better-logging');
const implementationObj = {
    log: (msg, ...args) => {},
    info: (msg, ...args) => {},
    debug: (msg, ...args) => {},
    error: (msg, ...args) => {},
    warn: (msg, ...args) => {}
};
const customLogging = CustomInstance(implementationObj);

const better = {};
customLogging(better);
```

For reference, this is how you would recreate the default instance of better-logging.

```js
const { CustomInstance } = require('better-logging');
const betterLogging = CustomInstance(console);

const better = {};
betterLogging(better);

better.log('Works!');
```

You can also pass an array of implementation objects.

```js
const customLogging = CustomInstance([
  console, // write to stdout & stderr
  dbHooks, // store logs in db
]);

customLogging(console);
```

## License

_See [LICENSE](./LICENSE)_

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging?ref=badge_large)
