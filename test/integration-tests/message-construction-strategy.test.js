//@ts-check
const { expect } = require('chai');
const { CustomInstance, MessageConstructionStrategy } = require('../../dist/api');
const removeColor = require('../util/removeColor');

describe('Message-Construction-Strategy', () => {
  const lastMsgOfType = {}
  const catchLog = type => (msg, ...args) => {
    lastMsgOfType[type] = [removeColor(msg), args];
  }
  const pretendLogger = CustomInstance({
      log: catchLog('log'),
      info: catchLog('info'),
      debug: catchLog('debug'),
      error: catchLog('error'),
      warn: catchLog('warn'),
  });

  describe('MessageConstructionStrategy.NONE', () => {
    const better = {};
    if (!pretendLogger(better, {
      messageConstructionStrategy: MessageConstructionStrategy.NONE,
      format: ctx => ctx.msg,
    })) throw 'This will never happen';
    better.logLevel = 5;
  
    it('#line()', () => {
      better.line('foo', {}); 
      expect(lastMsgOfType.log[0]).to.equal('foo');
      expect(lastMsgOfType.log[1]).to.deep.equal([ {} ]);
    });
    ['log', 'info', 'warn', 'error', 'debug'].forEach(type => {
      it('#'+type+'()', () => {
        better[type]('foo', {});
        expect(lastMsgOfType[type][0]).to.equal('');
        expect(lastMsgOfType[type][1]).to.deep.equal([ 'foo', {} ]);
      });
    });
  });

  describe('MessageConstructionStrategy.FIRST', () => {
    const better = {};
    if (!pretendLogger(better, {
      messageConstructionStrategy: MessageConstructionStrategy.FIRST,
      format: ctx => ctx.msg,
    })) throw 'This will never happen';
    better.logLevel = 5;
  
    it('#line()', () => {
      better.line('foo', {}); 
      expect(lastMsgOfType.log[0]).to.equal('foo');
      expect(lastMsgOfType.log[1]).to.deep.equal([ {} ]);
    });
    ['log', 'info', 'warn', 'error', 'debug'].forEach(type => {
      it('#'+type+'()', () => {
        better[type]('foo', {});
        expect(lastMsgOfType[type][0]).to.equal('foo');
        expect(lastMsgOfType[type][1]).to.deep.equal([ {} ]);
      });
    });
  });

  describe('MessageConstructionStrategy.ALL', () => {
    const better = {};
    if (!pretendLogger(better, {
      messageConstructionStrategy: MessageConstructionStrategy.ALL,
      format: ctx => ctx.msg,
    })) throw 'This will never happen';
    better.logLevel = 5;
  
    it('#line()', () => {
      better.line('foo', {}); 
      expect(lastMsgOfType.log[0]).to.equal('foo');
      expect(lastMsgOfType.log[1]).to.deep.equal([ {} ]);
    });
    ['log', 'info', 'warn', 'error', 'debug'].forEach(type => {
      it('#'+type+'()', () => {
        better[type]('foo', {});
        expect(lastMsgOfType[type][0]).to.equal('foo {}');
        expect(lastMsgOfType[type][1]).to.deep.equal([]);
      });
    });
  });
});