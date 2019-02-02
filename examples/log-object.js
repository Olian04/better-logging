//@ts-check
const better = {};
if (!require('../src/better-logging').default(better)) throw 'This will never happen';

better.line();
better.log({ foo: 'bar' });
better.log([ 'foo', 'bar' ]);
better.log(class Foo { bar() {} });
better.log(() => {});
better.log(function () {});

better.log('string', { foo: 'bar' }, 2);
better.log([ 'foo', 'bar' ], { foo: 'bar' }, [ 'bar', 'foo' ], { bar: 'foo' });