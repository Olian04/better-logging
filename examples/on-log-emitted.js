//@ts-check
let better = { i: 0 };
if (!require('../src/better-logging').default(better, {
  onLogEmitted: log => better.i++
})) throw 'This will never happen';

Array(5).fill(0).forEach((_, i) => {
  better.loglevel = i;
  better.line(); 
  better.debug('foo'); 
  better.log('foo') 
  better.info('foo'); 
  better.warn('foo'); 
  better.error('foo');
});
console.log('should trigger once per log: ', better.i);