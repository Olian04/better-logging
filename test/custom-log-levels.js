//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('..');

describe('Custom-Log-levels', () => {
    let msgCount = 0;
    const catchLog = type => msg => {
        msgCount += 1;
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
      msgCount = 0;
      better.logLevel = level;

      better.line('foo'); 
      better.debug('foo'); 
      better.log('foo') 
      better.info('foo'); 
      better.warn('foo'); 
      better.error('foo');

      expect(msgCount).to.equal(count);
    });
  });
});
