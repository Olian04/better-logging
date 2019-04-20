//@ts-check
require('../../src/better-logging').default(console, {
  on: {
    logEmitted: (event) => console.line(event),
  }
});

console.log('Hello Log');
