const path = require('path');

require('..')(console, {
  saveToFile: path.join(__dirname, `logs-js/${process.title}-${Date.now()}.log`),
});

console.logLevel = 4;

console.log('this is a log message');
console.info('this is a info message');
console.error('this is a error message');
console.warn('this is a warn message');
console.debug('this is a debug message');
console.line('this is a line message');