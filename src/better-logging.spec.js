//@ts-check
const { betterLogging } = require('./better-logging');

betterLogging(console);

console.log('Hello World!');
console.info('Hello World!');
console.warn('Hello World!');
console.error('Hello World!');
console.debug('Hello World!');
console.line('Hello World!');

console.loglevel = 4;