const core = require('./index');

// Check name
Object
    .keys(core)
    .map(key => [key, core[key]({})])
    .map(([key, instance]) => {
        // Must have name property
        console.assert('name' in instance, `Extension bound to key "${key}" is missing required "name" field`);
        console.assert(typeof instance.name === 'string', `"name" field on extension "${instance.name}" must be of type "String"`);

        // Must have dependencies properties
        console.assert('dependencies' in instance, `Extension "${instance.name}" is missing required "dependencies" field`);
        console.assert(Array.isArray(instance.dependencies) === true, `"dependencies" field on extension "${instance.name}" must be of type "Array"`);
        
        // Must implement lifecycle methods
        ['create', 'install', 'finalize'].forEach(methodName => {
            console.assert(methodName in instance, `Extension "${instance.name}" is missing required lifecycle method "${methodName}"`);
            console.assert(typeof instance[methodName] === 'function', `"${methodName}" field on extension "${instance.name}" must be of type "Function"`);
        });
        return instance;
    })
    .reduce((usedKeys, instance) => {
        // Extension names must be unique
        console.assert( ! (instance.name in usedKeys), 'Every extension must have a unique name');
        usedKeys[instance.name] = true; // the value is arbitrary
        return usedKeys;
    }, {});

