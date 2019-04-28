# builtin-exposed-event-system

```js
require('better-logging')(console, {
    use: [
        useExposedEventSystem()
    ]
});

console.on(payload => {
    console.log(payload);
});
console.emit('foo', 'this will be logged!'); // [11:46:35] [log] this will be logged!
```