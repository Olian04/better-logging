# Example middleware: [better-logging-lowdb](https://github.com/Olian04/better-logging-lowdb)

```ts
const path = require('path');
const { 
    middleware: better_logging_lowdb 
    db: loggingDatabase
} = require('better-logging-lowdb')(
    path.join(__dirname, 'better_logging_db.json')
);
require('better-logging')(console, {
    events: [
        better_logging_lowdb
    ]
});

// Do work

loggingDatabase.get('logs').value(); // All logs
```