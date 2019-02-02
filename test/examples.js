const path = require('path');

const examples =  [
    'decorate-object',
    'custom-formatting',
    'on-log-emitted',
    'custom-log-levels',
    'custom-type-colors',
    'log-object',
    'custom-arg-processor',
    'custom-stamp-color',
    'custom-instance',
    'on-loglevel-changed',
    'decorate-console' // Needs to be last, since it changes the console object
];

const { log } = console; 

examples.forEach(fileName => {
    log('Starting: ' + fileName);
    try {
        require(path.join('..', 'examples', fileName)); 
    } catch (e) {
        throw e;
    }
    log('Ending: ' + fileName);
});