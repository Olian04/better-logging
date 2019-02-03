//@ts-check
const { expect } = require('chai');
const { CustomInstance } = require('../src/better-logging');

describe('On-loglevel-changed', () => {
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
      onLoglevelChanged: loglevel => better.i++
    }, {
      onLoglevelChanged: loglevel => better.j++
    }]
  })) throw 'This will never happen';

  it('triggers once for each assignment to loglevel', () => {
    const timesToRun = 5;
    Array(timesToRun).fill(0).forEach((_, i) => {
      better.loglevel = i;
      better.line(); 
      better.debug('foo'); 
      better.log('foo') 
      better.info('foo'); 
      better.warn('foo'); 
      better.error('foo');
    });
    expect(better.i).to.equal(timesToRun);
    expect(better.j).to.equal(timesToRun);
  });
});

