const useExposedEventSystem = require('../../src/extensions/builtin/exposed-event-system');
require('../../src/better-logging')(console, {
  use: [
    useExposedEventSystem(),
  ]
});
