//@ts-check
const { expect } = require('chai');
const { CustomInstance, Theme } = require('../../dist/api');

describe('Theme', () => {
  describe('noColor', () => {
    const lastMsgOfType = {}
    const catchLog = type => msg => {
      lastMsgOfType[type] = msg;
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
      color: Theme.noColor,
      format: ctx => `${ctx.type} ${ctx.msg}`,
    })) throw 'This will never happen';
    better.logLevel =  4;

    it('should produce messages that dont contain ANSI color strings', () => {
      ['log', 'info', 'warn', 'error', 'debug'].forEach(type => {
        const msg = 'foo';
        better[type](msg);
        expect(lastMsgOfType[type]).to.equal(`[${type}] ${msg}`);
      });
    });
  });
});
