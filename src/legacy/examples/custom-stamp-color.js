//@ts-check
const better = {};
if (!require('../../better-logging').default(better, {
    stampColor: Color => Color.Light_Green
})) throw 'This will never happen';

better.line(); 
better.debug('foo'); 
better.log('foo') 
better.info('foo'); 
better.warn('foo'); 
better.error('foo');