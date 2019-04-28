# builtin-exposed-event-system

```js
require('better-logging')(console, {
    use: [
        useExposedEventSystem()
    ]
});

console.on('foo', payload => {
    console.log(payload);
});
console.emit('foo', 'this will be logged!'); // [11:46:35] [log] this will be logged!
```

See also: [examples/using-a-builtin](../../../../examples/using-a-builtin)