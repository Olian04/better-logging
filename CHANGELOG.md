# 4.0.0

For this major release better-logging has undergone a huge rewrite. Due to the nature of rewrites major parts of api have had to change. The changelog will attempt to smooth out the upgrading process as much as possible.

__Note:__ If your usage prior to this update look like this `require('better-logging')(console)` then you're in luck. This is still the recommended way of using better-logging and you wont need to change anything at all.

## Config object

The config object have undergone massive changes in this version. Most notably the addition of the `use` field and the `on` field.

## Events

__onLoglevelChange__: The payload is now an object with two keys, `{ old: the old value, new: the new value }`.