//@ts-check
console.log();
console.debug('debug pre');
console.log('log pre');
console.info('info pre');
console.warn('warn pre');
console.error('error pre');

require('../src/better-logging').default(console);

Array(5).fill(0).forEach((_, i) => {
  console.loglevel = i;
  console.line();
  console.debug('debug '+i);
  console.log('log '+i);
  console.info('info '+i);
  console.warn('warn '+i);
  console.error('error '+i);
});
