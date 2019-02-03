//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('../src/better-logging');

describe('Custom-Arg-processor', () => {
  const removeColor = msg => msg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

  const lastMsgOfType = {}
  const catchLog = type => msg => {
    lastMsgOfType[type] = removeColor(msg);
  }
  const pretendLogger = CustomInstance({
      log: catchLog('log'),
      info: catchLog('info'),
      debug: catchLog('debug'),
      error: catchLog('error'),
      warn: catchLog('warn'),
  });

  const better = {};
  if (!pretendLogger(better, {
    format: ctx => ctx.msg,
    argProcessor: arg => {
      // will fire once per arg in (...args) of the original function call
    
      let msg = arg;
      if (typeof arg === 'number') {
        msg = arg * arg;
        // ex: log(1, 2, 3) => '1 4 9'
      }
    
      return String(msg); // Should return a string
    }
  })) throw 'This will never happen';
  better.loglevel = 5;

  const runTest = (loggerType, nativeType) => {
    it('#'+loggerType+'()', () => {
      better[loggerType]();
      expect(lastMsgOfType[nativeType]).to.equal('');

      better[loggerType](1); 
      expect(lastMsgOfType[nativeType]).to.equal('1');

      better[loggerType](1, 2);
      expect(lastMsgOfType[nativeType]).to.equal('1 4');

      better[loggerType](1, 2, 3);
      expect(lastMsgOfType[nativeType]).to.equal('1 4 9');
      
      better[loggerType](3, '5');
      expect(lastMsgOfType[nativeType]).to.equal('9 5');

      better[loggerType]('2', 7, '5');
      expect(lastMsgOfType[nativeType]).to.equal('2 49 5');
    });
  }

  describe('Square numbers', () => {
    runTest('line', 'log');
    ['log', 'info', 'warn', 'error', 'debug'].forEach(type => 
      runTest(type, type)
    );
  });
});
