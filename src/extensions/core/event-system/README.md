# core-event-system

```js
require('better-logging', {
    on: {
        'someEvent': (payload) => {
            // Fired when one of the extensions calls app.emit('someEvent', payload)
        }
    }
});
```