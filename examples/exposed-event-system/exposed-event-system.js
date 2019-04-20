//@ts-check
require('./setup');

const fooID = console.on('foo', (msg) => {
  console.log(msg);
});

console.emit('foo', 'hello');

console.off('foo', fooID);