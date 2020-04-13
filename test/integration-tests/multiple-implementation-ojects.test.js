//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('../../dist/api');

describe('Multiple-Implementation-Objects', () => {
  const msgCount = [];
  const catchLog = (implNr) => () => {
    msgCount[implNr] = (msgCount[implNr] || 0) + 1;
  };

  const impl = (implNr) => ({
    log: catchLog(implNr),
    info: catchLog(implNr),
    debug: catchLog(implNr),
    error: catchLog(implNr),
    warn: catchLog(implNr),
  }); 

  const implCount = 5;
  const pretendLogger = CustomInstance(
    Array(implCount).fill(0).map((_, i) => impl(i))
  );

  const better = {};
  if (!pretendLogger(better, {
    format: ctx => `${ctx.type} ${ctx.STAMP('lel')} ${ctx.msg}`
  })) throw 'This will never happen';
  better.logLevel = 5;

  it('#line()', () => {
    better.line('foo');
    for (let i = 0; i < implCount; i++) {
      expect(msgCount[i]).to.equal(1);
    }
  });
  ['log', 'info', 'warn', 'error', 'debug'].forEach((type, k) => {
    it('#'+type+'()', () => {
      better[type]('foo');
      for (let i = 0; i < implCount; i++) {
        expect(msgCount[i]).to.equal(2+k);
      }
    });
  });
});