require('../../src/better-logging')(console);

console.log('Hello Log');
console.info('Hello Info');
console.warn('Hello Warn');
console.error('Hello Error');

console.loglevel = 4;
console.debug('Hello Debug');
