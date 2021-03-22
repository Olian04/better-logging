//@ts-check
const { expect } = require('chai');
const { Volume, createFsFromVolume } = require('memfs');
const { LoggerContext } = require('../../dist/lib/logger');

describe('Save-To-File', () => {
  const fs = createFsFromVolume(Volume.fromJSON({}));

  const pretendLogger = new LoggerContext({
    log: () => { },
    info: () => { },
    debug: () => { },
    error: () => { },
    warn: () => { },
  },
    //@ts-ignore
    fs
  );

  const logFilePath = '/latest.log';

  const better = {};
  if (!pretendLogger.decorate(better, {
    format: ctx => `${ctx.type} ${ctx.msg}`,
    saveToFile: logFilePath,
  })) throw 'This will never happen';

  better.log('Test');
  better.info('Test');
  better.warn('Test');
  better.error('Test');
  better.debug('Test');

  const contents = fs.readFileSync(logFilePath).toString();
  console.log(contents.split('\n'));
  expect(contents.split('\n')).to.deep.equal([
    '[log] Test',
    '[info] Test',
    '[warn] Test',
    '[error] Test',
    '[debug] Test',
    '' /* Each log line ends with a \n so there will be an empty line at the end */
  ]);
});