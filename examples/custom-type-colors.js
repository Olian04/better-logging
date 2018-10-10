//@ts-check
let better = {};
if (!require('../src/better-logging').default(better, {
    typeColors: Color => ({
        debug: Color.Light_Purple,
        info: Color.Light_Purple,
        log: Color.Light_Purple,
        error: Color.Blue,
        warn: Color.Blue,
    })
})) throw 'This will never happen';

Array(5).fill(0).forEach((_, i) => {
  better.loglevel = i;
  better.line(); 
  better.debug('foo');
  better.log('foo');
  better.info('foo'); 
  better.warn('foo'); 
  better.error('foo');
});