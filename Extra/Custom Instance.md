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
