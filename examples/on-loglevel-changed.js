//@ts-check
const better = { i: 0, j: 0 };
if (!require('../src/better-logging').default(better, {
  events: [{
    onLoglevelChanged: loglevel => better.i++
  }, {
    onLoglevelChanged: loglevel => better.j++
  }]
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
console.log('should trigger 5 times: ', better.i, better.j);