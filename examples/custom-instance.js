//@ts-check
const { CustomInstance } = require('../src/better-logging');

const logs = [];
const removeColor = msg => msg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
const catchLog = type => msg => {
    logs.push({ type, msg: removeColor(msg) });
}
const pretendLogger = CustomInstance({
    log: catchLog('log'),
    info: catchLog('info'),
    debug: catchLog('debug'),
    error: catchLog('error'),
    warn: catchLog('warn'),
});

const better = {};
if (!pretendLogger(better)) throw 'This will never happen';

// These wont show up in the console
better.line('foo');
better.log('foo');
better.info('foo');
better.debug('foo');
better.error('foo');
better.warn('foo');

// logs will contain the 6 log entries from above
console.log(logs);
