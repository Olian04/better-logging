//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('../src/better-logging');

const removeColor = msg => msg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

describe('Custom-Formatting', () => {
  const pretendLogger = CustomInstance({
    log: () => {},
    info:() => {},
    debug: () => {},
    error: () => {},
    warn:() => {},
  });

  const better = { i: 0, j: 0 };
  if (!pretendLogger(better, {
    events: [{
      onLogEmitted: log => better.i++
    }, {
      onLogEmitted: log => better.j++
    }]
  })) throw 'This will never happen';
  better.loglevel = 5;

  describe('once per call for each type of call', () => {
    it('#line()', () => {
      better.i = 0;
      better.j = 0;
      better.line('foo'); 
      expect(better.i).to.equal(1);
      expect(better.j).to.equal(1);
    });
    ['log', 'info', 'warn', 'error', 'debug'].forEach(type => {
      it('#'+type+'()', () => {
        better.i = 0;
        better.j = 0;
        better[type]('foo');
        expect(better.i).to.equal(1);
        expect(better.j).to.equal(1);
      });
    });
  });

  describe('multiple different calls in a row', () => {
    better.i = 0;
    better.j = 0;
    
    better.line(); 
    better.debug('foo'); 
    better.log('foo') 
    better.info('foo'); 
    better.warn('foo'); 
    better.error('foo');

    expect(better.i).to.equal(6);
    expect(better.j).to.equal(6);
  });
});