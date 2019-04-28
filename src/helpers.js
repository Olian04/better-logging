module.exports.copyIfFound = (to, from, ...keys) => {
  if (keys.length === 0) return;
  if (keys.length === 1) {
    if (from[keys[0]]) {
      to[keys[0]] = from[keys[0]];
    }
  } else {
    module.exports.copyIfFound(to[keys[0]], from[keys[0]], ...keys.slice(1));
  }
}