
[![NPM Version](https://img.shields.io/npm/v/better-logging.svg)](https://www.npmjs.com/package/better-logging)
![Supported Types](https://img.shields.io/npm/types/better-logging.svg)
[![NPM Downloads](https://img.shields.io/npm/dt/better-logging.svg)](https://www.npmjs.com/package/better-logging)
[![Build Status Master](https://img.shields.io/github/workflow/status/olian04/better-logging/Node.js%20CI/master?label=build%20%28master%29)](https://github.com/Olian04/better-logging/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster+event%3Apush)
[![Build Status Dev](https://img.shields.io/github/workflow/status/olian04/better-logging/Node.js%20CI/dev?label=build%20%28dev%29)](https://github.com/Olian04/better-logging/actions?query=workflow%3A%22Node.js+CI%22+branch%3Adev+event%3Apush)
![LICENSE](https://img.shields.io/npm/l/better-logging.svg)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging?ref=badge_shield)

# better-logging

![](images/output.png)

Javascript comes by default with different standardized logging types. But as it stands only browsers are taking advantage of these different methods of logging. `better-logging` aims to improve the default logging experience of any node application, it is designed to be a drop in replacement for the default logging methods. <br>
Since `better-logging` only decorates the default logging methods you won't lose any functionality provided by other tooling. `better-logging` is not meant to be the be all and end all of node.js logging. It is just supposed to increase the usefulness of the default logging methods.

__Install:__ [`npm i better-logging`](https://www.npmjs.com/package/better-logging)

---

```js
// Default in node.js
console.debug('foo'); //  foo
console.log('foo'); //    foo
console.info('foo'); //   foo
console.warn('foo'); //   foo
console.error('foo'); //  foo

// With better-logging
require('better-logging')(console);

console.debug('foo'); //  [11:46:35] [debug] foo
console.log('foo'); //    [11:46:35] [log] foo
console.info('foo'); //   [11:46:35] [info] foo
console.warn('foo'); //   [11:46:35] [warn] foo
console.error('foo'); //  [11:46:35] [error] foo
console.line('foo'); //   foo
```

## Documentation

https://app.gitbook.com/@olian04/s/better-logging/

## License

_See [LICENSE](./LICENSE)_

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FOlian04%2Fbetter-logging?ref=badge_large)
