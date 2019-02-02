require('../src/better-logging').default(console);

console.log({ foo: 'bar' });
console.log([ 'foo', 'bar' ]);
console.log(class Foo { bar() {} });
console.log(() => {});
console.log(function () {});

console.log('string', { foo: 'bar' }, 2);
console.log([ 'foo', 'bar' ], { foo: 'bar' }, [ 'bar', 'foo' ], { bar: 'foo' });