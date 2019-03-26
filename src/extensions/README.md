# Extensions

```js
// example.js
module.exports = () => ({
    name: 'example',
    dependencies: [ 'core-event-system' ],
    create(config) {
        // called first
    },
    install(app, hostObject) {
        // called once all extensions have been created and dependencies have been resolved
        // app is an internal object shared between extensions
        // hostObject is the object passed to better-logging (usually the console)
    },
    finalize(app, hostObject) {
        // called once all extensions have been successfully installed
    }
});
```