Sometimes you might not want all log arguments to be formatted and converted into a string. For these cases you can change the message construction strategy by passing a `MessageConstructionStrategy` enum in the configuration object.

```js
const { MessageConstructionStrategy } = betterLogging;
betterLogging(console, {
  messageConstructionStrategy: MessageConstructionStrategy.ALL,
});
```

__Strategies:__

* ALL _(default)_: Will consume all arguments and format them as a single string. <br> `log(1, 2, 3) => impl.log(format('1 2 3'), ...[])`
* FIRST: Will consume just the first argument and format it as a string, it will then spread the rest of the arguments into the implementation call. <br> `log(1, 2, 3) => impl.log(format('1'), ...[2, 3])`
* NONE : Won't format any arguments, HOWEVER the format function will be called with an empty string as the message. <br> `log(1, 2, 3) => impl.log(format(''), ...[1, 2, 3])`
