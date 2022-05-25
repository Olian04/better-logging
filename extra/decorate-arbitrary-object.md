# Decorate Arbitrary Object

Support for decoration of arbitrary objects is considered experimental, this is due to problems with typescript support. If you intend to use better-logging purely with javascript or dont care about type support, then everything should work just fine out of the box. However if you intend to use better-logging with typescript then you should be aware that the types for the console object are hardcoded and will show up on the console object even if you chose not to decorate it. This means that `console.line('foo')` will look ok to typescript, but will fail during runtime.

```javascript
const better = {};
require('better-logging')(better);
better.debug('foo'); //  [11:46:35.294] [debug] foo
better.log('foo') //     [11:46:35.295] [log] foo
better.info('foo'); //   [11:46:35.296] [info] foo
better.warn('foo'); //   [11:46:35.297] [warn] foo
better.error('foo'); //  [11:46:35.298] [error] foo
better.line('foo'); //   foo
better.logLevel = 0;
```

```typescript
// When decorating an arbitrary object we need to trick the type system into thinking that better-logging might infact fail to decorate our object.
const better = {}; // due to some "strange" behavior with the typescript type system this has to be CONST.
if (!require('better-logging').default(better)) throw 'This will never happen';
better.log('Hello!') // [11:46:35.294] [log] Hello!
```
