# Upgrading from major version 4 to major version 5

## Message formatting

With version 5.x better-logging now adheres to the [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) standard for dates and time stamps. This brings with it some changes to the message formatting context object.

- The string format of `ctx.date` has changed from `DD/MM/YYYY` to `YYYY-MM-DD`.
- The introduction of a unified `ctx.time` has rendered `ctx.time12` and `ctx.time24` redundant, and they have there for been removed. The string format of the new unified `ctx.time` is as follows `hh:mm:ss.mmm` where the additional `mmm` at the end stands for milliseconds.

```ts
// IN 4.x
betterLogging(console, {
  format: (ctx) => `${ctx.date} ${ctx.time24} ${ctx.msg}`,
});
console.log('Hi'); // [25/05/2022] [20:54:58] Hi

// IN 5.x
betterLogging(console, {
  format: (ctx) => `${ctx.date} ${ctx.time} ${ctx.msg}`,
});
console.log('Hi'); // [2022-05-25] [20:54:58.298] Hi
```
