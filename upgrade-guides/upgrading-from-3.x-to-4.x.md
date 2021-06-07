# 3.x to 4.x

## Log Level

In version 4.x the capitalization of log level has been changed to camel casing.

```typescript
// IN 3.x
console.loglevel = 3;

// IN 4.x
console.logLevel = 3;
```

## Colors

In version 4.x the syntax for defining colors in the configuration has been overhauled, and colorization is now done using [chalk](https://github.com/chalk/chalk), instead of raw strings.

```typescript
// IN 3.x
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

console.color.Blue;

// IN 4.x
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

chalk.blue
```

## Arg Processor

In version 4.x the arg processor configuration has been removed.

```typescript
// IN 3.x
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

// IN 4.x
// Removed
```

## Events

In version 4.x events have been temporarily removed.

```typescript
// IN 3.x
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

// IN 4.x
// Temporarily removed
```

