# core-ansii-color

```js
const chalk = require('chalk');
require('./src/better-logging')(console, {
  color: {
    base: chalk.greenBright,
    type: {
      log: chalk.redBright
    }
  }
});
```