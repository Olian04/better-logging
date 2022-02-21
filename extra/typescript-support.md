# Typescript Support

Better-logging is written in typescript and provides 100% ts integration.

```typescript
// using import
import betterLogging from 'better-logging';
betterLogging(console);
console.log('Hello!') // [11:46:35] [log] Hello!
```

```typescript
// using require
require('better-logging').default(console);
console.log('Hello!') // [11:46:35] [log] Hello!
```
