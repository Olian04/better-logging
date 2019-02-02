//@ts-check
const better = {};
if (!require('../src/better-logging').default(better, {
    argProcessor: arg => {
        // will fire once per arg in (...args) of the original function call
      
        let msg = arg;
        if (typeof arg === 'number') {
          msg = arg * arg;
          // ex: log(1, 2, 3) => '1 4 9'
        }
      
        return String(msg); // Should return a string
      }
})) throw 'This will never happen';

better.line();
better.log(1); 
better.log(1, 2);
better.log(1, 2, 3);
better.log(3, '5');