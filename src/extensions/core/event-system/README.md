# core-event-system

```js
require('better-logging')(console, {
    on: {
        'someEvent': (payload) => {
            // Fired when one of the extensions calls app.emit('someEvent', payload)
        }
    }
});
```