//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('../../dist/api');

describe('Custom-Log-levels', () => {
    let messages = [];
    const catchLog = type => msg => {
      messages.push(msg);
    }
    const pretendLogger = CustomInstance({
        log: catchLog('log'),
        info: catchLog('info'),
        debug: catchLog('debug'),
        error: catchLog('error'),
        warn: catchLog('warn'),
    });

    const better = { };
    if (!pretendLogger(better, {
        logLevels: {
            line: 0,
            debug: 1,
            error: 2,
            log: 3,
            info: 4,
            warn: 5,
        }
    })) throw 'This will never happen';

  it('should work', () => {
    [
      [-1, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 6],
    ].forEach(([level, count]) => {
      messages = [];
      better.logLevel = level;

      better.line('foo'); 
      better.debug('foo'); 
      better.log('foo') 
      better.info('foo'); 
      better.warn('foo'); 
      better.error('foo');

      expect(messages.length, `Expected [${messages.join(', ')}] to be of length ${count}`).to.equal(count);
    });
  });
});
