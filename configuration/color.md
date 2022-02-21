# color

It's finally time for the most important option of them all... colors!

```javascript
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

```javascript
const { Theme } = betterLogging;
betterLogging(console, {
  color: Theme.dark
});

// Theme.dark // default
// Theme.light
// Theme.green
// Theme.noColor // removes all color from messages
```

