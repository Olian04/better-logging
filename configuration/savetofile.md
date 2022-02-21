# saveToFile

You might also want to keep log from previous runs, all you need to do is tell better-logging where you want to store the logs:

```javascript
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
