# Express Middleware

I've found that i keep writing the same middleware function \(for logging incoming requests\) over and over again whenever i start a new project, so i decided to include it in the library from the get-go. \(Don't be alarmed, its very small, it won't add that much to your bundle if you don't use express\).

```javascript
const betterLogging = require('better-logging');
const app = require('express')();

// Init betterLogging
betterLogging(console);
// Setup middleware
app.use(betterLogging.expressMiddleware(console));

app.listen(8080);
```

**Default config:**

```javascript
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
