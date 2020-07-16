//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('../../dist/api');
const { removeColors } = require('../../dist/lib/util/removeColor');

describe('Custom-Formatting', () => {
  const lastMsgOfType = {}
  const catchLog = type => msg => {
    lastMsgOfType[type] = removeColors(msg);
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
    format: ctx => `${ctx.type} ${ctx.STAMP('lel')} ${ctx.msg}`
  })) throw 'This will never happen';
  better.logLevel = 5;

  it('#line()', () => {
    better.line('foo'); 
    expect(lastMsgOfType['log']).to.equal('foo');
  });
  ['log', 'info', 'warn', 'error', 'debug'].forEach(type => {
    it('#'+type+'()', () => {
      better[type]('foo');
      expect(lastMsgOfType[type]).to.equal('['+type+'] [lel] foo');
    });
  });
});