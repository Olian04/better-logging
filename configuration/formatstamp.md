# formatStamp

You might want to define your own stamp style, for those occasions you can overwrite the default stamp formatting function:

```javascript
require('better-logging')(console, {
  formatStamp: content => `<${content}>`
});

console.debug('foo'); // <11:46:35> <debug> foo
console.log('foo'); //   <11:46:35> <log> foo
console.info('foo'); //  <11:46:35> <info> foo
console.warn('foo'); //  <11:46:35> <warn> foo
console.error('foo'); // <11:46:35> <error> foo
```
