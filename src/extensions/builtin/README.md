# builtin

Builtins are:

* extensions that are included in the library but are not part of the logger by default.
* tree-shakeable (aka not coupled to the rest of the codebase in any way)

__Note:__ If you import a builtin through the `builtin/index.js` file, then tree-shaking might not work for the remaining builtins.
