
![](https://img.shields.io/npm/v/better-logging.svg) 
![](https://img.shields.io/npm/types/better-logging.svg)
![](https://img.shields.io/npm/dt/better-logging.svg)
![](https://img.shields.io/npm/l/better-logging.svg)
[![Actions Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/olian04/better-logging?label=tests)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/olian04/better-logging)

# better-logging

![](images/output.png)

Javascript comes by default with different standardized logging types. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experience of any node application, it is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any functionality provided by other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefulness of the default logging methods.

__Install:__ [`npm i better-logging`](https://www.npmjs.com/package/better-logging)

__Help me help you:__ <a href="https://www.buymeacoffee.com/olian04" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

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
  STAMP_COLOR: // Dynamicaly equals stampColor
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
  format: ctx => `${ctx.time24} ${ctx.time12} ${ctx.date} ${ctx.type} ${ctx.unix} ${ctx.STAMP('lel', console.color.Brown)} ${ctx.msg}`
});

console.debug('foo'); //  [11:44:40] [11:44:40 AM] [2/2/2019] [debug] [1549104280572] [lel] foo
console.log('foo'); //    [11:44:40] [11:44:40 AM] [2/2/2019] [log] [1549104280574] [lel] foo
console.info('foo'); //   [11:44:40] [11:44:40 AM] [2/2/2019] [info] [1549104280577] [lel] foo
console.warn('foo'); //   [11:44:40] [11:44:40 AM] [2/2/2019] [warn] [1549104280579] [lel] foo
console.error('foo'); //  [11:44:40] [11:44:40 AM] [2/2/2019] [error] [1549104280580] [lel] foo
```

It can also sometimes be useful to be able to react to an event being fired.
```js
require('better-logging')(console, {
  events: [{
     onLogEmitted: log => {
        // A log just got emitted!
     },
     onLoglevelChanged: loglevel => {
       // The loglevel got changed
     }
  }] 
});
```

_["Middleware" example](examples/better-logging-lowdb.md)_

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
console.warn('foo'); //   wont print
console.error('foo'); //  wont print
console.line('foo'); //   wont print
```

In some cases you might need a specific type of argument to be pre-treated prior to logging it. Introducing argProcessor

```js
require('better-logging')(console, {
  argProcessor: arg => {
    // will fire once per arg in (...args) of the original function call
  
    let msg = arg;
    if (typeof arg === 'number') {
      msg = arg * arg;
      // ex: log(1, 2, 3) => '1 4 9'
    }
  
    return String(msg); // Should return a string
  }
});
```

It's finally time for the most important option of them all... colors!
```js
require('better-logging')(console, {
    typeColors: Color => ({
        debug: Color.Light_Purple,
        info: Color.Light_Purple,
        log: Color.Light_Purple,
        error: Color.Blue,
        warn: Color.Blue,
    }),
    stampColor: Color => Color.Light_Green
});
// The type color decides the color of the word inside the "ctx.type" stamp.
// By default the text "info" in this stamp, [info], is white, but now it can be any color you want (or that your terminal supports) :)
// The Color object passed to the typeColors function is the same object as console.color will be after the decoration.

// The stampColor decides the color of the [ ] and the color of the body of certain stamps, such as time stamp
```

## Express middleware

I've found that i keep writing the same middleware function (for logging incoming requests) over and over again whenever i start a new project, so i decided to include it in the library from the getgo. (Don't be alarmed, its ~30 lines of code, it won't add that much to your bundle if you dont use express).

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
  ip: {
    show: true,
    color: console.color.STAMP_COLOR
  },
  path: {
    show: true,
    color: console.color.RESET
  },
  body: {
    show: false,
    color: console.color.RESET
  },
  header: {
    show: false,
    color: console.color.RESET
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
better.loglevel = 0;
```

```ts
// When decorating an arbitrary object we need to trick the type system into thinking that better-logging might infact fail to decorate our object.
const better = {}; // due to some "strange" behavior with the typescript type system this has to be CONST.
if (!require('better-logging').default(better)) throw 'This will never happen';
better.log('Hello!') // [11:46:35] [log] Hello!
```

## Custom Instance

First of all, the custom instance was designed to be used internally to make TDD easier to implement. However some advanced users might find the need to overwrite the default behavior of better-logging on a more detailed level than the current api allows. The custom instance will not log anything to the console, but will instead call the corresponding method on the implementation object. For example, calling `better.info('Hi!')` will call `implementationObj.info('[11:46:35] [info] Hi!')`. The msg parameter of these functions will be the fully formated string that usually ends up logged to the terminal.

```js
const { CustomInstance } = require('better-logging');
const implementationObj = {
    log: msg => {},
    info: msg => {},
    debug: msg => {},
    error: msg => {},
    warn: msg => {}
};
const customLogging = CustomInstance(implementationObj);

const better = {};
customLogging(better);
```

See [examples/custom-instance.js](examples/custom-instance.js) for a more realistic usage example.

For reference, this is how you would recreate the default instance of better-logging.
```js
const { CustomInstance } = require('better-logging');
const betterLogging = CustomInstance(console);

const better = {};
betterLogging(better);

better.log('Works!');
```
