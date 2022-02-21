//@ts-check
const { expect } = require('chai');
const { CustomInstance, Theme } = require('../../dist/api');

describe('Log-Object', () => {

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
        format: ctx => ctx.msg,
        color: Theme.noColor,
    })) throw 'This will never happen';
    better.logLevel = 5;

    const runTest = (loggerType, nativeType) => {
        it('#'+loggerType+'()', () => {
            const testStringify  = (...data) => {
                better[loggerType](...data);
                expect(lastMsgOfType[nativeType]).to.equal(
                    data.map(d =>
                        typeof d === 'object'
                            ? JSON.stringify(d) : String(d)
                    ).join(' ')
                );
            }

            testStringify({ foo: 'bar' });
            testStringify([ 'foo', 'bar' ]);
            testStringify(class Foo { bar() {} });
            testStringify(() => {});
            testStringify(function () {});
            testStringify('string', { foo: 'bar' }, 2);
            testStringify([ 'foo', 'bar' ], { foo: 'bar' }, [ 'bar', 'foo' ], { bar: 'foo' });
        });
    }

    ['log', 'info', 'warn', 'error', 'debug'].forEach(type =>
        runTest(type, type)
    );
});
