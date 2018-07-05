# logger
Logger is a temp name for a chaining based logger, takes inspiration from [chai.expect](https://github.com/chaijs/chai#usage) and [winston](https://github.com/winstonjs/winston#logging-levels)

```ts
const Logger = require('logger');
const log = Logger({
  info: msg => `${msg}`,
  http: (reason, url) => `${url} (${reason})`
}, (level, msg) => `${level}: ${msg}`);

log.info('Hello'); // info: Hello
log.http('fetching cat image', `http://thecatapi.com/api/images/get?format=src&type=png`); // http: http://thecatapi.com/api/images/get?format=src&type=png (fetching cat image)
```
